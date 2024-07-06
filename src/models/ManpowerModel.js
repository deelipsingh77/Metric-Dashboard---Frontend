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

export default class Manpower {
  static manpowerCollection = collection(db, "manpower");

  static async addManpower(data) {
    try {
      data.createdAt = Timestamp.fromDate(new Date());
      return await addDoc(this.manpowerCollection, data);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static async getManpowers() {
    try {
      const querySnapshot = await getDocs(this.manpowerCollection);
      const manpowerData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return manpowerData;
    } catch (error) {
      console.error("Error fetching manpower data:", error);
      throw error;
    }
  }

  static async fetchLatestManpowerData() {
    try {
      const q = query(
        this.manpowerCollection,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestData = querySnapshot.docs[0].data();
        return [latestData];
      } else {
        console.log("No documents found in manpower collection.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching latest manpower data:", error);
      throw error;
    }
  }
}
