const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: String,
  date: Number,
  fullName: String,
  imageUrl: String
});

module.exports = mongoose.model("Item", ItemSchema);
