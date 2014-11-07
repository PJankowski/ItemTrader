var mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
    name: String,
    description: String,
    wanted: String,
    image: String,
    owner: String
});

module.exports = mongoose.model('Item', ItemSchema);