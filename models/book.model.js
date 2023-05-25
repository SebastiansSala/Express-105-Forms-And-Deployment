const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenreModel = require("./genre.model");
const AuthorModel = require("./author.model");

const BookSchema = new Schema({
    title: String,
    author: AuthorModel,
    summary: String,
    ISBN: String,
    genre: GenreModel,
    url: String
})

const BookModel = moongose.model("Book", BookSchema);

module.exports = authorSchema