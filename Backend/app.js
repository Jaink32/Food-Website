import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from './database/dbConnection.js'
import {errorMiddleware} from './error/error.js'
import ReservationRouter from './routes/reservationRoutes.js'

const app = express();
dotenv.config({path:"./Config/config.env"});

app.use((req,res,next)=>{
    console.log("Path: "+req.url+"   Method: "+req.method);
    next();
})


// app.use(cors({
//     origin:"http://localhost:5173/",
//     // origin:[process.env.FRONTEND_URL], if you are connect one backend with many frontend then use ',' after process.env.FRONTEND_URL,another frontend url
//     credentials:true,
// }))

app.use(cors());    


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/reservation",ReservationRouter);

dbConnection();

app.use(errorMiddleware);


export default app