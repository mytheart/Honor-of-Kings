const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
   name:{type:String},
   items:[{
       url:{type:String},
       image:{type:String}
   }]
})


module.exports = mongoose.model('Ad', Schema)


