const ObjectId = require("mongodb").ObjectId;

const moment = require("moment");
const jobDb = require("../models/Jobs");
const applyJobDb = require("../models/appliedJobs");
const jobTypesDb = require("../models/jobTypes");
const userdb = require("../models/userdb");
const companydb = require("../models/company.db");

exports.addJobs = (req, res) => {
  
  const company = req.params.id
  const{ 
    // jobTitle,
    jobType,
    applicationDeadline,
     requiredSkill,
    // referredBy,
    jobApplyType,
    salary}=req.body.details
    const essentialInformation = req.body.essential
    const jobTitle = req.body.jobTitle
    const jobRole = req.body.jobRole
    // quistion,
    const question = req.body.question
    const jobDescription = req.body.jobDescription
  const address =req.body.location


  const user = new jobDb({
    company:company,
    jobTitle: jobTitle,
    jobType: jobType,
    jobRole:jobRole,
    applicationDeadline: applicationDeadline,
    jobDescription: jobDescription,
    requiredSkill: requiredSkill,
    // referredBy: referredBy,
    jobApplyType: jobApplyType,
    salary: salary,
    essentialInformation: essentialInformation,
    question: question,
    address: address,
  });
  user
    .save()
    .then(() => {
      return res.send("jobs save succesffuly");
    })
    .catch((err) => console.log(err.message));
};



exports.applyJobs = (req, res) => {
console.log(req.body)
  const {
    resumeId,
    coverId,
    candidateId,
    jobId,
    companyId,
    question
  }=req.body
  const jobs =new applyJobDb({
    resumeId:resumeId,
    coverId:coverId,
    candidateId:candidateId,
    jobId:jobId,
    companyId:companyId,
    question:question
  });
  jobs
  .save()
  .then(()=>{
    return res.send("jobs applied succesffuly");
  })
  .catch((err) => console.log(err.message));
}

exports.get_latest_jobs = async (req, res) => {
  jobDb
    .find()
    .sort({ _id: -1 })
    // .limit(8)
    .populate("company")
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};
  
exports.getJobsTypes = async (req, res) => {
  jobTypesDb.find().sort({ _id: -1 })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};
exports.getJobsTypesId = async (req, res) => {
  const id  = req.params.id
  jobTypesDb.findById(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};

exports.addJObtype = async (req,res) =>{
  const name = req.body.name
  const nom = new jobTypesDb(
   { jobNam:name}
  );
  nom
  .save()
  .then(()=>{
    return res.send("jobs applied succesffuly");
  })
  .catch((err) => console.log(err.message));
}
  
  exports.get_job_relatesd_data_count = async (req, res) => {
    const jobCount = await jobDb.countDocuments({}).exec();
    const companyCount = await companydb.countDocuments({}).exec();
    const userCount = await userdb
      .countDocuments({ recrootUserType: "Candidate" })
      .exec();
    const dateTo = moment().format("YYYY-MM-DD");
    const dateFrom = moment().subtract(7, "d").format("YYYY-MM-DD");
    const jobsLastSevenDays = await User.countDocuments({
      created_at: { $lt: dateTo, $gt: dateFrom },
    });
    res
      .status(200)
      .json({
        jobCount: jobCount,
        companyCount: companyCount,
        userCount: userCount,
        jobsLastSevenDays: jobsLastSevenDays,
      });
  };

  exports.searchJobs = async (req, res) => {
    const jobTitle = req.query.keyword;
    const location = req.query.location;
    const type = req.query.type;
    jobDb
      .find({
        jobTitle: {
          $regex: jobTitle,
          $ne: null,
          $options: "i",
        },
        country: {
          $regex: location,
          $ne: null,
          $options: "i",
        },
        city: {
          $regex: location,
          $ne: null,
          $options: "i",
        },
        jobType: {
          $regex: type,
          $ne: null,
          $options: "i",
        },
      })
      .sort({ _id: -1 })
      .limit(10)
      .populate("company")
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => console.log(err.message));
  };
  exports.UpdateStatus = async (req, res) => {
const id = req.params.id
const status =req.body.status
    console.log(id,'apply');
    applyJobDb.findByIdAndUpdate(
      id, { status: status }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        return res.send("Status Has Been Updated Sucessfully");
      }
    });
  };
  exports.UpdateJobStatus = async (req, res) => {
const id = req.params.id
const status =req.body.status
    // console.log(id,'apply');
    jobDb.findByIdAndUpdate(
      id, { status: status }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        return res.send("Status Has Been Updated Sucessfully");
      }
    });
  };

  
exports.update_Job_details = async (req, res) => {

  const{ 
    // jobTitle,
    jobType,
    applicationDeadline,
     requiredSkill,
    // referredBy,
    jobApplyType,
    salary}=req.body.details
    const essentialInformation = req.body.essential
    const jobTitle = req.body.jobTitle
    const jobRole = req.body.jobRole
    // quistion,
    const question = req.body.question
    const jobDescription = req.body.jobDescription
  const address =req.body.location
  const company = req.params.Cid
console.log(req.params.Cid,req.params.id)
  jobDb.findByIdAndUpdate(
    ObjectId(req.params.id),
    {
      company:company,
      jobTitle: jobTitle,
      jobType: jobType,
      jobRole:jobRole,
      applicationDeadline: applicationDeadline,
      jobDescription: jobDescription,
      requiredSkill: requiredSkill,
      // referredBy: referredBy,
      jobApplyType: jobApplyType,
      salary: salary,
      essentialInformation: essentialInformation,
      question: question,
      address: address,
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        return res.send("Resume Uploded successfully");
      }
    }
  )
};


exports.getApplJObs = async (req, res) => {
  const id  = req.params.id
  console.log(id)
  if(id === undefined || id === null){
    console.log('object')
  }else{
    applyJobDb.aggregate([ { $match: { candidateId: ObjectId(id) } }])
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => console.log(err.message));
  }
};

