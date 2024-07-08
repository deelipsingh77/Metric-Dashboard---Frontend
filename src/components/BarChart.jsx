"use client";

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  monthlyProduction: {
    label: "Monthly Production",
    color: "hsl(220, 70%, 50%)",
  },
  monthlyTarget: {
    label: "Monthly Target",
    color: "hsl(160, 60%, 45%)",
  },
  dailyProduction: {
    label: "Daily Production",
    color: "hsl(30, 80%, 55%)",
  },
  dailyTarget: {
    label: "Daily Target",
    color: "hsl(280, 65%, 60%)",
  },
};

export function Barchart({ chartData }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-[200px] ml-4">
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
          dataKey="monthlyProduction"
          fill="var(--color-monthlyProduction)"
          radius={4}
        />
        <Bar
          dataKey="monthlyTarget"
          fill="var(--color-monthlyTarget)"
          radius={4}
        />
        <Bar
          dataKey="dailyProduction"
          fill="var(--color-dailyProduction)"
          radius={4}
        />
        <Bar dataKey="dailyTarget" fill="var(--color-dailyTarget)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
