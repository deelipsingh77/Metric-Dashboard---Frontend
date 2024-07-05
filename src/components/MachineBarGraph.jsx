import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip dark:bg-slate-700 dark:shadow-xl bg-white shadow-2xl min-w-fit p-4 rounded-2xl">
        <p className="label dark:text-white text-black">{`Month: ${label}`}</p>
        <p className="desc dark:text-white text-black">{`Monthly Production: ${payload[0].value}`}</p>
        <p className="desc dark:text-white text-black">{`Monthly Target: ${payload[1].value}`}</p>
        <p className="desc dark:text-white text-black">{`Daily Production: ${payload[2].value}`}</p>
        <p className="desc dark:text-white text-black">{`Daily Target: ${payload[3].value}`}</p>
      </div>
    );
  }

  return null;
};

const MachineBarGraph = ({ monthlyProductionData, width }) => {
  return (
    <div className="">
      <BarChart data={monthlyProductionData} width={width || 200} height={250}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="monthlyProduction" fill="#82ca9d" />
        <Bar dataKey="monthlyTarget" fill="#8884d8" />
        <Bar dataKey="dailyProduction" fill="#ffff00" />
        <Bar dataKey="dailyTarget" fill="#0000ff" />
      </BarChart>
    </div>
  );
};
export default MachineBarGraph;
