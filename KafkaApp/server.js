// const createHookReceiver = require('npm-hook-receiver')
// const kafka = require('./kafka')

// const producer = kafka.producer()


// const main = async () => {
//   await producer.connect()
//   const server = createHookReceiver({
//     // Secret created when registering the webhook with NPM.
//     // Used to validate the payload. 
//     secret: process.env.HOOK_SECRET,

//     // Path for the handler to be mounted on.
//     mount: '/hook'
//   })

//   server.on('package:publish', async event => {
//     try {
//       const responses = await producer.send({
//         topic: process.env.TOPIC,
//         messages: [{
//           // Name of the published package as key, to make sure that we process events in order
//           key: event.name,
  
//           // The message value is just bytes to Kafka, so we need to serialize our JavaScript
//           // object to a JSON string. Other serialization methods like Avro are available.
//           value: JSON.stringify({
//             package: event.name,
//             version: event.version
//           })
//         }]
//       })
  
//       console.log('Published message', { responses })
//     } catch (error) {
//       console.error('Error publishing message', error)
//     }
//   })

//   server.listen(process.env.PORT || 3000, () => {
//     console.log(`Server listening on port ${process.env.PORT || 3000}`)
//   })
// }

// main().catch(error => {
//   console.error(error)
//   process.exit(1)
// })

// working way to start server
// HOOK_SECRET="super-secret-string" KAFKA_BOOTSTRAP_SERVER="localhost:9092" TOPIC="npm-package-published" KAFKA_USERNAME="SJ335XIPE5Q5ZPYS" KAFKA_PASSWORD="r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF" KAFKA_BOOTSTRAP_SERVER="pkc-ep9mm.us-east-2.aws.confluent.cloud:9092" node server.js

// HOOK_SECRET="super-secret-string" KAFKA_BOOTSTRAP_SERVER="localhost:9092" TOPIC="npm-package-published" node server.js






// KAFKA_BOOTSTRAP_SERVER=pkc-ep9mm.us-east-2.aws.confluent.cloud:9092
// API_KEY=SJ335XIPE5Q5ZPYS
// API_PASSWORD=r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF

// const crypto = require('crypto')
// const hmac = crypto.createHmac('sha256', 'YOUR_SECRET').update('REQUEST_BODY').digest('hex')
// const signature = `sha256=${hmac}`
// console.log(signature);

// KAFKA_BOOTSTRAP_SERVER=pkc-ep9mm.us-east-2.aws.confluent.cloud:9092
// API_KEY=SJ335XIPE5Q5ZPYS
// API_PASSWORD=r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF

// KAFKA_USERNAME=SJ335XIPE5Q5ZPYS
// KAFKA_PASSWORD=r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF
// HOOK_SECRET="very-secret-string"

// TOPIC="npm-package-published" 
// GROUP_ID="group-id" 


const createHookReceiver = require('npm-hook-receiver')
const kafka = require('./kafka')

const producer = kafka.producer()

const main = async () => {
  await producer.connect()
  const server = createHookReceiver({
    // Secret created when registering the webhook with NPM.
    // Used to validate the payload. 
    secret: "very-secret-string",

    // Path for the handler to be mounted on.
    mount: '/hook'
  })

  server.on('package:publish', async event => {
    try {
      const responses = await producer.send({
        topic: "npm-package-published",
        messages: [{
          // Name of the published package as key, to make sure that we process events in order
          key: event.name,
  
          // The message value is just bytes to Kafka, so we need to serialize our JavaScript
          // object to a JSON string. Other serialization methods like Avro are available.
          value: JSON.stringify({
            package: event.name,
            version: event.version
          })
        }]
      })
  
      console.log('Published message', { responses })
    } catch (error) {
      console.error('Error publishing message', error)
    }
  })

  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`)
  })
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})

// curl -XPOST \
//     -H "Content-Type: application/json" \
//     -H "x-npm-signature: sha256=af9688ba91280abf35e4720bf9ae6c9662c55acef800cfcfc40a778bd0cd5c08" \
//     -d '{"event":"package:publish","name":"@kafkajs/zstd","version":"1.0.0","hookOwner":{"username":"nevon"},"payload":{"name":"@kafkajs/zstd"},"change":{"version":"1.0.0"},"time":1603444214995}' \
//     http://localhost:3000/hook

// const crypto = require('crypto')
// const hmac = crypto.createHmac('sha256', 'YOUR_SECRET').update('REQUEST_BODY').digest('hex')
// const signature = `sha256=${hmac}`

// curl -XPOST -H "Content-Type: application/json" -H "x-npm-signature: sha256=af9688ba91280abf35e4720bf9ae6c9662c55acef800cfcfc40a778bd0cd5c08" -d '{"event":"package:publish","name":"@kafkajs/zstd","version":"1.0.0","hookOwner":{"username":"nevon"},"payload":{"name":"@kafkajs/zstd"},"change":{"version":"1.0.0"},"time":1603444214995}' http://localhost:3000/hook