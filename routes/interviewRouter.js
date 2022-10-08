const interviewController = require("../controllers/interview.contoller");
const router = require("express").Router();
const auth = require("../middleware/jwtAuth");

module.exports = (app) => {
  router.post("/addInterview",auth, interviewController.add_interview);
  router.get("/getInterview/:id",auth, interviewController.get_interviewdata);
  router.post("/updateInterview",auth, interviewController.Update_interview);
  app.use("/api", router);
};
