import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AreaPyce from "../../components/AreaPyce";
import BarPyce from "../../components/BarPyce";
import LinePyce from "../../components/LinePyce";
import Report from "../../components/Report";
import { getCpu, getCpuNow } from "../../services/api";
import '../../styles/style.css'
import { formartDate } from "../../utils/formatters";
import Configuracoes from "../Configuracoes";
import icon from "../../assets/icon.png";
import HorizontalCard from "../../components/HorizontalCard";

export default function Home() {

  const [timeRange, setTimeRange] = useState(168)
  const [isOpen, setIsOpen] = useState(false)
  const [playInterval, setPlayInterval] = useState(true)

  const dateNow = new Date()

  let dateStart = new Date(dateNow)
  dateStart = new Date(dateStart.setHours(dateStart.getHours() - timeRange))

  // function formartDate(date) {
  //   let dformat =
  //     String(date.getDate()).padStart(2, '0') + "-" +
  //     String(date.getMonth() + 1).padStart(2, '0') + "-" +
  //     String(date.getFullYear()) + "-" +
  //     String(date.getHours()).padStart(2, '0') + "-" +
  //     String(date.getMinutes()).padStart(2, '0') + "-" +
  //     String(date.getSeconds()).padStart(2, '0')
  //   return dformat
  // }

  useEffect(() => {
    console.log(timeRange)
    setPlayInterval(true)
  }, [timeRange])



  return (
    <div>
      <div className="container">
        <div className="justify-content-center">
          <div className="display-menu">
            <div className="display-icon">
              <img src={icon} />
              <Link to="/">
                <span>PYCEMAKER</span>
              </Link>
            </div>
            <div className="display-config">
              <div className="me-2 menu-label-size">Analisar o período de: </div>
              <select value={timeRange} onChange={e => { setTimeRange(e.target.value); setPlayInterval(false) }}>
                <option value={6}>6 horas</option>
                <option value={12}>12 horas</option>
                <option value={24}>1 dia</option>
                <option value={120}>5 dias</option>
                <option value={168}>1 semana</option>
              </select>
              <button onClick={() => { setIsOpen(!isOpen) }}>Configurações</button>
              <button onClick={() => setPlayInterval(!playInterval)} >{playInterval ? "Interromper" : "Retomar"}</button>
            </div>
          </div>
          <div>
            {isOpen &&
              <Configuracoes setIsOpen={setIsOpen} isOpen={isOpen} />
            }
          </div>
          <div>
            <HorizontalCard
              getData={getCpu}
              getDataNow={getCpuNow}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              timeRange={timeRange}
              colorFill={"#15ED48"}
            />
          </div>
          {/* 
          <div className="card border-0 shadow mb-5 mt-5 p-4 bg-white rounded">
            <div className="row">
              <div className="col-sm-3">
                <span className="component_title1">Níveis de Consumo</span>
                <BarPyce
                  getData={getCpu}
                  dateNow={formartDate(dateNow)}
                  playInterval={playInterval}
                  setPlayInterval={setPlayInterval}
                  timeRange={timeRange}
                  width="100%"
                  height={250} />
              </div>
              <div className="col-sm-6">
                <span className="component_title1">Consumo de CPU</span>
                <AreaPyce
                  getData={getCpuNow}
                  dateStart={formartDate(dateStart)}
                  playInterval={playInterval}
                  setPlayInterval={setPlayInterval}
                  colorFill={"#15ED48"}
                  width="100%"
                  height={300} />
              </div>
              <div className="col-sm-3">
                <Report
                  getData={getCpu}
                  dateNow={formartDate(dateNow)}
                  playInterval={playInterval}
                  setPlayInterval={setPlayInterval}
                  timeRange={timeRange} />
              </div>
            </div>
          </div>

          <div className="card-group">
            <div className="card me-3 border-0 shadow mb-5 bg-white rounded p-4">
              <span className="component_title1">Consumo de RAM</span>
              <AreaPyce
                getData={getCpuNow}
                dateStart={formartDate(dateStart)}
                playInterval={playInterval}
                setPlayInterval={setPlayInterval}
                colorFill={"#9357FF"}
                width="100%"
                height={270} />
              <div class="row mt-3">
                <div class="col-sm">
                  <span className="component_title1">Níveis de Consumo</span>
                  <BarPyce
                    getData={getCpu}
                    dateNow={formartDate(dateNow)}
                    playInterval={playInterval}
                    setPlayInterval={setPlayInterval}
                    timeRange={timeRange}
                    width="100%"
                    height={250} />
                </div>
                <div class="col-sm">
                  <Report
                    getData={getCpu}
                    dateNow={formartDate(dateNow)}
                    playInterval={playInterval}
                    setPlayInterval={setPlayInterval}
                    timeRange={timeRange} />
                </div>
              </div>
            </div>

            <div className="card ms-3 border-0 shadow mb-5 bg-white rounded p-4">

            </div>
          </div> */}



        </div>
      </div>
    </div>
  );
}