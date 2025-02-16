const express = require('express');
const PageSchema = require('../schema/pageSchema');
const ValidatePageSchema= require('../midlewares/validatePage');
const ValidateUpdatedPage = require('../midlewares/validateUpdatedPage');
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

router.get('/edit-page/:slug', async (req, res) => {
    const slug = req.params.slug;
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

router.post('/edit-page/:slug', PageSchema, ValidateUpdatedPage, async (req, res) => {
    const slug = req.params.slug;
    const data ={
        title: req.body.title,
        content: req.body.content,
    }
    try{
        const page = await adminservices.findPage(slug);
        if (!page) {
            req.flash('error', 'Page not found.');
            return res.redirect('/admin/pages');
        }
        await adminservices.updatePage(slug, data)
        req.flash('success','the page updated successfully');
        res.redirect('/admin/pages')
    }
    catch(error){
        req.flash('error','there is something wrong with updating the page')
        res.redirect(`/admin/edit-page/${slug}`)
    }
    
})






module.exports = router
