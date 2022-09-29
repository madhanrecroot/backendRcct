const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Create Schema
const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    applicationDeadline: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    requiredSkill:[],
    referredBy: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: 'active',
    },
    jobApplyType: {
      type: String,
      default: null,
    },
    salary: {
      salaryType: String,
      minSalary: Number,
      maxSalary: Number,
      salaryCrrancy: String,
    },
    essentialInformation: {
      careerlevel: String,
      experience: String,
      qualification: String,
      // preferdCandidateLocation: String,
      typeWorks: String,
    },
    queshow:{
      type: String,
      required: true,
    },
    question: [],
    address: {
      country: String,
      state: String,
      city: String,
      pincode: String,
      address: String,
      // latitute: String,
      // longatute: String,
    },
  },
  { timestamps: true },
  { strict: false }
);
module.exports = mongoose.model("Job", JobsSchema);
