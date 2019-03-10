const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  vocabulary: String,
  meanings: String,
  pronunciation: String,
  example: String,
  username: String,
  imageUrl: String,
  date: Number
});

module.exports = mongoose.model("Word", WordSchema);
