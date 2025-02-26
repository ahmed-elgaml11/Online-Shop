const Page = require('../models/pages')
const Category = require('../models/categories')
const Product = require('../models/products')


const getProductslimits = async() => {
    return Product.find({})
        .sort({ createdAt: -1 })
        .limit(6)
       
}
const getProductsCategory = async(catSlug) => {
    return Product.find({ category: catSlug })
}

module.exports = {
    getProductslimits,
    getProductsCategory
}