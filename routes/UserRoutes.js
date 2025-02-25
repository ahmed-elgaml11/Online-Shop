const express = require('express');
const router = express.Router();
const adminServices = require('../services/adminServices');


router.get('/', async (req, res) => {
    const products = await adminServices.getProducts();
    res.render('home', products);
})



router.get('/:slug', async (req, res) => {
    try{
        const slug = req.params.slug;
        const page = await adminServices.findPage(slug)
        if (!page) {
            req.flash('error', 'Page not found.');
            return res.redirect('/');
        }
        res.render('index', {page});    
    }
    catch(error){
        console.log(error);
        res.status(404).render('404',{title: 'Page Not Found'});
    }
})





module.exports = router
