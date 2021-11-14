const multer = require('multer');


const DIR = "./fichier/video/conferenceDiffere/"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
  });


const uploadVideo = multer({ storage: storage }).single('video')

module.exports = uploadVideo;