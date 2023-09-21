const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// 答案模型
const answerSchema = new Schema({
  __v: { type: Number, select: false },
  content: { type: String, required: true },
  // 回答者(用户)
  answerer: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false },
  questionId: { type: String, required: true },
});

module.exports = model('Answer', answerSchema);
