import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { z } from "zod";

const machineSchema = z.object({
  name: z.string(),
  userId: z.string(),
  createdAt: z.instanceof(Date),
});

export default class Machine {
  static machineCollection = collection(db, "machine");

  static async addMachine(data) {
    try {
      const validatedData = machineSchema.parse({
        name: data.name,
        userId: data.userId,
        createdAt: new Date(),
      });
      validatedData.createdAt = Timestamp.fromDate(new Date());
      return await addDoc(this.machineCollection, validatedData);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static async getMachines() {
    try {
      const querySnapshot = await getDocs(this.machineCollection);
      const machinesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return machinesData;
    } catch (error) {
      console.error("Error fetching machines data:", error);
      throw error;
    }
  }
}
