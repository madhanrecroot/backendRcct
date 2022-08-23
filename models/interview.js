const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companysceduledinterviewsSchema = new Schema(
{
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  canditateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  search: [],
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "sceduledinterviews",
  companysceduledinterviewsSchema
);
