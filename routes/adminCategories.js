// /admin/category
const express = require('express');
const router = express.Router();
const adminServises = require('../services/adminServices');
const categorySchema = require('../schema/categorySchema');
const validateCategory = require('../midlewares/validateCategory');
router.get('/', async (req, res) => {
    const categories = await adminServises.getCategories();
    res.render('admin/categories',{categories});
})

router.get('/add-category', async (req, res) => {
    res.render('admin/add-category')
})

router.post('/add-category', categorySchema, validateCategory, async (req, res) => {
    const {title} = req.body;
    try{
        await adminServises.addCategory(title)
        req.flash('success', 'the category was added successfully')
        res.redirect('/admin/category')
    }
    catch(error){
        console.log(error)
        req.flash('error', 'there is something wrong in adding this category');
        res.redirect('/admin/category/add-category')

    }

})
module.exports = router