import React, { useEffect, useState, FunctionComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { dateFormatter, formatPercentage } from "../../utils/formatters";

export default function AreaPyce(props) {

  const [data, setData] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  function updateArray() {
    if (props.playInterval) {
      console.log(props.dateStart)
      props.getDataNow(props.dateStart)
        .then(res => {
          setData(res.data)
          // console.log(props.title, res.data)
          // setIsLoading(false)
        })
        .catch(() => {
          console.log("Algo deu errado!")
          // setIsLoading(true)
        })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateArray()
    }, 3000)
    return () => clearInterval(interval);
  }, [props.playInterval])

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
            <Area
              isAnimationActive={false}
              type=""
              dataKey="value"
              stroke="black"
              strokeWidth={1.5}
              fill={props.colorFill}
              fillOpacity={1}
              // dot={{ fill: "white" }}
              activeDot={{ stroke: 'black', fill: "white", strokeWidth: 1.5, r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      }
    </>
  )
}