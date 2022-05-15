import React, { useEffect, useState } from "react";
import { getCpu, getCpuNow, getRam, getRamNow } from "../../services/api";
import { fixedToInt, formartDate } from "../../utils/formatters";
import Configuracoes from "../../components/Configuracoes";
import HorizontalCard from "../../components/HorizontalCard";
import VerticalCard from "../../components/VerticalCard";
import MenuDash from "../../components/MenuDash";
import ZoomChart from "../../components/ZoomChart";

export default function Home() {

  const [timeRange, setTimeRange] = useState(168)
  const [isOpen, setIsOpen] = useState(false)
  const [playInterval, setPlayInterval] = useState(true)

  const dateNow = new Date()

  let dateStart = new Date(dateNow)
  dateStart = new Date(dateStart.setHours(dateStart.getHours() - timeRange))

  useEffect(() => {
    // console.log(timeRange)
    setPlayInterval(true)
  }, [timeRange])


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

  // const wrapHOC = (WrappedComponent) => (props) => (
  //   <div>
  //     <div>header</div>
  //     <div><WrappedComponent {...props} /></div>
  //     <div>footer</div>
  //   </div>
  // )


  // const App = () => <div>Hello</div>;


  // const WrappedApp = wrapHOC(App);


  const cpuProps = (Cpu) => () => (
    <Cpu
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
  )

  const ramProps = (Ram) => () => (
    <Ram
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
      domain={[0, 100]}
      chart="ram"
      setChart={setChart}
      showComponent={showComponent}
      setShowComponent={setShowComponent}
    />
  )

  const responseTimeProps = (ResponseTime) => () => (
    <ResponseTime
      title="Tempo de Resposta"
      measure="ms"
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
      colorFill={"#15ED48"}
      tickFormatter={fixedToInt}
      domain={[0, 1]}
      chart="responsetime"
      setChart={setChart}
      showComponent={showComponent}
      setShowComponent={setShowComponent}
    />
  )

  const requestsCountProps = (RequestsCount) => () => (
    <RequestsCount
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
      tickFormatter={fixedToInt}
      domain={[0, 1]}
      chart="requestscount"
      setChart={setChart}
      showComponent={showComponent}
      setShowComponent={setShowComponent}
    />
  )

  const Cpu = cpuProps(ZoomChart)
  const Ram = ramProps(ZoomChart)
  const ResponseTime = responseTimeProps(ZoomChart)
  const RequestsCount = requestsCountProps(ZoomChart)
  const HorizontalCpu = cpuProps(HorizontalCard)
  const VerticalRam = ramProps(VerticalCard)
  const VerticalRamDetails = ramProps(VerticalCard) // corrigir
  const HorizontalResponseTime = responseTimeProps(HorizontalCard)
  const HorizontalRequestsCount = requestsCountProps(HorizontalCard)

  return (
    <div>
      {isOpen &&
        <Configuracoes setIsOpen={setIsOpen} isOpen={isOpen} />
      }
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



          {
            chart === 'cpu' && !showComponent &&
            <Cpu />
          }

          {
            chart === 'ram' && !showComponent &&
            <Ram />
          }


          {
            chart === 'reponsetime' && !showComponent &&
            <ResponseTime />
          }


          {
            chart === 'requestscount' && !showComponent &&
            <RequestsCount />
          }


          {showComponent &&
            <>
              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalCpu />
              </div>



              <div className="card-group">
                <div className="card me-3 border-0 shadow bg-white rounded p-4">
                  <VerticalRam />
                </div>
                <div className="card ms-3 border-0 shadow bg-white rounded p-4">
                  <VerticalRamDetails />
                </div>
              </div>
              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalResponseTime />
              </div>
              <div className="card border-0 shadow p-4 mt-5 mb-5 bg-white rounded">
                <HorizontalRequestsCount />
              </div>

              <div className="p-2">

              </div>
            </>
          }

        </div>
      </div>
    </div>
  );
}

