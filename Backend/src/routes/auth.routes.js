import express from 'express'
import { Router } from 'express'
import { getMe, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js'
import { authUserMiddleware } from '../middleware/auth.middleware.js'

const authRouter=Router()

export default authRouter

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/logout',logoutUser)
authRouter.get('/get-me',authUserMiddleware,getMe)