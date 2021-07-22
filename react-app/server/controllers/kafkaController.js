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

  console.log("describe cluster", describeCluster);

  // grab cluster name
  const clusterId = describeCluster.clusterId;
  await socket.emit("clusterId", clusterId);

  // grab number of brokers
  const numOfBrokers = describeCluster.brokers.length;
  await socket.emit("numOfBrokers", numOfBrokers);

  const topicList = await admin.listTopics();

  console.log(topicList);

  const topicMetaData = await admin.fetchTopicMetadata({ topics: topicList })

  console.log("topic MetaData", topicMetaData)

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
    console.log(`Total number of partitions for ${el.name}: ${topicMetaData.topics[index].partitions.length}`)
  })

  // emit object with topicName:topicPartitionQuantity key:value pairs
  await socket.emit("topicListInfoObj", topicListInfoObj);
  // emit total number of topics
  await socket.emit("numOfTopics", numOfTopics);
  // emit total number of partitions
  await socket.emit("totalPartitions", totalPartitions);


  // Start consumer

  








  next();
}

module.exports = kafkaController;