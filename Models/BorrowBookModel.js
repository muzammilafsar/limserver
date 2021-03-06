var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    bookid: {
        type: String,
        required: true
    },
    issue_date : {
        type: Date,
        required: true,
    },
    Due_date : {
        type: Date,
        required: true
    },
    Return_date : {
        type: Date,
        
    },
    Returned: {
        type: Boolean,
        default : false
    },
    title: {
        type: String
    },
    author: {
        type: String
    }

});
module.exports = mongoose.model("BorrowedBooks", BookSchema);