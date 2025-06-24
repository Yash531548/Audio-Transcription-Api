
# 📌 Project Title

**🎙️ Audio Transcription API** — An Express.js-based backend API that enables users to upload audio files (MP3/WAV/FLAC/OGG), transcribe them to text using the Deepgram API, and track transcription status. Features include user authentication, rate limiting, bot protection (Arcjet), and MongoDB-based storage.

## ✨ Features

- 🔐 User authentication with JWT
- 📤 Audio file upload via Multer
- 🧠 Transcription via [Deepgram API](https://www.deepgram.com/)
- 📁 MongoDB Atlas for storing users and transcriptions
- 🛡️ Arcjet integration for bot protection and rate limiting
- ⚡ RESTful API design with easy testing via Postman


## 🚀 Demo Video:

 [🎬 Watch Demo Video](./public/Demo_Audio_trans.mp4)

## 🔧 Tech Stack

- 🚀**Backend:** Node.js, Express
- 💅 **Database:** MongoDB Atlas
- 🔐 **Security:** JWT, Arcjet
- 📝 **File Upload:** Multer
- ⚡ **Audio Processing:** Deepgram

## 🧠 How It Works
1. **User Registration & Login**
   - A user signs up or logs in using their email and password.
   - A **JWT token** is issued on successful login for authentication.

2. **Uploading the Audio File**
   - Authenticated users can upload `.mp3`, `.wav`, or other supported formats via a `POST /transcription/upload` request.
   - The file is handled by **Multer**, temporarily stored locally, and then sent to **Deepgram** for transcription.

3. **Processing with Deepgram**
   - Once the audio file is uploaded, the server calls Deepgram’s Speech-to-Text API using your API key.
   - Deepgram transcribes the audio into text asynchronously.

4. **Storing Results in MongoDB**
   - A new **Transcription Job Document** is created in MongoDB with the following fields:
     - `jobId`
     - `ownerEmail`
     - `status: pending | completed | failed`
     - `transcriptionText` (added once the process is done)
   - The same MongoDB cluster also stores user credentials in a separate collection.

5. **Checking Transcription Status**
   - Users can check the status of their transcription using `GET /transcription/status/:jobId`.
   - Once complete, the transcribed text is returned in the response.

6. **Security & Rate Limiting**
   - Every sensitive route is protected using **JWT Authentication**.
   - **Arcjet** is integrated to detect bots and prevent abuse through rate limiting and request shielding.
##  Getting Started

# 1. Clone the repository
  
```bash
git clone https://github.com/Yash531548/Audio-Transcription-Api.git
cd Audio-Transcription-Api
```
# 2. Install dependencies
```bash
npm install
```

# 3. Setup environment variables

Create a `.env` file with the following:
```env
PORT=5500
NODE_ENV='development'

# MongoDB
DB_URI=mongodb+srv://<username>:<password>@cluster0.xnt8uyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Deepgram
DEEPGRAM_API_KEY=your_deepgram_api_key

# Arcjet
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

```
# 4. Run the app
```bash 
npm run dev
```


## 📂 API Endpoints

### 🧾 Register New User

**POST** `/api/v1/auth/sign-up`

**Request Body:**

```json
{
  "name" : "user",
  "email": "user@example.com",
  "password": "yourpassword"
}
```

### 🔐 Login User
**POST** `/api/v1/auth/sign-in`

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
- Returns a JWT token.

### 📤 Upload Audio
**POST** `/api/v1/transcription/upload`

**Headers**
```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

```


**Body**
- audio (file Input)

**Returns:** 

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "jobId": "<mongoObjectId>"
}
```

### 📊 Get Job Status
**POST** `/api/v1/transcription/status/:Id`

**Headers**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Returns:** 

```json
{
  "status": "completed",
  "transcription": "Hello, this is the transcribed text..."
}
```

## ⚠️ Notes

- Only authenticated users can upload or check transcriptions.

- Audio file size and format limits can be configured in Multer middleware.

- Make sure Deepgram API key and MongoDB URI are correctly set in .env.


### 📄 License

This project is open-source and available under the MIT License.

### 🙋‍♂️ Author
Made with ❤️ by Yash Sharma