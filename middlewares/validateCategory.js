const {validationResult} = require('express-validator')
const validateCategorySchema = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array())
        req.flash('error',errors.array())
        res.redirect('/admin/category/add-category')
        return;
    }
    next();
}

module.exports = validateCategorySchema;