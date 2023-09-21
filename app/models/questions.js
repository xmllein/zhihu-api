const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// 问题模型
const questionSchema = new Schema({
  __v: { type: Number, select: false },
  title: { type: String, required: true },
  description: { type: String },
  // 问题发出者(用户-> 多个问题)
  questioner: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false },
  // 问题话题(话题-> 多个问题, 问题-> 多个话题)
  topics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false,
  },
},{timestamps: true});

module.exports = model('Question', questionSchema);
