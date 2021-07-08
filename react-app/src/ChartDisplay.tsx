import React { useState, useEffect, FC } from "react";
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
import { useEffect } from "react";

const ChartDisplay: FC = ({}) => {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      alignContent: "center",
      height: "80%"
    },
    button: {
      margin: "1rem 1rem 1rem 1rem",
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "center",
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      height: "auto",
    },
  })
  );
  useEffect(() => {
    console.log('running')
  })



}

