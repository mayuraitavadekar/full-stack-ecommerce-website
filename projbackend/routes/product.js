const express = require("express");
const router = express.Router();

const { getProductById, createProduct,  getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require("../controllers/product");
const { isSignin, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// PARAMS
router.param("userId", getUserById);
router.param("productId", getProductById);

// ACTUAL ROUTES

// create
router.post("/product/create/:userId", isSignin, isAuthenticated, isAdmin, createProduct);

// read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// update
router.put("/product/:productId/:userId", isSignin, isAuthenticated, isAdmin, updateProduct);

// delete
router.delete("/product/:productId/:userId", isSignin, isAuthenticated, isAdmin, deleteProduct);


// listing products
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;