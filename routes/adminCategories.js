// /admin/category
const express = require('express');
const router = express.Router();
const adminServices = require('../services/adminServices');
const categorySchema = require('../schema/categorySchema');
const validateCategory = require('../midlewares/validateCategory');
 const validateUpdatedCategory = require('../midlewares/validateUpdatedCat');
const slugify = require('slugify');
const { isAdmin} = require('../midlewares/permissions')


router.get('/', isAdmin, async (req, res) => {
    const categories = await adminServices.getCategories();
    res.render('admin/categories',{categories});
})

router.get('/add-category', isAdmin, async (req, res) => {
    res.render('admin/add-category')
})

router.post('/add-category', isAdmin, categorySchema, validateCategory, async (req, res) => {
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



router.get('/edit-category/:slug', isAdmin, async (req, res) => {
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
        const existCategoy = await adminServices.getCategory(slug)
        if(!existCategoy){
            req.flash('error','this category is not exists')
            res.redirect('/admin/category/')
            return;
        }

         // to ensure the category is unique
         if(slug != newSlug){
            const category = await adminServices.getCategory(newSlug)
            if (category ){
                req.flash('error', 'this category is already exists');
                res.redirect(`/admin/category/edit-category/${slug}`);
                return;
            }
         }



        existCategoy.title = req.body.title;
        existCategoy.slug = newSlug;
        await adminServices.saveCategory(existCategoy);
        req.flash('success', 'the category is updated successfully')
        res.redirect('/admin/category')

    }
    catch(error){
        console.log(error)
        if(error.code == 11000){
            req.flash('error','this category is already exists')
        }

        req.flash('error', 'there is something wrong in updating this category');
        res.redirect(`/admin/category/edit-category/${slug}`)
    }
})


router.post('/delete-category/:id', isAdmin, async (req, res) => {
    const id = req.params.id;
    try{
        const deletedCategory =  await adminServices.deleteCategory(id);
        if(!deletedCategory){
            req.flash('error', 'category not found.');
            return res.redirect('/admin/category');
        }

        
        req.flash('success', 'the category was deleted successfully')
        res.redirect('/admin/category')

    }
    catch(error){
        req.flash('there is something wrong with deleting the page')
        res.redirect('/admin/category/')

    }
})





module.exports = router