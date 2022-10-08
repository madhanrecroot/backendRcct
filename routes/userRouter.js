const userController = require("../controllers/user.controller");
const s3Uploader = require("../uploader")
const { upload, upload2 ,upload3,upload4 } = require("../multer");
const router = require("express").Router();
const auth = require("../middleware/jwtAuth");
module.exports = (app) => {
  router.post("/addUser", userController.add_user);
  router.post(
    "/addResume/:id",auth,
    upload.single("resume"),
    s3Uploader.add_resume
  );
  router.post(
    "/addCover/:id",auth,
    upload2.single("cover"),
    s3Uploader.add_cover
  );
  router.post(
    "/addCertificate/:id",auth,
    upload3.single("certificate"),
    userController.add_certificate
      );
  router.post(
    "/addProfpic/:id",auth,
    upload4.single("profpic"),
    s3Uploader.add_profpic
      );


  router.delete( "/deleteResume/:id",auth, userController.delete_resume );
  router.delete( "/deleteCover/:id",auth, userController.delete_cover );
  router.delete( "/deleteCertificate/:id",auth, userController.delete_certificate );
  // router.get("/getResume/:id", userController.get_resume);
  router.get("/downloadResume/", s3Uploader.download_resume);
  router.get("/downloadCover/", s3Uploader.download_cover);
  router.get("/downloadCertificate/", s3Uploader.download_certificate);
  
  router.get("/openProfpic/", s3Uploader.open_profpic);

  router.get("/getPersonal/:id",auth,userController.get_personal);
  router.get("/getExperience/:id",auth,userController.get_experience);

  router.put("/editExp/:id",auth,userController.edit_exp);
  router.put("/editEdu/:id",auth,userController.edit_edu);
  router.put("/editProject/:id",auth,userController.edit_project);
  router.put("/editSkill/:id",auth,userController.edit_skill);
  router.put("/editSocial/:id",auth,userController.edit_social);
  router.put("/editTraining/:id",auth,userController.edit_training);
  router.put("/editPersonal/:id",auth,userController.edit_personal);
  router.put("/editPersonalName/:id",auth,userController.edit_personalName);
  router.put("/verifyEmail",auth,userController.edit_RefeCode)

  router.post("/postExp/:id",auth,userController.post_exp);
  router.post("/postProject/:id",auth,userController.post_project);
  router.post("/postSkill/:id",auth,userController.post_skill);
  router.post("/postSocial/:id",auth,userController.post_social);
  router.post("/postTraining/:id",auth,userController.post_training);
  router.post("/postEdu/:id",auth,userController.post_edu);
 

  router.delete("/deleteExp/:id",auth,userController.delete_exp);
  router.delete("/deleteEdu/:id",auth,userController.delete_edu);
  router.delete("/deleteProject/:id",auth,userController.delete_project);
  router.delete("/deleteSkill/:id",auth,userController.delete_skill);
  router.delete("/deleteSocial/:id",auth,userController.delete_social);
  router.delete("/deleteTraining/:id",auth,userController.delete_training);


  router.get("/getOne/:id",auth,userController.get_one);
  router.get("/getOneEdu/:id",auth,userController.get_singleEdu);
  router.get("/getOneProject/:id",auth,userController.get_singleProject);
  router.get("/getOneSkill/:id",auth,userController.get_singleSkill);
  router.get("/getOneSocial/:id",auth,userController.get_singleSocial);
  router.get("/getOneTraining/:id",auth,userController.get_singleTraining);
  router.get("/getOneResume/:id",auth,userController.get_singleResume);
  router.get("/getOneCover/:id",auth,userController.get_singleCover);
 


  router.get('/return/:id', (req, res) => res.send('Hello World!'))
  // router.post(
  //   "/addCover/:id",
  //   upload2.single("cover"),
  //   userController.add_cover
  // );
  router.post("/updateUserResumeDetails",auth, userController.add_user_resume);
  router.post(
    "/updateResumeDetails",auth,
    upload.array("uplodedFiles", 10),
    s3Uploader.update_ressume_details
  );
  router.put("/createResumeDetails/:id",auth, userController.create_resume);
  router.post("/finalCreateResume/:id",auth,userController.update_resume)
  router.post(
    "/updateCoverLetterFiles",auth,
    upload2.array("coverLettters", 10),
    s3Uploader.coverLetter
  );
  router.post(
    "/updateCertificatesFiles",auth,
    upload3.array("certificates", 10),
    userController.certificates
  );

  app.use("/api", router);
};
