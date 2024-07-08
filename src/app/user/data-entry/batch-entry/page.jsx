"use client";
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
import Production from "@/models/ProductionModel";
import Manpower from "@/models/ManpowerModel";
import { ErrorAlert } from "@/components/ErrorAlert";
import * as XLSX from "xlsx";
import DowntimeData from "@/models/DowntimeModel";
import PackingDowntimeData from "@/models/PackingDowntimeModel";
import DailyMachineProduction from "@/models/DailyMachineProductionModel";

const BatchEntry = () => {
  const [showAlert, setShowAlert] = useState(false);

  const { user } = useAuth();
  const {
    error,
    setError,
    getProduction,
    getManpower,
    fetchRecentDowntime,
    fetchRecentManpowerDowntime,
    totalMachines,
    getDailyMachineProduction,
  } = useGlobal();

  const [file, setFile] = useState(null);

  const [production, setProduction] = useState([]);
  const [downtime, setDowntime] = useState([]);
  const [packingDowntime, setPackingDowntime] = useState([]);
  const [machine, setMachine] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  useEffect(() => {
    if (file) {
      readExcel();
    } else {
      setProduction([]);
      setDowntime([]);
      setPackingDowntime([]);
      setMachine([]);
    }
  }, [file]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const productionData = [];
    const manpowerData = [];

    production?.forEach((item) => {
      productionData.push({
        rc: item.rc,
        rcTarget: item.rcTarget,
        tp: item.tp,
        tpTarget: item.tpTarget,
        cp: item.cp,
        cpTarget: item.cpTarget,
        pf: item.pf,
        cpt: item.cpt,
        createdAt: item.createdAt,
      });

      manpowerData.push({
        rc: item.rcManpower,
        tp: item.tpManpower,
        cp: item.cpManpower,
        createdAt: item.createdAt,
      });
    });

    productionData &&
      (await Production.addMultipleProductions(productionData, user?.uid));
    manpowerData &&
      (await Manpower.addMultipleManpower(manpowerData, user?.uid));
    downtime && (await DowntimeData.addMultipleDowntime(downtime, user?.uid));
    packingDowntime &&
      (await PackingDowntimeData.addMultipleDowntime(
        packingDowntime,
        user?.uid
      ));

    //Convert Machine Name to Machine Id
    const machineData = [];
    machine?.forEach((item) => {
      const machineId = totalMachines.find(
        (machine) => machine.name === item.machine
      )?.id;
      machineData.push({
        machine: machineId,
        dailyProduction: item.dailyProduction,
        dailyTarget: item.dailyTarget,
        packingManpower: item.packingManpower,
        createdAt: item.createdAt,
      });
    });

    machine &&
      (await DailyMachineProduction.addMultipleMachineProductions(
        machineData,
        user?.uid
      ));

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    setFile(null);
    setProduction([]);
    setDowntime([]);
    setPackingDowntime([]);
    setMachine([]);

    //Refresh Data Tables
    getProduction();
    getManpower();
    fetchRecentDowntime();
    fetchRecentManpowerDowntime();
    getDailyMachineProduction();
  };

  const filterRecords = (jsonData) => {
    return jsonData.filter((row) => {
      return Object.values(row).some(
        (cell) => cell !== null && cell !== undefined && cell !== ""
      );
    });
  };

  const formatRecords = (records, header) => {
    return records.map((record) => {
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
  };

  const readExcel = () => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const sheetName1 = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetName1];
      const jsonData = XLSX.utils.sheet_to_json(sheet1, { header: 1 });

      const sheetName2 = workbook.SheetNames[1];
      const sheet2 = workbook.Sheets[sheetName2];
      const jsonData2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 });

      const sheetName3 = workbook.SheetNames[2];
      const sheet3 = workbook.Sheets[sheetName3];
      const jsonData3 = XLSX.utils.sheet_to_json(sheet3, { header: 1 });

      const sheetName4 = workbook.SheetNames[3];
      const sheet4 = workbook.Sheets[sheetName4];
      const jsonData4 = XLSX.utils.sheet_to_json(sheet4, { header: 1 });

      //Filter Empty Records
      const filteredRecords1 = filterRecords(jsonData);
      const filteredRecords2 = filterRecords(jsonData2);
      const filteredRecords3 = filterRecords(jsonData3);
      const filteredRecords4 = filterRecords(jsonData4);

      // Separate header and records
      const [productionHeader, ...productionRecords] = filteredRecords1;
      const [downtimeHeader, ...downtimeRecords] = filteredRecords2;
      const [packingDowntimeHeader, ...packingDowntimeRecords] =
        filteredRecords3;
      const [machineHeader, ...machineRecords] = filteredRecords4;

      // Expected header fields
      const expectedProductionHeader = [
        "rc",
        "rcTarget",
        "rcManpower",
        "tp",
        "tpTarget",
        "tpManpower",
        "cp",
        "cpTarget",
        "cpManpower",
        "pf",
        "cpt",
        "createdAt",
      ];

      const expectedDowntimeHeader = ["hour", "machinesDown", "createdAt"];

      const expectedPackingDowntimeHeader = [
        "hour",
        "manpowerDown",
        "createdAt",
      ];

      const expectedMachineHeader = [
        "machine",
        "dailyProduction",
        "dailyTarget",
        "packingManpower",
        "createdAt",
      ];

      const machinesEnum = totalMachines.map((machine) => machine.name);

      // Check if header contains all required fields
      const isProductionHeaderValid = expectedProductionHeader.every((col) =>
        productionHeader?.includes(col)
      );
      const isDowntimeHeaderValid = expectedDowntimeHeader.every((col) =>
        downtimeHeader?.includes(col)
      );
      const isPackingDowntimeHeaderValid = expectedPackingDowntimeHeader.every(
        (col) => packingDowntimeHeader?.includes(col)
      );
      const isMachineHeaderValid = expectedMachineHeader.every((col) =>
        machineHeader?.includes(col)
      );
      const isMachineRecordValid = machineRecords.every((record) =>
        machinesEnum.includes(record[0])
      );

      if (
        !isProductionHeaderValid &&
        !isDowntimeHeaderValid &&
        !isPackingDowntimeHeaderValid &&
        !isMachineHeaderValid
      ) {
        setError(new Error("Invalid header format"));
        return;
      }

      if (!isMachineRecordValid) {
        setError(new Error("Invalid machine name"));
        return;
      }

      //Format Data Here
      const formattedProductionRecords = formatRecords(
        productionRecords,
        productionHeader
      );
      setProduction(formattedProductionRecords);

      const formattedDowntimeRecords = formatRecords(
        downtimeRecords,
        downtimeHeader
      );
      setDowntime(formattedDowntimeRecords);

      const formattedPackingDowntimeRecords = formatRecords(
        packingDowntimeRecords,
        packingDowntimeHeader
      );
      setPackingDowntime(formattedPackingDowntimeRecords);

      const formattedMachineRecords = formatRecords(
        machineRecords,
        machineHeader
      );
      setMachine(formattedMachineRecords);
    };

    reader.onerror = (err) => {
      setError(new Error("Error reading file"));
    };

    reader.readAsBinaryString(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Optional: Add some visual feedback like changing the border color
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFiles = event.dataTransfer.files[0];
    setFile(droppedFiles);
  };

  return (
    <main className="relative flex flex-col">
      {showAlert && !error && <SuccessAlert />}
      {error && <ErrorAlert error={error} />}
      <div>
        {!file && (
          <div className="w-full flex justify-center h-[90vh] items-center text-2xl">
            <label htmlFor="fileInput" className="cursor-pointer">
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-dashed border-slate-200 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer h-[50vh] w-[50vw]"
              >
                <p>Drag and drop your Excel Spreadsheet file here (.xlsx or .xls)</p>
                <p>or,</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                  accept=".xlsx, .xls"
                />
                Click to select files
              </div>
            </label>
          </div>
        )}
        {file && (
          <div className="flex justify-between m-4">
            <h3>File: {file.name}</h3>
            <div className="flex gap-4">
              <Button onClick={handleUpload}>Upload</Button>
              <Button onClick={() => setFile(null)}>Choose Another</Button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-y-auto">
        {production.length > 0 && (
          <h1 className="text-2xl text-center font-bold m-4">Production</h1>
        )}
        {production.length > 0 && (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>RC</TableHead>
                <TableHead>RC Target</TableHead>
                <TableHead>RC Manpower</TableHead>
                <TableHead>TP</TableHead>
                <TableHead>TP Target</TableHead>
                <TableHead>TP Manpower</TableHead>
                <TableHead>CP</TableHead>
                <TableHead>CP Target</TableHead>
                <TableHead>CP Manpower</TableHead>
                <TableHead>PF</TableHead>
                <TableHead>CPT</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {production.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.rc}</TableCell>
                  <TableCell>{item.rcTarget}</TableCell>
                  <TableCell>{item.rcManpower}</TableCell>
                  <TableCell>{item.tp}</TableCell>
                  <TableCell>{item.tpTarget}</TableCell>
                  <TableCell>{item.tpManpower}</TableCell>
                  <TableCell>{item.cp}</TableCell>
                  <TableCell>{item.cpTarget}</TableCell>
                  <TableCell>{item.cpManpower}</TableCell>
                  <TableCell>{item.pf}</TableCell>
                  <TableCell>{item.cpt}</TableCell>
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
        {downtime.length > 0 && (
          <h1 className="text-2xl text-center font-bold m-4">
            Production Downtime
          </h1>
        )}
        {downtime.length > 0 && (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Hour</TableHead>
                <TableHead>Machines Down</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {downtime.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.hour}</TableCell>
                  <TableCell>{item.machinesDown}</TableCell>
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
        {packingDowntime.length > 0 && (
          <h1 className="text-2xl text-center font-bold m-4">
            Packing Downtime
          </h1>
        )}
        {packingDowntime.length > 0 && (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Hour</TableHead>
                <TableHead>Manpower Down</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packingDowntime.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.hour}</TableCell>
                  <TableCell>{item.manpowerDown}</TableCell>
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
        {machine.length > 0 && (
          <h1 className="text-2xl text-center font-bold m-4">Machine</h1>
        )}
        {machine.length > 0 && (
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
              {machine.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.machine}</TableCell>
                  <TableCell>{item.dailyProduction}</TableCell>
                  <TableCell>{item.dailyTarget}</TableCell>
                  <TableCell>{item.packingManpower}</TableCell>
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

      {/* <div className="w-full px-4 shadow-lg rounded-xl">
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
      </div> */}
    </main>
  );
};

export default BatchEntry;
