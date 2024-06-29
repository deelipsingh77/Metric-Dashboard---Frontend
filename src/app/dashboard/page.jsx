"use client";
import MeterGauge from "@/components/MeterGauge";
import { ModeToggle } from "@/components/DarkMode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

const seriesA = {
  data: [2, 3, 1, 4, 5],
  label: "Series A",
};
const seriesB = {
  data: [3, 1, 4, 2, 1],
  label: "Series B",
};
const seriesC = {
  data: [3, 2, 4, 5, 1],
  label: "Series C",
};

const Dashboard = () => {
  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold p-1">Dashboard</h1>
        <ModeToggle />
      </div>
      <section id="dashboard" className="grid grid-cols-4 gap-4">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Power Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
              erat nec felis ultricies rutrum.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Monthly Production and Target</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
              erat nec felis ultricies rutrum.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Monthly Production and Target</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
              erat nec felis ultricies rutrum.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="row-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Monthly Production and Target</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
              erat nec felis ultricies rutrum.
            </CardDescription>
          </CardContent>
        </Card>

        <div className="col-span-3 flex justify-evenly">
          <div className="shadow-md rounded-xl px-6">
            <MeterGauge value={30} />
          </div>
          <div className="shadow-md rounded-xl px-6">
            <MeterGauge value={30} />
          </div>
          <div className="shadow-md rounded-xl px-6">
            <MeterGauge value={30} />
          </div>
          <div className="shadow-md rounded-xl px-6">
            <MeterGauge value={30} />
          </div>
        </div>

        <div id="last-row" className="flex justify-evenly col-span-4">
          <div className="shadow-md rounded-xl">
            <BarChart
              width={400}
              height={300}
              series={[
                { ...seriesA, stack: "total" },
                { ...seriesB, stack: "total" },
                { ...seriesC, stack: "total" },
              ]}
            />
          </div>

          <div className="shadow-md rounded-xl">
            <LineChart
              xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
              series={[
                {
                  data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                  showMark: ({ index }) => index % 2 === 0,
                },
              ]}
              width={500}
              height={300}
            />
          </div>

          <div className="shadow-md rounded-xl">
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                },
              ]}
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>
    </main>
  );
};
export default Dashboard;
