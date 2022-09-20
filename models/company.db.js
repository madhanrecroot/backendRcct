const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    company_name:{
      type:String
    },
    basicInformation:{cmpname:{
      type:String,
      default:null
    } },
    companyInformation:{
      infosector:{
        type:String,
      default:null  
      }
    },
    members:[],
    address:{},
    links:{},
    // companyPhotos:[],
    companyLogo:{
      logo:{
        type:String,
        default:null,
      },
      logoName:{
        type:String,
        default:null,
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
