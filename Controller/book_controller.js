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
    
    Books.findOne({_id: req.body.id},(err,book) => {
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
                message: err
                });
        } else {
            res.send({status: 200,
            message: "added successfully"
            });
            
        }
    });
}
exports.deleteBook = (req,res) => {
    Books.deleteOne({_id: req.body.id},(err,book) => {
        if (err) {
            res.send('book not found',err);
        }
        
        res.json({
            status: 200,
            message: 'deleted'
        });
    });
    
}
exports.updateBook = (req,res) => {
    // Books.updateOne({_id: req.body.id}, req.body,)
    Books.findOne({_id: req.body.id},(err,book) => {
        if (err) {
            res.send('book not found',err);
        }
        book.title = req.body.title;
        book.author = req.body.author;
        book.description = req.body.description;
        book.image = req.body.image;
        book.isbn = req.body.isbn;
        book.no_of_copies = req.body.no_of_copies;
        book.save((err,book) => {
            if (err) {
                res.send({
                    status: 400,
                    message: err
                });
            }   
            res.send({
                status: 200,
                message: book
            });
        });
        
    });
    
}