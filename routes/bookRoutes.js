import express from "express";
import {
  getAllBook,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controller/bookController.js";
import { adminCheckRole } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", adminCheckRole, getAllBook);
router.get("/:id", adminCheckRole, getBook);
router.post("/create", adminCheckRole, createBook);
router.put("/update/:id", adminCheckRole, updateBook);
router.delete("/delete", adminCheckRole, deleteBook);

export default router;
