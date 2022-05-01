import React from "react";
// import AreaPyce from "../AreaPyce";
import AreaPyce2 from "../AreaPyce2";
import BarPyce from "../BarPyce";
import Report from "../Report";
import { ReactComponent as ExpandIcon } from '../../assets/expand.svg';

export default function HorizontalCard(props) {

  return (
    // <div className="card border-0 shadow p-4 bg-white rounded">
    <div className="row">
      <div className="col-sm-3">
        <div className="pb-3">
          <span className="component_title1">Níveis de Consumo</span>
        </div>
        <BarPyce
          {...props}
          width="100%"
          height={250} />
      </div>
      <div className="col-sm-6">
        <div className="pcm-card-title pb-3">
          <span className="component_title1">{props.title}</span>
          <button onClick={() => { props.setChart(props.chart); props.setShowComponent(false) }}><ExpandIcon /></button>
        </div>
        <AreaPyce2
          {...props}
          width="100%"
          height={300} />
      </div>
      <div className="col-sm-3">
        <Report
          {...props}
        />
      </div>
    </div>
    // </div>
  )
}