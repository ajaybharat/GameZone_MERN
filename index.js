const express = require("express");
const app = express();
const authRoutes = require('./controller/auth');
const userRoutes = require('./controller/user');
const cors = require('cors');
require("./db");
require("dotenv").config();



app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Content-Type"],
  })
);
app.use(express.json()); // like middleware in pipeline
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);


app.listen(process.env.PORT, function () {
    console.log(`server is running`);
});

