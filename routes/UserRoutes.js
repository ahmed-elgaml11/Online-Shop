const express = require('express');
const router = express.Router();
const adminServices = require('../services/adminServices');
const userServices = require('../services/userServices');
const products = require('./userProducts');



router.get('/', async (req, res) => {
    const products = await userServices.getProductslimits();
    res.render('home', {products});
})



router.get('/page/:slug', async (req, res) => {
    try{
        console.log(req.path)
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

router.use('/products', products)




module.exports = router
