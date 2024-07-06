import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { z } from "zod";

const dailyMachineProductionSchema = z.object({
  machine: z.string(),
  dailyProduction: z.number().nonnegative(),
  dailyTarget: z.number().nonnegative(),
  packingManpower: z.number().nonnegative(),
  userId: z.string(),
  createdAt: z.instanceof(Date),
});

export default class DailyMachineProduction {
  static dailyMachineProductionCollection = collection(db, "dailyMachineProduction");

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

  static async getDailyMachineProductions() {
    try {
      const querySnapshot = await getDocs(this.dailyMachineProductionCollection);
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

  static async fetchLatestMachineProdction() {
    try {
      const q = query(
        this.dailyMachineProductionCollection,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestData = querySnapshot.docs[0].data();
        return [latestData];
      } else {
        console.log("No documents found in daily machines collection.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching latest daily machines data:", error);
      throw error;
    }
  }
}
