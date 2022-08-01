const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserProfile = mongoose.Schema(
  {
    resume: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    userID: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
