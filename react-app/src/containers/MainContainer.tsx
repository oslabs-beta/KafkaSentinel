import React, { FC, useState, useEffect } from 'react';
import Metrics from './Metrics'
// const { io } = require ('socket.io-client');
// const { Kafka } = require('kafkajs');

const MainContainer = props => {

  useEffect(() => {
    fetch('/getClusterInfo')
      .then(response => response.json())
      .then(data => {
        console.log("completed cluster fetch request. from line 12 on mainContainer", data);
      })
      .catch((err) => {
        console.log(err);
      })
  })

  // const username = 'SJ335XIPE5Q5ZPYS'
  // const password = 'r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF'

  // const sasl = username && password ? { username, password, mechanism: 'plain' } : null
  // const ssl = !!sasl

  // const kafka = new Kafka({
  //   clientId: 'npm-slack-notifier',
  //   brokers: ['pkc-ep9mm.us-east-2.aws.confluent.cloud:9092'],
  //   ssl,
  //   sasl
  // })

  // const admin = kafka.admin();

  // admin.connect();
  // // const socket = io("http://localhost:5000");

  // const describeCluster = admin.describeCluster()
  // const clusterId = describeCluster.clusterId;
  // console.log("clusterID", clusterId);

  return(
    <div>
      <div className="header">
        <h1>KafkaSentinel</h1>
        <h2>Metrics</h2>
      </div>
    <Metrics/>
    </div>
  )
}

export default MainContainer;