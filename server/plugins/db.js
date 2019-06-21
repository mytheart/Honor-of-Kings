module.exports=(app)=>{
    const mongoose=require('mongoose')
    mongoose.connect('mongodb://localhost:27017/Honor-of-Kings',{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false
    }).then(()=>{
        console.log('mongodb has connected')
    })
}