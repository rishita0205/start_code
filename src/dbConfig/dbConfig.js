import mongoose from "mongoose";
import * as dotenv from "dotenv"
export async function dbConnection (){


    try{
        mongoose.connect(process.env.MONGODB_URI)
        const connection =mongoose.connection

        connection.on('connected',()=>{
            console.log("nongoDB connected");
        })

        connection.on('error',(err)=>{
            console.log("MongoDB connection error caught");
            console.log(err);
            process.exit();

        })

    }catch(error){
        console.log("something went wrong in connecting to DB")
        console.log(error);
    }
    
}
export default dbConnection;