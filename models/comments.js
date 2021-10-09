let mongoose = require('mongoose');

let commentsSchema = mongoose.Schema({
    id :{
        type: String,
    required: true},
    
    author: {
        type : String,
        required : true},

    body: {
        type : String,
        required : true
    },
    date: {
        type : Date,
        required : true
    }
})

let comments = module.exports = mongoose.model('comments', commentsSchema, 'comments');