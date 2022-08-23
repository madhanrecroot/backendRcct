const interview = require("../models/interview");
const ObjectId = require("mongodb").ObjectId;
const Users = require("../models/Users");


exports.add_interview = (req, res) => {
  console.log(req.body.canditateId, "adadasd");
  const inview = new interview({
    day:req.body.day,
    canditateId:req.body.canditateId,
    companyId:req.body.companyId,
    jobId:req.body.jobId,
    subject:req.body.subject,
    duration:req.body.duration,
    host:req.body.host,
    event:req.body.event,
    zone:req.body.zone,
    time:req.body.time,
    search:req.body.search,
  });
  inview.save().then(() => {
    return res.send("interview Save successfully");
  });
};
exports.get_interviewdata = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pipeline = [{ $match: { companyId: ObjectId(id) } },{
    $lookup:
    {
        from:"users",
        localField: "canditateId",
        foreignField: "_id",
        as: "userDetail"
    }
},{$unwind:"$userDetail"},{
  $lookup:
  {
      from:"jobs",
      localField: "jobId",
      foreignField: "_id",
      as: "jobDetail"
  }
},{$unwind:"$jobDetail"} ];
  interview.aggregate(pipeline).then((data) => {
    console.log(data);
    return res.status(200).send(data);
  });
};
