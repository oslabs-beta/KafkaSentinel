const ioSocket = require('socket.io')(5000, {
  cors: {
    origin: '*',
    credentials: true
  }
});

ioSocket.on('connection', socket => {



  // consumer sent info

  // send name of cluster from confluent
  socket.on("clusterId", data => {
    // data = JSON.parse(data);
    console.log("clusterId", data);
    ioSocket.emit("clusterId", data);
  });

  // send total number of brokers in cluster
  socket.on("numOfBrokers", data => {
    // data = JSON.parse(data);
    console.log("numOfBrokers", data);
    ioSocket.emit("numOfBrokers", data);
  });

  // sending object with topicName:NumOfPartitions key:value pairs
  socket.on("topicListInfoObj", data => {
    // data = JSON.parse(data);
    console.log("topicListInfoObj", data);
    ioSocket.emit("topicListInfoObj", data);
  });

  socket.on("numOfTopics", data => {
    // data = JSON.parse(data);
    console.log("numOfTopics", data);
    ioSocket.emit("numOfTopics", data);
  });

  socket.on("totalPartitions", data => {
    // data = JSON.parse(data);
    console.log("totalPartitions", data);
    ioSocket.emit("totalPartitions", data);
  });

  socket.on("bytesTotalConsumer", data => {
    // data = JSON.parse(data);
    console.log("bytesTotalConsumer", data);
    ioSocket.emit("bytesTotalConsumer", data);
  });

  socket.on("totalMessagesConsumed", data => {
    // data = JSON.parse(data);
    console.log("totalMessagesConsumed", data);
    ioSocket.emit("totalMessagesConsumed", data);
  });


  // producer sent info

  socket.on("totalProducerMessages", data => {
    // data = JSON.parse(data);
    console.log("totalProducerMessages", data);
    ioSocket.emit("totalProducerMessages", data);
  });

  socket.on("producedMessagesTotalSize", data => {
    // data = JSON.parse(data);
    console.log("producedMessagesTotalSize", data);
    ioSocket.emit("producedMessagesTotalSize", data);
  });
});
