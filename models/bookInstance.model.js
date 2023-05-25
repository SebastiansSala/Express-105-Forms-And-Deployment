const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookModel = require("./book.model");

const BookInstanceSchema = new Schema({
  book: [BookModel],
  imprint: String,
  status: { type: String, enum: ["available", "not availablle"], default: "available"},
  due_back: Date,
  url: String,
});

const BookInstanceModel = mongoose.model("BookInstance", BookInstanceSchema);

module.exports = BookInstanceModel;
