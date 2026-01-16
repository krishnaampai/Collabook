import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { addChapter } from "../services/chaptersServices";

const NotebookPage = () => {
  const { notebookId } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

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

  const uploadPdf = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
     formData.append("resource_type", "raw");

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Upload response:", data); 
    return data.url;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-8">

      {/* ---------- MODAL ---------- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-neutral-800 border border-neutral-700 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4">

            <h2 className="text-xl font-bold mb-6">Add New Chapter</h2>

            <input
              type="text"
              placeholder="Chapter name"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 mb-4 focus:outline-none focus:border-emerald-500 transition"
            />

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-neutral-400 mb-6
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-neutral-700 file:text-white
                         hover:file:bg-neutral-600"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={isCreating}
                className="px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                disabled={isCreating}
                onClick={async () => {
                  if (!chapterTitle.trim() || !file) {
                    alert("Chapter name and PDF are required");
                    return;
                  }

                  try {
                    setIsCreating(true);

                    const pdfUrl = await uploadPdf(file);

                    await addChapter({
                      title: chapterTitle.trim(),
                      pdfUrl,
                      notebookId,
                    });

                    setChapterTitle("");
                    setFile(null);
                    setShowModal(false);

                  } catch (error) {
                    console.error(error);
                    alert("Failed to create chapter");
                  } finally {
                    setIsCreating(false);
                  }
                }}
                className={`px-6 py-2 rounded-lg font-semibold transition
                  ${
                    isCreating
                      ? "bg-emerald-500/60 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
              >
                {isCreating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ---------- MODAL END ---------- */}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">Chapters</h1>
        <button className="px-5 py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
          Save
        </button>
      </div>

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

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-2xl flex items-center justify-center text-4xl font-bold text-white transition transform hover:scale-105"
        title="Add Chapter"
      >
        +
      </button>


    </div>
  );
};

export default NotebookPage;
