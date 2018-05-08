var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    no_of_copies: {
        type: Number,
        required: true,
        default: 1
    },
    available_copies: {
        type: Number,
        required: true,
        default: 1
    },
    image:{
        type: String
    },
    isbn:{
        type: String
    },
    category: {
        type:string, 
        default:'tech'
    }

});
module.exports = mongoose.model("Books", BookSchema);