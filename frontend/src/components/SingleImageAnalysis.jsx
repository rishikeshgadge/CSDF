import { useState } from 'react';
import api from '../api';
import DropZone from './DropZone';
import ProgressBar from './ProgressBar';
import HashBlock from './HashBlock';
import MetadataTable from './metadataTable';

export default function SingleImageAnalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  // Handle selecting via drag/drop or input
  const handleFileSelect = (file) => {
    setFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    setResult(null);
    setError('');
  };

  const analyzeImage = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await api.post('/analyze', formData, {
        onUploadProgress: (p) =>
          setProgress(Math.round((p.loaded / (p.total || 1)) * 100)),
      });

      setResult(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Analysis failed');
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const downloadReport = async () => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await api.post('/report', formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace(/\.[^.]+$/, '')}_forensic_report.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      alert('Report download failed');
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Panel */}
      <div className="p-5 bg-white shadow-md rounded-xl space-y-4">
        <h2 className="text-lg font-semibold">Single Image Analysis</h2>
        <DropZone onFile={handleFileSelect} />
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />
          <button
            onClick={analyzeImage}
            disabled={!file || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
          <button
            onClick={downloadReport}
            disabled={!file}
            className="px-4 py-2 bg-gray-800 text-white rounded-xl disabled:opacity-50"
          >
            Download Report
          </button>
        </div>

        {loading && <ProgressBar value={progress} />}
      </div>

      {/* Preview */}
      {preview && (
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="font-medium mb-3">Image Preview</h3>
          <img src={preview} alt="preview" className="max-h-80 rounded-md" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="p-5 bg-white shadow-md rounded-xl space-y-4">
          <h3 className="font-medium">Results</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Info */}
            <div className="text-sm space-y-2">
              <p><b>File:</b> {result.fileName}</p>
              <p><b>Type:</b> {result.mimetype}</p>
              <p><b>Size:</b> {result.size} bytes</p>

              {result.basic && (
                <div className="grid grid-cols-2 gap-x-3">
                  <p><b>Format:</b> {result.basic.format}</p>
                  <p><b>Resolution:</b> {result.basic.width} × {result.basic.height}</p>
                  <p><b>Color Space:</b> {result.basic.space}</p>
                  <p><b>Channels:</b> {result.basic.channels}</p>
                </div>
              )}

              <HashBlock md5={result.md5} sha256={result.sha256} />
              {result.phash && (
                <p><b>Perceptual Hash (pHash):</b> {result.phash}</p>
              )}
            </div>

            {/* Metadata */}
            <MetadataTable metadata={result.metadata} />
          </div>
        </div>
      )}
    </div>
  );
}
