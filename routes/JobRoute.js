const jobController = require("../controllers/job.controller");
const subscriberController = require("../controllers/subscribe.controller")
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    // username must be an email
    body("username").isEmail().not(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }),
  ];
};

module.exports = (app) => {
  router.get("/getLatestJobs", jobController.get_latest_jobs);
  router.get("/search/:id/:id/:id", jobController.searchJobs);
  router.post("/addJob/:id", jobController.addJobs);
  router.post("/applyJob", jobController.applyJobs);
  // router.post("/addJob/:id", 
  // // userValidationRules,
  //  jobController.addJobs);
  // router.post("/applyJob", 
  // // userValidationRules,
  //  jobController.applyJobs);
  router.get("/search", jobController.searchJobs);
  router.post("/addSubscribers", subscriberController.enter_subscribers);
  router.get(
    "/getJobRelatetDataCounts",
    jobController.get_job_relatesd_data_count
  );
  app.use("/api", router);
};

