const { check } = require('express-validator')
const createError = require('http-errors')
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


module.exports = usersValidator