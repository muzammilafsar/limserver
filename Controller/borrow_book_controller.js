var mongoose = require('mongoose');
var Borrow = mongoose.model('BorrowedBooks');
var Books = mongoose.model('Books');
// exports.borrowbook = (req,res) => {
//     let date = Date.now();
//     let due = Date.now();
//     due.setDate(date.getDate()+15);
//     let borrow = new Borrow({
//         user: req.body.email,
//         bookid: req.body.bookid,
//         issue_date: date,
//         Due_date: due
//     });
//     borrow.save((err ,borrow) =>{
//         if (err) {
//             res.send({
//                 status: 400,
//                 message: err
//             });
//         }
//         Books.findOne({_id: req.body.bookid},(err,book) => {
//             if (err) {
//                 res.send('Interval error',err);
//             }
//             book.available_copies = book.available_copies--;
//             book.save((err,book)=>{
//                 if (err) {
//                     res.send({
//                         status:400
//                     });
//                 }
//                 res.json({
//                     status: 200,
//                     books: book,
//                     borrow: borrow
//                 });
//             })
            
//         });

//     });
// }
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