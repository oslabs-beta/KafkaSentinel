// const express = require("express");

// const PORT = 5000;

// const app = express();
// const socketIo = require("socket.io");

// class SocketIo {
//   static instance;

//   static init(server) {
//     SocketIo.instance = socketIo(server, {
//       cors: {
//         origin: "*",
//       },
//     });
//   }

//   static start() {
//     if (!SocketIo.instance) {
//       throw Error('socket.io instance not initialized');
//     }

//     SocketIo.instance.on("connection", (client) => {
//       console.log(client.id, "has connected");

//       client.on('connectChart')
//     } )

//   }
// }

// const server = app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// });
// SocketIo.init('wss://echo.websocket.org');

// SocketIo.start();


// module.exports = SocketIo;


// what is needed to emit a message

const { io } = require ('socket.io-client');

const socket = io("http://localhost:5000");

 // client-side
socket.emit("SendMessage", {hot: "dog"});


// console.log(socket);
// console.log(io);