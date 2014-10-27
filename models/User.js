var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    first: String,
    last: String,
    email: String,
    username: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);