const kafka = require('./kafka')
const { IncomingWebhook } = require('@slack/webhook')
const slack = new IncomingWebhook('https://hooks.slack.com/services/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');


const consumer = kafka.consumer({
  groupId: "group-id"
})

// KAFKA_BOOTSTRAP_SERVER=pkc-ep9mm.us-east-2.aws.confluent.cloud:9092
// API_KEY=SJ335XIPE5Q5ZPYS
// API_PASSWORD=r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF

// KAFKA_USERNAME=SJ335XIPE5Q5ZPYS
// KAFKA_PASSWORD=r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF
// HOOK_SECRET="very-secret-string"

// TOPIC="npm-package-published" 
// GROUP_ID="group-id" 

  // {
  //   "event":"package:publish",
  //   "package":"@kafkajs/zstd",
  //   "version":"1.0.0",
  //   "hookOwner":{"username":"nevon"},
  //   "payload":{"name":"@kafkajs/zstd"},
  //   "change":{"version":"1.0.0"},
  //   "time":1603444214995
  // }

// working consumer config for above slack message

// const main = async () => {
//   await consumer.connect()

//   await consumer.subscribe({
//     topic: "npm-package-published",
//     fromBeginning: true
//   })

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log('Received message', {
//         topic,
//         partition,
//         key: message.key.toString(),
//         // value: message.value.toString()
//         value: JSON.parse(message.value.toString())
//       })

//       // Remember that we need to deserialize the message value back into a Javascript object
//       // by using JSON.parse on the stringified value.
//       const { package, version } = JSON.parse(message.value.toString());

//       const text = `:package: ${package}@${version} released\n<https://www.npmjs.com/package/${package}/v/${version}|Check it out on NPM>`;

//       await slack.send({
//         text,
//         username: 'Package bot',
//       });
//     }
//   })
//   }

//   main().catch(async error => {
//     console.error(error)
//     try {
//       await consumer.disconnect()
//     } catch (e) {
//       console.error('Failed to gracefully disconnect consumer', e)
//     }
//     process.exit(1);
//   })


const main = async () => {
  await consumer.connect()

  await consumer.subscribe({
    topic: "npm-package-published",
    fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received message', {
        topic,
        partition,
        key: message.key.toString(),
        // value: message.value.toString()
        value: JSON.parse(message.value.toString())
      })

      // Remember that we need to deserialize the message value back into a Javascript object
      // by using JSON.parse on the stringified value.
      // const { package, version } = JSON.parse(message.value.toString());

      // const text = `:package: ${package}@${version} released\n<https://www.npmjs.com/package/${package}/v/${version}|Check it out on NPM>`;

      // await slack.send({
      //   text,
      //   username: 'Package bot',
      // });
    }
  })
  }

  main().catch(async error => {
    console.error(error)
    try {
      await consumer.disconnect()
    } catch (e) {
      console.error('Failed to gracefully disconnect consumer', e)
    }
    process.exit(1);
  })