import bookModel from "../model/bookModel.js";
import borrowModel from "../model/borrowingModel.js";

export const borrowBook = async (req, res, next) => {
  try {
    const book = await bookModel.findById({ _id: req.body.bookId });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.numberOfCopies <= 0) {
      return res
        .status(400)
        .json({ message: "No copies available for borrowing" });
    }

    const existingBorrow = await borrowModel.findOne({
      user: req.user,
      book: req.body.bookId,
    });

    if (existingBorrow) {
      return res.status(400).json({
        message:
          "You have already borrowed this book, you cannot borrow it without returning it.",
      });
    }

    const borrowing = new borrowModel({
      user: req.user,
      book: req.body.bookId,
    });

    await bookModel.updateOne(
      { _id: req.body.bookId },
      { $inc: { numberOfCopies: -1 } }
    );

    await borrowing.save();

    return res
      .status(200)
      .json({ message: "Book borrowed successfully", data: borrowing });
  } catch (error) {
    next(error);
  }
};

export const returnBook = async (req, res, next) => {
  try {
    const borrowing = await borrowModel.findOneAndUpdate(
      { book: req.params.id, returnDate: { $exists: false } },
      { $set: { returnDate: new Date() } },
      { new: true }
    );

    if (!borrowing) {
      return res.status(400).json({
        message: "No borrowing record found or book already returned.",
      });
    }

    const bookUpdate = await bookModel.updateOne(
      { _id: req.params.id },
      { $inc: { numberOfCopies: 1 } }
    );

    if (!bookUpdate.modifiedCount) {
      return res
        .status(400)
        .json({ message: "Failed to update the book's number of copies." });
    }

    return res.status(200).json({ message: "Book successfully returned." });
  } catch (error) {
    next(error);
  }
};

export const borrowHistory = async (req, res, next) => {
  try {
    const borrowHistory = await borrowModel
      .find({ user: req.user })
      .populate("book");
    if (!borrowHistory.length) {
      return res.status(404).json({ message: "No borrowing history found" });
    }

    return res
      .status(200)
      .json({
        message: "Borrowing history retrieved successfully",
        data: borrowHistory,
      });
  } catch (error) {
    next(error);
  }
};
