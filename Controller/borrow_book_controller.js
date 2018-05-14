var mongoose = require('mongoose');
var Borrow = mongoose.model('BorrowedBooks');
var Books = mongoose.model('Books');
exports.borrowbook = (req,res) => {
    let date = Date.now();
    let due = Date.now();
    // due.setDate(date.getDate()+15);
    let borrow = new Borrow({
        user: req.body.email,
        bookid: req.body.bookid,
        issue_date: date,
        Due_date: due
    });
    
    Borrow.find({bookid: req.body.bookid,
        Returned: false,user: req.body.email},(err,borow)=>{
            if(err) {
                res.send({
                    status: 400,
                message: err
                });
            }
            if (borow.length === 0) {
                Borrow.find({user: req.body.email,Returned: false},(err,brbooks) => {
                    if (brbooks.length >= 5) {
                        res.send({
                            status:502,
                            message: "quota exceeded"
                        });
                    } else{
                        Books.findOne({_id: req.body.bookid},(err,book) => {
                            if (err) {
                                res.send('Interval error',err);
                            }
                            console.log( book);
                            if(book.available_copies > 0) {
                                borrow.author = book.author;
                                borrow.title = book.title;
                                borrow.save((err ,borrow) =>{
                                    if (err) {
                                        res.send({
                                            status: 400,
                                            message: err
                                        });
                                    }
                                    console.log(req.body.bookid);
                            
                            
                                });
                                book.available_copies = book.available_copies - 1;
                            book.save((err,book)=>{
                                if (err) {
                                    res.send({
                                        status:400
                                    });
                                }
                                res.json({
                                    status: 200,
                                    books: book,
                                    borrow: borrow
                                });
                            });
                            } else{
                                res.send({
                                    status: 405,
                                    message:"not available"
                                })
                            }
                            
                            
                        });
                    }
                });
                
        } else {
            res.send({
                status: 500 ,
                message: "already issued",
                borow: borow
            })
        }
    });
   
 
}
exports.getAll = (req,res) =>{
    Borrow.find({},(err,books)=>{
        if(err) {
            res.send({
                status:400
            });
        }
        res.send({
            status:200,
            books: books
        })
    })
}

exports.userBorrowedBooks = (req, res) => {
    Borrow.find({user: req.body.email},(err,books) => {
            if(err) {
                res.send({
                    status:400,
                    message: err
                });
            }
            res.send({
                status:200,
                borrow: books
            })
    });
}
exports.deletedBorrowed = (req, res) => {
    Borrow.deleteOne({ _id: req.body.id},(err,borrow) => {
            if(err) {
                res.send({
                    status:400,
                    message: err
                });
            }
            res.send({
                status:200,
                borrow: borrow
            })
    });
}
exports.returnBook = (req, res) => {
    Borrow.findOne({ _id: req.body.id},(err,borrow) => {
            if(err) {
                res.send({
                    status:400,
                    message: err
                });
            } else {
                Books.findOne({_id: borrow.bookid}, (err, book) => {
                    if(err) {
                        res.send({
                            status: 400,
                            message: 'book not found'
                        });
                    } else {
                        book.available_copies = book.available_copies + 1 ;
                        book.save((err,book) => {
                            if (err) {
                                res.send({
                                    status: 401,
                                    message: err
                                });
                            } else {
                               borrow.Returned = true;
                               borrow.Return_date = Date.now();
                               borrow.save((err,borrow) => {
                                if (err) {
                                    res.send({
                                        status: 300,
                                        message: err
                                    });
                                } else {
                                    res.send({
                                        status: 200 ,
                                        message:'success'
                                    })
                                }
                               });
                            }
                        })
                    }
                });
            }
    });
}
exports.deleteAllBorrow = (req ,res) =>{
    Borrow.deleteMany({},(err,del)=>{
        if (err) {
            res.send({
                status:400,
                message: err
            });
        } else{
            res.send({
                status: 200 ,
                message: "success",
                borrow:del
            })
        }
    })
}
exports.adminlogin = (req,res) => {
    if (req.body.username === 'admin' && req.body.password === 'password') {
        res.send({
            username: 'admin',
            email: 'muzammilafsar@gmail.com',
            image: '',

        });
    }
}