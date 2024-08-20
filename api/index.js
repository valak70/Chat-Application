// import {server} from "socket.io";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

 
const app = express();
dotenv.config()

app.use(cors());
app.use(express.json())

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log(error.message);
    }   
}

app.listen(process.env.PORT, async()=>{
    await connect()
    console.log(`Server started on port ${process.env.PORT}`);  
})