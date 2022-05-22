import React from "react";
import AreaPyce from "../../charts/AreaPyce";
import BarPyce from "../../charts/BarPyce";
import Report from "../../reports/Report";
import { ReactComponent as ExpandIcon } from '../../../assets/expand.svg';

export default function HorizontalCard(props) {

  return (
    <div className="row">
      <div className="col-sm-12 col-lg-3">
        <div className="pb-3">
          <span className="component_title1">Níveis de Consumo</span>
        </div>
        <BarPyce
          {...props}
          width="100%"
          height={250} />
      </div>
      <div className="col-sm-12 col-lg-6">
        <div className="pcm-card-title pb-3">
          <span className="component_title1">{props.title}</span>
          <button onClick={() => { props.setChart(props.chart); props.setShowComponent(false) }}><ExpandIcon /></button>
        </div>
        <AreaPyce
          {...props}
          width="100%"
          height={300} />
      </div>
      <div className="col-sm-12 col-lg-3">
        <Report
          {...props}
        />
      </div>
    </div>
  )
}