////////////////////file uplodes///////
const AWS = require("aws-sdk");
const fs = require("fs");
// const fileType = require("file-type");
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var bodyParser = require("body-parser");
const Users = require("./models/Users");
const ObjectId = require("mongodb").ObjectId;
const companyDb = require("./models/company.db");

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const bucketName = process.env.BUCKETNAME;

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETACCESKEY,
  region: process.env.REGION,
});


exports.add_profpic = async (req, res) => {
  const id = req.params.id;
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }
  var file = req.file;
  const uploadImage = (file) => {
    const fileStream = fs.createReadStream(file.path);
    const params = {
      Bucket: bucketName,
      Key: "profilePictures/" + Date.now() + file.originalname,
      Body: fileStream,
    };
    s3.upload(params, function (err, data) {
      console.log(data);
      if (err) {
        throw err;
      }
      /////database store///////
      Users.findOneAndUpdate({"_id":ObjectId(id)},
      {$set:{'profpicFileLocation':
      {
        photo:params.Key,
       photoName:req.file.originalname
      },
      }})
        .then(() => {
          return res.send("photo save succesfully");
        })
        .catch((err) => console.log(err.message));
      console.log(`File uploaded successfully.${data.Location}`);
    });
  };
  uploadImage(file);
  return res.sendStatus(201);
};
exports.add_resume = async (req, res) => {

  const id = req.params.id;
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }
  var file = req.file;
  const uploadImage = (file) => {
    const fileStream = fs.createReadStream(file.path);
    const params = {
      Bucket: bucketName,
      Key: "cv/" + Date.now() + file.originalname,
      Body: fileStream,
    };
    s3.upload(params, function (err, data) {
      console.log(data);
      if (err) {
        throw err;
      }
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{
    'resume.resumeFileLocation':{
      resume:params.Key,
   resumeName:req.file.originalname}}})
    .then(() => {
      return res.send("resume save succesfully");
    })
    .catch((err) => console.log(err.message));
  });
};  
    uploadImage(file);
    return res.sendStatus(201);
};
exports.add_cover = async (req, res) => {
  const id = req.params.id;
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }
  var file = req.file;
  const uploadImage = (file) => {
    const fileStream = fs.createReadStream(file.path);
    const params = {
      Bucket: bucketName,
      Key: "coverLetters/" + Date.now() + file.originalname,
      Body: fileStream,
    };
    s3.upload(params, function (err, data) {
      console.log(data);
      if (err) {
        throw err;
      }
      Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.coverLetterFileLocation':{
        cover:params.Key,
       coverName:req.file.originalname}}})
        .then(() => {
          return res.send("cover save succesfully");
        })
        .catch((err) => console.log(err.message));
  });
};  
    uploadImage(file);
    return res.sendStatus(201);
};
exports.add_certificate = async (req, res) => {
  const id = req.params.id;
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }
  var file = req.file;
  const uploadImage = (file) => {
    const fileStream = fs.createReadStream(file.path);
    const params = {
      Bucket: bucketName,
      Key: "coverLetters/" + Date.now() + file.originalname,
      Body: fileStream,
    };
    s3.upload(params, function (err, data) {
      console.log(data);
      if (err) {
        throw err;
      }
      Users.findOneAndUpdate({"_id":ObjectId(id)},{
        $push:{'resume.certificateFileLocation':{certificate:params.Key,
        certificateName:req.file.originalname}}})
         .then(() => {
           return res.send("certificate save succesfully");
         })
         .catch((err) => console.log(err.message));
  });
};  
    uploadImage(file);
    return res.sendStatus(201);
};
exports.add_CompanyLogo = async (req, res) => {
  const id = req.params.id;
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }
  var file = req.file;
  const uploadImage = (file) => {
    const fileStream = fs.createReadStream(file.path);
    const params = {
      Bucket: bucketName,
      Key: "companyLogo/" + Date.now() + file.originalname,
      Body: fileStream,
    };
    s3.upload(params, function (err, data) {
      console.log(data);
      if (err) {
        throw err;
      }
    companyDb.findOneAndUpdate({"_id":ObjectId(id)},
    {$set:{'companyLogo':{logo:params.Key,
     logoName:req.file.originalname}}})
      .then(() => {
        return res.send("logo save succesfully");
      })
      .catch((err) => console.log(err.message));
    });
  };  
      uploadImage(file);
      return res.sendStatus(201);
  }

exports.update_ressume_details = async (req, res) => {
  const { userId, jobField } = req.body;
  const array = [];

  let fileas = req.files;


  s3.createBucket(function () {
    
    //Where you want to store your file
    var ResponseData = [];
    fileas.map((item) => {
      var params = {
        Bucket: bucketName,
        Key: "cv/" + Date.now() + item.originalname,
        Body: fs.createReadStream(item.path),
      };
      const filesdetaoils = {
        resume: params.Key,
        resumeName: item.originalname,
      };
      array.push(filesdetaoils);
      s3.upload(params, function (err, data) {
        if (err) {
          res.json({ "error": true, "Message": err});
        }else{
          ResponseData.push(data);
          if(ResponseData.length == fileas.length){
            res.json({ "error": false, "Message": "File Uploaded    SuceesFully", Data: ResponseData});
          }
        }
      });
    });
    Users.findByIdAndUpdate(
      {"_id":ObjectId(req.body.userId)},
      {
        desiredJobField: jobField,
        $push: { "resume.resumeFileLocation": array },
      }
    ) .then(() => {
      console.log("resume save succesfully");
    })
  });
  
  

};
exports.coverLetter = async (req, res) => {
  const { userId, jobField } = req.body;
  const array = [];

  let fileas = req.files;


  s3.createBucket(function () {
    
    //Where you want to store your file
    var ResponseData = [];
    fileas.map((item) => {
      var params = {
        Bucket: bucketName,
        Key: "coverLetters/" + Date.now() + item.originalname,
        Body: fs.createReadStream(item.path),
      };
      const filesdetaoils = {
        cover: params.Key,
        coverName: item.originalname,
      };
      array.push(filesdetaoils);
      s3.upload(params, function (err, data) {
        if (err) {
          res.json({ "error": true, "Message": err});
        }else{
          ResponseData.push(data);
          if(ResponseData.length == fileas.length){
            res.json({ "error": false, "Message": "File Uploaded    SuceesFully", Data: ResponseData});
          }
        }
      });
    });
    Users.findByIdAndUpdate(
      {"_id":ObjectId(req.body.userId)},
      {
        desiredJobField: jobField,
        $push: { "resume.coverLetterFileLocation": array },
      }
    ) .then(() => {
      console.log("cover save succesfully");
    })
  });
};
exports.certificates = async (req, res) => {
  const { userId, jobField } = req.body;
  const array = [];

  let fileas = req.files;


  s3.createBucket(function () {
    
    //Where you want to store your file
    var ResponseData = [];
    fileas.map((item) => {
      var params = {
        Bucket: bucketName,
        Key: "coverLetters/" + Date.now() + item.originalname,
        Body: fs.createReadStream(item.path),
      };
      const filesdetaoils = {
        certificate: params.Key,
        certificateName: item.originalname,
      };
      array.push(filesdetaoils);
      s3.upload(params, function (err, data) {
        if (err) {
          res.json({ "error": true, "Message": err});
        }else{
          ResponseData.push(data);
          if(ResponseData.length == fileas.length){
            res.json({ "error": false, "Message": "File Uploaded    SuceesFully", Data: ResponseData});
          }
        }
      });
    });
    Users.findByIdAndUpdate(
      {"_id":ObjectId(req.body.userId)},
      {
        desiredJobField: jobField,
        $push: { "resume.certificateFileLocation": array },
      }
    ) .then(() => {
      console.log("certificate save succesfully");
    })
  });
};

/////////fileREtreve//////////////////

  // download the file via aws s3 here


exports.open_profpic =(req,res)=>{
 
  const files = req.query.photo
  console.log(files,'filesprof')

  if(files.includes('upload') || files === '' ||  files === 'nul' ||files === 'null' || files === 'undefined'|| files === undefined){
    return res.status(400).json({ message: "Please choose the file" });
  }
  var options = {
    Bucket: bucketName,
    Key: files,
  };
  res.attachment(files);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
  }


  exports.download_resume =(req,res)=>{
    const files = req.query.resume
  console.log(files,'filesres')
    if(files.includes('upload') || files === '' || files === 'null' || files === 'undefined'|| files === undefined){
      return res.status(400).json({ message: "Please choose the file" });
    }
     var options = {
    Bucket: bucketName,
    Key: files,
  };
  res.attachment(files);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
    }

  exports.download_cover =(req,res)=>{
    const files = req.query.cover
  console.log(files,'filesco')
    if(files.includes('upload') || files === '' || files === 'null' || files === 'undefined'|| files === undefined){
      return res.status(400).json({ message: "Please choose the file" });
    }
     var options = {
    Bucket: bucketName,
    Key: files,
  };
  res.attachment(files);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
    }

exports.open_photos =(req,res)=>{
 
  const files = req.query.compPhotos
  console.log(files,'filescp')
  if(files.includes('upload') || files === '' || files === 'null' || files === 'undefined'|| files === undefined){
    return res.status(400).json({ message: "Please choose the file" });
  }
  var options = {
    Bucket: bucketName,
    Key: files,
  };
  res.attachment(files);
  var fileStream = s3.getObject(options).createReadStream()
  fileStream.pipe(res);
  
  }

  exports.download_certificate =(req,res)=>{
 
    const files = req.query.certificate
    
    if(files.includes('upload') || files === '' || files === 'null' || files === 'undefined'|| files === undefined){
      return res.status(400).json({ message: "Please choose the file" });
    }
    var options = {
      Bucket: bucketName,
      Key: files,
    };
    res.attachment(files);
    var fileStream = s3.getObject(options).createReadStream()
    fileStream.pipe(res);
    
    }