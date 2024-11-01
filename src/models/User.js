const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    _id: {type: Number},
    username: {type: String},
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },
    nickname: {type: String},
    email: {type: String},
    avatar: {type: String},
    isAdmin: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', schema)
