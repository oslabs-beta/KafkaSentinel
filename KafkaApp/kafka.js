const { Kafka } = require('kafkajs')

// const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env

//directly using our username and password (should break out of env instead as per line 3 example)
const username = 'SJ335XIPE5Q5ZPYS'
const password = 'r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF'

//passes security information
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

// console.log("username", username)
// console.log("password", password)
// console.log("ssl", ssl)
// console.log("sasl", sasl)


// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafka = new Kafka({
  clientId: 'npm-slack-notifier',
  brokers: ['pkc-ep9mm.us-east-2.aws.confluent.cloud:9092'],
  ssl,
  sasl
})

module.exports = kafka
