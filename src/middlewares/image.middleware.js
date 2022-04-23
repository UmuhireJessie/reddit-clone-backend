const cloudinaryUpload = require("../helpers/upload")

const imageUpload = async (req, res, next) => {
    if (req.files.length !== 0) {
        let urls = []
        const files = req.files
        for (let i = 0; i < files.length; i++) {
            const { path } = files[i]
            const fileUploaded = await cloudinaryUpload(path)
            urls.push(fileUploaded.url)
        }
        req.body.image = urls
        return next()
    }
    else if (req.files.length === 0) {
        return next()
    }


}

module.exports = imageUpload