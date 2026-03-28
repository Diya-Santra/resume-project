import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { generateInterviewReport } from './ai.services.js';
import { interviewReport } from '../models/interviewReport.model.js';

dotenv.config({ path: '../.env' }); // or whichever has the DB connection

async function test() {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-project');

    const result = await generateInterviewReport({
        resume: "Experienced React Developer with 5 years in building scalable web apps. Knows Node.js and MongoDB.",
        selfDescription: "I love building fast, modern web applications.",
        jobDescription: "Looking for a Senior Frontend Engineer with strong React, Redux, and system design skills."
    });

    console.log("Mock Response:", JSON.stringify(result, null, 2));

    try {
        const newReport = new interviewReport({
            jobDescription: "Looking for a Senior Frontend Engineer with strong React, Redux, and system design skills.",
            resume: "Experienced React Developer with 5 years in building scalable web apps. Knows Node.js and MongoDB.",
            selfDescription: "I love building fast, modern web applications.",
            user: new mongoose.Types.ObjectId(),
            ...result
        });
        
        await newReport.validate();
        console.log("Validation Passed!");
    } catch (err) {
        console.error("Validation Failed:", err);
    }
    
    process.exit(0);
}

test();
