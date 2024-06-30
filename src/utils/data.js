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
  {month: "Jan", productionCurrentYear: 400, productionLastYear: 240},
  {month: "Feb", productionCurrentYear: 300, productionLastYear: 139},
  {month: "Mar", productionCurrentYear: 200, productionLastYear: 980},
  {month: "Apr", productionCurrentYear: 278, productionLastYear: 390},
  {month: "May", productionCurrentYear: 189, productionLastYear: 480},
  {month: "Jun", productionCurrentYear: 239, productionLastYear: 380},
  {month: "Jul", productionCurrentYear: 349, productionLastYear: 430},
  {month: "Aug", productionCurrentYear: 200, productionLastYear: 240},
  {month: "Sep", productionCurrentYear: 278, productionLastYear: 139},
  {month: "Oct", productionCurrentYear: 189, productionLastYear: 980},
  {month: "Nov", productionCurrentYear: 239, productionLastYear: 390},
  {month: "Dec", productionCurrentYear: 349, productionLastYear: 480},
];


export { gauge, data, monthlyProductionData };