import mongoose, { mongo } from "mongoose";

const technicalQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required;[true,"technical qu required"]
    },
    intention:{
        type:String,
        required;[true,"intention qu required"]
    },
    answer:{
        type:String,
        required;[true,"answer qu required"]
    }
},{
    _id:false
})

const behavioralSchema=new mongoose.Schema({
    question:{
        type:String,
        required;[true,"technical qu required"]
    },
    intention:{
        type:String,
        required;[true,"intention qu required"]
    },
    answer:{
        type:String,
        required;[true,"answer qu required"]
    }
},{
    _id:false
})

const skillGapsSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,'skill is required']
    },
    severity:{
        type:String,
        enum:['low','medium','high'],
        required:[true,'severity is required']
    }
},{
    _id:false
})

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,'Day is required']
    },
    focus:{
        type:String,
        required:[true,'focus is required']
    },
    tasks:{
        type:String,
        required:[true,'task is required']
    }
})

const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"job description required"]
    },
    resume{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchscore:{
        type:Number,
        min:0,
        mix:100
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralSchema],
    skillGaps:[skillGapsSchema],
    prepationPlan:[preparationPlanSchema]
},{
    timestamps:true
})

export const interviewReport=new mongoose.model('interViewReport',interviewReportSchema)