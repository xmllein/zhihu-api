const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// 问题模型
const questionSchema = new Schema({
  __v: { type: Number, select: false },
  title: { type: String, required: true },
  description: { type: String },
  // 问题发出者
  questioner: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false },
});

module.exports = model('Question', questionSchema);
