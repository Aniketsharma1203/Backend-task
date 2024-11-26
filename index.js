import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDb } from './connect.js';
import urls from './routes/urls.js';
import getStats from './routes/getStats.js';
import limiter from './limiter.js';

//Enviornment variables
dotenv.config();

const app = express();

//Limits number of requests per minute for a client 
app.use(limiter);

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Apply Limiter on routes starting with /
app.use('/', limiter, urls);

app.use('/stats', getStats);

connectToMongoDb(process.env.MONGO_LINK)
    .then(() => console.log("MongoDB Connected."))
    .catch(error => console.log(error));


app.listen(PORT, () => console.log(`App is listening on ${process.env.PORT}`));