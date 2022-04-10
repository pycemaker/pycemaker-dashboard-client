import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BarPyce from "../../components/BarPyce";
import LinePyce from "../../components/LinePyce";
import Report from "../../components/Report";
import { getCpu, getCpuNow } from "../../services/api";

export default function Home() {

  const [playInterval, setPlayInterval] = useState(true)
  const [timeRange, setTimeRange] = useState(20)

  const dateNow = new Date()

  let dateStart = new Date(dateNow)
  dateStart = new Date(dateStart.setHours(dateStart.getHours() - 6))

  function formartDate(date) {
    let dformat =
      String(date.getDate()).padStart(2, '0') + "-" +
      String(date.getMonth() + 1).padStart(2, '0') + "-" +
      String(date.getFullYear()) + "-" +
      String(date.getHours()).padStart(2, '0') + "-" +
      String(date.getMinutes()).padStart(2, '0') + "-" +
      String(date.getSeconds()).padStart(2, '0')
    return dformat
  }


  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cadastro">Cadastro</Link>
      </nav>
      <div>
        <button onClick={() => setPlayInterval(!playInterval)} >{playInterval ? "parar" : "observar"}</button>
      </div>
      <div style={{ background: "lightyellow" }}>
        <LinePyce
          getData={getCpuNow}
          dateStart={formartDate(dateStart)}
          playInterval={playInterval}
          setPlayInterval={setPlayInterval} />
        <BarPyce
          getData={getCpu}
          dateNow={formartDate(dateNow)}
          playInterval={playInterval}
          setPlayInterval={setPlayInterval}
          timeRange={timeRange} />
        <Report
          getData={getCpu}
          dateNow={formartDate(dateNow)}
          playInterval={playInterval}
          setPlayInterval={setPlayInterval}
          timeRange={timeRange} />
      </div>
      <div style={{ background: "lightblue" }}>
        <LinePyce
          getData={getCpuNow}
          dateStart={formartDate(dateStart)}
          playInterval={playInterval}
          setPlayInterval={setPlayInterval} />
        <BarPyce
          getData={getCpu}
          dateNow={formartDate(dateNow)}
          playInterval={playInterval}
          setPlayInterval={setPlayInterval}
          timeRange={timeRange} />
        <Report
          getData={getCpu}
          dateNow={formartDate(dateNow)}
          playInterval={playInterval}
          setPlayInterval={setPlayInterval}
          timeRange={timeRange} />
      </div>
    </div>
  );
}