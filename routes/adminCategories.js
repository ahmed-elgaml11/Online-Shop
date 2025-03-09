// /admin/category
const express = require('express');
const router = express.Router();
const categorySchema = require('../schema/categorySchema');
const validateCategory = require('../middlewares/validateCategory');
 const validateUpdatedCategory = require('../middlewares/validateUpdatedCat');
const { isAdmin} = require('../middlewares/permissions')
const categoryControllers = require('../controllers/categoryControllers');

router.get('/', isAdmin, categoryControllers.getCategories )

router.get('/add-category', isAdmin, categoryControllers.getaddCategory)

router.post('/add-category', isAdmin, categorySchema, validateCategory, categoryControllers.postaddCategory)

router.get('/edit-category/:slug', isAdmin,categoryControllers.getEditCategory)

router.post('/edit-category/:slug', categorySchema, validateUpdatedCategory, categoryControllers.postEditCategory)

router.post('/delete-category/:id', isAdmin, categoryControllers.deleteCategory)

module.exports = router