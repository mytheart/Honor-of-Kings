module.exports = app => {
  const express = require('express')
  const assert = require('http-assert') // 有错误时终止执行，同时返回一个json类型的错误
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const authMiddleware = require('../../middleware/auth') // 登录校验中间件
  const resourceMiddleware = require('../../middleware/resource') // 通用接口中间件
  const multer = require('multer') // 用于处理上传数据

  const router = express.Router({
    mergeParams: true, // 表示合并url参数
  })

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model) 
  })
  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 获取资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent' // 关联查询
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 中间件
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // 文件上传
  const upload = multer({ dest: __dirname + '/../../uploads' }) // 上传中间件，生成上传地址   
  // 文件上传接口
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => { // 表示接受单个文件的上传 
    const file = req.file // 使用multer后，将上传文件的数据放到了req上
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

// 登录接口
  app.post('/admin/api/login', async (req, res) => { 
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password') // password默认是取不到的
    assert(user, 422, '用户不存在')  // 422状态码一般是用户提交的内容有问题
    // 2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret')) // 生成一个token
    res.send({ token })
  })

  // 注册接口（自己用）
  app.post('/admin/api/register/zhangyin/:password',async (req,res)=>{
    const model = await require('../../models/AdminUser').create(req.body)
    res.send(model)
  })

  // 统一的错误处理程序（接受assert中的报错）
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    }) 
  })
}
