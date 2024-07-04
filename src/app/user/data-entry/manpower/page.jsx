"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { addDoc, Timestamp } from "firebase/firestore";
import { productionCollectionRef } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useProduction } from "@/context/ProductionContext";
import { SuccessAlert } from "@/components/SuccessAlert";

const ManPower = () => {
  const [rc, setRc] = useState("");
  const [rcTarget, setRcTarget] = useState("");
  const [tp, setTp] = useState("");
  const [tpTarget, setTpTarget] = useState("");
  const [cp, setCp] = useState("");
  const [cpTarget, setCpTarget] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

    setShowAlert((prev) => !prev);
    setTimeout(() => {
      setShowAlert(()=>false);
    }, 3000);
    getProduction();
  };

  return (
    <main className="h-[calc(100vh-100px)] relative flex justify-center items-center">
      <div>
      {showAlert && <SuccessAlert />}
        <Card className="p-5">
          <CardTitle className="text-center mb-4 text-4xl">Manpower Data</CardTitle>
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
export default ManPower;
