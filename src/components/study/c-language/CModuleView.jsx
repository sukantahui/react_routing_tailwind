// src/components/study/JavaScriptModuleView.jsx

import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Star,
} from "lucide-react";

import roadmapData from "./c-language-roadmap.json";

export default function CModuleView() {
  const { slug } = useParams();

  // -------------------------------------------
  // FIND MODULE + SEGMENT + LINEAR INDEX
  // -------------------------------------------
  const { moduleData, flatModules, currentIndex } = useMemo(() => {
    const flat = [];
    let indexCounter = 0;

    roadmapData.segments.forEach((seg) => {
      seg.modules.forEach((m) => {
        flat.push({
          ...m,
          __index: indexCounter++,
        });
      });
    });

    const foundModule = flat.find((m) => m.slug === slug);
    const foundIndex = foundModule ? foundModule.__index : -1;

    return {
      moduleData: foundModule,
      flatModules: flat,
      currentIndex: foundIndex,
    };
  }, [slug]);

  // -------------------------------------------
  // MODULE NOT FOUND
  // -------------------------------------------
  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">Module Not Found</h1>
          <p className="text-slate-400 mt-2">
            The module you are looking for does not exist.
          </p>

          <Link
            to={`/${roadmapData.folder}/roadmap`}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-sky-500 text-sky-300 rounded-full hover:bg-sky-600 hover:text-white transition"
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
  // TOPIC PROGRESS (localStorage)
  // -------------------------------------------
  const PROGRESS_KEY = `${roadmapData.folder}_module_progress_${mod.moduleId}`;
  const LAST_TOPIC_KEY = `${roadmapData.folder}_module_lastTopic_${mod.moduleId}`;

  const [completedTopics, setCompletedTopics] = useState([]);
  const [lastTopicIndex, setLastTopicIndex] = useState(null);
  const [searchTopic, setSearchTopic] = useState("");

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
      const updated = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];

      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleTopicClick = (index) => {
    localStorage.setItem(LAST_TOPIC_KEY, String(index));
    setLastTopicIndex(index);
  };

  const completedCount = completedTopics.length;

  // -------------------------------------------
  // MODULE NAVIGATION
  // -------------------------------------------
  const prevModule = currentIndex > 0 ? flatModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < flatModules.length - 1
      ? flatModules[currentIndex + 1]
      : null;

  // -------------------------------------------
  // RENDER
  // -------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* ================= STICKY HEADER ================= */}
      <div className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">

          {/* LEFT */}
          <div>
            <Link
              to={`/${roadmapData.folder}/roadmap`}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-sky-300 mb-1"
            >
              <ArrowLeft size={14} />
              Back to Roadmap
            </Link>

            <p className="text-[11px] uppercase text-slate-500 flex items-center gap-2">
              <BookOpen size={13} className="text-sky-300" />
              {roadmapData.trackTitle}
            </p>

            <h1 className="text-xl font-bold text-sky-300">
              {mod.title}
            </h1>
          </div>

          {/* RIGHT */}
          <div className="text-right text-[11px] text-slate-400">
            {completedCount}/{totalTopics} Completed
          </div>

        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-4xl mx-auto p-6 space-y-10">

        {/* MODULE HERO */}
        <section className="border border-slate-800 bg-slate-900/70 p-6 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
            {mod.title}
            <Star size={16} className="text-amber-300" />
          </h2>
          {mod.summary && (
            <p className="text-slate-300 mt-2">{mod.summary}</p>
          )}
        </section>

        {/* TOPICS */}
        <section className="border border-slate-800 bg-slate-900/80 p-6 rounded-3xl shadow-lg">

          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Topics Covered</h2>
            <span className="text-xs text-slate-400">
              {totalTopics} Topics
            </span>
          </div>

          <input
            type="text"
            placeholder="Search topics..."
            value={searchTopic}
            onChange={(e) => setSearchTopic(e.target.value)}
            className="
              w-full mb-4 px-3 py-2 rounded-lg
              bg-slate-800 border border-slate-700
              text-slate-200 placeholder-slate-500
              focus:ring-2 focus:ring-sky-500
            "
          />

          <div className="space-y-3">
            {topics
              .map((topic, idx) => ({ topic, idx }))
              .filter(({ topic }) =>
                topic.toLowerCase().includes(searchTopic.toLowerCase())
              )
              .map(({ topic, idx }) => {
                const done = completedTopics.includes(idx);

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
                      done
                        ? "bg-emerald-900/20 border-emerald-500 text-emerald-200"
                        : "bg-slate-900/80 border-slate-700 hover:border-sky-500"
                    }`}
                  >
                    <button onClick={() => toggleTopicComplete(idx)}>
                      {done ? (
                        <CheckCircle2 size={20} className="text-emerald-400" />
                      ) : (
                        <Circle size={20} className="text-slate-400" />
                      )}
                    </button>

                    <Link
                      to={`/${roadmapData.folder}/topic/${mod.slug}/${idx}`}
                      onClick={() => handleTopicClick(idx)}
                      className="flex-1 flex justify-between"
                    >
                      <span>
                        <span className="text-sky-400 mr-1">{idx + 1}.</span>
                        {topic}
                      </span>
                      <span className="text-sky-300 text-xs flex items-center gap-1">
                        Open <ChevronRight size={12} />
                      </span>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>

        {/* MODULE NAVIGATION */}
        <section className="flex justify-between text-sm">
          {prevModule ? (
            <Link
              to={`/${roadmapData.folder}/module/${prevModule.slug}`}
              className="px-3 py-2 rounded-full border border-slate-700 hover:border-sky-500"
            >
              ← {prevModule.title}
            </Link>
          ) : (
            <span className="text-slate-600">No previous module</span>
          )}

          {nextModule ? (
            <Link
              to={`/${roadmapData.folder}/module/${nextModule.slug}`}
              className="px-3 py-2 rounded-full bg-sky-600 text-white hover:bg-sky-500"
            >
              {nextModule.title} →
            </Link>
          ) : (
            <span className="text-slate-600">End of track</span>
          )}
        </section>

      </div>
    </div>
  );
}
