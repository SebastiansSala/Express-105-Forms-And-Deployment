const Author = require("../models/author.model");

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
  try {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  } catch (e) {
    next(e);
  }
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
