"use client";

import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

function GaugePointer({ value }) {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={5}
      />
      <text
        x={cx}
        y={cy + 30}
        fill="white"
        fontSize="16"
        textAnchor="middle"
        dy=".3em"
      >
        {value}
      </text>
    </g>
  );
}

export default function MeterGauge({ value }) {
  return (
    <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={value}
    >
      <GaugeReferenceArc />
      <GaugeValueArc/>
      <GaugePointer value={value}/>
    </GaugeContainer>
  );
}
