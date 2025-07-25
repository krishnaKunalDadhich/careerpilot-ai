"use client";

import { useState } from "react";
import axios from "axios";
import ResultCard from "../components/ResultCard";

type ResumeResult = {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  education?: string[];
  experience?: string[];
  projects?: string[];
  text_preview?: string;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [jobs, setJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setResult(null);
    setJobs([]);
    setInsights(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://careerpilot-ai-production.up.railway.app/analyze-resume/",
        formData
      );
      setResult(res.data as ResumeResult);

      const skills = res.data.skills || [];
      const jobRes = await axios.post(
        "https://careerpilot-ai-production.up.railway.app/match-jobs/",
        skills,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setJobs(jobRes.data.recommended_jobs);
    } catch (error) {
      console.error("Resume analysis error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSmartInsights = async () => {
    if (!result?.skills || !result?.experience || !result?.projects) {
      alert("Please analyze a resume first.");
      return;
    }

    setGenerating(true);
    try {
      const res = await axios.post(
        "https://careerpilot-ai-production.up.railway.app/smart-insights/",
        {
          skills: result.skills,
          experience: result.experience,
          projects: result.projects,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setInsights(res.data.insights || "No insights generated.");
    } catch (error) {
      console.error("Smart insights error:", error);
      setInsights("❌ Error generating insights.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">📄 CareerPilot.AI</h1>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded p-2"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !file}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {loading && (
          <div className="text-center text-gray-700">🔄 Processing...</div>
        )}

        {result && (
          <div className="space-y-3 text-sm text-gray-700">
            <p><b>👤 Name:</b> {result.name}</p>
            <p><b>📧 Email:</b> {result.email}</p>
            <p><b>📞 Phone:</b> {result.phone}</p>
            <p><b>🛠 Skills:</b> {result.skills?.join(", ")}</p>

            {Array.isArray(result.education) && result.education.length > 0 && (
              <div>
                <b>📚 Education:</b>
                <ul className="list-disc ml-5">
                  {result.education.map((edu, i) => (
                    <li key={i}>{edu}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(result.experience) && result.experience.length > 0 && (
              <div>
                <b>💼 Experience:</b>
                <ul className="list-disc ml-5">
                  {result.experience.map((exp, i) => (
                    <li key={i}>{exp}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(result.projects) && result.projects.length > 0 && (
              <div>
                <b>🧪 Projects:</b>
                <ul className="list-disc ml-5">
                  {result.projects.map((proj, i) => (
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

        {result && (
          <button
            onClick={handleSmartInsights}
            disabled={generating}
            className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4 hover:bg-green-700 transition"
          >
            {generating ? "Generating Insights..." : "💡 Generate Smart Career Insights"}
          </button>
        )}

        {insights && (
          <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded p-4 text-sm whitespace-pre-wrap">
            <h3 className="font-semibold text-lg mb-2">🧠 AI-Powered Career Suggestions</h3>
            <p>{insights}</p>
          </div>
        )}
      </div>
    </main>
  );
}
