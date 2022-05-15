import React, { useEffect, useState } from "react";
import { getCpu, getCpuNow, getCpuPrediction, getRam, getRamNow, getRamPrediction, getRequestCount, getRequestCountNow, getRespTime, getRespTimeNow } from "../../services/api";
import { fixedToInt, fixedToIntWithouPercentage, formartDate } from "../../utils/formatters";
import Configuracoes from "../../components/Configuracoes";
import HorizontalCard from "../../components/HorizontalCard";
import MenuDash from "../../components/MenuDash";
import ZoomChart from "../../components/ZoomChart";
import HorizontalCard2 from "../../components/HorizontalCard2";

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
    // setPlayInterval(true)
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

  useEffect(() => {
    // console.log(dateStart)
    // let date = new Date(dateNow)
    // date = new Date(date.setHours(date.getHours() - timeRange))
    // setDateStart(date)
  }, [])


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
            <ZoomChart
              title="Consumo de CPU"
              measure="%"
              isPercentage={false}
              getData={getCpu}
              getDataNow={getCpuPrediction}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              observer={playInterval}
              setObserver={setPlayInterval}
              timeRange={timeRange}
              colorFill={"#15ED48"}
              tickFormatter={fixedToInt}
              // domain={[0, 1]}
              chart="cpu"
              setChart={setChart}
              showComponent={showComponent}
              setShowComponent={setShowComponent}
              setDateNow={setDateNow}
            />
          }


          {
            chart === 'ram' && !showComponent &&
            <ZoomChart
              title="Consumo de RAM"
              measure="%"
              isPercentage={false}
              getData={getRam}
              getDataNow={getRamPrediction}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              observer={playInterval}
              setObserver={setPlayInterval}
              timeRange={timeRange}
              colorFill={"#9357FF"}
              tickFormatter={fixedToInt}
              // domain={[0, 100]}
              chart="ram"
              setChart={setChart}
              showComponent={showComponent}
              setShowComponent={setShowComponent}
              setDateNow={setDateNow}
            />
          }


          {/* {
            chart === 'ramdetails' && !showComponent &&
            <ZoomChart2
              titles={
                [
                  "Consumo de RAM (Detalhes)",
                  "Consumo Heap",
                  "Consumo Non-Heap"
                ]
              }
              measure="%"
              // getData={getRamDetails}
              getDataNow={getRamDetailsNow}
              // dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              // observer={playInterval}
              // setObserver={setPlayInterval}
              // timeRange={timeRange}
              colorFill={["#D413AA", "#FFF73A"]}
              tickFormatter={formatToMegabytes}
              chart="ramdetails"
              setChart={setChart}
              // showComponent={showComponent}
              setShowComponent={setShowComponent}
              setDateNow={setDateNow}
            />
          } */}


          {
            chart === 'responsetime' && !showComponent &&
            <ZoomChart
              title="Tempo de Resposta"
              measure="s"
              isPercentage={true}
              getData={getCpu}
              getDataNow={getCpuNow}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              observer={playInterval}
              setObserver={setPlayInterval}
              timeRange={timeRange}
              colorFill={"#FFF73A"}
              tickFormatter={fixedToIntWithouPercentage}
              // domain={[0, 1]}
              chart="responsetime"
              setChart={setChart}
              showComponent={showComponent}
              setShowComponent={setShowComponent}
              setDateNow={setDateNow}
            />
          }


          {
            chart === 'requestscount' && !showComponent &&
            <ZoomChart
              title="Número de Requisições"
              measure=""
              isPercentage={true}
              getData={getCpu}
              getDataNow={getCpuNow}
              dateNow={formartDate(dateNow)}
              dateStart={formartDate(dateStart)}
              playInterval={playInterval}
              setPlayInterval={setPlayInterval}
              observer={playInterval}
              setObserver={setPlayInterval}
              timeRange={timeRange}
              colorFill={"#D413AA"}
              tickFormatter={fixedToIntWithouPercentage}
              // domain={[0, 1]}
              chart="requestscount"
              setChart={setChart}
              showComponent={showComponent}
              setShowComponent={setShowComponent}
              setDateNow={setDateNow}
            />
          }


          {showComponent &&
            <>

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
                <HorizontalCard2
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
                  // domain={[0, 1]}
                  chart="cpu"
                  setChart={setChart}
                  showComponent={showComponent}
                  setShowComponent={setShowComponent}
                />
              </div>

              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalCard2
                  title="Consumo de RAM"
                  measure="%"
                  isPercentage={false}
                  getData={getRam}
                  getDataNow={getRamNow}
                  dateNow={formartDate(dateNow)}
                  dateStart={formartDate(dateStart)}
                  playInterval={playInterval}
                  setPlayInterval={setPlayInterval}
                  observer={playInterval}
                  setObserver={setPlayInterval}
                  timeRange={timeRange}
                  colorFill={"#9357FF"}
                  tickFormatter={fixedToInt}
                  // domain={[0, 100]}
                  chart="ram"
                  setChart={setChart}
                  showComponent={showComponent}
                  setShowComponent={setShowComponent}
                />
              </div>

              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalCard2
                  title="Tempo de Resposta"
                  measure="s"
                  isPercentage={true}
                  getData={getRespTime}
                  getDataNow={getRespTimeNow}
                  dateNow={formartDate(dateNow)}
                  dateStart={formartDate(dateStart)}
                  playInterval={playInterval}
                  setPlayInterval={setPlayInterval}
                  observer={playInterval}
                  setObserver={setPlayInterval}
                  timeRange={timeRange}
                  colorFill={"#FFF73A"}
                  tickFormatter={fixedToIntWithouPercentage}
                  // domain={[0, 1]}
                  chart="responsetime"
                  setChart={setChart}
                  showComponent={showComponent}
                  setShowComponent={setShowComponent}
                />
              </div>

              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalCard2
                  title="Número de Requisições"
                  measure=""
                  isPercentage={true}
                  getData={getRequestCount}
                  getDataNow={getRequestCountNow}
                  dateNow={formartDate(dateNow)}
                  dateStart={formartDate(dateStart)}
                  playInterval={playInterval}
                  setPlayInterval={setPlayInterval}
                  observer={playInterval}
                  setObserver={setPlayInterval}
                  timeRange={timeRange}
                  colorFill={"#D413AA"}
                  tickFormatter={fixedToIntWithouPercentage}
                  // domain={[0, 1]}
                  chart="requestscount"
                  setChart={setChart}
                  showComponent={showComponent}
                  setShowComponent={setShowComponent}
                />
              </div>

              {/* <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 gy-5">
                <div className="col">
                  <div className="card h-100 border-0 shadow bg-white rounded p-4">
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
                      observer={playInterval}
                      setObserver={setPlayInterval}
                      timeRange={timeRange}
                      colorFill={"#9357FF"}
                      tickFormatter={fixedToInt}
                      domain={[0, 100]}
                      chart="ram"
                      setChart={setChart}
                      showComponent={showComponent}
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
                      measure="MB"
                      // getData={getRamDetails}
                      getDataNow={[getRamDetailsNow, getHeapNow, getNonheapNow]}
                      // dateNow={formartDate(dateNow)}
                      dateStart={formartDate(dateStart)}
                      playInterval={playInterval}
                      setPlayInterval={setPlayInterval}
                      // observer={playInterval}
                      // setObserver={setPlayInterval}
                      // timeRange={timeRange}
                      colorFill={["#D413AA", "#FFF73A", "#E7E7E7"]}
                      tickFormatter={formatToMegabytes}
                      chart="ramdetails"
                      setChart={setChart}
                      // showComponent={showComponent}
                      setShowComponent={setShowComponent}
                    />
                  </div>
                </div>
              </div> */}

            </>
          }

        </div>
      </div>
    </div>
  );
}