import React, { useEffect, useState } from "react";
import { getCurrentHealth } from "../../../services/api";
import { fixedToPercentage, secondsToDhms } from "../../../utils/formatters";
import './style.css'

export default function SystemHealth(props) {

  const [remainingTime, setRemainingTime] = useState(0)
  const [currentHealth, setCurrentHealth] = useState(0)
  const [predictedCurrentHealth, setPredictCurrentHealth] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  function updateArray() {
    if (props.playInterval) {
      getCurrentHealth(props.timeRange)
        .then(res => {
          setCurrentHealth(res.data.current_health)
          setPredictCurrentHealth(res.data.predicted_current_health)
          if (remainingTime !== res.data.predicted_remaining_time) {
            setRemainingTime(res.data.predicted_remaining_time)
          }
          setIsLoading(false)
        })
        .catch(() => {
          console.log("Algo deu errado!")
        })
    }
  }

  useEffect(() => {
    let tempo = remainingTime
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        tempo = tempo - 1
        let result = secondsToDhms(tempo)
        document.getElementById("tempo").innerHTML = result
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTime])

  useEffect(() => {
    const interval = setInterval(() => {
      updateArray()
    }, 5000)
    return () => clearInterval(interval);
  }, [props.playInterval])

  const LoadingDiv = () => {
    return (
      <div className="position-absolute bottom-0 pb-4 pe-4" >
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className="mt-5">
      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 gy-5">
        <div className="col">
          <div className="row row-cols-2">

            <div className="col">
              <div className="card h-190 border-0 shadow bg-white rounded p-4">
                <div className="font-14 font-family">Saúde Atual do Sistema</div>
                {!isLoading ?
                  <>
                    {currentHealth > 0.3 ?
                      <div className="font-45 font-300 font-family position-absolute bottom-0 pb-4 pe-4">{fixedToPercentage(currentHealth)}</div>
                      :
                      <div className="font-45 font-300 font-red font-family position-absolute bottom-0 pb-4 pe-4">{fixedToPercentage(currentHealth)}</div>
                    }
                  </>
                  :
                  <LoadingDiv />
                }
              </div>

            </div>
            <div className="col">
              <div className="card h-190 border-0 shadow bg-white rounded p-4">
                <div className="font-14 font-family">Previsão da Saúde Atual (média para 1 minuto)</div>
                {!isLoading ?
                  <>
                    {predictedCurrentHealth > 0.3 ?
                      <div className="font-45 font-300 font-family position-absolute bottom-0 pb-4 pe-4">{fixedToPercentage(predictedCurrentHealth)}</div>
                      :
                      <div className="font-45 font-300 font-family font-red position-absolute bottom-0 pb-4 pe-4">{fixedToPercentage(predictedCurrentHealth)}</div>

                    }
                  </>
                  :
                  <LoadingDiv />
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-190 border-0 shadow bg-white rounded p-4">
            <div className="font-14 font-family">Previsão do tempo restante para a Saúde do Sistema<br></br>ser menor que 30%</div>
            {!isLoading ?
              <>
                {remainingTime > 0 && predictedCurrentHealth > 0.3 &&
                  <>
                    <div className="font-45 font-300 font-family position-absolute bottom-0 pb-4" id="tempo"></div>
                  </>
                }
                {remainingTime === 0 && predictedCurrentHealth > 0.3 &&
                  <>
                    <div className="font-22 font-600 font-family position-absolute bottom-0 pb-4 pe-4">A Sáude do Sistema estará estável na(s) próxima(s) {props.timeRange} hora(s)</div>
                  </>
                }
                {remainingTime === 0 && predictedCurrentHealth <= 0.3 &&
                  <>
                    <div className="font-22 font-600 font-family position-absolute bottom-0 pb-4 pe-4">A Sáude do Sistema pode estar instável e falhas podem ocorrer</div>
                  </>
                }
              </>
              :
              <LoadingDiv />
            }
          </div>
        </div>
      </div>
    </div>
  )

}