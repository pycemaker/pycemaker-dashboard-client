import React from "react"
import AreaPyce from "../../charts/AreaPyce"
import BarPyce from "../../charts/BarPyce"
import Report from "../../reports/Report"
import { ReactComponent as ExpandIcon } from '../../../assets/expand.svg'

export default function VerticalCard(props) {

  return (
    <>
      <div className="pcm-card-title pb-3">
        <span className="component_title1">{props.title}</span>
        <button onClick={() => { props.setChart(props.chart); props.setShowComponent(false) }}><ExpandIcon /></button>
      </div>
      <AreaPyce
        {...props}
        width="100%"
        height={270} />
      <div className="row mt-3">
        <div className="col-md-12 col-xl-6">
          <div className="pb-3">
            <span className="component_title1">Níveis de Consumo</span>
          </div>
          <BarPyce
            {...props}
            width="100%"
            height={250} />
        </div>
        <div className="col-md-12 col-xl-6">
          <Report
            {...props}
          />
        </div>
      </div>
    </>
  )
}
