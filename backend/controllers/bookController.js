import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";

// @desc    Create a new book for user in jwt token
// route    POST /api/books
// @access  Private
const createBook = asyncHandler(async (req, res) => {
  const bookRequest = {
    userID: req.user._id,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    isbn: req.body.isbn,
    numberOfPages: req.body.numberOfPages,
    currentPageNumber: req.body.currentPageNumber,
    coverImagePath: req.body.coverImagePath,
  };

  const errors = validateFieldsForCreateBookRequest(bookRequest);
  if (errors.length !== 0) {
    res.status(400).json({ message: "Invalid request", errors });
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

function validateFieldsForCreateBookRequest(bookRequest) {
  const errors = [];

  if (!bookRequest.title) {
    errors.push({
      source: "title",
      type: "MISSING_FIELD",
      message: "Title is required",
    });
  }

  if (!bookRequest.author) {
    errors.push({
      source: "author",
      type: "MISSING_FIELD",
      message: "Author is required",
    });
  }

  if (
    bookRequest.numberOfPages &&
    !Number.isInteger(Number(bookRequest.numberOfPages))
  ) {
    errors.push({
      source: "numberOfPages",
      type: "INVALID_NUMBER",
      message: "Number of pages must be an integer",
    });
  }

  if (
    bookRequest.currentPageNumber &&
    !Number.isInteger(Number(bookRequest.currentPageNumber))
  ) {
    errors.push({
      source: "currentPageNumber",
      type: "INVALID_NUMBER",
      message: "Current page number must be an integer",
    });
  }

  return errors;
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

export { createBook, deleteBook, getBooksByUserID, getBookByBookID };
