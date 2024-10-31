const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    _id: {type: Number},
    urlName: {type: String},
    name: {type: String},
    articleID: [{type: Number, ref: 'Article'}]
})

const Tag = mongoose.model('Tag', schema)

module.exports = {Tag}
