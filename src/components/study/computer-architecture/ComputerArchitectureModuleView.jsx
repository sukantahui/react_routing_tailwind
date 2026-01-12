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
import roadmapData from "./computer-architecture-roadmap.json";
import Whiteboard from "../../../common/Whiteboard";

export default function ComputerArchitectureModuleView() {
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
  //  TOPIC PROGRESS (localStorage)
  // -------------------------------------------
  const PROGRESS_KEY = `${roadmapData.folder}_module_progress_${mod.moduleId}`;
  const LAST_TOPIC_KEY = `${roadmapData.folder}_module_lastTopic_${mod.moduleId}`;

  const [completedTopics, setCompletedTopics] = useState([]);
  const [lastTopicIndex, setLastTopicIndex] = useState(null);

  // -------------------------------------------
  //  NEW: SEARCH TOPICS
  // -------------------------------------------
  const [searchTopic, setSearchTopic] = useState("");
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  const toggleWhiteboard = () => {
    setShowWhiteboard(prev => !prev);
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY) || "[]";
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCompletedTopics(parsed);
    } catch { }

    try {
      const rawLast = localStorage.getItem(LAST_TOPIC_KEY);
      if (rawLast !== null) {
        const idx = parseInt(rawLast, 10);
        if (!isNaN(idx)) setLastTopicIndex(idx);
      }
    } catch { }
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
    localStorage.setItem(LAST_TOPIC_KEY, String(index));
    setLastTopicIndex(index);
  };

  const completedCount = completedTopics.length;
  const progressPercent =
    totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // -------------------------------------------
  // MODULE NAVIGATION
  // -------------------------------------------
  const prevModule = currentIndex > 0 ? flatModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < flatModules.length - 1
      ? flatModules[currentIndex + 1]
      : null;

  // -------------------------------------------
  // RENDER PAGE
  // -------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative z-10">
        <div className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
            <div>
              <p className="text-[11px] uppercase text-slate-500 flex items-center gap-2">
                <BookOpen size={13} className="text-sky-300" />
                {roadmapData.trackTitle}
              </p>
              <h1 className="text-xl font-bold text-sky-300">
                {mod.title}
              </h1>
            </div>

            <div className="text-right text-[11px] text-slate-400">
              {completedCount}/{totalTopics} Completed
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 space-y-10">

          {/* ------------------------------------------- */}
          {/* MODULE HERO */}
          {/* ------------------------------------------- */}
          <section className="border border-slate-800 bg-slate-900/70 p-6 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
              {mod.title}
              <Star size={16} className="text-amber-300" />
            </h2>
            {mod.summary && (
              <p className="text-slate-300 mt-2">{mod.summary}</p>
            )}
          </section>

          {/* ------------------------------------------- */}
          {/* TOPICS + SEARCH */}
          {/* ------------------------------------------- */}

          <section className="border border-slate-800 bg-slate-900/80 p-6 rounded-3xl shadow-lg">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-100">
                Topics Covered
              </h2>

              <span className="text-[11px] text-slate-400">
                {totalTopics} Topics
              </span>
            </div>

            {/* 🔍 SEARCH BAR */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                className="
                  w-full px-3 py-2 rounded-lg 
                  bg-slate-800 border border-slate-700 
                  text-slate-200 placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-sky-500
                "
              />
            </div>

            {/* TOPIC LIST */}
            <div className="space-y-3">

              {topics
                .map((topic, idx) => ({ topic, idx }))
                .filter(({ topic }) =>
                  topic.toLowerCase().includes(searchTopic.toLowerCase())
                )
                .map(({ topic, idx }) => {
                  const isDone = completedTopics.includes(idx);

                  return (
                    <div
                      key={idx}
                      className={`
                        group flex items-center gap-3 px-4 py-3 rounded-xl border text-sm
                        ${isDone
                          ? "bg-emerald-900/20 border-emerald-500 text-emerald-200"
                          : "bg-slate-900/80 border-slate-700 text-slate-200 hover:border-sky-500"
                        }
                      `}
                    >
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleTopicComplete(idx)}
                        className="shrink-0"
                      >
                        {isDone ? (
                          <CheckCircle2 size={20} className="text-emerald-400" />
                        ) : (
                          <Circle size={20} className="text-slate-400 group-hover:text-sky-300" />
                        )}
                      </button>

                      {/* Topic Link */}
                      <Link
                        to={`/${roadmapData.folder}/topic/${mod.slug}/${idx}`}
                        onClick={() => handleTopicClick(idx)}
                        className="flex-1 flex justify-between"
                      >
                        <span>
                          <span className="text-sky-400 mr-1">{idx + 1}.</span>
                          {topic}
                        </span>
                        <span className="text-sky-300 text-[11px] flex items-center gap-1">
                          Open <ChevronRight size={12} />
                        </span>
                      </Link>
                    </div>
                  );
                })}

              {/* No results */}
              {topics.filter((t) =>
                t.toLowerCase().includes(searchTopic.toLowerCase())
              ).length === 0 && (
                  <p className="text-slate-500 text-sm italic mt-2">
                    No topics matched your search…
                  </p>
                )}
            </div>
          </section>

          {/* ------------------------------------------- */}
          {/* MODULE NAVIGATION */}
          {/* ------------------------------------------- */}
          <section className="flex justify-between text-sm">

            {prevModule ? (
              <Link
                to={`/${roadmapData.folder}/module/${prevModule.slug}`}
                className="px-3 py-2 rounded-full border border-slate-700 text-slate-300 hover:border-sky-500"
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

          <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
            <button
              onClick={toggleWhiteboard}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl"
            >
              {showWhiteboard ? "Hide Whiteboard" : "Show Whiteboard"}
            </button>

            {showWhiteboard && (
              <div className="border border-slate-700 rounded-xl overflow-hidden h-[450px] bg-slate-800">
                <Whiteboard />
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
