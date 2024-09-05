import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  numberOfCopies: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;