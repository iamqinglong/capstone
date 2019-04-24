// const UserModel = require('../models/user.model');
const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
const _ = require('lodash')
const bcrypt = require('bcrypt');

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

module.exports.getAll = async (req,res,next) => {
    try {
        let user = await User.find({}, {password:0}).exec();
        return res.status(200).send( user )
    } catch (error) {
        return next(error)
    }
   
}

module.exports.getById = async (req,res,next) => {

    try {

        let user = await User.findOne({ _id: req.params.id},)
        // return res.status(200).send( user )
        return res.status(200).json({status: true, user: _.pick(user,['_id','firstName','lastName','email'])})

    } catch (error) {
        return next(error)
    }
    
}

module.exports.delete = async (req,res,next) => {

    try {

        let user = await User.findOneAndDelete({ _id: req.params.id},)
        return res.status(200).json({status: true, message: `${user.firstName} successfully deleted!` })

    } catch (error) {
        return next(error)
    }
    
}
module.exports.update = async (req,res,next) => {

    try {

        // const id = req.params.id
        const user =  await User.findById(req.params.id);
        // const user = {
              user.firstName = capital_letter(req.body.firstName),
              user.lastName = capital_letter(req.body.lastName),
              user.password = req.body.password,
              user.email = req.body.email
        // }
        const result = await user.save();
        // const { ...updateData } = user
        // const update = await User.update({_id:id},{$set: updateData}, { new: true, runValidators: true, context: 'query' })
        return res.status(200).send( { status: true, message: `${req.body.firstName} details updated to ${result.firstName} details successfully!`} )
        
    } catch (error) {
       
        return next(error)
    }
}

module.exports.create = async (req,res,next) => {

    try {

        let user = new User({
            firstName: capital_letter(req.body.firstName.toLowerCase()),
            lastName: capital_letter(req.body.lastName.toLowerCase()),
            email:req.body.email,
            password: req.body.password,
        })
        
        let result = await user.save()
        
        return res.send({status: true, message: `${result.firstName} succesffully created!`})

    } catch (error) {
        return next(error)
    }
   
}
function capital_letter(str) 
{
    str = str.split(" ");

    for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}