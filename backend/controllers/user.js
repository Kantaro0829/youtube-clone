import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"


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
        //チャンネル登録しているユーザID（チャンネルID）を
        //ユーザコレクションに追加
        await User.findByIdAndUpdate(req.user.id, {
            $push:{ subscribedUsers: req.params.id }
        })
        //todo
        await User.findByIdAndUpdate(req.params.id, {
            $inc:{ subscribers: 1}
        })
        res.status(200).json("subscribed successfully!")
    }catch(err){
        next(err)
    }
}
export const unsubscribe = async(req, res, next) => {
    try{
        //チャンネル登録しているユーザID（チャンネルID）を
        //ユーザコレクションから排除
        await User.findByIdAndUpdate(req.user.id, {
            $pull:{subscribedUsers: req.params.id}
        })
        //todo
        await User.findByIdAndUpdate(req.params.id, {
            $inc:{ subscribers: -1 }
        })
        res.status(200).json("unsubscribed successfully!")
    }catch(err){
        next(err)
    }
}
export const like = async(req, res, next) => {
    const id = req.user.id
    const videoId = req.params.videoId

    try{
        //todo
        await Video.findOneAndUpdate(videoId, {
            $addToSet:{ likes: id },
            $pull:{ dislikes: id }
        })
        res.status(200).json("The video has been thumbed")        
    }catch(err){
        next(err)
    }
}
export const dislike = async(req, res, next) => {
    const id = req.user.id
    const videoId = req.params.videoId
    try{
        //todo
        await Video.findOneAndUpdate(videoId, {
            $addToSet:{ dislikes: id },
            $pull:{ likes: id }
        })
        res.status(200).json("The video has been disliked")        
        
    }catch(err){
        next(err)
    }
}