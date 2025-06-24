import { Router } from "express";
import upload from "../config/multer.js";

const audioRouter = Router();


audioRouter.get('/',(req,res)=> res.send({title : "GET all audios"}))
audioRouter.post('/upload',upload , (req,res)=>{res.send("audio upload route")})
audioRouter.get('/status/:id',(req,res)=> res.send({title : "GET Transcription Details"}))


export default audioRouter;

/**
    router.post('/upload', protect, upload.single('audio'), uploadAudio);
    router.get('/status/:id', protect, getJobStatus);
 */