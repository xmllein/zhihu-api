const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// 评论模型
const commentSchema = new Schema({
  __v: { type: Number, select: false },
  content: { type: String, required: true },
  // 用户
  commentator: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false },
  questionId: { type: String, required: true },
  answerId: { type: String, required: true },
});

module.exports = model('Comment', commentSchema);
