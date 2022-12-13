const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: Array,
      schema: {
        address: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    },
    brickType: {
      type: String,
      required: true,
    },
    poNumber: {
      type: String,
    },
    conatctNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customerDetail", userSchema);
