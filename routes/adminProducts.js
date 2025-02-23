
const express = require('express');
const router = express.Router();
const adminServices = require('../services/adminServices');
const productSchema = require('../schema/productSchema');
const validateProduct = require('../midlewares/validateProduct')

// admin/product


router.get('/', async (req, res) => {
    const allProducts = await adminServices.getProducts();
    res.render('admin/products',{products: allProducts})
})


router.get('/add-product', async (req, res) => {
    const categories = await adminServices.getCategories();
    res.render('admin/add-product',{categories})
})

router.post('/add-product', productSchema, validateProduct, async (req, res) => {
    const {title, category, desc, price, image} = req.body;
    try{
        await adminServices.addProduct({title, category, desc, price, image});
        req.flash('success', 'Product added successfully');
        res.redirect('/admin/product');
    }catch(error){
        req.flash('error', 'there is something wrong in adding this product')
        res.redirect('/admin/product/add-product')
    }
})




module.exports = router