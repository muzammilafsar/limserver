var mongoose = require('mongoose');
var Category = mongoose.model('Category');

exports.get_all_category = (req,res) => {
    // var cato = new Category({
    //     name: 'Curries'
    // });
    // cato.save();
    Category.find({},(err,cat) => {
        if (err) {
            res.send('Interval error',err);
        }
        res.json({
            status: 200,
            category: cat
        });
    });

}