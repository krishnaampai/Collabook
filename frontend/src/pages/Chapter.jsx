import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import CommentSection from "../components/commentSection";

const Notebook = () => {
  const { id } = useParams(); // dynamic notebook id from URL

  const [pdfUrl, setPdfUrl] = useState("");
  const [loadingPdf, setLoadingPdf] = useState(true);
  const [notebookId, setNotebookId] = useState(null);


// useEffect(() => {
//   const fetchChapter = async () => {
//     const snap = await getDoc(doc(db, "chapters", id));
    
//     if (snap.exists()) {
//       setPdfUrl(snap.data().pdfUrl);
//      console.log(snap.data().pdfUrl);
//     }
//      setLoadingPdf(false);
//       setNotebookId(data.notebookId); 
//   };

//   fetchChapter();
// }, [id]);

useEffect(() => {
  const fetchChapter = async () => {
    const snap = await getDoc(doc(db, "chapters", id));

    console.log("Chapter ID:", id);
    console.log("Exists:", snap.exists());

    if (snap.exists()) {
      console.log("Chapter data:", snap.data()); // 👈 KEY LINE

      const data = snap.data();
      setPdfUrl(data.pdfUrl);
      setNotebookId(data.notebookId);
    }

    setLoadingPdf(false);
  };

  fetchChapter();
}, [id]);



  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSummarise = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/summarise/${id}`, {
        method: "POST",
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* Header */}
      <div className="border-b border-neutral-700 px-6 py-4">
        <h1 className="text-xl font-bold text-emerald-400">
          Collabook
        </h1>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-6">
        
        {/* PDF Viewer */}
        <div className="md:col-span-3 h-[80vh] border border-neutral-700 rounded-xl overflow-hidden bg-neutral-800">
          {loadingPdf ? (
              <p className="text-neutral-400">Loading PDF…</p>
            ) : pdfUrl ? (
              <iframe
                src={pdfUrl}
                title="Notebook PDF"
                className="w-full h-full"
              />
            ) : (
              <p className="text-red-400">PDF not found.</p>
            )}


        </div>

        {/* Summary Sidebar */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex flex-col h-[80vh]">
          <h2 className="text-lg font-semibold mb-3 text-emerald-400">
            AI Summary
          </h2>

          <button
            onClick={handleSummarise}
            disabled={loading}
            className="mb-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition disabled:opacity-50"
          >
            {loading ? "Summarising..." : "Summarise Notes"}
          </button>

          {/* Scrollable Summary Box */}
          <div className="flex-1 overflow-y-auto text-sm text-neutral-300 whitespace-pre-wrap border border-neutral-700 rounded-lg p-3">
            {summary || "Click the button to generate a summary."}
          </div>
          <div>{notebookId && <CommentSection notebookId={notebookId} />}
</div>
        </div>
      </div>
    </div>
  );
};

export default Notebook;
