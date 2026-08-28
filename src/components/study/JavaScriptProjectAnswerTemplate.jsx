import React, { useState, useEffect, useMemo } from "react";
import {
  GraduationCap,
  Code2,
  Terminal,
  Lightbulb,
  BookOpen,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Check,
  Play,
  RotateCcw,
  Printer,
  Target,
  Clock,
  Layers,
  Award,
  Cpu,
  HelpCircle
} from "lucide-react";

import CodeBlock from "../../common/CodeBlock";

/**
 * Helper: decide if answer should be displayed as code block.
 */
const isJavaScriptCode = (answer = "") => {
  if (!answer) return false;
  const lines = answer.split("\n").length;
  return (
    lines > 1 ||
    answer.includes("function") ||
    answer.includes("const ") ||
    answer.includes("let ") ||
    answer.includes("var ") ||
    answer.includes("document.") ||
    answer.includes("addEventListener") ||
    answer.includes("console.log") ||
    answer.includes("=>") ||
    answer.includes("class ") ||
    answer.includes("import ")
  );
};

/**
 * Rich Formatter for Logic & Engine Mechanics text
 */
function FormattedExplanation({ text, accentColor = "amber" }) {
  if (!text) return null;

  const paragraphs = text.split(/\n\n+/);

  const renderFormattedTokens = (str) => {
    const parts = [];
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith("**") && token.endsWith("**")) {
        parts.push(
          <strong key={match.index} className="font-bold text-sky-200">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith("`") && token.endsWith("`")) {
        parts.push(
          <code
            key={match.index}
            className="rounded bg-slate-900 border border-slate-700/80 px-1.5 py-0.5 font-mono text-[11px] text-amber-300"
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }

    return parts.length > 0 ? parts : str;
  };

  return (
    <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
      {paragraphs.map((p, pIdx) => {
        const lines = p.split("\n");

        return (
          <div key={pIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              const isNumberedHeader = /^\d+\.\s+\*\*(.*?)\*\*:?/.test(trimmed) || /^\*\*(.*?)\*\*:?/.test(trimmed);
              const isBullet = /^[-•*]\s+/.test(trimmed);

              if (isNumberedHeader) {
                return (
                  <div key={lIdx} className="font-semibold text-amber-300 flex items-start gap-2 pt-1.5">
                    <span className="text-amber-400">⚡</span>
                    <span>{renderFormattedTokens(trimmed)}</span>
                  </div>
                );
              }

              if (isBullet) {
                return (
                  <div key={lIdx} className="flex items-start gap-2.5 pl-4 py-0.5">
                    <span className="text-sky-400 mt-1 flex-shrink-0 text-xs">◆</span>
                    <span className="text-slate-300">{renderFormattedTokens(trimmed.replace(/^[-•*]\s+/, ""))}</span>
                  </div>
                );
              }

              return (
                <p key={lIdx} className="text-slate-300">
                  {renderFormattedTokens(trimmed)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function JavaScriptProjectAnswerTemplate({ data }) {
  if (!data || !data.projects) return null;

  const {
    projectCategory = "JavaScript Practical Projects",
    subject = "Web Development (JavaScript)",
    board = "General / Industrial Standards",
    class: className = "Core Foundations",
    tools = ["Browser Console", "VS Code", "Node.js"],
    institute = {
      author: "Sukanta Hui",
      name: "Coder & AccoTax",
      location: "Barrackpore & Naihati"
    },
    projects = []
  } = data;

  const storageKey = `js_projects_${projectCategory.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}`;

  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [onlyCompleted, setOnlyCompleted] = useState(false);
  
  // Expanded answers state: map of projectId -> boolean
  const [visibleAnswers, setVisibleAnswers] = useState({});

  // Student progress state: set of completed project IDs
  const [completedMap, setCompletedMap] = useState({});
  // Bookmarked projects state
  const [bookmarkMap, setBookmarkMap] = useState({});

  // Copied state for individual expected outputs
  const [copiedOutputs, setCopiedOutputs] = useState({});

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`${storageKey}_completed`);
      if (savedProgress) setCompletedMap(JSON.parse(savedProgress));

      const savedBookmarks = localStorage.getItem(`${storageKey}_bookmarks`);
      if (savedBookmarks) setBookmarkMap(JSON.parse(savedBookmarks));
    } catch (e) {
      console.warn("Could not load local storage progress:", e);
    }
  }, [storageKey]);

  // Save progress
  const toggleCompleted = (projectId) => {
    setCompletedMap((prev) => {
      const updated = { ...prev, [projectId]: !prev[projectId] };
      try {
        localStorage.setItem(`${storageKey}_completed`, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const toggleBookmark = (projectId) => {
    setBookmarkMap((prev) => {
      const updated = { ...prev, [projectId]: !prev[projectId] };
      try {
        localStorage.setItem(`${storageKey}_bookmarks`, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const toggleAnswer = (projectId) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const expandAll = () => {
    const all = {};
    projects.forEach((p) => {
      all[p.projectId] = true;
    });
    setVisibleAnswers(all);
  };

  const collapseAll = () => {
    setVisibleAnswers({});
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your practice completion progress for this module?")) {
      setCompletedMap({});
      setBookmarkMap({});
      try {
        localStorage.removeItem(`${storageKey}_completed`);
        localStorage.removeItem(`${storageKey}_bookmarks`);
      } catch (e) {}
    }
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedOutputs((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedOutputs((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.projectId.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.learningOutcome && p.learningOutcome.toLowerCase().includes(q)) ||
        (p.logicExplanation && p.logicExplanation.toLowerCase().includes(q));

      const matchDifficulty =
        difficultyFilter === "all" ||
        (p.difficulty && p.difficulty.toLowerCase() === difficultyFilter.toLowerCase());

      const matchBookmark = !onlyBookmarks || !!bookmarkMap[p.projectId];
      const matchCompleted = !onlyCompleted || !!completedMap[p.projectId];

      return matchSearch && matchDifficulty && matchBookmark && matchCompleted;
    });
  }, [projects, searchQuery, difficultyFilter, onlyBookmarks, onlyCompleted, bookmarkMap, completedMap]);

  // Statistics calculation
  const totalCount = projects.length;
  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const bookmarkedCount = Object.values(bookmarkMap).filter(Boolean).length;

  const difficultyCounts = useMemo(() => {
    const counts = { all: projects.length, beginner: 0, intermediate: 0, advanced: 0 };
    projects.forEach((p) => {
      const d = (p.difficulty || "beginner").toLowerCase();
      if (counts[d] !== undefined) counts[d]++;
    });
    return counts;
  }, [projects]);

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-2 sm:px-4">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER & METRICS DASHBOARD                                        */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 p-6 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Badge & Category */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-sky-300">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>PRACTICAL CODING LAB &amp; EXERCISES</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock size={14} className="text-slate-400" />
              <span>Est. Completion: ~45 mins</span>
            </div>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-indigo-200 tracking-tight">
              {projectCategory}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Step-by-step interactive programming problems with runnable source code solutions, deep runtime mechanics, algorithm breakdowns, and live in-browser execution.
            </p>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3 py-1.5 backdrop-blur-sm">
              <GraduationCap size={15} className="text-indigo-400" />
              <span><b>Subject:</b> {subject}</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3 py-1.5 backdrop-blur-sm">
              <Layers size={15} className="text-amber-400" />
              <span><b>Class:</b> {className}</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3 py-1.5 backdrop-blur-sm">
              <Award size={15} className="text-emerald-400" />
              <span><b>Mentor:</b> {institute.author} ({institute.name})</span>
            </div>
          </div>

          {/* Tools & Environment Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium mr-1">Tools &amp; Runtimes:</span>
            {tools.map((tool, idx) => (
              <span
                key={idx}
                className="rounded-md border border-slate-800 bg-slate-950/70 px-2.5 py-1 font-mono text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Progress Tracker Bar */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-sm font-bold text-white">Your Lab Progress:</span>
                <span className="text-xs text-slate-400">
                  ({completedCount} of {totalCount} completed)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold font-mono text-emerald-400">{progressPercent}%</span>
                {completedCount > 0 && (
                  <button
                    onClick={resetProgress}
                    title="Reset all completed marks"
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEARCH, FILTER CHIPS & BULK ACTIONS TOOLBAR                            */}
      {/* ========================================================================= */}
      <div className="sticky top-16 z-30 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, ID (e.g. JS001), keywords, or logic concepts..."
            className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Buttons Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Chips */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 p-1">
            <button
              onClick={() => setDifficultyFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                difficultyFilter === "all"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All ({difficultyCounts.all})
            </button>

            {difficultyCounts.beginner > 0 && (
              <button
                onClick={() => setDifficultyFilter("beginner")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  difficultyFilter === "beginner"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-emerald-400"
                }`}
              >
                Beginner ({difficultyCounts.beginner})
              </button>
            )}

            {difficultyCounts.intermediate > 0 && (
              <button
                onClick={() => setDifficultyFilter("intermediate")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  difficultyFilter === "intermediate"
                    ? "bg-amber-600 text-white shadow-md"
                    : "text-slate-400 hover:text-amber-400"
                }`}
              >
                Intermediate ({difficultyCounts.intermediate})
              </button>
            )}
          </div>

          {/* Bookmark Toggle Filter */}
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
              onlyBookmarks
                ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                : "border-slate-800 bg-slate-950/80 text-slate-400 hover:text-amber-300"
            }`}
          >
            <Bookmark size={14} className={onlyBookmarks ? "fill-amber-400 text-amber-400" : ""} />
            <span>Saved ({bookmarkedCount})</span>
          </button>

          {/* Bulk Expand / Collapse */}
          <button
            onClick={expandAll}
            className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-colors"
          >
            Expand All
          </button>

          <button
            onClick={collapseAll}
            className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Showing search result count */}
      {filteredProjects.length !== projects.length && (
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>
            Showing <b>{filteredProjects.length}</b> of <b>{projects.length}</b> matching exercises
          </span>
          {(searchQuery || difficultyFilter !== "all" || onlyBookmarks) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("all");
                setOnlyBookmarks(false);
                setOnlyCompleted(false);
              }}
              className="text-sky-400 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PROJECT PROBLEM CARDS LIST                                             */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        {filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <Filter size={36} className="mx-auto text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No matching exercises found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Try adjusting your search keywords or switching difficulty filters to see more projects.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("all");
                setOnlyBookmarks(false);
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Show All Exercises
            </button>
          </div>
        ) : (
          filteredProjects.map((project, index) => {
            const isVisible = !!visibleAnswers[project.projectId];
            const isCompleted = !!completedMap[project.projectId];
            const isBookmarked = !!bookmarkMap[project.projectId];

            return (
              <article
                key={project.projectId}
                id={project.projectId}
                className={`group relative rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isCompleted
                    ? "border-emerald-500/40 bg-slate-900/90 shadow-lg shadow-emerald-950/20"
                    : "border-slate-800 hover:border-sky-500/40 bg-slate-900/70 hover:bg-slate-900/90 shadow-xl"
                }`}
              >
                {/* Subtle top indicator bar */}
                <div
                  className={`h-1 w-full transition-all ${
                    isCompleted
                      ? "bg-emerald-500"
                      : isVisible
                      ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-amber-500"
                      : "bg-slate-800 group-hover:bg-slate-700"
                  }`}
                />

                <div className="p-6 md:p-8 space-y-6">
                  {/* ---------- 3.1 CARD HEADER ---------- */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-3.5">
                      {/* Checkbox / Completion button */}
                      <button
                        onClick={() => toggleCompleted(project.projectId)}
                        title={isCompleted ? "Mark as in-progress" : "Mark as completed"}
                        className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border transition-all ${
                          isCompleted
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                            : "border-slate-700 bg-slate-800 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {isCompleted ? <Check size={16} strokeWidth={3} /> : <Circle size={14} />}
                      </button>

                      {/* Project ID Badge */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-indigo-300">
                            {project.projectId}
                          </span>

                          <span
                            className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                              project.difficulty === "Beginner"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : project.difficulty === "Intermediate"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            {project.difficulty}
                          </span>

                          {isCompleted && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                              <CheckCircle2 size={12} /> Solved
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors pt-0.5">
                          {project.title}
                        </h2>
                      </div>
                    </div>

                    {/* Action buttons: Bookmark + Show/Hide Solution */}
                    <div className="flex items-center gap-2 self-end lg:self-start">
                      <button
                        onClick={() => toggleBookmark(project.projectId)}
                        title={isBookmarked ? "Remove from bookmarks" : "Bookmark for review"}
                        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
                          isBookmarked
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                            : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        <Bookmark size={16} className={isBookmarked ? "fill-amber-400" : ""} />
                      </button>

                      <button
                        onClick={() => toggleAnswer(project.projectId)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all ${
                          isVisible
                            ? "bg-slate-800 text-sky-300 border border-sky-500/30 hover:bg-slate-700"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/20 hover:shadow-lg"
                        }`}
                      >
                        {isVisible ? (
                          <>
                            <EyeOff size={15} />
                            <span>Hide Solution</span>
                            <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            <Eye size={15} />
                            <span>View Solution</span>
                            <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ---------- 3.2 PROBLEM DESCRIPTION ---------- */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-5xl">
                    {project.description}
                  </p>

                  {/* ---------- 3.3 LEARNING OUTCOME PILL ---------- */}
                  {project.learningOutcome && (
                    <div className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-950/30 px-3.5 py-2 text-xs text-indigo-200">
                      <Target size={15} className="text-indigo-400 flex-shrink-0" />
                      <span><b>Key Concept:</b> {project.learningOutcome}</span>
                    </div>
                  )}

                  {/* ---------- 3.4 TWO-COLUMN EXAMPLE & OUTPUT GRID ---------- */}
                  {(project.exampleText || project.exampleOutput) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      {/* Example Input Box */}
                      {project.exampleText && (
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                              <BookOpen size={14} className="text-sky-400" />
                              <span>Sample Input / Pre-Conditions</span>
                            </div>
                            <button
                              onClick={() => copyText(project.exampleText, `in_${project.projectId}`)}
                              className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 font-normal transition-colors"
                              title="Copy sample input"
                            >
                              {copiedOutputs[`in_${project.projectId}`] ? (
                                <>
                                  <Check size={12} className="text-sky-400" />
                                  <span className="text-sky-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="font-mono text-xs text-sky-200 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                            {project.exampleText}
                          </pre>
                        </div>
                      )}

                      {/* Example Output Box */}
                      {project.exampleOutput && (
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                              <Terminal size={14} className="text-emerald-400" />
                              <span>Expected Console Output</span>
                            </div>
                            <button
                              onClick={() => copyText(project.exampleOutput, project.projectId)}
                              className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 font-normal transition-colors"
                            >
                              {copiedOutputs[project.projectId] ? (
                                <>
                                  <Check size={12} className="text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="font-mono text-xs text-emerald-300 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                            {project.exampleOutput}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ---------- 3.5 CORE LOGIC & ENGINE MECHANICS (ENHANCED RICH FORMATTING) ---------- */}
                  {project.logicExplanation && (
                    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/15 via-slate-950/70 to-slate-950/70 p-5 space-y-3 shadow-md">
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider">
                          <Cpu size={16} className="text-amber-400" />
                          <span>Core Logic &amp; Engine Mechanics (Under the Hood)</span>
                        </div>
                        <span className="text-[11px] font-mono text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          V8 &amp; ECMAScript Spec Invariants
                        </span>
                      </div>
                      
                      <FormattedExplanation text={project.logicExplanation} accentColor="amber" />
                    </div>
                  )}

                  {/* ---------- 3.6 EXPANDABLE SOLUTION SECTION ---------- */}
                  {isVisible && (
                    <div className="mt-6 rounded-2xl border border-indigo-500/30 bg-slate-950 overflow-hidden shadow-2xl transition-all duration-300">
                      {/* Solution Header Bar */}
                      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3 text-xs">
                        <div className="flex items-center gap-2 font-semibold text-sky-300">
                          <Code2 size={16} className="text-indigo-400" />
                          <span>Complete Runnable Solution ({project.projectId}.js)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-mono">
                            Language: JavaScript (ES2026)
                          </span>
                        </div>
                      </div>

                      {/* Code Block Component */}
                      <div className="p-4 bg-slate-950">
                        {isJavaScriptCode(project.answer) ? (
                          <CodeBlock
                            initialCode={project.answer}
                            language="javascript"
                            fileName={`${project.projectId}`}
                            showRun={true}
                          />
                        ) : (
                          <p className="text-sm text-slate-300 leading-relaxed font-mono whitespace-pre-wrap p-3">
                            {project.answer}
                          </p>
                        )}
                      </div>

                      {/* Code Walkthrough / Explanation */}
                      {project.codeExplanation && (
                        <div className="border-t border-slate-800/80 bg-slate-900/60 p-5 space-y-2.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                            <Sparkles size={14} className="text-indigo-400" />
                            <span>Step-by-Step Code Walkthrough</span>
                          </div>
                          <FormattedExplanation text={project.codeExplanation} accentColor="indigo" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. INSTRUCTOR MENTORSHIP & LAB GUIDANCE CARD                             */}
      {/* ========================================================================= */}
      <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-indigo-950/20 p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Award size={28} />
          </div>

          <div className="space-y-1.5 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Teacher Mentorship &amp; Lab Guidelines</span>
              <span className="text-xs font-normal text-emerald-400 bg-emerald-900/30 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {institute.author} · {institute.name}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Always test and debug your JavaScript solutions in the <b>Chrome DevTools Console</b> (press <kbd className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-amber-300 font-mono text-xs">F12</kbd> or <kbd className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-amber-300 font-mono text-xs">Ctrl + Shift + I</kbd>). For DOM exercises, verify that elements exist before executing event handlers. Use the live <b>"Run Code"</b> feature in each code block above to test outputs right inside your browser!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}