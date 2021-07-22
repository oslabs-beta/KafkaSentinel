import React, { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
const { io } = require ('socket.io-client');            

const socket = io("http://localhost:5000");

const LineChart = props => {

  const [totalProducerMessages, setTotalProducerMessages] = useState(0);
  const [producedMessagesTotalSize, setProducedMessagesTotalSize] = useState(0);
  console.log("lineChart body");

  const [bytesTotalConsumer, setBytesTotalConsumer] = useState(0);


  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Size of Consumed Messages",
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
    ]
  });    

  useEffect(() => {
    socket.on("bytesTotalConsumer", consumerData => {

      console.log("hello from line 358", consumerData);

      setBytesTotalConsumer(consumerData);

      let today = new Date();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      let newData = JSON.parse(JSON.stringify(data));

      console.log('newData', newData);

      newData.labels.push(time);
      newData.datasets[0].data.push(bytesTotalConsumer);

      setData(newData);
    });

  })

  

  return(
    <div className="App">
      <Line data={data} />
    </div>
  )
}

export default LineChart;