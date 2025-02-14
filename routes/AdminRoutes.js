const express = require('express');
const PageSchema = require('../schema/NewPageSchema');
const ValidatePageSchema= require('../midlewares/ValidateNewPage');
const adminservices= require('../services/adminServices') 
const router = express.Router();

router.get('/pages', adminservices.get_pages , (req, res) => {
    res.render('admin/pages')
})

router.get('/add-page', (req, res) => {
    res.render('admin/add-page')
})
router.post('/add-page', PageSchema, ValidatePageSchema, async (req, res) => {
    const content = req.body.content
    const title = req.body.title
    const sorting = 100;
    try{
        await adminservices.addPage({
            title,
            content,
            sorting
        });    
        req.flash('success','the page added successfully');
        res.redirect('/admin/pages');

    }
    catch(error){
        console.log(error);
        req.flash('error','there is something wrong with saving the page');
        res.redirect('/admin/pages');

    }
})



module.exports = router
