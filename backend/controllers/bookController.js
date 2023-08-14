import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";
import Joi from "joi";

const createBookSchema = Joi.object({
  userID: Joi.object().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  categoryID: Joi.string(),
  description: Joi.string(),
  isbn: Joi.string(),
  numberOfPages: Joi.number().integer().min(1),
  currentPageNumber: Joi.number().integer().min(1),
  coverImagePath: Joi.string(),
});

// @desc    Create a new book for user in jwt token
// route    POST /api/books
// @access  Private
const createBook = asyncHandler(async (req, res) => {
  const bookRequest = {
    userID: req.user._id,
    title: req.body.title,
    author: req.body.author,
    categoryID: req.body.categoryID,
    description: req.body.description,
    isbn: req.body.isbn,
    numberOfPages: req.body.numberOfPages,
    currentPageNumber: req.body.currentPageNumber,
    coverImagePath: req.body.coverImagePath,
  };

  const { error } = createBookSchema.validate(bookRequest, {
    abortEarly: false,
  });

  if (error) {
    const errors = mapErrorDetails(error);
    res.status(400).json({ message: "Invalid request", errors });
    return;
  }

  const book = await Book.create(bookRequest);

  if (book) {
    res.status(201).json({
      _id: book._id,
      title: book.title,
      author: book.author,
      description: book.description,
      isbn: book.isbn,
      numberOfPages: book.numberOfPages,
      currentPageNumber: book.currentPageNumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

function mapErrorDetails(error) {
  return error.details.map((err) => {
    console.log(err.message);
    return {
      source: err.path.join("."),
      type: err.type,
      message: err.message,
    };
  });
}

// @desc    Delete a book
// route    DELETE /api/books/:bookID
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {
  await fetchBookFromDB(req, res);
  await tryDeletingBook({ _id: req.params.bookID }, res);
});

async function fetchBookFromDB(req, res) {
  const userID = req.user._id;
  const bookID = { _id: req.params.bookID };

  const book = await Book.findOne(bookID).select("-__v");
  if (book === null || book.userID != userID) {
    res.status(404);
    throw new Error("Book not found");
  }

  return book;
}

const tryDeletingBook = async (bookID, res) => {
  try {
    await Book.deleteOne(bookID);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the book" });
  }
};

// @desc    Get List of books for user in jwt token
// route    GET /api/books
// @access  Private
const getBooksByUserID = asyncHandler(async (req, res) => {
  const userID = req.user._id;

  try {
    const books = await Book.find({ userID }).select("-__v");
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

// @desc    Get book by book ID
// route    GET /api/books/:bookID
// @access  Private
const getBookByBookID = asyncHandler(async (req, res) => {
  const book = await fetchBookFromDB(req, res);

  res.status(200).json(book);
});

const updateBookSchema = Joi.object({
  userID: Joi.object(),
  title: Joi.string(),
  author: Joi.string(),
  categoryID: Joi.string(),
  description: Joi.string(),
  isbn: Joi.string(),
  numberOfPages: Joi.number().integer().min(1),
  currentPageNumber: Joi.number().integer().min(1),
  coverImagePath: Joi.string(),
});

// @desc    Update book
// route    PUT /api/books/:bookID
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
  const bookRequest = constructUpdateBookRequest(req);

  const { error } = updateBookSchema.validate(bookRequest, {
    abortEarly: false,
  });
  if (error) {
    const errors = mapErrorDetails(error);
    res.status(400).json({ message: "Invalid request", errors });
    return;
  }

  const book = await fetchBookFromDB(req, res);
  updateBookFieldsIfInBody(book, req);

  try {
    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

function constructUpdateBookRequest(req) {
  return {
    userID: req.user._id,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    isbn: req.body.isbn,
    numberOfPages: req.body.numberOfPages,
    currentPageNumber: req.body.currentPageNumber,
    coverImagePath: req.body.coverImagePath,
  };
}

function updateBookFieldsIfInBody(book, req) {
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.description = req.body.description || book.description;
  book.categoryID = req.body.categoryID || book.categoryID;
  book.isbn = req.body.isbn || book.isbn;
  book.numberOfPages = req.body.numberOfPages || book.numberOfPages;
  book.currentPageNumber = req.body.currentPageNumber || book.currentPageNumber;
  book.coverImagePath = req.body.coverImagePath || book.coverImagePath;
}

export {
  createBook,
  deleteBook,
  getBooksByUserID,
  getBookByBookID,
  updateBook,
};
