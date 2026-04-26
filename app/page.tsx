"use client";
import { useState } from "react";

export default function VisionDashboard() {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleVisionAnalysis = async () => {
    setLoading(true);
    // Replace this with your actual camera snapshot URL
    const cameraUrl = "YOUR_CAMERA_IMAGE_URL_HERE";

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: cameraUrl }),
      });

      const data = await response.json();
      setAnalysis(data.result);
    } catch (err) {
      console.error("Frontend Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-blue-500 mb-8">AlmouridAI Vision</h1>

      <button
        onClick={handleVisionAnalysis}
        disabled={loading}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all disabled:opacity-50"
      >
        {loading ? "Analyzing Stream..." : "Run AI Analysis"}
      </button>

      {analysis && (
        <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-blue-900 max-w-2xl">
          <h2 className="text-xl text-blue-400 mb-4 font-mono">{">"} AI Insight:</h2>
          <p className="text-gray-300 leading-relaxed font-sans">{analysis}</p>
        </div>
      )}
    </div>
  );
}