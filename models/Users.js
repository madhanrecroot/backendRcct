const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ThirdPartyProviderSchema = new mongoose.Schema({
  provider_name: {
    type: String,
    default: null,
  },
  provider_id: {
    type: String,
    default: null,
  },
  provider_data: {
    type: {},
    default: null,
  },
});

// Create Schema
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      // required: true,
    },
    organization: {
      type: String,
      // required: true,
    },
    recrootUserType: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_is_verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    referral_code: {
      type: String,
      default: function () {
        let hash = Math.floor(1000 + Math.random() * 9000);
        return hash;
      },
    },
    referred_by: {
      type: String,
      default: null,
    },
    third_party_auth: [ThirdPartyProviderSchema],
    date: {
      type: Date,
      default: Date.now,
    },
    login: {
      type: String,
      authantication: String,
    },
    resume: {
      resumeFileLocation: [
        {
          resume: String,
          resumeName: String,
        },
      ],
      coverLetterFileLocation: [
        {
          cover: String,
          coverName: String,
        },
      ],
      certificateFileLocation: [
        {
          certificate: String,
          certificateName: String,
        },
      ],
      // resumeFileLocation: String,
      // coverLetterFileLocation: String,
      desiredJobField: String,
      resumeFirstName: String,
      resumeLastName: String,
      mobileNumber: String,
      carearLevel: String,
      totalWorkExperience: String,
      jobsPreference: [],
      expectedSalary: String,
      skills: [],
      gender: String,
      languages: [],
      cvSetting: String,
      country: [],
      nationality: [],
      countrieswithworkingRights: [],
      availableToWork: {
        days: Number,
        time: String,
      },
      workExperience: [
        {
          companyName: String,
          experience: String,
          duration: String,
          location: String,
        },
      ],
      skils: [
        {
          skillName: String,
          Experience: String,
          Compitance: String,
        },
      ],
      projects: [
        {
          portafolioLink: String,
          ProjectName: String,
          Organization: String,
          Description: String,
        },
      ],
      traning: [
        {
          title: String,
          instituete: String,
          date: String,
        },
      ],
      socialMediaLink: [
        {
          title: String,
          socialMediaLink: String,
        },
      ],
    },
    token: { type: String },
  },
  { strict: false }
);

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

module.exports = User = mongoose.model("User", UserSchema);
