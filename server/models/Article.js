const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
})


module.exports = mongoose.model('Article', Schema)


