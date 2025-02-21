// /admin
const express = require('express');
const PageSchema = require('../schema/pageSchema');
const ValidatePageSchema= require('../midlewares/validatePage');
const ValidateUpdatedPage = require('../midlewares/validateUpdatedPage');
const adminservices= require('../services/adminServices') 
const categories = require('./adminCategories')
const products = require('./adminProducts')



const router = express.Router();

router.get('/pages' ,async  (req, res) => {
    const allPages = await adminservices.getPages();
    res.render('admin/pages',{pages: allPages})
})

router.get('/add-page', (req, res) => {
    res.render('admin/add-page')
})


router.post('/add-page', PageSchema, ValidatePageSchema, async (req, res) => {

    let data = {
        title: req.body.title,
        content: req.body.content
    }
    try {
        await adminservices.addPage(data)
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

        if(page.title.toLowerCase() === 'home' && data.title.toLowerCase() !== 'home'){
            req.flash('error', 'Home page cannot be renamed.');
            return res.redirect(`/admin/edit-page/${slug}`, )
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


router.post('/delete-page/:id', async (req, res) => {
    const id = req.params.id
    try {
        const page = await adminservices.deletePage(id);
        if (!page) {
            req.flash('error', 'Page not found.');
            return res.redirect('/admin/pages');
        }
        
        req.flash('success','the page deleted successfully');
        res.redirect('/admin/pages')

    }catch(error){
        console.log(error);
        req.flash('error','there is something wrong with deleting the page');
        res.redirect('/admin/pages')
    }
    
})

router.use('/category', categories)
router.use('/product', products)





module.exports = router
