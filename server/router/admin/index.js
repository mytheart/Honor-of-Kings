module.exports = (app) => {
    const express = require('express')
    const router = express.Router()
    // const Category = require('../../models/Category')

    // 新建分类
    router.post('', async (req, res) => {
        const result = await req.Model.create(req.body)
        res.send(result)
    })

    // 获取全部分类
    router.get('/', async (req, res) => {
        const queryOptions={}
        if(req.Model.modelName==='Category'){
            queryOptions.populate='parent'
        }

        const result = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(result)
    })

    // 删除某个分类 
    router.delete('/:id', async (req, res) => {
        const result = await req.Model.findByIdAndDelete(req.params.id)
        res.send({ success: true })
    })


    // 获取某个分类（根据id）
    router.get('/:id', async (req, res) => {
        const result = await req.Model.findById(req.params.id)
        res.send(result)
    })

    // 更新分类（根据id）
    router.put('/:id',async (req,res)=>{
        const result=await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send({success:true})
    })



    app.use('/admin/api/rest/:resourse',async (req,res,next)=>{

        // 将 categories 转换为 Category
        const modelName=require('inflection').classify(req.params.resourse)

        req.Model=require(`../../models/${modelName}`)

        next()

    }, router)
}