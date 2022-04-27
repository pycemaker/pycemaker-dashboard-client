import React, { useEffect, useState, FunctionComponent, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
  LineChart,
  Line,
  ComposedChart
} from "recharts";
import { dateFormatter, fixedDecimal, fixedToInt, formartDate, formatPercentage } from "../../utils/formatters";
// import { format } from "date-fns";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function AreaPyce2(props) {

  const [playInterval, setPlayInterval] = useState(false)
  const [reset, setReset] = useState(false)
  const [countIndex, setCountIndex] = useState()
  const [observer, setObserver] = useState(true);

  const [data, setData] = useState([])


  // FUNCOES AUXILIARES
  function findIndexByProperty(data, key, value) {
    for (var i = 0; i < data.length; i++) {
      if (data[i][key] == value) {
        return i;
      }
    }
  }

  function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.random() * (max - min + 1)) + min;
  }

  useInterval(() => {
 
    // SEXTO: armazenar o array atual em uma variavel 
    let lista = data;

    try {
      // SETIMO: coletar do banco o proximo valor a partir da ultima time_series salva
      // desenvolver logica aqui...
  
      // OITAVO: se o banco retornar um array buscar na lista a posicao do ultimo time_series
      // OBS: a variavel observer nao existe, substitui-la pela vericacao de existencia de tamanho no array
      if (observer) {
        let index = findIndexByProperty(data, 'time_series', countIndex);

        // NONO: atualizar na posicao encontrada o time_series e o value com os dados obtidos do banco
        lista[index + 1] = {
          id: index + 1,
          time_series: lista[index + 1].time_series,
          value: lista[index + 1].predict_value + Math.random(),
          predict: lista[index + 1].predict,
          predict_value: lista[index + 1].predict_value
        }

        // DECIMO: Salvar novo array
        setData(lista)

        // DECIMO PRIMEIRO: atualizar o time_series com o proximo do array
        setCountIndex(lista[index + 1].time_series)
      }

    // NONO: se a buscar nao encontrar a proxima posiçao (dados finalizados), parar o playInterval
    // e resetar os dados atuais
    } catch (e) {
      console.log(e)
      setPlayInterval(false)
      setReset(!reset)
    }

  }, playInterval ? 1000 : null);


  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  

  useEffect(() => {

    // PRIMEIRO: coletar array com valor e prediçao a data anterior

    let predict = [...Array(20)].map(i => (getRandomInt(2, 8)))

    let example = [...Array(10).keys()].map(i => ({
      id: (i + 1),
      time_series: new Date(),
      value: predict[i] + Math.random(),
      predict: [predict[i] - 1, predict[i] +  1],
      predict_value: predict[i]
    })
    )

    // SEGUNDO: setar time_series com o ultimo encontrado no resultado
    setCountIndex(example.at(-1).time_series)

    // TERCEIRO: coletar array com predicao a data posterior
    let example2 = [...Array(10).keys()].map(i => ({
      id: (i + 51),
      time_series: new Date(),
      predict: [predict[10+i] - 2, predict[10+i] +  2],
      predict_value: predict[10+i]
    })
    )

    // QUARTO: atualizar data com os arrays encontratos
    example = [...example, ...example2]
    setData(old => [...example])

    // QUINTO: ativar a busca de novos dados
    setTimeout(function () {
      setPlayInterval(true)
    }, 2000);

  }, [reset])


  const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        // fontSize={11}
        >
          {dateFormatter(payload.value)}
        </text>
      </g>
    );
  };


  return (
    <>
      <button onClick={() => setPlayInterval(!playInterval)} >{playInterval ? "Interromper" : "Retomar"}</button>
      <button onClick={() => setObserver(!observer)} >{observer ? "Nao Observar" : "Observar"}</button>

      <ResponsiveContainer
        width={1000}
        height={500}
      >
        <ComposedChart
          data={data}

          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 50
          }}
        >
          <CartesianGrid strokeDasharray="3" vertical={false} />
          <XAxis

            dataKey="time_series"
            tickFormatter={dateFormatter}
            axisLine={{ stroke: "black", strokeWidth: 1.5 }}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
          tick={<CustomizedAxisTick />}
          />
          <YAxis
            // tickFormatter={fixedToInt}
            axisLine={false}
            tickLine={false}
            padding={{ bottom: 1 }}
            domain={[0, 10]} 
            tickCount={6}
            />
            
          <Tooltip labelFormatter={dateFormatter} />
          {/* <ReferenceLine x={refX} stroke="green" label="Min PAGE" /> */}
          {/* <Legend iconType="rect" fill={props.colorFill} stroke={props.colorFill} layout="horizontal" verticalAlign="top" align="right" wrapperStyle={{
            paddingBottom: "20px"
          }} /> */}
          {/* <Legend /> */}

          <Area
            isAnimationActive={false}
            type=""
            dataKey="predict"
            stroke=""
            strokeWidth={1.5}
            // strokeOpacity={0}
            fill={props.colorFill}
          fillOpacity={0.4}
         activeDot={false}
          // activeDot={{ stroke: 'black', fill: "white", strokeWidth: 1.5, r: 5 }}
          />
          <Line
            isAnimationActive={false}
            type=""
            dataKey="predict_value"
            stroke="blue"
            strokeWidth={1.5}
            dot={false}
            fill={"#15ED48"}
            activeDot={false}
            // activeDot={{ stroke: 'black', fill: "white", strokeWidth: 1.5, r: 5 }}
          />
          <Line
            isAnimationActive={false}
            type=""
            dataKey="value"
            stroke="black"
            strokeWidth={1.5}
            fill={"#15ED48"}
            fillOpacity={1}
            dot={{ fill: "white" }}
            activeDot={{ stroke: 'black', fill: "white", strokeWidth: 1.5, r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}