const Category = require('../models/categories')



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


module.exports = {
    getCategories,
    addCategory,
    getCategory,
    saveCategory,
    deleteCategory
}