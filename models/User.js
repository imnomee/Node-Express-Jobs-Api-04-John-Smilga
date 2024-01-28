const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        require: [true, 'Please provide valid email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email',
        ],
        unique: [true, 'Email already exists.'],
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
});

//Pre 'Save' Middleware to hash passwords before you save it
// we will use normal function syntax because we need access to 'this' method
// in the later update we can even remove the next() and its still going to work
UserSchema.pre('save', async function (next) {
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
});

//compare hashed passwords
UserSchema.methods.comparePasswords = async function (candidatePassword) {
    const isMatch = await bycrypt.compare(candidatePassword, this.password);
    return isMatch;
};

//Schema Instances
UserSchema.methods.getName = function () {
    return this.name;
};

//get token using instance methods
UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

module.exports = mongoose.model('User', UserSchema);
