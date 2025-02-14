const express = require('express');
const PageSchema = require('../schema/NewPageSchema');
const ValidatePageSchema= require('../midlewares/ValidateNewPage');
const adminservices= require('../services/adminServices') 
const router = express.Router();

router.get('/pages', adminservices.get_pages , (req, res) => {
    res.render('admin/pages',{pages: res.locals.pages})
})
router.get('/add-page', (req, res) => {
    const errs =req.flash('msg')
    res.render('admin/add-page',{
        errs
    })
})
router.post('/add-page', PageSchema, ValidatePageSchema, 
        // add to db
        adminservices.add_page
    
)



module.exports = router
