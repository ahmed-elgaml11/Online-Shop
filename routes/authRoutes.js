const express = require ('express');
const router = express.Router();
const validateUser = require('../middlewares/validateUser');
const {isAuthenticated} = require('../middlewares/permissions')
const authControllers = require('../controllers/authControllers')


// /user
router.get('/signup', authControllers.getSignUp)

router.post('/signup', validateUser.validateUserSchema, authControllers.postSignUp )

router.get('/login', authControllers.getLogin)

router.post('/login',validateUser.validatLoginSchem,  authControllers.postLogin)

router.get('/logout', isAuthenticated, authControllers.logout )





module.exports = router;