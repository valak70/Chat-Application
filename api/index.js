// import {server} from "socket.io";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"
 
const app = express();
dotenv.config()

app.use(cors());
app.use(express.json())
app.use("/api/auth" , authRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack,
    })
})

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log(error);
    }   
}
mongoose.connection.on("disconnected",  ()=>{
    console.log("mongoDB disconnected!");
})

app.listen(process.env.PORT, ()=>{
    connect()
    console.log(`Server started on port ${process.env.PORT}`);  
})