import React, { FC, useState } from 'react';
import Header from '../components/header.tsx'
import Metrics from './Metrics.tsx'
import NavBarContainer from './NavBarContainer.tsx'
import CounterBar from '../components/counterBar.tsx'



const MainContainer = props => {
  return(
    <div>
      <div className="header">
        <h1>KafSyrup</h1>
        <Header/>
        <h2>Metrics</h2>
      </div>
    <Metrics/>
    <NavBarContainer/>
    <CounterBar/>
    </div>
  )
}



export default MainContainer;