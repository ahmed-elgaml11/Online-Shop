const Page = require('../models/pages')
const Category = require('../models/categories')
const Product = require('../models/products')

// pages handlers
const addPage = async (body) => {
        const page = new Page(body);
        await page.save();
        return page;
}

const getPages = async () => {
       return Page.find({}).lean();
}

const findPage = async(slug) => {
    const page = await Page.findOne({ slug: slug })
    return page
}
const findPageid= async(id) => {
    return Page.findById(id)
 
} 
const updatePage = async(slug, data) => {
    return Page.findOneAndUpdate({ slug: slug }, data)
    
}

const deletePage = async(id) => {
    return Page.findByIdAndDelete(id)
 
}







// categories handlers
const getCategories = async() => {
    return Category.find({})
}

 const addCategory = async (title) => {
    const category = new Category({title: title});
    return category.save();   
}

const getCategory = async (slug) => {
    return Category.findOne({slug: slug})
}

const saveCategory = async (category) => {
    return category.save()
}

const deleteCategory = async (id) => {
    return Category.findByIdAndDelete(id);
}






// products handlers


const getProducts = async () => {
    return Product.find({})
}

const createProduct = async (data) => {
    return new Product(data)
}
const saveProduct = async (product) => {
    return Product.save()
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




module.exports = {
    addPage,
    getPages, 
    findPage,
    updatePage,
    deletePage,
    findPageid,
    getCategories,
    addCategory,
    getCategory,
    saveCategory,
    deleteCategory,
    getProducts,
    createProduct,
    saveProduct,
    getProduct,
    addProduct,
    getProductID,
    findUpdateProduct,
    getProductUnique,
    deleteProduct
}