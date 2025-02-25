const {check} = require('express-validator');
const schema = [
    check('title')
        .notEmpty().withMessage('Title is required'),
    check('category')
        .notEmpty().withMessage('Category is required'),
    check('desc')
        .notEmpty().withMessage('Description is required'),
    check('price')
        .notEmpty().isNumeric().withMessage('Price must be a number'),
    check('image')
        .custom((value, {req}) => {
            if(!req.file) return true; // No file uploaded
            const types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            if(!types.includes(req.file.mimetype)){
                throw new Error ('Only JPEG, PNG, GIF, and WEBP images are allowed')
            }
            return true;
        })
]
module.exports = schema;