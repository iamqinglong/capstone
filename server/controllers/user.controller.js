// const UserModel = require('../models/user.model');
const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
const _ = require('lodash')

module.exports.register = (req,res,next) => {
    let user = new User()
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err,doc)=> {
        if(!err)
            res.send(doc)
        else
        {
            // res.send(err)
            if(err.code == 11000)
                res.status(422).send({status: false, email: 'Email already acquired. Please use another email'})
            else
                return next(err)
        }
       
    })
}

module.exports.authenticate = (req,res,next) => {


    if(!req.body.password && !req.body.email) {
        return res.status(422).json({
           
                password: 'Password is required',
                email: 'Email is required'
            
        });
    }

    if(!req.body.email) {
        return res.status(422).json({
          
                email: 'Email is required',
           
        });
    }
    
    if(!req.body.password) {
        return res.status(422).json({
            
                password: 'Password is required',
            
        });
    }
    
    passport.authenticate('local', (err,user,info) => {
        if(err)
            res.status(400).json(err)
        else if(user)
            return res.status(200).json({"token": user.generateJWT()})
        else
            // return next(err)
            return res.status(404).json(info)
    })(req,res,next)
}

module.exports.userProfile = (req,res,next) => {
    User.findOne({ _id: req.id},
        (err,user) => {
            if(!user)
                return res.status(404).json({ status: false, message: 'User record not found'})
            else
                return res.status(200).json({status: true, user: _.pick(user,['_id','fullName','lastName','email'])})
        }
    )
}

module.exports.logout = (req,res,next) => {
    req.logout()
    res.redirect('/');
    // res.status(200).json({ status: true, message: 'Logout succesfully'})
}