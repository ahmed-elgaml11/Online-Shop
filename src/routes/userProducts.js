const express =require('express')
const router = express.Router();
const userControllers = require('../controllers/userControllers')



//  /products



router.get('/', userControllers.getAllProducts)

router.get('/:category', userControllers.getProductsCategory)



router.get('/:cat/:slug', userControllers.getProductDetails)







module.exports = router