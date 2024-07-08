import NeedlePieChart from "@/components/NeedlePieChart";
import { Card, CardHeader } from "@/components/ui/card";
import {gauge} from "@/utils/data";

const MonthlyDashboard = () => {
  return (
    <main>
      <section className="grid grid-cols-5">
        <Card className="flex flex-col min-h-60 dark:bg-slate-900">
          <CardHeader className="text-center pb-0 font-bold text-xl">RC</CardHeader>
          <NeedlePieChart value={gauge.rc} />
          <h1 className="text-center text-2xl font-bold pb-4">{gauge.rc}</h1>
        </Card>
        <Card className="flex flex-col min-h-60 dark:bg-slate-900">
          <CardHeader className="text-center pb-0 font-bold text-xl">TP</CardHeader>
          <NeedlePieChart value={gauge.tp} />
          <h1 className="text-center text-2xl font-bold pb-4">{gauge.tp}</h1>
        </Card>
        <Card className="flex flex-col min-h-60 dark:bg-slate-900">
          <CardHeader className="text-center pb-0 font-bold text-xl">CP</CardHeader>
          <NeedlePieChart value={gauge.cp} />
          <h1 className="text-center text-2xl font-bold pb-4">{gauge.cp}</h1>
        </Card>
        <Card className="flex flex-col min-h-60 dark:bg-slate-900">
          <CardHeader className="text-center pb-0 font-bold text-xl">Manpower</CardHeader>
          <NeedlePieChart value={gauge.labourCount} />
          <h1 className="text-center text-2xl font-bold pb-4">{gauge.labourCount}</h1>
        </Card>
        <Card className="flex flex-col min-h-60 dark:bg-slate-900">
          <CardHeader className="text-center pb-0 font-bold text-xl">Total Production Target</CardHeader>
          <NeedlePieChart value={150} />
          <h1 className="text-center text-2xl font-bold pb-4">100</h1>
        </Card>
      </section>
    </main>
  );
};
export default MonthlyDashboard;
