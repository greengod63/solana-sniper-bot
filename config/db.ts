import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sniper-bot"

// Connect to MongoDB
export async function connectDatabase(){
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB!");
    }
    catch(error){
        console.error("MongoDB connection error: ", error);
    }
}