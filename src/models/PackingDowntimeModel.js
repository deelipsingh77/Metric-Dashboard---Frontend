import { db } from "@/config/firebase";
import { endOfDay, startOfDay } from "date-fns";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { z } from "zod";

const downtimeSchema = z.object({
  hour: z.number(),
  manpowerDown: z.number(),
  userId: z.string(),
  createdAt: z.instanceof(Date),
});

export default class PackingDowntimeData {
  static downtimeCollection = collection(db, "packingDowntime");

  static async addDowntime(hour, manpowerDown, userId) {
    try {
      const validatedData = downtimeSchema.parse({
        hour,
        manpowerDown,
        userId,
        createdAt: new Date(),
      });
      validatedData.createdAt = Timestamp.fromDate(new Date());
      return await addDoc(this.downtimeCollection, validatedData);
    } catch (error) {
      console.error("Validation error:", error.errors);
      throw error;
    }
  }

  static async getDowntime() {
    try {
      const downtimeQuery = query(
        this.downtimeCollection,
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(downtimeQuery);
      const downtimeData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return downtimeData;
    } catch (error) {
      console.error("Error fetching downtime data:", error.message);
      throw error;
    }
  }

  static async getDowntimeForMostRecentDay() {
    try {
      const mostRecentDocQuery = query(
        this.downtimeCollection,
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const mostRecentDocSnapshot = await getDocs(mostRecentDocQuery);
      if (mostRecentDocSnapshot.empty) {
        return []; // Return empty array if no documents found
      }
      const mostRecentDoc = mostRecentDocSnapshot.docs[0];
      const mostRecentCreatedAt = mostRecentDoc.data().createdAt;

      // Calculate start and end of the most recent day
      const start = startOfDay(mostRecentCreatedAt.toDate());
      const end = endOfDay(mostRecentCreatedAt.toDate());

      // Query Firestore for downtime data within the most recent day
      const q = query(
        this.downtimeCollection,
        where("createdAt", ">=", Timestamp.fromDate(start)),
        where("createdAt", "<=", Timestamp.fromDate(end)),
        orderBy("createdAt", "asc") // Optionally, you can order by createdAt ascending
      );

      const querySnapshot = await getDocs(q);
      const downtimeData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return downtimeData;
    } catch (error) {
      console.error(
        "Error fetching downtime data for most recent day:",
        error.message
      );
      throw error;
    }
  }
}
