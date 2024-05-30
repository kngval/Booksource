import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  sender: {
    type: String,
  },
  genre: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
  },
});

const BookSchema = mongoose.model("books", schema);

export default BookSchema;
