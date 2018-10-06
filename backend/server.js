import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import fetchRecordsRouter from './routes/fetch-records';
import updateRecordsRouter from './routes/update-records';
import whatsCookingRouter from './routes/whats-cooking';
import cors from 'cors';


var whitelist = ['http://localhost:3000', 'http://localhost:3001']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express();
const router = express.Router();

require('dotenv').config();


const API_PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


app.use('/', fetchRecordsRouter);
app.use('/update-airtable', updateRecordsRouter);
app.use('/whatscooking', whatsCookingRouter)

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
