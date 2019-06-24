module.exports = (app) => {
    const express = require('express')
    const router = express.Router()
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')


    // 新建分类
    router.post('/', async (req, res) => {
        const result = await req.Model.create(req.body)
        res.send(result)
    })

    // 获取全部分类
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }

        const result = await req.Model.find().setOptions(queryOptions)
        res.send(result)
    })

    // 删除某个分类 
    router.delete('/:id', async (req, res) => {
        const result = await req.Model.findByIdAndDelete(req.params.id)
        res.send({ success: '删除成功' })
    })


    // 获取某个分类（根据id）
    router.get('/:id', async (req, res) => {
        const result = await req.Model.findById(req.params.id)
        res.send(result)
    })

    // 更新分类（根据id）
    router.put('/:id', async (req, res) => {
        const result = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send({ success: '更新成功' })
    })



    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    // 获取模型中间件
    const resourceMiddleware = require('../../middleware/resource')

    app.use('/admin/api/rest/:resourse', authMiddleware(), resourceMiddleware(), router)




    // 上传图片接口
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = "http://localhost:3000/uploads/" + file.filename
        res.send(file)
    })



    //登录接口
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1.根据用户名找用户
        const AdminUserModel = require('../../models/AdminUser')
        const user = await AdminUserModel.findOne({ username }).select('+password')
        // assert(user, 422, '用户不存在')
        if (!user) {
            res.status(422).send({ message: '用户不存在' })
        }

        // 2.校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        // assert(isValid, 422, '密码错误')
        if (!isValid) {
            res.status(422).send({ message: '密码错误' })
        }
        // 3.返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })


    // 错误处理函数
    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}