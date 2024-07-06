"use client";
import Manpower from "@/models/ManpowerModel";
import Production from "@/models/ProductionModel";
import MonthlyTarget from "@/models/MonthlyTargetModel";
import { createContext, useContext, useEffect, useState } from "react";
import Loading from "@/components/Loading";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [production, setProduction] = useState([]);
  const [totalProduction, setTotalProduction] = useState(null);

  const [manpower, setManpower] = useState([]);
  const [totalManpower, setTotalManpower] = useState(null);

  const [monthlyTarget, setMonthlyTarget] = useState([]);
  const [totalMonthlyTarget, setTotalMonthlyTarget] = useState(null);

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

  useEffect(() => {
    getProduction();
    getManpower();
    getMonthlyTarget();
  }, []);

  useEffect(() => {
    fetchLatestProductionData();
    fetchLatestManpowerData();
    fetchLatestMonthlyTargetData();
  }, [totalProduction, totalManpower, totalMonthlyTarget]);

  const value = {
    production,
    manpower,
    totalManpower,
    monthlyTarget,
    totalMonthlyTarget,
    totalProduction,
    error,
    setError,
    getProduction,
    getManpower,
    getMonthlyTarget,
  };

  return (
    <GlobalContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
