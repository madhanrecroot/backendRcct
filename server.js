if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
// const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const initializePassport = require("./passport-config");
const User = require("./models/Users");
const companyDb = require("./models/company.db");

const { body, validationResult } = require("express-validator");
const auth = require("./middleware/jwtAuth");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://moonlit-palmier-63f820.netlify.app/");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "https://moonlit-palmier-63f820.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
const localStrategy = require("passport-local").Strategy;
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     function (email, password, cb) {
//       console.log(password);
//       //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//       // return User.findOne({ email })
//       User.findOne({ $and: [{ email: email }] })
//         .then((user) => {
//           if (!user) {
//             return cb(null, false, { message: "Incorrect email." });
//           }
//           // const passwordMatch = bcrypt.compare(
//           //   password,
//           //   user.password,
//           //   function (err, isMatch) {
//           //     if (err) {
//           //       throw err;
//           //     } else if (!isMatch) {
//           //       console.log("incorrect pass");
//           //       return cb(null, false, { message: "Incorrect Password." });
//           //     } else {
//           //       return false;
//           //     }
//           //   }
//           // );

//           // if (passwordMatch) {
//           //   return cb(null, false, { message: "Incorrect Password." });
//           // }
//           return cb(null, user, { message: "Logged In Successfully" });
//         })
//         .catch((err) => cb(err));
//     }
//   )
// );

// ...

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const GOOGLE_CLIENT_ID =
  "672175532425-d5af6nvj3u5uhuls8vptspth5pgf5mdn.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://backendrect.herokuapp.com/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
// mongoose.connect("mongodb://localhost/myapp");

mongoose
  .connect(
    process.env.MONGO_URL,
    {useNewUrlParser:true}
  )
  .then(() => {
    console.log("mongoose conected")
  })
  .catch(err => console.log(err.message))
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
const users = [];
app.use(express.json());
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
// const passport = require("passport");

// passport.use(strategy);

// app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use("/resume", auth, express.static("upload/resume"));
app.use("/cover", express.static("upload/cover"));

require("./routes/companyRouter")(app);
require("./routes/userRouter")(app);
require("./routes/JobRoute")(app);
require("./routes/interviewRouter")(app);

app.get("/", checkAuthenticated, (req, res) => {
  res.status(200).json({ message: "User loged in Sucessfully" });
});

app.get("/sendMail", (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "dilanja@recroot.io",
    from: "dilanjachandrarathna@gmail.com", // Use the email address or domain you verified above
    // fromname: "recroot",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  (async () => {
    try {
      await sgMail.send(msg);
      res.status(200).json({ message: "Email Send Sucessfully" });
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();

  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // const msg = {
  //   to: "dilanja@recroot.com",
  //   from: "dilanjachandrarathna@gmail.com",
  //   subject: "Hello world",
  //   text: "Hello plain world!",
  //   html: "<p>Hello HTML world!</p>",
  // };
  // sgMail.send(msg);
});

// app.get("/login", checkNotAuthenticated, (req, res) => {
//   res.status(200).json({ message: "User loged in failed" });
// });

// app.post("/login", checkNotAuthenticated, async (req, res) => {
//   // try {
//   //   console.log(req.body.name);
//   // } catch (error) {
//   //   console.log(error);
//   //   res.status(500).json({ message: "Something Went Wrong" });
//   // }
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err || !user) {
//       // console.log(err);
//       return res.status(400).json({
//         message: err,
//         user: user,
//       });
//     }
//     req.login(user, { session: false }, (err) => {
//       if (err) {
//         res.send(err);
//       }
//       // generate a signed son web token with the contents of user object and return it in the response
//       // const token = jwt.sign(user, "your_jwt_secret");
//       return res.json({ user });
//     });
//   })(req, res);
// });
app.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res
          .status(500)
          .json({ message: "Plesae check Your Email And Password" });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ User: user, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// app.get("/register", checkNotAuthenticated, (req, res) => {
//   res.render("register.ejs");
// });

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
app.get("/login/success", (req, res) => {
  if (req.user) {
    const email = req.user.email;
    // Create token
    const token = jwt.sign(
      { user_id: req.user.id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    console.log(token);

    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      token: token,
      cookies: req.cookies,
    });
  }
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://moonlit-palmier-63f820.netlify.app/signUp",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
  console.log(req.user);
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});
//////////////////////////////////////////////////////////
app.put(
  "/resendCode",
  async(req,res) => {
   const id = req.body.id;
   const name = req.body.firstName;
   const email =req.body.email;
   const codes = Math.floor(1000 + Math.random() * 9000);
  console.log(req.body,'code')
   User.findOneAndUpdate({'_id':id},
 { $set:{
    'referral_code':codes
  }}
  ).then((data) => {
    if(!data){
      res.status(400).send("User not in this data")
    }
    else{
      res.status(200).json({codes});
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: "dilanjachandrarathna@gmail.com", // Use the email address or domain you verified above
        // fromname: "recroot",
        subject: "Recrrot Verification Code",
        text: `Hi ${name}. your OTP NO IS ${codes}`,
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Recroot</a>
          </div>
          <p style="font-size:1.1em">Hi,${name}</p>
          <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. </p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${codes}</h2>
          <p style="font-size:0.9em;">Regards,<br />Recroot</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          </div>
        </div>
      </div>`,
      }; (async () => {
        try {
          await sgMail.send(msg);
          console.log(email);
          console.log("Email Send Sucessfully");
          // res.status(200).json({ message: "Email Send Sucessfully" });
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      })();
  }
)
app.post(
  "/register",
  checkNotAuthenticated, // username must be an email
  body("email", "Your email is not valid. Please Enter a Valid Email")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail(),
  async (req, res) => {
    const userExist = await User.find({ email: req.body.email });
    if (userExist.length > 0) {
      return res.status(400).send({ message: "User already exists" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
   if (req.body.recrootUserType == "Candidate") {
        newUser = await User.create({
          id: Date.now().toString(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          sector: req.body.sector,
          organization: req.body.organization,
          recrootUserType: req.body.recrootUserType,
          email: req.body.email,
          password: hashedPassword,
          companyId: null,
        });
      } else if(req.body.recrootUserType == "Member"){
        newUser = await User.create({
          id: Date.now().toString(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          sector: req.body.sector,
          organization: req.body.organization,
          recrootUserType: req.body.recrootUserType,
          email: req.body.email,
          password: hashedPassword,
          companyId: req.body.companyId,
        });
      }else{
        const newComany = await companyDb.create({
          company_name: req.body.organization,
        });
        newUser = await User.create({
          id: Date.now().toString(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          sector: req.body.sector,
          organization: req.body.organization,
          recrootUserType: req.body.recrootUserType,
          email: req.body.email,
          password: hashedPassword,
          companyId: newComany._id,
        });
      }
      const email = newUser.email;

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: "dilanjachandrarathna@gmail.com", // Use the email address or domain you verified above
        // fromname: "recroot",
        subject: "Recrrot Verification Code",
        text: `Hi ${newUser.firstName}. your OTP NO IS ${newUser.referral_code}`,
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Recroot</a>
          </div>
          <p style="font-size:1.1em">Hi,${newUser.firstName}</p>
          <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. </p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${newUser.referral_code}</h2>
          <p style="font-size:0.9em;">Regards,<br />Recroot</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        
          </div>
        </div>
      </div>`,
      };

      (async () => {
        try {
          await sgMail.send(msg);
          console.log(email);
          console.log("Email Send Sucessfully");
          // res.status(200).json({ message: "Email Send Sucessfully" });
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      })();

      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      console.log(token);
      newUser.token = token;
      console.log(newUser);
      res
        .status(200)
        .json({ message: "User Saved Sucessfully", User: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
);

app.delete("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode");
});
