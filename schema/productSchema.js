const {check} = require('express-validator');
const schema = [
    check('title')
        .notEmpty().withMessage('Title is required'),
    check('category')
        .notEmpty().withMessage('Category is required'),
    check('desc')
        .notEmpty().withMessage('Description is required'),
    check('price')
        .isNumeric().withMessage('Price must be a number'),
    check('image')
        .isURL().withMessage('Image must be a valid URL'),
]

module.exports = schema;