import { PDFParse } from 'pdf-parse';


const pdfParse = async (buffer) => {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result.text;
};
import { generateInterviewReport } from '../services/ai.services.js'
import { interviewReport } from '../models/interviewReport.model.js'

export const generateInterviewController=async(req,res)=>{
    const resumeContent=await pdfParse(req.file.buffer)
    const{selfDescription,jobDescription}=req.body

    const interViewReportByAI=await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription
    })
    const newInterviewReport=await interviewReport.create({
        user:req.user.id,
        resume:resumeContent,
        selfDescription,
        jobDescription,
        ...interViewReportByAI
    })
    res.status(201).json({
        message:'Interview report generated successfully',
        newInterviewReport
    })
}
