import React, { useEffect, useState } from "react";
import { getJobsData, modifyJobs, scheduleJobs } from "../../services/api";
import './style.css'
import CurrencyInput from 'react-currency-input-field';
import NumberFormat from 'react-number-format';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';

export default function Configuracoes(props) {

  const [alertPredict, setAlertPredict] = useState(false)
  const [emailTo, setEmailTo] = useState("")
  const [interval, setInterval] = useState("6")
  const [startHour, setStartHour] = useState("12")
  const [startMinute, setStartMinute] = useState("00")
  const [JobExists, setJobExists] = useState(false)
  const [cpu, setCpu] = useState(75)
  const [ram, setRam] = useState(50)
  const [responseTime, setResponseTime] = useState(200)
  const [requestCount, setRequestCount] = useState(30)

  useEffect(() => {
    getJobsData()
      .then(res => {
        console.log(res.data)
        if (res.data) {
          let data = res.data
          function findIndex(data, key, value) {
            for (let i = 0; i < data.length; i++) {
              if (data[i][key].includes(value)) {
                return i;
              }
            }
          }
          console.log(data)

          let index = findIndex(data, "job_name", "report")

          setEmailTo(data[index].email_to)
          setInterval(data[index].interval)
          setStartHour(data[index].start_date.split("-")[0])
          setStartMinute(data[index].start_date.split("-")[1])
          setJobExists(true)

          index = findIndex(data, "job_name", "alert_predict")

          setCpu(data[index].cpu_trigger)
          setRam(data[index].ram_trigger)
          setResponseTime(data[index].response_time_trigger)
          setRequestCount(data[index].request_count_trigger)

        }
      })
      .catch((e) => {
        console.log("Algo deu errado!")
        alert(e.response.data.msg)
      })
  }, [])

  const responseTimeLimit = (inputObj) => {
    const { value } = inputObj;
    if (value <= 1000) return true;
    return false;
  };

  const salvar = (e) => {
    e.preventDefault()
    let date = new Date().toLocaleDateString()
    date = date.replace("/", "-")
    date = date.replace("/", "-")
    date = `${date}-${startHour}-${startMinute}-00`
    let data = {
      start_date: date,
      interval: interval,
      email_to: emailTo,
      alert_predict: alertPredict
    }
    if (JobExists) {
      modifyJobs(data)
        .then(res => {
          console.log(res.data)
          props.setIsOpen(!props.isOpen)
        })
        .catch((e) => {
          console.log("Algo deu errado!")
          alert(e.response.data.msg)
        })
    } else {
      scheduleJobs(data)
        .then(res => {
          console.log(res.data)
          props.setIsOpen(!props.isOpen)
        })
        .catch(() => {
          console.log("Algo deu errado!")
          alert(e.response.data.msg)
        })
    }
  }

  return (
    <div className="display-modal-container">
      <div className="card display-modal-form shadow">

        <div className="form-title-container mb-5">
          <div className="form-title">Configurações do Monitoramento</div>
          <button onClick={e => { props.setIsOpen(!props.isOpen) }}><CloseIcon /></button>
        </div>

        <form>

          <div className="mb-1">
            <label>Insira o e-mail de destino dos alertas e relatórios periódicos:</label>
          </div>

          <div className="mb-4">
            <input placeholder="seu_email@dominio.com" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} />
          </div>

          <div className="mb-1">
            <label>Defina o horário inicial de disparo do relatório:</label>
          </div>

          <div className="mb-4">

            <select className="me-2" value={startHour} onChange={e => setStartHour(e.target.value)}>
              {[...Array(24).keys()].map(i =>
                <option value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')} h</option>
              )}
            </select>

            <select value={startMinute} onChange={e => setStartMinute(e.target.value)}>
              <option value={"00"}>00 min</option>
              <option value={"20"}>30 min</option>
            </select>
          </div>

          <div className="mb-1">
            <label>Disparar relatório a cada:</label>
          </div>

          <div className="mb-4">
            <select value={interval} onChange={e => setInterval(e.target.value)}>
              <option value={"6"}>6 horas</option>
              <option value={"12"}>12 horas</option>
              <option value={"24"}>24 horas</option>
              <option value={"168"}>1 semana</option>
            </select>
          </div>

          <div className="switch-container mb-4">
            <div className="switch-flex">
              <div className="onoffswitch me-2">
                <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" tabIndex={0} checked={alertPredict} onChange={() => setAlertPredict(!alertPredict)} />
                <label className="onoffswitch-label" htmlFor="myonoffswitch">
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
                <CurrencyInput
                  className="cpu"
                  id="input-example"
                  name="input-name"
                  suffix=" %"
                  value={cpu}
                  disableGroupSeparators={true}

                  maxLength={3}
                  step={1}
                  onValueChange={(value, name) => setCpu(value)}
                />
              </div>

              <div className="col p-0">
                <div>
                  <label className="form-semibold">Consumo de RAM:</label>
                </div>
                <CurrencyInput
                  className="ram"
                  id="input-example"
                  name="input-name"
                  suffix=" %"
                  value={ram}
                  disableGroupSeparators={true}
                  maxLength={3}
                  step={1}
                  onValueChange={(value, name) => setRam(value)}
                />
              </div>

              <div className="col p-0">
                <div>
                  <label className="form-semibold">Tempo de Resposta:</label>
                </div>
                <NumberFormat
                  defaultValue={responseTime}
                  className="request-count"
                  suffix=" req/s"
                  displayType="input"
                  decimalScale={0}
                  thousandSeparator={false}
                  onValueChange={(values) => setResponseTime(Number(values.value))}
                />
              </div>

            </div>

            <div className="row">

              <div className="col p-0">
                <div>
                  <label className="form-semibold">Número de Requisições:</label>
                </div>
                <NumberFormat
                  defaultValue={requestCount}
                  className="request-count"
                  suffix=" req/s"
                  displayType="input"
                  decimalScale={0}
                  // type="text"
                  thousandSeparator={false}
                  isAllowed={responseTimeLimit}
                  onValueChange={(values) => setRequestCount(Number(values.value))}
                />
              </div>

            </div>

          </div>

          <div className="form-menu-container">
            <div className="form-menu-row" >
              <button className="btn-green" type="submit" onClick={e => salvar(e)}>Salvar</button>
            </div>
            <div className="form-menu-row" >
              <button className="btn-black" onClick={e => { props.setIsOpen(!props.isOpen) }}>Cancelar</button>
            </div>
          </div>

        </form>

      </div >
    </div >
  )
}