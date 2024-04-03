import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';
import { dbconnection } from './database/dbConnection.js';
import  messageRouter from './router/messageRouter.js'

const app = express();

config({
    path: "./.env"
});

app.use(
    cors({
        origin:[process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials:true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
);

app.use("/api/v1/message", messageRouter)

dbconnection();




export default app;
