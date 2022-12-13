const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    poNumber: {
      type: String,
      required: false,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    saleDetail: {
      fourInch: {
        quantity: {
          type: Number,
          required: false,
        },
        rate: {
          type: Number,
          required: false,
        },
        amount: {
          type: Number,
          required: false,
        },
      },
      sixInch: {
        quantity: {
          type: Number,
          required: false,
        },
        rate: {
          type: Number,
          required: false,
        },
        amount: {
          type: Number,
          required: false,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sale", userSchema);
