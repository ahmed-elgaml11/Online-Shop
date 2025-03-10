const path =require('path');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // temporary folder
    const tempPath = path.join(__dirname, 'public', 'uploads', 'temp');
    fs.mkdirSync(tempPath, {recursive: true});
    cb(null, tempPath)

    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});
const fileFilter = (req, file, cb) => {
    if(!file){
        return cb(null, true);
    }
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
        return cb(new Error("Only images are allowed!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter
});

module.exports = upload;
