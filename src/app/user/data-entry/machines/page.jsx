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


const Machines = () => {
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { user } = useAuth();
  const { getMachine, totalMachines, error, setError } = useGlobal();

  const resetForm = () => {
    setName("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      userId: user?.uid,
    };

    try {
      await Machine.addMachine(data);
    } catch (e) {
      setError(e);
    }

    resetForm();

    setShowAlert((prev) => !prev);
    setTimeout(() => {
      setShowAlert(() => false);
    }, 3000);
    getMachine();
  };

  return (
    <main className="relative flex flex-col h-screen">
      {(showAlert && !error) && <SuccessAlert />}
      {error && <ErrorAlert error={error} />}
      <Dialog>
        <DialogTrigger>
          <Button>Add Machines Data</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Machines Data Entry</DialogTitle>
            <DialogDescription>
              Fill in the details below to submit machines data.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Input
                id="machine"
                placeholder="Machine Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <TableHead>Machines</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalMachines?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
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

export default Machines;