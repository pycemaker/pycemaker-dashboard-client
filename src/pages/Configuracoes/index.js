import React from "react";


export default function Configuracoes(props) {


  return (


    <div>

      <form>
        <div>
          <label>Insira o endereço do servidor Prometheus:</label>
        </div>
        <div>
          <input value="http://localhost:9090" />
        </div>
        <div>
          <label>Insira o e-mail de destino do relatório periódico:</label>
        </div>
        <div>
          <input value="seu_email@email.com" />
        </div>
        <div>
          <label>Defina o horário inicial de disparo do relatório:</label>
        </div>
        <div>

          <select value={"12"} onChange={e => { }}>
            {[...Array(24).keys()].map(i =>
              <option value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')} h</option>
            )}
          </select>

          <select value={"00"} onChange={e => { }}>
            <option value={"00"}>00 min</option>
            <option value={"20"}>30 min</option>
          </select>
        </div>
        <div>
          <label>Disparar relatório a cada:</label>
        </div>
        <div>
          <select value={6} onChange={e => { }}>
            <option value={6}>6 horas</option>
            <option value={12}>12 horas</option>
            <option value={24}>24 horas</option>
            <option value={168}>1 semana</option>
          </select>
        </div>
        <div>
          <button type="submit">Salvar</button>
        </div>
        <div>
          <button onClick={e => { props.setIsOpen(!props.isOpen) }}>Cancelar</button>
        </div>
      </form>

    </div>
  );
}