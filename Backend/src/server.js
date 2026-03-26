import dotenv from 'dotenv'
dotenv.config()

import { app } from "./app.js";
import { connectDb } from "./config/db.js";
import { invokeGemini } from "./services/ai.services.js";


connectDb()

invokeGemini()

app.listen(3000,()=>{
    console.log('server is running on port 3000');
    
})

console.log(process.env.MONGO_URI);
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
