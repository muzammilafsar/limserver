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
    new_book.available_copies = req.body.no_of_copies;
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
    // Books.findByIdAndUpdate(  
    //     // the id of the item to find
    //     req.body.id,
    
    //     // the change to be made. Mongoose will smartly combine your existing 
    //     // document with this change, which allows for partial updates too
    //     req.body,
    
    //     // an option that asks mongoose to return the updated version 
    //     // of the document instead of the pre-updated one.
    //     {new: true},
    
    //     // the callback function
    //     (err, todo) => {
    //     // Handle any possible database errors
    //         if (err) return res.status(500).send(err);
    //         return res.send(todo);
    //     }
    // )
    Books.findOne({_id: req.body.id},(err,book) => {
        if (err) {
            res.send('book not found',err);
        }
        book.category = req.body.category;
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