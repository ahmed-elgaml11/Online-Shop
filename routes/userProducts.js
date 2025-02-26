const express =require('express')
const router = express.Router();
const adminServices = require('../services/adminServices');
const userServices = require('../services/userServices');
const fs = require('fs');
const path = require('path');



//  /products



router.get('/', async (req, res) => {
    const allProducts = await adminServices.getProducts();
    res.render('products', { products: allProducts });

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
        res.render('products', {products})

    }catch(error){
        console.log(error)
        req.flash('error','there is something wrong in getting the products of this category')
        
    }
})



router.get('/:cat/:slug', async (req, res) => {
    const {cat, slug} = req.params;
    const product = await adminServices.getProduct(slug);
    const productCategory = await userServices.getProductsCategory(cat)

    if(!product || !productCategory ) {
        req.flash('error','this product is not exists')
        res.redirect(`/products/${cat}`);
        return;
    }
    const galleryPath = path.join(__dirname, '../public/uploads/products', product._id.toString(), 'gallery')
    const galleryImages = fs.existsSync(galleryPath) ? fs.readdirSync(galleryPath) : [];
    res.render('productDetails', { product , galleryImages })

})









module.exports = router