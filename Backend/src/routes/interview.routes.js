import express from 'express'
import { Router } from 'express'
import { authUserMiddleware } from '../middleware/auth.middleware.js'
import { generateInterviewController } from '../controllers/interview.controller.js'
import { upload } from '../middleware/file.middleware.js'

const interviewRouter=Router()

export default interviewRouter

interviewRouter.post('/generate-report',authUserMiddleware,upload.single('resume'),generateInterviewController)