import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"

const app = express()
dotenv.config()

const connect = () =>{
    mongoose.connect(process.env.MONGO, {useNewUrlParser: true})
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) =>{
        console.log("could not commect to db")
    })
}

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next)=> {
    const status = err.status || 500
    const message = err.message || "something went wrong!"
    return res.status(status).json({
        success:false,
        status:status,
        message:message
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(8800, ()=> {
    console.log("abbbbbbbbbbbbbbbbbbbaaaaaaaaaaaa")
    connect()
    console.log("Connected to Server")
})