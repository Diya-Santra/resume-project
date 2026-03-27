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
    technicalQueations:z.array(z.object({
        question:z.string().describe('The technical question can be asked in the interview'),
        intention:z.string().describe('The intention of interviewer behind this question'),
        answer:z.string().describe('How to answer this question,what points to cover,what approach to take etc')
    })).describe('Technical queations that can be asked in the interview along with their intention and how to answer them'),
    behavioralQueations:z.array(z.object({
        question:z.string().describe('The behevioral question can be asked in the interview'),
        intention:z.string().describe('The intention of interviewer behind this question'),
        answer:z.string().describe('How to answer this question,what points to cover,what approach to take etc')
    })).describe('Technical queations that can be asked in the interview along with their intention and how to answer them'),
    skillGaps:z.array(z.object({
        skill:z.string().describe('The skill which the candidate is lacking'),
        severity:z.enum(['low','medium','high']).describe('The severity on skill gap')
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    prepartionPlan:z.array(z.object({
        day:z.number().describe('the day number in the prepartion plan,starting from 1'),
        focus:z.string().describe('The main focus of this day in the prepartion plan,e.g.data structure'),
        taska:z.array(z.string()).describe('Lists of tasks to be done on this day to follow the preparation plan')
    })).describe('a day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively')

})

export const invokeGemini=async()=>{
    const response=await ai.models.generateContent({
        model:'gemini-1.5-flash',
        contents:'Hello gemini!Explain what is interview'
    })
    console.log(response.text);
}

export const generateInterviewReport=async({resume,selfDescription,jobDescription})=>{

    const prompt=`Generate an interview report for the candidate based on the following information:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}
    `
    const response=await ai.models.generateContent({
        model:'gemini-3-flash-preview',
        contents:prompt,
        config:{
            responseMimeType:'application/json',
            responseSchema:zodToJsonSchema(interviewReportSchema)
        }
    })
    console.log(response.text)
    //return JSOn.parse(response.text)
}