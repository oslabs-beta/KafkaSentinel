const { Kafka } = require('kafkajs');

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