import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyProductionData } from "@/utils/data";

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

const BarGraph = () => {
  return (
    <ResponsiveContainer width={500} height={250} className="p-2 pt-4">
      <BarChart data={monthlyProductionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="productionCurrentYear" fill="#8884d8" />
        <Bar dataKey="productionLastYear" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarGraph;
