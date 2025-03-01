const express = require('express');
const router = express.Router();
const path = require('path');
const adminServices = require('../services/adminServices');
const userServices = require('../services/userServices');



 // cart 
 router.get('/add/:proSlug', async (req, res) => {
     // get the product from db
     // check if the product is in the cart
     // if yes, increase the quantity
     // if not, add the product to the cart
     const slug = req.params.proSlug
     try{
        const product = await adminServices.getProduct(slug);
        if(!product) {
         req.flash('error', 'Product not found.');
         return res.redirect('/');
        }
        if(!req.session.cart){
        req.session.cart = [];
        }
        let cart = req.session.cart;
        let existProduct = cart.find(item => item.id === product._id);
        if(existProduct){
            existProduct.quantity++;
        }
        else{
            cart.push({
                title: product.slug,
                quantity: 1,
                price: product.price,
                image: path.join(__dirname, '../public/uploads/products', product._id.toString(), product.image),
                id: product._id,
            })
        }
        req.flash('success', 'Product added to the cart successfully.');
        res.redirect(req.get('Referer') || '/');
    }
     catch(err){
         console.log(err);
         req.flash('error', 'An error occurred while adding product to the cart.');
         res.redirect(req.get('Referer') || '/');
        }
 })










module.exports = router;