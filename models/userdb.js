const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_logo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    skills: {
      type: String,
      required: false,
    },
    certificate: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
