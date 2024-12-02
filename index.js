// const http = require('http');
const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');

// const DB_CONNECTION_STRING = "mongodb+srv://admin:Anshul2003@comp3123.nrtch.mongodb.net/Assignment?retryWrites=true&w=majority&appName=comp3123"

mongoose.connect("mongodb+srv://admin:Anshul2003@comp3123.a4aoq.mongodb.net/Assignment?retryWrites=true&w=majority&appName=comp3123", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Error connecting to MongoDB:", err.message));

// mongoose.connect(DB_CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Database Connected")
// }).catch((error) => {
//     console.log("Error: ", error)
// })

const app = express();

app.use(cors({
        origin: 'https://101416629-comp3123-assignment2-reactjs.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    })
);
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Assignment</h1>");
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const SERVER_PORT = process.env.PORT || 1111;

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
})