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
import { useProduction } from "@/context/ProductionContext";

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
  const { production } = useProduction();
  const data = {
    rc: parseInt(production[0]?.rc) || 0,
    tp: parseInt(production[0]?.tp) || 0,
    cp: parseInt(production[0]?.cp) || 0,
    rcTarget: parseInt(production[0]?.rcTarget) || 0,
    tpTarget: parseInt(production[0]?.tpTarget) || 0,
    cpTarget: parseInt(production[0]?.cpTarget) || 0,
  };

  return (
    <main>
      <section id="dashboard" className="grid grid-cols-12 gap-4">
        <Card className="shadow-md dark:bg-slate-900 col-span-12 sm:col-span-3">
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

        <Card className="shadow-md dark:bg-slate-900 col-span-12 sm:col-span-3">
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

        <Card className="shadow-md dark:bg-slate-900 col-span-12 sm:col-span-3">
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

      <Card className="sm:row-span-2 shadow-md flex flex-col dark:bg-slate-900 col-span-12 sm:col-span-3">
          <CardHeader className="p-0 text-center text-2xl font-semibold pt-3">
            Monthly Target
          </CardHeader>
          <CardContent className="flex sm:flex-col items-center justify-around h-full">
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full">
              <Smileys value={gauge.rc} />
              <div className="grow">
                <h1 className="text-3xl font-bold text-center">{gauge.rc}%</h1>
                <h2 className="text-center">RC</h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full">
              <Smileys value={gauge.tp} />
              <div className="grow">
                <h1 className="text-3xl font-bold text-center">{gauge.tp}%</h1>
                <h2 className="text-center">TP</h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full">
              <Smileys value={gauge.cp} />
              <div className="grow">
                <h1 className="text-3xl font-bold text-center">{gauge.cp}%</h1>
                <h2 className="text-center">CP</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              RC
            </CardHeader>
            <NeedlePieChart value={data.rc} total={data.rcTarget}/>
            <h1 className="text-center text-2xl font-bold pb-4">{data.rc}</h1>
          </Card>
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              TP
            </CardHeader>
            <NeedlePieChart value={data.tp} total={data.tpTarget}/>
            <h1 className="text-center text-2xl font-bold pb-4">{data.tp}</h1>
          </Card>
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              CP
            </CardHeader>
            <NeedlePieChart value={data.cp} total={data.cpTarget}/>
            <h1 className="text-center text-2xl font-bold pb-4">{data.cp}</h1>
          </Card>
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              Production
            </CardHeader>
            <NeedlePieChart value={data.tp + data.rc + data.cp} total={data.tpTarget + data.rcTarget + data.cpTarget}/>
            <h1 className="text-center text-2xl font-bold pb-4">
              {data.tp + data.rc + data.cp}
            </h1>
          </Card>
        </div>

        <div
          id="last-row"
          className="grid grid-cols-1 sm:grid-cols-4 justify-evenly col-span-12 gap-4"
        >
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">Total</CardHeader>
            <CardContent className="p-0">
              <BarGraph monthlyProductionData={monthlyProductionData} />
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">RC</CardHeader>
            <CardContent className="p-0">
              <BarGraph monthlyProductionData={monthlyProductionData} />
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">TP</CardHeader>
            <CardContent className="p-0">
              <BarGraph monthlyProductionData={monthlyProductionData} />
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">CP</CardHeader>
            <CardContent className="p-0">
              <BarGraph monthlyProductionData={monthlyProductionData} />
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-md col-span-12 rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
          <CardHeader className="font-semibold p-2 text-lg">Down Time</CardHeader>
          <DownTimeChart width={window.innerWidth < 640 ? 350 : 1250} />
        </Card>
      </section>
    </main>
  );
};
export default Dashboard;
