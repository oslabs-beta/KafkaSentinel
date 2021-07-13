import React, { FC, useState } from 'react';

import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

// const data = {
//   datasets: [
//     {
//       label: 'Produced Message Quantity',
//       borderColor: "rgb(255, 99, 132)",
//       lineTension: 1,
//       fill: false,
//       borderDash: [8, 4], 
//       data: [],
//     },
//   ],
// };

const options = {
  scales: {
    xAxis: [
      {
        type: "linear",
        // realtime: {
        //   duration: 20000,
        //   refresh: 500,
        //   delay: 1000,
        //   onRefresh: null,
        // },
      },
    ],
  },
  interaction: {
    intersect: false,
  },
  plugins: {
    title: {
      display: true,
      text: "Producer data total size",
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

// const dummyData = []


// for(let i = 0; i < 20; i++){
//   data.datasets[0].data.push({
//     x: i,
//     y: Math.random()*1000,
//   });
// }

// console.log(data.datasets[0]);


const LineChart = props => {
  return(
    //bar that holds # of topics and partitions
    <div>
      <div>
        <Line data={props.data} />
      </div>
      {/* <div>
        
      </div> */}
    </div>
  )
}

export default LineChart;

// options={options}

// {/* <canvas id="myChart"></canvas> */}