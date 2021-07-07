const socketIo = require("socket.io");

class SocketIo {
  static instance;

  static init(server) {
    SocketIo.instance = socketIo(server, {
      cors: {
        origin: "*",
      },
    });
  }

  static start() {
    if (!SocketIo.instance) {
      throw Error('socket.io instance not initialized');
    }

    SocketIo.instance.on("connection", (client) => {
      console.log(client.id, "has connected");

      client.on('connectChart')
    } )

  }
}


module.exports = SocketIo;