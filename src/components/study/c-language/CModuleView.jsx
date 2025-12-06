import React from "react";
import { useParams, Link } from "react-router-dom";
import roadmapData from "./c-language-roadmap.json";

export default function CModuleView() {
  const { slug } = useParams();

  // find module in every segment
  let moduleData = null;
  let segmentData = null;

  for (const segment of roadmapData.segments) {
    const found = segment.modules.find((m) => m.slug === slug);
    if (found) {
      moduleData = found;
      segmentData = segment;
      break;
    }
  }

  // If slug not found
  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl font-bold text-red-400">Module Not Found</h1>
        <p className="mt-2 text-slate-400">The requested module does not exist.</p>

        <Link
          to="/javascript/roadmap"
          className="inline-block mt-5 px-4 py-2 rounded-full border border-sky-500 text-sky-300 hover:bg-sky-500/10"
        >
          ← Back to Roadmap
        </Link>
      </div>
    );
  }

  const mod = moduleData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="border border-slate-800 bg-slate-900/50 p-6 rounded-3xl shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            {mod.title}
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            {segmentData.title} · Level: {mod.level}
          </p>

          <div className="flex items-center gap-2 mt-3 text-xs">
            <span className="px-2 py-[2px] rounded-full border border-sky-500 text-sky-300">
              {mod.level}
            </span>
            <span className="px-2 py-[2px] rounded-full bg-slate-800">
              Time: {mod.estimatedHours} hrs
            </span>
          </div>

          <Link
            to="/javascript/roadmap"
            className="inline-block mt-4 text-sky-400 hover:text-sky-300"
          >
            ← Back to Roadmap
          </Link>
        </div>

        {/* Summary */}
        {mod.summary && (
          <section className="border border-slate-800 bg-slate-900/50 p-6 rounded-3xl">
            <h2 className="text-lg font-semibold text-slate-100">Summary</h2>
            <p className="mt-2 text-slate-300 text-sm">{mod.summary}</p>
          </section>
        )}

        {/* Topics */}
        <section className="border border-slate-800 bg-slate-900/50 p-6 rounded-3xl">
          <h2 className="text-lg font-semibold text-slate-100">Topics Covered</h2>

          <div className="mt-4 space-y-2">
            {mod.topics.map((topic, i) => (
              <Link
                key={i}
                to={`/javascript/topic/${mod.slug}/${i}`}
                className="block px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 
                           text-sky-300 text-xs md:text-sm transition"
              >
                {i + 1}. {topic} →
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
