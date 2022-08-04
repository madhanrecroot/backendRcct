const express = require("express");

const mongoose = require("mongoose");

// Create Schema
const SubscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
  },
  { strict: false }
);

module.exports = Subscribe = mongoose.model("Subscribe", SubscribeSchema);
