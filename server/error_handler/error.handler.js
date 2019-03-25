function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        // let valError = {};
        // Object.keys(err.errors).forEach(key => valError.push(err.errors[key].message))
        let valError = {}
        Object.keys(err.errors).forEach(key => {
            valError[key] = err.errors[key].message;          // the name of the current key.
            // valError[key][0] = err.errors[key].message
            // console.log(myObj[key]);   // the value of the current key.
        });

        return res.status(422).send( valError );
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
