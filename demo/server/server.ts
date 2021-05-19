require('dotenv').config();
const { Kafka } = require('kafkajs');

class KafkaClientFactory {
  kafka: any;

  constructor(brokers, apiKey, apiSecret, clientId) {
    console.log(brokers);
    this.kafka = this.start(brokers, apiKey, apiSecret, clientId);
  }

  async consume(topic, groupId) {
    const consumer = this.kafka.consumer({ groupId });

    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      },
    });
  }

  /**
   *
   * @param {*} topic the client's Kafka topic
   * @param {*} messages an array of Kafka message objects
   */
  produce(topic, messages) {
    const producer = this.kafka.producer();
    producer.connect().then(() => {
      producer.send({ topic, messages });
    });
  }

  start(brokers, apiKey, apiSecret, clientId) {
    const sasl =
      API_KEY && API_SECRET
        ? { username: apiKey, password: apiSecret, mechanism: 'plain' }
        : null;
    const ssl = !!sasl;

    return new Kafka({
      clientId,
      brokers,
      ssl,
      sasl,
    });
  }
}

module.exports = KafkaClientFactory;

// --- testing ---
const { API_KEY, API_SECRET, KAFKA_SERVER_URL, TOPIC } = process.env;
const kafka = new KafkaClientFactory([KAFKA_SERVER_URL], API_KEY, API_SECRET, 'client-id');

// kafka.produce(TOPIC, [{ value: 'this is a truck message ;)' }]);

setInterval(
  () => kafka.produce(TOPIC, [{ value: Math.floor(Math.random() * 9).toString() }]),
  1000
);

kafka.consume(TOPIC, 'truck-group');


// // const app = require('./app');
// require("dotenv").config();
// const server = require("http").createServer();
// const os = require("os-utils");
// // const Kafka = require("kafkajs");
// // const Confluent = require('../../kafka-socks/Confluent');
// import Confluent from "./../../kafka-socks/Confluent";

// console.log(Confluent);
// const io = require("socket.io")(server, {
//   transports: ["websocket", "polling"],
// });

// // build out the producer
// // instantiate our library
// // use the kafkasocks object to consume from producer
// // and send to front end

// //////////////////////////////////////////* Starting Producer Logic */////////////////////////////
// const { API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER, TOPIC } = process.env;
// const kafka = (new Confluent(API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER)).create(
//   "Client_ID"
// );

// let idx = 0;
// // produer
// // every second, produce a random # between 0 and 9
// const produce = (kafka) => {
//   console.log("starting the producer connection");
//   const producer = kafka.producer();
//   producer
//     .connect()
//     .then(()=> console.log('Connected to producer'))
//     .then(() => {
//       producer.send({
//         topic: TOPIC,
//         messages: [
//           {
//             key: String(idx),
//             value: Math.floor(Math.random() * 9).toString(),
//           },
//         ],
//       });
//       idx++;
//     })
//     .catch((err) => {
//       console.log("error in produce function", err);
//     });
// };

// produce(kafka);

// ///////////////////////////////////////////////////////////////////////////////////////////////////

// let tick = 0;

// // 1. listen for socket connections
// io.on("connection", (client) => {
//   setInterval(() => {
//     // 2. every second, emit a 'cpu' event to user
//     os.cpuUsage((cpuPercent) => {
//       client.emit("cpu", {
//         name: tick++,
//         value: cpuPercent,
//       });
//     });
//   }, 1000);
// });

// // // 1. listen for socket connections
// //   io.on('connection', client => {
// //     setInterval(() => {
// //       // 2. every second, emit a 'cpu' event to user
// //       os.cpuUsage(cpuPercent => {
// //         client.emit('cpu', {
// //           name: tick++,
// //           value: cpuPercent
// //         });
// //       });
// //     }, 1000);
// //   });

// // app.listen(PORT, () => {
// //     console.log(`Server listening on port ${PORT}`);
// // });
// server.listen(3333);
