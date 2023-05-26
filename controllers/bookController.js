const Book = require("../models/book.model");
const Author = require("../models/author.model");
const Genre = require("../models/genre.model");
const BookInstance = require("../models/bookInstance.model");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const numBooks = await Book.countDocuments({}).exec();
  const numBookInstances = await BookInstance.countDocuments({}).exec();
  const numAvailableBookInstances = await BookInstance.countDocuments({
    status: "Available",
  }).exec();
  const numAuthors = await Author.countDocuments({}).exec();
  const numGenres = await Genre.countDocuments({}).exec();

  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  });
});

exports.book_list = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("book_list", { title: "Book List", book_list: allBooks });
});

exports.book_detail = asyncHandler(async (req, res, next) => {
  try {
    const [book_details, book_genre] = await Promise.all([
      Book.findById(req.params.id).exec(),
      Genre.find(req.params.id).exec(),
    ]);
    res.router('book_detail', {
      book_details: book_details,
      book_genre: book_genre,
    });
  } catch (e) {
    next(e);
  }
});

exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create GET");
});

exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create POST");
});

exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
