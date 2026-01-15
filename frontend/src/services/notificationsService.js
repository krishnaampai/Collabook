import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const createNotification = async ({
  userId,
  text,
  type,
  notebookId,
}) => {
  await addDoc(collection(db, "notifications"), {
    userId,
    text,
    type,
    notebookId,
    isRead: false,
    createdAt: serverTimestamp(),
  });
};
