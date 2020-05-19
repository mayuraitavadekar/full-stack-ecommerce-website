const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {

    Category.findById(id).exec((err, category)=> {
        if(err) {
            return res.status(400).json({
                error : "CATAGORY NOT FOUND IN DB"
            });
        }
        req.category = category;
    });
    next();
}

exports.createCategory = (req, res) => {

    let category = new Category(req.body);
    category.save((err, category) => {
        if(err) {
            return res.status(400).json({
                error : "NOT ABLE TO SAVE CATEGORY IN DB"
            });
        }
        res.json(category);
    });
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err) {
            return res.status(400).json({
                error : "NO CATEGORIES FOUND"
            });
        }
        res.json(categories);
    });
}

exports.updateCategory = (req, res) => {
    let category = req.category;  // from param 
    category.name = req.body.name; // from front end
    category.save((err, updatedCategory) => {
        if(err) {
            return res.status(400).json({
                error : "FAILED TO UPDATE CATEGORY"
            });
        }
        res.json(updatedCategory);
    });
}

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if(err) {
            return res.status(400).json({
                error : "FAILED TO DELETE CATEGORY"
            }); 
        }
        res.json({
            message: "catagory removed successfully"
        });
    });
}

