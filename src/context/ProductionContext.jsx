"use client";
import { productionCollectionRef } from "@/config/firebase";
import { getDocs, limit, orderBy, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const ProductionContext = createContext();

export const ProductionProvider = ({ children }) => {
  const [production, setProduction] = useState([]);
  const [totalProduction, setTotalProduction] = useState(null);
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

  useEffect(() => {
    // getProduction();
    fetchLatestProductionData();
  }, [totalProduction]);

  const value = {
    production,
    loading,
    error,
    getProduction
  };

  return (
    <ProductionContext.Provider value={value}>
      {!loading && children}
    </ProductionContext.Provider>
  );
};

export const useProduction = () => useContext(ProductionContext);
