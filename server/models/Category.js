const mongoose=require('mongoose')

const Category=mongoose.model('Category',new mongoose.Schema({
    name:{
        type:String,
        unique:true
    }
}))

module.exports=Category