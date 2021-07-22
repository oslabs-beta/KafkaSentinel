// import React, { FC, useState } from 'react';

// import { Line } from "react-chartjs-2";
// import "chartjs-plugin-streaming";

// // const data = {
// //   datasets: [
// //     {
// //       label: 'Produced Message Quantity',
// //       borderColor: "rgb(255, 99, 132)",
// //       lineTension: 1,
// //       fill: false,
// //       borderDash: [8, 4], 
// //       data: [],
// //     },
// //   ],
// // };

// const options = {
//   scales: {
//     xAxis: [
//       {
//         type: "linear",
//         // realtime: {
//         //   duration: 20000,
//         //   refresh: 500,
//         //   delay: 1000,
//         //   onRefresh: null,
//         // },
//       },
//     ],
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

// // const dummyData = []


// // for(let i = 0; i < 20; i++){
// //   data.datasets[0].data.push({
// //     x: i,
// //     y: Math.random()*1000,
// //   });
// // }

// // console.log(data.datasets[0]);


// const LineChart = props => {
//   return(
//     //bar that holds # of topics and partitions
//     <div>
//       <div>
//         <Line data={props.data} />
//       </div>
//       {/* <div>
        
//       </div> */}
//     </div>
//   )
// }

// export default LineChart;

// // options={options}

// // {/* <canvas id="myChart"></canvas> */}






// class ApexChart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
    
//       series: [{
//         data: data.slice()
//       }],
//       options: {
//         chart: {
//           id: 'realtime',
//           height: 350,
//           type: 'line',
//           animations: {
//             enabled: true,
//             easing: 'linear',
//             dynamicAnimation: {
//               speed: 1000
//             }
//           },
//           toolbar: {
//             show: false
//           },
//           zoom: {
//             enabled: false
//           }
//         },
//         dataLabels: {
//           enabled: false
//         },
//         stroke: {
//           curve: 'smooth'
//         },
//         title: {
//           text: 'Dynamic Updating Chart',
//           align: 'left'
//         },
//         markers: {
//           size: 0
//         },
//         xaxis: {
//           type: 'datetime',
//           range: XAXISRANGE,
//         },
//         yaxis: {
//           max: 100
//         },
//         legend: {
//           show: false
//         },
//       },
    
    
//     };
//   }


//   componentDidMount() {
//     window.setInterval(() => {
//       getNewSeries(lastDate, {
//         min: 10,
//         max: 90
//       })
      
//       ApexCharts.exec('realtime', 'updateSeries', [{
//         data: data
//       }])
//     }, 1000)
//   }


//   render() {
//     return (

//       <div id="chart">
//         <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
//       </div>


//     );
//   }
// }

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);

/* good stuff

import React from "react";
// import "./styles.css";

import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};               

const LineChart = props => {
  return(
    <div className="App">
      <Line data={data} />
    </div>
  )
}
*/



// const data = [];
// const data2 = [];
// let prev = 100;
// let prev2 = 80;
// for (let i = 0; i < 1000; i++) {
//   prev += 5 - Math.random() * 10;
//   data.push({x: i, y: prev});
//   prev2 += 5 - Math.random() * 10;
//   data2.push({x: i, y: prev2});
// }
// // </block:data>

// // <block:animation:1>
// const totalDuration = 10000;
// const delayBetweenPoints = totalDuration / data.length;
// const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
// const animation = {
//   x: {
//     type: 'number',
//     easing: 'linear',
//     duration: delayBetweenPoints,
//     from: NaN, // the point is initially skipped
//     delay(ctx) {
//       if (ctx.type !== 'data' || ctx.xStarted) {
//         return 0;
//       }
//       ctx.xStarted = true;
//       return ctx.index * delayBetweenPoints;
//     }
//   },
//   y: {
//     type: 'number',
//     easing: 'linear',
//     duration: delayBetweenPoints,
//     from: previousY,
//     delay(ctx) {
//       if (ctx.type !== 'data' || ctx.yStarted) {
//         return 0;
//       }
//       ctx.yStarted = true;
//       return ctx.index * delayBetweenPoints;
//     }
//   }
// };
// // </block:animation>

// // <block:config:0>
// const config = {
//   type: 'line',
//   data: {
//     datasets: [{
//       borderColor: '#00FF00',
//       borderWidth: 1,
//       radius: 0,
//       data: data,
//     },
//     {
//       borderColor: '#00FF00',
//       borderWidth: 1,
//       radius: 0,
//       data: data2,
//     }]
//   },
//   options: {
//     animation,
//     interaction: {
//       intersect: false
//     },
//     plugins: {
//       legend: false
//     },
//     scales: {
//       x: {
//         type: 'linear'
//       }
//     }
//   }
// };

// const LineChart = props => {
//   return(
//     <div className="App">
//       <Line data={config} />
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";
// import "./styles.css";

import { Line } from "react-chartjs-2";
const { io } = require ('socket.io-client');

// const data = {
//   labels: [],
//   datasets: [
//     {
//       label: "First dataset",
//       data: [],
//       fill: true,
//       backgroundColor: "rgba(75,192,192,0.2)",
//       borderColor: "rgba(75,192,192,1)"
//     },
//     {
//       label: "Second dataset",
//       data: [33, 25, 35, 51, 54, 76],
//       fill: false,
//       borderColor: "#742774"
//     }
//   ]
// };               

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
      // {
      //   label: "Second dataset",
      //   data: [33, 25, 35, 51, 54, 76],
      //   fill: false,
      //   borderColor: "#742774"
      // }
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


    // socket.on("producedMessagesTotalSize", async producerData => {

    //   // console.log(producerData);

    //   setProducedMessagesTotalSize(producerData);

    //   let today = new Date();
    //   let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    //   let newData = await JSON.parse(JSON.stringify(data));

    //   // console.log('newData', newData);

    //   newData.labels.push(time);
    //   newData.datasets[0].data.push(producedMessagesTotalSize);

    //   setData(newData);
    // });


  })

  

  return(
    <div className="App">
      <Line data={data} />
    </div>
  )
}

export default LineChart;