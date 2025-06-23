import express from "express"; 
import { PORT } from "./config/env.js"; 

const app = express();


app.get('/',(req,res)=>{
    res.send('Welcome to Audio Transcription API');
})

app.listen(PORT || 3000,()=>{
    console.log(`Audio Transcription API is running on http://localhost:${PORT}`)
})

export default app; 