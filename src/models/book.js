//create schema
const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true, // to enforce mongoose to always have a title field before creating 
        
    },
    author: String,
    description: String,
    category: {
        type :String,
        enum: ['fiction', 'non-fiction', 'comics', 'others'],
        default : 'fiction'
    },
    purchaseCount: String,
    imageUrl: String,
    tags: Array,
    color: String
})
const Book = mongoose.model('Book', bookSchema)
module.exports = Book