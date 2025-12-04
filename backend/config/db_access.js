import mongoose from "mongoose";

export const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.db_access);
    }
    catch(error){
        console.error("Error: "+error.message);
        process.exit(1);
    }
    mongoose.connection.on("connected", ()=>{
        console.log("connected to database successfully!");
    });
    mongoose.connection.on("error", (err)=>{
        console.error("Error while connecting to database!"+err.message);
    });

    mongoose.connection.on("disconnected", ()=>{
        console.error("MongoDB disconnected!");
    });

}