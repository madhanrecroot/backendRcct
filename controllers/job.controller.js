const ObjectId = require("mongodb").ObjectId;

const moment = require("moment");
const jobDb = require("../models/Jobs");
const applyJobDb = require("../models/appliedJobs");
const userdb = require("../models/userdb");
const companydb = require("../models/company.db");

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
