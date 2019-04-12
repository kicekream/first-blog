const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
    }
    return Joi.validate(user, schema)
}

module.exports.User = User;
module.exports.validateUser = validateUser;