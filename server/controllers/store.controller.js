const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports.create = (req,res,next) => {
    // res.send('Greetings from the Device controller!');

    let store = new Store(
        {
            name: req.body.name,
            
        }
    );

    store.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Store Created successfully')
    })
    
}

module.exports.getStore = (req, res) => {
    const query = Store.findById(req.params.id).populate('items')

    query.exec((err, store) => {
        return res.status(200).json({ store, items: store.items })
    })
}