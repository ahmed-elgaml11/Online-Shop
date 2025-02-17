// /admin/category
const express = require('express');
const router = express.Router();
const adminServises = require('../services/adminServices');
router.get('/', async (req, res) => {
    const categories = await adminServises.getCategories();
    res.render('admin/categories',{categories});
})


module.exports = router