import React, { useState, useEffect, useMemo } from "react";
import {
  GraduationCap,
  Database,
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
  RotateCcw,
  Layers,
  Award,
  HelpCircle,
  Table,
  CheckSquare,
  FileCode,
  SlidersHorizontal,
  Flame,
  KeyRound,
  Server
} from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-sql";

/**
 * Helper: Formatted text renderer for markdown-like bold/code tokens
 */
function FormattedExplanation({ text, accentColor = "sky" }) {
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

              const isNumberedHeader =
                /^\d+\.\s+\*\*(.*?)\*\*:?/.test(trimmed) ||
                /^\*\*(.*?)\*\*:?/.test(trimmed);
              const isBullet = /^[-•*]\s+/.test(trimmed);

              if (isNumberedHeader) {
                return (
                  <div
                    key={lIdx}
                    className="font-semibold text-sky-300 flex items-start gap-2 pt-1.5"
                  >
                    <span className="text-sky-400">⚡</span>
                    <span>{renderFormattedTokens(trimmed)}</span>
                  </div>
                );
              }

              if (isBullet) {
                return (
                  <div key={lIdx} className="flex items-start gap-2.5 pl-4 py-0.5">
                    <span className="text-emerald-400 mt-1 flex-shrink-0 text-xs">
                      ◆
                    </span>
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

/**
 * Dedicated SQL Code Viewer with Prism highlighting, Copy, and Download
 */
function SqlCodeViewer({ code, fileName = "query.sql" }) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    try {
      const grammar = Prism.languages.sql || Prism.languages.javascript;
      const html = Prism.highlight(code, grammar, "sql");
      setHighlighted(html);
    } catch {
      setHighlighted(code);
    }
  }, [code]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.endsWith(".sql") ? fileName : `${fileName}.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-slate-700/80 bg-[#0d1322] overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/80 text-xs">
        <div className="flex items-center gap-2">
          <Database size={14} className="text-sky-400" />
          <span className="font-mono text-slate-200 font-semibold">{fileName}</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950/80 border border-sky-600/40 text-sky-300">
            MySQL 8.0+
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-200 transition text-xs font-medium"
            title="Copy SQL Query"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={downloadCode}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-200 transition text-xs font-medium"
            title="Download SQL Script"
          >
            <Download size={13} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Code area */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-xs sm:text-sm leading-relaxed text-slate-200">
          <code
            className="language-sql"
            dangerouslySetInnerHTML={{ __html: highlighted || code }}
          />
        </pre>
      </div>
    </div>
  );
}

/**
 * Main RDBMSProjectAnswerTemplate Component
 */
export default function RDBMSProjectAnswerTemplate({ data }) {
  if (!data || !data.projects) return null;

  const {
    projectCategory = "RDBMS & SQL Practical Database Projects",
    subject = "RDBMS using MySQL",
    board = "Industry Standards & University Syllabus",
    class: className = "SQL Fundamentals to Advanced",
    tools = ["MySQL Server 8.0+", "MySQL Workbench", "MySQL CLI", "phpMyAdmin"],
    institute = {
      author: "Sukanta Hui",
      name: "Coder & AccoTax",
      location: "Barrackpore & Naihati, West Bengal, India"
    },
    projects = []
  } = data;

  // Local State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [completedProjects, setCompletedProjects] = useState({});
  const [bookmarkedProjects, setBookmarkedProjects] = useState({});
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);

  // Load persistence from localStorage
  const storageKeyPrefix = `rdbms_sql_projects_${data.moduleSlug || "sql_fundamentals"}`;

  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem(`${storageKeyPrefix}_completed`);
      if (savedCompleted) setCompletedProjects(JSON.parse(savedCompleted));

      const savedBookmarked = localStorage.getItem(`${storageKeyPrefix}_bookmarked`);
      if (savedBookmarked) setBookmarkedProjects(JSON.parse(savedBookmarked));
    } catch {
      // ignore
    }
  }, [storageKeyPrefix]);

  const toggleAnswer = (projectId) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const toggleAllAnswers = (expand) => {
    const nextState = {};
    projects.forEach((p) => {
      nextState[p.projectId] = expand;
    });
    setVisibleAnswers(nextState);
  };

  const toggleCompleted = (projectId) => {
    setCompletedProjects((prev) => {
      const updated = { ...prev, [projectId]: !prev[projectId] };
      try {
        localStorage.setItem(`${storageKeyPrefix}_completed`, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const toggleBookmark = (projectId) => {
    setBookmarkedProjects((prev) => {
      const updated = { ...prev, [projectId]: !prev[projectId] };
      try {
        localStorage.setItem(`${storageKeyPrefix}_bookmarked`, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Extract all unique tags / domains
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    projects.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => tagsSet.add(t));
      }
      if (p.category) tagsSet.add(p.category);
    });
    return ["All", ...Array.from(tagsSet)];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.projectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags &&
          project.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          )) ||
        (project.category &&
          project.category.toLowerCase().includes(searchQuery.toLowerCase()));

      // Difficulty filter
      const matchesDifficulty =
        selectedDifficulty === "All" || project.difficulty === selectedDifficulty;

      // Tag / Domain filter
      const matchesTag =
        selectedTag === "All" ||
        (project.tags && project.tags.includes(selectedTag)) ||
        project.category === selectedTag;

      // Bookmark filter
      const matchesBookmark =
        !showOnlyBookmarked || !!bookmarkedProjects[project.projectId];

      // Incomplete filter
      const matchesIncomplete =
        !showOnlyIncomplete || !completedProjects[project.projectId];

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesTag &&
        matchesBookmark &&
        matchesIncomplete
      );
    });
  }, [
    projects,
    searchQuery,
    selectedDifficulty,
    selectedTag,
    showOnlyBookmarked,
    showOnlyIncomplete,
    bookmarkedProjects,
    completedProjects
  ]);

  // Statistics
  const stats = useMemo(() => {
    const total = projects.length;
    const completed = Object.values(completedProjects).filter(Boolean).length;
    const beginner = projects.filter((p) => p.difficulty === "Beginner").length;
    const intermediate = projects.filter(
      (p) => p.difficulty === "Intermediate"
    ).length;
    const advanced = projects.filter((p) => p.difficulty === "Advanced").length;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, beginner, intermediate, advanced, progressPercent };
  }, [projects, completedProjects]);

  return (
    <div className="space-y-8 pb-16">
      {/* ========================================================================= */}
      {/* HERO / HEADER SECTION */}
      {/* ========================================================================= */}
      <header className="relative rounded-3xl border border-sky-700/40 bg-gradient-to-br from-slate-900 via-[#0c192e] to-slate-950 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-medium tracking-wide">
              <Database size={15} />
              <span>RDBMS & SQL PRACTICAL WORKBOOK</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Server size={14} className="text-emerald-400" />
              <span>Target: <b>MySQL 8.0+ / MariaDB</b></span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-300 to-indigo-300">
              {projectCategory}
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-4xl leading-relaxed">
              Real-world, end-to-end database engineering scenarios covering DDL table definitions, data modeling, batch inserts, sophisticated WHERE filtering predicates, pattern matching, range scanning, ordering, and pagination.
            </p>
          </div>

          {/* Metadata Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">Subject</span>
              <b className="text-slate-100">{subject}</b>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">Standard / Board</span>
              <b className="text-slate-100">{board}</b>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">Class / Level</span>
              <b className="text-slate-100">{className}</b>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">Author / Institute</span>
              <b className="text-slate-100">
                {institute.author} ({institute.name})
              </b>
            </div>
          </div>

          {/* Tools */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400">Supported Tools:</span>
            {tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[11px]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* STATS & PROGRESS TRACKER */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Projects</span>
            <Layers size={16} className="text-sky-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-100">{stats.total}</div>
          <div className="mt-1 text-[11px] text-slate-400">Comprehensive Case Studies</div>
        </div>

        <div className="rounded-2xl border border-emerald-900/40 bg-slate-900/80 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Beginner</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-300">{stats.beginner}</div>
          <div className="mt-1 text-[11px] text-emerald-400/80">Foundational CRUD & Schema</div>
        </div>

        <div className="rounded-2xl border border-amber-900/40 bg-slate-900/80 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Intermediate</span>
            <Flame size={16} className="text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-300">{stats.intermediate}</div>
          <div className="mt-1 text-[11px] text-amber-400/80">Business Queries & Filtering</div>
        </div>

        <div className="rounded-2xl border border-rose-900/40 bg-slate-900/80 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Progress</span>
            <Award size={16} className="text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-100">{stats.progressPercent}%</span>
            <span className="text-xs text-slate-400">
              ({stats.completed}/{stats.total})
            </span>
          </div>
          {/* Mini progress bar */}
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${stats.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SEARCH, FILTER & CONTROL TOOLBAR */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by project title, domain (e.g. E-Commerce, Hospital, Banking), or SQL keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => toggleAllAnswers(true)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition"
            >
              <Eye size={14} className="text-sky-400" />
              <span>Expand All</span>
            </button>

            <button
              onClick={() => toggleAllAnswers(false)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition"
            >
              <EyeOff size={14} className="text-slate-400" />
              <span>Collapse All</span>
            </button>
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
          {/* Difficulty Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <SlidersHorizontal size={13} />
              Difficulty:
            </span>
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`px-3 py-1 rounded-lg transition font-medium ${
                  selectedDifficulty === level
                    ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Domain / Tag filter */}
          {allTags.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Domain / Tag:</span>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-sky-500"
              >
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Toggles */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowOnlyBookmarked((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
                showOnlyBookmarked
                  ? "bg-amber-950/60 border-amber-600/50 text-amber-300"
                  : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Bookmark size={13} />
              <span>Starred</span>
            </button>

            <button
              onClick={() => setShowOnlyIncomplete((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
                showOnlyIncomplete
                  ? "bg-emerald-950/60 border-emerald-600/50 text-emerald-300"
                  : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Circle size={13} />
              <span>Incomplete Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PROJECTS LIST */}
      {/* ========================================================================= */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-3">
          <HelpCircle size={40} className="mx-auto text-slate-500" />
          <h3 className="text-lg font-semibold text-slate-200">No Projects Found</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            No projects matched your active search query or filter selection. Try adjusting your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDifficulty("All");
              setSelectedTag("All");
              setShowOnlyBookmarked(false);
              setShowOnlyIncomplete(false);
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProjects.map((project, idx) => {
            const isVisible = !!visibleAnswers[project.projectId];
            const isCompleted = !!completedProjects[project.projectId];
            const isBookmarked = !!bookmarkedProjects[project.projectId];

            return (
              <div
                key={project.projectId}
                className={`rounded-3xl border transition-all duration-200 p-6 sm:p-7 shadow-xl ${
                  isCompleted
                    ? "border-emerald-900/50 bg-slate-900/60"
                    : "border-slate-800 hover:border-slate-700 bg-slate-900/80"
                }`}
              >
                {/* ---------- TOP BAR ---------- */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left: Checkbox + Project ID + Title */}
                  <div className="flex items-start md:items-center gap-3">
                    <button
                      onClick={() => toggleCompleted(project.projectId)}
                      className="mt-0.5 md:mt-0 p-1 rounded-lg text-slate-400 hover:text-emerald-400 transition"
                      title={
                        isCompleted ? "Mark as Incomplete" : "Mark as Completed"
                      }
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={22} className="text-emerald-400" />
                      ) : (
                        <Circle size={22} className="text-slate-600" />
                      )}
                    </button>

                    <span className="flex h-8 px-2.5 items-center justify-center rounded-lg bg-sky-950 border border-sky-600/40 text-sky-300 font-mono text-xs font-bold">
                      {project.projectId}
                    </span>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2 flex-wrap">
                        {project.title}
                      </h3>
                      {project.category && (
                        <span className="text-[11px] text-sky-400 font-medium">
                          Domain: {project.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Badges + Star + Toggle Show Answer */}
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    {/* Difficulty Badge */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        project.difficulty === "Beginner"
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700/40"
                          : project.difficulty === "Intermediate"
                          ? "bg-amber-950/80 text-amber-300 border border-amber-700/40"
                          : "bg-rose-950/80 text-rose-300 border border-rose-700/40"
                      }`}
                    >
                      {project.difficulty}
                    </span>

                    {/* Bookmark Star */}
                    <button
                      onClick={() => toggleBookmark(project.projectId)}
                      className={`p-1.5 rounded-lg border transition ${
                        isBookmarked
                          ? "bg-amber-950/80 border-amber-600/50 text-amber-300"
                          : "bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-slate-200"
                      }`}
                      title={isBookmarked ? "Remove Star" : "Star Project"}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck size={16} />
                      ) : (
                        <Bookmark size={16} />
                      )}
                    </button>

                    {/* Toggle Show/Hide Answer */}
                    <button
                      onClick={() => toggleAnswer(project.projectId)}
                      className="flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 transition"
                    >
                      {isVisible ? (
                        <>
                          <EyeOff size={14} />
                          <span>Hide Solution</span>
                        </>
                      ) : (
                        <>
                          <Eye size={14} />
                          <span>Show Solution</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* ---------- DESCRIPTION & PROBLEM SCENARIO ---------- */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    <FileCode size={14} className="text-sky-400" />
                    <span>Business Scenario & Problem Statement</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>

                {/* ---------- SCHEMA / TABLE DEFINITION PREVIEW ---------- */}
                {project.schemaDetails && (
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                      <Table size={15} />
                      <span>Schema & Data Specification:</span>
                    </div>
                    <div className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre">
                      {project.schemaDetails}
                    </div>
                  </div>
                )}

                {/* ---------- EXAMPLE INPUT / SEED DATA ---------- */}
                {project.exampleText && (
                  <div className="mt-3 flex items-start gap-2 text-xs sm:text-sm text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                    <BookOpen size={16} className="text-sky-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <b className="text-sky-300">Sample Input / Condition:</b>{" "}
                      <span>{project.exampleText}</span>
                    </div>
                  </div>
                )}

                {/* ---------- EXPECTED OUTPUT GRID / TABLE ---------- */}
                {project.exampleOutput && (
                  <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-sky-400 flex items-center gap-1.5">
                        <Terminal size={14} /> Expected Result Grid (MySQL Output)
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">
                        Query Result Preview
                      </span>
                    </div>
                    <pre className="text-emerald-300 text-xs sm:text-sm font-mono leading-snug overflow-x-auto whitespace-pre p-2 bg-slate-900/90 rounded-xl border border-slate-800">
                      {project.exampleOutput}
                    </pre>
                  </div>
                )}

                {/* ---------- LOGIC STRATEGY & QUERY BREAKDOWN (ALWAYS VISIBLE) ---------- */}
                {project.logicExplanation && (
                  <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                      <Lightbulb size={15} className="text-amber-400" />
                      <span>SQL Strategy & Query Mechanics</span>
                    </div>
                    <FormattedExplanation
                      text={project.logicExplanation}
                      accentColor="sky"
                    />
                  </div>
                )}

                {/* ---------- SOLUTION ANSWER (TOGGLEABLE) ---------- */}
                {isVisible && (
                  <div className="mt-5 space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Terminal size={14} /> Complete SQL Solution Script
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Ready to execute in MySQL Workbench
                      </span>
                    </div>

                    <SqlCodeViewer
                      code={project.answer || "-- SQL solution query"}
                      fileName={`${project.projectId.toLowerCase().replace(/[^a-z0-9]/g, "_")}.sql`}
                    />

                    {/* Additional Code Explanation */}
                    {project.codeExplanation && (
                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
                          <Code2 size={15} />
                          <span>Code Walkthrough & Step Breakdown</span>
                        </div>
                        <FormattedExplanation
                          text={project.codeExplanation}
                          accentColor="sky"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* ---------- KEYWORDS & CLAUSES TAGS ---------- */}
                {project.keywords && project.keywords.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-2 text-[11px]">
                    <span className="text-slate-500 font-medium mr-1">
                      Clauses / Keywords:
                    </span>
                    {project.keywords.map((kw, kwIdx) => (
                      <span
                        key={kwIdx}
                        className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 font-mono border border-slate-700"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}

                {/* ---------- LEARNING OUTCOME / INDUSTRY TIP ---------- */}
                {project.learningOutcome && (
                  <div className="mt-4 flex items-start gap-2.5 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <Sparkles size={15} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <b className="text-emerald-300">Learning Outcome & Best Practice:</b>{" "}
                      <span>{project.learningOutcome}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TEACHER NOTE & BEST PRACTICE GUIDELINE */}
      {/* ========================================================================= */}
      <footer className="rounded-3xl border border-sky-800/40 bg-gradient-to-br from-slate-900 via-[#0a192f] to-slate-950 p-6 sm:p-8 text-xs sm:text-sm text-slate-300 space-y-3 shadow-xl">
        <div className="flex items-center gap-2.5 text-sky-300 font-bold text-sm sm:text-base">
          <GraduationCap size={20} />
          <span>Faculty & Industry Guidelines (Sukanta Hui, Coder & AccoTax)</span>
        </div>

        <p className="leading-relaxed text-slate-300">
          When practicing these 20 SQL projects:
        </p>

        <ul className="space-y-2 pl-4 list-disc text-slate-400">
          <li>
            <strong className="text-slate-200">Execute in MySQL Workbench or CLI:</strong> Create a dedicated database (e.g. <code>CREATE DATABASE sql_lab_projects; USE sql_lab_projects;</code>) to run the DDL and DML scripts safely.
          </li>
          <li>
            <strong className="text-slate-200">Data Type Discipline:</strong> Always specify precise character limits (e.g., <code>VARCHAR(100)</code> vs <code>TEXT</code>) and exact numeric representations (e.g., <code>DECIMAL(10,2)</code> for currency) to prevent truncation and precision loss.
          </li>
          <li>
            <strong className="text-slate-200">Avoid <code>SELECT *</code> in Production:</strong> Explicitly name required columns and assign aliases with <code>AS</code> for clarity and query performance.
          </li>
          <li>
            <strong className="text-slate-200">Test Edge Cases:</strong> Try querying records with <code>NULL</code> values using <code>IS NULL</code> and observe how mathematical and comparison operators treat <code>NULL</code>.
          </li>
        </ul>
      </footer>
    </div>
  );
}
