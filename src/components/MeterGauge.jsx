// import React from "react";
// import {
//   GaugeContainer,
//   GaugeValueArc,
//   GaugeReferenceArc,
//   useGaugeState,
// } from "@mui/x-charts/Gauge";

// function GaugePointer({ value }) {
//   const { valueAngle, outerRadius, cx, cy } = useGaugeState();

//   if (valueAngle === null) {
//     // No value to display
//     return null;
//   }

//   const target = {
//     x: cx + outerRadius * Math.sin(valueAngle),
//     y: cy - outerRadius * Math.cos(valueAngle),
//   };


//   return (
//     <g>
//       <circle cx={cx} cy={cy} r={5} fill="red" />
//       <path
//         d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
//         stroke="red"
//         strokeWidth={5}
//       />
//     </g>
//   );
// }

// export default function MeterGauge({ value }) {
//   return (
//     <GaugeContainer
//       width={180}
//       height={150}
//       startAngle={-110}
//       endAngle={110}
//       value={value}
//       valueMax={100}
//       valueMin={0}
//       // backgroundColor={containerBackgroundColor}
//     >
//       <GaugeReferenceArc />
//       <GaugeValueArc />
//       <GaugePointer value={value} />
//     </GaugeContainer>
//   );
// }
