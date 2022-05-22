import React from "react";
import AreaPyce from "../../charts/AreaPyce";
import { ReactComponent as BackIcon } from '../../../assets/back.svg';
import { ReactComponent as ResetIcon } from '../../../assets/reset.svg';
import "./style.css"

export default function ZoomChart(props) {


  return (


    <div className="card border-0 shadow bg-white rounded p-2 pb-5 mt-5">
      <div className="zoom-grid px-4 pt-3 pb-4">
        <div className="d-flex justify-content-start">
          <div>
            <button className="zoom-button" onClick={() => { props.setShowComponent(true) }}><BackIcon /></button>
          </div>
          <div className="ps-2">
            <button className="zoom-button" onClick={() => { props.setDateNow(new Date()); props.setPlayInterval(false) }}>
              <ResetIcon />
            </button>
          </div>
        </div>
        <div className="zoom-title component_title1">{props.title}</div>
      </div>
      <div>
        <AreaPyce
          {...props}
          // ticks={11}
          width="100%"
          height={600} />
      </div>
    </div>
  )
}