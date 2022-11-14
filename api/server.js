import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

dotenv.config();

const app = express();


app.use(express.json({ limit: "50mb" }));
if(process.env.NODE_ENV !== 'production'){
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    }));
    app.use(morgan('dev'));
}

app.use(cookieParser());

//DB
const connectDb = () => {
     mongoose.connect(process.env.MONGODBURL)
     .then(res => {
        console.log('Connected to MongoDB on database ' + res.connection.name);
     }).catch(err => console.log(err))
}
 
// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000,() => {
    console.log('Server listening on port 5000');
    connectDb();
})