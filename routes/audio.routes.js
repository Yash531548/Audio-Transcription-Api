import { Router } from "express";

const audioRouter = Router();

// audioRouter.get('/',(res,req)=> res.send({title : "Inside Audio Routes"}))
audioRouter.get('/',(req,res)=> res.send({title : "GET all audios"}))
audioRouter.post('/upload',(req,res)=> res.send({title : "SAVE file in System"}))
audioRouter.get('/status/:id',(req,res)=> res.send({title : "GET Transcription Details"}))


export default audioRouter;

/**
    router.post('/upload', protect, upload.single('audio'), uploadAudio);
    router.get('/status/:id', protect, getJobStatus);
 */