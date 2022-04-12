import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.png";

export default function MenuDash(props) {

  return (
    <div className="display-menu">
      <div className="display-icon">
        <img src={icon} />
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
        <button onClick={() => props.setPlayInterval(!props.playInterval)} >{props.playInterval ? "Interromper" : "Retomar"}</button>
      </div>
    </div>
  )
}