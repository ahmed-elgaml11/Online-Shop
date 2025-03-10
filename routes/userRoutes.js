const express = require('express');
const router = express.Router();
const products = require('./userProducts');
const cart = require('./userCart');
const userControllers = require('../controllers/userControllers')





router.get('/', userControllers.getHome)

router.get('/page/:slug', userControllers.getPage)



router.use('/products', products)
router.use('/cart', cart)




module.exports = router
