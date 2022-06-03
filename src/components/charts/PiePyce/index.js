import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";
import { fixedToInt } from "../../../utils/formatters";

export default function PiePyce(props) {

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"black"} fontSize={25} fontWeight="bold">
          {fixedToInt(payload.value) + "%"}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />

      </g>
    );
  };

  const colors = props.colorFill
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([])

  function updateArray() {
    if (props.playInterval) {
      props.getDataNow(props.dateStart)
        .then(res => {
          let information = [
            { "name": "used", "value": res.data[res.data.length - 1][props.dataType] },
            { "name": "unused", "value": 1 - res.data[res.data.length - 1][props.dataType] }
          ]
          setData(information)
        })
        .catch(() => {
          console.log("Algo deu errado!")
        })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateArray()
    }, 3000)
    return () => clearInterval(interval);
  }, [props.playInterval])

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    updateArray()
  }, [])


  if (data.length === 0) {
    return (
      <div
        style={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <PieChart width={282} height={282}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        startAngle={90}
        endAngle={-270}
        innerRadius={50}
        outerRadius={70}
        fill={"blue"}
        dataKey="value"
      // onMouseEnter={onPieEnter}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}
