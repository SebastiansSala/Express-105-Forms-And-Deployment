const Author = require("../models/author.model");
const Book = require("../models/book.model");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.author_list = async (req, res, next) => {
  try {
    const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
    res.render("author_list", {
      title: "Author List",
      author_list: allAuthors,
    });
  } catch (e) {
    next(e);
  }
};

exports.author_detail = async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: id }, "title summary").exec(),
  ]);

  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("author_detail", {
    title: "Author Detail",
    author: author,
    author_books: allBooksByAuthor,
  });
};

exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.render("author_form", { title: "Create AUthor" });
});

exports.author_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Create Author",
        author: author,
        errors: errors.array(),
      });
      return;
    } else {
      await author.save();
      res.redirect(author.url);
    }
  }),
];

exports.author_delete_get = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author delete POST");
  } catch (e) {
    next(e);
  }
};

exports.author_delete_post = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author delete POST");
  } catch (e) {
    next(e);
  }
};

exports.author_update_get = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author update GET");
  } catch (e) {
    next(e);
  }
};

exports.author_update_post = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author update POST");
  } catch (e) {
    next(e);
  }
};
