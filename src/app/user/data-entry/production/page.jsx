"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import Production from "@/models/ProductionModel";
import { ErrorAlert } from "@/components/ErrorAlert";
import * as XLSX from "xlsx";

const DataEntry = () => {
  const [rc, setRc] = useState("");
  const [rcTarget, setRcTarget] = useState("");
  const [tp, setTp] = useState("");
  const [tpTarget, setTpTarget] = useState("");
  const [cp, setCp] = useState("");
  const [cpTarget, setCpTarget] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { user } = useAuth();
  const { getProduction, totalProduction, error, setError } = useGlobal();

  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    // readExcel();
  };

  useEffect(() => {
    if (file) {
      readExcel();
    }
  }, [file]);

  const handleUpload = async (e) => {
    e.preventDefault();
    await Production.addMultipleProductions(fileUploaded, user?.uid);
    setFile(null);
    setFileUploaded([]);
    getProduction();
  };

  const readExcel = () => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const filteredRecords = jsonData.filter((row) => {
        return Object.values(row).some(
          (cell) => cell !== null && cell !== undefined && cell !== ""
        );
      });

      // Separate header and records
      const [header, ...records] = filteredRecords;

      // Expected header fields
      const expectedHeader = [
        "rc",
        "rcTarget",
        "tp",
        "tpTarget",
        "cp",
        "cpTarget",
        "createdAt",
      ];

      // Check if header contains all required fields
      const isHeaderValid = expectedHeader.every((col) => header.includes(col));

      if (!isHeaderValid) {
        setError(new Error("Invalid header format"));
        return;
      }

      const formattedRecords = records.map((record) => {
        const recordObj = {};
        header.forEach((col, index) => {
          if (col === "createdAt") {
            const excelDate = record[index];
            const jsDate = XLSX.SSF.parse_date_code(excelDate);
            recordObj[col] = new Date(jsDate.y, jsDate.m - 1, jsDate.d);
          } else {
            recordObj[col] = record[index];
          }
        });
        return recordObj;
      });

      console.log(formattedRecords);
      setFileUploaded(formattedRecords);
    };

    reader.onerror = (err) => {
      setError(new Error("Error reading file"));
    };

    reader.readAsBinaryString(file);
  };

  const resetForm = () => {
    setTp("");
    setCp("");
    setRc("");
    setTpTarget("");
    setCpTarget("");
    setRcTarget("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      rc,
      rcTarget,
      tp,
      tpTarget,
      cp,
      cpTarget,
      userId: user?.uid,
    };
    try {
      await Production.addProduction(data);
    } catch (error) {
      setError(error);
    }
    resetForm();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    getProduction();
  };

  return (
    <main className="relative flex flex-col">
      {showAlert && !error && <SuccessAlert />}
      {error && <ErrorAlert error={error} />}
      <div className="flex gap-4 justify-center mb-4">
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
                  type="number"
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

        <Dialog>
          <DialogTrigger>
            <Button>Add Excel Data</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Excel File</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <form onSubmit={handleUpload}>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                />
                <Button type="submit">Submit</Button>
              </form>
              {fileUploaded.length > 0 && (
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
                    {fileUploaded.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.rc}</TableCell>
                        <TableCell>{item.rcTarget}</TableCell>
                        <TableCell>{item.tp}</TableCell>
                        <TableCell>{item.tpTarget}</TableCell>
                        <TableCell>{item.cp}</TableCell>
                        <TableCell>{item.cpTarget}</TableCell>
                        <TableCell>
                          {item.createdAt instanceof Date
                            ? item.createdAt.toLocaleDateString()
                            : "Invalid Date"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
