const express = require ('express');
const router = express.Router();
const authServices = require('../services/authServices')
const userSchema = require('../schema/userSchema');
 const validateUser = require('../midlewares/validateUser');
const bcrypt = require('bcrypt');

router.get('/signup', async (req, res) => {
    const data = {
        username: '',
        email: '',
        password: '',
    }
    res.render('auth/signup', {data} )
})
router.post('/signup', validateUser, async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const data = {username, email, password}
        const existEmail = await authServices.checkEmail(email);
        const existmame = await authServices.checkUsername(username);
        if(existEmail){
            res.render('auth/signup', { error: ['this email is already registered'], data });
            return;
        }
        if(existmame){
            res.render('auth/signup', { error: ['this username is already registered'], data });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await authServices.addUser(username, email, hashedPassword);
        req.flash('success', 'your account has been created successfully');
        res.redirect('/login')
    }
    catch(error){
        console.log(error);
        res.render('auth/signup', { error: ['there is something wrong with creating your account'], data });
    }
})  


router.get('/login', async (req, res) => {
    res.render('auth/login')
})



module.exports = router;