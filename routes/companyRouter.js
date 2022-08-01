const companyController = require("../controllers/company.controller");
const router = require("express").Router();
module.exports = (app) => {
  router.get("/company", companyController.company_record);
  router.get("/salarySort", companyController.sortby_salary);
  router.get("/salarySortasc", companyController.sortby_salaryasc);
  router.get("/company/:id", companyController.company_record_by_id);
  router.post("/addCompany", companyController.add_company);
  router.put("/edit/:id", companyController.edit_company);
  router.get("/company/questions/:id", companyController.get_questions);
  router.get("/company/answers/:question", companyController.get_answers);
  router.get("/company/country/:country", companyController.getby_country);
  router.get("/company/location/:location", companyController.getby_location);
  router.get("/company/type/:type", companyController.getby_type);
  router.get(
    "/company/experience/:experience",
    companyController.getby_experience
  );
  router.get("/company/day/:day", companyController.getby_time);
  router.get("/company/hour/:from/:to", companyController.getby_salaryhour);
  router.get("/company/annual/:from/:to", companyController.getby_salaryannual);
  
  router.get ("/getApplyCanditates/:id",companyController.getApplied_Candit)
  router.get ("/getResumeSin/:id",companyController.getResumebyID)
  router.get("/getJobsComp/:id",companyController.getJobsbycop)
  app.use("/api", router);
};
