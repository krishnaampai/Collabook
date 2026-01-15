import { addDoc, collection, serverTimestamp, updateDoc, doc,getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { createNotification } from "./notificationsService";

/* Normal comment */
export const addComment = async ({ notebookId, text }) => {
  if (!auth.currentUser) throw new Error("User not logged in");

  await addDoc(collection(db, "comments"), {
    notebookId,
    type: "comment",
    text,
    requestedBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  });

  const notebookSnap = await getDoc(doc(db, "notebooks", notebookId));
  const { ownerId, title } = notebookSnap.data();

  await createNotification({
    userId: ownerId,
    type: "comment",
    notebookId,
    notebookTitle: title,
    text: `New comment on "${title}"`,
  });
};


/* Request to add new chapter */
export const requestChapter = async ({ notebookId, title, pdfUrl }) => {
  if (!auth.currentUser) throw new Error("User not logged in");

  await addDoc(collection(db, "comments"), {
    notebookId,
    type: "chapter_request",
    title,
    pdfUrl,
    requestedBy: auth.currentUser.uid,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  const notebookSnap = await getDoc(doc(db, "notebooks", notebookId));
  const { ownerId, title: notebookTitle } = notebookSnap.data();

  await createNotification({
    userId: ownerId,
    type: "chapter_request",
    notebookId,
    notebookTitle,
    text: `Someone wants to add a new chapter to your notebook -  "${notebookTitle}"`,
  });
};


/* Owner approves chapter request */
export const approveChapterRequest = async ({
  requestId,
  notebookId,
  title,
  pdfUrl,
  requestedBy,
}) => {
  await addDoc(collection(db, "chapters"), {
    notebookId,
    title,
    pdfUrl,
    createdBy: requestedBy,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "comments", requestId), {
    status: "approved",
  });

  const notebookSnap = await getDoc(doc(db, "notebooks", notebookId));
  const { title: notebookTitle } = notebookSnap.data();

  await createNotification({
    userId: requestedBy,
    type: "approved",
    notebookId,
    notebookTitle,
    text: `Your request to add a chapter was approved for "${notebookTitle}"`,
  });
};


/* Owner rejects request */
export const rejectChapterRequest = async ({
  requestId,
  notebookId,
  requestedBy,
}) => {
  await updateDoc(doc(db, "comments", requestId), {
    status: "rejected",
  });

  const notebookSnap = await getDoc(doc(db, "notebooks", notebookId));
  const { title: notebookTitle } = notebookSnap.data();

  await createNotification({
    userId: requestedBy,
    type: "rejected",
    notebookId,
    notebookTitle,
    text: `Your request to add a chapter to "${notebookTitle}" was rejected.`,
  });
};

