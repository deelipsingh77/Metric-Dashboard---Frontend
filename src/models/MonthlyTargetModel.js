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

const monthlyTargetSchema = z.object({
  rcTarget: z.number().nonnegative(),
  tpTarget: z.number().nonnegative(),
  cpTarget: z.number().nonnegative(),
  userId: z.string(),
  createdAt: z.instanceof(Date),
});

export default class MonthlyTarget {
  static monthlyTargetCollection = collection(db, "monthlyTarget");

  static async addMonthlyTarget(data) {
    try {
      const validatedData = monthlyTargetSchema.parse({
        rcTarget: Number(data.rcTarget),
        tpTarget: Number(data.tpTarget),
        cpTarget: Number(data.cpTarget),
        userId: data.userId,
        createdAt: new Date(),
      });
      validatedData.createdAt = Timestamp.fromDate(new Date());
      return await addDoc(this.monthlyTargetCollection, validatedData);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static async getMonthlyTargets() {
    try {
      const querySnapshot = await getDocs(this.monthlyTargetCollection);
      const monthlyTargetData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return monthlyTargetData;
    } catch (error) {
      console.error("Error fetching monthly target data:", error);
      throw error;
    }
  }

  static async fetchLatestMonthlyTargetData() {
    try {
      const q = query(
        this.monthlyTargetCollection,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestData = querySnapshot.docs[0].data();
        return [latestData];
      } else {
        console.log("No documents found in monthly target collection.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching latest monthly target data:", error);
      throw error;
    }
  }
}
