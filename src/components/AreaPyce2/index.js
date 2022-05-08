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
import { getCpuPrediction, getCpuRandom } from "../../services/api";
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

function findIndex(data, key, value) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][key] === value) {
      return i;
    }
  }
}

export default function AreaPyce2(props) {

  const [playInterval, setPlayInterval] = useState(false)
  const [reset, setReset] = useState(true)
  const [countIndex, setCountIndex] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const [data, setData] = useState([])

  useInterval(async () => {
    try {
      let lista = data;
      let res = await getCpuRandom(formartDate(new Date()))
      if (res.data.length > 0) {
        let index = findIndex(data, 'time_series', countIndex);
        for (let x = 0; x < res.data.length; x++) {
          index = index + x + 1
          // console.log(index)
          lista[index] = {
            id: index,
            time_series: lista[index].time_series,
            value: res.data[x].value,
            predict_range: lista[index].predict_range,
            predict_value: lista[index].predict_value
          }
        }
        setData(lista)
        setCountIndex(lista[index].time_series)
      }
    } catch {
      setPlayInterval(false)
      setReset(!reset)
    }
  }, playInterval ? 3000 : null);

  async function getData() {
    try {
      let res = await getCpuPrediction(formartDate(new Date()))
      setData(res.data.data)
      setCountIndex(res.data.last_time_series)
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
      {isLoading &&
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
      {!isLoading &&
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
              domain={[0, 1]}
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
              dot={{ fill: "white" }}
              activeDot={{ stroke: 'black', fill: "white", strokeWidth: 1.5, r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      }
    </>
  )
}