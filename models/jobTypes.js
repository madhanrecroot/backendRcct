const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Create Schema
const JobsTypesSchema = new mongoose.Schema(
  {
    jobNam: {
      type: String,
    },
    roleAndDesc:[]
}
      

);

module.exports = mongoose.model("jobTypes", JobsTypesSchema);
