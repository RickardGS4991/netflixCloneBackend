import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const server = express()

let PORT = process.env.PORT || 4000;

server.ser('port', PORT);
server.use(cookieParser());

const corsOptions = {
    origin: process.env.URL_FRONT || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

server.use(cors(corsOptions));
server.use('/v1', express.json({ limit: process.env.LIMIT_SIZE}));
server.use('/v1', bodyParser.urlencoded({extended: true}));

export default server;