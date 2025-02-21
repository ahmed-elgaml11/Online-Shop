const {validationResult} = require('express-validator')
const validateUpdatedCategorySchema = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array())
        req.flash('error',errors.array())
        res.redirect(`/admin/category/edit-category/${req.params.slug}`)
        return;
    }
    next();
}

module.exports = validateUpdatedCategorySchema;