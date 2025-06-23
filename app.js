import express from "express"; 
import { PORT } from "./config/env.js"; 
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import audioRouter from "./routes/audio.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.use(express.json());
// Routes 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/audios', audioRouter);

app.get('/',(req,res)=>{
    res.send('Welcome to Audio Transcription API');
})

app.listen(PORT || 3000, async ()=>{
    console.log(`Audio Transcription API is running on http://localhost:${PORT}`)

    await connectToDatabase();
})

export default app; 