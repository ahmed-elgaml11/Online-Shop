const {validationResult} = require('express-validator');
const validateProductSchema = (req, res, next) => {
    const error = validationResult(req);
    const {title, category, desc, price, image} = req.body;
    const product = {title, category, desc, price, image}
    if(!error.isEmpty()) {
        console.log(error.array())
        req.flash('error',error.array())
        res.render('/admin/add-product',{error, product})
        return;
    }
    next();
}
module.exports = validateProductSchema;