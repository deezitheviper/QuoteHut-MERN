import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();


app.use(express.json({ limit: "50mb" }));
if(process.env.NODE_ENV !== 'production'){
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    }));
}

app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000,() => {
    console.log('Server listening on port 5000');
})