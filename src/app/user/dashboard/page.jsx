"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Smileys from "@/components/Smileys";
import { gauge, monthlyProductionData } from "@/utils/data";
import DownTimeChart from "@/components/DownTimeChart";
import BarGraph from "@/components/BarGraph";
import NeedlePieChart from "@/components/NeedlePieChart";
import { DataTable } from "@/components/DataTable";

export const columns = [
  {
    accessorKey: "rc",
    header: "RC",
  },
  {
    accessorKey: "tp",
    header: "TP",
  },
  {
    accessorKey: "cp",
    header: "CP",
  },
];

const Dashboard = () => {
  return (
    <main>
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
            <CardTitle>Daily Labour Count</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
              erat nec felis ultricies rutrum.
            </CardDescription> */}
            <DataTable
              columns={columns}
              data={[
                {
                  rc: gauge.rc,
                  tp: gauge.tp,
                  cp: gauge.cp,
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="row-span-2 shadow-md flex flex-col dark:bg-slate-900">
          <CardHeader className="p-0 text-center text-2xl font-semibold pt-3">
            Monthly Target
          </CardHeader>
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

        <div className="col-span-3 grid grid-cols-4 gap-2">
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              RC
            </CardHeader>
            <NeedlePieChart value={gauge.rc} total={100}/>
            <h1 className="text-center text-2xl font-bold pb-4">{gauge.rc}</h1>
          </Card>
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              TP
            </CardHeader>
            <NeedlePieChart value={gauge.tp} total={100}/>
            <h1 className="text-center text-2xl font-bold pb-4">{gauge.tp}</h1>
          </Card>
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              CP
            </CardHeader>
            <NeedlePieChart value={gauge.cp} total={100}/>
            <h1 className="text-center text-2xl font-bold pb-4">{gauge.cp}</h1>
          </Card>
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              Production
            </CardHeader>
            <NeedlePieChart value={gauge.tp + gauge.rc + gauge.cp} total={300}/>
            <h1 className="text-center text-2xl font-bold pb-4">
              {gauge.tp + gauge.rc + gauge.cp}
            </h1>
          </Card>
        </div>

        <div
          id="last-row"
          className="grid grid-cols-4 justify-evenly col-span-4 gap-2"
        >
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">Total</CardHeader>
            <CardContent>
              <BarGraph monthlyProductionData={monthlyProductionData} />
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">RC</CardHeader>
            <CardContent>
              <BarGraph monthlyProductionData={monthlyProductionData} />
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">TP</CardHeader>
            <CardContent>
              <BarGraph monthlyProductionData={monthlyProductionData} />
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">CP</CardHeader>
            <CardContent>
              <BarGraph monthlyProductionData={monthlyProductionData} />
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-md col-span-4 rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
          <CardHeader className="font-semibold p-2 text-lg">Down Time</CardHeader>
          <DownTimeChart width={1250} />
        </Card>
      </section>
    </main>
  );
};
export default Dashboard;
