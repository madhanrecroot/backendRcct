const companyController = require("../controllers/company.controller");
const s3Uploader = require("../uploader");
const {upload5,upload6 } = require("../multer");
const router = require("express").Router();
const auth = require("../middleware/jwtAuth");

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
  
  router.get ("/getApplyCanditates/:id",auth,companyController.getApplied_Candit)
  router.get ("/getResumeSin/:id",auth,companyController.getResumebyID)
  router.get("/getJobsComp/:id",auth,companyController.getJobsbycop)
  router.get("/getMember/:id",auth,companyController.getMembers)
  router.post("/updateCompanyDetails/:id",auth,companyController.update_details)
  router.post(
    "/updateCompanyLogo/:id",auth,
    upload5.single("logo"),
    s3Uploader.add_CompanyLogo
  );
  // router.post(
  //   "/updateCompanyPhotos/:id",
  //   upload6.array("compphotos", 5),
  //   companyController.companyPhotos
  // );
  app.use("/api", router);
};

router.get ("/getCompanyDetails/:id",auth,companyController.getCompany)
router.get ("/getCompanyPhotos/",s3Uploader.open_photos)