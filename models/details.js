const mongoose = require("mongoose");

const userdetailSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: String,
  phonenumber: {
    type: Number,
    max: 9999999999,
    min: 1000000000,
  },
});

module.exports = mongoose.model("Userdetail", userdetailSchema);
