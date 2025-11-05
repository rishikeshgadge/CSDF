// frontend/src/components/DropZone.jsx
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DropZone({ onFile }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        onFile(acceptedFiles[0]);
      }
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".tif"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer border-2 border-dashed p-6 rounded-xl text-center transition 
      ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-600">Drop the image here...</p>
      ) : (
        <p className="text-gray-600">
          Drag & drop an image here, or <b>click</b> to upload
        </p>
      )}
    </div>
  );
}
