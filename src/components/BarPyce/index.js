import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { fixedToInt, formatPercentage } from "../../utils/formatters";

export default function BarPyce(props) {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const barColors = ["#9357FF", "#D513AA", "#15ED48", "#FFF73A"]

  useEffect(() => {
    props.getData(props.dateNow, props.timeRange)
      .then(res => {
        if (res.data.criticity_classification.length > 0) {
          setData(res.data.criticity_classification)
          setIsLoading(false)
        } else {
          setData([])
          setIsLoading(true)
        }
      })
      .catch(() => {
        setIsLoading(true)
        console.log("Algo deu errado!")
      })
  }, [props.timeRange])

  const formatter = (value, name, props) => {
    return [formatPercentage(value, props.isPercentage), name, props]
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
          <BarChart
            data={data} barSize={30}
            layout="vertical"
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis
              tickFormatter={fixedToInt}
              type="number"
              domain={[0, 1]}
              axisLine={false}
              tickLine={false}
              padding={{ left: 1 }}
            />
            <YAxis type="category" dataKey="criticity"
              axisLine={{ stroke: "black", strokeWidth: 1.5 }} tickLine={false} />
            <Tooltip formatter={formatter} />
            <Bar dataKey="value" fill="#8884d8">
              {
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      }
    </>
  )
}