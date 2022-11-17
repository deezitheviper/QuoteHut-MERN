import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRouter from './routes/Auth.js';
import quoteRouter from './routes/Quote.js';
import userRouter from './routes/User.js';



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
app.use('/api/auth', authRouter )
app.use('/api/user', userRouter )
app.use('/api/quote', quoteRouter)

app.use((err,req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || 'Unable to proceed further'
    return res.status(errStatus).json({
        status:false,
        message: errMessage,
        error: errStatus,
        stack: err.stack
    })

})




app.listen(5000,() => {
    console.log('Server listening on port 5000');
    connectDb();
})