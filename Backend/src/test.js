import z from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const interviewReportSchema=z.object({
    matchScore:z.number().describe("A score between 0 an 100 indicating how well the candiadate's profile matches for the job"),
    technicalQuestions:z.array(z.object({
        question:z.string().describe('The technical question can be asked in the interview'),
        intention:z.string().describe('The intention of interviewer behind this question'),
        answer:z.string().describe('How to answer this question,what points to cover,what approach to take etc')
    })).min(3)
       .describe('Technical queations that can be asked in the interview along with their intention and how to answer them'),
    behavioralQuestions:z.array(z.object({
        question:z.string().describe('The behevioral question can be asked in the interview'),
        intention:z.string().describe('The intention of interviewer behind this question'),
        answer:z.string().describe('How to answer this question,what points to cover,what approach to take etc')
    })).min(3)
       .describe('Technical queations that can be asked in the interview along with their intention and how to answer them'),
    skillGaps:z.array(z.object({
        skill:z.string().describe('The skill which the candidate is lacking'),
        severity:z.enum(['low','medium','high']).describe('The severity on skill gap')
    })).min(2)
      .describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan:z.array(z.object({
        day:z.number().describe('the day number in the prepartion plan,starting from 1'),
        focus:z.string().describe('The main focus of this day in the prepartion plan,e.g.data structure'),
        taska:z.array(z.string()).describe('Lists of tasks to be done on this day to follow the preparation plan')
    })).min(5)
       .describe('a day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively')
});

console.log(JSON.stringify(zodToJsonSchema(interviewReportSchema), null, 2));
