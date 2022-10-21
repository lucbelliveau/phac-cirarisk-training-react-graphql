import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time: Date, amount?: number) {
  return {
    time: time.toLocaleDateString("en-ca", { year: "numeric", month: "short" }),
    amount,
  };
}

const today = new Date();

const data = [
  createData(today, undefined),
  createData(new Date(today.setMonth(today.getMonth() - 1)), 2400),
  createData(new Date(today.setMonth(today.getMonth() - 1)), 2400),
  createData(new Date(today.setMonth(today.getMonth() - 1)), 2000),
  createData(new Date(today.setMonth(today.getMonth() - 1)), 2000),
  createData(new Date(today.setMonth(today.getMonth() - 1)), 1500),
  createData(new Date(today.setMonth(today.getMonth() - 1)), 800),
  createData(new Date(today.setMonth(today.getMonth() - 1)), 600),
  createData(new Date(today.setMonth(today.getMonth() - 1)), 300),
].reverse();

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Signals</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Signals (#)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
