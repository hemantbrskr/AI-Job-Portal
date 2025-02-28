import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
dotenv.config({})

//middleware
app.use(express.json());
app.use (express.urlencoded({ extended: true }));
app.use(cookieParser);

const corsOptions = {
    origin: ["https://localhost:5121"],
    Credentials: true,
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 5001;

//api's routes

app.use("/api/users", userRoute);

app.listen(PORT, ()=>{
    connectDB();
    console.log (`Server is listening on port ${PORT}`);
});