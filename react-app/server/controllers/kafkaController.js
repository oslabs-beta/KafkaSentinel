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


  // // // Start consumer
  // const consumer = kafka.consumer({ groupId: 'kafka-sentinel-group' });

  // // // Connect to Kafka instance
  // await consumer.connect()

  // // // subscribe to every topic
  // // topicMetaData.topics.forEach(topic => {
  // //   // await consumer.subscribe({ topic: `${topic.name}`, fromBeginning: true })
  // //   console.log("hihi", topic.name)
  // // })

  // const topics = topicMetaData.topics;

  // for(let i = 0; i < topics.length; i++) {
  //   await consumer.subscribe({ topic: `${topics[i].name}`, fromBeginning: true })
  // }

  // // await consumer.subscribe({ topic: 'npm-package-published', fromBeginning: true })
  // // await consumer.subscribe({ topic: 'testing', fromBeginning: true })

  // const idLocker = {};
  // let bytesTotalConsumer = 0;
  // let totalMessagesConsumed = 0;

  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {

  //     const { REQUEST, FETCH, GROUP_JOIN, START_BATCH_PROCESS, END_BATCH_PROCESS} = consumer.events;
  //     const consumerEvent = async () => await consumer.on(REQUEST, async (e) => {
  //       if(!idLocker[e.id]){
  //         idLocker[e.id] = true;
  //         bytesTotalConsumer += e.payload.size
  //       } 
  //       // await console.log("Line 48 REQUEST", e.id)
  //       await consumerEvent();
  //     })
      
  //     await console.log("consumer total bytes", bytesTotalConsumer)
      
  //     // await console.log("event object", e)


  //     // emit total bytes consumed by consumer
  //     await socket.emit("bytesTotalConsumer", bytesTotalConsumer);

  //     // increment total messages consumed
  //     totalMessagesConsumed += 1;

  //     // emit total messages consumed
  //     await socket.emit("totalMessagesConsumed", totalMessagesConsumed);
      
  //     // console.log("In consumer.run in kafkaController, line 114");
  //   },
  // })

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

  // const admin = kafka.admin()
  // await admin.connect()
  // const topicList = await admin.listTopics();
  // const topicMetaData = await admin.fetchTopicMetadata({ topics: topicList })

  // // Start consumer
  const consumer = kafka.consumer({ groupId: 'kafka-sentinel-group' });
  const producer = kafka.producer();
  // // Connect to Kafka instance
  await consumer.connect()
  await producer.connect()
  // // subscribe to every topic
  // topicMetaData.topics.forEach(topic => {
  //   // await consumer.subscribe({ topic: `${topic.name}`, fromBeginning: true })
  //   console.log("hihi", topic.name)
  // })

  // const topics = topicMetaData.topics;

  // for(let i = 0; i < topics.length; i++) {
  //   await consumer.subscribe({ topic: `${topics[i].name}`, fromBeginning: true })
  // }

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

  // start listening to producer

  
  // const prodReq = { REQUEST } = producer.events;
 
  // const prod = async () => await producer.on(producer.events.REQUEST, async (e) => {
    
  //   await console.log("Line 202 event", e);

  //   //emit current number of producer messages produced
  //   await socket.emit("totalProducerMessages", 1);
  //   // emit size of message
  //   await socket.emit("producedMessagesTotalSize", e.payload.size);
  //   prod();
  // });
  // prod();
  

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("another message")
      // const { REQUEST, FETCH, GROUP_JOIN, START_BATCH_PROCESS, END_BATCH_PROCESS} = consumer.events;
      // const consumerEvent = async () => await consumer.on(REQUEST, async (e) => {
      //   if(!idLocker[e.id]){
      //     idLocker[e.id] = true;
      //     bytesTotalConsumer += e.payload.size
      //   } 
      //   // await console.log("Line 48 REQUEST", e.id)
      // //  await consumerEvent();
      // })
      // consumerEvent();

      console.log("consumer total bytes", bytesTotalConsumer)
      
      // await console.log("event object", e)


      // emit total bytes consumed by consumer
      await socket.emit("bytesTotalConsumer", bytesTotalConsumer);

      messagesConsumed.push("message");
      // increment total messages consumed
      totalMessagesConsumed += 1;
      console.log("total msgs consumed", totalMessagesConsumed, "messagesConsumed", messagesConsumed);
      // emit total messages consumed
      await socket.emit("totalMessagesConsumed", totalMessagesConsumed);
      
      // console.log("promise message count", await Promise.all(messagesConsumed))
      // setTimeout(async () => console.log("promise message count", await Promise.all(messagesConsumed)), 10000)
      // console.log("In consumer.run in kafkaController, line 114");
    },
  })
  
  // await admin.disconnect();
  
  return next();
}


module.exports = kafkaController;