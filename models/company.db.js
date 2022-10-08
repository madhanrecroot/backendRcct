const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    company_name:{
      type:String
    },
    basicInformation:{
      cmpname:{
      type:String,
      default:null
    },
    cmpphone:{
      type:String,
    },
    cmpemail:{
      type:String,
    },
    cmpwebsite:{
      type:String,
    },
  },
    companyInformation:{
      infosector:{
        type:String,
      default:null  
      },
      infodes:{
        type:String
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
