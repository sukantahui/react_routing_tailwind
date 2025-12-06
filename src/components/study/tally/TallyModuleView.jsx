// src/components/study/tally/TallyModuleView.jsx

import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Circle, PlayCircle, ArrowLeft } from "lucide-react";
import roadmapData from "./tally-prime-roadmap.json";

export default function TallyModuleView() {
  const { slug } = useParams();

  // --------------------------------------------------------
  // FIND MODULE + SEGMENT + FLATTENED MODULE LIST
  // --------------------------------------------------------
  const { moduleData, segmentData, flatModules, currentIndex } = useMemo(() => {
    let foundModule = null;
    let foundSegment = null;

    const flat = [];
    let idxCounter = 0;

    roadmapData.segments.forEach((seg) => {
      seg.modules.forEach((m) => {
        flat.push({
          ...m,
          segmentId: seg.segmentId,
          segmentTitle: seg.title,
          __index: idxCounter++,
        });
      });
    });

    roadmapData.segments.forEach((seg) => {
      const match = seg.modules.find((m) => m.slug === slug);
      if (match && !foundModule) {
        foundModule = match;
        foundSegment = seg;
      }
    });

    let indexFound = -1;
    if (foundModule) {
      const f = flat.find((m) => m.slug === slug);
      indexFound = f ? f.__index : -1;
    }

    return {
      moduleData: foundModule,
      segmentData: foundSegment,
      flatModules: flat,
      currentIndex: indexFound,
    };
  }, [slug]);

  // --------------------------------------------------------
  // MODULE NOT FOUND
  // --------------------------------------------------------
  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-red-500">Module Not Found</h1>
        <p className="mt-3 text-slate-400 text-sm max-w-md text-center">
          The Tally module you are trying to view does not exist or may have been moved.
        </p>

        <Link
          to="/tally/roadmap"
          className="mt-6 px-6 py-2 rounded-full border border-sky-500 text-sky-300
                     hover:bg-sky-600 hover:text-white transition flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Tally Roadmap
        </Link>
      </div>
    );
  }

  const mod = moduleData;
  const topics = Array.isArray(mod.topics) ? mod.topics : [];
  const totalTopics = topics.length;

  // --------------------------------------------------------
  // TOPIC PROGRESS (localStorage)
  // --------------------------------------------------------
  const PROGRESS_KEY = `tally_module_progress_${mod.moduleId}`;
  const LAST_TOPIC_KEY = `tally_module_lastTopic_${mod.moduleId}`;

  const [completedTopics, setCompletedTopics] = useState([]);
  const [lastTopicIndex, setLastTopicIndex] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY) || "[]";
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCompletedTopics(parsed);
    } catch {}

    try {
      const rawLast = localStorage.getItem(LAST_TOPIC_KEY);
      if (rawLast !== null) {
        const idx = parseInt(rawLast, 10);
        if (!isNaN(idx)) setLastTopicIndex(idx);
      }
    } catch {}
  }, [PROGRESS_KEY, LAST_TOPIC_KEY]);

  const toggleTopicComplete = (index) => {
    setCompletedTopics((prev) => {
      let updated;
      if (prev.includes(index)) {
        updated = prev.filter((x) => x !== index);
      } else {
        updated = [...prev, index];
      }
      updated.sort((a, b) => a - b);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleTopicClick = (index) => {
    localStorage.setItem(LAST_TOPIC_KEY, String(index));
    setLastTopicIndex(index);
  };

  const completedCount = completedTopics.length;
  const progressPercent =
    totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // --------------------------------------------------------
  // PREVIOUS / NEXT MODULES
  // --------------------------------------------------------
  const prevModule = currentIndex > 0 ? flatModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex >= 0 && currentIndex < flatModules.length - 1
      ? flatModules[currentIndex + 1]
      : null;

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* HEADER */}
      <div className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-slate-500">
              Tally Track · {segmentData?.level}
            </p>
            <h1 className="text-lg md:text-2xl font-bold text-sky-300">
              {mod.title}
            </h1>
          </div>

          <div className="hidden sm:flex flex-col items-end text-[11px] text-slate-400 gap-1">
            <span>
              {completedCount}/{totalTopics} topics
            </span>
            <div className="w-40 h-2 bg-slate-800 border border-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-sky-400"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* HERO CARD */}
          <section className="relative border border-slate-800 bg-slate-900/70 p-8 rounded-3xl shadow-xl backdrop-blur-xl">
            <div
              className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-purple-500/10 rounded-3xl blur-2xl opacity-60"
            />

            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-sky-300">
                {mod.title}
              </h2>

              <p className="text-xs text-slate-400">
                Segment:{" "}
                <span className="text-slate-200">{segmentData?.title}</span>
              </p>

              {mod.summary && (
                <p className="text-sm text-slate-300">{mod.summary}</p>
              )}

              <div className="mt-4 flex flex-wrap gap-3 text-[11px]">
                {mod.level && (
                  <span className="px-3 py-1 bg-slate-800 border border-sky-500 rounded-full text-sky-300">
                    {mod.level}
                  </span>
                )}

                {mod.difficulty && (
                  <span className="px-3 py-1 bg-purple-900/30 border border-purple-600 rounded-full text-purple-200">
                    {mod.difficulty}
                  </span>
                )}

                {mod.estimatedHours && (
                  <span className="px-3 py-1 bg-slate-800 border border-slate-600 rounded-full">
                    ⏱ {mod.estimatedHours} hrs
                  </span>
                )}

                {/* Back */}
                <Link
                  to="/tally/roadmap"
                  className="px-3 py-1 rounded-full border border-sky-500 text-sky-300 hover:bg-sky-600 hover:text-white inline-flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  Back
                </Link>

                {/* Resume */}
                {lastTopicIndex !== null &&
                  lastTopicIndex >= 0 &&
                  lastTopicIndex < totalTopics && (
                    <Link
                      to={`/tally/topic/${mod.slug}/${lastTopicIndex}`}
                      className="px-3 py-1 bg-emerald-600 rounded-full text-white hover:bg-emerald-500 inline-flex items-center gap-1"
                    >
                      <PlayCircle size={14} />
                      Resume Topic {lastTopicIndex + 1}
                    </Link>
                  )}
              </div>
            </div>
          </section>

          {/* TOPICS */}
          <section className="border border-slate-800 bg-slate-900/70 p-6 rounded-3xl backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-4">Topics Covered</h2>

            {topics.length === 0 ? (
              <p className="text-slate-400">No topics added for this module.</p>
            ) : (
              <div className="space-y-3">
                {topics.map((topic, idx) => {
                  const done = completedTopics.includes(idx);

                  return (
                    <div
                      key={idx}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition
                        ${
                          done
                            ? "bg-emerald-900/20 border-emerald-500/70 text-emerald-100"
                            : "bg-slate-800 border-slate-700 hover:border-sky-500/70"
                        }
                      `}
                    >
                      <button
                        onClick={() => toggleTopicComplete(idx)}
                        className="shrink-0"
                      >
                        {done ? (
                          <CheckCircle2 size={20} className="text-emerald-400" />
                        ) : (
                          <Circle size={20} className="text-slate-400" />
                        )}
                      </button>

                      <Link
                        to={`/tally/topic/${mod.slug}/${idx}`}
                        onClick={() => handleTopicClick(idx)}
                        className="flex-1 flex justify-between items-center"
                      >
                        <span>
                          <span className="text-sky-400 mr-1">{idx + 1}.</span>
                          {topic}
                        </span>
                        <span className="text-[11px] text-sky-300">Open →</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* MODULE FOOTER NAV */}
          <section className="flex justify-between text-xs mt-6">
            {/* Prev Module */}
            {prevModule ? (
              <Link
                to={`/tally/module/${prevModule.slug}`}
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-full hover:bg-slate-800 flex items-center gap-2"
              >
                <ArrowLeft size={14} />
                <span>
                  <div className="text-[10px] text-slate-500">Previous</div>
                  <div className="text-[11px]">{prevModule.title}</div>
                </span>
              </Link>
            ) : (
              <span className="text-slate-600 text-[11px]">
                You are at the first module.
              </span>
            )}

            {/* Next Module */}
            {nextModule ? (
              <Link
                to={`/tally/module/${nextModule.slug}`}
                className="px-3 py-2 bg-sky-600 rounded-full text-white hover:bg-sky-500 flex items-center gap-2"
              >
                <span>
                  <div className="text-[10px] text-sky-100/70">Next</div>
                  <div className="text-[11px]">{nextModule.title}</div>
                </span>
                →
              </Link>
            ) : (
              <span className="text-slate-600 text-[11px]">
                You’ve reached the final module.
              </span>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
