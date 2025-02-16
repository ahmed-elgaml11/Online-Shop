const {validationResult} = require('express-validator')
const validataUpdatedPage = (req, res, next) => {
    const page = {
        title: req.body.title,
        content: req.body.content,
        slug: req.params.slug,
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        req.flash('error', errors.array());
        console.log(errors, errors.array());
        res.render('admin/edit-page',{page});
        return;
    }
    next();
}
module.exports = validataUpdatedPage;