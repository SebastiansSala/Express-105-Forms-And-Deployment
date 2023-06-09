const Genre = require("../models/genre.model");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book.model");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find({}).exec();
  res.render("gender_list", {
    title: "Genre List",
    genre_list: allGenres,
  });
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: id }, "title summary").exec(),
  ]);
  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Genre Detail",
    genre: genre,
    genre_books: booksInGenre,
  });
});

exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
};

exports.genre_create_post = [
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      const genreExists = await Genre.findOne({ name: req.body.name }).exec();
      if (genreExists) {
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        res.redirect(genre.url);
      }
    }
  }),
];

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  const [genre, books] = await Promise.all([
    Genre.findById(req.params.id),
    Book.find({genre: req.params.id}, "title author").populate("author"),
  ]);
  res.render("genre_delete", {
    genre: genre,
    books: books,
  });
});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id);
  if(!genre){
    res.redirect('/catalog/genres');
    return
  }
  await Genre.findByIdAndDelete(req.params.id);
  res.redirect('/catalog/genres');
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
