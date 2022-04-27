import React, { useEffect, useState, FunctionComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  LabelList
} from "recharts";
import { dateFormatter, formatPercentage } from "../../utils/formatters";
// import { format } from "date-fns";


export default function AreaPyce(props) {

  const [data, setData] = useState([])


  function updateArray() {
    if (props.playInterval) {

      props.getDataNow(props.dateStart)
        .then(res => {
          setData(res.data)
          console.log(props.title, res.data)
        })
        .catch(() => {
          console.log("Algo deu errado!")
        })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateArray()
    }, 1000)
    return () => clearInterval(interval);
  }, [props.playInterval])


  // const dateFormatter = date => {
  //   return new Date(date).toLocaleString();
  // };

  // const fixedDeciaml = floatNumber => {
  //   return floatNumber.toFixed(2);
  // }

  const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        // fontSize={11}
        >
          {dateFormatter(payload.value)}
        </text>
      </g>
    );
  };

  const formatter = (value, name, isPercentage) => {
    return [formatPercentage(value, props.isPercentage), name, props]
  }

  return (
    <ResponsiveContainer
      width={props.width}
      height={props.height}
    >
      <AreaChart
        data={data}

        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 50
        }}
      >
        <CartesianGrid strokeDasharray="3" vertical={false} />
        <XAxis

          dataKey="time_series"
          tickFormatter={dateFormatter}
          axisLine={{ stroke: "black", strokeWidth: 1.5 }}
          tickLine={false}
          padding={{ left: 10, right: 10 }}
          tick={<CustomizedAxisTick />}
        />
        <YAxis
          tickFormatter={props.tickFormatter}
          axisLine={false}
          tickLine={false}
          padding={{ bottom: 1 }}
          domain={props.domain} />
        <Tooltip formatter={formatter} labelFormatter={dateFormatter} />
        {/* <ReferenceLine x={refX} stroke="green" label="Min PAGE" /> */}
        {/* <Legend iconType="rect" fill={props.colorFill} stroke={props.colorFill} layout="horizontal" verticalAlign="top" align="right" wrapperStyle={{
            paddingBottom: "20px"
          }} /> */}
        {/* <Legend /> */}
        <Area
          isAnimationActive={false}
          type="monotone"
          dataKey="value"
          stroke="black"
          strokeWidth={1.5}
          fill={props.colorFill}
          fillOpacity={1}
          dot={{ fill: "white" }}
          activeDot={{ stroke: 'black', fill: "white", strokeWidth: 1.5, r: 5 }}
        />

      </AreaChart>
    </ResponsiveContainer>
  );
}