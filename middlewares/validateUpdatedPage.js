const { validationResult } = require('express-validator');


const validateUpdatePage = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error',errors.array());
        console.log('Validation error ', errors.array())
        res.redirect(`/admin/edit-page/${req.params.slug}`);
        return;
    }
    next();
}

module.exports = validateUpdatePage;
