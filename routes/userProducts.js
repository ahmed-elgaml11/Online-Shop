const express =require('express')
const router = express.Router();
const adminServices = require('../services/adminServices');
const userServices = require('../services/userServices');



//  /products



router.get('/', async (req, res) => {
    const allProducts = await adminServices.getProducts();
    res.render('allProducts', { products: allProducts });

}) 

router.get('/:category', async (req, res) => {
    const cat = req.params.category;
    try{
        const category = await adminServices.getCategory(cat);
        if(!category) {
            req.flash('error','this category is not exists')
            res.redirect(`/`);
            return;
        }
        const products = await userServices.getProductsCategory(cat);
        res.render('catProducts', {products})

    }catch(error){
        console.log(error)
        req.flash('error','there is something wrong in getting the products of this category')
        
    }
})













module.exports = router