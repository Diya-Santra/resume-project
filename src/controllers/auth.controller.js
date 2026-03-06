import { User } from "../models/user.model.js";

export const registerUser=async(req,res)=>{
    const {username,email,password}=req.body
    if(!username||!email||!password){
        return res.status(400).json({
            message:"Please provide username ,email,password"
        })
    }
    const isUserAlreadyExists=await User.findOne({
        $or: [{username},{email}]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:'Account with this username or email already exsits'
        })
    }
    
}