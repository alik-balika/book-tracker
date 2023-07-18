import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isbn: {
      type: String,
    },
    numberOfPages: {
      type: Number,
    },
    currentPageNumber: {
      type: Number,
    },
    coverImagePath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
