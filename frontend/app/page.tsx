"use client";
import { useState } from "react";
import axios from "axios";
import ResultCard from "../components/ResultCard";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [jobs, setJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setResult(null);
    setJobs([]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze-resume/", formData);
      setResult(res.data);

      const skills = res.data.skills || [];
      const jobRes = await axios.post("http://127.0.0.1:8000/match-jobs/", skills, {
        headers: { "Content-Type": "application/json" },
      });
      setJobs(jobRes.data.recommended_jobs);
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">🔄 Analyzing your resume...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">📄 CareerPilot.AI</h1>

        <input type="file" accept="application/pdf" onChange={handleFileChange} />

        <button
          onClick={handleAnalyze}
          disabled={loading || !file}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div className="space-y-3 text-sm text-gray-700">
            <p><b>👤 Name:</b> {result.name}</p>
            <p><b>📧 Email:</b> {result.email}</p>
            <p><b>📞 Phone:</b> {result.phone}</p>
            <p><b>🛠 Skills:</b> {result.skills?.join(", ")}</p>

            {result.education && (
              <div>
                <b>📚 Education:</b>
                <ul className="list-disc ml-5">
                  {result.education.map((edu: string, i: number) => (
                    <li key={i}>{edu}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.experience && (
              <div>
                <b>💼 Experience:</b>
                <ul className="list-disc ml-5">
                  {result.experience.map((exp: string, i: number) => (
                    <li key={i}>{exp}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.projects && (
              <div>
                <b>🧪 Projects:</b>
                <ul className="list-disc ml-5">
                  {result.projects.map((proj: string, i: number) => (
                    <li key={i}>{proj}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.text_preview && (
              <div>
                <b>📄 Resume Preview:</b>
                <p className="bg-gray-100 p-2 rounded text-xs whitespace-pre-wrap max-h-40 overflow-auto">
                  {result.text_preview}
                </p>
              </div>
            )}
          </div>
        )}

        {jobs.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold">🎯 Recommended Jobs</h2>
            <div className="grid gap-2">
              {jobs.map((job, i) => (
                <ResultCard key={i} title={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
