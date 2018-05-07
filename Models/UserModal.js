var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    alternate_email: {
        type: String,
    },
    password: {
        type: String,
    },
    previous_password: {
        type: String
    },
    mobile: {
        type: String
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    email_verification_code: {
        type: String
    } 
});
module.exports = mongoose.model('User', UserSchema);