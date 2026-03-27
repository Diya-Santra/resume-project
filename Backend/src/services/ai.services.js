import dotenv from 'dotenv'
dotenv.config()
// import { GoogleGenerativeAI } from "@google/generative-ai";



// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const invokeGemini = async () => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-3-flash-preview", 
//     });

//     const result = await model.generateContent(
//       "Hello Gemini! Explain what is interview",
//     );

//     console.log(result.response.text());
//   } catch (err) {
//     console.error("Gemini Error:", err);
//   }
// };
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