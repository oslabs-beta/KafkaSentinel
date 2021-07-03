// /**
//  * Initializes the kafka broker using the following arguments passed in from the process environment. The environment values correspond to their respective properties on the Broker constructor.
//  * @param {.ENV string} API_KEY : @key
//  * @param {.ENV string} API_SECRET : @secret
//  * @param {.ENV string} KAFKA_BOOTSTRAP_SERVER : @server
//  */

// const Broker = require('./broker');
// require('dotenv').config();

// const { API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER } = process.env;

// const broker = new Broker(API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER);
// const kafka = broker.create('new-client');

// module.exports = kafka;


const { Kafka } = require('kafkajs')

// KAFKA_BOOTSTRAP_SERVER=pkc-ep9mm.us-east-2.aws.confluent.cloud:9092
// API_KEY=SJ335XIPE5Q5ZPYS
// API_PASSWORD=r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF

// KAFKA_USERNAME=SJ335XIPE5Q5ZPYS
// KAFKA_PASSWORD=r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF
// HOOK_SECRET="very-secret-string"

// TOPIC="npm-package-published" 
// GROUP_ID="group-id" 




// const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env

const username = 'SJ335XIPE5Q5ZPYS'
const password = 'r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF'


const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

console.log("username", username)
console.log("password", password)
console.log("ssl", ssl)
console.log("sasl", sasl)




// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafka = new Kafka({
  clientId: 'npm-slack-notifier',
  brokers: ['pkc-ep9mm.us-east-2.aws.confluent.cloud:9092'],
  ssl,
  sasl
})

module.exports = kafka
