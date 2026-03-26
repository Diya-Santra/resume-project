import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

export const invokeGemini=async()=>{
    const response=await ai.models.generateContent({
        model:'gemini-2.5-flash',
        contents:'Hello gemini!Explain what is interview'
    })
    console.log(response.text);
}