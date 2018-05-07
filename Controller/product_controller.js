// var mongoose = require('mongoose');
// var Product = mongoose.model('Products');

// exports.get_all_products = function(req,res) {

//     Product.find({}, function(err,products) {
//         if(err) {
//             res.send('Interal Server Error',err);
//         }
//         res.json({
//             "status": 200,
//             "products": products
//         });
//     });
// }

// exports.get_product_by_id = function(req,res) {
//     let id =  req.params.id;
//     Product.findById(id, (err,prod)=>{
//         if(err)
//         {
//             res.send('404',err);
//         }
//         res.send({
//             "status":200,
//             product: 'prod'
//         });
//     });
    
// }
// exports.get_products_by_category = (req,res) => {
//     var cat_id = req.query.category;
//     Product.find({category_id:cat_id},(err,prods)=>{
//         if(err) {
//             res.send('404',err);
//         }
//         res.send({
//             status: 200,
//             products: prods
//         });
//     });
// }
