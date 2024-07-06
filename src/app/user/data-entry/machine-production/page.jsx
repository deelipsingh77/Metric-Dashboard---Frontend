"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";
import { SuccessAlert } from "@/components/SuccessAlert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ErrorAlert } from "@/components/ErrorAlert";
import Machine from "@/models/MachineModel";
import DailyMachineProduction from "@/models/DailyMachineProductionModel";


const DailyMachineProductionPage = () => {
  const [machine, setMachine] = useState("");
  const [dailyProduction, setDailyProduction] = useState("");
  const [dailyTarget, setDailyTarget] = useState("");
  const [packingManpower, setPackingManpower] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { user } = useAuth();
  const { getDailyMachineProduction, totalDailyMachineProduction, totalMachines, error, setError } = useGlobal();

  const resetForm = () => {
    setMachine("");
    setDailyProduction("");
    setDailyTarget("");
    setPackingManpower("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      machine,
      dailyProduction,
      dailyTarget,
      packingManpower,
      userId: user?.uid,
    };

    try {
      await DailyMachineProduction.addDailyMachineProduction(data);
    } catch (e) {
      setError(e);
    }

    resetForm();

    setShowAlert((prev) => !prev);
    setTimeout(() => {
      setShowAlert(() => false);
    }, 3000);
    getDailyMachineProduction();
  };

  const machineIdToNameMap = totalMachines?.reduce((acc, machine) => {
    acc[machine.id] = machine.name;
    return acc;
  }, {});

  return (
    <main className="relative flex flex-col h-screen">
      {(showAlert && !error) && <SuccessAlert />}
      {error && <ErrorAlert error={error} />}
      <Dialog>
        <DialogTrigger>
          <Button>Add Daily Machine Production Data</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Daily Machine Production Data Entry</DialogTitle>
            <DialogDescription>
              Fill in the details below to submit daily machines production data.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <select
                id="machine"
                value={machine}
                onChange={(e) => setMachine(e.target.value)}
              >
                <option value="">Select Machine</option>
                {totalMachines?.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <Input
                id="dailyProduction"
                placeholder="Daily Production"
                type="number"
                value={dailyProduction}
                onChange={(e) => setDailyProduction(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <div className="flex gap-4">
              <Input
                id="dailyTarget"
                placeholder="Daily Target"
                type="number"
                value={dailyTarget}
                onChange={(e) => setDailyTarget(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <div className="flex gap-4">
              <Input
                id="packingManpower"
                placeholder="Packing Manpower"
                type="number"
                value={packingManpower}
                onChange={(e) => setPackingManpower(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="w-full px-4 shadow-lg rounded-xl mt-8 flex-grow">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Machine</TableHead>
              <TableHead>Daily Production</TableHead>
              <TableHead>Daily Target</TableHead>
              <TableHead>Packing Manpower</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalDailyMachineProduction?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{machineIdToNameMap[item.machine]}</TableCell>
                <TableCell>{item.dailyProduction}</TableCell>
                <TableCell>{item.dailyTarget}</TableCell>
                <TableCell>{item.packingManpower}</TableCell>
                <TableCell>
                  {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default DailyMachineProductionPage;