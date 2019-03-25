const mongoose = require('mongoose')
const Item = mongoose.model('Item')


module.exports.create = (req,res,next) => {
    // res.send('Greetings from the Device controller!');

    let item = new Item(
        {
            name: req.body.name,
            storeId : req.body.storeId
            
        }
    );

    item.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Item Created successfully')
    })
    
}

