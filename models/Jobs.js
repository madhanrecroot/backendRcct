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
    jobType: {
      type: String,
      required: true,
    },
    applicationDedline: {
      type: Date,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    requiredSkill: {
      type: [String],
      required: true,
    },
    referredBy: {
      type: String,
      default: null,
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
      carrerLevel: String,
      experience: String,
      qualification: String,
      preferdCandidateLocation: String,
      typeOfWork: String,
    },
    quistion: [
      {
        question: String,
        quizType: String,
        answer: {
          first: String,
        },
      },
    ],
    address: {
      country: String,
      state: String,
      city: String,
      postalCode: String,
      address: String,
      latitute: String,
      longatute: String,
    },
  },

  { timestamps: true },
  { strict: false }
);
module.exports = mongoose.model("Job", JobsSchema);
