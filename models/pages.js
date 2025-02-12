const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    sorting: {
        type: Number,

    }
},{ timestamps: true })
const Page = mongoose.model('Page',pageSchema)

module.exports = Page;