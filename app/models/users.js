const mongoose = require('mongoose')
const {Schema, model} = mongoose

// 定义用户模型
const userSchema = new Schema({
  __v: {type: Number, select: false},
  name: {type: String, required: true},
  // select: false 表示默认不返回该字段
  password: {type: String, required: true, select: false}
})

module.exports = model('User', userSchema)
