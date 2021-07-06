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

const runConsumer = async () => {
  // 3.Connecting consumer to kafka broker.
  await consumer.connect()
  // 4.Subscribing to a topic in order to receive messages/data.
  await consumer.subscribe({ topic: 'npm-package-published', fromBeginning: true })
  // 5. Sending an action to be handled for each message RECEIVED.
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      console.log({ "Doing something with the message": topic, partition, message });
      
      const { REQUEST, FETCH, GROUP_JOIN, START_BATCH_PROCESS, END_BATCH_PROCESS} = consumer.events;
      console.log("REQUEST", REQUEST );
      console.log("FETCH", FETCH);
      console.log("GROUP_JOIN", GROUP_JOIN);
      console.log("START_BATCH_PROCESS", START_BATCH_PROCESS);
      console.log("END_BATCH_PROCESS", END_BATCH_PROCESS);

      await consumer.on(REQUEST, async (e) => {
        await console.log("Line 48 REQUEST", e)
      })
  },
  })
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