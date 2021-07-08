import React, { FC, useState, useEffect, Component } from 'react';
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2"
import { io } from 'socket.io-client';
//import interval from './chartConfig'; // this file needs to be added to keep interval in global scope
// import './Charts.scss'; //needs to be added with supporting 
// added
const { io } = require ('socket.io-client');
// import "chartjs-plugin-streaming";

// const labels = 0++;
// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'Total Producers'
//     data: //total producer data from websocket
//     fill: false,
//     borderColor: 'rgb(75,192,192)',
//     tension: 0.1
//   }]
// };
// const config = {
//   type: 'line',
//   data,
//   option: {}
// };

const MetricGraph = props => {

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

  return(
    //single metric graph component
    <div className="metricGraph">
      {props.str}: {props.metric}
    </div>
  )
}



class Throughput extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let bytes = 0;
    const socket = io('http://localhost:3030');
    socket.on('log', (data) => {
      data = JSON.parse(data);
      bytes += data.reduce((acc, curr) => acc + curr.requestSize, 0);
    });

    const xAxisLabel = 0;

    const ctx = document.getElementById('myChart').getContext('2d');
    const liveChart = new Chart(ctx, {
      // The type of chart we want to create
      // type: 'bar',
      type: 'line',

      // The data for our dataset
      data: {
        labels: Array(100)
          .fill(0)
          .map((x) => 0),
        datasets: [
          {
            lineTension: 0,
            label: 'live chart',
            backgroundColor: '#09dfdf1c',
            borderColor: '#09dfdf',
            data: Array(100)
              .fill(0)
              .map((x) => 0),
          },
        ],
      },
      // Configuration options go here
      options: {
        elements: {
          point: {
            radius: 0,
          },
        },
        animation: {
          tension: {
            duration: 100,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
          },
        },
        title: {
          display: true,
          text: 'Throughput (KB/second)',
          fontColor: '#09dfdf',
          fontSize: '18',
          fontFamily: 'Lato',
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                min: 0,
                callback(value, index, values) {
                  return `${value} KB`;
                },
                fontColor: '#09dfdf',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: '#09dfdf',
              },
            },
          ],
        },
      },
    });

    function addData(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
      });
      chart.update();
    }
    // adding one point of data
    function removeData(chart) {
      chart.data.labels.shift();
      chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
      });
      chart.update();
    }
    // removing one point of data
    function chartAnimate(chart, label, data) {
      const copy = data;
      addData(chart, label, data);
      removeData(chart);
    }
    // recursion function that calls the packaged "chartAnimate" every "interval"
    // the "interval" is meant to be able to be manipulated easily and has a global scope.
    function randomizeCallout() {
      let time = '';
      const d = new Date();
      time += `${d.getHours()} : `;
      time += `${d.getMinutes()} : `;
      time += d.getSeconds(); // + ' : ';
      const val = bytes / 1000;
      bytes = 0;
      return chartAnimate(liveChart, time, val);
    }
    setInterval(() => {
      randomizeCallout();
    }, interval);
  }

  // rendering the chart in div
  render() {
    return (
      <div className={this.props.className}>
        <div className="chart">
          <canvas id="myChart" />
        </div>
      </div>
    );
  }
}

export default Throughput;

export default MetricGraph;