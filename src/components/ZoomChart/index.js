import React from "react";
import AreaPyce2 from "../AreaPyce2";


export default function ZoomChart(props) {


  return (


    <div className="card border-0 shadow bg-white rounded p-5 mt-5">
      <button onClick={() => { props.setShowComponent(true) }}>teste</button>
      <div className="pcm-card-title pb-3">
        <span className="component_title1">{props.title}</span>
      </div>
      <div>
        <AreaPyce2
          {...props}
          width="100%"
          height={680} />
      </div>
    </div>
  )
}