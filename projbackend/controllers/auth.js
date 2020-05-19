const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

exports.signup = (req, res) => {
  // INPUT VALIDATION
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    // errors are presend
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  let user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  // if validation of email and password is successfull, execute findOne()
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "EMAIL DOES NOT EXIST IN DATABASE || USER DOES NOT EXIST",
      });
    }

    // else email is found now check the password
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "EMAIL AND PASSWORD DO NOT MATCH",
      });
    }

    // email and password is matched now sign in user

    // create token
    let token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token into user cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    // send response to front end
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  // simply clear cookies
  res.clearCookie(); // clearCookie is method from cookieParser()
  res.json({
    message: "User signout successfully",
  });
};

// -------- CUSTOM MIDDLEWARES -----------------

exports.isSignin = expressjwt({
  secret: process.env.SECRET,
  userProperty: "auth", // this has json
  // we are not including middleware because it is included in third-party
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.auth._id == req.profile._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  // authenticated; pass the execution
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "NOT ADMIN. ACCESS DENIED",
    });
  }
  next();
};
