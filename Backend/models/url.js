const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectedURL:{
        type: String,
        unique:true,
        required: true,
    },
    visitedHistory:[{timestamp:{type: Number}}],
},{timestamps: true}); 

const URL =mongoose.model("url",urlSchema);

module.exports = URL;