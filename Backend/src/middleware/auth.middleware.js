import jwt from 'jsonwebtoken'
import { BlackList } from '../models/blacklist.model.js'

export const authUserMiddleware=async(req,res,next)=>{
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:'token not provided'
        })
    }
    const isTokenBlackListed=await BlackList.findOne({token})

    if(isTokenBlackListed){
        return res.json(401).json({
            message:'Token is invalid'
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({
            message:'Invalid token'
        })
    }

}