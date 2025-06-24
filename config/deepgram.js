import { createClient } from "@deepgram/sdk";
import { DEEPGRAM_API_KEY } from './env.js'
import fs from 'fs'
import mime from 'mime-types'


// const transcribeAudio = async () => {
//     // STEP 1: Create a Deepgram client using the API key
//     const deepgram = createClient(DEEPGRAM_API_KEY);
//     // STEP 2: Call the transcribeFile method with the audio payload and options
//     const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
//         // path to the audio file
//         fs.readFileSync("spacewalk.mp3"),
//         // STEP 3: Configure Deepgram options for audio analysis
//         {
//             model: "nova-3",
//             smart_format: true,
//         }
//     );
//     if (error) throw error;
//     // STEP 4: Print the results
//     if (!error) console.dir(result, { depth: null });
// };
// transcribeAudio.js


const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const transcribeAudio = async (filePath) => {
    const audio = fs.readFileSync(filePath);
    const mimeType = mime.lookup(filePath) || 'audio/mp3';

    try {
        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(audio, {
            mimetype: mimeType,
            model: 'nova-3',           // You can change this to 'base' if needed
            smart_format: true,        // Enables punctuation, capitalization, etc.
            language: 'en'             // Optional, specify language
        });

        if (error) throw error;

        // Extract and return the transcript
        return result.results.channels[0].alternatives[0].transcript;
    } catch (err) {
        throw new Error('Transcription failed: ' + err.message);
    }
};

export default transcribeAudio;

