
const express = require('express');
const router = express.Router();
const productSchema = require('../schema/productSchema');
const {validateProductSchema, validateUpdatedProduct} = require('../middlewares/validateProduct')
const { isAdmin} = require('../middlewares/permissions')
const productControllers = require('../controllers/productControllers')
const upload = require('../middlewares/upload')


// admin/product


router.get('/', isAdmin, productControllers.getProducts)

router.get('/add-product', isAdmin, productControllers.getAddProduct)

router.post('/add-product', isAdmin, upload.single('image'), productSchema, 
validateProductSchema, productControllers.postAddProduct)

router.get('/edit-product/:id', isAdmin, productControllers.getEditProduct)

router.post('/edit-product/:id', upload.single('image'), productSchema, validateUpdatedProduct,
 productControllers.postEditProduct)

router.get('/delete-gallery-image/:id/:image', isAdmin,  productControllers.deleteGallery );

router.post('/delete-product/:id', isAdmin, productControllers.deleteProduct)

module.exports = router