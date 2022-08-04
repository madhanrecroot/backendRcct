const resumedb = require("../models/resumedb");
const userdb = require("../models/userdb");
const userResume = require("../models/userResume");
const UserResumeProfile = require("../models/userResume");
const Users = require("../models/Users");

const ObjectId = require("mongodb").ObjectId;
const axios = require("axios").default;

exports.get_personal = (req,res) => {
  const id = req.params.id;
 pipeline =[
  { $match: { _id: ObjectId(id) } },
  { $project: { "name":1,"email":1,"number":"$resume.mobileNumber","resume.country":1,"role":1,"profpicFileLocation":1} }
 ]
 Users.aggregate(pipeline).then((data) => {
  return res.status(200).json(data);

});
}

exports.get_experience = (req,res) => {
  const id = req.params.id;
 pipeline =[
  { $match: { _id: ObjectId(id) } },
  { $project: { "resume":1,"email":1 ,"name":1,"profpicFileLocation":1 }}
 ]
 Users.aggregate(pipeline).then((data) => {
  return res.status(200).json(data);
});
}

exports.get_valueadd = (req,res) => {
  const id = req.params.id;
 pipeline =[
  { $match: { _id: ObjectId(id) } },
  { $project: { "projects":"$resume.projects","training":"$resume.traning","social":"$resume.socialMediaLink" }}
 ]
 Users.aggregate(pipeline).then((data) => {
  console.log(data,'social');
  return res.status(200).json(data);
});
}




exports.download_resume =(req,res)=>{
 
// const files = req.query.resume

  try {
//     const file = files ;
    res.download("public\1657789363819_movielist.pdf");
  } catch (err) {
    console.log(err);
  }
}

exports.download_cover =(req,res)=>{
const files = req.query.cover
  try {
    const file = files ;
    res.download(file);
  } catch (err) {
    console.log(err);
  }
}

exports.download_certificate =(req,res)=>{
 
const files = req.query.certificate

  try {
    const file = files ;
    res.download(file);
  } catch (err) {
    console.log(err);
  }

}

exports.open_profpic =(req,res)=>{
 
const files = req.query.photo

  try {
    const file = files ;
    res.download(file);
  } catch (err) {
    console.log(err);
  }

}

exports.add_resume = async (req, res) => {
  const id = req.params.id;
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.resumeFileLocation':{resume:req.file.path,
   resumeName:req.file.originalname}}})

    .then(() => {
      return res.send("resume save succesfully");
    })
    .catch((err) => console.log(err.message));
};

exports.add_cover = async (req, res) => {
  const id = req.params.id;
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.coverLetterFileLocation':{cover:req.file.path,
   coverName:req.file.originalname}}})

    .then(() => {
      return res.send("cover save succesfully");
    })
    .catch((err) => console.log(err.message));
};

exports.add_certificate = async (req, res) => {
  const id = req.params.id;

  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.certificateFileLocation':{certificate:req.file.path,
   certificateName:req.file.originalname}}})
    .then(() => {
      return res.send("certificate save succesfully");
    })
    .catch((err) => console.log(err.message));
};
exports.add_profpic = async (req, res) => {
  const id = req.params.id;
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$set:{'profpicFileLocation':
  {
    photo:req.file.path,
   photoName:req.file.originalname
  },
  }})
    .then(() => {
      return res.send("photo save succesfully");
    })
    .catch((err) => console.log(err.message));
};

exports.delete_resume = async (req, res) => {
  const id = req.params.id;
  Users.updateOne({'resume.resumeFileLocation._id':ObjectId(id)},{$pull:{'resume.resumeFileLocation':{'_id':ObjectId(id)}}})

    .then(() => {
      return res.send("resume deleted successfully");
    })
    .catch((err) => console.log(err.message));
};
exports.delete_certificate = async (req, res) => {
  const id = req.params.id;
  Users.updateOne({'resume.certificateFileLocation._id':ObjectId(id)},{$pull:{'resume.certificateFileLocation':{'_id':ObjectId(id)}}})

    .then(() => {
      return res.send("certificate deleted successfully");
    })
    .catch((err) => console.log(err.message));
};
exports.delete_cover = async (req, res) => {
  const id = req.params.id;
  Users.updateOne({'resume.coverLetterFileLocation._id':ObjectId(id)},{$pull:{'resume.coverLetterFileLocation':{'_id':ObjectId(id)}}})

    .then(() => {
      return res.send("cover deleted successfully");
    })
    .catch((err) => console.log(err.message));
    
};



// exports.add_cover = async (req, res) => {
//   const id = req.params.id;
//   const { cover, userID } = req.body;
//   const resum = new resumedb({
//     cover: req.file.path,
//     userID: id,
//   });
//   resum
//     .save()
//     .then(() => {
//       return res.send("cover save succesffuly");
//     })
//     .catch((err) => console.log(err.message));
// };
exports.add_user = (req, res) => {
  const {
    user_name,
    user_logo,
    skills,
    experience,
    cover,
    certificate,
    resume,
    location,
    email,
    phone,
  } = req.body;
  const user = new userdb({
    user_name: user_name,
    user_logo: user_logo,
    location: location,
    email: email,
    phone: phone,
    resume: resume,
    cover: cover,
    certificate: certificate,
    experience: experience,
    skills: skills,
  });
  user
    .save()
    .then(() => {
      return res.send("user save succesffuly");
    })
    .catch((err) => console.log(err.message));
};

exports.add_user_resume = async (req, res) => {
  const { user_id, resume } = req.body;
  Users.findByIdAndUpdate(ObjectId(user_id), { resume: resume }, function ( err , docs){
    if (err) {
      console.log(err);
    } else {
      console.log("Updated User : ", docs);
      return res.send("user save succesffuly");
    }
  });
}

exports.post_exp =(req, res) => {
 const id = req.params.id;
 const exp = req.body;
 console.log(id,'asasa');
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.workExperience':exp}}
  )
  .then((data) => {
    console.log(data,'dataaaaa');
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.post_edu =(req, res) => {
 const id = req.params.id;
 const exp = req.body;
 console.log(id,'asasa');
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.education':exp}}
  )
  .then((data) => {
    console.log(data,'dataaaaa');
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}


exports.post_project =(req, res) => {
 const id = req.params.id;
 const exp = req.body;
 console.log(id,'asasa');
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.projects':exp}}
  )
  .then((data) => {
    console.log(data,'dataaaaa');
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.post_social =(req, res) => {
 const id = req.params.id;
 const exp = req.body;
 console.log(id,'asasa');
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.socialMediaLink':exp}}
  )
  .then((data) => {
    console.log(data,'dataaaaa');
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.post_training =(req, res) => {
 const id = req.params.id;
 const exp = req.body;
 console.log(id,'asasa');
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.traning':exp}}
  )
  .then((data) => {
    console.log(data,'dataaaaa');
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.post_skill =(req, res) => {
 const id = req.params.id;
 const exp = req.body;
 console.log(id,'asasa');
  Users.findOneAndUpdate({"_id":ObjectId(id)},{$push:{'resume.skills':exp}}
  )
  .then((data) => {
    console.log(data,'dataaaaa');
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}



exports.edit_exp =(req, res) => {
  const id =req.params.id;;
  Users.findOneAndUpdate({'resume.workExperience._id':ObjectId(id)},
  {$set:{
    'resume.workExperience.$.companyName':req.body.companyName,
    'resume.workExperience.$.experience':req.body.experience,
    'resume.workExperience.$.duration':req.body.duration,
    'resume.workExperience.$.location':req.body.location,
    'resume.workExperience.$.country':req.body.country,
    'resume.workExperience.$.fromDate':req.body.fromDate,
    'resume.workExperience.$.toDate':req.body.toDate,
    'resume.workExperience.$.role':req.body.role,
  }})
  .then((data) => {
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.edit_edu =(req, res) => {
  const id =req.params.id;;
  Users.findOneAndUpdate({'resume.education._id':ObjectId(id)},
  {$set:{
    'resume.education.$.collegeName':req.body.collegeName,
    'resume.education.$.experience':req.body.experience,
    'resume.education.$.duration':req.body.duration,
    'resume.education.$.experience':req.body.experience,
    'resume.education.$.country':req.body.country,
    'resume.education.$.fromDate':req.body.fromDate,
    'resume.education.$.toDate':req.body.toDate,
    'resume.education.$.graduate':req.body.graduate,
    'resume.education.$.state':req.body.state,
    'resume.education.$.degreeName':req.body.degreeName,
  }})
  .then((data) => {
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}
exports.edit_project =(req, res) => {
  const id =req.params.id;;
  Users.findOneAndUpdate({'resume.projects._id':ObjectId(id)},
  {$set:{
    'resume.projects.$.portafolioLink':req.body.portafolioLink,
    'resume.projects.$.ProjectName':req.body.ProjectName,
    'resume.projects.$.Organization':req.body.Organization,
    'resume.projects.$.fromDate':req.body.fromDate,
    'resume.projects.$.toDate':req.body.toDate,
    'resume.projects.$.Description':req.body.Description,
  }})
  .then((data) => {
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}
exports.edit_training =(req, res) => {
  const id =req.params.id;
  console.log(req.body,'body')
  Users.findOneAndUpdate({'resume.traning._id':ObjectId(id)},
  {$set:{
    'resume.traning.$.title':req.body.title,
    'resume.traning.$.instituete':req.body.instituete,
    'resume.traning.$.fromDate':req.body.fromDate,
    'resume.traning.$.toDate':req.body.toDate,
  }})
  .then((data) => {
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}




exports.edit_social =(req, res) => {
  const id =req.params.id;;
  Users.findOneAndUpdate({'resume.socialMediaLink._id':ObjectId(id)},
  {$set:{
    'resume.socialMediaLink.$.title':req.body.title,
    'resume.socialMediaLink.$.socialMediaLink':req.body.socialMediaLink,
  }})
  .then((data) => {
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.edit_skill =(req, res) => {
  const id =req.params.id;;
  Users.findOneAndUpdate({'resume.skills._id':ObjectId(id)},
  {$set:{
    'resume.skills.$.skillName':req.body.skillName,
    'resume.skills.$.Experience':req.body.Experience,
    'resume.skills.$.Compitance':req.body.Compitance,
  }})
  .then((data) => {
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}


exports.edit_personal =(req, res) => {
  const id =req.params.id;
  Users.findOneAndUpdate({'_id':ObjectId(id)},
  {$set:{
    'resume.country':req.body.country,
    'resume.nationality':req.body.nationality,
    'resume.countrieswithworkingRights':req.body.countrieswithworkingRights,
    'resume.availableToWork':req.body.available,
  }})
  .then((data) => {
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);

  })
}
exports.edit_personalName =(req, res) => {
  const id =req.params.id;
  Users.findOneAndUpdate({'_id':ObjectId(id)},
  {$set:{
    'name':req.body.name,
    'resume.mobileNumber':req.body.number
  }})
  .then((data) => {
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(201).send("User save Successfully")
    }
  })
  .catch((err) => {
    res.status(400).send(err);

  })
}




exports.delete_exp = (req,res) => {
  const id = req.params.id;
  Users.updateOne({'resume.workExperience._id':ObjectId(id)},{$pull:{'resume.workExperience':{'_id':ObjectId(id)}}})
  .then(data => {
    if(!data){
        res.status(400).send("User not found");
    }
    else{
        res.status(200).send("User deleted Successfully");
    }
})
.catch((err) => {
    res.status(500).send({message:err})
})
}

exports.delete_edu = (req,res) => {
  const id = req.params.id;
  Users.updateOne({'resume.education._id':ObjectId(id)},{$pull:{'resume.education':{'_id':ObjectId(id)}}})
  .then(data => {
    if(!data){
        res.status(400).send("User not found");
    }
    else{
        res.status(200).send("User deleted Successfully");
    }
})
.catch((err) => {
    res.status(500).send({message:err})
})
}

exports.delete_project = (req,res) => {
  const id = req.params.id;
  Users.updateOne({'resume.projects._id':ObjectId(id)},{$pull:{'resume.projects':{'_id':ObjectId(id)}}})
  .then(data => {
    if(!data){
        res.status(400).send("User not found");
    }
    else{
        res.status(200).send("User deleted Successfully");
    }
})
.catch((err) => {
    res.status(500).send({message:err})
})
}
exports.delete_training= (req,res) => {
  const id = req.params.id;
  Users.updateOne({'resume.traning._id':ObjectId(id)},{$pull:{'resume.traning':{'_id':ObjectId(id)}}})
  .then(data => {
    if(!data){
        res.status(400).send("User not found");
    }
    else{
        res.status(200).send("User deleted Successfully");
    }
})
.catch((err) => {
    res.status(500).send({message:err})
})
}

exports.delete_social = (req,res) => {
  const id = req.params.id;
  Users.updateOne({'resume.socialMediaLink._id':ObjectId(id)},{$pull:{'resume.socialMediaLink':{'_id':ObjectId(id)}}})
  .then(data => {
    if(!data){
        res.status(400).send("User not found");
    }
    else{
        res.status(200).send("User deleted Successfully");
    }
})
.catch((err) => {
    res.status(500).send({message:err})
})
}


exports.delete_skill = (req,res) => {
  const id = req.params.id;
  Users.updateOne({'resume.skills._id':ObjectId(id)},{$pull:{'resume.skills':{'_id':ObjectId(id)}}})
  .then(data => {
    if(!data){
        res.status(400).send("User not found");
    }
    else{
        res.status(200).send("User deleted Successfully");
    }
})
.catch((err) => {
    res.status(500).send({message:err})
})
}



exports.get_one = (req,res) => {
  const id = req.params.id;
  Users.findOne({'resume.workExperience._id':ObjectId(id)},{"resume.workExperience.$":1})
  .then((data) => {res.status(200).send(data)})
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.get_singleEdu = (req,res) => {
  const id = req.params.id;
  Users.findOne({'resume.education._id':ObjectId(id)},{"resume.education.$":1})
  .then((data) => {res.status(200).send(data)})
  .catch((err) => {
    res.status(400).send(err);
  })
}
exports.get_singleProject = (req,res) => {
  const id = req.params.id;
  Users.findOne({'resume.projects._id':ObjectId(id)},{"resume.projects.$":1})
  .then((data) => {res.status(200).send(data)})
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.get_singleTraining = (req,res) => {
  const id = req.params.id;
  Users.findOne({'resume.traning._id':ObjectId(id)},{"resume.traning.$":1})
  .then((data) => {res.status(200).send(data)})
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.get_singleSocial = (req,res) => {
  const id = req.params.id;
  Users.findOne({'resume.socialMediaLink._id':ObjectId(id)},{"resume.socialMediaLink.$":1})
  .then((data) => {res.status(200).send(data)})
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.get_singleSkill = (req,res) => {
  const id = req.params.id;
  Users.findOne({'resume.skills._id':ObjectId(id)},{"resume.skills.$":1})
  .then((data) => {res.status(200).send(data)})
  .catch((err) => {
    res.status(400).send(err);
  })
}
exports.get_singleResume = (req,res) => {
  const id = req.params.id;
  Users.findOne({'resume.resumeFileLocation._id':ObjectId(id)},{"resume.resumeFileLocation.$":1})
  .then((data) => {res.status(200).send(data)})
  .catch((err) => {
    res.status(400).send(err);
  })
}
exports.get_singleCover = (req,res) => {
  const id = req.params.id;
  Users.findOne({'resume.coverLetterFileLocation._id':ObjectId(id)},{"resume.coverLetterFileLocation.$":1})
  .then((data) => {res.status(200).send(data)})
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.get_return =(req,res)=>{
  const data = "helo wort";
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ a: 1 }));
}
