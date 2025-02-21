
const express = require('express');
const router = express.Router();
const adminServices = require('../services/adminServices');


// admin/product


router.get('/', async (req, res) => {
    const allProducts = await adminServices.getProducts();
    res.render('admin/products',{products: allProducts})
})





module.exports = router