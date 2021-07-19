import React, { FC, useState, useEffect } from 'react'
import MetricGraph from '../components/metricGraph'
const { io } = require ('socket.io-client');
import {Line} from 'react-chartjs-2';


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
    //labels: [],
  });

  const options = {
  scales: {
    xAxes: [
      {
        type: "realtime",
        realtime: {
          duration: 20000,
          refresh: 500,
          delay: 1000,
          onRefresh: null,
        },
      },
    ],
  },
  interaction: {
    intersect: false,
  },
  plugins: {
    title: {
      display: true,
      text: "Producer Data Size",
    },
  },
  responsive: true,
  maintainAspectRatio: true,
  elements: {
    line: {
      tension: 0.4,
    },
  },
};

  // const options = {
  //   type: 'realtime',
  //   scales: {
  //     x:
  //       {
  //         type: 'linear',
  //         // time: {
  //         //   unit: 'month'
  //         // },
  //         // realtime: {
  //         //   duration: 20000,
  //         //   refresh: 500,
  //         //   delay: 1000,
  //         //   onRefresh: null,
  //         // }
  //       },
  //   },
  //   interaction: {
  //     intersect: false,
  //   },
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "Producer data total size",
  //     },
  //   },
  //   responsive: true,
  //   maintainAspectRatio: true,
  //   elements: {
  //     line: {
  //       tension: 0.4,
  //     },
  //   },
  // };


  useEffect( () => {

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
      const ourDate = Date.now();
      const dataCopy = JSON.parse(JSON.stringify(data));
      dataCopy.datasets[0].data = [];
      dataCopy.datasets[0].data.push({x: ourDate, y: producerData})
      console.log(ourDate);
      setData(dataCopy)

      console.log(data.datasets[0].data);
   });

  })

  return(
    //displays metrics and graph
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
        <Line options={options} data={data}/>
      </div>
    </div>
  )
}

export default Metrics;