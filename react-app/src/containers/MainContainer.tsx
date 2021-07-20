import React, { FC, useState } from 'react';
import Metrics from './Metrics'

const MainContainer = props => {
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