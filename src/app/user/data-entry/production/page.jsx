"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addDoc, Timestamp } from "firebase/firestore";
import { productionCollectionRef } from "@/config/firebase";
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

const DataEntry = () => {
  const [rc, setRc] = useState("");
  const [rcTarget, setRcTarget] = useState("");
  const [tp, setTp] = useState("");
  const [tpTarget, setTpTarget] = useState("");
  const [cp, setCp] = useState("");
  const [cpTarget, setCpTarget] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { user } = useAuth();
  const { getProduction, totalProduction } = useProduction();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();
    const timestamp = Timestamp.fromDate(now);
    const data = {
      rc,
      rcTarget,
      tp,
      tpTarget,
      cp,
      cpTarget,
      userId: user?.uid,
      createdAt: timestamp,
    };
    try {
      await addDoc(productionCollectionRef, data);
    } catch (e) {
      console.log(e.message);
    }

    setTp("");
    setCp("");
    setRc("");
    setTpTarget("");
    setCpTarget("");
    setRcTarget("");

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    getProduction();
  };

  return (
    <main className="relative flex flex-col">
      {showAlert && <SuccessAlert />}
      <Dialog>
        <DialogTrigger>
          <Button>Add Production Data</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Production Data Entry</DialogTitle>
            <DialogDescription>
              Fill in the details below to submit production data.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Input
                id="rc"
                placeholder="RC"
                type="text"
                value={rc}
                onChange={(e) => setRc(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
              <Input
                id="rcTarget"
                placeholder="RC Target"
                type="number"
                value={rcTarget}
                onChange={(e) => setRcTarget(e.target.value)}
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
              <Input
                id="tpTarget"
                placeholder="TP Target"
                type="number"
                value={tpTarget}
                onChange={(e) => setTpTarget(e.target.value)}
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

      <div className="w-full px-4 shadow-lg rounded-xl">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>RC</TableHead>
              <TableHead>RC Target</TableHead>
              <TableHead>TP</TableHead>
              <TableHead>TP Target</TableHead>
              <TableHead>CP</TableHead>
              <TableHead>CP Target</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalProduction.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.rc}</TableCell>
                <TableCell>{item.rcTarget}</TableCell>
                <TableCell>{item.tp}</TableCell>
                <TableCell>{item.tpTarget}</TableCell>
                <TableCell>{item.cp}</TableCell>
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

export default DataEntry;
