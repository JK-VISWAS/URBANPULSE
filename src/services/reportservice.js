import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createReport = async (reportData) => {
  try {
    const docRef = await addDoc(collection(db, "reports"), {
      ...reportData,
      status: "pending", // Default status
      votes: 0,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding report: ", error);
    throw error;
  }
};