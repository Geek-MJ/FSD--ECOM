import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/index.js'

dotenv.config()

const app = express()
const corsOptions = {
    origin: 'http://localhost:3000', // your frontend URL
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser())


app.options('*', cors());

app.use(express.json())
app.use("/api",router)

const PORT = process.env.PORT || 8080;

connectDB().then(() =>{

    app.listen(PORT,()=> {
        console.log("Server is Running...")
    })
})