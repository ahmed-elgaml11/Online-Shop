const userSchema = require('../schema/userSchema');
const loginSchema = require('../schema/loginSchema');

const validateUserSchema = (req, res, next) => {
    const { username, email, password } = req.body;
    const data = { username, email, password };
    const result = userSchema.safeParse(req.body);
    if(!result.success){
        console.log(result.error);
        const errorMessage = result.error.issues.map (err => err.message);
        res.render('auth/signup', { error: errorMessage, data });
        return;
    }
    next();
}
const validatLoginSchem = (req, res, next) => {
    const {  email, password } = req.body;
    const data = {  email, password };
    const result = loginSchema.safeParse(req.body);
    if(!result.success){
        console.log(result.error);
        const errorMessage = result.error.issues.map (err => err.message);
        res.render('auth/login', { error: errorMessage, data });
        return;
    }
    next();
}





module.exports = {
    validateUserSchema,
    validatLoginSchem,
};