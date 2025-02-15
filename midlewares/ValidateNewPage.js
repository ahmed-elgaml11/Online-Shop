const {validationResult} = require('express-validator');
const ValidatePageSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error',errors.array());
        console.log('Validation error ', errors.array())
        res.redirect('/admin/add-page');
        return;
    }
    next();
}

module.exports = ValidatePageSchema;