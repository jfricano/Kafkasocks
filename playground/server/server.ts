require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

import { Consumer } from 'kafka-socks';
import { Subject } from 'kafka-socks';
import { produce } from './producer'
import { kafka } from './kafka'

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(require("cors")());
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

produce().catch((error: any) => {
  console.log(error);
  process.exit(1);
})

const kafkaconsumer_1 = kafka.consumer({ groupId: 'truck-group-1' })
const kafkaconsumer_2 = kafka.consumer({ groupId: 'truck-group-2' })

const consumer_1 = new Consumer(kafkaconsumer_1, 'trucks-topic-1', `truck message-1`)
const consumer_2 = new Consumer(kafkaconsumer_2, 'trucks-topic-2', 'truck message-2')
const trucks_subject = new Subject(io, 'trucks')
trucks_subject.add(consumer_1)
trucks_subject.add(consumer_2)

app.get('/consume', (req: any, res : any) => {
  trucks_subject.connect()
  return res.send({message : 'works!'})
})

app.get('/pause', (req : any, res : any ) => {
  console.log('in the middleware for pause')
  trucks_subject.pause();
})

app.get('/resume', (req: any, res: any) => {
  console.log('in the middleware for resume')
  trucks_subject.resume();
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
