import React, { useEffect, useState } from "react";
import './style.css'

export default function Report(props) {

  const [growth, setGrowth] = useState(0)
  const [mean, setMean] = useState(0)
  const [higher, setHigher] = useState([])
  const [lower, setLower] = useState([])
  const [isNoData, setIsNoData] = useState(true)

  useEffect(() => {
    props.getData(props.dateNow, props.timeRange)
      .then(res => {
        // console.log(res.data)
        setGrowth(res.data.growth)
        setMean(res.data.mean)
        setHigher(res.data.higher)
        setLower(res.data.lower)
        // console.log(props.title, res.data)
        setIsNoData(false)
      })
      .catch(() => {
        console.log("Algo deu errado!")
        setIsNoData(true)
      })
  }, [props.timeRange])

  // const dateFormatter = date => {
  //   return new Date(date).toLocaleString();
  // };

  // if (isNoData) {
  //   return (
  //     <div>
  //       No Data
  //     </div>
  //   )
  // }

  return (
    <div>
      <div className="row">
        <div className="col-sm">
          <span className="component_title1">Cresceu</span>
          <br></br>
          {!!growth &&
            <span className="font-bold font-26">{props.isPercentage ? Math.round(growth) : Math.round(growth * 100)}%</span>
          }
          {!growth &&
            <div>
              No Data
            </div>
          }
        </div>
        <div className="col-sm">
          <span className="component_title1">Média de uso</span>
          <br></br>
          {!!mean &&
            <span className="font-bold font-26">{props.isPercentage ? Math.round(mean) : Math.round(mean * 100)}{props.measure}</span>
          }
          {!mean &&
            <div>
              No Data
            </div>
          }
        </div>

        <div className="mt-5">
          <div className="component_title1 mb-2">Picos de Uso</div>
          <div className="pcm-picos">
            {/* {higher && higher.map(item =>
            <div><span style={{ color: "#15ED48", fontSize: "25pt", fontWeight: "bold" }}>+</span> {dateFormatter(item.time_series)} <span className="">{props.isPercentage ? Math.round(item.value) : Math.round(item.value * 100)}{props.measure}</span></div>
          )}
          {lower && lower.map(item =>
            <div><span style={{ color: "#D413AA", fontSize: "25pt", fontWeight: "bold" }}>-</span> {dateFormatter(item.time_series)} <span className="">{props.isPercentage ? Math.round(item.value) : Math.round(item.value * 100)}{props.measure}</span></div>
          )} */}
            <>
              {higher && higher.map(item =>
                <div className="pcm-picos-rows" key={item._id}>
                  <div className="pcm-picos-rows-col-1 plus">+</div>
                  <div className="pcm-picos-rows-col-2">
                    <div className="font-13">{new Date(item.time_series).toLocaleTimeString("pt-BR")}</div>
                    <div>{new Date(item.time_series).toLocaleDateString("pt-BR", { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                  </div>
                  <div className="pcm-picos-rows-col-3">{props.isPercentage ? Math.round(item.value) : Math.round(item.value * 100)}{props.measure}</div>
                  {/* <div className="pcm-picos-rows-col-3 ">320{props.measure}</div> */}
                </div>
              )}
              {lower && lower.map(item =>
                <div className="pcm-picos-rows" key={item._id}>
                  <div className="pcm-picos-rows-col-1 minus">- </div>
                  <div className="pcm-picos-rows-col-2">
                    <div className="font-13">{new Date(item.time_series).toLocaleTimeString("pt-BR")}</div>
                    <div>{new Date(item.time_series).toLocaleDateString("pt-BR", { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                  </div>
                  <div className="pcm-picos-rows-col-3"> {props.isPercentage ? Math.round(item.value) : Math.round(item.value * 100)}{props.measure}</div>
                </div>
              )}
            </>
            {!higher && !lower &&
              <div>
                No Data
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )

}