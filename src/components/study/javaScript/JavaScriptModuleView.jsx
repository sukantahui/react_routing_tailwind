// src/components/study/JavaScriptModuleView.jsx

import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Layers,
  Star,
} from "lucide-react";
import roadmapData from "./javascript-roadmap-enhanced.json";

export default function JavaScriptModuleView() {
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
          segmentLevel: seg.level,
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
      <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
        {/* Simple background for 404 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <svg
            className="absolute -top-24 -left-24 opacity-40"
            width="420"
            height="420"
            viewBox="0 0 400 400"
          >
            <defs>
              <radialGradient
                id="notfound-grad"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(0 0) rotate(45) scale(400)"
              >
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="200" fill="url(#notfound-grad)" />
          </svg>
        </div>

        <div className="relative z-10 p-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-extrabold text-red-500 drop-shadow-lg">
            Module Not Found
          </h1>

          <p className="mt-3 text-slate-400 text-sm max-w-md">
            The module you tried to access does not exist or may have been
            moved.
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
      ? flatModules[currentIndex + 1] : null;

  // -------------------------------------------
  //  RENDER
  // -------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* GLOBAL BACKGROUND SVG LAYERS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top-left gradient blob */}
        <svg
          className="absolute -top-32 -left-28 opacity-50"
          width="420"
          height="420"
          viewBox="0 0 400 400"
        >
          <defs>
            <radialGradient
              id="js-module-blob-1"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(0 0) rotate(45) scale(400)"
            >
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="200" fill="url(#js-module-blob-1)" />
        </svg>

        {/* Bottom-right gradient blob */}
        <svg
          className="absolute bottom-[-120px] right-[-80px] opacity-50"
          width="420"
          height="420"
          viewBox="0 0 400 400"
        >
          <defs>
            <radialGradient
              id="js-module-blob-2"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(400 400) rotate(225) scale(400)"
            >
              <stop stopColor="#a855f7" />
              <stop offset="1" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="200" fill="url(#js-module-blob-2)" />
        </svg>

        {/* Soft grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.09]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="js-module-grid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 0H0V40"
                fill="none"
                stroke="#1f2937"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#js-module-grid)" />
        </svg>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        {/* STICKY PAGE HEADER */}
        <div className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/10 border border-sky-500/50">
                  <BookOpen size={13} className="text-sky-300" />
                </span>
                <span className="truncate">
                  {roadmapData.trackTitle} ·{" "}
                  {segmentData?.level || "Module"}
                </span>
              </p>
              <h1 className="text-lg md:text-2xl font-bold text-sky-300 flex items-center gap-2">
                {mod.title}
              </h1>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-[11px] text-slate-400">
                {completedCount} / {totalTopics || 0} topics completed
              </span>
              <div className="w-40 h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-700 relative">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-300 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
                <svg
                  className="absolute inset-0 w-full h-full opacity-40"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="js-module-progress-lines"
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="0"
                    y1="1"
                    x2="100%"
                    y2="1"
                    stroke="url(#js-module-progress-lines)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                </svg>
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
              {/* Hero background accents */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                {/* angled gradient strip */}
                <svg
                  className="absolute -right-16 -top-10 opacity-60"
                  width="260"
                  height="260"
                  viewBox="0 0 260 260"
                >
                  <defs>
                    <linearGradient
                      id="js-hero-strip"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 40L200 0L260 160L60 210Z"
                    fill="url(#js-hero-strip)"
                  />
                </svg>

                {/* dotted pattern */}
                <svg
                  className="absolute bottom-0 left-4 opacity-30"
                  width="200"
                  height="80"
                  viewBox="0 0 200 80"
                >
                  <defs>
                    <pattern
                      id="js-hero-dots"
                      x="0"
                      y="0"
                      width="8"
                      height="8"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="1" cy="1" r="1" fill="#1e293b" />
                    </pattern>
                  </defs>
                  <rect
                    width="200"
                    height="80"
                    fill="url(#js-hero-dots)"
                  />
                </svg>

                {/* wave divider at bottom */}
                <svg
                  className="absolute bottom-0 left-0 w-full opacity-60 text-slate-900"
                  viewBox="0 0 1440 80"
                  preserveAspectRatio="none"
                >
                  <path
                    fill="currentColor"
                    d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,26.7C840,21,960,43,1080,48C1200,53,1320,43,1380,37.3L1440,32L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"
                  />
                </svg>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-sky-500/60 px-3 py-1 text-[11px] text-sky-200">
                      <Layers size={13} />
                      <span className="uppercase tracking-[0.18em]">
                        {segmentData?.title || roadmapData.trackTitle}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-sky-50 tracking-wide flex items-center gap-2">
                      {mod.title}
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 border border-amber-300/40">
                        <Star size={13} className="text-amber-300" />
                      </span>
                    </h2>

                    <p className="text-xs md:text-sm text-slate-400 flex items-center gap-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Segment:{" "}
                        <span className="text-slate-200">
                          {segmentData?.title || roadmapData.trackTitle}
                        </span>
                      </span>
                      <span className="mx-1 text-slate-600">•</span>
                      <span>
                        Track:{" "}
                        <span className="text-slate-200">
                          {roadmapData.trackTitle}
                        </span>
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
                        <span className="px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/60 text-purple-100">
                          {mod.difficulty}
                        </span>
                      )}

                      {mod.estimatedHours && (
                        <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-100">
                          ⏱ {mod.estimatedHours} hrs
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-300 flex items-center gap-2">
                      <span>
                        {completedCount}/{totalTopics || 0} Topics
                      </span>
                      <span className="px-2 py-[2px] rounded-full bg-slate-900 border border-slate-700 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {progressPercent}% Done
                      </span>
                    </div>
                  </div>
                </div>

                {mod.summary && (
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed mt-2">
                    {mod.summary}
                  </p>
                )}

                {/* Meta info row */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
                  {Array.isArray(mod.prerequisites) &&
                    mod.prerequisites.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
                        <ChevronRight size={12} className="text-sky-300" />
                        Prerequisites: {mod.prerequisites.length} module
                        {mod.prerequisites.length > 1 ? "s" : ""}
                      </span>
                    )}

                  <Link
                    to={`/${roadmapData.folder}/roadmap`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-sky-500 text-sky-300 hover:bg-sky-600 hover:text-white transition bg-slate-950/60"
                  >
                    <ArrowLeft size={14} />
                    Back to Roadmap
                  </Link>

                  {lastTopicIndex != null &&
                    lastTopicIndex >= 0 &&
                    lastTopicIndex < totalTopics && (
                      <Link
                        to={`/${roadmapData.folder}/topic/${mod.slug}/${lastTopicIndex}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm shadow-emerald-500/30"
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
                border border-slate-800 bg-slate-900/80 p-6 rounded-3xl 
                shadow-lg backdrop-blur-xl animate-slideUp relative overflow-hidden
              "
            >
              {/* subtle top accent line */}
              <svg
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-1"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="js-topics-line"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#js-topics-line)" />
              </svg>

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-2xl bg-sky-500/10 border border-sky-500/40 flex items-center justify-center">
                      <Layers size={18} className="text-sky-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-100">
                        Topics Covered
                      </h2>
                      <p className="text-[11px] text-slate-400">
                        Explore each topic and click ✓ when you finish.
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end text-[11px] text-slate-400">
                    <span>
                      Total Topics:{" "}
                      <span className="text-sky-300 font-semibold">
                        {totalTopics}
                      </span>
                    </span>
                    <span>
                      Completed:{" "}
                      <span className="text-emerald-300 font-semibold">
                        {completedCount}
                      </span>
                    </span>
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
                            group flex items-center gap-3 px-4 py-3 rounded-xl border text-sm 
                            md:text-base transition-all shadow-sm relative overflow-hidden
                            ${
                              isDone
                                ? "bg-emerald-900/20 border-emerald-500/70 text-emerald-100 shadow-[0_0_18px_rgba(34,197,94,0.4)]"
                                : "bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800/90 hover:border-sky-500/70 hover:shadow-sky-500/20"
                            }
                          `}
                        >
                          {/* subtle left accent bar */}
                          <span
                            className={`
                              absolute left-0 top-0 h-full w-[3px] 
                              ${
                                isDone
                                  ? "bg-gradient-to-b from-emerald-400 to-emerald-600"
                                  : "bg-gradient-to-b from-slate-700 to-sky-500/70 group-hover:from-sky-400 group-hover:to-sky-600"
                              }
                            `}
                            aria-hidden="true"
                          />

                          <button
                            type="button"
                            onClick={() => toggleTopicComplete(idx)}
                            className="shrink-0 inline-flex items-center justify-center relative z-10"
                            title={
                              isDone
                                ? "Mark as incomplete"
                                : "Mark as completed"
                            }
                          >
                            {isDone ? (
                              <CheckCircle2
                                size={20}
                                className="text-emerald-400"
                              />
                            ) : (
                              <Circle
                                size={20}
                                className="text-slate-400 group-hover:text-sky-300"
                              />
                            )}
                          </button>

                          <Link
                            to={`/${roadmapData.folder}/topic/${mod.slug}/${idx}`}
                            onClick={() => handleTopicClick(idx)}
                            className="flex-1 flex items-center justify-between gap-3 relative z-10"
                          >
                            <span className="flex-1">
                              <span className="text-sky-400 mr-1 text-xs md:text-sm">
                                {idx + 1}.
                              </span>
                              <span className="text-sm md:text-[15px]">
                                {topic}
                              </span>
                            </span>
                            <span className="text-[11px] text-sky-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              Open
                              <ChevronRight size={12} />
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* MODULE FOOTER NAV */}
            <section className="flex flex-wrap items-center justify-between gap-3 text-xs mt-4">
              <div>
                {prevModule ? (
                  <Link
                    to={`/${roadmapData.folder}/module/${prevModule.slug}`}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-950/80 border border-slate-700 hover:bg-slate-900 hover:border-sky-500 text-slate-200 transition shadow-sm"
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
                  <span className="text-slate-500 text-[11px]">
                    You are at the first module of this track.
                  </span>
                )}
              </div>

              <div>
                {nextModule ? (
                  <Link
                    to={`/${roadmapData.folder}/module/${nextModule.slug}`}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white transition shadow-md shadow-sky-500/30"
                  >
                    <div className="flex flex-col text-right">
                      <span className="uppercase text-[10px] text-sky-100/80">
                        Next Module
                      </span>
                      <span className="text-[11px] line-clamp-1">
                        {nextModule.title}
                      </span>
                    </div>
                    <ChevronRight size={14} />
                  </Link>
                ) : (
                  <span className="text-slate-500 text-[11px]">
                    You’ve reached the final module of this JavaScript track.
                  </span>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
