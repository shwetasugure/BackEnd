const mongoose = require("mongoose");

// Define a Mongoose schema for the log entry
const logSchema = new mongoose.Schema({
  level: String,
  msg: String,
  time: Date,
  // Add any other fields you want to include in your log documents
});

// Create a Mongoose model based on the log schema
const Log = mongoose.model("Log", logSchema);
