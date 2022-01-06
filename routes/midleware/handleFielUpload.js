const multer = require('multer');


const fileStorageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images');
    },
    filename: function(req, file, cb) {
        cb(null, req.uniqueID + '.jpg');
        
    }
})

module.exports = handleFileUpload = multer({storage: fileStorageEngine})