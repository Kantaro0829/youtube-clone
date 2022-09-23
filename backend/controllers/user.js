import { createError } from "../error.js"
import User from "../models/User.js"


export const test = (req, res)=>{
    res.json("it's successful")
    console.log("test function is working!!!!")
}


export const update = async (req, res, next) => {
    if(req.params.id === req.user.id) {

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            { new:true }
            )
            res.status(200).json(updatedUser)
        }catch(err){
            next(err)
        }

    }else{
        return next(createError("403", "You can update only your account!"))
    }
}


export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
  
        try{
            await User.findByIdAndDelete(
                req.params.id
            )
            res.status(200).json("User has been deleted!")
        }catch(err){
            next(err)
        }

    }else{
        return next(createError("403", "You can delete only your account!"))
    }
}


export const getUser = async(req, res, next) => {
    try{
        //todo
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
    
}

export const subscribe = async(req, res, next) => {
    try{
        //todo
        
    }catch(err){
        next(err)
    }
}
export const unsubscribe = async(req, res, next) => {
    try{
        //todo
        
    }catch(err){
        next(err)
    }
}
export const like = async(req, res, next) => {
    try{
        //todo
        
    }catch(err){
        next(err)
    }
}
export const dislike = async(req, res, next) => {
    try{
        //todo
        
    }catch(err){
        next(err)
    }
}