const mongoose = require('mongoose')
const {Schema, model} = mongoose

// 定义用户模型
const userSchema = new Schema({
  __v: {type: Number, select: false},
  name: {type: String, required: true},
  // select: false 表示默认不返回该字段
  password: {type: String, required: true, select: false},
  // 用户头像url
  avatar_url: {type: String},
  // 性别
  gender: {type: String, enum: ['male', 'female'], default: 'male', required: true},
  // 一句话介绍
  headline: {type: String},
  // 居住地
  locations: {type: [{type: Schema.Types.ObjectId, ref: 'Topic'}], select: false},
  // 商业领域
  business: {type: Schema.Types.ObjectId, ref: 'Topic', select: false},
  // 职业经历
  employments: {
    type: [{
      // 公司
      company: {type: Schema.Types.ObjectId, ref: 'Topic'},
      // 职位
      job: {type: Schema.Types.ObjectId, ref: 'Topic'},
    }],
    select: false,
  },
  // 教育经历
  educations: {
    type: [{
      school: {type: Schema.Types.ObjectId, ref: 'Topic'},
      // 专业
      major: {type: Schema.Types.ObjectId, ref: 'Topic'},
      // 学历
      diploma: {type: Number, enum: [1, 2, 3, 4, 5]},
      // 入学年份
      entrance_year: {type: Number},
      // 毕业年份
      graduation_year: {type: Number},
    }],
    select: false,
  },
  // 关注与粉丝
  following: {
    type: [{type: Schema.Types.ObjectId, ref: 'User'}],
    select: false,
  },
  // 关注话题
  followingTopics: {
    type: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
    select: false,
  },
  // 赞过的答案
  likingAnswers: {
    type: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    select: false,
  },
  // 踩过的答案
  dislikingAnswers: {
    type: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    select: false,
  },
  // 收藏的答案
  collectingAnswers: {
    type: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    select: false,
  },
})

module.exports = model('User', userSchema)
