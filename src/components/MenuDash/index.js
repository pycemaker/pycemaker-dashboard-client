import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.png";
import './style.css'

export default function MenuDash(props) {

  return (
    <div className="display-menu">
      <div className="display-icon">
        <img src={icon} alt="logo Pycemaker" />
        <Link to="/">
          <span>PYCEMAKER</span>
        </Link>
      </div>
      <div className="display-config">
        <div className="me-2 menu-label-size">Analisar o período de: </div>
        <select value={props.timeRange} onChange={e => { props.setTimeRange(e.target.value); props.setPlayInterval(false) }}>
          <option value={6}>6 horas</option>
          <option value={12}>12 horas</option>
          <option value={24}>1 dia</option>
          <option value={120}>5 dias</option>
          <option value={168}>1 semana</option>
        </select>
        <button onClick={() => { props.setIsOpen(!props.isOpen) }}>Configurações</button>
        {props.playInterval === true ?
          <button className="display-button-stop" onClick={(e) => props.setPlayInterval(false)} >Interromper</button>
          :
          <button className="display-button-play" onClick={(e) => props.setPlayInterval(true)} >Retomar</button>
        }
      </div>
    </div>
  )
}