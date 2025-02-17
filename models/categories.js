const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');


const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
})


CategorySchema.pre('save', function(next){
    const newSlug = slugify(this.title, {lowercase: true, strict: true});
    this.slug = newSlug;
    next()
})


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;