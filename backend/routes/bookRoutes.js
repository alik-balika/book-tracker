import express from "express";
import {
  createBook,
  deleteBook,
  getBooksByUserID,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createBook).get(protect, getBooksByUserID);
router.delete("/:bookID", protect, deleteBook);

export default router;
