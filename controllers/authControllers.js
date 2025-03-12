const authServices = require('../services/authServices')
const bcrypt = require('bcrypt');


exports.getSignUp = async (req, res) => {
    const data = {
        username: '',
        email: '',
        password: '',
    }
    res.render('auth/signup', {data} )
}

exports.postSignUp = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const data = {username, email, password}
        const existEmail = await authServices.checkEmail(email);
        const existmame = await authServices.checkUsername(username);
        if(existEmail){
            res.render('auth/signup', { error: ['this email is already registered, choose another'], data });
            return;
        }
        if(existmame){
            res.render('auth/signup', { error: ['this username is already registered, choose another'], data });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await authServices.addUser(username, email, hashedPassword);
        req.flash('success', 'your account has been created successfully');
        req.session.save(() => {
            res.redirect('/user/login')
        })
    }
    catch(error){
        console.log(error);
        res.render('auth/signup', { error: ['there is something wrong with creating your account'], data });
    }
}
exports.getLogin = async (req, res) => {
    if (req.session.user) {
        res.redirect('/');
        return;
    }
    const data = {
        email: '',
        password: '',
    }
    res.render('auth/login', { data })
}
exports.postLogin = async (req, res) => {
        // get the data
        // check if the email is exists or not
        // if no => err
        // check the password corresponds to this email or not 
        // if no => err
        // store the data in the sessionn to keep track user interaction
    const { email, password} = req.body;
    try{

        const existUser = await authServices.checkEmail(email);
        if (!existUser){
            req.flash('error', 'this email is not registered');
            res.redirect('/user/login');
            return;
        }
        const same = await bcrypt.compare(password, existUser.password )
        if(!same){
            req.flash('error', 'incorrect password');
            res.redirect('/user/login');
            return;
        }
        req.session.user = existUser;
        req.flash('success', 'you are logged in successfully');
        req.session.save(() => {
            res.redirect('/')

        })

    }catch(err){
        console.log(err);
        req.flash('error', 'there is something wrong with login');
        res.redirect('/login')
    }
    
}
exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            req.flash('error', 'there is something wrong with logout');
            res.redirect('/')
        }
        res.clearCookie('connect.sid');
        res.redirect('/user/login');
        
    })
}