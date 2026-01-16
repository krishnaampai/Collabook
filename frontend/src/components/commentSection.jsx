import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { addComment } from "../services/commentServices";

const CommentSection = ({ notebookId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!expanded || !notebookId) return;


    try {
      const q = query(
        collection(db, "comments"),
        where("notebookId", "==", notebookId),
        where("type", "==", "comment")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Comment fetch failed:", e);
    }
  }, [notebookId, expanded]);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      await addComment({ notebookId, text });
      setText("");
      setExpanded(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border border-neutral-700 rounded-xl p-3 bg-neutral-800">

      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-emerald-400">Comments</h2>

        {expanded && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="text-xs text-neutral-400 hover:text-red-400"
          >
            Close
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 rounded-lg bg-neutral-900 border border-neutral-700 focus:outline-none focus:border-emerald-500 text-sm"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={loading}
          className="px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition text-sm disabled:opacity-50"
        >
          Send
        </button>
      </div>

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-2 text-xs text-emerald-400 hover:underline"
        >
          Read comments
        </button>
      )}

      {expanded && (
        <div className="mt-3 border border-neutral-700 rounded-lg max-h-[320px] overflow-y-auto p-2 space-y-3">

          {comments.length === 0 && (
            <p className="text-neutral-500 text-sm text-center">
              No comments yet.
            </p>
          )}

          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-neutral-900 border border-neutral-700 rounded-lg p-3"
            >
              <p className="text-sm text-neutral-200 break-words">{c.text}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {c.createdAt?.toDate?.().toLocaleString?.() || "Just now"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;