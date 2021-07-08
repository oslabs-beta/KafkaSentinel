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

import { Line } from "chartjs";
import { Bar } from "chartjs";
import "chartjs-plugin-streaming";



