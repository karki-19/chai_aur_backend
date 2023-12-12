import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

//router import 
import userRouter from './routes/userRoutes.js'

//routes declaration 
app.use("/api/v1/users",userRouter)


export default app 