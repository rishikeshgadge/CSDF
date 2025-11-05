import { useState } from "react";
import api from "../api";

export default function CompareImages() {
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [result, setResult] = useState(null);

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setImg1(file);
    setPreview1(URL.createObjectURL(file));
  };

  const handleImage2 = (e) => {
    const file = e.target.files[0];
    setImg2(file);
    setPreview2(URL.createObjectURL(file));
  };

  const compareNow = async () => {
    if (!img1 || !img2) {
      alert("Upload two images first!");
      return;
    }

    const formData = new FormData();
    formData.append("images", img1);
    formData.append("images", img2);

    try {
      const { data } = await api.post("/compare", formData);
      setResult(data);
    } catch {
      alert("Error comparing images.");
    }
  };

  return (
    <div className="p-5 bg-white shadow rounded-xl">
      <h2 className="text-lg font-semibold mb-3">Compare Two Images</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm mb-1">Image 1:</p>
          <input type="file" onChange={handleImage1} />
          {preview1 && <img src={preview1} className="mt-2 rounded-md max-h-60" />}
        </div>

        <div>
          <p className="text-sm mb-1">Image 2:</p>
          <input type="file" onChange={handleImage2} />
          {preview2 && <img src={preview2} className="mt-2 rounded-md max-h-60" />}
        </div>
      </div>

      <button
        onClick={compareNow}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Compare Now
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          {result.identical ? (
            <p className="text-green-600 font-semibold">✅ Images are IDENTICAL</p>
          ) : (
            <p className="text-red-600 font-semibold">⚠ Images are DIFFERENT</p>
          )}
          <p><b>Image 1 MD5:</b> {result.hash1}</p>
          <p><b>Image 2 MD5:</b> {result.hash2}</p>
        </div>
      )}
    </div>
  );
}
