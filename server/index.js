const express=require('express')
const app=express()

app.use(require('cors')())
app.use(express.json())

// 连接数据库
require('./plugins/db')(app)
// 子路由（admin页面的路由）
require('./router/admin/index')(app)

app.listen(3000,(req,res)=>{
    console.log('server runing in localhost:3000')
})