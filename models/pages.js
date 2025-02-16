const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
        
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
},{ timestamps: true })

pageSchema.pre('save', async function (next) {
        
    let newSlug = slugify(this.title, {lower: true, strict: true});
    let existPage = await mongoose.model('Page').findOne({ slug: newSlug})
    let counter = 1 ;
    while(existPage){
        newSlug = `${slugify(this.title, {lower: true, strict: true})}-${counter}`;
        existPage = await mongoose.model('Page').findOne({ slug: newSlug});
        counter ++;
    }
    this.slug = newSlug;   
    next(); 

})
const Page = mongoose.model('Page',pageSchema);

module.exports = Page;