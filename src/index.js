import express from 'express';
import morgan from 'morgan';
import routes from './routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

const app = express();

dotenv.config();
mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true,});


  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(morgan('dev'));
  app.use('/files',express.static(path.resolve("src/temp/uploads")))
  app.use(routes);


 app.listen(3200);