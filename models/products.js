const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slugify = require('slugify');


const productSchema = new schema({
    title: {
        type:String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    desc: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true

    },
    image: {
        type: String,
    }

})
const Product = mongoose.model('Product', productSchema);

productSchema.pre('save', async function(next){
    const newSlug = slugify(this.title, {lower: true, strict: true})
    const ptoduct = await Product.findOne({ slug: newSlug});
    let counter = 1;
    while(ptoduct){
        newSlug = `${slugify(this.title, {lower: true, strict: true})}-${counter}`;
        ptoduct = await Product.findOne({ slug: newSlug});
        counter++;

    }
    this.slug =  newSlug;
})


module.exports = Product;