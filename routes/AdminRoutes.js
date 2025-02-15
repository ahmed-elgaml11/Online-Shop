const express = require('express');
const PageSchema = require('../schema/NewPageSchema');
const ValidatePageSchema= require('../midlewares/ValidateNewPage');
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
    const sorting = 0;
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
        res.redirect('/admin/add-page')
    }
    

})



module.exports = router
