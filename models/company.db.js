const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    basicInformation:{},
    companyInformation:{},
    members:[],
    links:{},
    companyPhotos:[],
    companyLogo:{}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
