export const uploadChapterPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Upload failed");

  const data = await res.json();
  return data.url;
};
