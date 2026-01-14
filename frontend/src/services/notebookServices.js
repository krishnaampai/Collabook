import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

// Create a notebook
export const createNotebook = async (title) => {
  if (!auth.currentUser) {
    throw new Error("User not logged in");
  }

  const docRef = await addDoc(collection(db, "notebooks"), {
    title,
    ownerId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  });

  return docRef.id; // notebookId
};
