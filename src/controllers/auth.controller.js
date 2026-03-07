import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { BlackList } from "../models/blacklist.model.js";

/*register controller*/ 
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
    const hashedPassword=await bcrypt.hash(password,10)

    const user=await User.create({
        username,
        email,
        password:hashedPassword
    })
    const token=jwt.sign({
        id:user._id,username:user.username
    },
    process.env.JWT_SECRET,
    {expiresIn:'1d'})

    res.cookie('token',token)
    res.status(201).json({
        message:'User registered successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/*login controller */
export const loginUser=async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})

    if(!user){
        return res.status(400).json({
            message:'Invalid email or password'
        })
    }
    const isPasswordvalid=await bcrypt.compare(password,user.password)
    if(!isPasswordvalid){
        return res.status(400).json({
            message:'Invalid email or password'
        })
    }
    const token=jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )
    res.cookie('token',token)
    res.status(200).json({
        message:'LoggedIn successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/*logout controller*/
export const logoutUser=async(req,res)=>{
    const token=req.cookies?.token
    if(token){
        await BlackList.create({token})
    }
    res.clearCookie('token')

    res.status(200).json({
        message:'Logged out successfully'
    })
}

/*get-me controller*/
export const getMe=async(req,res)=>{
    const user=await User.findById(req.user.id)
    res.status(200).json({
       message:'user fetched successfully',
       user:{
        id:user.id,
        username:user.username,
        email:user.email
       } 
    })
}