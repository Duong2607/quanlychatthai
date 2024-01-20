import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./route/web";
import db from "./config/db";
import mqtt from "./config/mqtt"
import cors from "cors";
let app = express();

//quang
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoute = require('./route/auth');

app.use(cors());
app.use(cookieParser());
app.use(express.json());


let http = require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);

// init socket
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"],
    },
  });

require('dotenv').config();

//connect to db
db.connect();

//connect mqtt
mqtt.mqttconnect(io);

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Routes
app.use("/v1/auth",authRoute);

initWebRoutes(app);


let port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log("Backend Nodejs is runing on the port : "+port);
  
})

