import { app } from "./app.js";
import { configDotenv } from "dotenv";
import dotenv from 'dotenv'
import { connectDb } from "./config/db.js";

dotenv.config()

connectDb()
app.listen(3000,()=>{
    console.log('server is running on port 3000');
    
})

console.log(process.env.MONGO_URI);
