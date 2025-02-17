import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { z } from "zod";
import { startOfMonth, endOfMonth, format } from "date-fns";

const dailyMachineProductionSchema = z.object({
  machine: z.string(),
  dailyProduction: z.number().nonnegative(),
  dailyTarget: z.number().nonnegative(),
  packingManpower: z.number().nonnegative(),
  userId: z.string(),
  createdAt: z.instanceof(Date),
});

export default class DailyMachineProduction {
  static dailyMachineProductionCollection = collection(
    db,
    "dailyMachineProduction"
  );

  static async addDailyMachineProduction(data) {
    try {
      const validatedData = dailyMachineProductionSchema.parse({
        machine: data.machine,
        dailyProduction: Number(data.dailyProduction),
        dailyTarget: Number(data.dailyTarget),
        packingManpower: Number(data.packingManpower),
        userId: data.userId,
        createdAt: new Date(),
      });
      validatedData.createdAt = Timestamp.fromDate(new Date());
      return await addDoc(this.dailyMachineProductionCollection, validatedData);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static async addMultipleMachineProductions(dataArray, userId) {
    const batch = writeBatch(db);
    try {
      dataArray.forEach((data) => {
        if (data.createdAt) {
          data.createdAt = new Date(data.createdAt);
        } else {
          data.createdAt = new Date();
        }
        const validatedData = dailyMachineProductionSchema.parse({
          ...data,
          machine: data.machine,
          dailyProduction: Number(data.dailyProduction),
          dailyTarget: Number(data.dailyTarget),
          packingManpower: Number(data.packingManpower),
          userId: userId,
        });
        validatedData.createdAt = Timestamp.fromDate(data.createdAt);
        const docRef = doc(this.dailyMachineProductionCollection);
        batch.set(docRef, validatedData);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error adding multiple productions:", error.message);
      throw error;
    }
  }

  static async getDailyMachineProductions() {
    try {
      const querySnapshot = await getDocs(
        this.dailyMachineProductionCollection
      );
      const dailyMachineData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return dailyMachineData;
    } catch (error) {
      console.error("Error fetching daily machines data:", error);
      throw error;
    }
  }

  static async fetchLatestMachineProduction() {
    try {
      const machinesSnapshot = await getDocs(collection(db, "machine"));
      const machineIds = machinesSnapshot.docs.map((doc) => doc.id);

      const promises = machineIds.map(async (machineId) => {
        const machineQuery = query(
          this.dailyMachineProductionCollection,
          where("machine", "==", machineId),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(machineQuery);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          return { ...data, id: querySnapshot.docs[0].id };
        } else {
          console.log(`No data found for machine ${machineId}`);
        }
        return null;
      });

      const results = await Promise.all(promises);
      const latestData = results.filter((result) => result !== null);

      return latestData;
    } catch (error) {
      console.error("Error fetching latest daily machines data:", error);
      throw error;
    }
  }

  static async fetchMonthlyMachineProduction() {
    try {
      const currentMonthStart = startOfMonth(new Date());
      const currentMonthEnd = endOfMonth(new Date());

      const querySnapshot = await getDocs(
        query(
          this.dailyMachineProductionCollection,
          where("createdAt", ">=", currentMonthStart),
          where("createdAt", "<=", currentMonthEnd)
        )
      );

      const monthlyProductionData = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { machine, dailyProduction, dailyTarget, packingManpower } = data;
        const monthName = format(
          new Date(data.createdAt.seconds * 1000),
          "MMMM"
        );

        if (!monthlyProductionData[machine]) {
          monthlyProductionData[machine] = {
            totalProduction: 0,
            totalTarget: 0,
            totalPackingManpower: 0,
            month: monthName,
          };
        }

        monthlyProductionData[machine].totalProduction += dailyProduction;
        monthlyProductionData[machine].totalTarget += dailyTarget;
        monthlyProductionData[machine].totalPackingManpower += packingManpower;
      });

      return monthlyProductionData;
    } catch (error) {
      console.error("Error fetching monthly machine production data:", error);
      throw error;
    }
  }
}
