const express = require("express");
const router = express.Router();

const { isSignin, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStockAndSoldCount } = require("../controllers/product");

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// actual routes

// create
router.post("/order/create/:userId", isSignin, isAuthenticated, pushOrderInPurchaseList, updateStockAndSoldCount, createOrder);

// read
router.get("/order/all/:userId", isSignin, isAuthenticated, isAdmin, getAllOrders);

// status of order
router.get("/order/status/:userId", isSignin, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/:userId", isSignin, isAuthenticated, isAdmin, updateStatus);

// update



module.exports = router;