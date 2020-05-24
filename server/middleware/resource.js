module.exports = options => {
  // 自动获取模型的中间件
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource); // 将接口中小写复数的categories转换成大写单数的Category
    req.Model = require(`../models/${modelName}`)
    next()
  }
}