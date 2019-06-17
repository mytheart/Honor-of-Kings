const mongoose=require('mongoose')

const Item=mongoose.model('Item',new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    icon:{
        type:String
    }
}))

module.exports=Item