import React, { useEffect, useState, FunctionComponent, useRef } from "react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart
} from "recharts";
import { getCpuNow, getCpuPrediction, getCpuRandom } from "../../services/api";
import { dateFormatter, formartDate, formatPercentage } from "../../utils/formatters";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


export default function AreaPyce2(props) {

  const [playInterval, setPlayInterval] = useState(false)
  const [reset, setReset] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const [data, setData] = useState([])

  useInterval(async () => {
    try {
      let res = await props.getDataNow(props.dateNow, props.timeRange)
      // console.log(res.data)
      setData(res.data)
      if (data[data.length - 1].value !== null && data[data.length - 1].value !== undefined) {
        // console.log("reset")
        props.setDateNow(new Date())
        setPlayInterval(false)
        setReset(!reset)
      }
    } catch {
      setPlayInterval(false)
      setReset(!reset)
    }
  }, playInterval ? 3000 : null);

  async function getData() {
    try {
      let res = await props.getDataNow(props.dateNow, props.timeRange)
      // console.log(res.data)
      // setTimeout(function () {
      setPlayInterval(true)
      // }, 2000);
      setIsLoading(false)
    } catch {
      console.log("Algo deu errado!")
      setIsLoading(true)
    }
  }

  useEffect(() => {
    if (props.observer === true) {
      getData()
    } else {
      setPlayInterval(false)
    }
  }, [props.observer, reset])

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
    if (value.length > 0) {
      let novo = value
      novo = formatPercentage(novo[0], props.isPercentage) + " ~ " + formatPercentage(novo[1], props.isPercentage)
      return [novo, name, props]
    } else {
      return [formatPercentage(value, props.isPercentage), name, props]
    }
  }

  return (
    <>
      {data.length === 0 &&
        <div
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
      }
      {data.length > 0 &&
        <ResponsiveContainer
          width={props.width}
          height={props.height}
        >
          <ComposedChart
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
              padding={{ left: 20, right: 10 }}
              tick={<CustomizedAxisTick />}
            />
            <YAxis
              // tickFormatter={fixedToInt}
              tickFormatter={props.tickFormatter}
              axisLine={false}
              tickLine={false}
              padding={{ bottom: 1 }}
              domain={props.domain}
              allowDataOverflow={true}
              tickCount={props.ticks}
            />
            <Tooltip formatter={formatter} labelFormatter={dateFormatter} />
            <Area
              isAnimationActive={false}
              type=""
              dataKey="predict_range"
              stroke=""
              strokeWidth={1.5}
              fill={props.colorFill}
              fillOpacity={0.4}
              activeDot={false}
            />
            <Line
              isAnimationActive={false}
              type=""
              dataKey="predict_value"
              stroke="blue"
              strokeWidth={1.5}
              dot={false}
              fill={"#15ED48"}
              activeDot={false}
            />
            <Line
              isAnimationActive={false}
              type=""
              dataKey="value"
              stroke="black"
              strokeWidth={1.5}
              fill={"#15ED48"}
              fillOpacity={1}
              dot={false}
              // dot={{ fill: "white" }}
              activeDot={{ stroke: 'black', fill: "white", strokeWidth: 1.5, r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      }
    </>
  )
}