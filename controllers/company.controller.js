const ObjectId = require("mongodb").ObjectId;
const moment = require("moment");
const answerDb = require("../models/answer.db");
const companyDb = require("../models/company.db");
const Companydb = require("../models/company.db");
const questionDb = require("../models/question.db");
const appliedJobs = require("../models/appliedJobs");
const Users = require("../models/Users");
const jobDb = require("../models/Jobs");




exports.getby_experience = async (req, res) => {
  const experience = req.params.experience;
  pipeline = [{ $match: { experience: experience } }];
  companyDb
    .aggregate(pipeline)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};
exports.getby_type = async (req, res) => {
  const type = req.params.type;
  pipeline = [{ $match: { type: type } }];
  companyDb
    .aggregate(pipeline)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};
exports.getby_location = async (req, res) => {
  const location = req.params.location;
  pipeline = [{ $match: { location: location } }];
  companyDb
    .aggregate(pipeline)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};

exports.getby_salaryannual = async (req, res) => {
  const from = req.params.from;
  const to = req.params.to;
  companyDb
    .find({
      annual_pay: {
        $gt: from,
        $lt: to,
      },
    })
    .sort({ annual_pay: 1 })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};

exports.getby_salaryhour = async (req, res) => {
  const from = req.params.from;
  const to = req.params.to;
  const salary = req.query.salaryrange;

  console.log(salary, "654654654");
  companyDb
    .find({
      hour_pay: {
        $gt: from,
        $lt: to,
      },
    })
    .sort({ hour_pay: 1 })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};

exports.getby_time = async (req, res) => {
  const day = req.params.day;
  var startdate = moment().subtract(day, "days").format();
  var todate = moment().format();
  companyDb
    .find({
      createdAt: {
        $gt: startdate,
        $lt: todate,
      },
    })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};
exports.getby_country = async (req, res) => {
  const country = req.params.country;

  pipeline = [{ $match: { current_location: country } }];

  companyDb
    .aggregate(pipeline)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};

exports.get_answers = async (req, res) => {
  const question = req.params.question;
  pipeline = [{ $match: { question: question } }, { $project: { answer: 1 } }];

  answerDb
    .aggregate(pipeline)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};
exports.get_questions = async (req, res) => {
  const id = req.params.id;
  pipeline = [{ $match: { companyId: id } }, { $project: { question: 1 } }];

  questionDb
    .aggregate(pipeline)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};

exports.sortby_salaryasc = async (req, res) => {
  pipeline = [
    { $sort: { salary_amount: 1 } },
    {
      $limit: 8,
    },
  ];
  companyDb
    .aggregate(pipeline)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};
exports.sortby_salary = async (req, res) => {
  pipeline = [
    { $sort: { salary_amount: -1 } },
    {
      $limit: 8,
    },
  ];
  companyDb
    .aggregate(pipeline)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};

exports.edit_company = (req, res) => {
  const id = req.params.id;
  Companydb.update(
    { _id: id },
    {
      $set: {
        company_name: company_name,
        company_logo: company_logo,
        head_q_location: head_q_location,
        position: position,
        current_location: current_location,
        salary_amount: salary_amount,
        type: type,
      },
    },
    function (err, result) {
      if (err) {
        console.log(err.message);
      }
      return res.send("company save succesffuly");
      //do something.
    }
  );
};
exports.company_record_by_id = (req, res, next) => {
  const id = req.params.id;
  pipeline = [{ $match: { _id: ObjectId(id) } }];
  Companydb.aggregate(pipeline)
    .then((data) => {
      data.map((dat) => {
        var epoch = moment(dat.createdAt).format("DMMyyyy HH:mm");
        dat.createdAt = moment(epoch, "DMMyyyy HH:mm").fromNow();
        return res.json(dat);
      });
    })
    .catch((err) => console.log(err.message));
};

exports.company_record = (req, res, next) => {
  pipeline = [
    { $sort: { createdAt: -1 } },
    {
      $limit: 8,
    },
  ];

  Companydb.aggregate(pipeline)
    .then((data) => {
      var records = [];
      data.map((list) => {
        var epoch = moment(list.createdAt).format("DMMyyyy HH:mm");
        list.createdAt = moment(epoch, "DMMyyyy HH:mm").fromNow();
        records.push(list);
      });
      return res.json(records);
    })
    .catch((err) => console.log(err.message));
};

exports.add_company = (req, res, next) => {
  const {
    company_name,
    company_logo,
    hour_pay,
    annual_pay,
    experience,
    location,
    type,
    head_q_location,
    position,
    current_location,
  } = req.body;

  const user = new Companydb({
    company_name: company_name,
    company_logo: company_logo,
    head_q_location: head_q_location,
    position: position,
    current_location: current_location,
    type: type,
    experience: experience,
    hour_pay: hour_pay,
    annual_pay: annual_pay,
    location: location,
  });
  user
    .save()
    .then(() => {
      return res.send("company save succesffuly");
    })
    .catch((err) => console.log(err.message));
};

exports.getApplied_Candit = async (req, res) => {
  const id = req.params.id;
  pipeline = [{ $match: { companyId: ObjectId(id) }},{
    $lookup:
    {
        from:"users",
        localField: "candidateId",
        foreignField: "_id",
        as: "userDetail"
    }
},{$unwind:"$userDetail"} ];
  appliedJobs
    .aggregate(pipeline)
    .then((data) => {
    
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
};

exports.getResumebyID = async (req,res) => {
  const id = req.params.id;
  Users.findOne({'resume.resumeFileLocation._id':ObjectId(id)},{"resume.resumeFileLocation.$":1})
  .then((data)=>{
    return res.json(data);
  })
  .catch((err)=>  console.log(err.message))
}

exports.getJobsbycop = async (req,res) => {
  const id =req.params.id;
  pipeline = [
    {$match: { company: ObjectId(id)}}
  ]
  jobDb.aggregate(pipeline)
    .then((data) => {
    
      return res.json(data);
    })
    .catch((err) => console.log(err.message));
}