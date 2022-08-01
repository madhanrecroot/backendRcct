const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const appliedJobsSchema = new mongoose.Schema(
    {
      companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      coverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },

    },
    { timestamps: true },
    { strict: false }
)

module.exports = mongoose.model("appliedJobs", appliedJobsSchema);
