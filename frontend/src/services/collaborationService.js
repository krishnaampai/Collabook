import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

// Suggest an edit
export const suggestEdit = async ({
  notebookId,
  chapterId,
  suggestedChange,
}) => {
  if (!auth.currentUser) throw new Error("Not authenticated");

  await addDoc(collection(db, "editSuggestions"), {
    notebookId,
    chapterId,
    suggestedBy: auth.currentUser.uid,
    suggestedChange,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};

// Approve edit (OWNER ONLY)
export const approveEdit = async ({
  suggestionId,
  chapterId,
  newPdfUrl,
}) => {
  const suggestionRef = doc(db, "editSuggestions", suggestionId);
  const chapterRef = doc(db, "chapters", chapterId);

  await updateDoc(chapterRef, {
    pdfUrl: newPdfUrl,
    updatedAt: serverTimestamp(),
  });

  await updateDoc(suggestionRef, {
    status: "approved",
  });
};

// Reject edit
export const rejectEdit = async (suggestionId) => {
  const ref = doc(db, "editSuggestions", suggestionId);
  await updateDoc(ref, { status: "rejected" });
};
