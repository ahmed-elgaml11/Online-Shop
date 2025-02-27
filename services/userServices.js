const Page = require('../models/pages')
const Category = require('../models/categories')
const Product = require('../models/products')


const getProductslimits = async() => {
    return Product.find({})
        .sort({ createdAt: -1 })
        .limit(6)
        .populate('category')
       
}
const getProductsCategory = async(id) => {
    return Product.find({ category: id }).populate('category')
}

const getProductpop = async (slug) => {
    return Product.findOne({ slug: slug }).populate('category')
}

module.exports = {
    getProductslimits,
    getProductsCategory,
    getProductpop
}