import React from "react";
import { Link } from "react-router-dom";
import icon from "../../../assets/icon.png";
import { ReactComponent as PlayPauseIcon } from "../../../assets/play-pause.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import './style.css'

export default function MenuDash(props) {

  return (
    <div className="">
      <div className="d-block d-lg-none">
        <div className="pt-3 d-flex">

          <div className="display-icon">
            <Link to="/">
              <img src={icon} alt="logo Pycemaker" className="display-icon-resize" />
              <span className="display-icon-font-resize">PYCEMAKER</span>
            </Link>
          </div>

          <div className="flex-grow-1 pt-2">
            <div className="d-flex justify-content-end" >


              <div className="display-time-icon">
                <select value={props.timeRange} onChange={e => { props.setTimeRange(e.target.value); props.setPlayInterval(false) }}>
                  <option value={1}>1 h</option>
                  <option value={6}>6 h</option>
                  <option value={12}>12 h</option>
                  <option value={24}>1 d</option>
                  <option value={120}>5 d</option>
                  <option value={168}>7 d</option>
                </select>
              </div>

              <div className="ps-2" >
                <button className="display-settings-icon" onClick={() => { props.setIsOpen(!props.isOpen) }}><SettingsIcon /></button>
              </div>

              <div className="ps-2">
                {props.playInterval === true ?
                  <button className="display-button-stop-icon" onClick={(e) => props.setPlayInterval(false)} ><PlayPauseIcon /></button>
                  :
                  <button className="display-button-play-icon" onClick={(e) => props.setPlayInterval(true)} ><PlayPauseIcon /></button>
                }
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="d-none d-lg-block">
        <div className="pt-3 d-flex">

          <div className="display-icon">
            <Link to="/">
              <img src={icon} alt="logo Pycemaker" />
              <span>PYCEMAKER</span>
            </Link>
          </div>

          <div className=" flex-grow-1">
            <div className="d-flex justify-content-end">
              {/* <div className="row row-cols-4 m-0"> */}
              <div className="font-bold">Analisar o período de: </div>

              <div className="ps-2 display-select">
                <select value={props.timeRange} onChange={e => { props.setTimeRange(e.target.value); props.setPlayInterval(false) }}>
                  <option value={1}>1 hora</option>
                  <option value={6}>6 horas</option>
                  <option value={12}>12 horas</option>
                  <option value={24}>1 dia</option>
                  <option value={120}>5 dias</option>
                  <option value={168}>1 semana</option>
                </select>
              </div>

              <div className="ps-2 display-conf">
                <button onClick={() => { props.setIsOpen(!props.isOpen) }}>Configurações</button>
              </div>

              <div className="ps-2">
                {props.playInterval === true ?
                  <button className="display-button-stop" onClick={(e) => props.setPlayInterval(false)} >Interromper</button>
                  :
                  <button className="display-button-play" onClick={(e) => props.setPlayInterval(true)} >Retomar</button>
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}