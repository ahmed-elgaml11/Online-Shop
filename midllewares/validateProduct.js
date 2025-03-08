const {validationResult} = require('express-validator');
const adminServices = require('../services/adminServices');
exports.validateProductSchema = async (req, res, next) => {
    const errors = validationResult(req);
    const {title, category, desc, price} = req.body;
    const image = req.file ? req.file.filename : ""
    const product = {title, category, desc, price, image}
    const categories = await adminServices.getCategories();
    if(!errors.isEmpty()) {
        console.log(errors.array())
        res.render('admin/add-product',{error: errors.array() , product, categories})
        return;
    }
    next();
}


exports.validateUpdatedProduct = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array())
        req.flash('error', errors.array())
        res.redirect(`/admin/product/edit-product/${req.params.id}`)
        return;

    }
    next();
}

