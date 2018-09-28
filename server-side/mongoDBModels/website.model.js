const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Don't need to define the id property here. mLab is going to create id automatically
const websiteModel = new Schema({
    name: String
});

module.exports = mongoose.model('Website', websiteModel)