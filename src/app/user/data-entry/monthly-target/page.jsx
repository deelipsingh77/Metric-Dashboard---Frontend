"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProduction } from "@/context/ProductionContext";
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
import MonthlyTarget from "@/models/MonthlyTargetModel";
import { ErrorAlert } from "@/components/ErrorAlert";


const MonthlyTargetPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [rcTarget, setRcTarget] = useState("");
  const [tpTarget, setTpTarget] = useState("");
  const [cpTarget, setCpTarget] = useState("");

  const { user } = useAuth();
  const { getMonthlyTarget, totalMonthlyTarget, error, setError } = useProduction();

  const resetForm = () => {
    setRcTarget("");
    setTpTarget("");
    setCpTarget("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      rcTarget,
      tpTarget,
      cpTarget,
      userId: user?.uid,
    };

    try {
      await MonthlyTarget.addMonthlyTarget(data);
    } catch (e) {
      setError(e) 
    }

    resetForm();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    getMonthlyTarget();
  };

  return (
    <main className="relative flex flex-col h-screen">
      {(showAlert && !error) && <SuccessAlert />}
      {error && <ErrorAlert error={error} />}
      <Dialog>
        <DialogTrigger>
          <Button>Add Monthly Target</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Monthly Target Data Entry</DialogTitle>
            <DialogDescription>
              Fill in the details below to submit monthly target data.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Input
                id="rcTarget"
                placeholder="RC Target"
                type="number"
                value={rcTarget}
                onChange={(e) => setRcTarget(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
              <Input
                id="tpTarget"
                placeholder="TP Target"
                type="number"
                value={tpTarget}
                onChange={(e) => setTpTarget(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
              <Input
                id="cpTarget"
                placeholder="CP Target"
                type="number"
                value={cpTarget}
                onChange={(e) => setCpTarget(e.target.value)}
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
              <TableHead>RC Target</TableHead>
              <TableHead>TP Target</TableHead>
              <TableHead>CP Target</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalMonthlyTarget?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.rcTarget}</TableCell>
                <TableCell>{item.tpTarget}</TableCell>
                <TableCell>{item.cpTarget}</TableCell>
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

export default MonthlyTargetPage;
