const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: String,
  family_name: String,
  date_of_birth: { type: Date, default: Date.now },
  date_of_death: { type: Date || Boolean, default: false },
  name: String,
  lifespan: String,
  url: String,
});

const AuthorModel = moongose.model("Author", AuthorSchema);

module.exports = AuthorModel;
