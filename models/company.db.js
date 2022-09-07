const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    company_name:{
      type:String
    },
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
