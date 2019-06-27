module.exports = options => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录(token不存在)')
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录(token不正确)')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录(找不到用户)')
    next()
  }
}