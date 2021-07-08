const { Kafka } = require('kafkajs');

// 1.Instantiating kafka

const username = 'SJ335XIPE5Q5ZPYS'
const password = 'r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF'


const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

// const { REQUEST } = producer.events;
// const prod = producer.on(REQUEST, async (e) => {
//   const {timestamp, payload } = e;
//   let time = timeStampe.toString();
//   // connect to web socket
//   prod();
// })



// const kafka = new Kafka({
//   clientId: 'npm-slack-notifier',
//   brokers: ['pkc-ep9mm.us-east-2.aws.confluent.cloud:9092'],
//   ssl,
//   sasl
// })

const config = {
  clientId: 'npm-slack-notifier',
  brokers: ['pkc-ep9mm.us-east-2.aws.confluent.cloud:9092'],
  kafka_topic: 'npm-package-published',
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
};

// console.log('Line 31');
const kafka = new Kafka(config);
// 2.Creating Kafka Producer
const producer = kafka.producer();
// console.log('Line 35')
const runProducer = async () => {
  // const message = {
  //   "event":"package:publish",
  //   "package":"@kafkajs/zstd",
  //   "version":"1.0.0",
  //   "hookOwner":{"username":"nevon"},
  //   "payload":{"name":"@kafkajs/zstd"},
  //   "change":{"version":"1.0.0"},
  //   "time":1603444214995
  // }

  const message = { hot : "dog"};
  // 3.Connecting producer to kafka broker.
  console.log("Connecting...")
  await producer.connect()
  console.log("Connected!")

  // const intervalProducerFunc = () => {
  //   setInterval(async function(){ 
  //     await producer.send({
  //       topic: 'bbqchicken',
  //       messages:
  //       [{ value: JSON.stringify(message) }],
  //       })
  //   }, 10000);
  // }
  // intervalProducerFunc();

  function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
  }
  
  const { io } = require ('socket.io-client');

  const socket = io("http://localhost:5000");



  let totalProducerMessages = 0;
  let producedMessagesTotalSize = 0;

  async function dummyProducer() {
    for (let i = 0; i < 15; ++i) {

      const { REQUEST } = producer.events;
      const prod = await producer.on(REQUEST, async (e) => {
        // const {timestamp, payload } = e;
        // let time = timeStamp.toString();
        await console.log("Line 94 event", e);
        // console.log("timestamp", timestamp);
        // console.log("payload", payload);

        // increment total messages
        totalProducerMessages += 1;
        // increase aggregate size of messages by message size
        producedMessagesTotalSize += e.payload.size;
        
        prod();

        await console.log("aggregate message size", producedMessagesTotalSize);
        await console.log("total producer messages:", totalProducerMessages)

        //emit current number of producer messages produced
        await socket.emit("totalProducerMessages", totalProducerMessages);

        // emit total size of produced messages
        await socket.emit("producedMessagesTotalSize", producedMessagesTotalSize);

      })

        await waitforme(3000);
        await console.log(i);
        await producer.send({
          topic: 'npm-package-published',
          messages:
          [{ value: JSON.stringify(message) }],
          })

        
        // const { REQUEST } = producer.events;
        // const prod = await producer.on(REQUEST, async (e) => {
        //   // const {timestamp, payload } = e;
        //   // let time = timeStamp.toString();
        //   await console.log("Line 94 event", e);
        //   // console.log("timestamp", timestamp);
        //   // console.log("payload", payload);

        //   // connect to web socket
        //   prod();
        // })
    }
    console.log("Loop execution finished!");
  }
  
  dummyProducer();

  // for(let i = 0; i < 3; i++){
  //   await producer.send({
  //     topic: 'npm-package-published',
  //     messages:
  //     [{ value: JSON.stringify(message) }],
  //     })
  // }


  // await producer.send({
  // topic: 'npm-package-published',
  // messages:
  // [{ value: JSON.stringify(message) }],
  // })
}

runProducer();