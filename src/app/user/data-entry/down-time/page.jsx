"use client";
import { useEffect, useState } from "react";
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
import DowntimeData from "@/models/DowntimeModel";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DowntimeEntry = () => {
  const [hour, setHour] = useState(0);
  const [machinesDown, setMachinesDown] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [downtimeData, setDowntimeData] = useState([]);

  const { user } = useAuth();
  const { error, setError, fetchRecentDowntime } = useGlobal();

  const resetForm = () => {
    setHour(0);
    setMachinesDown("");
  };

  const fetchData = async () => {
    const data = await DowntimeData.getDowntime();
    console.log(data);
    setDowntimeData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await DowntimeData.addDowntime(
        hour,
        parseInt(machinesDown) || 0,
        user?.uid
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      fetchData();
      fetchRecentDowntime();
    } catch (error) {
      setError(error);
    }
    resetForm();
  };

  return (
    <main className="relative flex flex-col">
      {showAlert && !error && <SuccessAlert />}
      {error && <ErrorAlert error={error} />}
      <Dialog>
        <DialogTrigger>
          <Button>Add Downtime Data</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Downtime Data Entry</DialogTitle>
            <DialogDescription>
              Select the hour and enter the number of machines down for that
              hour.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <select
                value={hour}
                onChange={(e) => setHour(parseInt(e.target.value))}
              >
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Machines Down"
                type="number"
                value={machinesDown}
                onChange={(e) => setMachinesDown(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="w-full px-4 shadow-lg rounded-xl mt-8">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Hour</TableHead>
              <TableHead>Machines Down</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {downtimeData?.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.hour}</TableCell>
                <TableCell>{data.machinesDown}</TableCell>
                <TableCell>
                  {data.createdAt.toDate().toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default DowntimeEntry;
