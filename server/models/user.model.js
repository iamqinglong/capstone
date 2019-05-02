const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator');
let nameValidator = [
    validate({
      validator: 'matches',
      arguments: /^[A-Za-z ]+$/,
      passIfEmpty: true,
      message: 'Name should be an alphabetic or with space',
    }),
  ]
let passValidator = [
        validate({
          validator: 'isLength',
          arguments: [6],
          message: 'Password should atleast {ARGS[0]} characters',
        }),
        validate({
            validator: 'isAlphanumeric',
            passIfEmpty: true,
            message: 'Password should contain alpha-numeric characters only',
        }),
]

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        unique: true,
        required: `First name can't be empty`,
        validate: nameValidator
    },
    lastName: {
        type: String,
        unique: true,
        required: `Last name can't be empty`,
        validate: nameValidator
    },
    email: {
        type: String,
        unique: true,
        required: `Email can't be empty`,
    },
    password: {
        type: String,
        required:  `Password can't be empty`,
        validate: passValidator
    },
    number: {
        type: String,
        required:  `Number can't be empty`,
        unique: true
    },
    saltSecret: String
})
userSchema.path('email').validate((val) => {
    emailRegex = /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/i
    return emailRegex.test(val)
},'Invalid Email: should be alphanumeric excluding the @')

userSchema.pre('save', async function(next){
    //'this' refers to the current document about to be saved
    const user = this;
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10);
    //Replace the plain text password with the hash and then store it
    this.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
  });

userSchema.methods.verifyPassword = function(password) {
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //database matches the one sent. Returns true if it does else false.
    const compare = bcrypt.compareSync(password, user.password);
    return compare;
}


userSchema.methods.generateJWT = function() {
    return jwt.sign({ _id: this.id },process.env.JWT_SECRET,
        {
            // expiresIn: process.env.JWT_EXP
        })
}
userSchema.plugin(uniqueValidator, { message: 'Error, {VALUE} is already acquired' });
mongoose.model('User', userSchema)
