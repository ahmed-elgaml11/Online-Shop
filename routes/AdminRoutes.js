// /admin
const express = require('express');
const PageSchema = require('../schema/pageSchema');
const ValidatePageSchema= require('../middlewares/validatePage');
const ValidateUpdatedPage = require('../middlewares/validateUpdatedPage');
const categories = require('./adminCategories')
const products = require('./adminProducts')
const { isAdmin} = require('../middlewares/permissions')
const pageControllers = require('../controllers/pageControllers')
const router = express.Router();


router.get('/pages', isAdmin, pageControllers.getPages)

router.get('/add-page', isAdmin, pageControllers.getaddPage)

router.post('/add-page',isAdmin, PageSchema, ValidatePageSchema, pageControllers.postaddPage)

router.get('/edit-page/:slug', isAdmin,  pageControllers.geteditPage)

router.post('/edit-page/:slug', isAdmin, PageSchema, ValidateUpdatedPage, pageControllers.posteditPage)

router.post('/delete-page/:id', isAdmin, pageControllers.deletePage)




router.use('/category', categories)

router.use('/product', products)





module.exports = router
