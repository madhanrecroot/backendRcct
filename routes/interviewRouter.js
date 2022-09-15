const interviewController = require("../controllers/interview.contoller");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/addInterview", interviewController.add_interview);
  router.get("/getInterview/:id", interviewController.get_interviewdata);
  router.post("/updateInterview", interviewController.Update_interview);
  app.use("/api", router);
};
