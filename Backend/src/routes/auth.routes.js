import express from 'express'
import { Router } from 'express'
import { getMe, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js'
import { authUserMiddleware } from '../middleware/auth.middleware.js'

const router=Router()

export default router

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.get('/get-me',authUserMiddleware,getMe)