"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  ProductionCurrentYear: {
    label: "Production Current Year",
    color: "#2563eb",
  },
  ProductionLastYear: {
    label: "Production Last Year",
    color: "hsl(173, 58%, 39%)",
  },
};

export function YearlyBarchart({ chartData }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-[300px] ml-4"
    >
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {/* <ChartLegend content={<ChartLegendContent />} /> */}
        {/* <YAxis /> */}
        <Bar
          dataKey="ProductionCurrentYear"
          fill="var(--color-ProductionCurrentYear)"
          radius={4}
        />
        <Bar
          dataKey="ProductionLastYear"
          fill="var(--color-ProductionLastYear)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
