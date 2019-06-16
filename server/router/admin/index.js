module.exports=(app)=>{
    const express=require('express')
    const router=express.Router()
    const Category=require('../../models/Category')

    router.post('/category',async (req,res)=>{
        const result=await Category.create(req.body)
        res.send(result)
    })


    router.get('/category',async (req,res)=>{
        const result = await Category.find()
        res.send(result)
    })



    app.use('/admin/api',router)
}