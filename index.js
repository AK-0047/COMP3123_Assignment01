// const http = require('http');
const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const DB_CONNECTION_STRING = "mongodb+srv://admin:Anshul2003@comp3123.a4aoq.mongodb.net/Assignment?retryWrites=true&w=majority&appName=comp3123"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected")
}).catch((error) => {
    console.log("Error: ", error)
})

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const SERVER_PORT = process.env.PORT || 1111;

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
})