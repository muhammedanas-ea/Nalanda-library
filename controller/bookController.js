import bookModel from "../model/bookModel.js";
import mongoose from "mongoose";

export const createBook = async (req, res, next) => {
  try {
    const {
      title,
      author,
      ISBN,
      publicationDate,
      genre,
      numberOfCopies,
    } = req.body;

    if (
      !title ||
      !author ||
      !ISBN ||
      !publicationDate ||
      !genre ||
      !numberOfCopies
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingBook = await bookModel.findOne({ ISBN });
    if (existingBook) {
      return res
        .status(400)
        .json({ message: "Book with this ISBN already exists." });
    }

    const newBook = new bookModel({
      title,
      author,
      ISBN,
      publicationDate,
      genre,
      numberOfCopies,
    });

    const savedBook = await newBook.save();
    return res
      .status(201)
      .json({ message: "Book added successfully.", data: savedBook });
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Book ID is required." });
    }
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Book ID is required." });
    }

    const book = await bookModel.findOne({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    if (book.ISBN === req.body.ISBM) {
      return res
        .status(400)
        .json({ message: "Another book with this ISBN already exists." });
    }
    if (book.title === req.body.title) {
      return res
        .status(400)
        .json({ message: " book with this title already exists." });
    }

    const updatedBook = await bookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(500).json({ message: "Failed to update the book." });
    }

    return res
      .status(200)
      .json({ message: "Book updated successfully.", data: updatedBook });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
      return res.status(400).json({ message: "Book ID is required." });
    }
    const deletedBook = await bookModel.findByIdAndDelete({
      _id: req.query.id,
    });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    return res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const getAllBook = async (req, res, next) => {
  try {
    const { active = 1, genre, author } = req.query;
    const page = (active - 1) * 2;
    let query = {};

    if (genre || author) {
      query.$or = [];
      if (genre) {
        query.$or.push({ genre: { $regex: genre, $options: "i" } });
      }
      if (author) {
        query.$or.push({ author: { $regex: author, $options: "i" } });
      }
    }

    const book = await bookModel.find(query).skip(page).limit(2);
    res.status(200).json({ success: true, data: book, currentPage: active });
  } catch (error) {
    next(error);
  }
};
