const multer = require("multer");
const path = require("path");
const express = require("express");
var app = express();
// const { MulterError } = require("multer");

const storage1 = multer.diskStorage({
    destination: './upload/resume',

    filename: (req, file, cb) =>{
            return cb(null, `${Date.now()}_${path.basename(file.originalname)}`)
            // return cb(null, `${Date.now()}_${path.basename(file.originalname)}`)
    }
    
});

const storage2 = multer.diskStorage({
    destination: './upload/cover',

    filename: (req, file, cb) =>{
        return cb(null, `${Date.now()}_${path.basename(file.originalname)}`)
    }
    
})

const storage3 = multer.diskStorage({
    destination: './upload/certificate',

    filename: (req, file, cb) =>{
        return cb(null, `${Date.now()}_${path.basename(file.originalname)}`)
    }
    
})

const storage4 = multer.diskStorage({
    destination: './upload/profpic',

    filename: (req, file, cb) =>{
        return cb(null, `${Date.now()}_${path.basename(file.originalname)}`)
    }
    
})




exports.upload = multer({
    storage: storage1,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/msword") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .pdf, .doc and .docx format allowed!'));
        }
      }
});

exports.upload2 = multer({
    storage: storage2,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/msword") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .pdf, .doc and .docx format allowed!'));
        }
      }
});

exports.upload3 = multer({
    storage: storage3,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/msword") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .pdf, .doc and .docx format allowed!'));
        }
      }
});

exports.upload4 = multer({
    storage: storage4,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
});








// cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
// cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])