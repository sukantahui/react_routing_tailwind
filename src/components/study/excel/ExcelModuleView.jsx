import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Circle, PlayCircle, ArrowLeft } from "lucide-react";
import roadmapData from "./excel-basic-to-advanced.json";

export default function ExcelModuleView() {
  const { slug } = useParams();

  // -------------------------------------------
  //  FIND MODULE + SEGMENT + LINEAR INDEX
  // -------------------------------------------
  const { moduleData, segmentData, flatModules, currentIndex } = useMemo(() => {
    let moduleData = null;
    let segmentData = null;

    const flat = [];
    let indexCounter = 0;

    roadmapData.segments.forEach((seg) => {
      seg.modules.forEach((m) => {
        flat.push({
          ...m,
          segmentId: seg.segmentId,
          segmentTitle: seg.title,
          __index: indexCounter++,
        });
      });
    });

    let foundModule = null;
    let foundSegment = null;
    let foundIndex = -1;

    roadmapData.segments.forEach((seg) => {
      const found = seg.modules.find((m) => m.slug === slug);
      if (found && !foundModule) {
        foundModule = found;
        foundSegment = seg;
      }
    });

    if (foundModule) {
      const item = flat.find((m) => m.slug === slug);
      foundIndex = item ? item.__index : -1;
    }

    return {
      moduleData: foundModule,
      segmentData: foundSegment,
      flatModules: flat,
      currentIndex: foundIndex,
    };
  }, [slug]);

  // -------------------------------------------
  //  MODULE NOT FOUND
  // -------------------------------------------
  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-extrabold text-red-500 drop-shadow-lg">
          Module Not Found
        </h1>

        <p className="mt-3 text-slate-400 text-sm max-w-md text-center">
          The module you tried to access does not exist or may have been moved.
        </p>

        <Link
          to={`/${roadmapData.folder}/roadmap`}
          className="mt-6 px-6 py-2 rounded-full border border-sky-500 
                     text-sky-300 hover:bg-sky-600 hover:text-white 
                     transition shadow-lg hover:shadow-sky-500/30 flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Roadmap
        </Link>
      </div>
    );
  }

  const mod = moduleData;
  const topics = Array.isArray(mod.topics) ? mod.topics : [];
  const totalTopics = topics.length;

  // -------------------------------------------
  //  TOPIC PROGRESS (localStorage)
  // -------------------------------------------
  const PROGRESS_KEY = `${roadmapData.folder}_module_progress_${mod.moduleId}`;
  const LAST_TOPIC_KEY = `${roadmapData.folder}_module_lastTopic_${mod.moduleId}`;

  const [completedTopics, setCompletedTopics] = useState([]);
  const [lastTopicIndex, setLastTopicIndex] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY) || "[]";
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setCompletedTopics(parsed);
      }
    } catch {
      setCompletedTopics([]);
    }

    try {
      const rawLast = localStorage.getItem(LAST_TOPIC_KEY);
      if (rawLast !== null) {
        const idx = Number.parseInt(rawLast, 10);
        if (!Number.isNaN(idx)) setLastTopicIndex(idx);
      }
    } catch {
      setLastTopicIndex(null);
    }
  }, [PROGRESS_KEY, LAST_TOPIC_KEY]);

  const toggleTopicComplete = (index) => {
    setCompletedTopics((prev) => {
      let updated;
      if (prev.includes(index)) {
        updated = prev.filter((i) => i !== index);
      } else {
        updated = [...prev, index];
      }
      updated.sort((a, b) => a - b);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleTopicClick = (index) => {
    try {
      localStorage.setItem(LAST_TOPIC_KEY, String(index));
      setLastTopicIndex(index);
    } catch {
      // ignore
    }
  };

  const completedCount = completedTopics.length;
  const progressPercent =
    totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // -------------------------------------------
  //  MODULE NAVIGATION (PREV / NEXT)
  // -------------------------------------------
  const prevModule =
    currentIndex > 0 ? flatModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex >= 0 && currentIndex < flatModules.length - 1
      ? flatModules[currentIndex + 1]
      : null;

  // -------------------------------------------
  //  RENDER
  // -------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* STICKY PAGE HEADER */}
      <div className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {roadmapData.trackTitle} · {segmentData?.level || "Module"}
            </p>
            <h1 className="text-lg md:text-2xl font-bold text-sky-300">
              {mod.title}
            </h1>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-[11px] text-slate-400">
              {completedCount} / {totalTopics || 0} topics completed
            </span>
            <div className="w-40 h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-10 animate-fadeInSlow">

          {/* MODULE HERO CARD */}
          <section
            className="
              relative border border-slate-800 bg-slate-900/70 
              p-6 md:p-8 rounded-3xl shadow-[0_0_45px_rgba(15,23,42,0.7)]
              backdrop-blur-xl overflow-hidden
            "
          >
            <div
              className="
                absolute inset-0 bg-gradient-to-br from-sky-400/10 
                via-transparent to-purple-500/10 rounded-3xl blur-2xl opacity-70
              "
            />

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-sky-300 tracking-wide">
                    {mod.title}
                  </h2>

                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    Segment:{" "}
                    <span className="text-slate-200">
                      {segmentData?.title || roadmapData.trackTitle}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 text-xs">
                  <div className="flex flex-wrap gap-2 justify-end">

                    {mod.level && (
                      <span className="px-3 py-1 rounded-full border border-sky-500 text-sky-300 bg-sky-500/10">
                        {mod.level}
                      </span>
                    )}

                    {mod.difficulty && (
                      <span className="px-3 py-1 rounded-full bg-purple-900/30 border border-purple-600 text-purple-200">
                        {mod.difficulty}
                      </span>
                    )}

                    {mod.estimatedHours && (
                      <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-slate-200">
                        ⏱ {mod.estimatedHours} hrs
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-300 flex items-center gap-2">
                    <span>
                      {completedCount}/{totalTopics || 0} Topics
                    </span>
                    <span className="px-2 py-[2px] rounded-full bg-slate-800 border border-slate-600">
                      {progressPercent}% Done
                    </span>
                  </div>
                </div>
              </div>

              {mod.summary && (
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-2">
                  {mod.summary}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
                {Array.isArray(mod.prerequisites) &&
                  mod.prerequisites.length > 0 && (
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-600">
                      Prerequisites: {mod.prerequisites.length} module
                      {mod.prerequisites.length > 1 ? "s" : ""}
                    </span>
                  )}

                <Link
                  to={`/${roadmapData.folder}/roadmap`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-sky-500 text-sky-300 hover:bg-sky-600 hover:text-white transition"
                >
                  <ArrowLeft size={14} />
                  Back to Roadmap
                </Link>

                {lastTopicIndex != null &&
                  lastTopicIndex >= 0 &&
                  lastTopicIndex < totalTopics && (
                    <Link
                      to={`/${roadmapData.folder}/topic/${mod.slug}/${lastTopicIndex}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition"
                    >
                      <PlayCircle size={14} />
                      Resume Topic {lastTopicIndex + 1}
                    </Link>
                  )}
              </div>
            </div>
          </section>

          {/* TOPICS SECTION */}
          <section
            className="
              border border-slate-800 bg-slate-900/70 p-6 rounded-3xl 
              shadow-lg backdrop-blur-xl animate-slideUp
            "
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-semibold text-slate-100">
                Topics Covered
              </h2>

              <div className="text-[11px] text-slate-400">
                Click ✓ to mark a topic as completed.
              </div>
            </div>

            {totalTopics === 0 ? (
              <p className="text-slate-400 text-sm">
                No topics configured for this module yet.
              </p>
            ) : (
              <div className="mt-3 space-y-3">
                {topics.map((topic, idx) => {
                  const isDone = completedTopics.includes(idx);

                  return (
                    <div
                      key={idx}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl border text-sm 
                        md:text-base transition-all shadow-sm
                        ${
                          isDone
                            ? "bg-emerald-900/20 border-emerald-500/70 text-emerald-100 shadow-[0_0_18px_rgba(34,197,94,0.4)]"
                            : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-sky-500/70 hover:shadow-sky-500/20"
                        }
                      `}
                    >
                      <button
                        type="button"
                        onClick={() => toggleTopicComplete(idx)}
                        className="shrink-0 inline-flex items-center justify-center"
                        title={isDone ? "Mark as incomplete" : "Mark as completed"}
                      >
                        {isDone ? (
                          <CheckCircle2 size={20} className="text-emerald-400" />
                        ) : (
                          <Circle size={20} className="text-slate-400" />
                        )}
                      </button>

                      <Link
                        to={`/${roadmapData.folder}/topic/${mod.slug}/${idx}`}
                        onClick={() => handleTopicClick(idx)}
                        className="flex-1 flex items-center justify-between gap-3"
                      >
                        <span>
                          <span className="text-sky-400 mr-1">
                            {idx + 1}.
                          </span>
                          {topic}
                        </span>
                        <span className="text-[11px] text-sky-300">
                          Open →
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* MODULE FOOTER NAV */}
          <section className="flex flex-wrap items-center justify-between gap-3 text-xs mt-4">
            <div>
              {prevModule ? (
                <Link
                  to={`/${roadmapData.folder}/module/${prevModule.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:border-sky-500 text-slate-200 transition"
                >
                  <ArrowLeft size={14} />
                  <div className="flex flex-col text-left">
                    <span className="uppercase text-[10px] text-slate-500">
                      Previous Module
                    </span>
                    <span className="text-[11px] line-clamp-1">
                      {prevModule.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <span className="text-slate-600 text-[11px]">
                  You are at the first module.
                </span>
              )}
            </div>

            <div>
              {nextModule ? (
                <Link
                  to={`/${roadmapData.folder}/module/${nextModule.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white transition"
                >
                  <div className="flex flex-col text-right">
                    <span className="uppercase text-[10px] text-sky-100/80">
                      Next Module
                    </span>
                    <span className="text-[11px] line-clamp-1">
                      {nextModule.title}
                    </span>
                  </div>
                  <span>→</span>
                </Link>
              ) : (
                <span className="text-slate-600 text-[11px]">
                  You’ve reached the final module of this track.
                </span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
