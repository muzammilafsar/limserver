var mongoose = require('mongoose');
var Books = mongoose.model('Books');

exports.getAllBooks = (req,res) => {
    // var cato = new Category({
    //     name: 'Curries'
    // });
    // cato.save();
    Books.find({},(err,book) => {
        if (err) {
            res.send('Interval error',err);
        }
        res.json({
            status: 200,
            books: book
        });
    });

}
exports.getBook = (req,res) => {

    Books.find({_id: req.body.id},(err,book) => {
        if (err) {
            res.send('Interval error',err);
        }
        res.json({
            status: 200,
            books: book
        });
    });

}
exports.addBooks = (req,res) => {
    var new_book = new Books(req.body);
    new_book.save((err,book)=>{
        if (err) {
            res.send({status: 400,
                message: 'error'
                });
        } else {
            res.send({status: 200,
            message: err
            });
            
        }
    });
}