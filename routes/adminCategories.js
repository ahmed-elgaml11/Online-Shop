// /admin/category
const express = require('express');
const router = express.Router();
const adminServices = require('../services/adminServices');
const categorySchema = require('../schema/categorySchema');
const validateCategory = require('../midlewares/validateCategory');
 const validateUpdatedCategory = require('../midlewares/validateUpdatedCat');
const slugify = require('slugify');

router.get('/', async (req, res) => {
    const categories = await adminServices.getCategories();
    res.render('admin/categories',{categories});
})

router.get('/add-category', async (req, res) => {
    res.render('admin/add-category')
})

router.post('/add-category', categorySchema, validateCategory, async (req, res) => {
    const {title} = req.body;
    const slug = slugify(title, {lower: true, strict: true})
    try{
        const category = await adminServices.getCategory(slug)
        // to ensure the uniquness of the title.
        if(category){
            req.flash('error', 'this category is already exists');
            res.redirect('/admin/category/add-category')
            return;
        }
        await adminServices.addCategory(title)
        req.flash('success', 'the category was added successfully')
        res.redirect('/admin/category')
    }
    catch(error){
        console.log(error)
        req.flash('error', 'there is something wrong in adding this category');
        res.redirect('/admin/category/add-category')

    }

})



router.get('/edit-category/:slug', async (req, res) => {
    const slug = req.params.slug;
    // get the category from the db then render it into the edit-category page 
    try{
        const category = await adminServices.getCategory(slug)
        if(!category) {
            req.flash('error','this category is not exists')
            res.redirect('/admin/category/')
            return;
        }


        res.render('admin/edit-category', {category})
    }
    catch(error){
        console.log(error)
        req.flash('error', 'there is something wrong in getting this category');
        res.redirect('/admin/category/')
    }

})

router.post('/edit-category/:slug', categorySchema, validateUpdatedCategory, async (req, res) => {
    const slug = req.params.slug;
    let title = req.body.title;
    const newSlug = slugify( req.body.title, {lower: true, strict: true})
    // update the category in the db then redirect to the category page
    try{
         // to ensure the category is unique
        const category = await adminServices.getCategory(newSlug)
        if (category ){
            req.flash('error', 'this category is already exists');
            res.redirect(`/admin/category/edit-category/${slug}`);
            return;
        }

        const existCategoy = await adminServices.getCategory(slug)

        existCategoy.title = req.body.title;
        existCategoy.slug = newSlug;
        await adminServices.saveCategory(existCategoy);
        req.flash('success', 'the category is updated successfully')
        res.redirect('/admin/category')

    }
    catch(error){
        console.log(error)
        req.flash('error', 'there is something wrong in updating this category');
        res.redirect(`/admin/category/edit-category/${slug}`)
    }
})





module.exports = router