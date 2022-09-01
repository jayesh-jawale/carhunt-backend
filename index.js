import express from "express";
const app = express();

import dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose';

import {carRouter} from './routers/carRouter.js'

dotenv.config(); // getting all env keys

app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;

// Handle CORS error
app.use(cors());

// Routers
app.get('/', (req, res) => {
    res.send("Hi there! My name is Jayesh");
  });

// User Routers
app.use('/', carRouter);
  
const port = process.env.PORT
app.listen(port, () => console.log('Started'))