import userModel from "../model/userModel.js";
import { hashPassword, comparePassword } from "../utils/bcryptUtils.js";
import jwt from "jsonwebtoken";

export const userRegistration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const securePassword = await hashPassword(password);
    const newUser = new userModel({
      name,
      email,
      password: securePassword,
    });

    const savedUser = await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", data: savedUser });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    return res
      .status(200)
      .json({ token, message: "your login is completed successfully" });
  } catch (error) {
    next(error);
  }
};
