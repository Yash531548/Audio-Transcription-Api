import fs from "fs"
import path from "path"
import multer from "multer"

const uploadDir = 'uploads/'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const supported = ['.mp3', '.wav', '.flac', '.ogg'];
        const ext = path.extname(file.originalname).toLowerCase();
        
        if (!supported.includes(ext)) {
            return cb(new Error('Unsupported audio format'));
        }
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage: storage }).single('audio');

export default upload;
