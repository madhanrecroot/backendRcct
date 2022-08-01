const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    company_logo: {
      type: String,
      required: true,
    },
    head_q_location: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    current_location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    hour_pay: {
      type: Number,
      // required:true
    },
    annual_pay: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
