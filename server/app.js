const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();

// mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true }).then(() => {
//   console.log('Connected to MongoDB database');
// });

module.exports = app;
