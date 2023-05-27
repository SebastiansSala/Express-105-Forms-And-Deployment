const BookInstance = require("../models/bookInstance.model");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Book = require("../models/book.model");

exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find()
    .populate("book")
    .sort({ book: 1 })
    .exec();
  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
});

exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookInstance === null) {
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_detail", {
    title: "Book:",
    bookinstance: bookInstance,
  });
});

exports.bookinstance_create_get = async (req, res, next) => {
  try {
    const allBooks = await Book.find({}, "title").exec();
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: allBooks,
    });
  } catch (e) {
    next(e);
  }
};

exports.bookinstance_create_post = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const { book, imprint, status, due_back } = req.body;

      const bookInstance = new BookInstance({
        book,
        imprint,
        status,
        due_back,
      });

      if (!errors.isEmpty()) {
        const allBooks = await Book.find({}, "title").exec();
        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: allBooks,
          selected_book: bookInstance.book._id,
          errors: errors.array(),
          bookinstance: bookInstance,
        });
        return;
      } else {
        await bookInstance.save();
        res.redirect(bookInstance.url);
      }
    } catch (e) {
      next(e);
    }
  },
];

exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});
