import dotenv from 'dotenv'
dotenv.config()
import z from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

const interviewReportSchema=z.object({
    matchScore:z.number().describe("A score between 0 an 100 indicating how well the candiadate's profile matches for the job"),
    technicalQuestions:z.array(z.object({
        question:z.string().describe('The technical question can be asked in the interview'),
        intention:z.string().describe('The intention of interviewer behind this question'),
        answer:z.string().describe('How to answer this question,what points to cover,what approach to take etc')
    })).describe('Technical queations that can be asked in the interview along with their intention and how to answer them'),
    behavioralQuestions:z.array(z.object({
        question:z.string().describe('The behevioral question can be asked in the interview'),
        intention:z.string().describe('The intention of interviewer behind this question'),
        answer:z.string().describe('How to answer this question,what points to cover,what approach to take etc')
    })).describe('Behavioral questions that can be asked in the interview along with their intention and how to answer them'),
    skillGaps:z.array(z.object({
        skill:z.string().describe('The skill which the candidate is lacking'),
        severity:z.enum(['low','medium','high']).describe('The severity on skill gap')
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan:z.array(z.object({
        day:z.number().describe('the day number in the prepartion plan,starting from 1'),
        focus:z.string().describe('The main focus of this day in the prepartion plan,e.g.data structure'),
        tasks:z.array(z.string()).describe('Lists of tasks to be done on this day to follow the preparation plan')
    })).describe('a day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively'),
    title:z.string().describe('A title for the job for which the interview report is generated')//new

})

export const invokeGemini=async()=>{
    const response=await ai.models.generateContent({
        model:'gemini-2.5-flash',
        contents:'Hello gemini!Explain what is interview'
    })
    console.log(response.text);
}

export const generateInterviewReport=async({resume,selfDescription,jobDescription})=>{

    const prompt=`You are an expert technical interviewer.
                   Generate an interview report for the candidate based on the following information:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}

                    STRICT REQUIREMENTS:
                    - matchScore must be between 0 and 100
                    - Generate technical questions, behavioral questions, skill gaps, and a preparation plan.
                    - If the candidate perfectly matches the job, skillGaps can be empty, but try to find at least one.
                    - Be detailed and realistic

                    VERY IMPORTANT:
                    - technicalQuestions must be an array of objects with: question, intention, answer
                    - behavioralQuestions must be an array of objects with: question, intention, answer
                    - skillGaps must be an array of objects with: skill, severity (low, medium, or high string)
                    - preparationPlan must be an array of objects with: day (number), focus (string), tasks (array of strings)
                    - title must be a string representing the job title


                    - Output ONLY valid JSON, do not include markdown blocks.
    `
    const response=await ai.models.generateContent({
        model:'gemini-2.5-flash',
        contents:prompt,
        config:{
            responseMimeType:'application/json',
            temperature:0.7
        }
    })
    
    // Clean potential markdown blocks if AI ignored instructions
    let jsonString = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(jsonString);

    const validated = interviewReportSchema.safeParse(parsed);

    if (!validated.success) {
        console.error("Zod Error:", JSON.stringify(validated.error.issues, null, 2));
        console.log("Raw Response:", response.text);
        throw new Error("Invalid AI response");
    }

    return validated.data;
}