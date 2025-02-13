const { check } = require('express-validator');
const schema = [
    check('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),

    check('content')
        .isString().withMessage('Content must be a string')
        .isLength({ min: 5, max: 1000 }).withMessage('Content must be between 5 and 1000 characters')
];

module.exports = schema;
