const Product = require('../models/products')


const getProducts = async () => {
    return Product.find({}).populate('category')
}

const createProduct = async (data) => {
    return new Product(data)
}
const saveProduct = async (product) => {
    return product.save()
}

const getProduct = async (slug) => {
    return Product.findOne({slug: slug})
}

const addProduct = async (data) => {
    const product = new Product(data)
    return product.save()
}

const getProductID = async (id) => {
    return Product.findById(id)
}
const findUpdateProduct = async(id, data) => {
    return Product.findByIdAndUpdate(id, data )
}

const getProductUnique = async (id, slug) => {
    return Product.findOne({_id: {'$ne':id} , slug: slug})
}
const deleteProduct = async (id) => {
    return Product.findByIdAndDelete(id)
}
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
const getProductSearch = async (searchQuery) => {
    return Product.findOne({ $text: { $search: searchQuery } }).populate('category');
};

module.exports = {
    getProducts,
    createProduct,
    saveProduct,
    getProduct,
    addProduct,
    getProductID,
    findUpdateProduct,
    getProductUnique,
    deleteProduct,
    getProductslimits,
    getProductsCategory,
    getProductpop,
    getProductSearch
}