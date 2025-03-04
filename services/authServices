const User = require('../models/users')

exports.checkEmail = async (email) => {
    return User.findOne({email: email})
}

exports.checkUsername = async (username) => {
    return User.findOne({username: username})
}

exports.addUser = async (username, email, password) => {
    const user = new User({username, email, password});
    return user.save();
}