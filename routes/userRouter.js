const userController = require("../controllers/user.controller");
const { upload, upload2 ,upload3,upload4 } = require("../multer");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/addUser", userController.add_user);
  router.post(
    "/addResume/:id",
    upload.single("resume"),
    userController.add_resume
  );
  router.post(
    "/addCover/:id",
    upload2.single("cover"),
    userController.add_cover
  );
  router.post(
    "/addCertificate/:id",
    upload3.single("certificate"),
    userController.add_certificate
      );
  router.post(
    "/addProfpic/:id",
    upload4.single("profpic"),
    userController.add_profpic
      );


  router.delete( "/deleteResume/:id", userController.delete_resume );
  router.delete( "/deleteCover/:id", userController.delete_cover );
  router.delete( "/deleteCertificate/:id", userController.delete_certificate );
  // router.get("/getResume/:id", userController.get_resume);
  router.get("/downloadResume/", userController.download_resume);
  router.get("/downloadCover/", userController.download_cover);
  router.get("/downloadCertificate/", userController.download_certificate);
  
  router.get("/openProfpic/", userController.open_profpic);

  router.get("/getPersonal/:id",userController.get_personal);
  router.get("/getExperience/:id",userController.get_experience);

  router.put("/editExp/:id",userController.edit_exp);
  router.put("/editEdu/:id",userController.edit_edu);
  router.put("/editProject/:id",userController.edit_project);
  router.put("/editSkill/:id",userController.edit_skill);
  router.put("/editSocial/:id",userController.edit_social);
  router.put("/editTraining/:id",userController.edit_training);
  router.put("/editPersonal/:id",userController.edit_personal);
  router.put("/editPersonalName/:id",userController.edit_personalName);


  router.post("/postExp/:id",userController.post_exp);
  router.post("/postProject/:id",userController.post_project);
  router.post("/postSkill/:id",userController.post_skill);
  router.post("/postSocial/:id",userController.post_social);
  router.post("/postTraining/:id",userController.post_training);
  router.post("/postEdu/:id",userController.post_edu);
 

  router.delete("/deleteExp/:id",userController.delete_exp);
  router.delete("/deleteEdu/:id",userController.delete_edu);
  router.delete("/deleteProject/:id",userController.delete_project);
  router.delete("/deleteSkill/:id",userController.delete_skill);
  router.delete("/deleteSocial/:id",userController.delete_social);
  router.delete("/deleteTraining/:id",userController.delete_training);


  router.get("/getOne/:id",userController.get_one);
  router.get("/getOneEdu/:id",userController.get_singleEdu);
  router.get("/getOneProject/:id",userController.get_singleProject);
  router.get("/getOneSkill/:id",userController.get_singleSkill);
  router.get("/getOneSocial/:id",userController.get_singleSocial);
  router.get("/getOneTraining/:id",userController.get_singleTraining);
  router.get("/getOneResume/:id",userController.get_singleResume);
  router.get("/getOneCover/:id",userController.get_singleCover);
 


  router.get('/return/:id', (req, res) => res.send('Hello World!'))
  router.post(
    "/addCover/:id",
    upload2.single("cover"),
    userController.add_cover
  );
  router.post("/updateUserResumeDetails", userController.add_user_resume);
  app.use("/api", router);
};
