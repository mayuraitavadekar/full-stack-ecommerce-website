const express = require("express");
const router = express.Router();

const {getUserById} = require("../controllers/user");
const {isAdmin, isAuthenticated, isSignin} = require("../controllers/auth");
const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category");  // you never bring models into routers

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


// actual routes goes here

// create
router.post("/category/create/:userId", isSignin, isAuthenticated, isAdmin, createCategory);

// read
router.get("/category/:categoryId", getCategory);
router.get("/categories",getAllCategory);

// update
router.put("/category/:categoryId/:userId",isSignin, isAuthenticated, isAdmin, updateCategory);

// delete
router.delete("/category/:categoryId/:userId", isSignin, isAuthenticated, isAdmin, removeCategory);

module.exports = router;

/*
1. usually post routes and update routes are almost same in 95% cases
2. PUT is different
*/