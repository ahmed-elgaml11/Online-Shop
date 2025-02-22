
const express = require('express');
const router = express.Router();
const adminServices = require('../services/adminServices');


// admin/product


router.get('/', async (req, res) => {
    const allProducts = await adminServices.getProducts();
    res.render('admin/products',{products: allProducts})
})


router.get('/add-product', async (req, res) => {
    const categories = await adminServices.getCategories();
    res.render('admin/add-product',{categories})
})




module.exports = router