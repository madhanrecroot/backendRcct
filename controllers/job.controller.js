const ObjectId = require("mongodb").ObjectId;

const moment = require("moment");
const jobDb = require("../models/Jobs");
const applyJobDb = require("../models/appliedJobs");

exports.addJobs = (req, res) => {
  
  const company = req.params.id
  const{ 
    jobTitle,
    jobType,
    applicationDeadline,
    jobDescription,
    requiredSkill,
    // referredBy,
    jobApplyType,
    salary}=req.body.details
    const essentialInformation = req.body.essential
    // quistion,
  const address =req.body.location


  const user = new jobDb({
    company:company,
    jobTitle: jobTitle,
    jobType: jobType,
    applicationDeadline: applicationDeadline,
    jobDescription: jobDescription,
    requiredSkill: requiredSkill,
    // referredBy: referredBy,
    jobApplyType: jobApplyType,
    salary: salary,
    essentialInformation: essentialInformation,
    // quistion: quistion,
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

  const {
    resumeId,
    coverId,
    candidateId,
    jobId,
    companyId
  }=req.body
  const jobs =new applyJobDb({
    resumeId:resumeId,
    coverId:coverId,
    candidateId:candidateId,
    jobId:jobId,
    companyId:companyId
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
    .limit(8)
    .populate("company")
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};
exports.searchJobs = async (req, res) => {
  const type = req.params.type;
  console.log(type);
  // const { jobTitle } = req.body;
  // console.log(jobTitle);
  // jobDb
  //   .find({
  //     jobTitle: {
  //       $regex: jobTitle,
  //       $options: "i",
  //     },
  //     country: {
  //       $regex: jobTitle,
  //       $ne: null,
  //       $options: "i",
  //     },
  //     city: {
  //       $regex: jobTitle,
  //       $ne: null,
  //       $options: "i",
  //     },
  //   })
  //   .then((data) => {
  //     return res.json(data);
  //   })
  //   .catch((err) => console.log(err.message));
};