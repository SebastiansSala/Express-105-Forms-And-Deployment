const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: String,
  url: String
});

const GenreModel = moongose.model("Genre", genreSchema);

module.exports = GenreModel;
