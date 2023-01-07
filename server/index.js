import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('APP IS RUNNING')
})

// const CONNECTION_URL = 'mongodb+srv://memories:memories123@cluster0.szzydwc.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 4000;


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));



 