import React, { useState, useEffect, FC } from "react";
import io from "socket.io-client";
import {
  Container,
  Button,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-streaming";

const data = {
  datasets: [
    {
      label: "Dataset 1",
      borderColor: "rgba(255, 99, 132, 0.5",
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }
  ]
};

const options = {
  scales: {
    xAxes: [
      {
        type: 'realtime',
        realtime: {
          onRefresh: function() {
            data.datasets[0].data.push({
              x: Date.now(),
              y: Math.random() * 1000
            });
          },
          delay: 2000
        }
      }
    ]
  }
};

// const ChartDisplay: FC = ({}) => {
//   const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     main: {
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       alignItems: "center",
//       alignContent: "center",
//       height: "80%"
//     },
//     button: {
//       margin: "1rem 1rem 1rem 1rem",
//     },
//     buttonsContainer: {
//       display: "flex",
//       justifyContent: "center",
//     },
//     wrapper: {
//       display: "flex",
//       flexDirection: "column",
//       justifyItems: "center",
//       alignItems: "center",
//       height: "auto",
//     },
//   })
//   );

//   const [running, setRunning] = useState('DEAD');
//   const [started, setStarted] = useState(false);
//   useEffect(() => {
//     console.log('running')
//     if(started) {
//       fetch('http://localhost:5000/consume');
//     }
//   })

//   const classes = useStyles()


// }

