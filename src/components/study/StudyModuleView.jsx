// src/components/study/quantitative-analysis/QuantitativeAnalysisModuleView.jsx

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Layers,
  Clock,
  ShieldCheck,
  Sparkles,
  Search,
  X,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  CheckCheck,
  ListOrdered,
  FileText,
  HelpCircle,
  Calculator,
  Compass,
  LayoutGrid,
  List
} from "lucide-react";

export default function StudyModuleView({
  roadmapData,
  subjectKey = roadmapData?.folder || "study",
}) {
  const { slug } = useParams();

  if (!roadmapData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="text-center max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <HelpCircle size={44} className="text-rose-400 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-slate-100">Study module data unavailable</h1>
          <p className="text-sm text-slate-400 mt-2">
            No roadmap data was supplied to the master module view.
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------
  // FIND MODULE + SEGMENT + LINEAR INDEX
  // -------------------------------------------
  const { moduleData, segmentData, flatModules, currentIndex } = useMemo(() => {
    let foundModule = null;
    let foundSegment = null;
    let foundIndex = -1;

    const flat = [];
    let indexCounter = 0;

    roadmapData.segments.forEach((seg, sIdx) => {
      seg.modules.forEach((m, mIdx) => {
        const item = {
          ...m,
          segmentId: seg.segmentId,
          segmentTitle: seg.title,
          segmentLevel: seg.level,
          segmentIndex: sIdx,
          moduleIndexInSegment: mIdx + 1,
          __index: indexCounter++,
        };
        flat.push(item);

        if (m.slug === slug) {
          foundModule = item;
          foundSegment = seg;
          foundIndex = item.__index;
        }
      });
    });

    return {
      moduleData: foundModule,
      segmentData: foundSegment,
      flatModules: flat,
      currentIndex: foundIndex,
    };
  }, [slug]);

  // -------------------------------------------
  // STORAGE KEYS
  // -------------------------------------------
  const PROGRESS_KEY = `${subjectKey}_module_progress_${moduleData?.moduleId || ""}`;
  const LAST_TOPIC_KEY = `${subjectKey}_module_lastTopic_${moduleData?.moduleId || ""}`;
  const COMPLETED_MODULE_KEY = `${subjectKey}-module-completed::${moduleData?.moduleId || ""}`;
  const BOOKMARKED_MODULE_KEY = `${subjectKey}-module-bookmarked::${moduleData?.moduleId || ""}`;
  const LAST_VISITED_MODULE_KEY = `${subjectKey}-last-visited-module`;

  // -------------------------------------------
  // STATE
  // -------------------------------------------
  const [completedTopics, setCompletedTopics] = useState([]);
  const [lastTopicIndex, setLastTopicIndex] = useState(null);
  const [searchTopic, setSearchTopic] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'incomplete' | 'completed'
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [topicViewMode, setTopicViewMode] = useState(() => {
    try {
      return localStorage.getItem("study-module-view-mode") || "list";
    } catch {
      return "list";
    }
  });

  const handleViewModeChange = (mode) => {
    setTopicViewMode(mode);
    try {
      localStorage.setItem("study-module-view-mode", mode);
    } catch {
      // ignore
    }
  };

  // Show quick toast notification
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null), 2400;
    });
  }, []);

  // -------------------------------------------
  // INITIALIZE STATE & STORAGE
  // -------------------------------------------
  useEffect(() => {
    if (!moduleData) return;

    // Load completed topics
    try {
      const raw = localStorage.getItem(PROGRESS_KEY) || "[]";
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCompletedTopics(parsed);
    } catch (e) {
      void e;
      setCompletedTopics([]);
    }

    // Load last topic
    try {
      const rawLast = localStorage.getItem(LAST_TOPIC_KEY);
      if (rawLast !== null) {
        const idx = parseInt(rawLast, 10);
        if (!isNaN(idx)) setLastTopicIndex(idx);
      }
    } catch (e) {
      void e;
      setLastTopicIndex(null);
    }

    // Load bookmark
    try {
      const bm = localStorage.getItem(BOOKMARKED_MODULE_KEY) === "true";
      setIsBookmarked(bm);
    } catch (e) {
      void e;
      setIsBookmarked(false);
    }

    // Record last visited module
    try {
      const data = {
        slug: moduleData.slug,
        title: moduleData.title,
        moduleId: moduleData.moduleId,
        segmentId: segmentData?.segmentId || "",
        segmentTitle: segmentData?.title || "",
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(LAST_VISITED_MODULE_KEY, JSON.stringify(data));
    } catch (e) {
      void e;
    }
  }, [moduleData, segmentData, PROGRESS_KEY, LAST_TOPIC_KEY, BOOKMARKED_MODULE_KEY]);

  // Sync with overall module completion when all topics are done
  const topics = useMemo(() => {
    return Array.isArray(moduleData?.topics) ? moduleData.topics : [];
  }, [moduleData]);
  const totalTopics = topics.length;
  const completedCount = completedTopics.length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // -------------------------------------------
  // TOPIC HANDLERS
  // -------------------------------------------
  const toggleTopicComplete = (index) => {
    setCompletedTopics((prev) => {
      const updated = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];

      updated.sort((a, b) => a - b);
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
        
        // If all topics completed, mark whole module completed
        if (updated.length === totalTopics && totalTopics > 0) {
          localStorage.setItem(COMPLETED_MODULE_KEY, "true");
          showToast("🎉 All topics completed! Module marked finished.");
        }
      } catch (e) {
        void e;
      }
      return updated;
    });
  };

  const handleTopicClick = (index) => {
    try {
      localStorage.setItem(LAST_TOPIC_KEY, String(index));
      setLastTopicIndex(index);
    } catch (e) {
      void e;
    }
  };

  const handleMarkAllTopics = (complete = true) => {
    if (complete) {
      const allIndices = topics.map((_, i) => i);
      setCompletedTopics(allIndices);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(allIndices));
      localStorage.setItem(COMPLETED_MODULE_KEY, "true");
      showToast("Marked all topics completed.");
    } else {
      setCompletedTopics([]);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify([]));
      localStorage.setItem(COMPLETED_MODULE_KEY, "false");
      showToast("Reset all topic progress.");
    }
  };

  const toggleBookmarkModule = () => {
    const nextVal = !isBookmarked;
    setIsBookmarked(nextVal);
    localStorage.setItem(BOOKMARKED_MODULE_KEY, String(nextVal));
    showToast(nextVal ? "Module bookmarked." : "Bookmark removed.");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast("Direct module link copied to clipboard.");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // -------------------------------------------
  // MODULE NOT FOUND
  // -------------------------------------------
  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="text-center max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <HelpCircle size={44} className="text-rose-400 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-slate-100">Module Not Found</h1>
          <p className="text-sm text-slate-400 mt-2 mb-6">
            The requested module "{slug}" does not exist in the curriculum.
          </p>
          <Link
            to={`/${roadmapData.folder}/roadmap`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 transition"
          >
            <ArrowLeft size={16} />
            Back to Course Roadmap
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------
  // FILTERED TOPICS
  // -------------------------------------------
  const filteredTopics = topics
    .map((topic, idx) => ({ topic, idx }))
    .filter(({ topic, idx }) => {
      // Search query
      if (searchTopic.trim() && !topic.toLowerCase().includes(searchTopic.toLowerCase().trim())) {
        return false;
      }
      // Status filter
      const isDone = completedTopics.includes(idx);
      if (filterMode === "completed" && !isDone) return false;
      if (filterMode === "incomplete" && isDone) return false;
      return true;
    });

  // Next recommended topic to study
  const nextIncompleteTopicIndex = topics.findIndex((_, idx) => !completedTopics.includes(idx));
  const activeTopicTarget = lastTopicIndex !== null
    ? lastTopicIndex
    : (nextIncompleteTopicIndex !== -1 ? nextIncompleteTopicIndex : 0);

  // -------------------------------------------
  // MODULE NAVIGATION
  // -------------------------------------------
  const prevModule = currentIndex > 0 ? flatModules[currentIndex - 1] : null;
  const nextModule = currentIndex < flatModules.length - 1 ? flatModules[currentIndex + 1] : null;

  // Topic classification helper
  const getTopicTypeBadge = (title = "") => {
    const t = title.toLowerCase();
    if (t.startsWith("worked example")) {
      return { text: "Worked Example", badge: "bg-slate-950 text-sky-400 border-slate-800", icon: Calculator };
    }
    if (t.startsWith("practice problem") || t.startsWith("numerical exercise") || t.startsWith("unsolved")) {
      return { text: "Practice Problem", badge: "bg-slate-950 text-amber-400 border-slate-800", icon: FileText };
    }
    if (t.startsWith("short question")) {
      return { text: "Short Question", badge: "bg-slate-950 text-indigo-400 border-slate-800", icon: HelpCircle };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-slate-800 selection:text-slate-200">
      
      {/* ========================================================== */}
      {/* Toast Notification */}
      {/* ========================================================== */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 shadow-2xl backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5 text-sky-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================== */}
      {/* Sticky Header Navigation */}
      {/* ========================================================== */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Breadcrumbs & Module Title */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-0.5">
              <Link
                to={`/${roadmapData.folder}/roadmap`}
                className="hover:text-slate-200 flex items-center gap-1 font-medium transition"
              >
                <ArrowLeft size={14} />
                <span>Roadmap</span>
              </Link>
              <span>/</span>
              <span className="truncate text-slate-500 font-medium">
                {segmentData?.title?.split("–")[0]?.trim() || "Segment"}
              </span>
            </div>

            <h1 className="text-base sm:text-lg md:text-xl font-bold text-slate-100 truncate">
              {moduleData.title}
            </h1>
          </div>

          {/* Right: Quick Action Controls & Topic Progress Counter */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:flex flex-col text-right pr-3 border-r border-slate-800">
              <span className="text-xs uppercase font-bold text-slate-500">Progress</span>
              <span className="text-sm font-bold text-slate-200">
                {completedCount} / {totalTopics} Topics ({progressPercent}%)
              </span>
            </div>

            {/* Copy Direct Link */}
            <button
              onClick={handleCopyLink}
              title="Copy module link"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
            >
              {copiedLink ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>

            {/* Bookmark Module */}
            <button
              onClick={toggleBookmarkModule}
              title={isBookmarked ? "Remove bookmark" : "Bookmark module"}
              className={`p-2.5 rounded-xl border transition ${
                isBookmarked
                  ? "bg-slate-800 border-slate-700 text-amber-400"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>

            {/* Resume / Start Target Topic */}
            {totalTopics > 0 && (
              <Link
                to={`/${roadmapData.folder}/topic/${moduleData.slug}/${activeTopicTarget}`}
                onClick={() => handleTopicClick(activeTopicTarget)}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-sm font-bold transition shadow-sm"
              >
                <span>{lastTopicIndex !== null ? "Resume Topic" : "Start Learning"}</span>
                <ArrowRight size={15} />
              </Link>
            )}
          </div>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 py-5 sm:py-6 space-y-5">

        {/* ========================================================== */}
        {/* Module Overview Card (Compact & Soothing) */}
        {/* ========================================================== */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-6 backdrop-blur-sm shadow-sm">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-slate-950 text-slate-300 border border-slate-800">
              #{moduleData.moduleIndexInSegment} · {moduleData.moduleId}
            </span>

            <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1.5">
              <Layers size={13} className="text-slate-400" />
              {segmentData?.title?.split("–")[0]?.trim() || "Core Segment"}
            </span>

            <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1.5">
              <Clock size={13} className="text-slate-400" />
              {moduleData.estimatedHours} Hours
            </span>

            <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-slate-400" />
              {moduleData.difficulty || "Standard"}
            </span>
          </div>

          {/* Module Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2">
            {moduleData.title}
          </h2>

          {/* Module Summary */}
          {moduleData.summary && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl mb-4">
              {moduleData.summary}
            </p>
          )}

          {/* Learning Outcomes Checklist if available */}
          {Array.isArray(moduleData.learningOutcomes) && moduleData.learningOutcomes.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Compass size={14} className="text-sky-400" />
                Key Learning Outcomes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {moduleData.learningOutcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/50 border border-slate-850 text-xs text-slate-300 leading-normal"
                  >
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Progress Bar */}
          <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>Module Completion</span>
                <span className="font-bold text-slate-100">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => handleMarkAllTopics(completedCount < totalTopics)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <CheckCheck size={14} className="text-slate-400" />
                <span>{completedCount < totalTopics ? "Mark All Done" : "Clear All"}</span>
              </button>

              {completedCount > 0 && (
                <button
                  onClick={() => handleMarkAllTopics(false)}
                  title="Reset topic progress"
                  className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-200 transition"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          </div>

        </section>

        {/* ========================================================== */}
        {/* Topics List & Search Bar Section (Soothing Compact Rows) */}
        {/* ========================================================== */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-5 backdrop-blur-sm shadow-sm">
          
          {/* Header & Topic Counters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ListOrdered size={18} className="text-sky-400" />
                <span>Topics & Curriculum Sequence</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Structured concept tutorials, step-by-step examples, and numerical exercises.
              </p>
            </div>

            <span className="text-xs font-semibold text-slate-300 self-start sm:self-auto bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Showing {filteredTopics.length} of {totalTopics} topics
            </span>
          </div>

          {/* Search Input & View Controls */}
          <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search topics (e.g. decision variables, worked example, slack, dual)..."
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs focus:outline-none focus:border-slate-600 transition"
              />
              {searchTopic && (
                <button
                  onClick={() => setSearchTopic("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Filter Mode Chips */}
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setFilterMode("all")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                  filterMode === "all"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                All ({totalTopics})
              </button>

              <button
                onClick={() => setFilterMode("incomplete")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                  filterMode === "incomplete"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Unfinished ({totalTopics - completedCount})
              </button>

              <button
                onClick={() => setFilterMode("completed")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                  filterMode === "completed"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Done ({completedCount})
              </button>
            </div>

            {/* View Mode Switcher: List vs Grid */}
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleViewModeChange("list")}
                className={`p-1.5 rounded-md transition ${
                  topicViewMode === "list"
                    ? "bg-slate-800 text-slate-200 shadow-sm"
                    : "text-slate-500 hover:text-slate-300"
                }`}
                title="Compact List View"
              >
                <List size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleViewModeChange("grid")}
                className={`p-1.5 rounded-md transition ${
                  topicViewMode === "grid"
                    ? "bg-slate-800 text-slate-200 shadow-sm"
                    : "text-slate-500 hover:text-slate-300"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={14} />
              </button>
            </div>

          </div>

          {/* Topics Items */}
          {topicViewMode === "list" ? (
            /* ====================================================== */
            /* Compact Soothing List Mode */
            /* ====================================================== */
            <div className="space-y-1.5">
              {filteredTopics.map(({ topic, idx }) => {
                const isDone = completedTopics.includes(idx);
                const isLastVisited = lastTopicIndex === idx;
                const badgeInfo = getTopicTypeBadge(topic);

                return (
                  <div
                    key={idx}
                    className={`group flex items-center justify-between gap-3 px-3 py-2 sm:py-2.5 rounded-xl border transition-all duration-150 ${
                      isDone
                        ? "bg-slate-950/40 border-slate-850/60 hover:bg-slate-900/40 hover:border-slate-800"
                        : isLastVisited
                        ? "bg-sky-950/25 border-sky-800/40 hover:border-sky-700/60 shadow-sm"
                        : "bg-slate-950/70 border-slate-850/80 hover:bg-slate-900/80 hover:border-slate-750"
                    }`}
                  >
                    {/* Left: Checkbox + Number + Title + Badges */}
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      {/* Checkbox Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleTopicComplete(idx)}
                        title={isDone ? "Mark incomplete" : "Mark completed"}
                        className="shrink-0 p-0.5 text-slate-500 hover:text-slate-300 transition"
                      >
                        {isDone ? (
                          <CheckCircle2 size={17} className="text-emerald-400" />
                        ) : (
                          <Circle size={17} className="text-slate-600 group-hover:text-slate-400" />
                        )}
                      </button>

                      {/* Numbering */}
                      <span className="text-xs font-mono font-bold text-slate-500 w-5 text-right shrink-0">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>

                      {/* Topic Title */}
                      <Link
                        to={`/${roadmapData.folder}/topic/${moduleData.slug}/${idx}`}
                        onClick={() => handleTopicClick(idx)}
                        className="min-w-0 flex-1 flex items-center gap-2"
                      >
                        <span className={`text-xs sm:text-sm font-medium group-hover:text-sky-300 transition-colors truncate ${
                          isDone ? "text-slate-300" : "text-slate-100"
                        }`}>
                          {topic}
                        </span>

                        {badgeInfo && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${badgeInfo.badge} hidden sm:inline-flex items-center gap-1 shrink-0`}>
                            {badgeInfo.text}
                          </span>
                        )}

                        {isLastVisited && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-950 text-sky-300 border border-sky-700/80 shrink-0">
                            Last Viewed
                          </span>
                        )}
                      </Link>
                    </div>

                    {/* Right: Compact Open / Study Action */}
                    <Link
                      to={`/${roadmapData.folder}/topic/${moduleData.slug}/${idx}`}
                      onClick={() => handleTopicClick(idx)}
                      className={`shrink-0 px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${
                        isDone
                          ? "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-850"
                          : isLastVisited
                          ? "bg-sky-900/50 text-sky-200 border-sky-700/80 hover:bg-sky-850"
                          : "bg-slate-900 text-slate-300 border-slate-800 group-hover:border-slate-700 group-hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <span className="text-[11px]">{isDone ? "Review" : "Study"}</span>
                      <ChevronRight size={13} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ====================================================== */
            /* Grid View Mode */
            /* ====================================================== */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredTopics.map(({ topic, idx }) => {
                const isDone = completedTopics.includes(idx);
                const isLastVisited = lastTopicIndex === idx;
                const badgeInfo = getTopicTypeBadge(topic);

                return (
                  <div
                    key={idx}
                    className={`group p-3 rounded-xl border transition-all flex flex-col justify-between ${
                      isDone
                        ? "bg-slate-950/40 border-slate-850/60 text-slate-400"
                        : isLastVisited
                        ? "bg-sky-950/25 border-sky-800/40 shadow-sm"
                        : "bg-slate-950/70 border-slate-850/80 hover:bg-slate-900/80 hover:border-slate-750"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 mb-2">
                      <button
                        type="button"
                        onClick={() => toggleTopicComplete(idx)}
                        title={isDone ? "Mark incomplete" : "Mark completed"}
                        className="shrink-0 pt-0.5 text-slate-500 hover:text-slate-300 transition"
                      >
                        {isDone ? (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        ) : (
                          <Circle size={16} className="text-slate-600 group-hover:text-slate-400" />
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-mono font-bold text-slate-500">
                            #{idx + 1}
                          </span>
                          {badgeInfo && (
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-medium border ${badgeInfo.badge}`}>
                              {badgeInfo.text}
                            </span>
                          )}
                          {isLastVisited && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-950 text-sky-300 border border-sky-700/80">
                              Last Viewed
                            </span>
                          )}
                        </div>
                        <Link
                          to={`/${roadmapData.folder}/topic/${moduleData.slug}/${idx}`}
                          onClick={() => handleTopicClick(idx)}
                          className="block"
                        >
                          <h4 className={`text-xs sm:text-sm font-medium group-hover:text-sky-300 transition-colors line-clamp-2 ${
                            isDone ? "text-slate-400" : "text-slate-200"
                          }`}>
                            {topic}
                          </h4>
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-end pt-2 border-t border-slate-850/60">
                      <Link
                        to={`/${roadmapData.folder}/topic/${moduleData.slug}/${idx}`}
                        onClick={() => handleTopicClick(idx)}
                        className="text-[11px] font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition"
                      >
                        <span>{isDone ? "Review" : "Study"}</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredTopics.length === 0 && (
            <div className="text-center py-8 px-4 rounded-xl bg-slate-950 border border-slate-850 text-slate-400">
              <Search size={22} className="text-slate-600 mx-auto mb-1.5" />
              <p className="text-xs">No topics matched your search filters.</p>
              <button
                onClick={() => {
                  setSearchTopic("");
                  setFilterMode("all");
                }}
                className="mt-1.5 text-xs text-sky-400 hover:underline font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}

        </section>

        {/* ========================================================== */}
        {/* Module Navigation Footer (Prev / Next) */}
        {/* ========================================================== */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {prevModule ? (
            <Link
              to={`/${roadmapData.folder}/module/${prevModule.slug}`}
              className="group p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition flex items-center gap-3"
            >
              <ArrowLeft size={18} className="text-slate-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] uppercase font-bold text-slate-500">Previous Module</div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 truncate group-hover:text-white transition-colors">
                  {prevModule.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850 text-slate-500 text-xs flex items-center">
              Beginning of course curriculum
            </div>
          )}

          {nextModule ? (
            <Link
              to={`/${roadmapData.folder}/module/${nextModule.slug}`}
              className="group p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition flex items-center justify-between text-right gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[11px] uppercase font-bold text-slate-500">Next Module</div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 truncate group-hover:text-white transition-colors">
                  {nextModule.title}
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850 text-slate-500 text-xs flex items-center justify-end">
              Course completed 🎉
            </div>
          )}
        </nav>

        {/* Footer */}
        <footer className="text-center pt-6 pb-8 text-xs text-slate-500 space-y-1">
          <p>
            © {new Date().getFullYear()} {roadmapData.institute?.name || "Coder & AccoTax"} · {roadmapData.trackTitle}
          </p>
        </footer>

      </main>

    </div>
  );
}
