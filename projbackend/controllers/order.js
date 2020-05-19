const { Order, productCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {

    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error : "NO ORDER FOUND IN DB"
            });
        }
        req.order = order;
        next();
    });
}

exports.createOrder = (req, res) => {

    req.body.order.user = req.profile;  // user inside order is filled by taking benifit from req.profile from param
    
    let order = new Order(req.body.order);

    order.save((err, order) => {
        if(err) {
            return res.status(400).json({
                error : "FAILED TO SAVE YOUR ORDER IN DB"
            });
        }
        res.json(order);
    });
}

exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name ")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error : "NO ORDERS FOUND IN DB"
            });
        }
        return res.json(order); // res all orders
    }); 
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (req, res) => {
    Order.update(
        { _id : req.body.orderId },
        {$set : {status : req.body.status}},
        (err, order) => {
            if(err) {
                return res.satus(400).json({
                    error : "CANNOT UPDATE ORDER STATUS"
                });
            }
            res.json(order);
        }
    );
}