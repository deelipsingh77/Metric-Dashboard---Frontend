"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { addDoc, getDocs, Timestamp } from "firebase/firestore";
import { productionCollectionRef } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useProduction } from "@/context/ProductionContext";

const DataEntry = () => {
  const [rc, setRc] = useState("");
  const [rcTarget, setRcTarget] = useState("");
  const [tp, setTp] = useState("");
  const [tpTarget, setTpTarget] = useState("");
  const [cp, setCp] = useState("");
  const [cpTarget, setCpTarget] = useState("");

  const { user } = useAuth();
  const { getProduction } = useProduction();

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
    await addDoc(productionCollectionRef, data);
    getProduction();
  };

  return (
    <main className="h-[calc(100vh-100px)] flex justify-center items-center">
      <div>
        <Card className="p-5">
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
                placeholder="Target"
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
                placeholder="Target"
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
                placeholder="Target"
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
export default DataEntry;
