import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from './routes/userRoutes';

//const uri = "mongodb+srv://admin:1234@food-order-app.efq1gvy.mongodb.net/?retryWrites=true&w=majority&appName=food-order-app"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("Connected to database"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/server-check", async (req: Request, res: Response) => {
    res.send({ message: 'Server is working...' })
})

app.use("/api/user", userRoute);
app.get("/", async (req: Request, res: Response) => {
    res.json({ message: "Hello. Welcome to FreshBites" });
})

app.listen(7000, () => {
    console.log("Server started on localhost:7000");
})