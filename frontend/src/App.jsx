// frontend/src/App.jsx
import SingleImageAnalysis from "./components/SingleImageAnalysis";
import CompareImages from "./components/compareImages";  
 

export default function App() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">🔍 Digital Image Forensics Tool</h1>
        <p className="text-sm text-gray-600">
          Analyze image metadata & hashes, and compare two images for tampering.
        </p>
      </header>

      <main className="space-y-10">
        <section>
          <SingleImageAnalysis />
        </section>

        <section>
          <CompareImages />
        </section>
      </main>

      <footer className="mt-10 text-center text-xs text-gray-500">
        Built with React + Vite + Tailwind · Node/Express backend
      </footer>
    </div>
  );
}
