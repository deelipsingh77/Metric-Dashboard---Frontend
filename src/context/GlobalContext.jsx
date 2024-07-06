"use client";
import Manpower from "@/models/ManpowerModel";
import Production from "@/models/ProductionModel";
import MonthlyTarget from "@/models/MonthlyTargetModel";
import { createContext, useContext, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import Machine from "@/models/MachineModel";
import DailyMachineProduction from "@/models/DailyMachineProductionModel";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [production, setProduction] = useState([]);
  const [totalProduction, setTotalProduction] = useState(null);

  const [manpower, setManpower] = useState([]);
  const [totalManpower, setTotalManpower] = useState(null);

  const [monthlyTarget, setMonthlyTarget] = useState([]);
  const [totalMonthlyTarget, setTotalMonthlyTarget] = useState(null);

  const [totalMachines, setTotalMachines] = useState(null);

  const [dailyMachineProduction, setDailyMachineProduction] = useState([]);
  const [totalDailyMachineProduction, setTotalDailyMachineProduction] = useState(null);
  const [monthlyMachineProduction, setMonthlyMachineProduction] = useState(null);

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

  const getMonthlyTarget = async () => {
    try {
      const data = await MonthlyTarget.getMonthlyTargets();
      setTotalMonthlyTarget(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestMonthlyTargetData = async () => {
    try {
      const data = await MonthlyTarget.fetchLatestMonthlyTargetData();
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
  }

  const fetchLatestDailyMachineProductionData = async () => {
    try {
      const data = await DailyMachineProduction.fetchLatestMachineProduction();
      setDailyMachineProduction(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const fetchMonthlyMachineProduction = async () => {
    try {
      const data = await DailyMachineProduction.fetchMonthlyMachineProduction();
      setMonthlyMachineProduction(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  } 

  useEffect(() => {
    getProduction();
    getManpower();
    getMonthlyTarget();
    getMachine();
    getDailyMachineProduction();
  }, []);

  useEffect(() => {
    fetchLatestProductionData();
    fetchLatestManpowerData();
    fetchLatestMonthlyTargetData();
    fetchLatestDailyMachineProductionData();
    fetchMonthlyMachineProduction();
  }, [totalProduction, totalManpower, totalMonthlyTarget, totalMachines, totalDailyMachineProduction]);

  const value = {
    production,
    manpower,
    totalManpower,
    monthlyTarget,
    totalMonthlyTarget,
    totalProduction,
    totalMachines,
    dailyMachineProduction,
    totalDailyMachineProduction,
    monthlyMachineProduction,
    error,
    setError,
    getProduction,
    getManpower,
    getMonthlyTarget,
    getMachine,
    getDailyMachineProduction,
  };

  return (
    <GlobalContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
