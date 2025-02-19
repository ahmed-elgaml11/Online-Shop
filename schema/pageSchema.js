const { check } = require('express-validator');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const schema = [
    check('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),

    check('content')
        .isString().withMessage('Content must be a string')
        .custom((value) => {
            const dom = new JSDOM(value || '' ); 
            const contentText = dom.window.document.body.textContent;
            if(contentText.length < 5 || contentText.length > 1000) {
                throw new Error('Content must be between 5 and 1000 characters and is required');
            }
            return true;
        })
];

module.exports = schema;
