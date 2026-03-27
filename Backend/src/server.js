import dotenv from 'dotenv'
dotenv.config()

import { app } from "./app.js";
import { connectDb } from "./config/db.js";
import { invokeGemini } from "./services/ai.services.js";
import { resume,selfDescription,jobDescription } from './services/temp.js';
import { generateInterviewReport } from './services/ai.services.js';


connectDb()

// invokeGemini()
// generateInterviewReport({resume,selfDescription,jobDescription})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})


