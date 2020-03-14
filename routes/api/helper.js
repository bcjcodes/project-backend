const cloudinary = require('cloudinary').v2;

const Helper ={

    uploadToCloudinary(image){
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image.tempFilePath, {folder: 'SCA'}, (err, url) =>{
                if(err) return reject(err);
                return resolve(url);
            })
        })
    }

}

module.exports = Helper;