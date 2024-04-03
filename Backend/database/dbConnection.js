import mongoose from "mongoose";
import { config } from "dotenv";
config({
    path: "./.env"
})

console.log(process.env.MONGODB_URL)
export const dbconnection = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("database is connected");
        })
        .catch((err)=>{
            console.log("occurr error while database is connected", err);
        });
};