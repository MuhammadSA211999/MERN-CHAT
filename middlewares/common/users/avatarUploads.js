const uploader = require("../../../utils/multerUploads/singleUploads")

const avatarUploads = (req, res, next) => {
    const upload = uploader(
        'avatars',
        ['image/jpg', 'image/png', 'image/jpeg'],
        2000000,
        'Only .jpg, .jpeg or .png file is allowed')

    return upload.any()(req, res, (err) => {
        if (err) {
            console.log('error in avatarUploads', err);
            res.status(500).json({ error: { avatars: { msg: err.message } } })
        }
        else {
            next()
        }
    })
}

module.exports = avatarUploads