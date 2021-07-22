import React, { FC, useState, useEffect, Component } from 'react';

const MetricGraph = props => {

  return(
    //single metric graph component
    <div className="metricGraph">
      {props.str}: {props.metric}
    </div>
  )
}

export default MetricGraph;