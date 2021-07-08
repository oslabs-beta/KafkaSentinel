//const kafka = require('kafka-node');
const { Kafka } = require('kafkajs');
const express = require('express');
// const io = require('socket.io.client'); //unsure we need this line
const port = 3000;
const app = express();
// const consumer = require('./consumer2');

// // const Consumer = kafka.Consumer,
// const Consumer = Kafka.Consumer,
// //  client = new kafka.KafkaClient('localhost:9092'),
// client = new Kafka.KafkaClient('localhost:9092'),
// consumer = new Consumer(
// //  client, [ { topic: 'topic_stream', partition: 0 } ], { autoCommit: false });
// client, [ { topic: 'npm-package-published', partition: 0 } ], { autoCommit: false }); //should partition rather be *, or any?

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// io.emit('connection', 'hello');

io.on('connection', () => {
  console.log('Connected');

// io.on('message', function (message) {
//     client.emit('request', message.value);
//   });

// client.on('disconnect', () => { 
//     console.log('Client disconnected');
//  });
});