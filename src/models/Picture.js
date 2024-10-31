const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 内容
    src: { type: String },
    // 时间
    date: { type: String },
    // （外部图床图片）URL
    href: { type: String },
    // 上传者的用户id
    uid: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Picture', schema)
