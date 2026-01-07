import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("MONGODB CONNECTED SUCCESSFULLY");

    } catch (error){
        console.error("Error connecting to MongoDB",error);
        process.exit(1); //exit with failure

    }
}