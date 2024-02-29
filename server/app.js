require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const api = require('./api');

const app = express();
const http = require('http').createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.use("/", api);
const db_url = process.env.NODE_ENV === 'development' ? process.env.DB_URL_LOCAL : process.env.DB_URL_PROD

//Database connection
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`${process.env.NODE_ENV === 'development' ? 'development' : 'production'} Database connected`))
    .catch(() => console.log('Something went wrong while connecting DB'));

//Server
http.listen(8000, () => console.log('Server is listening on port 8000'))