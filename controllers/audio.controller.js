import Transcription from "../models/transcription.model.js";
import transcribeAudio from "../config/deepgram.js";
import fs from 'fs'
import path from 'path'


export const uploadAudio = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        // const job = await Transcription.create({status : 'processing' , user : 
        //     '68599fe2967fa8ba5c65339e'
        // })
        const job = await Transcription.create({status : 'processing' , user : req.user._id
        })
        const filePath = req.file.path;
        console.log(filePath)

        const transcript = await transcribeAudio(filePath);

        job.status = 'completed';
        job.transcript = transcript;
        await job.save();

        fs.unlinkSync(filePath);
        res.status(200).json({ jobId: job._id  , data : job});
    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        next(error);
    }
}

export const getTranscriptions = async (req, res, next) => {
    try {
        // Check if the user is the same as the one in the token
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }
        // console.log("user id : " ,req.user.id);
        // console.log("user id through params : " ,req.params.id);
        const transcriptionDetail = await Transcription.findOne({ user: req.params.id })

        res.status(200).json({ success: true, data: transcriptionDetail });
    } catch (e) {
        next(e);
    }
}

