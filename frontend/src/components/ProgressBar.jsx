// frontend/src/components/ProgressBar.jsx
export default function ProgressBar({ value }) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  }
  