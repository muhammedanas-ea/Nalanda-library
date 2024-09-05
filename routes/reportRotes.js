import express from "express";
import {
  getBorrowedBooksReport,
  getActiveMembers,
  getBooksAvailability,
} from "../controller/reportController.js";
const router = express.Router();

router.get("/borrowbooks", getBorrowedBooksReport);
router.get("/activemebers", getActiveMembers);
router.get("/availability", getBooksAvailability);

export default router;
