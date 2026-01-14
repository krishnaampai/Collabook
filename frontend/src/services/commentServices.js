import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

/* Normal comment */
export const addComment = async ({ notebookId, text }) => {
  if (!auth.currentUser) {
    throw new Error("User not logged in");
  }

  await addDoc(collection(db, "comments"), {
    notebookId,
    type: "comment",
    text,
    requestedBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  });
};

/* Request to add new chapter */
export const requestChapter = async ({ notebookId, title, pdfUrl }) => {
  if (!auth.currentUser) {
    throw new Error("User not logged in");
  }

  await addDoc(collection(db, "comments"), {
    notebookId,
    type: "chapter_request",
    title,
    pdfUrl,
    requestedBy: auth.currentUser.uid,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};

/* Owner approves chapter request */
export const approveChapterRequest = async ({
  requestId,
  notebookId,
  title,
  pdfUrl,
}) => {
  // create chapter
  await addDoc(collection(db, "chapters"), {
    notebookId,
    title,
    pdfUrl,
    createdBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  });

  // mark request approved
  await updateDoc(doc(db, "comments", requestId), {
    status: "approved",
  });
};

/* Owner rejects request */
export const rejectChapterRequest = async (requestId) => {
  await updateDoc(doc(db, "comments", requestId), {
    status: "rejected",
  });
};
