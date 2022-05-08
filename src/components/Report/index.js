import React, { useEffect, useState } from "react";
import './style.css'

export default function Report(props) {

  const [growth, setGrowth] = useState(0)
  const [mean, setMean] = useState(0)
  const [higher, setHigher] = useState([])
  const [lower, setLower] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    props.getData(props.dateNow, props.timeRange)
      .then(res => {
        setGrowth(res.data.growth)
        setMean(res.data.mean)
        setHigher(res.data.higher)
        setLower(res.data.lower)
        // setIsLoading(false)
      })
      .catch(() => {
        console.log("Algo deu errado!")
        // setIsLoading(true)
      })
  }, [props.timeRange])

  return (
    <div>
      <div className="row">
        <div className="col-sm">
          <div className="component_title1 pb-3">Cresceu</div>
          {!!growth &&
            <span className="font-bold font-26">{props.isPercentage ? Math.round(growth) : Math.round(growth * 100)}%</span>
          }
          {!growth &&
            <div style={{ height: "46px" }}>
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
          }
          {/* {!isLoading && !growth &&
            <div className="font-bold font-26 minus background-grey text-center" title="Dados insuficientes">!</div>
          } */}
        </div>
        <div className="col-sm">
          <div className="component_title1 pb-3">Média de uso</div>
          {!!mean &&
            <span className="font-bold font-26">{props.isPercentage ? Math.round(mean) : Math.round(mean * 100)}{props.measure}</span>
          }
          {!mean &&
            <div style={{ height: "46px" }}>
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
          }
          {/* {!isLoading && !mean &&
            <div className="font-bold font-26 minus background-grey text-center">!</div>
          } */}
        </div>
        <div className="mt-5">
          <div className="component_title1 mb-2">Picos de Uso</div>
          {lower.length > 0 && higher.length > 0 &&
            <div className="pcm-picos">
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
            </div>
          }
          {lower.length === 0 && higher.length === 0 &&
            <div
              style={{
                height: "168px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
          }
        </div>
      </div>
    </div >
  )

}