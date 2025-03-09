const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middlewares/permissions')
const userControllers = require('../controllers/userControllers')



 // cart 
 router.get('/add/:proSlug', isAuthenticated, userControllers.getAddProduct);

router.get('/checkout', userControllers.checkout)

router.get('/update/:product', isAuthenticated, userControllers.getUpdateProduct)

router.get('/clear', isAuthenticated, userControllers.clear)

router.post('/buy',isAuthenticated, userControllers.buy)

router.get('/success', userControllers.success)

router.get('/cancel', userControllers.cancel)




module.exports = router;