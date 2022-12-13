const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    vehicalType: {
      type: String,
      required: true,
    },
    vehicalNumber: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    conatctNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("vehicalDetail", userSchema);
