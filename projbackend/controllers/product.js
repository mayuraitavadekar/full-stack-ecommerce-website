const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {

    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err) {
            res.status(400).json({
                error : "CANNOT FIND PRODUCT IN DB"
            });
        }
        req.product = product;
        next();
    });    
}

exports.createProduct = (req,res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error : "PROBLEM WITH IMAGE"
            });
        }

        // destructuring the field
        const { name, description, category, price, stock } = fields;

        if( (name == "" || description == "" || category == "" || price == "" || stock == "") ) {
            return res.status(400).json({
                error : "PLEASE INCLUDE ALL THE FIELDS"
            });
        }
        
        // handle fields
        let product = new Product(fields);

        // handle file
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error : "FILE SIZE TOO BIG"
                });
            }

            // include file in product
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // console.log(product);
    
        // save product to DB
        product.save((err, product) => {
            if(err) {
                return res.status(400).json({
                    error : "CANNOT SAVE THE PRODUCT"
                });
            }
            return res.json(product);
        });
    });
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

// optimization middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error : "CANNOT DELETE PRODUCT"
            });
        }
        res.json({
            message : "PRODUCT DELETED",
            deletedProduct
        });
    });
}

exports.updateProduct = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error : "PROBLEM WITH IMAGE"
            });
        }

        // updation code
        let product = req.product;
        product = _.extend(product, fields);

        // handle file
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error : "FILE SIZE TOO BIG"
                });
            }

            // include file in product
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // console.log(product);
    
        // save product to DB
        product.save((err, product) => {
            if(err) {
                return res.status(400).json({
                    error : "CANNOT UPDATE THE PRODUCT"
                });
            }
            res.json(product);
        });
    });
}

// product listings
exports.getAllProducts = (req, res) => {
    let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo") // do not select photo
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err) {
            res.status(400).json({
                error : "UNABLE TO VIEW ALL PRODUCTS"
            });
        }
        res.json(products);
    });
}

// get distinct category
exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("Category", {}, (err, uniqueCategories) => {
        if(err) {
            return res.status(400).json({
                error : "NO CATEGORY FOUND"
            });
        }
        res.json(uniqueCategories);
    });
}

// update stock and sold
exports.updateStockAndSoldCount = (req, res, next) => {

    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne : {
                filter : { _id : prod._id },
                update : {$inc : { stock : -prod.count , sold : +prod.count}}
            }
        }
    });

    Product.bulkWrite(myOperations, {} , (err, products) => {
        if(err) {
            return res.status(400).json({
                error : "BULK OPERATION FAILED"
            });
        }
        next();
    });
    next();
}


/*
    NOTE : mostly create and update are same
*/
