import React, { FC, useState, useEffect } from 'react';
import Metrics from './Metrics'
// const image = require( "../assets/KafkaSentinelLogo.jpg")

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
  }, [])



  return(
    <div>
      <div className="header">
        <div>
          <img className="logo" src='https://i.imgur.com/dso31sS.png'/>
        </div>
        {/* <h1>KafkaSentinel</h1> */}
        <h2>Metrics</h2>
      </div>
    <Metrics/>
    </div>
  )
}

export default MainContainer;