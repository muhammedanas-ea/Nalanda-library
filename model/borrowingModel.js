import mongoose from "mongoose";
const borrowRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  borrowedAt: {
    type: Date,
    default: Date.now,
  },
  returnDate: { type: Date },
});
const Borrowing = mongoose.model("Borrowing", borrowRecordSchema);
export default Borrowing;
