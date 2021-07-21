import React, { FC, useState, useEffect } from 'react'
import MetricGraph from '../components/metricGraph'
const { io } = require ('socket.io-client');
import {Line} from 'react-chartjs-2';
import "chartjs-plugin-streaming";


// const GRAPH_DATA_BASE = {
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
// }

// const GRAPH_DATA_BASE_2 = {
//   label: 'Produced Message Quantity',
//   borderColor: "rgb(255, 99, 132)",
//   lineTension: 1,
//   fill: false,
//   borderDash: [8, 4], 
// }


const Metrics = props => {
  const socket = io("http://localhost:5000");


  // const [_data, _setData] = useState([]);
  // const [_graphData, _setGraphData] = useState(GRAPH_DATA_BASE);

  const [totalMessagesConsumed, setTotalMessagesConsumed] = useState(0);
  const [clusterId, setClusterId] = useState(0);
  const [numOfBrokers, setNumOfBrokers] = useState(0);
  const [topicListInfoObj, setTopicListInfoObj] = useState(0);
  const [numOfTopics, setNumOfTopics] = useState(0);
  const [totalPartitions, setTotalPartitions] = useState(0);
  const [bytesTotalConsumer, setBytesTotalConsumer] = useState(0);
  const [totalProducerMessages, setTotalProducerMessages] = useState(0);
  //const [producedMessagesTotalSize, setProducedMessagesTotalSize] = useState(0);
  //const [liveData, setLiveData] = useState(0);
  // const [data, setData] = useState({
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
  //   //labels: [],
  // });

//   const options = {
//   scales: {
//     xAxes: [
//       {
//         type: "realtime",
//         realtime: {
//           duration: 20000,
//           refresh: 500,
//           delay: 1000,
//           onRefresh: null,
//         },
//       },
//     ],
//   },
//   interaction: {
//     intersect: false,
//   },
//   plugins: {
//     title: {
//       display: true,
//       text: "Producer Data Size",
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


  // Proposal one: disconnect from sockets but run useEffect over and over again. 

  //   useEffect( () => {

  //   // client-side
  //   socket.on("totalMessagesConsumed", data => {
  //     setTotalMessagesConsumed(data);
  //   });

  //   // send name of cluster from confluent
  //   socket.on("clusterId", data => {
  //     setClusterId(data);
  //   });

  //   // send total number of brokers in cluster
  //   socket.on("numOfBrokers", data => {
  //     setNumOfBrokers(data);
  //   });

  //   // sending object with topicName:NumOfPartitions key:value pairs
  //   socket.on("topicListInfoObj", data => {
  //     setTopicListInfoObj(data);
  //   });

  //   socket.on("numOfTopics", data => {
  //     setNumOfTopics(data);
  //   });

  //   socket.on("totalPartitions", data => {
  //     setTotalPartitions(data);
  //   });

  //   socket.on("bytesTotalConsumer", data => {
  //     setBytesTotalConsumer(data);
  //   });

  //   // producer sent info

  //   socket.on("totalProducerMessages", producerData => {
  //     setTotalProducerMessages(producerData);
  //   });

  //   socket.on("producedMessagesTotalSize", producerData => {
  //     console.log('_data before adding new message: ', _data);

  //     setProducedMessagesTotalSize(producerData);
  //     const ourDate = Date.now()
  //     const datum = {
  //       x: ourDate,
  //       y: producerData,
  //     };

  //     _setData([
  //       ..._data,
  //       datum
  //     ]);

  //     console.log('Datum: ', datum);
  //     console.log('_data: ', _data);

  //     // const dataCopy = JSON.parse(JSON.stringify(data));
  //     //dataCopy.datasets[0].data = [];
  //     // console.log(dataCopy.datasets[0].data);
  //     // dataCopy.datasets[0].data.push({x: ourDate, y: producerData})
  //     // console.log(ourDate);
  //     // setData(dataCopy)

  //     // console.log(data.datasets[0].data);
  //  });
   
  //  return () => socket.disconnect();
  // })

/*
  // Proposal 2: run useEffect every time data updates
    useEffect( () => {
      const socket = io("http://localhost:5000");
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
      console.log('_data before adding new message: ', _data);

      setProducedMessagesTotalSize(producerData);
      const ourDate = Date.now()
      const datum = {
        x: ourDate,
        y: producerData,
      };

      console.log('PreDatum: ', datum);
      console.log('Pre_data: ', _data);

      _setData([
        ..._data,
        datum
      ]);
     // console.log(_data);

      _setGraphData({
        datasets: [
          {
            ...GRAPH_DATA_BASE_2,
            data: _data,
          }
        ]
      })
      console.log(_graphData);

      console.log('Datum: ', datum);
      console.log('_data: ', _data);

      // const dataCopy = JSON.parse(JSON.stringify(data));
      // dataCopy.datasets[0].data = [];
      // console.log(dataCopy.datasets[0].data);
      // dataCopy.datasets[0].data.push(datum)
      // console.log(ourDate);
      // setData(dataCopy)

      // console.log(data.datasets[0].data);
   });

   return () => socket.disconnect();
  }, [_data])
*/
  // Proposal 3: mess around with moving sockets outside of your useEffect and see what works/doesn't. 


// Proposal 4: add state updating logic to a separate function

/*
const updateDataFromSocket = producerData => _setData([...data, producerData])

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
      console.log('_data before adding new message: ', _data);

      setProducedMessagesTotalSize(producerData);
      const ourDate = Date.now()
      const datum = {
        x: ourDate,
        y: producerData,
      };

      updateDataFromSocket(datum);

      // const dataCopy = JSON.parse(JSON.stringify(data));
      //dataCopy.datasets[0].data = [];
      // console.log(dataCopy.datasets[0].data);
      // dataCopy.datasets[0].data.push({x: ourDate, y: producerData})
      // console.log(ourDate);
      // setData(dataCopy)

      // console.log(data.datasets[0].data);
   });

  },[])

*/

// Proposal 5: similar to 4
/*

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
      console.log('_data before adding new message: ', _data);

      setProducedMessagesTotalSize(producerData);
      const ourDate = Date.now()
      const datum = {
        x: ourDate,
        y: producerData,
      };

      _setData(oldData => [...oldData, datum])

      // const dataCopy = JSON.parse(JSON.stringify(data));
      //dataCopy.datasets[0].data = [];
      // console.log(dataCopy.datasets[0].data);
      // dataCopy.datasets[0].data.push({x: ourDate, y: producerData})
      // console.log(ourDate);
      // setData(dataCopy)

      // console.log(data.datasets[0].data);
   });

  },[])

*/

  useEffect( () => {

    console.log(`useEffect: Snap`);

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
  }, []);

  //   socket.on("producedMessagesTotalSize", producerData => {
  //     console.log(`data before push: ${data}`);
  //     producerData += producerData;

  //     //setProducedMessagesTotalSize(producerData);
  //     //let time = '';
  //     const d = Date.now()
  //     //time += d.getSeconds()+" "+d.getMilliseconds();
  //     const datum = {
  //       x: d,
  //       y: producerData,
  //     };

  //     // _setData([
  //     //   ..._data,
  //     //   datum
  //     // ]);

  //     console.log('Datum: ', datum);
  //     //console.log('_data: ', _data);

  //    // const dataCopy = JSON.parse(JSON.stringify(_data));
  //     // dataCopy.datasets[0].data = [];
  //     //console.log(dataCopy.datasets[0].data);
  //     data.datasets[0].data.push(datum);
  //     //console.log(datum);
  //     //setData(dataCopy)
  //     console.log(`Data after push: ${data}`);
  //  });

  const data = {
    datasets: [
      {
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        //backgroundColor: "",
        lineTension: 1,
        cubicInterpolationMode: "monotone",
        fill: true,
        // borderDash: [8, 4],
        data: [{x: 230495820356, y: 1543},{x: 230495821356, y: 1743},{x: 230495822356, y: 1843},{x: 230495823356, y: 1143},{x: 230495824356, y: 543},{x: 230495825356, y: 1343},{x: 230495826356, y: 1223},{x: 230495827356, y: 1345}],
      },
    ],
    labels: [],
  };

   const socket2 = io("http://localhost:5000", {
    transports: ["websocket"],
    upgrade: false,
  });

  // socket2.on("producedMessagesTotalSize", (msg) => {
  //   //console.log(`socket2: Crackle`)
  //   let objMsg = JSON.parse(msg);
    
  //   console.log(`objMsg: ${objMsg}`)
  //   //console.log(`objMsgSize: ${objMsg.size}`)
    
  //   // data.datasets[0].data.push({
  //   //   x: Date.now(),
  //   //   y: objMsg,
  //   // });
  //   console.log(JSON.parse(JSON.stringify(data)));
  //   //console.log(`data: ${data.datasets[0].data}`)
  //   // counter++;
  //   // console.log(`counter: ${counter}`);
  // });

   const options = {
    scales: {
      xAxes: [
        {
          type: "linear",
          // realtime: {
          //   duration: 20000,
          //   refresh: 500,
          //   delay: 500,
          //   onRefresh: null,
          // },
        },
      ],
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      streaming: {
        duration: 20000
      },
      title: {
        display: true,
        text: "Total Produced Messages",
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

 //console.log(`final log: ${data}`);
 //console.log(`insideChartOptions: Pop`)
  return(
    //displays metrics and graph
    <div>
      <div className="metricsContainer">
        <MetricGraph str={"Cluster ID"} metric={clusterId}/>
        <MetricGraph str={"Number of Brokers"} metric={numOfBrokers}/>
        <MetricGraph str={"Total Number of Topics"} metric={numOfTopics}/>
        <MetricGraph str={"Total Partitions"} metric={totalPartitions}/>
        <MetricGraph str={"Total Messages Produced"} metric={totalProducerMessages}/>
        <MetricGraph str={"Total Messages Consumed"} metric={totalMessagesConsumed}/>
        <MetricGraph str={"Total Size of Consumed Messages"} metric={`${bytesTotalConsumer} bytes`}/>
      </div>
      <div>
        <Line data={data} options={options} />
        {/* <Line options={options} data={data}/> */}
      </div>
    </div>
  )
}

export default Metrics;