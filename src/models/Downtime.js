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

const downtimeSchema = z.object({
  machine: z.string(),
  machinesDown: z.number().nonnegative(),
  manpowerDown: z.number().nonnegative(),
  userId: z.string(),
  createdAt: z.instanceof(Date),
});

export default class DailyMachineProduction {
  static downtimeCollection = collection(db, "downtime");

  static async addDowntime(data) {
    try {
      const validatedData = downtimeSchema.parse({
        machine: data.machine,
        machinesDown: Number(data.machinesDown),
        manpowerDown: Number(data.manpowerDown),
        userId: data.userId,
        createdAt: new Date(),
      });
      validatedData.createdAt = Timestamp.fromDate(new Date());
      return await addDoc(this.downtimeCollection, validatedData);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static async getDowntimes() {
    try {
      const querySnapshot = await getDocs(this.downtimeCollection);
      const downtimeData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return downtimeData;
    } catch (error) {
      console.error("Error fetching daily downtime data:", error);
      throw error;
    }
  }

  static async fetchLatestDowntime() {
    try {
      const q = query(
        this.downtimeCollection,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestData = querySnapshot.docs[0].data();
        return [latestData];
      } else {
        console.log("No documents found in daily downtime collection.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching latest daily downtime data:", error);
      throw error;
    }
  }
}
