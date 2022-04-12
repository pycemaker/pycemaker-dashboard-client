import React from "react"
import AreaPyce from "../AreaPyce"
import BarPyce from "../BarPyce"
import Report from "../Report"

export default function VerticalCard(props) {

  return (
    <>
      <span className="component_title1">{props.title}</span>
      <AreaPyce
        {...props}
        width="100%"
        height={270} />
      <div class="row mt-3">
        <div class="col-sm">
          <span className="component_title1">Níveis de Consumo</span>
          <BarPyce
            {...props}
            width="100%"
            height={250} />
        </div>
        <div class="col-sm">
          <Report
            {...props}
          />
        </div>
      </div>
    </>
  )
}