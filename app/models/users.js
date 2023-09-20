const mongoose = require('mongoose')
const {Schema, model} = mongoose

// 定义用户模型
const userSchema = new Schema({
  name: {type: String, required: true},

})

module.exports = model('User', userSchema)
