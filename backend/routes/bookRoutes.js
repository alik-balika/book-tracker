import express from "express";
import { createBook, deleteBook } from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBook);
router.delete("/:bookID", protect, deleteBook);

export default router;
