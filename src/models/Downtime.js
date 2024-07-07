import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { z } from "zod";

const DowntimeHourlyData = z.object({
  hour: z.number().int().min(0).max(23),
  machinesDown: z.number().int().min(0),
});

const DowntimeDailyData = z.object({
  userId: z.string(),
  date: z.instanceof(Date),
  createdAt: z.instanceof(Date),
  hourlyData: z.array(DowntimeHourlyData),
});

export default class DowntimeData {
  static downtimeCollection = collection(db, "downtime");

  static async addDowntime(data) {
    try {
      const validatedData = DowntimeDailyData.parse({
        userId: data.userId,
        date: data.date,
        createdAt: new Date(),
        hourlyData: data.hourlyData,
      });
      validatedData.createdAt = Timestamp.fromDate(new Date());
      return await addDoc(this.downtimeCollection, validatedData);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static async getDowntime() {
    try {
      const downtimeQuery = query(this.downtimeCollection, orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(downtimeQuery);
      const downtimeData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return downtimeData;
    } catch (error) {
      console.error("Error fetching downtime data:", error);
      throw error;
    }
  }
}
