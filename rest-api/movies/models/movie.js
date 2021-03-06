const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
 
    imageURL: {
        type: String,
        required: true
    },

    accept: {
        type: String,
    }

}, {timestamps: true})

module.exports = mongoose.model('Movie', movieSchema);