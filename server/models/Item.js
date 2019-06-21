const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    icon: {
        type: String
    }
})


module.exports = mongoose.model('Item', Schema)


