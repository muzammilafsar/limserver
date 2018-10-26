'use strict';
const nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var User = mongoose.model('User');
const uuidv4 = require("uuid/v4");
const constants = require('../constants')
 var sendEmail = (email,link) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "88o2868625@gmail.com",
          pass: "*****"
        },
        tls: { rejectUnauthorized: false }
      });

      const mailOptions = {
        from: "88o2868625@gmail.com", // sender address
        to: `${email}`, // list of receivers
        subject: `Email verification`, // Subject line
        html: `<h1>${constants.baseUrl}${link}</h1>` // plain text body
      };
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
}
exports.register_user = (req, res) => {
    let verificationLink = uuidv4();
    let newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        email_verification_code: verificationLink
    });
    newUser.save((err, user, ) => {
        if (err) {
            res.send({
                status: 400,
                message: 'already registerd'
            });
        } else {
            res.send({
                status: 200,
                message: 'registerd successfully',
                email: req.body.email
            });
            sendEmail(req.body.email,verificationLink);
        }

    });

}
exports.login = (req, res) => {
    let id= uuidv4();
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.send({
                status: 405,
                message: "system error"
            });
        } else {
            if (user === null) {
                res.send({
                    status: 401,
                    message: "not registered",
                    id: id
                });
            }
            else {
                if (user.password !== req.body.password) {
                    res.send({
                        status: 402,
                        message: "incorrect password"
                    });
                }
                else if (user.password === req.body.password) {
                    res.send({
                        status: 200,
                        user: {
                            email: user.email,
                            name: user.name,
                            image: ''
                        }
                    });
                }

            }
        }
    });
    
}
