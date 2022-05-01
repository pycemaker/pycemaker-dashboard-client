import React, { useState } from "react";
import './style.css'


export default function Configuracoes(props) {


  const [isChecked, setIsChecked] = useState(true)
  function setStyle(e) {
    // e = document.getElementById("cpu-consume")
    e.target.parentNode.style.outline = '1px solid #000';
    e.target.parentNode.style.transform = 'scale(1.09)';
  };

  function disableStyle(e) {
    // e = document.getElementById("cpu-consume")
    e.target.parentNode.style.outline = 'none';
    e.target.parentNode.style.transform = 'scale(1)';
  };


  return (


    <div className="display-modal-container">
      <div className="card display-modal-form shadow">

        <div className="mb-5">
          <div className="form-title">Configurações do Monitoramento</div>
        </div>

        <form>

          <div className="mb-1">
            <label>Insira o e-mail de destino dos alertas e relatórios periódicos:</label>
          </div>
          <div className="mb-4">
            <input placeholder="seu_email@dominio.com" />
          </div>

          <div className="mb-1">
            <label>Defina o horário inicial de disparo do relatório:</label>
          </div>
          <div className="mb-4">

            <select className="me-2" value={"12"} onChange={e => { }}>
              {[...Array(24).keys()].map(i =>
                <option value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')} h</option>
              )}
            </select>

            <select value={"00"} onChange={e => { }}>
              <option value={"00"}>00 min</option>
              <option value={"20"}>30 min</option>
            </select>
          </div>
          <div className="mb-1">
            <label>Disparar relatório a cada:</label>
          </div>
          <div className="mb-4">
            <select value={6} onChange={e => { }}>
              <option value={6}>6 horas</option>
              <option value={12}>12 horas</option>
              <option value={24}>24 horas</option>
              <option value={168}>1 semana</option>
            </select>
          </div>


          <div className="switch-container mb-4">
            <div className="switch-flex">
              <div className="onoffswitch me-2">
                <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" tabIndex="0" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <label className="onoffswitch-label" for="myonoffswitch">
                  <span className="onoffswitch-inner"></span>
                  <span className="onoffswitch-switch"></span>
                </label>
              </div>
              <div>
                Habilitar disparo de alerta de previsão
              </div>
            </div>
          </div>

          <div className="mb-3">
            Defina o nível dos alertas (zero desabilita):
          </div>

          <div className="container mb-4">


            <div className="row mb-3">
              <div className="col p-0">
                <div>
                  <label className="form-semibold">Consumo de CPU:</label>
                </div>
                <div className="input-wrapper">
                  <div className="input-wrapper-row">
                    <div className="input-wrapper-input" contentEditable="true"
                      spellCheck="false" onFocus={e => setStyle(e)} onBlur={e => disableStyle(e)}>75</div>
                    <div>%</div>
                  </div>
                </div>
              </div>

              <div className="col p-0">
                <div>
                  <label className="form-semibold">Consumo de RAM:</label>
                </div>
                <div className="input-wrapper">
                  <div className="input-wrapper-row">
                    <div className="input-wrapper-input" contentEditable="true"
                      spellCheck="false" onFocus={e => setStyle(e)} onBlur={e => disableStyle(e)}>50</div>
                    <div>%</div>
                  </div>
                </div>
              </div>

              <div className="col p-0">
                <div>
                  <label className="form-semibold">Tempo de Resposta:</label>
                </div>
                <div className="input-wrapper">
                  <div className="input-wrapper-row">
                    <div className="input-wrapper-input" contentEditable="true"
                      spellCheck="false" onFocus={e => setStyle(e)} onBlur={e => disableStyle(e)}>200</div>
                    <div>ms</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col p-0">
                <div>
                  <label className="form-semibold">Número de Requisições:</label>
                </div>
                <div className="input-wrapper">
                  <div className="input-wrapper-row">
                    <div className="input-wrapper-input" contentEditable="true"
                      spellCheck="false" onFocus={e => setStyle(e)} onBlur={e => disableStyle(e)}>30</div>
                    <div>req/s</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="form-menu-container">
            <div className="form-menu-row" >
              <button className="btn-green" type="submit">Salvar</button>
            </div>
            <div className="form-menu-row" >
              <button className="btn-black" onClick={e => { props.setIsOpen(!props.isOpen) }}>Cancelar</button>
            </div>
          </div>
        </form>

      </div >
    </div >
  );
}