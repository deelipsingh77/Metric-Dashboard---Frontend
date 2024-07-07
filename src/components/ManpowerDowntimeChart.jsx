// import { LineChart } from "@mui/x-charts"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip dark:bg-slate-700 dark:shadow-xl bg-white shadow-2xl p-4 rounded-2xl">
        <p className="label dark:text-white text-black">{`Time: ${label}`}</p>
        <p className="desc dark:text-white text-black">{`Down Manpower: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const ManpowerDowntimeChart = ({width, height, data}) => {
  return (
    <div className="py-4">
      <LineChart
        data={data}
        margin={{ top: 10, right: 40, left: 0, bottom: 5 }}
        width={width || 500}
        height={height || 250}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="downManpower" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};
export default ManpowerDowntimeChart;
