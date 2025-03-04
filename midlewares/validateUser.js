const userSchema = require('../schema/userSchema');

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
module.exports = validateUserSchema;