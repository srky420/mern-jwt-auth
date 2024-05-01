const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./Routes/AuthRoute');
require('dotenv').config();
const { MONGO_URI, PORT } = process.env;


// Apply Middlewares
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        credentials: true
    })
);
app.use(express.json());

app.use(cookieParser());

app.use('/', authRoute);


// Connect to MongoURI
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connection successful.'))
    .catch(err => console.log(err));

// Start Server
app.listen(PORT || 3000, () => {
    console.log('Server is listening on Port ' + PORT || 3000);
});