const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Don't need to define the id property here. mLab is going to create id automatically
const userModel = new Schema({
    name: String,
    email: String,
    age: Number,
    contactNumber: Number,
    admin: Boolean,
    websiteId: [{
        type: String
    }]
});

module.exports = mongoose.model('User', userModel)