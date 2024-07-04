"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { addDoc, Timestamp } from "firebase/firestore";
import { monthlyTargetCollectionRef } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useProduction } from "@/context/ProductionContext";
import { SuccessAlert } from "@/components/SuccessAlert";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManPower = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [month, setMonth ] = useState("")
  const [year, setYear] = useState("");
  const [rcTarget, setRcTarget] = useState("");
  const [tpTarget, setTpTarget] = useState("");
  const [cpTarget, setCpTarget] = useState("");

  const { user } = useAuth();
  const { getManpower } = useProduction();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();
    const timestamp = Timestamp.fromDate(now);
    const data = {
      month: month,
      year: year,
      rcTarget: rcTarget,
      tpTarget: tpTarget,
      cpTarget: cpTarget,
      userId: user?.uid,
      createdAt: timestamp,
    };
    try {
      await addDoc(monthlyTargetCollectionRef, data);
    } catch (e) {
      console.log(e.message);
    }

    setMonth("");
    setYear("");
    setRcTarget("");
    setTpTarget("");
    setCpTarget("");
    setShowAlert((prev) => !prev);
    setTimeout(() => {
      setShowAlert(() => false);
    }, 3000);
    getManpower();
  };

  return (
    <main className="h-[calc(100vh-100px)] relative flex justify-center items-center">
      <div>
        {showAlert && <SuccessAlert />}
        <Card className="p-5">
          <CardTitle className="text-center mb-4 text-4xl">
            Monthly Target
          </CardTitle>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Select onValueChange={(value) => setMonth(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="march">March</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="june">June</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="august">August</SelectItem>
                  <SelectItem value="september">September</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                  <SelectItem value="november">November</SelectItem>
                  <SelectItem value="december">December</SelectItem>
                </SelectContent>
              </Select>

              <Input
                id="year"
                placeholder="Year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />

            </div>
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
        </Card>
      </div>
    </main>
  );
};
export default ManPower;
