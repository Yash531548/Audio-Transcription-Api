import mongoose from "mongoose";

const transcriptionSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    transcript: {
        type: String,
        default: ''
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true ,
        index : true
    }
}, { timestamps: true })

const Transcription = mongoose.model('Transcription', transcriptionSchema)

export default Transcription;