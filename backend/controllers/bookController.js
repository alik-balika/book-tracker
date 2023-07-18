import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Book from "../models/bookModel.js";

// @desc    Create a new book for user in jwt token
// route    POST /api/users
// @access  Private
const createBook = asyncHandler(async (req, res) => {
  // TODO validate required fields and number fields and possibly send proper error messages
  //      for each error.
  // TODO also, potentially restructure the error message to have an error code as well and
  //      maybe return a list of errors so that it's easier on the user
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

export { createBook };
