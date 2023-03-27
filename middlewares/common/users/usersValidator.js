const { check, validationResult } = require('express-validator')
const createError = require('http-errors')
const path = require('path')
const { unlink } = require('fs')
const People = require('../../../models/peoples')
const usersValidator = [
    check('name')
        .isLength({ min: 3 })
        .withMessage('Name is required')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Nothing allowed without alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Email is invalid')
        .trim()
        .custom(async (value) => {
            try {
                const user = await People.findOne({ email: value })
                if (user) {
                    throw createError('Email is already exist')
                }
            } catch (error) {
                throw createError(error?.message)
            }
        }),
    check('mobile')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Bangladeshi mobile number needed')
        .custom(async (value) => {
            try {
                const user = await People.findOne({ mobile: value })
                if (user) {
                    throw createError('Mobile number already in use')
                }
            } catch (error) {
                throw createError(error.message)
            }
        })
]

const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()
    //mappedError ekti object hobe 
    if (Object.keys(mappedErrors).length === 0) {
        next()
    }
    else {
        //error happend remove uploaded files
        if (req.files.length > 0) {
            const { filename } = req.file[0]
            unlink(path.join(__dirname, `/../public/uploads/${avatars}`), (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
        res.status(500).json({ errors: mappedErrors })
    }

}
module.exports = { usersValidator, userValidationHandler, userValidationHandler }