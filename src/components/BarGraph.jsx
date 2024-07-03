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
      <div className="custom-tooltip dark:bg-slate-700 dark:shadow-xl bg-white shadow-2xl p-4 rounded-2xl">
        <p className="label dark:text-white text-black">{`Month: ${label}`}</p>
        <p className="desc dark:text-white text-black">{`Production: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const BarGraph = ({ monthlyProductionData, width }) => {
  return (
    <div className="pr-4">
      <BarChart data={monthlyProductionData} width={width || 300} height={250}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="ProductionCurrentYear" fill="#8884d8" />
        <Bar dataKey="ProductionLastYear" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};
export default BarGraph;
