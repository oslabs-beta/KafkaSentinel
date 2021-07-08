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



