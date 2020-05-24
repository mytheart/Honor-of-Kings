const mongoose = require('mongoose')
// 管理员
const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, // 不能查询
    set(val) {
      return require('bcryptjs').hashSync(val, 10) // 对密码进行哈希散列
    }
  },
})

module.exports = mongoose.model('AdminUser', schema)