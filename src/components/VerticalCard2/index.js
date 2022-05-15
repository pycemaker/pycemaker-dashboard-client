import React, { useEffect, useState } from "react"
// import AreaPyce from "../AreaPyce"
import TwoAreaPyce from "../TwoAreaPyce"
import BarPyce from "../BarPyce"
import Report from "../Report"
import { ReactComponent as ExpandIcon } from '../../assets/expand.svg'
import PiePyce from "../PiePyce"
import { Pie, PieChart, ResponsiveContainer } from "recharts"
import './style.css'

export default function VerticalCard2(props) {

  return (
    <>
      <div className="pcm-card-title pb-3">
        <span className="component_title1">{props.titles[0]}</span>
        <button onClick={() => { props.setChart(props.chart); props.setShowComponent(false) }}><ExpandIcon /></button>
      </div>
      <TwoAreaPyce
        {...props}
        getDataNow={props.getDataNow[0]}
        width="100%"
        height={270} />
      {/* <div className="row mt-3"> */}

      <div className="row row-cols-2 mt-3">

        <div>
          <div className="row">
            <div className="pb-3 component_title1">{props.titles[1]}</div>
            <div className="d-flex justify-content-center">
              <PiePyce
                {...props}
                getDataNow={props.getDataNow[1]}
                colorFill={[props.colorFill[1], props.colorFill[2]]}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="row">
            <div className="pb-3 component_title1">{props.titles[2]}</div>
            <div className="d-flex justify-content-center">
              <PiePyce
                {...props}
                getDataNow={props.getDataNow[2]}
                colorFill={[props.colorFill[0], props.colorFill[2]]}
              />
            </div>
          </div>
        </div>

      </div>


      {/* </div> */}
    </>
  )
}
