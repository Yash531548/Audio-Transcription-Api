import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import audioRouter from "./routes/audio.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/audios', audioRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to Audio Transcription API');
})

// ✅ Connect DB first, then start server
const startServer = async () => {
    try {
        await connectToDatabase(); // Wait until DB is connected
        app.listen(PORT || 3000, () => {
            console.log(`Audio Transcription API is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
// app.listen(PORT || 3000, async ()=>{
//     console.log(`Audio Transcription API is running on http://localhost:${PORT}`)

//     await connectToDatabase();
// })

export default app; 