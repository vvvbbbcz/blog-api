const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    _id: {type: Number},
    // URL 标题
    urlName: {type: String},
    // 标题
    title: {type: String},
    // 摘要
    abstract: {type: String},
    // 封面
    cover: {type: String},
    // 内容 (markdown)
    markdown: {type: String},
    // html
    content: {type: String},
    // 标签 id
    tagId: [{type: Number, ref: 'Tag'}],
    // 发布日期
    publishDate: {type: String},
    // 更新日期
    updateDate: {type: String},
    // 作者
    author: {type: Number}, // TODO ref
    // 是否可见
    visible: {type: Boolean, default: true}
})

const Article = mongoose.model('Article', schema)

module.exports = {Article}
