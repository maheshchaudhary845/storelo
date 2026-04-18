import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { router } from "./routes/auth.routes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', )

app.get('/', (req, res)=>{
    res.send("API is running!");
})

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
})