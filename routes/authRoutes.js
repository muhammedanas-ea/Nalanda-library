import express from "express";
import { userRegistration, userLogin } from "../controller/authController.js";
const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);


export default router;
