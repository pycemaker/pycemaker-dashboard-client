import React, { useEffect, useState } from "react";
import '../../styles/style.css'
import { dateFormatter } from "../../utils/formatters";

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
        console.log(props.title, res.data)
      })
      .catch(() => {
        console.log("Algo deu errado!")
      })
  }, [props.timeRange])

  // const dateFormatter = date => {
  //   return new Date(date).toLocaleString();
  // };

  return (
    <div>
      <div className="row">
        <div className="col-sm">
          <span className="component_title1">Cresceu</span>
          <br></br>
          <span className="component_percent">{props.isPercentage ? Math.round(growth) : Math.round(growth * 100)}%</span>
        </div>
        <div className="col-sm">
          <span className="component_title1">Média de uso</span>
          <br></br>
          <span className="component_percent">{props.isPercentage ? Math.round(mean) : Math.round(mean * 100)}{props.measure}</span>
        </div>

        <div className="mt-5">
          <span className="component_title1">Picos de Uso</span>
          {higher && higher.map(item =>
            <div><span style={{ color: "#15ED48", fontSize: "25pt", fontWeight: "bold" }}>+</span> {dateFormatter(item.time_series)} <span className="component_percent">{props.isPercentage ? Math.round(item.value) : Math.round(item.value * 100)}{props.measure}</span></div>
          )}
          {lower && lower.map(item =>
            <div><span style={{ color: "#D413AA", fontSize: "25pt", fontWeight: "bold" }}>-</span> {dateFormatter(item.time_series)} <span className="component_percent">{props.isPercentage ? Math.round(item.value) : Math.round(item.value * 100)}{props.measure}</span></div>
          )}
        </div>
      </div>
    </div>
  )

}