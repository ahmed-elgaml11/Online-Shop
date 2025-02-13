const express = require('express');
const PageSchema = require('../schema/NewPageSchema');
const ValidatePageSchema= require('../midlewares/ValidateNewPage');
const router = express.Router();

router.get('/pages', (req, res) => {
    res.send('ADMIN AREA');
})
router.get('/add-page', (req, res) => {
    const errs =req.flash('msg')
    res.render('admin/add-page',{
        errs
    })
})
router.post('/add-page', PageSchema, ValidatePageSchema, 
    (req, res) => {
        // add to db

})



module.exports = router
