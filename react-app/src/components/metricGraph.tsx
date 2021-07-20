import React, { FC, useState, useEffect, Component } from 'react';
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2"
import { io } from 'socket.io-client';

const { io } = require ('socket.io-client');

const MetricGraph = props => {

  return(
    //single metric graph component
    <div className="metricGraph">
      {props.str}: {props.metric}
    </div>
  )
}

export default MetricGraph;