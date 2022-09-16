import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

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

app.listen(8800, ()=> {
    console.log("abbbbbbbbbbbbbbbbbbbaaaaaaaaaaaa")
    connect()
    console.log("Connected to Server")
})