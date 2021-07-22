const { Kafka } = require('kafkajs');
const { io } = require ('socket.io-client');

const kafkaController = {};

kafkaController.getClusterInfo = async (req,res,next) => {

  console.log("in kafkaController");

  const username = req.cookies.username;
  const password = req.cookies.password;
  const broker = req.cookies.broker;

  const sasl = username && password ? { username, password, mechanism: 'plain' } : null
  const ssl = !!sasl

  const kafka = new Kafka({
    clientId: 'kafkaSentinelAdminInfo',
    brokers: [`${broker}`],
    ssl,
    sasl
  })

  const admin = kafka.admin()
  await admin.connect()

  const socket = io("http://localhost:5000");
  const describeCluster = await admin.describeCluster()

  // console.log("describe cluster", describeCluster);

  // grab cluster name
  const clusterId = describeCluster.clusterId;
  await socket.emit("clusterId", clusterId);

  // grab number of brokers
  const numOfBrokers = describeCluster.brokers.length;
  await socket.emit("numOfBrokers", numOfBrokers);

  const topicList = await admin.listTopics();

  // console.log(topicList);

  const topicMetaData = await admin.fetchTopicMetadata({ topics: topicList })

  // console.log("topic MetaData", topicMetaData)

  // create object that will hold key:value pairs of topicName:NumOfPartitions
  const topicListInfoObj = {}

  // store total number of topics
  let numOfTopics = 0;

  // store total number of partitions
  let totalPartitions = 0;

  await topicMetaData.topics.forEach((el,index) => {
    topicListInfoObj[el.name] = topicMetaData.topics[index].partitions.length;
    numOfTopics++;
    totalPartitions += topicListInfoObj[el.name]
    // console.log(`Total number of partitions for ${el.name}: ${topicMetaData.topics[index].partitions.length}`)
  })

  // emit object with topicName:topicPartitionQuantity key:value pairs
  await socket.emit("topicListInfoObj", topicListInfoObj);
  // emit total number of topics
  await socket.emit("numOfTopics", numOfTopics);
  // emit total number of partitions
  await socket.emit("totalPartitions", totalPartitions);

  await admin.disconnect();

  next();
}

let hit = false;

kafkaController.startConsumers = async (req, res, next) => {
  if(hit) return next();
  hit = true;
  const socket = io("http://localhost:5000");

  const username = req.cookies.username;
  const password = req.cookies.password;
  const broker = req.cookies.broker;

  const sasl = username && password ? { username, password, mechanism: 'plain' } : null
  const ssl = !!sasl

  const kafka = new Kafka({
    clientId: 'kafkaSentinelAdminInfo',
    brokers: [`${broker}`],
    ssl,
    sasl
  })

  // // Start consumer
  const consumer = kafka.consumer({ groupId: 'kafka-sentinel-group' });
  const producer = kafka.producer();
  // // Connect to Kafka instance
  await consumer.connect()
  await producer.connect()

  await consumer.subscribe({ topic: 'npm-package-published', fromBeginning: true })
  // await consumer.subscribe({ topic: 'testing', fromBeginning: true })

  const idLocker = {};
  let bytesTotalConsumer = 0;
  let totalMessagesConsumed = 0;
  const messagesConsumed = [];
  const { REQUEST } = consumer.events;
  const consumerEvent = async () => await consumer.on(REQUEST, async (e) => {
    if(!idLocker[e.id]){
      idLocker[e.id] = true;
      bytesTotalConsumer += e.payload.size
    } 
    // await console.log("Line 48 REQUEST", e.id)
  //  await consumerEvent();
  })
  consumerEvent();
  

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("another message")

      console.log("consumer total bytes", bytesTotalConsumer)

      // emit total bytes consumed by consumer
      await socket.emit("bytesTotalConsumer", bytesTotalConsumer);

      messagesConsumed.push("message");
      // increment total messages consumed
      totalMessagesConsumed += 1;
      console.log("total msgs consumed", totalMessagesConsumed, "messagesConsumed", messagesConsumed);
      // emit total messages consumed
      await socket.emit("totalMessagesConsumed", totalMessagesConsumed);
      
    },
  })
  
  return next();
}


module.exports = kafkaController;