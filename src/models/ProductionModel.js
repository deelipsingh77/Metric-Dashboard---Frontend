import { db } from "@/config/firebase";
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
  writeBatch,
  doc,
} from "firebase/firestore";
import { z } from "zod";

const productionSchema = z.object({
  rc: z.number().nonnegative(),
  rcTarget: z.number().nonnegative(),
  tp: z.number().nonnegative(),
  tpTarget: z.number().nonnegative(),
  cp: z.number().nonnegative(),
  cpTarget: z.number().nonnegative(),
  userId: z.string(),
  createdAt: z.instanceof(Date),
});

export default class Production {
  static productionCollection = collection(db, "production");

  static async addProduction(data) {
    try {
      if (data.createdAt) {
        data.createdAt = new Date(data.createdAt);
      } else {
        data.createdAt = new Date();
      }
      const validatedData = productionSchema.parse({
        ...data,
        rc: Number(data.rc),
        rcTarget: Number(data.rcTarget),
        tp: Number(data.tp),
        tpTarget: Number(data.tpTarget),
        cp: Number(data.cp),
        cpTarget: Number(data.cpTarget),
        userId: data.userId,
      });
      validatedData.createdAt = Timestamp.fromDate(data.createdAt);
      return await addDoc(this.productionCollection, validatedData);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static async addMultipleProductions(dataArray, userId) {
    const batch = writeBatch(db);
    try {
      dataArray.forEach((data) => {
        if (data.createdAt) {
          data.createdAt = new Date(data.createdAt);
        } else {
          data.createdAt = new Date();
        }
        const validatedData = productionSchema.parse({
          ...data,
          rc: Number(data.rc),
          rcTarget: Number(data.rcTarget),
          tp: Number(data.tp),
          tpTarget: Number(data.tpTarget),
          cp: Number(data.cp),
          cpTarget: Number(data.cpTarget),
          userId: userId,
        });
        validatedData.createdAt = Timestamp.fromDate(data.createdAt);
        const docRef = doc(this.productionCollection);
        batch.set(docRef, validatedData);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error adding multiple productions:", error.message);
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

  static async fetchMonthlyProductionData() {
    try {
      const start = startOfMonth(new Date());
      const end = endOfMonth(new Date());

      const q = query(
        this.productionCollection,
        where("createdAt", ">=", Timestamp.fromDate(start)),
        where("createdAt", "<=", Timestamp.fromDate(end))
      );

      const querySnapshot = await getDocs(q);

      let totalRc = 0,
        totalTp = 0,
        totalCp = 0,
        totalRcTarget = 0,
        totalTpTarget = 0,
        totalCpTarget = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalRc += Number(data.rc);
        totalTp += Number(data.tp);
        totalCp += Number(data.cp);
        totalRcTarget += Number(data.rcTarget);
        totalTpTarget += Number(data.tpTarget);
        totalCpTarget += Number(data.cpTarget);
      });

      return {
        totalRc,
        totalTp,
        totalCp,
        totalRcTarget,
        totalTpTarget,
        totalCpTarget,
      };
    } catch (error) {
      console.error("Error fetching monthly production data:", error.message);
      throw error;
    }
  }

  static async fetchYearlyProductionData() {
    try {
      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;

      const startCurrentYear = startOfYear(new Date(currentYear, 0, 1));
      const endCurrentYear = endOfYear(new Date(currentYear, 11, 31));

      const startPreviousYear = startOfYear(new Date(previousYear, 0, 1));
      const endPreviousYear = endOfYear(new Date(previousYear, 11, 31));

      const qCurrentYear = query(
        this.productionCollection,
        where("createdAt", ">=", Timestamp.fromDate(startCurrentYear)),
        where("createdAt", "<=", Timestamp.fromDate(endCurrentYear))
      );

      const qPreviousYear = query(
        this.productionCollection,
        where("createdAt", ">=", Timestamp.fromDate(startPreviousYear)),
        where("createdAt", "<=", Timestamp.fromDate(endPreviousYear))
      );

      const [querySnapshotCurrentYear, querySnapshotPreviousYear] =
        await Promise.all([getDocs(qCurrentYear), getDocs(qPreviousYear)]);

      let monthlyProductionData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("en-US", { month: "short" }),
        ProductionCurrentYear: 0,
        ProductionLastYear: 0,
      }));

      querySnapshotCurrentYear.forEach((doc) => {
        const data = doc.data();
        const month = new Date(data.createdAt.toDate()).getMonth();
        monthlyProductionData[month].ProductionCurrentYear +=
          Number(data.rc) + Number(data.tp) + Number(data.cp);
      });

      querySnapshotPreviousYear.forEach((doc) => {
        const data = doc.data();
        const month = new Date(data.createdAt.toDate()).getMonth();
        monthlyProductionData[month].ProductionLastYear +=
          Number(data.rc) + Number(data.tp) + Number(data.cp);
      });

      return monthlyProductionData;
    } catch (error) {
      console.error("Error fetching yearly production data:", error.message);
      throw error;
    }
  }

  static async fetchYearlyRcProductionData() {
    try {
      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;

      const startCurrentYear = startOfYear(new Date(currentYear, 0, 1));
      const endCurrentYear = endOfYear(new Date(currentYear, 11, 31));

      const startPreviousYear = startOfYear(new Date(previousYear, 0, 1));
      const endPreviousYear = endOfYear(new Date(previousYear, 11, 31));

      const qCurrentYear = query(
        this.productionCollection,
        where("createdAt", ">=", Timestamp.fromDate(startCurrentYear)),
        where("createdAt", "<=", Timestamp.fromDate(endCurrentYear))
      );

      const qPreviousYear = query(
        this.productionCollection,
        where("createdAt", ">=", Timestamp.fromDate(startPreviousYear)),
        where("createdAt", "<=", Timestamp.fromDate(endPreviousYear))
      );

      const [querySnapshotCurrentYear, querySnapshotPreviousYear] =
        await Promise.all([getDocs(qCurrentYear), getDocs(qPreviousYear)]);

      let monthlyRcProductionData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("en-US", { month: "short" }),
        ProductionCurrentYear: 0,
        ProductionLastYear: 0,
      }));

      querySnapshotCurrentYear.forEach((doc) => {
        const data = doc.data();
        const month = new Date(data.createdAt.toDate()).getMonth();
        monthlyRcProductionData[month].ProductionCurrentYear += Number(data.rc);
      });

      querySnapshotPreviousYear.forEach((doc) => {
        const data = doc.data();
        const month = new Date(data.createdAt.toDate()).getMonth();
        monthlyRcProductionData[month].ProductionLastYear += Number(data.rc);
      });

      return monthlyRcProductionData;
    } catch (error) {
      console.error("Error fetching yearly rc production data:", error.message);
      throw error;
    }
  }

  static async fetchYearlyTpProductionData() {
    try {
      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;

      const startCurrentYear = startOfYear(new Date(currentYear, 0, 1));
      const endCurrentYear = endOfYear(new Date(currentYear, 11, 31));

      const startPreviousYear = startOfYear(new Date(previousYear, 0, 1));
      const endPreviousYear = endOfYear(new Date(previousYear, 11, 31));

      const qCurrentYear = query(
        this.productionCollection,
        where("createdAt", ">=", Timestamp.fromDate(startCurrentYear)),
        where("createdAt", "<=", Timestamp.fromDate(endCurrentYear))
      );

      const qPreviousYear = query(
        this.productionCollection,
        where("createdAt", ">=", Timestamp.fromDate(startPreviousYear)),
        where("createdAt", "<=", Timestamp.fromDate(endPreviousYear))
      );

      const [querySnapshotCurrentYear, querySnapshotPreviousYear] =
        await Promise.all([getDocs(qCurrentYear), getDocs(qPreviousYear)]);

      let monthlyTpProductionData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("en-US", { month: "short" }),
        ProductionCurrentYear: 0,
        ProductionLastYear: 0,
      }));

      querySnapshotCurrentYear.forEach((doc) => {
        const data = doc.data();
        const month = new Date(data.createdAt.toDate()).getMonth();
        monthlyTpProductionData[month].ProductionCurrentYear += Number(data.tp);
      });

      querySnapshotPreviousYear.forEach((doc) => {
        const data = doc.data();
        const month = new Date(data.createdAt.toDate()).getMonth();
        monthlyTpProductionData[month].ProductionLastYear += Number(data.tp);
      });

      return monthlyTpProductionData;
    } catch (error) {
      console.error("Error fetching yearly tp production data:", error.message);
      throw error;
    }
  }

  static async fetchYearlyCpProductionData() {
    try {
      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;

      const startCurrentYear = startOfYear(new Date(currentYear, 0, 1));
      const endCurrentYear = endOfYear(new Date(currentYear, 11, 31));

      const startPreviousYear = startOfYear(new Date(previousYear, 0, 1));
      const endPreviousYear = endOfYear(new Date(previousYear, 11, 31));

      const qCurrentYear = query(
        this.productionCollection,
        where("createdAt", ">=", Timestamp.fromDate(startCurrentYear)),
        where("createdAt", "<=", Timestamp.fromDate(endCurrentYear))
      );

      const qPreviousYear = query(
        this.productionCollection,
        where("createdAt", ">=", Timestamp.fromDate(startPreviousYear)),
        where("createdAt", "<=", Timestamp.fromDate(endPreviousYear))
      );

      const [querySnapshotCurrentYear, querySnapshotPreviousYear] =
        await Promise.all([getDocs(qCurrentYear), getDocs(qPreviousYear)]);

      let monthlyCpProductionData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("en-US", { month: "short" }),
        ProductionCurrentYear: 0,
        ProductionLastYear: 0,
      }));

      querySnapshotCurrentYear.forEach((doc) => {
        const data = doc.data();
        const month = new Date(data.createdAt.toDate()).getMonth();
        monthlyCpProductionData[month].ProductionCurrentYear += Number(data.cp);
      });

      querySnapshotPreviousYear.forEach((doc) => {
        const data = doc.data();
        const month = new Date(data.createdAt.toDate()).getMonth();
        monthlyCpProductionData[month].ProductionLastYear += Number(data.cp);
      });

      return monthlyCpProductionData;
    } catch (error) {
      console.error("Error fetching yearly cp production data:", error.message);
      throw error;
    }
  }
}
