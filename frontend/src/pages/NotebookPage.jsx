import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const NotebookPage = () => {
  const { notebookId } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "chapters"),
      where("notebookId", "==", notebookId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChapters(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [notebookId]);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Chapters</h1>

      {chapters.length === 0 && (
        <p className="text-neutral-400">No chapters yet.</p>
      )}

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            onClick={() => navigate(`/chapter/${chapter.id}`)}
            className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 hover:border-emerald-500 transition cursor-pointer"
          >
            <div className="text-4xl mb-3">📄</div>

            <h2 className="text-xl font-semibold mb-2">
              {chapter.title}
            </h2>

            <p className="text-sm text-neutral-400">
              PDF Chapter
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotebookPage;
