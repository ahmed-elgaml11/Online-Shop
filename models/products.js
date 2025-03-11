const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slugify = require('slugify');


const productSchema = new schema({
    title: {
        type:String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        index: true

    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    desc: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true

    },
    image: {
        type: String,
    }

})



productSchema.pre('save', async function(next){
    let newSlug = slugify(this.title, {lower: true, strict: true})
    let ptoduct = await mongoose.model('Product').findOne({ slug: newSlug});
    let counter = 1;
    while(ptoduct){
        newSlug = `${slugify(this.title, {lower: true, strict: true})}-${counter}`;
        ptoduct = await mongoose.model('Product').findOne({ slug: newSlug});
        counter++;

    }
    this.slug =  newSlug;
    next();
})

productSchema.index(
    { title: 'text', desc: 'text', slug: 'text' },
    { name: 'product_text_index' }  
);
const Product = mongoose.model('Product', productSchema);

Product.ensureIndexes().catch(err => {
    console.error('Index creation failed:', err);
  });
module.exports = Product;