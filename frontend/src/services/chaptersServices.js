import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

// Save chapter metadata (PDF)
export const saveChapter = async ({
  title,
  pdfUrl,
  notebookId,
}) => {
  if (!auth.currentUser) {
    throw new Error("Not logged in");
  }

  await addDoc(collection(db, "chapters"), {
    title,
    pdfUrl,
    notebookId,
    ownerId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  });
};
