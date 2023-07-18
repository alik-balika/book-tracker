import express from "express";
import {
  createBook,
  deleteBook,
  getBookByBookID,
  getBooksByUserID,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createBook).get(protect, getBooksByUserID);
router
  .route("/:bookID")
  .delete(protect, deleteBook)
  .get(protect, getBookByBookID);

export default router;
