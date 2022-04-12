import React from "react";
import AreaPyce from "../AreaPyce";
import BarPyce from "../BarPyce";
import Report from "../Report";

export default function HorizontalCard(props) {

  return (
    // <div className="card border-0 shadow p-4 bg-white rounded">
      <div className="row">
        <div className="col-sm-3">
          <span className="component_title1">Níveis de Consumo</span>
          <BarPyce
            {...props}
            width="100%"
            height={250} />
        </div>
        <div className="col-sm-6">
          <span className="component_title1">{props.title}</span>
          <AreaPyce
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