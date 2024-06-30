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
import Smileys from "@/components/Smileys";
import { gauge, seriesA, seriesB, seriesC } from "@/utils/data";
import DownTimeChart from "@/components/DownTimeChart";
import BarGraph from "@/components/BarGraph";

const Dashboard = () => {
  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold p-1">Dashboard</h1>
        <ModeToggle />
      </div>
      <section id="dashboard" className="grid grid-cols-4 gap-4">
        <Card className="shadow-md dark:bg-slate-900">
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

        <Card className="shadow-md dark:bg-slate-900">
          <CardHeader>
            <CardTitle>CPT</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
              erat nec felis ultricies rutrum.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-md dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Monthly Production & Target</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
              erat nec felis ultricies rutrum.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="row-span-2 shadow-md flex flex-col dark:bg-slate-900">
          <CardHeader className="p-0 text-center text-2xl font-semibold pt-3">Monthly Target</CardHeader>
          <CardContent className="flex flex-col items-center justify-around h-full">
            <div className="flex items-center gap-2 mt-2 w-full">
              <Smileys value={gauge.rc} />
              <div className="grow">
                <h1 className="text-3xl font-bold text-center">{gauge.rc}%</h1>
                <h2 className="text-center">RC</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 w-full">
              <Smileys value={gauge.tp} />
              <div className="grow">
                <h1 className="text-3xl font-bold text-center">{gauge.tp}%</h1>
                <h2 className="text-center">TP</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 w-full">
              <Smileys value={gauge.cp} />
              <div className="grow">
                <h1 className="text-3xl font-bold text-center">{gauge.cp}%</h1>
                <h2 className="text-center">CP</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-3 flex justify-evenly gap-2">
          <Card className="shadow-md rounded-xl px-6 dark:bg-slate-900">
            <CardHeader className="text-center pb-0">RC</CardHeader>
            <CardContent>
              <MeterGauge value={gauge.rc} />
              <h1 className="text-center">{gauge.rc}</h1>
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl px-6 dark:bg-slate-900">
            <CardHeader className="text-center pb-0">TP</CardHeader>
            <CardContent>
              <MeterGauge value={gauge.tp} />
              <h1 className="text-center">{gauge.tp}</h1>
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl px-6 dark:bg-slate-900">
            <CardHeader className="text-center pb-0">CP</CardHeader>
            <CardContent>
              <MeterGauge value={gauge.cp} />
              <h1 className="text-center">{gauge.cp}</h1>
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl px-6 dark:bg-slate-900">
            <CardHeader className="text-center pb-0">Labour Count</CardHeader>
            <CardContent>
              <MeterGauge value={gauge.labourCount} />
              <h1 className="text-center">{gauge.labourCount}</h1>
            </CardContent>
          </Card>
        </div>

        <div id="last-row" className="flex justify-evenly col-span-4">
          <Card className="shadow-md rounded-xl flex justify-center dark:bg-slate-900">
            <BarGraph />
          </Card>

          <Card className="shadow-md rounded-xl flex justify-center dark:bg-slate-900">
            <DownTimeChart />
          </Card>

          <Card className="shadow-md rounded-xl dark:bg-slate-900">
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                },
              ]}
              width={500}
              height={250}
            />
          </Card>
        </div>
      </section>
    </main>
  );
};
export default Dashboard;
