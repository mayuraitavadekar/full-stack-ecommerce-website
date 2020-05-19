const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema(
    {
        name : {
            type : String,
            trim : true,
            unique : true,
            required : true,
            maxlength : 32
        },
    },

    {
        timestamps : true
    }
);

module.exports = mongoose.model('Category', categorySchema);