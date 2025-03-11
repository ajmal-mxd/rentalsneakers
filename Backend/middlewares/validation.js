const {body, validationResult} = require('express-validator');



const registerValidation = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 7})
    .withMessage('Password must be at least 7 characters long')
    .matches(/[0-9]/)
    .withMessage('Password must contain a number')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password must contain a special character'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }

    ];


const loginValidation= [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 7})
    .withMessage('Password must be at least 7 characters long')
    .matches(/[0-9]/)
    .withMessage('Password must contain a number')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password must contain a special character'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
    

]
module.exports = {registerValidation, loginValidation};
