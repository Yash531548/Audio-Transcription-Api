import Transcription from "../models/transcription.model.js";

const uploadAudio = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}

const getTranscriptions = async (req, res, next) => {
    try {
        // Check if the user is the same as the one in the token
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const transcriptionDetail = await Transcription.findById({ user : req.params.id})

        res.status(200).json({ success: true, data: transcriptionDetail });
    } catch (e) {
        next(e);
    }
}

module.exports = {uploadAudio , getTranscriptions}