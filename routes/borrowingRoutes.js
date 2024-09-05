import express from "express";
import {
  borrowBook,
  returnBook,
  borrowHistory,
} from "../controller/borrowController.js";
const router = express.Router();

router.post("/borrow", borrowBook);
router.put("/return/:id", returnBook);
router.get("/history", borrowHistory);

export default router;
