const {validationResult} = require('express-validator');
const adminServices = require('../services/adminServices');
const validateProductSchema = async (req, res, next) => {
    const errors = validationResult(req);
    const {title, category, desc, price, image} = req.body;
    const product = {title, category, desc, price, image}
    const categories = await adminServices.getCategories();
    if(!errors.isEmpty()) {
        console.log(errors.array())
        res.render('admin/add-product',{error: errors.array() , product, categories})
        return;
    }
    next();
}
module.exports = validateProductSchema;
