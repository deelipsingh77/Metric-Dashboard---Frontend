"use client";
import Manpower from "@/models/ManpowerModel";
import Production from "@/models/ProductionModel";
import { createContext, useContext, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import Machine from "@/models/MachineModel";
import DailyMachineProduction from "@/models/DailyMachineProductionModel";
import DowntimeData from "@/models/DowntimeModel";
import ManpowerDowntimeData from "@/models/PackingDowntimeModel";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [production, setProduction] = useState([]);
  const [totalProduction, setTotalProduction] = useState(null);
  const [yearlyProduction, setYearlyProduction] = useState(null);
  const [yearlyRcProduction, setYearlyRcProduction] = useState(null);
  const [yearlyTpProduction, setYearlyTpProduction] = useState(null);
  const [yearlyCpProduction, setYearlyCpProduction] = useState(null);

  const [manpower, setManpower] = useState([]);
  const [totalManpower, setTotalManpower] = useState(null);

  const [monthlyTarget, setMonthlyTarget] = useState([]);

  const [totalMachines, setTotalMachines] = useState(null);

  const [dailyMachineProduction, setDailyMachineProduction] = useState([]);
  const [totalDailyMachineProduction, setTotalDailyMachineProduction] =
    useState(null);
  const [monthlyMachineProduction, setMonthlyMachineProduction] =
    useState(null);

  const [recentDowntime, setRecentDowntime] = useState([]);
  const [recentManpowerDowntime, setRecentManpowerDowntime] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduction = async () => {
    try {
      const data = await Production.getProductions();
      setTotalProduction(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestProductionData = async () => {
    try {
      const data = await Production.fetchLatestProductionData();
      setProduction(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchYearlyProductionData = async () => {
    try {
      const data = await Production.fetchYearlyProductionData();
      setYearlyProduction(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchYearlyRcProductionData = async () => {
    try {
      const data = await Production.fetchYearlyRcProductionData();
      setYearlyRcProduction(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchYearlyTpProductionData = async () => {
    try {
      const data = await Production.fetchYearlyTpProductionData();
      setYearlyTpProduction(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchYearlyCpProductionData = async () => {
    try {
      const data = await Production.fetchYearlyCpProductionData();
      setYearlyCpProduction(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const getManpower = async () => {
    try {
      const data = await Manpower.getManpowers();
      setTotalManpower(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestManpowerData = async () => {
    try {
      const data = await Manpower.fetchLatestManpowerData();
      setManpower(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestMonthlyTargetData = async () => {
    try {
      const data = await Production.fetchMonthlyProductionData();
      setMonthlyTarget(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getMachine = async () => {
    try {
      const data = await Machine.getMachines();
      setTotalMachines(data);
      console.log(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getDailyMachineProduction = async () => {
    try {
      const data = await DailyMachineProduction.getDailyMachineProductions();
      setTotalDailyMachineProduction(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestDailyMachineProductionData = async () => {
    try {
      const data = await DailyMachineProduction.fetchLatestMachineProduction();
      setDailyMachineProduction(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyMachineProduction = async () => {
    try {
      const data = await DailyMachineProduction.fetchMonthlyMachineProduction();
      setMonthlyMachineProduction(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentDowntime = async () => {
    try {
      const data = await DowntimeData.getDowntimeForMostRecentDay();

      const transformedDowntimeData = (fetchedData) => {
        const data = [];
        for (let hour = 0; hour < 24; hour++) {
          const hourData = fetchedData.find((item) => item.hour === hour);
          const downMachines = hourData ? hourData.machinesDown : 0;
          data.push({
            time: `${hour.toString().padStart(2, "0")}:00`,
            downMachines: downMachines,
          });
        }
        return data;
      };

      const transformedData = transformedDowntimeData(data);
      setRecentDowntime(transformedData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentManpowerDowntime = async () => {
    try {
      const data = await ManpowerDowntimeData.getDowntimeForMostRecentDay();

      const transformData = (fetchedData) => {
        const data = [];
        for (let hour = 0; hour < 24; hour++) {
          const hourData = fetchedData.find((item) => item.hour === hour);
          const downManpower = hourData ? hourData.manpowerDown : 0;
          data.push({
            time: `${hour.toString().padStart(2, "0")}:00`,
            downManpower: downManpower,
          });
        }
        return data;
      };

      const transformedData = transformData(data);
      setRecentManpowerDowntime(transformedData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduction();
    getManpower();
    getMachine();
    getDailyMachineProduction();
  }, []);

  useEffect(() => {
    fetchLatestProductionData();
    fetchYearlyProductionData();
    fetchYearlyRcProductionData();
    fetchYearlyTpProductionData();
    fetchYearlyCpProductionData();

    fetchLatestManpowerData();
    fetchLatestMonthlyTargetData();
    fetchLatestDailyMachineProductionData();
    fetchMonthlyMachineProduction();
    fetchRecentDowntime();
    fetchRecentManpowerDowntime();
  }, [
    totalProduction,
    totalManpower,
    totalMachines,
    totalDailyMachineProduction,
  ]);

  const value = {
    production,
    yearlyProduction,
    yearlyRcProduction,
    yearlyTpProduction,
    yearlyCpProduction,

    recentDowntime,
    recentManpowerDowntime,

    manpower,
    totalManpower,
    monthlyTarget,
    totalProduction,
    totalMachines,
    dailyMachineProduction,
    totalDailyMachineProduction,
    monthlyMachineProduction,
    error,
    setError,
    getProduction,
    getManpower,
    getMachine,
    getDailyMachineProduction,
    fetchRecentDowntime,
  };

  return (
    <GlobalContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
