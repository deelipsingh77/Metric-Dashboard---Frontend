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
import Manpower from "@/models/ManpowerModel";
import { ErrorAlert } from "@/components/ErrorAlert";

const ManPower = () => {
  const [rc, setRc] = useState("");
  const [tp, setTp] = useState("");
  const [cp, setCp] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { user } = useAuth();
  const { getManpower, totalManpower, error, setError } = useProduction();

  const resetForm = () => {
    setRc("");
    setTp("");
    setCp("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      rc,
      tp,
      cp,
      userId: user?.uid,
    };

    try {
      await Manpower.addManpower(data);
    } catch (e) {
      setError(e);
    }

    resetForm();

    setShowAlert((prev) => !prev);
    setTimeout(() => {
      setShowAlert(() => false);
    }, 3000);
    getManpower();
  };

  return (
    <main className="relative flex flex-col h-screen">
      {(showAlert && !error) && <SuccessAlert />}
      {error && <ErrorAlert error={error} />}
      <Dialog>
        <DialogTrigger>
          <Button>Add Manpower Data</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manpower Data Entry</DialogTitle>
            <DialogDescription>
              Fill in the details below to submit manpower data.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Input
                id="rc"
                placeholder="RC"
                type="number"
                value={rc}
                onChange={(e) => setRc(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <div className="flex gap-4">
              <Input
                id="tp"
                placeholder="TP"
                type="number"
                value={tp}
                onChange={(e) => setTp(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <div className="flex gap-4">
              <Input
                id="cp"
                placeholder="CP"
                type="number"
                value={cp}
                onChange={(e) => setCp(e.target.value)}
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
              <TableHead>RC</TableHead>
              <TableHead>TP</TableHead>
              <TableHead>CP</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalManpower?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.rc}</TableCell>
                <TableCell>{item.tp}</TableCell>
                <TableCell>{item.cp}</TableCell>
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

export default ManPower;
