import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export const addChapter = async ({ notebookId, title, pdfUrl }) => {
  if (!auth.currentUser) {
    throw new Error("User not logged in");
  }

  await addDoc(collection(db, "chapters"), {
    notebookId,
    title,
    pdfUrl,
    createdBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  });
};
