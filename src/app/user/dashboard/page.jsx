"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Smileys from "@/components/Smileys";
import { data, monthlyProductionData } from "@/utils/data";
import DownTimeChart from "@/components/DownTimeChart";
import ManpowerDowntimeChart from "@/components/ManpowerDowntimeChart";
import BarGraph from "@/components/BarGraph";
import MachineBarGraph from "@/components/MachineBarGraph";
import NeedlePieChart from "@/components/NeedlePieChart";
import { DataTable } from "@/components/DataTable";
import { useGlobal } from "@/context/GlobalContext";
import { useEffect, useState } from "react";
import { isSameMonth } from "date-fns";

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
  const {
    production,
    yearlyProduction,
    yearlyRcProduction,
    yearlyTpProduction,
    yearlyCpProduction,

    recentDowntime,
    recentManpowerDowntime,

    manpower,
    dailyMachineProduction,
    monthlyTarget,
    monthlyMachineProduction,
    totalMachines,
  } = useGlobal();

  const transformMachineData = (machineId) => {
    const dailyMachineData = dailyMachineProduction.find(
      (item) => item.machine === machineId
    );

    const monthlyMachineData = monthlyMachineProduction[machineId];

    if (!dailyMachineData || !monthlyMachineData) {
      console.log(`Data not found for machine ${machineId}`);
      return null;
    }

    const { dailyProduction, dailyTarget } = dailyMachineData;
    const { totalProduction, totalTarget, month } = monthlyMachineData;

    return [
      {
        month: month,
        dailyProduction,
        dailyTarget,
        monthlyProduction: totalProduction,
        monthlyTarget: totalTarget,
      },
    ];
  };

  const productionData = {
    rc: parseInt(production[0]?.rc) || 0,
    tp: parseInt(production[0]?.tp) || 0,
    cp: parseInt(production[0]?.cp) || 0,
    rcTarget: parseInt(production[0]?.rcTarget) || 0,
    tpTarget: parseInt(production[0]?.tpTarget) || 0,
    cpTarget: parseInt(production[0]?.cpTarget) || 0,
  };

  const manpowerData = {
    rc: parseInt(manpower[0]?.rc) || 0,
    tp: parseInt(manpower[0]?.tp) || 0,
    cp: parseInt(manpower[0]?.cp) || 0,
    rcTarget: parseInt(manpower[0]?.rcTarget) || 0,
    tpTarget: parseInt(manpower[0]?.tpTarget) || 0,
    cpTarget: parseInt(manpower[0]?.cpTarget) || 0,
  };

  const machineIdToName = totalMachines.reduce((acc, machine) => {
    acc[machine.id] = machine.name;
    return acc;
  }, {});

  const packingManpowerData = dailyMachineProduction.map((machine) => ({
    name: machineIdToName[machine.machine],
    manpower: machine.packingManpower,
  }));

  return (
    <main>
      <section id="dashboard" className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-3 grid grid-cols-2 gap-4">
          <Card className="shadow-md dark:bg-slate-900 col-span-1 sm:col-span-1">
            <CardHeader>
              <CardTitle>PF</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-3xl">99</CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-md dark:bg-slate-900 col-span-1 sm:col-span-1">
            <CardHeader>
              <CardTitle>CPT</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-3xl">14.5</CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md dark:bg-slate-900 col-span-12 sm:col-span-3">
          <CardHeader>
            <CardTitle>Daily Packing Manpower</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="w-full">
              <table className="w-full border-white">
                <thead>
                  <tr>
                    {totalMachines.map((machine) => (
                      <th key={machine.id}>{machine.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {totalMachines.map((machine) => (
                      <td key={machine.id} className="text-center">
                        {packingManpowerData.find(
                          (data) => data.name === machine.name
                        )?.manpower || "-"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-md dark:bg-slate-900 col-span-12 sm:col-span-3">
          <CardHeader>
            <CardTitle>Daily Production Manpower</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={[
                {
                  rc: manpowerData.rc,
                  tp: manpowerData.tp,
                  cp: manpowerData.cp,
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
              <Smileys
                value={
                  (monthlyTarget.totalRc / monthlyTarget.totalRcTarget) * 100
                }
              />
              <div className="grow">
                <h1 className="text-3xl font-bold text-center">
                  {parseInt(
                    (monthlyTarget.totalRc / monthlyTarget.totalRcTarget) * 100
                  )}
                  %
                </h1>
                <h2 className="text-center">RC</h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full">
              <Smileys
                value={
                  (monthlyTarget.totalTp / monthlyTarget.totalTpTarget) * 100
                }
              />
              <div className="grow">
                <h1 className="text-3xl font-bold text-center">
                  {parseInt(
                    (monthlyTarget.totalTp / monthlyTarget.totalTpTarget) * 100
                  )}
                  %
                </h1>
                <h2 className="text-center">TP</h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full">
              <Smileys
                value={
                  (monthlyTarget.totalCp / monthlyTarget.totalCpTarget) * 100
                }
              />
              <div className="grow">
                <h1 className="text-3xl font-bold text-center">
                  {parseInt(
                    (monthlyTarget.totalCp / monthlyTarget.totalCpTarget) * 100
                  )}
                  %
                </h1>
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
            <NeedlePieChart
              value={productionData.rc}
              total={productionData.rcTarget}
            />
            <h1 className="text-center text-2xl font-bold pb-4">
              {productionData.rcTarget} <sub>T</sub> / {productionData.rc}{" "}
              <sub>P</sub>
            </h1>
          </Card>
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              TP
            </CardHeader>
            <NeedlePieChart
              value={productionData.tp}
              total={productionData.tpTarget}
            />
            <h1 className="text-center text-2xl font-bold pb-4">
              {productionData.tpTarget} <sub>T</sub> / {productionData.tp}{" "}
              <sub>P</sub>
            </h1>
          </Card>
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              CP
            </CardHeader>
            <NeedlePieChart
              value={productionData.cp}
              total={productionData.cpTarget}
            />
            <h1 className="text-center text-2xl font-bold pb-4">
              {productionData.cpTarget} <sub>T</sub> / {productionData.cp}{" "}
              <sub>P</sub>
            </h1>
          </Card>
          <Card className="flex flex-col min-h-60 dark:bg-slate-900">
            <CardHeader className="text-center pb-0 font-bold text-xl">
              Production
            </CardHeader>
            <NeedlePieChart
              value={productionData.tp + productionData.rc + productionData.cp}
              total={
                productionData.tpTarget +
                productionData.rcTarget +
                productionData.cpTarget
              }
            />
            <h1 className="text-center text-2xl font-bold pb-4">
              {productionData.tpTarget +
                productionData.rcTarget +
                productionData.cpTarget}{" "}
              <sub>T</sub> /{" "}
              {productionData.tp + productionData.rc + productionData.cp}{" "}
              <sub>P</sub>
            </h1>
          </Card>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 justify-evenly col-span-12 gap-4">
          {totalMachines?.map((machine) => (
            <Card
              key={machine.id}
              className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900"
            >
              <CardHeader className="font-semibold p-2 text-lg">
                {machine.name}
              </CardHeader>
              <CardContent className="p-0">
                <MachineBarGraph
                  monthlyProductionData={transformMachineData(machine.id)}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          id="last-row"
          className="grid grid-cols-1 sm:grid-cols-4 justify-evenly col-span-12 gap-4"
        >
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">Total</CardHeader>
            <CardContent className="p-0">
              <BarGraph monthlyProductionData={yearlyProduction} />
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">RC</CardHeader>
            <CardContent className="p-0">
              <BarGraph monthlyProductionData={yearlyRcProduction} />
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">TP</CardHeader>
            <CardContent className="p-0">
              <BarGraph monthlyProductionData={yearlyTpProduction} />
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
            <CardHeader className="font-semibold p-2 text-lg">CP</CardHeader>
            <CardContent className="p-0">
              <BarGraph monthlyProductionData={yearlyCpProduction} />
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-md col-span-12 rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
          <CardHeader className="font-semibold p-2 text-lg">
            Production Down Time
          </CardHeader>
          <DownTimeChart data={recentDowntime} width={window.innerWidth < 640 ? 350 : 1250} />
        </Card>
        <Card className="shadow-md col-span-12 rounded-xl flex flex-col justify-center items-center dark:bg-slate-900">
          <CardHeader className="font-semibold p-2 text-lg">
            Packing Down Time
          </CardHeader>
          <ManpowerDowntimeChart data={recentManpowerDowntime} width={window.innerWidth < 640 ? 350 : 1250} />
        </Card>
      </section>
    </main>
  );
};
export default Dashboard;
