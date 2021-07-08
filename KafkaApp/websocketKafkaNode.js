
// const { Server } = require("socket.io");
// const PORT = 3000;
// const io = new Server(PORT);

// io.on('connection', async function(socket) {

//   console.log("hello, socket:", socket);
//   // socket.emit('Hi!', { message: 'Chat connected', id: socket.id });


  
//   // socket.on('sendMessage', ({ message, to }) => {
//   //    produce({ from: socket.id, to, message });
//   // });
  
// });




// const express = require("express");
// const socket = require("socket.io");

// // App setup
// const PORT = 5000;
// const app = express();
// const server = app.listen(PORT, async function () {
//   await console.log(`Listening on port ${PORT}`);
//   await console.log(`http://localhost:${PORT}`);
//   // await io.on("connection", function (socket) {
//   //   console.log("Made socket connection");
//   // });
// });

// // Static files
// app.use(express.static("public"));

// // Socket setup
// const io = socket(server);

// // io.connect(`http://localhost:${PORT}`)

// io.on("connection", function (socket) {
//   console.log("Made socket connection");
// });

// // console.log("here")

// io.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });


// let app = require("express")();
// let http = require("http").Server(app);
// console.log(http);
// let io = require("socket.io")(http);

// io.connect(PORT)

// io.on("connection", function() {
// console.log("connected");
// });

// http.listen(PORT, function () {
//   console.log("listening in port 3000");
// });



// var app = require('express')();
// var server = require('http').Server(app);
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// var socketio_port = '33334';

// http.listen(socketio_port, function(){
//   console.log('listening on *:'+socketio_port);
// });

// io.on('connection', function(socket){ //have to bounce to ext for now
//   console.log("hello");
// })
  // //Truck 1:
  // const consumer_truck_1 = kafka.consumer({ groupId: 'truck1-group' , fromOffset: 0})
  // const run_truck_1 = async () => {
  //   const truck_1_topic = 'TRUCK_1_SENSORS'
  //   await consumer_truck_1.connect();
  //   await consumer_truck_1.subscribe({ topic: truck_1_topic });
  //   await consumer_truck_1.run({
  //       eachMessage: async ({ topic, partition, message }) => {
  //           socket.emit(truck_1_topic, `${message.value}`);
  //           socket.broadcast.emit('TRUCK_1_SENSORS', `${message.value}`);
  //       },
  //   });
  // }




  
// let app = require('express')();
// let server = require('http').createServer(app);
// let io = require('socket.io')(server);
 
// io.on('connection', (socket) => {
 
//   console.log("please papa")

//   socket.on('disconnect', function(){
//     io.emit('users-changed', {user: socket.username, event: 'left'});   
//   });
 
//   socket.on('set-name', (name) => {
//     socket.username = name;
//     io.emit('users-changed', {user: name, event: 'joined'});    
//   });
  
//   socket.on('send-message', (message) => {
//     io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
//   });
// });
 
// var port = process.env.PORT || 3001;
 
// server.listen(port, function(){
//    console.log('listening in http://localhost:' + port);
// });











// // Require HTTP module (to start server) and Socket.IO
// var http = require('http');
// var io = require('socket.io');

// // Start the server at port 8080
// var server = http.createServer(function(req, res){ 

// 	// Send HTML headers and message
// 	res.writeHead(200,{ 'Content-Type': 'text/html' }); 
// 	res.end('<h1>Hello Socket Lover!</h1>');
// });
// server.listen(8080);

// // Create a Socket.IO instance, passing it our server
// var socket = io.listen(server);

// // Add a connect listener
// socket.on('connection', function(client){ 
	
// 	// Success!  Now listen to messages to be received
// 	client.on('message',function(event){ 
// 		console.log('Received message from client!',event);
// 	});
// 	client.on('disconnect',function(){
// 		clearInterval(interval);
// 		console.log('Server has disconnected');
// 	});
// });







// const express = require("express");
// const socket = require("socket.io");

// // App setup
// const PORT = 5000;
// const app = express();
// const server = app.listen(PORT, function () {
//   console.log(`Listening on port ${PORT}`);
//   console.log(`http://localhost:${PORT}`);
// });

// // Static files
// app.use(express.static("public"));

// // Socket setup
// const io = socket(server);

// io.on("connection", function (socket) {
//   console.log("Made socket connection");
// });

// io.emit("testing", {'hot': 'dog'});

// io.on("testing", data => {
//   console.log(data);
// })

const ioSocket = require('socket.io')(5000, {
  cors: {
    origin: ['http://localhost:5000'],
  }
});

ioSocket.on('connection', socket => {
  console.log(socket.id)
  console.log("cake cake cake")

  // // server-side
  // io.on("connection", (socket) => {
  //   socket.emit("hello", "world");
  // });

  socket.emit("SendMessage", "test");

  // // client-side
  // socket.on("message", (arg) => {
  //   console.log(arg); // world
  // });



});


ioSocket.on('message', data => {
  console.log("payload", data)
});


// const { io } = require ('socket.io-client');

// const socket = io("http://localhost:5000");

// socket.emit('message', {hello: "world"});

