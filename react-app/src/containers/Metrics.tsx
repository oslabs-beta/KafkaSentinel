import React, { FC, useState, useEffect } from 'react';
import MetricGraph from '../components/metricGraph'
const { io } = require ('socket.io-client');
import LineChart from '../components/lineChart'
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";



const Metrics = props => {

  const socket = io("http://localhost:5000");

  const [totalMessagesConsumed, setTotalMessagesConsumed] = useState(0);
  const [clusterId, setClusterId] = useState(0);
  const [numOfBrokers, setNumOfBrokers] = useState(0);
  const [topicListInfoObj, setTopicListInfoObj] = useState(0);
  const [numOfTopics, setNumOfTopics] = useState(0);
  const [totalPartitions, setTotalPartitions] = useState(0);
  const [bytesTotalConsumer, setBytesTotalConsumer] = useState(0);
  const [totalProducerMessages, setTotalProducerMessages] = useState(0);
  const [producedMessagesTotalSize, setProducedMessagesTotalSize] = useState(0);
  const [liveData, setLiveData] = useState(0);
  const [data, setData] = useState({
    datasets: [
      {
        label: 'Produced Message Quantity',
        borderColor: "rgb(255, 99, 132)",
        lineTension: 1,
        fill: false,
        borderDash: [8, 4], 
        data: [],
      },
    ],
  });
  // let totalMessages = 0;

const options = {
  scales: {
    xAxes: [
      {
        type: 'realtime',
        realtime: {
          onRefresh: function() {
            console.log(liveData)
            data.datasets[0].data.push({
              x: Date.now(),
              y: 5 //producer data
            });
          },
          delay: 2000
        }
      }
    ]
  }
};

  // const { io } = require ('socket.io-client');

  // const socket = io("http://localhost:5000");
  // const [messages, setMessages] = useState(0)
  // // let totalMessages = 0;

  // useEffect( () => {
  //   // client-side
  //   socket.on("totalMessagesConsumed", data => {
  //     setMessages(data);
  //   });
  // })
  
  // // client-side
  // socket.on("message", data => {
  //   totalProducerBytes = data;
  // });



  useEffect( () => {

    // console.log(data);

    // client-side
    socket.on("totalMessagesConsumed", data => {
      setTotalMessagesConsumed(data);
    });

    // send name of cluster from confluent
    socket.on("clusterId", data => {
      setClusterId(data);
    });

    // send total number of brokers in cluster
    socket.on("numOfBrokers", data => {
      setNumOfBrokers(data);
    });

    // sending object with topicName:NumOfPartitions key:value pairs
    socket.on("topicListInfoObj", data => {

      // data = {
      //   npm-package-published: 6,
      //   testing: 6
      // }
    
      // take this info object and convert into 
      // Topic Name: PartitionName, Number of Partitions:
      // Topic Name: npm-package-published, Number of Partitions: 6
      // Topic Name: testing, Number of Partitions: 6    

      setTopicListInfoObj(data);
    });

    socket.on("numOfTopics", data => {
      setNumOfTopics(data);
    });

    socket.on("totalPartitions", data => {
      setTotalPartitions(data);
    });

    socket.on("bytesTotalConsumer", data => {
      setBytesTotalConsumer(data);
    });

    // producer sent info

    socket.on("totalProducerMessages", producerData => {
      setTotalProducerMessages(producerData);
    });

    socket.on("producedMessagesTotalSize", producerData => {
      setProducedMessagesTotalSize(producerData);
      const dataCopy = JSON.parse(JSON.stringify(data));
      // dataCopy.datasets[0].data.push({y: producerData})
      
      // setData(dataCopy)
      setLiveData(producedMessagesTotalSize);
      // console.log(data.datasets[0].data);
   });

  })

  return(
    //contains however many metric graphs needed
    <div>
      <div className="metricsContainer">
        <MetricGraph str={"Cluster ID"} metric={clusterId}/>
        <MetricGraph str={"Number of Brokers"} metric={numOfBrokers}/>
        <MetricGraph str={"Total Number of Topics"} metric={numOfTopics}/>
        <MetricGraph str={"Total Partitions"} metric={totalPartitions}/>
        <MetricGraph str={"Total Messages Produced"} metric={totalProducerMessages}/>
        <MetricGraph str={"Total Size of Produced Messages"} metric={`${producedMessagesTotalSize} bytes`}/>
        <MetricGraph str={"Total Messages Consumed"} metric={totalMessagesConsumed}/>
        <MetricGraph str={"Total Size of Consumed Messages"} metric={`${bytesTotalConsumer} bytes`}/>
      </div>
      <div>
        <LineChart data={data} options={options}/>
      </div>
    </div>
  )
}

export default Metrics;