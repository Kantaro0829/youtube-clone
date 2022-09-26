import { createError } from "../error.js"
import Video from "../models/Video.js"
import User from "../models/User.js"

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body})
    try{
        //動画の登録処理
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    }catch(err){
        next(err)
    }
}

export const updateVideo = async (req, res, next) => {
    try{
        //動画の更新処理
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found"))
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true}
            )
            res.status(200).json(updatedVideo)
        }else {
            return next(createError(403, "You can update only your video!"))
        }
    }catch(err){
        next(err)
    }
}

export const deleteVideo = async (req, res, next) => {
    try{
        //動画の削除処理
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found"))
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(
                req.params.id,
            )
            res.status(200).json("The video has been deleted")
        }else {
            return next(createError(403, "You can delete only your video!"))
        }
    }catch(err){
        next(err)
    }
}

export const getVideo = async (req, res, next) => {
    try{
        //動画取得処理
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    }catch(err){
        next(err)
    }
}

export const addView = async (req, res, next) => {
    try{
        //動画視聴数のインクリメントを行う
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: {views:1}
        })
        res.status(200).json("The view has been increased.")
    }catch(err){
        next(err)
    }
}

export const random = async (req, res, next) => {
    try{
        //ランダムに動画40こ取得する
        const video = await Video.aggregate([{$sample:{size:40}}])
        res.status(200).json(video)
    }catch(err){
        next(err)
    }
}

export const trend = async (req, res, next) => {
    try{
        //トレンド（視聴数の多い）の動画を取得
        const videos = await Video.find().sort({views:-1})
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}


export const sub = async (req, res, next) => {
    try{
        //登録しているチャンネルの取得
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId})
            })
        )
        //flat()ネストをなくす
        res.status(200).json(list.flat().sort((a,b) => b.createdAt - a.createdAt))
    }catch(err){
        next(err)
    }
}

