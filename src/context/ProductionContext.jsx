"use client";
import {
  productionCollectionRef,
  manpowerCollectionRef,
  monthlyTargetCollectionRef,
} from "@/config/firebase";
import { getDocs, limit, orderBy, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const ProductionContext = createContext();

export const ProductionProvider = ({ children }) => {
  const [production, setProduction] = useState([]);
  const [totalProduction, setTotalProduction] = useState(null);
  const [manpower, setManpower] = useState([]);
  const [totalManpower, setTotalManpower] = useState(null);
  
  const [monthlyTarget, setMonthlyTarget] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduction = async () => {
    try {
      const data = await getDocs(productionCollectionRef);
      const productionData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTotalProduction(productionData);
      console.log(productionData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getManpower = async () => {
    try {
      const data = await getDocs(manpowerCollectionRef);
      const manpowerData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTotalManpower(manpowerData);
      console.log(manpowerData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestManpowerData = async () => {
    try {
      const q = query(
        manpowerCollectionRef,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestData = querySnapshot.docs[0].data();
        setManpower([latestData]);
        console.log("Latest manpower data:", latestData);
        // return latestData;
      } else {
        console.log("No documents found in manpower collection.");
        setManpower([]);
        return null;
      }
    } catch (error) {
      console.error("Error fetching latest manpower data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestProductionData = async () => {
    try {
      const q = query(
        productionCollectionRef,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestData = querySnapshot.docs[0].data();
        setProduction([latestData]);
        console.log("Latest production data:", latestData);
        // return latestData;
      } else {
        console.log("No documents found in production collection.");
        setProduction([]);
        return null;
      }
    } catch (error) {
      console.error("Error fetching latest production data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestMonthlyTargetData = async () => {
    try {
      const q = query(
        monthlyTargetCollectionRef,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestData = querySnapshot.docs[0].data();
        setMonthlyTarget([latestData]);
        console.log("Latest monthly target data:", latestData);
        // return latestData;
      } else {
        console.log("No documents found in monthly target collection.");
        setMonthlyTarget([]);
        return null;
      }
    } catch (error) {
      console.error("Error fetching latest monthly target data:", error);
      throw error;
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    getProduction();
  }, []);

  useEffect(() => {
    fetchLatestProductionData();
    fetchLatestManpowerData();
    fetchLatestMonthlyTargetData();
  }, [totalProduction, totalManpower]);

  const value = {
    production,
    manpower,
    monthlyTarget,
    totalProduction,
    loading,
    error,
    getProduction,
    getManpower,
  };

  return (
    <ProductionContext.Provider value={value}>
      {!loading && children}
    </ProductionContext.Provider>
  );
};

export const useProduction = () => useContext(ProductionContext);
