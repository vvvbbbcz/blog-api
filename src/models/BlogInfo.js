const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 博客名称
    name: {type: String},
    // 图标
    icon: {type: String},
    // 分隔符
    separator: {type: String}
})

module.exports = mongoose.model('BlogInfo', schema)
