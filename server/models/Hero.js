const mongoose = require('mongoose')

const Hero = mongoose.model('Hero', new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    avator: {
        type: String
    },
    title: {
        type: String
    },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Caregory' }],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    item1: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
    }],
    item2: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
    }],
    usageTigs: { type: String },
    battleTigs: { type: String },
    teamTips: { type: String },
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
}))

module.exports = Hero