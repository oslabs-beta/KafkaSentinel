import React, { FC, useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2"
// added
const { io } = require ('socket.io-client');
// import "chartjs-plugin-streaming";


const metricGraph = props => {

  // const { io } = require ('socket.io-client');

  const socket = io("http://localhost:5000");

  let totalMessages = 0;

  useEffect( () => {
    // client-side
    socket.on("total messages", data => {
      totalMessages = data;
    });
  })
  
  // // client-side
  // socket.on("message", data => {
  //   totalProducerBytes = data;
  // });

  return(
    //single metric graph component
    <div>Total Producer Messages: {totalMessages}</div>
  )
}

export default metricGraph;