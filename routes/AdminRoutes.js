const express = require('express');
const PageSchema = require('../schema/newPageSchema');
const ValidatePageSchema= require('../midlewares/validateNewPage');
const adminservices= require('../services/adminServices') 
const router = express.Router();

router.get('/pages' ,async  (req, res) => {
    const allPages = await adminservices.getPages();
    res.render('admin/pages',{pages: allPages})
})

router.get('/add-page', (req, res) => {
    res.render('admin/add-page')
})
router.post('/add-page', PageSchema, ValidatePageSchema, async (req, res) => {
    const content = req.body.content
    const title = req.body.title
    try{
        await adminservices.addPage({
            title,
            content
        });    
        req.flash('success','the page added successfully');
        res.redirect('/admin/pages');
    }
    catch(error){
        console.log(error);
        req.flash('error','there is something wrong with saving the page');
        res.redirect('/admin/add-page')
    }
})

router.get('/edit/:slug', async (req, res) => {
    const slug = req.params.slug;
    console.log(slug)
    try{
        const page = await adminservices.findPage(slug);
        if (!page) {
            req.flash('error', 'Page not found.');
            return res.redirect('/admin/pages');
        }
        res.render('admin/edit-page', {page})    
    }
    catch(error){
        console.log(error);
        req.flash('error','there is something wrong with finding the page');
        res.redirect('/admin/pages')
    }

})






module.exports = router
