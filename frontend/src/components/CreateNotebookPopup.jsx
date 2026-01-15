import React from "react";

const CreateNotebookPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-emerald-400">
            Create New Notebook
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Notebook title"
            className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500"
          />

          <input
            type="text"
            placeholder="Topic (eg: Computer Networks)"
            className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500"
          />

          <div className="border border-dashed border-neutral-600 rounded-lg p-5 text-center">
            <p className="text-neutral-400 text-sm mb-2">
              Upload file (PDF / Image / Doc)
            </p>
            <input
              type="file"
              className="text-sm text-neutral-300"
            />
          </div>

          <button className="w-full py-3 bg-emerald-500 rounded-lg font-semibold hover:bg-emerald-600 transition">
            Create Notebook
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreateNotebookPopup;
