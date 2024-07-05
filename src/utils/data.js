const gauge = {
  rc: 51,
  tp: 41,
  cp: 20,
  labourCount: 50,
};

const data = [
  {time: "00:00",downMachines: 0},
  {time: "01:00",downMachines: 1},
  { time: "02:00", downMachines: 12 },
  { time: "03:00", downMachines: 0 },
  { time: "04:00", downMachines: 3 },
  { time: "05:00", downMachines: 1 },
  { time: "06:00", downMachines: 2 },
  { time: "07:00", downMachines: 10 },
  { time: "08:00", downMachines: 1 },
  { time: "09:00", downMachines: 3 },
  { time: "10:00", downMachines: 2 },
  { time: "11:00", downMachines: 1 },
  { time: "12:00", downMachines: 0 },
  { time: "13:00", downMachines: 1 },
  { time: "14:00", downMachines: 2 },
  { time: "15:00", downMachines: 3 },
  { time: "16:00", downMachines: 4 },
  { time: "17:00", downMachines: 5 },
  { time: "18:00", downMachines: 6 },
  { time: "19:00", downMachines: 13 },
  { time: "20:00", downMachines: 7 },
  { time: "21:00", downMachines: 1 },
  { time: "22:00", downMachines: 0 },
  { time: "23:00", downMachines: 12 },
];


const monthlyProductionData = [
  {month: "Jan", ProductionCurrentYear: 400, ProductionLastYear: 240},
  {month: "Feb", ProductionCurrentYear: 300, ProductionLastYear: 139},
  {month: "Mar", ProductionCurrentYear: 200, ProductionLastYear: 980},
  {month: "Apr", ProductionCurrentYear: 278, ProductionLastYear: 390},
  {month: "May", ProductionCurrentYear: 189, ProductionLastYear: 480},
  {month: "Jun", ProductionCurrentYear: 239, ProductionLastYear: 380},
  {month: "Jul", ProductionCurrentYear: 349, ProductionLastYear: 430},
  {month: "Aug", ProductionCurrentYear: 200, ProductionLastYear: 240},
  {month: "Sep", ProductionCurrentYear: 278, ProductionLastYear: 139},
  {month: "Oct", ProductionCurrentYear: 189, ProductionLastYear: 980},
  {month: "Nov", ProductionCurrentYear: 239, ProductionLastYear: 390},
  {month: "Dec", ProductionCurrentYear: 349, ProductionLastYear: 480},
];


const machinePackingData = [
  {month: "Jan", monthlyTarget: 400, monthlyProduction: 240, dailyProduction: 100, dailyTarget: 200},
];

export { gauge, data, monthlyProductionData, machinePackingData };