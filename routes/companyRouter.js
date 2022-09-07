const companyController = require("../controllers/company.controller");
const {upload5,upload6 } = require("../multer");
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
  router.get("/getMember/:id",companyController.getMembers)
  router.post("/updateCompanyDetails/:id",companyController.update_details)
  router.post(
    "/updateCompanyLogo/:id",
    upload5.single("logo"),
    companyController.add_CompanyLogo
  );
  router.post(
    "/updateCompanyPhotos/:id",
    upload6.array("compphotos", 5),
    companyController.companyPhotos
  );
  app.use("/api", router);
};
