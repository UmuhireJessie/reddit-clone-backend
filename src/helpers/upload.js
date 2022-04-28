const cloudinary = require("../config/cloudinary")

const imageUpload = async (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (err, result) => {
            if (err) return err
            resolve({
                url: result.url,
            })
        })
    })
}

module.exports = imageUpload