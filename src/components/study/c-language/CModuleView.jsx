import React from "react";
import { useParams, Link } from "react-router-dom";
import roadmapData from "./c-language-roadmap.json";

export default function CModuleView() {
  const { slug } = useParams();

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

  /* -------------------------------------------
                  MODULE NOT FOUND
     ------------------------------------------- */
  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-extrabold text-red-500 drop-shadow-lg">
          Module Not Found
        </h1>

        <p className="mt-3 text-slate-400 text-sm max-w-md text-center">
          The module you tried to access does not exist or was removed.
        </p>

        <Link
          to="/c/roadmap"
          className="mt-6 px-6 py-2 rounded-full border border-sky-500 
                     text-sky-300 hover:bg-sky-600 hover:text-white 
                     transition shadow-lg hover:shadow-sky-500/30"
        >
          ← Back to Roadmap
        </Link>
      </div>
    );
  }

  const mod = moduleData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">

      <div className="max-w-4xl mx-auto space-y-10 animate-fadeInSlow">

        {/* -------------------------------------------
                        MODULE HEADER
        -------------------------------------------- */}
        <div
          className="
            relative border border-slate-800 bg-slate-900/60 
            p-8 rounded-3xl shadow-[0_0_45px_rgba(15,23,42,0.6)]
            backdrop-blur-xl overflow-hidden
          "
        >
          {/* Glow Layer */}
          <div
            className="
              absolute inset-0 bg-gradient-to-br from-sky-400/10 
              via-transparent to-purple-500/10 rounded-3xl blur-2xl opacity-70
            "
          />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-sky-300 tracking-wide drop-shadow">
              {mod.title}
            </h1>

            <p className="text-sm text-slate-400 mt-2">
              {segmentData.title} · Level: <span className="text-sky-300">{mod.level}</span>
            </p>

            {/* Badges */}
            <div className="flex items-center gap-3 mt-4 text-xs">
              <span className="px-3 py-1 rounded-full border border-sky-500 text-sky-300 bg-sky-500/10">
                {mod.level}
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-slate-300">
                ⏱ {mod.estimatedHours} hrs
              </span>

              {mod.difficulty && (
                <span className="px-3 py-1 rounded-full bg-purple-900/30 border border-purple-600 text-purple-300">
                  {mod.difficulty}
                </span>
              )}
            </div>

            {/* Back Navigation */}
            <Link
              to="/c/roadmap"
              className="inline-block mt-5 text-sky-400 hover:text-sky-300 text-sm transition hover:underline"
            >
              ← Back to Roadmap
            </Link>
          </div>
        </div>

        {/* -------------------------------------------
                        SUMMARY BOX
        -------------------------------------------- */}
        {mod.summary && (
          <section
            className="
              border border-slate-800 bg-slate-900/60 p-6 rounded-3xl 
              shadow-lg backdrop-blur-xl animate-slideUp
            "
          >
            <h2 className="text-xl font-semibold text-slate-100">Module Summary</h2>
            <p className="mt-3 text-slate-300 leading-relaxed text-sm">{mod.summary}</p>
          </section>
        )}

        {/* -------------------------------------------
                        TOPICS LIST
        -------------------------------------------- */}
        <section
          className="
            border border-slate-800 bg-slate-900/60 p-6 rounded-3xl 
            shadow-lg backdrop-blur-xl animate-slideUp
          "
        >
          <h2 className="text-xl font-semibold text-slate-100">Topics Covered</h2>

          <div className="mt-5 space-y-3">
            {mod.topics.map((topic, idx) => (
              <Link
                key={idx}
                to={`/c/topic/${mod.slug}/${idx}`}
                className="
                  block px-4 py-3 rounded-xl bg-slate-800 border border-slate-700
                  hover:bg-sky-600/20 hover:border-sky-500 hover:text-sky-300
                  text-slate-300 text-sm md:text-base transition-all 
                  shadow hover:shadow-sky-500/20
                  animate-fadeIn
                "
                style={{
                  animationDelay: `${idx * 0.07}s`,
                }}
              >
                {idx + 1}. {topic} →
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
