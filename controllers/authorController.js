const Author = require("../models/author.model");
const Book = require("../models/book.model");

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
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
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

exports.author_create_get = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author create GET");
  } catch (e) {
    next(e);
  }
};

exports.author_create_post = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author create POST");
  } catch (e) {
    next(e);
  }
};

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
