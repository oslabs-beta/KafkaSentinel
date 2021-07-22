import React, { FC, useState, useEffect } from 'react'
import MetricGraph from '../components/metricGraph'
const { io } = require ('socket.io-client');
import {Line} from 'react-chartjs-2';
import LineChart from '../components/LineChart'



const GRAPH_DATA_BASE = {
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
}

const GRAPH_DATA_BASE_2 = {
  label: 'Produced Message Quantity',
  borderColor: "rgb(255, 99, 132)",
  lineTension: 1,
  fill: false,
  borderDash: [8, 4], 
}


const Metrics = props => {

  const socket = io("http://localhost:5000");

  const [_data, _setData] = useState([]);
  const [_graphData, _setGraphData] = useState(GRAPH_DATA_BASE);

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
      setBytesTotalConsumer(bytesTotalConsumer + data);
    });

    //producer sent info

    socket.on("totalProducerMessages", producerData => {
      setTotalProducerMessages(totalProducerMessages + producerData);
    });

    socket.on("producedMessagesTotalSize", producerData => {
      

      setProducedMessagesTotalSize(producedMessagesTotalSize + producerData);
      
   });

  },[])

  return(
    //contains however many metric graphs needed
    <div>
      <div className="metricsContainer">
        <MetricGraph str={"Cluster ID"} metric={clusterId}/>
        <MetricGraph str={"Number of Brokers"} metric={numOfBrokers}/>
        <MetricGraph str={"Total Number of Topics"} metric={numOfTopics}/>
        <MetricGraph str={"Total Partitions"} metric={totalPartitions}/>
        <MetricGraph str={"Total Messages Consumed"} metric={totalMessagesConsumed}/>
        <MetricGraph str={"Total Size of Consumed Messages"} metric={`${bytesTotalConsumer} bytes`}/>
      </div>
      <div className="LineChart">
        <LineChart/>
      </div>
    </div>
  )
}

export default Metrics;