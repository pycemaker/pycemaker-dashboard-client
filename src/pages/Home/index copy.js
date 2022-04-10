import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function Home() {
  const api = new Api()
  const dateNow = Date.now()
  const [arrayLen, setArrayLen] = useState(10)


  const [exs, setExs] = useState([...Array(10).keys()].map(i => ({ id: (Math.random() * 10), name: 'Item ' + (i + 1) })))

  useEffect(() => {

    // setExs([...Array(arrayLen).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) })))
    // setArrayLen(arrayLen + 1)
    console.log(exs)
    api.getCpu("07-04-2022-22-32", 20)
      .then(res => {
        console.log(20, res)
      })
      .catch(() => {
        console.log("Algo deu errado!")
      })
  }, [])

  function updateArray() {
    setArrayLen(array => array + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateArray()
    }, 1000)
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    console.log(arrayLen)
    let array = [...Array(arrayLen).keys()].map(i => ({ id: (Math.random() * 10), name: 'Item ' + (i + 1) }))
    setExs(() => array)
    console.log(exs)
  }, [arrayLen])

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cadastro">Cadastro</Link>
      </nav>
      <div>
        <LineChart
          width={500}
          height={300}
          data={exs}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="id"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
}