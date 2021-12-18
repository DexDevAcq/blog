const {body} = require('express-validator');

module.exports =  [body('title')
        .notEmpty()
        .withMessage('Title cannot be empty'),

        body('description')
        .notEmpty()
        .withMessage('Description cannot be empty')
        .isLength({min: 10})
        .withMessage('Description must be at least 10 characters'), 
    ]