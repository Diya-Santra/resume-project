import { getInterviewReportById,generateInterviewReport,getAllInterviewReports } from "../services/interview.api.js";
import { useContext } from "react";
import interviewContext from "../interview.context.jsx";

export const useInterview=()=>{
    const context=useContext(interviewContext)

    if(!context){
        throw new Error("useInterview must be used within an interviewProvider")    
    }
    const {loading,setLoading,report,setreport,reports,setreports}=context

    const generateReport=async({jobDescription,selfDescription,resumeFile,title})=>{
        setLoading(true)
        try{
            const response=await generateInterviewReport({jobDescription,selfDescription,resumeFile,title})
            setreport(response.interviewReport)
        } catch (error) {
            console.error("Error generating interview report:", error)
        } finally {
            setLoading(false)
        }
    }
    const getReportById=async(interviewId)=>{
        setLoading(true)
        try{
            const response=await getInterviewReportById(interviewId)
            setreport(response.interviewReport)
        } catch (error) {
            console.error("Error fetching interview report:", error)
        } finally {
            setLoading(false)
        }
    }

    const getAllReports=async()=>{
        setLoading(true)
        try{
            const response=await getAllInterviewReports()
            setreports(response.interviewReports)
        } catch (error) {
            console.error("Error fetching interview reports:", error)
        } finally {
            setLoading(false)
        }
    }

    return{
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getAllReports
    }
}