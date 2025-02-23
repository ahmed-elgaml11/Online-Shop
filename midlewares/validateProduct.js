const {validationResult} = require('express-validator');
const validateProductSchema = (req, res, next) => {
    console.log(req.body);

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array())
        req.flash('error',errors.array())
        res.redirect('/admin/product/add-product')
        return;
    }
    next();
}
module.exports = validateProductSchema;