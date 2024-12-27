import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './ConnectDB.js'

dotenv.config({
    path:"./.env"
})

connectDB();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));

import adminrouter from './routes/admin.routes.js';
import orderRouter from './routes/order.routes.js';

app.use('/api/admin',adminrouter);
app.use('/api/order',orderRouter);



app.listen(4000, ()=>{
    console.log('app is running at 4000')
})
