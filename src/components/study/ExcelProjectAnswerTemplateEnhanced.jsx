import React, { useState, useEffect, useMemo } from "react";
import {
  GraduationCap,
  FileSpreadsheet,
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
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  RotateCcw,
  Target,
  Clock,
  Layers,
  Award,
  Sliders,
  Table,
  Hash,
  Download,
  Cpu
} from "lucide-react";

import CodeBlock from "../../common/CodeBlock";
import ExcelFunctionsMasterReference from "./excel/ExcelFunctionsMasterReference";

/**
 * Rich Formatter for Excel Logic, Step-by-Step Walkthroughs & Formatting Rules
 */
function FormattedExcelExplanation({ text }) {
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
          <strong key={match.index} className="font-bold text-emerald-200">
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

              const isNumberedHeader =
                /^\d+\.\s+\*\*(.*?)\*\*:?/.test(trimmed) ||
                /^\*\*(.*?)\*\*:?/.test(trimmed);
              const isBullet = /^[-•*]\s+/.test(trimmed);

              if (isNumberedHeader) {
                return (
                  <div
                    key={lIdx}
                    className="font-semibold text-emerald-300 flex items-start gap-2 pt-1.5"
                  >
                    <span className="text-emerald-400">⚡</span>
                    <span>{renderFormattedTokens(trimmed)}</span>
                  </div>
                );
              }

              if (isBullet) {
                return (
                  <div key={lIdx} className="flex items-start gap-2.5 pl-4 py-0.5">
                    <span className="text-sky-400 mt-1 flex-shrink-0 text-xs">◆</span>
                    <span className="text-slate-300">
                      {renderFormattedTokens(trimmed.replace(/^[-•*]\s+/, ""))}
                    </span>
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

export default function ExcelProjectAnswerTemplateEnhanced({ data }) {
  const {
    projectCategory = "Microsoft Excel Module 1.2 Practical Lab & Exercises",
    subject = "Data Entry, Editing, Formatting & Custom Number Masks",
    trackCode = "EXCEL-PRO-901",
    level = "Beginner to Advanced",
    tools = ["Excel 365", "Excel 2021", "Power Query", "Office Online"],
    institute = {
      author: "Sukanta Hui",
      name: "Coder & AccoTax",
      location: "Barrackpore",
    },
    sampleWorkbookUrl = null,
    projects = [],
  } = data || {};

  const storageKey = `excel_projects_${(projectCategory || "default")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toLowerCase()}`;

  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [onlyCompleted, setOnlyCompleted] = useState(false);
  const [showFunctionsModal, setShowFunctionsModal] = useState(false);

  // Expanded answers state: map of projectId -> boolean
  const [visibleAnswers, setVisibleAnswers] = useState({});

  // LocalStorage state for progress
  const [completedMap, setCompletedMap] = useState({});
  const [bookmarkMap, setBookmarkMap] = useState({});
  const [copiedOutputs, setCopiedOutputs] = useState({});

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`${storageKey}_completed`);
      if (savedProgress) setCompletedMap(JSON.parse(savedProgress));

      const savedBookmarks = localStorage.getItem(`${storageKey}_bookmarks`);
      if (savedBookmarks) setBookmarkMap(JSON.parse(savedBookmarks));
    } catch (err) {
      console.warn("Could not load local storage progress:", err);
    }
  }, [storageKey]);

  // Save progress handlers
  const toggleCompleted = (projectId) => {
    setCompletedMap((prev) => {
      const updated = { ...prev, [projectId]: !prev[projectId] };
      try {
        localStorage.setItem(`${storageKey}_completed`, JSON.stringify(updated));
      } catch (err) {
        console.warn("Error saving completed progress:", err);
      }
      return updated;
    });
  };

  const toggleBookmark = (projectId) => {
    setBookmarkMap((prev) => {
      const updated = { ...prev, [projectId]: !prev[projectId] };
      try {
        localStorage.setItem(`${storageKey}_bookmarks`, JSON.stringify(updated));
      } catch (err) {
        console.warn("Error saving bookmark:", err);
      }
      return updated;
    });
  };

  const toggleAnswer = (projectId) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
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
    if (
      window.confirm(
        "Are you sure you want to reset your practical lab completion progress for this Excel module?"
      )
    ) {
      setCompletedMap({});
      setBookmarkMap({});
      try {
        localStorage.removeItem(`${storageKey}_completed`);
        localStorage.removeItem(`${storageKey}_bookmarks`);
      } catch (err) {
        console.warn("Error resetting progress:", err);
      }
    }
  };

  const copyText = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedOutputs((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedOutputs((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  };

  // Filtered projects memo
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.projectId.toLowerCase().includes(q) ||
        (p.sheetName && p.sheetName.toLowerCase().includes(q)) ||
        (p.formula && p.formula.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        (p.proTip && p.proTip.toLowerCase().includes(q)) ||
        (p.stepByStep && p.stepByStep.toLowerCase().includes(q));

      const matchDifficulty =
        difficultyFilter === "all" ||
        (p.difficulty &&
          p.difficulty.toLowerCase() === difficultyFilter.toLowerCase());

      const matchBookmark = !onlyBookmarks || !!bookmarkMap[p.projectId];
      const matchCompleted = !onlyCompleted || !!completedMap[p.projectId];

      return matchSearch && matchDifficulty && matchBookmark && matchCompleted;
    });
  }, [
    projects,
    searchQuery,
    difficultyFilter,
    onlyBookmarks,
    onlyCompleted,
    bookmarkMap,
    completedMap,
  ]);

  // Statistics calculation
  const totalCount = projects.length;
  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const bookmarkedCount = Object.values(bookmarkMap).filter(Boolean).length;

  const difficultyCounts = useMemo(() => {
    const counts = {
      all: projects.length,
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
    projects.forEach((p) => {
      const d = (p.difficulty || "beginner").toLowerCase();
      if (counts[d] !== undefined) counts[d]++;
    });
    return counts;
  }, [projects]);

  if (!data || !data.projects) return null;

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-2 sm:px-4">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER & METRICS DASHBOARD                                        */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 p-6 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Badge & Download Workbook Button */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>EXCEL PRACTICAL LAB &amp; AUDIT EXERCISES</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowFunctionsModal(true)}
                className="flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-700 text-emerald-300 px-3.5 py-2 text-xs font-bold shadow-lg transition-all hover:scale-105"
              >
                <BookOpen size={14} className="text-amber-400" />
                <span>101 Master Functions Catalog</span>
              </button>

              {sampleWorkbookUrl && (
                <a
                  href={sampleWorkbookUrl}
                  download="excel_module_practice.xlsx"
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-bold shadow-lg shadow-emerald-900/40 transition-all hover:scale-105"
                >
                  <Download size={14} />
                  <span>Download Practice Workbook (.xlsx)</span>
                </a>
              )}
            </div>
          </div>

          {/* Main Title & Description */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200 tracking-tight">
              {projectCategory}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Interactive workplace scenarios with custom number format masks, Ribbon navigation step-by-step guides, raw memory vs rendered display models, and verified solution grids.
            </p>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3 py-1.5 backdrop-blur-sm">
              <FileSpreadsheet size={15} className="text-emerald-400" />
              <span><b>Subject:</b> {subject}</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3 py-1.5 backdrop-blur-sm">
              <Hash size={15} className="text-sky-400" />
              <span><b>Track:</b> {trackCode}</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3 py-1.5 backdrop-blur-sm">
              <Layers size={15} className="text-amber-400" />
              <span><b>Level:</b> {level}</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3 py-1.5 backdrop-blur-sm">
              <Award size={15} className="text-indigo-400" />
              <span><b>Master Mentor:</b> {institute.author} ({institute.name})</span>
            </div>
          </div>

          {/* Tools & Version Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium mr-1">Supported Platforms:</span>
            {tools.map((tool, idx) => (
              <span
                key={idx}
                className="rounded-md border border-slate-800 bg-slate-950/70 px-2.5 py-1 font-mono text-emerald-300"
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
                <span className="text-sm font-bold text-white">Your Excel Progress:</span>
                <span className="text-xs text-slate-400">
                  ({completedCount} of {totalCount} completed)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold font-mono text-emerald-400">
                  {progressPercent}%
                </span>
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
                className="h-full bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-400 transition-all duration-500 rounded-full"
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
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, formula, sheet name (e.g. Topic4_Custom_Masks), or ID..."
            className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
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
                  ? "bg-emerald-600 text-white shadow-md"
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
                    : "text-slate-400 hover:text-slate-200"
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
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Intermediate ({difficultyCounts.intermediate})
              </button>
            )}

            {difficultyCounts.advanced > 0 && (
              <button
                onClick={() => setDifficultyFilter("advanced")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  difficultyFilter === "advanced"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Advanced ({difficultyCounts.advanced})
              </button>
            )}
          </div>

          {/* Bookmarks Filter */}
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
              onlyBookmarks
                ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                : "border-slate-800 bg-slate-950/80 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Bookmark size={14} className={onlyBookmarks ? "fill-amber-400 text-amber-400" : ""} />
            <span>Saved ({bookmarkedCount})</span>
          </button>

          {/* Completed Filter */}
          <button
            onClick={() => setOnlyCompleted(!onlyCompleted)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
              onlyCompleted
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                : "border-slate-800 bg-slate-950/80 text-slate-400 hover:text-slate-200"
            }`}
          >
            <CheckCircle2 size={14} />
            <span>Done ({completedCount})</span>
          </button>

          {/* Expand/Collapse All */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={expandAll}
              className="rounded-lg border border-slate-800 bg-slate-950/80 p-2 text-slate-400 hover:text-white"
              title="Expand all solutions"
            >
              <ChevronDown size={16} />
            </button>
            <button
              onClick={collapseAll}
              className="rounded-lg border border-slate-800 bg-slate-950/80 p-2 text-slate-400 hover:text-white"
              title="Collapse all solutions"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. EXCEL PROJECTS & LAB EXERCISES LIST                                   */}
      {/* ========================================================================= */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
          <BookOpen size={36} className="mx-auto text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-300">No Excel Lab Projects Found</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Try clearing your search query or adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProjects.map((project, index) => {
            const isCompleted = !!completedMap[project.projectId];
            const isBookmarked = !!bookmarkMap[project.projectId];
            const isAnswerVisible = !!visibleAnswers[project.projectId];

            return (
              <div
                key={project.projectId || index}
                className={`rounded-2xl border transition-all duration-300 shadow-xl overflow-hidden ${
                  isCompleted
                    ? "border-emerald-500/40 bg-slate-900/40"
                    : "border-slate-800 bg-slate-900/80 hover:border-slate-700"
                }`}
              >
                {/* CARD HEADER TOOLBAR */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-4 sm:px-6 border-b border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Project ID Tag */}
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-700/60 text-emerald-300">
                      {project.projectId || `EXCEL-LAB-${index + 1}`}
                    </span>

                    {/* Difficulty Badge */}
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border capitalize ${
                        (project.difficulty || "beginner").toLowerCase() === "beginner"
                          ? "bg-emerald-950/60 border-emerald-800 text-emerald-400"
                          : (project.difficulty || "").toLowerCase() === "intermediate"
                          ? "bg-amber-950/60 border-amber-800 text-amber-400"
                          : "bg-purple-950/60 border-purple-800 text-purple-400"
                      }`}
                    >
                      {project.difficulty || "Beginner"}
                    </span>

                    {/* Sheet Name Badge */}
                    {project.sheetName && (
                      <span className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-sky-300">
                        <Table size={12} className="text-sky-400" />
                        <span>Sheet: {project.sheetName}</span>
                      </span>
                    )}
                  </div>

                  {/* Right Actions: Bookmark & Completed Check */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleBookmark(project.projectId)}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        isBookmarked
                          ? "text-amber-400"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                      title={isBookmarked ? "Remove bookmark" : "Save project"}
                    >
                      <Bookmark
                        size={16}
                        className={isBookmarked ? "fill-amber-400 text-amber-400" : ""}
                      />
                      <span className="hidden sm:inline">
                        {isBookmarked ? "Saved" : "Save"}
                      </span>
                    </button>

                    <button
                      onClick={() => toggleCompleted(project.projectId)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        isCompleted
                          ? "bg-emerald-950/80 border-emerald-600 text-emerald-300 shadow-sm"
                          : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 size={15} className="text-emerald-400" />
                          <span>Done</span>
                        </>
                      ) : (
                        <>
                          <Circle size={15} />
                          <span>Mark Done</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* CARD CONTENT BODY */}
                <div className="p-4 sm:p-6 space-y-5">
                  {/* Title & Description */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-start gap-2">
                      <span className="text-emerald-400 flex-shrink-0 mt-0.5">📊</span>
                      <span>{project.title}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Requirements / Specifications List */}
                  {project.requirements && project.requirements.length > 0 && (
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Target size={14} className="text-sky-400" />
                        <span>Workplace Specifications &amp; Objectives:</span>
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        {project.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 text-xs font-bold mt-0.5">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* SOLUTION TOGGLE BUTTON */}
                  <div className="pt-2">
                    <button
                      onClick={() => toggleAnswer(project.projectId)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                        isAnswerVisible
                          ? "border-emerald-500/50 bg-emerald-950/30 text-emerald-300 shadow-md"
                          : "border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isAnswerVisible ? (
                          <EyeOff size={16} className="text-emerald-400" />
                        ) : (
                          <Eye size={16} className="text-emerald-400" />
                        )}
                        <span>
                          {isAnswerVisible
                            ? "Hide Solution & Excel Implementation"
                            : "View Solution & Excel Step-by-Step Guide"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.formula && (
                          <span className="font-mono text-[11px] text-amber-300 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded">
                            {project.formula.length > 30 ? project.formula.slice(0, 30) + '...' : project.formula}
                          </span>
                        )}
                        {isAnswerVisible ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                  </div>

                  {/* COLLAPSIBLE SOLUTION BODY */}
                  {isAnswerVisible && (
                    <div className="space-y-6 pt-2 animate-fadeIn">
                      {/* FORMULA / CUSTOM MASK CODE BOX */}
                      {project.formula && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                              <Terminal size={14} />
                              <span>Excel Formula / Custom Formatting Code:</span>
                            </span>
                            <button
                              onClick={() => copyText(project.formula, `formula_${project.projectId}`)}
                              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                              {copiedOutputs[`formula_${project.projectId}`] ? (
                                <>
                                  <Check size={13} className="text-emerald-400" />
                                  <span className="text-emerald-400 font-bold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={13} />
                                  <span>Copy Formula</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-amber-300 overflow-x-auto">
                            <code>{project.formula}</code>
                          </div>
                        </div>
                      )}

                      {/* STEP-BY-STEP EXCEL RIBBON & SHORTCUT GUIDE */}
                      {project.stepByStep && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Sliders size={14} className="text-sky-400" />
                            <span>Step-by-Step Execution &amp; Ribbon Navigation:</span>
                          </h4>
                          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                            <FormattedExcelExplanation text={project.stepByStep} />
                          </div>
                        </div>
                      )}

                      {/* RAW MEMORY VS RENDERED DISPLAY MODEL */}
                      {project.rawMemoryVsRendered && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Cpu size={14} className="text-indigo-400" />
                            <span>Excel Engine Storage Model (Raw IEEE 754 vs Rendered Mask):</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                            <div className="rounded-xl border border-sky-800/80 bg-sky-950/40 p-3">
                              <span className="text-[10px] text-sky-400 uppercase font-bold block">1. Raw Memory Value</span>
                              <span className="text-sm font-bold text-white mt-1 block">
                                {project.rawMemoryVsRendered.raw}
                              </span>
                            </div>
                            <div className="rounded-xl border border-emerald-800/80 bg-emerald-950/40 p-3">
                              <span className="text-[10px] text-emerald-400 uppercase font-bold block">2. Formatting Mask</span>
                              <span className="text-sm font-bold text-amber-300 mt-1 block">
                                {project.rawMemoryVsRendered.mask}
                              </span>
                            </div>
                            <div className="rounded-xl border border-purple-800/80 bg-purple-950/40 p-3">
                              <span className="text-[10px] text-purple-400 uppercase font-bold block">3. Rendered Screen Display</span>
                              <span className="text-sm font-bold text-emerald-300 mt-1 block">
                                {project.rawMemoryVsRendered.rendered}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* EXPECTED OUTPUT GRID SPREADSHEET PREVIEW */}
                      {project.expectedOutput && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Table size={14} className="text-emerald-400" />
                            <span>Expected Spreadsheet Output &amp; Verification Grid:</span>
                          </h4>
                          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
                            <pre className="whitespace-pre-wrap leading-relaxed">{project.expectedOutput}</pre>
                          </div>
                        </div>
                      )}

                      {/* MASTER MENTOR PRO TIP */}
                      {project.proTip && (
                        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-1.5">
                          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                            <Lightbulb size={16} />
                            <span>Sukanta Hui's Master Audit Tip:</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed italic">
                            "{project.proTip}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 101 MASTER FUNCTIONS CATALOG MODAL */}
      {showFunctionsModal && (
        <ExcelFunctionsMasterReference
          isModal={true}
          onClose={() => setShowFunctionsModal(false)}
        />
      )}
    </div>
  );
}
