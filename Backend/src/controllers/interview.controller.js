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

export const getInterviewReportByIdController=async(req,res)=>{
    const interviewId=req.params
    const interviewReportByAI=await interviewReport.findOne({_id:interviewId,user:req.user.id})

    res.status(200).json({
        message:'interview report fetched successfully',
        interviewReportByAI
    })

}

export const getALLInterviewReportsController=async(req,res)=>{
    const interviewReports=await interviewReport.find({user:req.user.id}).sort({createdAt:-1}).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan')

    res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReports
    })
}