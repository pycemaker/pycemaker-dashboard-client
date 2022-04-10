import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from "recharts";


export default function BarPyce(props) {

  const [data, setData] = useState([])

  const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

  useEffect(() => {
    props.getData(props.dateNow, props.timeRange)
      .then(res => {
        setData(res.data.criticity_classification.data)
        console.log(res.data.criticity_classification.data)
      })
      .catch(() => {
        console.log("Algo deu errado!")
      })
  }, [])

  const dateFormatter = date => {
    return new Date(date).toLocaleString();
  };

  return (

    <div>
      <BarChart width={500} height={300} data={data} layout="vertical">
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis
          type="number"
          domain={[0, 100]}
        />
        <YAxis type="category" dataKey="criticity" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8">
        {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
            ))
          }
        </Bar>
      </BarChart>
    </div>
  )
}