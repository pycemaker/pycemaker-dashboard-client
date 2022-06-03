import React, { useEffect, useState } from "react";
import {
  getCpu,
  getCpuNow,
  getCpuPrediction,
  getCurrentHealth,
  getRam,
  getRamDetailsNow,
  getRamNow,
  getReqCount,
  getReqCountNow,
  getResTime,
  getResTimeNow,
} from "../../services/api";
import {
  bytesToSize,
  fixedToInt,
  fixedToIntWithouPercentage,
  fixedToPercentage,
  formartDate,
  formatPercentage,
  formatTime,
} from "../../utils/formatters";
import Configuracoes from "../../components/modals/Configuracoes";
import MenuDash from "../../components/sections/MenuDash";
import HorizontalCard from "../../components/cards/HorizontalCard";
import HorizontalCard3 from "../../components/cards/HorizontalCard3";
import VerticalCard from "../../components/cards/VerticalCard";
import VerticalCard2 from "../../components/cards/VerticalCard2";
import ZoomChart from "../../components/cards/ZoomChart";
import ZoomChart2 from "../../components/cards/ZoomChart2";
import ZoomChart3 from "../../components/cards/ZoomChart3";
import SystemHealth from "../../components/reports/SystemHealth";

export default function Home() {

  // const [timeRange, setTimeRange] = useState(900)
  const [timeRange, setTimeRange] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [playInterval, setPlayInterval] = useState(true)

  // const dateNow = new Date()

  // let dateStart = new Date(dateNow)
  // dateStart = new Date(dateStart.setHours(dateStart.getHours() - timeRange))

  useEffect(() => {
    // console.log(timeRange)
    setDateNow(new Date())
  }, [timeRange])

  const [dateNow, setDateNow] = useState(new Date())
  let date = new Date(dateNow)
  date = new Date(date.setHours(date.getHours() - timeRange))
  const [dateStart, setDateStart] = useState(date)

  useEffect(() => {
    // console.log(dateStart)
  }, [dateStart])

  useEffect(() => {
    // console.log(dateNow)
    let date = new Date(dateNow)
    date = new Date(date.setHours(date.getHours() - timeRange))
    setDateStart(date)
    setPlayInterval(true)
  }, [dateNow])

  // useEffect(() => {
  // console.log(dateStart)
  // let date = new Date(dateNow)
  // date = new Date(date.setHours(date.getHours() - timeRange))
  // setDateStart(date)
  // }, [])

  if (isOpen) {
    // document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.overflowY = 'hidden';
  } else {
    // document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.overflowY = 'scroll';
  }

  const [showComponent, setShowComponent] = useState(true);
  const [chart, setChart] = useState("");

  return (
    <div>
      {isOpen &&
        <Configuracoes setIsOpen={setIsOpen} isOpen={isOpen} />
      }
      <div className="container pb-5">
        <div className="justify-content-center">

          <MenuDash
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            playInterval={playInterval}
            setPlayInterval={setPlayInterval}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />

          {
            chart === 'cpu' && !showComponent &&
            <ZoomChart2
              title="Consumo de CPU"
              isPercentage={false}
              getDataNow={getCpuPrediction}
              dateNow={formartDate(dateNow)}
              setPlayInterval={setPlayInterval}
              observer={playInterval}
              timeRange={timeRange}
              colorFill={"#15ED48"}
              tickFormatter={fixedToInt}
              // domain={[0, 1]}
              setShowComponent={setShowComponent}
              setDateNow={setDateNow}
            />
          }

          {
            chart === 'ram' && !showComponent &&
            <ZoomChart
              title="Consumo de RAM"
              isPercentage={false}
              getDataNow={getRamNow}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              colorFill={"#9357FF"}
              tickFormatter={fixedToInt}
              tooltipFormatter={formatPercentage}
              domain={[0, 1]}
              setShowComponent={setShowComponent}
            />
          }

          {
            chart === 'responsetime' && !showComponent &&
            <ZoomChart
              title="Tempo de Resposta"
              isPercentage={false}
              getDataNow={getResTimeNow}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              colorFill={"#FFF73A"}
              tickFormatter={formatTime}
              tooltipFormatter={formatTime}
              setShowComponent={setShowComponent}
            />
          }

          {
            chart === 'ramdetails' && !showComponent &&
            <ZoomChart3
              title={"Consumo de RAM (Detalhes)"}
              measure="MB"
              isPercentage={false}
              getDataNow={getRamDetailsNow}
              dataType={["nonheap_value_bytes", "heap_value_bytes"]}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              colorFill={["#D413AA", "#FFF73A"]}
              tickFormatter={bytesToSize}
              tooltipFormatter={bytesToSize}
              setShowComponent={setShowComponent}
            />
          }

          {
            chart === 'requestscount' && !showComponent &&
            <ZoomChart3
              title={"Número de Requisições"}
              measure=""
              isPercentage={true}
              getDataNow={getReqCountNow}
              dataType={["value_fail", "value_success"]}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              colorFill={["#D413AA", "#15ED48"]}
              tickFormatter={fixedToIntWithouPercentage}
              tooltipFormatter={fixedToIntWithouPercentage}
              setShowComponent={setShowComponent}
            />
          }

          {showComponent &&
            <>

              <SystemHealth
                timeRange={timeRange}
                playInterval={playInterval}
              />

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
                  observer={playInterval}
                  setObserver={setPlayInterval}
                  timeRange={timeRange}
                  colorFill={"#15ED48"}
                  tickFormatter={fixedToInt}
                  domain={[0, 1]}
                  chart="cpu"
                  setChart={setChart}
                  showComponent={showComponent}
                  setShowComponent={setShowComponent}
                />
              </div> */}

              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalCard
                  title="Consumo de CPU"
                  isPercentage={false}
                  getData={getCpu}
                  getDataNow={getCpuNow}
                  dateNow={formartDate(dateNow)}
                  dateStart={formartDate(dateStart)}
                  playInterval={playInterval}
                  timeRange={timeRange}
                  colorFill={"#15ED48"}
                  tickFormatter={fixedToInt}
                  tooltipFormatter={formatPercentage}
                  reportFormatter={fixedToPercentage}
                  domain={[0, 1]}
                  chart="cpu"
                  setChart={setChart}
                  setShowComponent={setShowComponent}
                />
              </div>

              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalCard
                  title="Consumo de RAM"
                  isPercentage={false}
                  getData={getRam}
                  getDataNow={getRamNow}
                  dateNow={formartDate(dateNow)}
                  dateStart={formartDate(dateStart)}
                  playInterval={playInterval}
                  timeRange={timeRange}
                  colorFill={"#9357FF"}
                  tickFormatter={fixedToInt}
                  tooltipFormatter={formatPercentage}
                  reportFormatter={fixedToPercentage}
                  domain={[0, 1]}
                  chart="ram"
                  setChart={setChart}
                  setShowComponent={setShowComponent}
                />
              </div>

              {/* <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 gy-5">
                <div className="col">
                  <div className="card h-100 border-0 shadow bg-white rounded p-4">
                    <VerticalCard
                      title="Consumo de RAM"
                      isPercentage={false}
                      getData={getRam}
                      getDataNow={getRamNow}
                      dateNow={formartDate(dateNow)}
                      dateStart={formartDate(dateStart)}
                      playInterval={playInterval}
                      timeRange={timeRange}
                      colorFill={"#9357FF"}
                      tickFormatter={fixedToInt}
                      tooltipFormatter={formatPercentage}
                      reportFormatter={fixedToPercentage}
                      domain={[0, 1]}
                      chart="ram"
                      setChart={setChart}
                      setShowComponent={setShowComponent}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 border-0 shadow bg-white rounded p-4">
                    <VerticalCard2
                      titles={
                        [
                          "Consumo de RAM (Detalhes)",
                          "Consumo Heap",
                          "Consumo Non-Heap"
                        ]
                      }
                      measure=""
                      isPercentage={false}
                      getDataNow={[getRamDetailsNow, getRamDetailsNow, getRamDetailsNow]}
                      dataType={["nonheap_value_bytes", "heap_value_bytes", "nonheap_value_percent", "heap_value_percent"]}
                      dateNow={formartDate(dateNow)}
                      dateStart={formartDate(dateStart)}
                      playInterval={playInterval}
                      colorFill={["#D413AA", "#FFF73A", "#E7E7E7"]}
                      tickFormatter={bytesToSize}
                      tooltipFormatter={bytesToSize}
                      chart="ramdetails"
                      setChart={setChart}
                      setShowComponent={setShowComponent}
                    />
                  </div>
                </div>
              </div> */}

              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalCard3
                  title="Número de Requisições"
                  measure=""
                  isPercentage={true}
                  getData={getReqCount}
                  getDataNow={getReqCountNow}
                  dateNow={formartDate(dateNow)}
                  dateStart={formartDate(dateStart)}
                  dataType={["value_fail", "value_success"]}
                  playInterval={playInterval}
                  setPlayInterval={setPlayInterval}
                  timeRange={timeRange}
                  colorFill={["#D413AA", "#15ED48"]}
                  tickFormatter={fixedToIntWithouPercentage}
                  tooltipFormatter={fixedToIntWithouPercentage}
                  reportFormatter={fixedToIntWithouPercentage}
                  chart="requestscount"
                  setChart={setChart}
                  setShowComponent={setShowComponent}
                />
              </div>

              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalCard
                  title="Tempo de Resposta"
                  isPercentage={false}
                  getData={getResTime}
                  getDataNow={getResTimeNow}
                  dateNow={formartDate(dateNow)}
                  dateStart={formartDate(dateStart)}
                  playInterval={playInterval}
                  timeRange={timeRange}
                  colorFill={"#FFF73A"}
                  tickFormatter={formatTime}
                  tooltipFormatter={formatTime}
                  reportFormatter={formatTime}
                  chart="responsetime"
                  setChart={setChart}
                  setShowComponent={setShowComponent}
                />
              </div>

            </>
          }

        </div>
      </div>
    </div>
  );
}