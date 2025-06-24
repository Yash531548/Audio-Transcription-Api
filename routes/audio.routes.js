import { Router } from "express";
import upload from "../config/multer.js";
import {getTranscriptions ,uploadAudio} from '../controllers/audio.controller.js'
import authorize from "../middlewares/auth.middleware.js";

const audioRouter = Router();


audioRouter.get('/',(req,res)=> res.send({title : "GET all audios"}))
// audioRouter.post('/upload',upload , (req,res)=>{res.send("audio upload route")})
audioRouter.post('/upload',authorize,upload , uploadAudio);
audioRouter.get('/status/:id',authorize,getTranscriptions);


export default audioRouter;

/**
    router.post('/upload', protect, upload.single('audio'), uploadAudio);
    router.get('/status/:id', protect, getJobStatus);
 */