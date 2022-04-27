import React, { useEffect, useState } from "react";
import { getCpu, getCpuNow, getRam, getRamNow } from "../../services/api";
import '../../styles/style.css'
import { fixedToInt, fixedToIntWithouPercentage, formartDate } from "../../utils/formatters";
import Configuracoes from "../Configuracoes";
import HorizontalCard from "../../components/HorizontalCard";
import VerticalCard from "../../components/VerticalCard";
import MenuDash from "../../components/MenuDash";
import AreaPyce2 from "../../components/AreaPyce2";

export default function Home() {

  const [timeRange, setTimeRange] = useState(168)
  const [isOpen, setIsOpen] = useState(false)
  const [playInterval, setPlayInterval] = useState(true)

  const dateNow = new Date()

  let dateStart = new Date(dateNow)
  dateStart = new Date(dateStart.setHours(dateStart.getHours() - timeRange))

  useEffect(() => {
    console.log(timeRange)
    setPlayInterval(true)
  }, [timeRange])

  return (
    <div>
      <div className="container">
        <div className="justify-content-center">
          <MenuDash
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            playInterval={playInterval}
            setPlayInterval={setPlayInterval}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
          <div>
            {isOpen &&
              <Configuracoes setIsOpen={setIsOpen} isOpen={isOpen} />
            }
          </div>


          <div>
            <AreaPyce2 colorFill={"#15ED48"} />
          </div>
          {/* <div>
            <AreaPyce2 colorFill={"#9357FF"} />
          </div>
          <div>
            <AreaPyce2 colorFill={"#FFF73A"} />
          </div>
          <div>
            <AreaPyce2 colorFill={"#D413AA"} />
          </div> */}


          {/* <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
            <HorizontalCard
              title="Consumo de CPU"
              measure="%"
              isPercentage={false}
              getData={getCpu}
              getDataNow={getCpuNow}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              timeRange={timeRange}
              colorFill={"#15ED48"}
              tickFormatter={fixedToInt}
              domain={[0, 1]}
            />
          </div>

          <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
            <HorizontalCard
              title="Consumo de RAM"
              measure="%"
              isPercentage={true}
              getData={getRam}
              getDataNow={getRamNow}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              timeRange={timeRange}
              colorFill={"#9357FF"}
              tickFormatter={fixedToIntWithouPercentage}
              domain={[0, 100]}
            />
          </div> */}

          {/* <div className="card-group">
            <div className="card me-3 border-0 shadow bg-white rounded p-4">
              <VerticalCard
                title="Consumo de RAM"
                measure="%"
                isPercentage={true}
                getData={getRam}
                getDataNow={getRamNow}
                dateNow={formartDate(dateNow)}
                dateStart={formartDate(dateStart)}
                playInterval={playInterval}
                setPlayInterval={setPlayInterval}
                timeRange={timeRange}
                colorFill={"#9357FF"}
                tickFormatter={fixedToIntWithouPercentage}
                domain={[0, 100]}
              />
            </div>
            <div className="card ms-3 border-0 shadow bg-white rounded p-4">
              <VerticalCard
                title="Consumo de Disco"
                measure="%"
                isPercentage={false}
                getData={getCpu}
                getDataNow={getCpuNow}
                dateNow={formartDate(dateNow)}
                dateStart={formartDate(dateStart)}
                playInterval={playInterval}
                setPlayInterval={setPlayInterval}
                timeRange={timeRange}
                colorFill={"#FFF73A"}
                tickFormatter={fixedToInt}
                domain={[0, 1]}
              />
            </div>
          </div>
          <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
            <HorizontalCard
              title="Tempo de Resposta"
              measure="ms"
              isPercentage={true}
              getData={getCpu}
              getDataNow={getCpuNow}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              timeRange={timeRange}
              colorFill={"#15ED48"}
              tickFormatter={fixedToInt}
              domain={[0, 1]}
            />
          </div>
          <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
            <HorizontalCard
              title="Falhas HTTP"
              measure="/5s"
              isPercentage={true}
              getData={getCpu}
              getDataNow={getCpuNow}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              timeRange={timeRange}
              colorFill={"#D413AA"}
              tickFormatter={fixedToInt}
              domain={[0, 1]}
            />
          </div> */}

          <div className="p-2">

          </div>
        </div>
      </div>
    </div>
  );
}