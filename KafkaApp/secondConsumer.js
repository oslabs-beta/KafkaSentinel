const { Kafka } = require('kafkajs');
const EventEmitter = require('events');

const username = 'SJ335XIPE5Q5ZPYS'
const password = 'r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF'


const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

console.log("username", username)
console.log("password", password)
console.log("ssl", ssl)
console.log("sasl", sasl)

// 1.Instantiating kafka
const kafka = new Kafka({
  clientId: 'npm-slack-notifier',
  brokers: ['pkc-ep9mm.us-east-2.aws.confluent.cloud:9092'],
  ssl,
  sasl
})

//const { REQUEST, FETCH, GROUP_JOIN, START_BATCH_PROCESS} = consumer.events;

// 2.Creating Kafka Consumer and passing group ID.
const consumer = kafka.consumer({ groupId: 'group-id' });
const admin = kafka.admin();



const runConsumer = async () => {
  // 3.Connecting consumer to kafka broker.
  await consumer.connect()
  // 4.Subscribing to a topic in order to receive messages/data.
  await consumer.subscribe({ topic: 'npm-package-published', fromBeginning: true })
  // 5. Sending an action to be handled for each message RECEIVED.


  await admin.connect();

  const { io } = require ('socket.io-client');

  const socket = io("http://localhost:5000");

  // client-side
  // socket.emit("SendMessage", {hot: "dog"});


  const describeCluster = await admin.describeCluster()

  console.log("describe cluster", describeCluster);


  const topicList = await admin.listTopics();

  console.log(topicList);

  const topicMetaData = await admin.fetchTopicMetadata({ topics: topicList })

  console.log("topic MetaData", topicMetaData)

  await topicMetaData.topics.forEach((el,index) => {
    console.log(`Total number of partitions for ${el.name}: ${topicMetaData.topics[index].partitions.length}`)
  })

  const idLocker = {};
  let bytesTotal = 0;


  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      
      const { REQUEST, FETCH, GROUP_JOIN, START_BATCH_PROCESS, END_BATCH_PROCESS} = consumer.events;

      const consumerEvent = async () => await consumer.on(REQUEST, async (e) => {
        
        if(!idLocker[e.id]){
          idLocker[e.id] = true;
          bytesTotal += e.payload.size
        } 
        
        await console.log("event object", e)

        await console.log("Line 48 REQUEST", e.id)
        await console.log("total bytes", bytesTotal)
      })

      await consumerEvent();

      socket.emit("message", {hot: "dog"});
      
      console.log("In eachMessage");
  },
  })

  await admin.disconnect();
}

runConsumer().catch(async error => {
  console.error(error)
  try {
    await consumer.disconnect()
  } catch (e) {
    console.error('Failed to gracefully disconnect consumer', e)
  }
  process.exit(1);
})