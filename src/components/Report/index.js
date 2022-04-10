import React, { useEffect, useState } from "react";

export default function Report(props) {

  const [growth, setGrowth] = useState(0)
  const [mean, setMean] = useState(0)
  const [higher, setHigher] = useState([])
  const [lower, setLower] = useState([])

  useEffect(() => {
    props.getData(props.dateNow, props.timeRange)
      .then(res => {
        // console.log(res.data)
        setGrowth(res.data.growth)
        setMean(res.data.mean)
        setHigher(res.data.higher)
        setLower(res.data.lower)
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
      <div>
        Cresceu: {Math.round(growth)}
      </div>
      <div>
        Média de Uso: {Math.round(mean)}
      </div>
      <div>
        Picos de Uso:
      </div>
      {higher && higher.map(item =>
        <div>+ {dateFormatter(item.time_series)} - {Math.round(item.value)}</div>
      )}
      {lower && lower.map(item =>
        <div>- {dateFormatter(item.time_series)} - {Math.round(item.value)}</div>
      )}
    </div>
  )

}