"use-strict";
var cors = require('cors');
module.exports = function(app) {
    // var products = require('../Controller/product_controller');
    // var category = require('../Controller/category_controller');
    var user = require('../Controller/user_controller');
    var book = require('../Controller/book_controller');
    var borrow = require('../Controller/borrow_book_controller');
    app.use(cors());

    // app.route("/products").get(products.get_all_products);
    // app.route("/products/:id").get(products.get_product_by_id);
    // app.route("/productsbycategory").get(products.get_products_by_category);
    // app.route("/category").get(category.get_all_category);
    // app.route("/registeruser").post(user.register_user);
    // app.route('/login').post(user.login);
    
    app.route('/allbooks').get(book.getAllBooks);
    app.route('/addbook').post(book.addBooks);
    app.route('/getbook').post(book.getBook);
    app.route('/deletebook').post(book.deleteBook);
    app.route('/updatebook').post(book.updateBook);

    app.route('/deleteallborrow').get(borrow.deleteAllBorrow);
    app.route('/getallborrowedbooks').get(borrow.getAll);
    app.route('/borrowbook').post(borrow.borrowbook);
    app.route('/userbooks').post(borrow.userBorrowedBooks);
    app.route('/deleteborrow').post(borrow.deletedBorrowed);
    app.route('/returnbook').post(borrow.returnBook);
};
