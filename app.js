const express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
port = process.env.PORT || 3000 ;
var mongoose = require('mongoose');
var Books = require('./Models/BookModel');
var Borrow = require('./Models/BorrowBookModel');
// var Product = require('./Models/ProductModel');
var User = require('./Models/UserModal');
var bodyParser = require('body-parser');
 
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://admin:KaxmdBz9wcRvFx77@cluster0-shard-00-00-5wl5v.mongodb.net:27017,cluster0-shard-00-01-5wl5v.mongodb.net:27017,cluster0-shard-00-02-5wl5v.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
// mongoose.connect('mongodb://localhost/foodapp');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:10241024102420,type:'application/json'}));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","HEAD,GET,POST,PATCH,OPTIONS,PUT,DELETE");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var routes = require('./Routes/Routes'); //importing route
routes(app); //register the route
app.listen(port);
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('todo list RESTful API server started on: ' + port);
