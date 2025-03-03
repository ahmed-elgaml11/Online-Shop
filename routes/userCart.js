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
        let existProduct = cart.find(item => item.id === product._id.toString());
        if(existProduct){
            existProduct.quantity++;
        }
        else{
            cart.push({
                title: product.slug,
                quantity: 1,
                price: product.price,
                image: `/uploads/products/${product._id}/${product.image}`,
                id: product._id.toString(),
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



router.get('/checkout', (req, res) => {
    res.render('checkout', {cart: req.session.cart})
})

router.get('/update/:product', (req, res) => {
    const slug = req.params.product;
    const action = req.query.action;
    const cart = req.session.cart;
    const item = cart.findIndex(item => item.title === slug)
    if(item != -1){
        switch (action){
            case 'inc':
                cart[item].quantity++;
                break;
            case 'dec':
                cart[item].quantity--;
                if(cart[item].quantity < 1){
                    cart.splice(item, 1);
                }
                break;
            case 'clear': 
                cart.splice(item, 1);
                if(cart.length < 1) 
                    delete req.session.cart;
                break;
            default:
                console.log('there is a problem on updating the cart')    
                break;
        }
    }
    req.flash('success', 'the cart updated');
    res.redirect('/cart/checkout')

})

router.get('/clear', (req, res) => {
    delete  req.session.cart;
    req.flash('success', 'the cart cleared');
    res.redirect('/cart/checkout')

})




module.exports = router;