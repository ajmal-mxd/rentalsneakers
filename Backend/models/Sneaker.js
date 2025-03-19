const mongoose = require("mongoose");

const SneakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Image URL field
});

module.exports = mongoose.model("Sneaker", SneakerSchema);
