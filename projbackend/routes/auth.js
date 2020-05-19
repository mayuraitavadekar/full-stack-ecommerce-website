const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const {signout,signup,signin,isSignin} = require("../controllers/auth");

// signup
router.post("/signup",[
    check("name","name must be at least 2 characters").isLength({min : 2}),
    check("email").isEmail(),
    check("password","password must be atleast 3 characters").isLength({min : 3}),
],signup);


// signin
router.post("/signin",[
    check("email").isEmail(),
    check("password","password must be atleast 3 characters").isLength({min : 3}),
],signin);


router.get("/signout",signout);

/*
router.get("/issignin",isSignin,(req,res)=> {
    res.send(req.auth);
});
*/

module.exports = router;
