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

const productionSchema = z.object({
  rc: z.number().nonnegative(),
  rcTarget: z.number().nonnegative(),
  tp: z.number().nonnegative(),
  tpTarget: z.number().nonnegative(),
  cp: z.number().nonnegative(),
  cpTarget: z.number().nonnegative(),
  createdAt: z.instanceof(Date),
});

export default class Production {
  static productionCollection = collection(db, "production");

  static async addProduction(data) {
    try {
      const validatedData = productionSchema.parse({
        ...data,
        rc: Number(data.rc),
        rcTarget: Number(data.rcTarget),
        tp: Number(data.tp),
        tpTarget: Number(data.tpTarget),
        cp: Number(data.cp),
        cpTarget: Number(data.cpTarget),
        createdAt: new Date(),
      });
      validatedData.createdAt = Timestamp.fromDate(new Date());
      return await addDoc(this.productionCollection, validatedData);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static async getProductions() {
    try {
      const querySnapshot = await getDocs(this.productionCollection);
      const productionData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return productionData;
    } catch (error) {
      console.error("Error fetching production data:", error.message);
      throw error;
    }
  }

  static async fetchLatestProductionData() {
    try {
      const q = query(
        this.productionCollection,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestData = querySnapshot.docs[0].data();
        return [latestData];
      } else {
        console.log("No documents found in production collection.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching latest production data:", error.message);
      throw error;
    }
  }
}
