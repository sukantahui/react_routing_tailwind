// src/components/study/JavaScriptTopicView.jsx

import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
} from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Layers,
  Menu,
  X,
} from "lucide-react";
import roadmapData from "./javascript-roadmap-enhanced.json";

// Auto-import Topic*.jsx
const topicModules = import.meta.glob("./topics/*/Topic*.jsx");

// ===================================================================
// OUTER WRAPPER — Forces clean remount on topic change
// ===================================================================
export default function JavaScriptTopicView() {
  const { moduleSlug, topicIndex } = useParams();
  return (
    <JavaScriptTopicViewInner
      key={`${moduleSlug}-${topicIndex}`}
      moduleSlug={moduleSlug}
      topicIndex={topicIndex}
    />
  );
}

// ===================================================================
// MAIN VIEW — Document Reader Mode (B3)
// ===================================================================
function JavaScriptTopicViewInner({ moduleSlug, topicIndex }) {
  const index = Number.parseInt(topicIndex, 10) || 0;
  const activeTopicRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // -----------------------------------------------------
  //  GET MODULE DATA
  // -----------------------------------------------------
  let moduleData = null;
  let segmentData = null;

  for (const segment of roadmapData.segments) {
    const found = segment.modules.find((m) => m.slug === moduleSlug);
    if (found) {
      moduleData = found;
      segmentData = segment;
      break;
    }
  }

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Module Not Found</h1>
        <Link
          to="/javascript/roadmap"
          className="text-sky-400 underline mt-4 inline-block"
        >
          ← Back to Roadmap
        </Link>
      </div>
    );
  }

  const topicTitle = moduleData.topics[index];
  if (!topicTitle) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Topic Not Found</h1>
        <Link
          to={`/javascript/module/${moduleSlug}`}
          className="text-sky-400 underline mt-4 inline-block"
        >
          ← Back to Module
        </Link>
      </div>
    );
  }

  // -----------------------------------------------------
  //  PROGRESS SYSTEM
  // -----------------------------------------------------
  const storageKey = `js-progress-${moduleSlug}`;
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey) || "[]";
    let parsed = [];
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = [];
    }

    if (!parsed.includes(index)) parsed.push(index);
    parsed.sort((a, b) => a - b);

    localStorage.setItem(storageKey, JSON.stringify(parsed));
    setCompletedTopics(parsed);
  }, [index, storageKey]);

  const totalTopics = moduleData.topics.length;
  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  const hasPrev = index > 0;
  const hasNext = index < totalTopics - 1;

  const resetProgress = () => {
    localStorage.removeItem(storageKey);
    setCompletedTopics([]);
  };

  // -----------------------------------------------------
  // DYNAMIC IMPORT TOPIC CONTENT
  // -----------------------------------------------------
  const topicKey = `./topics/${moduleSlug}/Topic${topicIndex}.jsx`;
  const TopicPage = topicModules[topicKey]
    ? React.lazy(topicModules[topicKey])
    : null;

  // -----------------------------------------------------
  // SCROLL active topic into view
  // -----------------------------------------------------
  useEffect(() => {
    if (activeTopicRef.current) {
      activeTopicRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [index]);

  // Close sidebar on large screens change (safety)
  useEffect(() => {
    // Just a light safeguard: when route changes, close mobile sidebar
    setSidebarOpen(false);
  }, [moduleSlug, topicIndex]);

  // ======================================================
  // FULL UI WITH DOCUMENT READER LAYOUT
  // ======================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">

      {/* ===================================================
          GLOBAL SVG BACKGROUND LAYERS
      =================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* SOFT BLUE BLOB TOP-LEFT */}
        <svg className="absolute -top-40 -left-40 opacity-40" width="420" height="420">
          <defs>
            <radialGradient
              id="jsTopicBlob1"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(0,0) rotate(45) scale(400)"
            >
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="200" fill="url(#jsTopicBlob1)" />
        </svg>

        {/* SOFT PURPLE BLOB BOTTOM-RIGHT */}
        <svg className="absolute bottom-[-160px] right-[-130px] opacity-40" width="420" height="420">
          <defs>
            <radialGradient
              id="jsTopicBlob2"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(400,400) rotate(225) scale(400)"
            >
              <stop stopColor="#a855f7" />
              <stop offset="1" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="200" fill="url(#jsTopicBlob2)" />
        </svg>

        {/* FAINT GRID */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
          <defs>
            <pattern
              id="jsTopicGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M40 0H0V40" fill="none" stroke="#1f2937" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#jsTopicGrid)" />
        </svg>
      </div>

      {/* ===================================================
          TOP APP BAR (Sticky)
      =================================================== */}
      <header className="relative z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* LEFT: Module / Segment */}
          <div className="flex items-center gap-3">
            <Link
              to="/javascript/roadmap"
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-300 hover:border-sky-500 hover:text-sky-300 transition"
            >
              <ArrowLeft size={12} className="mr-1" />
              Roadmap
            </Link>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <Layers size={12} className="text-sky-400" />
                <span>{roadmapData.trackTitle}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {segmentData?.title} • {moduleData.title}
              </p>
            </div>
          </div>

          {/* RIGHT: Progress + Topic & Nav */}
          <div className="flex items-center gap-3">
            {/* Progress pill */}
            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <BookOpen size={13} className="text-sky-400" />
                <span>
                  Topic {index + 1} of {totalTopics}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-28 h-1.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] text-sky-300 font-semibold">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Prev / Next buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {hasPrev ? (
                <Link
                  to={`/javascript/topic/${moduleSlug}/${index - 1}`}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-[11px] text-slate-200 flex items-center gap-1 transition"
                >
                  <ArrowLeft size={13} />
                  Prev
                </Link>
              ) : (
                <button
                  disabled
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-900 text-[11px] text-slate-600 cursor-not-allowed"
                >
                  <ArrowLeft size={13} />
                  Prev
                </button>
              )}

              {hasNext ? (
                <Link
                  to={`/javascript/topic/${moduleSlug}/${index + 1}`}
                  className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 border border-sky-500 text-[11px] text-white flex items-center gap-1 transition"
                >
                  Next
                  <ArrowRight size={13} />
                </Link>
              ) : (
                <button
                  disabled
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-900 text-[11px] text-slate-600 cursor-not-allowed"
                >
                  Next
                  <ArrowRight size={13} />
                </button>
              )}
            </div>

            {/* Mobile: Topics button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-100 hover:bg-slate-800 sm:hidden"
            >
              <Menu size={14} />
              Topics
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================
          CONTENT AREA — Document Reader
      =================================================== */}
      <div className="relative z-20 flex-1 flex justify-center">
        <div className="w-full max-w-6xl mx-auto flex">

          {/* =================================================
              SIDEBAR (Desktop: fixed; Mobile: sliding drawer)
          ================================================= */}
          {/* Desktop Sidebar */}
          <aside
            className="
              hidden lg:flex flex-col w-72 shrink-0
              border-r border-slate-800/70 bg-slate-950/60 backdrop-blur-xl
              pt-6 pb-8 px-4
            "
          >
            {/* PROGRESS CARD */}
            <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="uppercase tracking-[0.18em] text-[10px] text-slate-500">
                  Progress
                </span>
                <span className="text-[11px] text-sky-300 font-semibold">
                  {completedCount}/{totalTopics}
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <button
                type="button"
                onClick={resetProgress}
                className="mt-2 text-[11px] text-rose-300 hover:text-rose-400"
              >
                Reset Progress
              </button>
            </div>

            {/* TOPIC LIST */}
            <div className="space-y-2 text-sm">
              {moduleData.topics.map((title, i) => {
                const isActive = i === index;
                const isCompleted = completedTopics.includes(i);

                return (
                  <Link
                    key={i}
                    ref={isActive ? activeTopicRef : null}
                    to={`/javascript/topic/${moduleSlug}/${i}`}
                    className={`
                      relative flex items-center gap-3 px-3 py-2 rounded-xl border transition
                      ${
                        isActive
                          ? "border-sky-500 bg-sky-600/90 text-white shadow-lg"
                          : "border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-800/90"
                      }
                    `}
                  >
                    {/* left accent bar */}
                    <span
                      className={`
                        absolute left-0 top-0 h-full w-[3px]
                        ${
                          isActive
                            ? "bg-sky-300"
                            : "bg-slate-700"
                        }
                      `}
                    />

                    {isCompleted ? (
                      <CheckCircle2
                        size={16}
                        className="text-emerald-400 shrink-0"
                      />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0" />
                    )}

                    <span className="truncate">
                      <span className="text-sky-300 mr-1 text-xs">
                        {i + 1}.
                      </span>
                      {title}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Sidebar Footer Links */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
              <Link
                to={`/javascript/module/${moduleSlug}`}
                className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
              >
                ← Back to Module Overview
              </Link>
              <Link
                to="/javascript/roadmap"
                className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
              >
                📍 JavaScript Roadmap
              </Link>
              <a
                href="/play"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
              >
                🧪 CNAT Playground
              </a>
            </div>
          </aside>

          {/* Mobile Sliding Sidebar */}
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              {/* Drawer */}
              <aside
                className="
                  fixed inset-y-0 left-0 z-50 w-72
                  bg-slate-950/95 backdrop-blur-xl border-r border-slate-800
                  pt-4 pb-6 px-4 flex flex-col lg:hidden
                  transform transition-transform duration-300
                "
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-sky-400" />
                    <span className="text-sm font-semibold text-sky-300">
                      {moduleData.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* PROGRESS (compact) */}
                <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-[11px] text-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="uppercase tracking-[0.18em] text-[10px] text-slate-500">
                      Progress
                    </span>
                    <span className="text-sky-300 font-semibold">
                      {completedCount}/{totalTopics}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={resetProgress}
                    className="mt-2 text-[10px] text-rose-300 hover:text-rose-400"
                  >
                    Reset Progress
                  </button>
                </div>

                {/* TOPIC LIST MOBILE */}
                <div className="flex-1 overflow-y-auto space-y-2 text-sm">
                  {moduleData.topics.map((title, i) => {
                    const isActive = i === index;
                    const isCompleted = completedTopics.includes(i);

                    return (
                      <Link
                        key={i}
                        to={`/javascript/topic/${moduleSlug}/${i}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          relative flex items-center gap-3 px-3 py-2 rounded-xl border transition
                          ${
                            isActive
                              ? "border-sky-500 bg-sky-600/90 text-white shadow-lg"
                              : "border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-800/90"
                          }
                        `}
                      >
                        <span
                          className={`
                            absolute left-0 top-0 h-full w-[3px]
                            ${
                              isActive
                                ? "bg-sky-300"
                                : "bg-slate-700"
                            }
                          `}
                        />

                        {isCompleted ? (
                          <CheckCircle2
                            size={16}
                            className="text-emerald-400 shrink-0"
                          />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0" />
                        )}

                        <span className="truncate">
                          <span className="text-sky-300 mr-1 text-xs">
                            {i + 1}.
                          </span>
                          {title}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Footer Links */}
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <Link
                    to={`/javascript/module/${moduleSlug}`}
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                  >
                    ← Back to Module Overview
                  </Link>
                  <Link
                    to="/javascript/roadmap"
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                  >
                    📍 JavaScript Roadmap
                  </Link>
                  <a
                    href="/play"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                  >
                    🧪 CNAT Playground
                  </a>
                </div>
              </aside>
            </>
          )}

          {/* =================================================
              DOCUMENT READER PANEL
          ================================================= */}
          <main className="flex-1 flex justify-center px-4 lg:px-8 py-6 lg:py-10">
            <div className="w-full max-w-3xl">

              {/* Topic Header Card */}
              <div
                className="
                  mb-6 rounded-2xl border border-slate-800
                  bg-slate-900/60 backdrop-blur-xl shadow-xl
                  relative overflow-hidden
                "
              >
                {/* top gradient strip */}
                <svg
                  className="absolute top-0 left-0 w-full h-1.5"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="jsTopicHeaderLine"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#jsTopicHeaderLine)" />
                </svg>

                <div className="relative z-10 p-5 md:p-6 flex flex-col gap-3 md:gap-0 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 px-2 py-[2px] text-[9px] text-sky-300">
                        Topic {index + 1} / {totalTopics}
                      </span>
                      <span>
                        {moduleData.level || "Module"} •{" "}
                        {moduleData.difficulty || "Difficulty"}
                      </span>
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-sky-300 leading-snug">
                      {topicTitle}
                    </h1>
                    <p className="text-[12px] text-slate-400 mt-1">
                      Module:{" "}
                      <span className="text-slate-200">
                        {moduleData.title}
                      </span>
                    </p>
                  </div>

                  {/* Compact navigation for small widths */}
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    {hasPrev ? (
                      <Link
                        to={`/javascript/topic/${moduleSlug}/${index - 1}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-[11px] text-slate-200"
                      >
                        <ArrowLeft size={13} />
                        Prev
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-[11px] text-slate-600"
                      >
                        <ArrowLeft size={13} />
                        Prev
                      </button>
                    )}

                    {hasNext ? (
                      <Link
                        to={`/javascript/topic/${moduleSlug}/${index + 1}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 border border-sky-500 text-[11px] text-white"
                      >
                        Next
                        <ArrowRight size={13} />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-[11px] text-slate-600"
                      >
                        Next
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Actual Topic Content — Document Reader */}
              <section
                className="
                  relative rounded-3xl border border-slate-800
                  bg-slate-900/70 backdrop-blur-lg shadow-[0_22px_45px_rgba(15,23,42,0.75)]
                  px-5 md:px-8 py-6 md:py-8
                "
              >
                {/* subtle dots decoration */}
                <svg className="absolute right-6 bottom-6 h-24 opacity-15">
                  <defs>
                    <pattern
                      id="jsTopicDots"
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="2" cy="2" r="2" fill="#1e293b" />
                    </pattern>
                  </defs>
                  <rect width="200" height="200" fill="url(#jsTopicDots)" />
                </svg>

                <Suspense
                  fallback={
                    <p className="text-slate-400 text-sm">
                      Loading topic content…
                    </p>
                  }
                >
                  {TopicPage ? (
                    <TopicPage key={topicKey} />
                  ) : (
                    <div className="text-slate-300 text-sm">
                      <p className="mb-1">Topic file missing:</p>
                      <pre className="text-sky-400 mt-2 text-xs bg-slate-950/60 rounded-lg p-3 border border-slate-800 overflow-x-auto">
{`src/components/study/javascript/topics/${moduleSlug}/Topic${topicIndex}.jsx`}
                      </pre>
                    </div>
                  )}
                </Suspense>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
