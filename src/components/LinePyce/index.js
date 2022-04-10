import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
// import { format } from "date-fns";


export default function LinePyce(props) {

  const [data, setData] = useState([])

  function updateArray() {
    if (props.playInterval) {

      props.getData(props.dateStart)
        .then(res => {
          setData(res.data)
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


  const dateFormatter = date => {
    return new Date(date).toLocaleString();
  };

  const fixedDeciaml = floatNumber => {
    return floatNumber.toFixed(2);
  }

  const formatter = (value, name, props) => {
    return [fixedDeciaml(value), name, props]
  }

  return (

    <div>
      <div>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time_series"
            tickFormatter={dateFormatter}
          />
          <YAxis tickFormatter={fixedDeciaml} />
          <Tooltip formatter={formatter} />
          {/* <ReferenceLine x={refX} stroke="green" label="Min PAGE" /> */}
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />

        </LineChart>
      </div>

    </div>

  );
}