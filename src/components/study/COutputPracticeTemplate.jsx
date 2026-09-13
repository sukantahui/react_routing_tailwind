import React, { useState, useMemo } from "react";
import {
  Terminal,
  Code2,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  RotateCcw,
  Shuffle,
  Copy,
  Check,
  Lightbulb,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Cpu,
  Layers,
  GraduationCap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  FileCode,
  Laptop,
  Trash2,
  SplitSquareVertical
} from "lucide-react";
import CodeBlock from "../../common/CodeBlock";

// Helper to shuffle an array (Fisher–Yates)
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function COutputPracticeTemplate({ data }) {
  const [revealedIds, setRevealedIds] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("browse"); // "browse" | "quiz"
  const [quizLimit, setQuizLimit] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [copiedOutputId, setCopiedOutputId] = useState(null);
  const [userGuesses, setUserGuesses] = useState({});
  const [expandedTryIt, setExpandedTryIt] = useState([]);
  const [verificationResults, setVerificationResults] = useState({});
  const [showComparison, setShowComparison] = useState({});

  const allQuestions = useMemo(() => {
    return data && Array.isArray(data.questions) ? data.questions : [];
  }, [data]);

  // Filter questions based on difficulty & search query
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchDiff =
        selectedDifficulty === "all" ||
        q.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();

      const qText = (q.question || "").toLowerCase();
      const codeText = (q.code || "").toLowerCase();
      const expText = (q.explanation || "").toLowerCase();
      const s = searchQuery.toLowerCase().trim();

      const matchSearch =
        !s || qText.includes(s) || codeText.includes(s) || expText.includes(s);

      return matchDiff && matchSearch;
    });
  }, [allQuestions, selectedDifficulty, searchQuery]);

  // Questions currently on display
  const activeQuestions = useMemo(() => {
    if (viewMode === "quiz") {
      if (!quizStarted) return [];
      return quizQuestions;
    }
    return filteredQuestions;
  }, [viewMode, quizStarted, quizQuestions, filteredQuestions]);

  // Difficulty breakdown counts
  const diffCounts = useMemo(() => {
    const counts = { all: allQuestions.length, beginner: 0, moderate: 0, intermediate: 0, advanced: 0 };
    allQuestions.forEach((q) => {
      const d = (q.difficulty || "").toLowerCase();
      if (counts[d] !== undefined) counts[d]++;
    });
    return counts;
  }, [allQuestions]);

  // Total predictions checked and correct counts
  const predictionStats = useMemo(() => {
    let correct = 0;
    let checked = 0;
    Object.values(verificationResults).forEach((res) => {
      if (res.status === "correct") correct++;
      if (res.status === "correct" || res.status === "close" || res.status === "incorrect") {
        checked++;
      }
    });
    return { correct, checked };
  }, [verificationResults]);

  if (!data || !data.questions) {
    return (
      <div className="p-8 text-center text-rose-400 bg-rose-950/20 border border-rose-900/30 rounded-2xl">
        <p className="font-semibold">No questions found in this practice set.</p>
      </div>
    );
  }

  // Toggle single answer reveal
  const toggleReveal = (id) => {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Toggle all answers in active view
  const toggleRevealAll = () => {
    const activeIds = activeQuestions.map((q) => q.id);
    const allRevealed = activeIds.every((id) => revealedIds.includes(id));
    if (allRevealed) {
      setRevealedIds((prev) => prev.filter((id) => !activeIds.includes(id)));
    } else {
      setRevealedIds((prev) => Array.from(new Set([...prev, ...activeIds])));
    }
  };

  // Toggle all prediction pads open/closed
  const toggleAllPads = () => {
    const activeIds = activeQuestions.map((q) => q.id);
    const allOpen = activeIds.every((id) => expandedTryIt.includes(id));
    if (allOpen) {
      setExpandedTryIt((prev) => prev.filter((id) => !activeIds.includes(id)));
    } else {
      setExpandedTryIt((prev) => Array.from(new Set([...prev, ...activeIds])));
    }
  };

  // Start Quiz Mode
  const handleStartQuiz = () => {
    const pool = shuffleArray(filteredQuestions);
    const count = quizLimit === "all" ? pool.length : Number(quizLimit);
    setQuizQuestions(pool.slice(0, count));
    setQuizStarted(true);
    setRevealedIds([]);
    setVerificationResults({});
  };

  // Reset Quiz
  const handleResetQuiz = () => {
    setQuizStarted(false);
    setQuizQuestions([]);
    setRevealedIds([]);
    setUserGuesses({});
    setVerificationResults({});
    setShowComparison({});
  };

  // Global Reset
  const handleGlobalReset = () => {
    setRevealedIds([]);
    setUserGuesses({});
    setVerificationResults({});
    setExpandedTryIt([]);
    setShowComparison({});
  };

  // Check user's prediction against expected output
  const handleCheckPrediction = (q) => {
    const rawGuess = userGuesses[q.id] ?? "";
    const guess = rawGuess.trim();
    const actual = (q.output || "").trim();

    if (!guess) {
      setVerificationResults((prev) => ({
        ...prev,
        [q.id]: {
          status: "empty",
          message: "Please write your predicted console output above before checking!"
        }
      }));
      return;
    }

    // Exact match (ignoring only leading/trailing whitespace of entire block)
    if (guess === actual) {
      setVerificationResults((prev) => ({
        ...prev,
        [q.id]: {
          status: "correct",
          message: "🎉 Exact Match! Your prediction is 100% accurate!"
        }
      }));
      return;
    }

    // Normalizing newline types (\r\n vs \n) and trimming end of each line
    const normalizeLines = (str) =>
      str
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((l) => l.trimEnd())
        .join("\n")
        .trim();

    if (normalizeLines(guess) === normalizeLines(actual)) {
      setVerificationResults((prev) => ({
        ...prev,
        [q.id]: {
          status: "correct",
          message: "🎉 Match! (Normalized line endings & trailing whitespace match expected output)"
        }
      }));
      return;
    }

    // Check if whitespace-collapsed string matches
    const collapseWhitespace = (str) =>
      str.replace(/\s+/g, " ").trim().toLowerCase();

    if (collapseWhitespace(guess) === collapseWhitespace(actual)) {
      setVerificationResults((prev) => ({
        ...prev,
        [q.id]: {
          status: "close",
          message: "⚠️ Very Close! The token values match, but check your exact spaces, commas, or newlines."
        }
      }));
      return;
    }

    // Incorrect prediction
    setVerificationResults((prev) => ({
      ...prev,
      [q.id]: {
        status: "incorrect",
        message: "❌ Output Mismatch. Compare your prediction with the expected output or study the teacher breakdown."
      }
    }));
  };

  // Clear single user prediction pad
  const handleClearPad = (qId) => {
    setUserGuesses((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setVerificationResults((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setShowComparison((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  // Copy helpers
  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleCopyOutput = (id, output) => {
    navigator.clipboard.writeText(output);
    setCopiedOutputId(id);
    setTimeout(() => setCopiedOutputId(null), 2000);
  };

  // Difficulty badge styling helper
  const getDifficultyBadge = (diff = "") => {
    const d = diff.toLowerCase();
    if (d === "beginner" || d === "easy") {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    }
    if (d === "moderate" || d === "medium") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
    if (d === "intermediate") {
      return "bg-sky-500/10 text-sky-400 border-sky-500/30";
    }
    return "bg-purple-500/10 text-purple-400 border-purple-500/30";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 space-y-8 rounded-2xl border border-slate-800 shadow-2xl">
      {/* 1. HERO HEADER */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 p-6 sm:p-8 border border-sky-500/20 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="flex-shrink-0 p-3 rounded-2xl bg-slate-900/90 border border-sky-500/40 shadow-lg shadow-sky-500/10">
              <img
                src={data.subjectLogo?.path || "/logos/c.svg"}
                alt={data.subjectLogo?.alt || "C Logo"}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-sky-400" />
                  Output Practice Lab
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  {data.class || "All Levels"}
                </span>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  {data.board || "Technical & University Standard"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {data.topic}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                {data.subject} · Predict code execution mentally, enter output into the interactive Prediction Pad, and verify against real C compiler results.
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
            <div className="text-left md:text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Total Questions
              </span>
              <span className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">
                {allQuestions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {predictionStats.checked > 0 && (
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-purple-500/30 text-xs text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Predicted Correct:</span>
                  <strong className="text-emerald-400 font-mono">
                    {predictionStats.correct} / {predictionStats.checked}
                  </strong>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>Revealed:</span>
                <strong className="text-emerald-400 font-mono">
                  {revealedIds.length} / {allQuestions.length}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MODERN CONTROL TOOLBAR & FILTER PANEL */}
      <section className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        {/* Top Toolbar Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, code, operator, or logic (e.g. increment, modulo, division, loop)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setViewMode("browse")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                viewMode === "browse"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse All ({filteredQuestions.length})</span>
            </button>
            <button
              onClick={() => setViewMode("quiz")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                viewMode === "quiz"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Self-Test Quiz</span>
            </button>
          </div>
        </div>

        {/* Second Toolbar Row: Difficulty Filters & Master Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
          {/* Difficulty Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-slate-400" />
              Level:
            </span>
            {[
              { id: "all", label: "All Levels", count: diffCounts.all },
              { id: "beginner", label: "Beginner", count: diffCounts.beginner },
              { id: "moderate", label: "Moderate", count: diffCounts.moderate },
              { id: "intermediate", label: "Intermediate", count: diffCounts.intermediate },
              { id: "advanced", label: "Advanced", count: diffCounts.advanced },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDifficulty(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
                  selectedDifficulty === tab.id
                    ? "bg-sky-500/20 border-sky-500/50 text-sky-300"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedDifficulty === tab.id
                        ? "bg-sky-500/40 text-sky-200"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Master Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Toggle All Prediction Pads */}
            <button
              onClick={toggleAllPads}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-950 border border-purple-500/40 hover:border-purple-400 text-purple-300 hover:text-white transition"
              title="Expand or collapse Prediction Pads for all active questions"
            >
              <Laptop className="w-3.5 h-3.5 text-purple-400" />
              <span>
                {activeQuestions.length > 0 &&
                activeQuestions.every((q) => expandedTryIt.includes(q.id))
                  ? "Close All Pads"
                  : "Open All Pads"}
              </span>
            </button>

            {viewMode === "browse" && (
              <button
                onClick={toggleRevealAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              >
                {activeQuestions.length > 0 &&
                activeQuestions.every((q) => revealedIds.includes(q.id)) ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                    <span>Hide All</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Reveal All</span>
                  </>
                )}
              </button>
            )}

            {(revealedIds.length > 0 ||
              Object.keys(userGuesses).length > 0 ||
              expandedTryIt.length > 0) && (
              <button
                onClick={handleGlobalReset}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-rose-800 text-slate-400 hover:text-rose-300 transition"
                title="Reset all revealed answers and prediction pads"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>
        </div>

        {/* Quiz Mode Configuration Bar */}
        {viewMode === "quiz" && (
          <div className="bg-purple-950/20 border border-purple-800/40 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-purple-200 font-semibold">Quiz Size:</span>
              <select
                value={quizLimit}
                onChange={(e) => setQuizLimit(e.target.value)}
                disabled={quizStarted}
                className="bg-slate-950 border border-purple-500/40 text-purple-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
                <option value="all">All Available ({filteredQuestions.length})</option>
              </select>
            </div>

            {!quizStarted ? (
              <button
                onClick={handleStartQuiz}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition transform active:scale-95"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Generate Shuffled Practice Quiz</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartQuiz}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-900/40 border border-purple-500/30 text-purple-300 hover:bg-purple-900/60 transition"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Reshuffle</span>
                </button>
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Exit Quiz</span>
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 3. QUICK QUESTION INDEX JUMP GRID */}
      {activeQuestions.length > 0 && (
        <section className="bg-slate-900/40 border border-slate-800/60 p-3 sm:p-4 rounded-2xl">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              Quick Question Jump Index:
            </span>
            <span className="text-[11px] text-slate-500">
              Click any number to jump directly
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeQuestions.map((q, idx) => {
              const isRevealed = revealedIds.includes(q.id);
              const vResult = verificationResults[q.id];
              const isCorrect = vResult?.status === "correct";

              return (
                <a
                  key={q.id}
                  href={`#question-${q.id}`}
                  className={`w-8 h-8 rounded-lg text-xs font-bold font-mono flex items-center justify-center border transition relative ${
                    isCorrect
                      ? "bg-emerald-900/80 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-900/60 ring-1 ring-emerald-400/50"
                      : isRevealed
                      ? "bg-sky-950/60 border-sky-500/50 text-sky-300 shadow-sm shadow-sky-900/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-sky-500/40 hover:text-sky-300"
                  }`}
                >
                  {idx + 1}
                  {isCorrect ? (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950"></span>
                  ) : isRevealed ? (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-sky-400 rounded-full"></span>
                  ) : null}
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. QUESTIONS DISPLAY LIST */}
      <section className="space-y-6">
        {viewMode === "quiz" && !quizStarted && (
          <div className="p-12 text-center bg-slate-900/30 border border-slate-800/80 rounded-3xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Interactive Self-Test Quiz Ready</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Select your desired difficulty filter and question count above, then click <strong>Generate Shuffled Practice Quiz</strong> to test your execution tracing skills!
            </p>
          </div>
        )}

        {activeQuestions.length === 0 && (viewMode === "browse" || quizStarted) && (
          <div className="p-12 text-center bg-slate-900/30 border border-slate-800/80 rounded-3xl space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No matching questions found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or selecting a different difficulty filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty("all");
              }}
              className="text-xs text-sky-400 underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {activeQuestions.map((q, index) => {
          const isRevealed = revealedIds.includes(q.id);
          const isTryItOpen = expandedTryIt.includes(q.id);
          const userGuess = userGuesses[q.id] || "";
          const vResult = verificationResults[q.id];
          const isComparing = showComparison[q.id];

          return (
            <article
              key={q.id}
              id={`question-${q.id}`}
              className={`bg-slate-900/70 border rounded-3xl p-5 sm:p-7 shadow-xl space-y-5 transition duration-200 ${
                vResult?.status === "correct"
                  ? "border-emerald-500/60 shadow-emerald-950/20"
                  : vResult?.status === "incorrect"
                  ? "border-rose-900/40"
                  : "border-slate-800 hover:border-slate-700/80"
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-start sm:items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center font-mono text-xs font-bold">
                    Q{index + 1}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {q.question}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-500 font-mono">
                        Question ID: #{q.id}
                      </span>
                      {vResult?.status === "correct" && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Solved
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyBadge(
                      q.difficulty
                    )}`}
                  >
                    {q.difficulty || "Standard"}
                  </span>
                </div>
              </div>

              {/* Code Snippet Card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 rounded-t-xl border-t border-x border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                    <FileCode className="w-3.5 h-3.5 text-sky-400" />
                    <span>snippet_{q.id}.c</span>
                    <span className="bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded text-[9px]">
                      C (C99 / GCC)
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(q.id, q.code)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-sky-300 transition"
                  >
                    {copiedCodeId === q.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="overflow-hidden rounded-b-xl border border-slate-800 bg-slate-950">
                  <CodeBlock
                    code={q.code}
                    language="c"
                    fileName={`snippet_${q.id}.c`}
                    showRun={false}
                  />
                </div>
              </div>

              {/* Action Buttons: Try Predicting Pad & Reveal Expected Output */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {/* Try It Yourself Prediction Pad Toggle */}
                <button
                  onClick={() =>
                    setExpandedTryIt((prev) =>
                      prev.includes(q.id)
                        ? prev.filter((x) => x !== q.id)
                        : [...prev, q.id]
                    )
                  }
                  className={`flex items-center gap-1.5 text-xs font-semibold transition px-3.5 py-2 rounded-xl border ${
                    isTryItOpen
                      ? "bg-purple-950/70 border-purple-500/60 text-purple-200 shadow-md shadow-purple-900/30"
                      : "bg-slate-950 border-purple-500/30 text-purple-300 hover:bg-purple-950/40 hover:text-white"
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5 text-purple-400" />
                  <span>
                    {isTryItOpen ? "Close Prediction Pad" : "Open Prediction Pad"}
                  </span>
                  {userGuess && !isTryItOpen && (
                    <span className="w-2 h-2 rounded-full bg-purple-400 inline-block ml-1"></span>
                  )}
                </button>

                {/* Main Reveal Answer Toggle Button */}
                <button
                  onClick={() => toggleReveal(q.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition transform active:scale-95 shadow-md ${
                    isRevealed
                      ? "bg-emerald-950 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/50"
                      : "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30"
                  }`}
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-4 h-4 text-emerald-400" />
                      <span>Hide Solution &amp; Output</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Reveal Solution &amp; Output</span>
                    </>
                  )}
                </button>
              </div>

              {/* ------------------- INTERACTIVE PREDICTION PAD ------------------- */}
              {isTryItOpen && (
                <div className="bg-purple-950/20 border border-purple-800/40 p-4 sm:p-5 rounded-2xl space-y-3 animate-in fade-in duration-200">
                  {/* Notepad Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-purple-300 font-semibold border-b border-purple-800/30 pb-2.5">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-purple-400" />
                      Your Output Prediction Pad:
                    </span>
                    <span className="text-[11px] text-purple-400/80 font-normal">
                      Write your expected console output &amp; press <strong>Check Prediction</strong>
                    </span>
                  </div>

                  {/* Prediction Input Textarea */}
                  <div className="relative">
                    <textarea
                      rows={4}
                      value={userGuess}
                      onChange={(e) => {
                        setUserGuesses({ ...userGuesses, [q.id]: e.target.value });
                        // Clear verification result when typing new content
                        if (vResult) {
                          setVerificationResults((prev) => {
                            const copy = { ...prev };
                            delete copy[q.id];
                            return copy;
                          });
                        }
                      }}
                      onKeyDown={(e) => {
                        // Support Ctrl+Enter or Cmd+Enter to verify
                        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                          e.preventDefault();
                          handleCheckPrediction(q);
                        }
                      }}
                      placeholder="Type your predicted console output here (exact spacing/values)..."
                      className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-xs font-mono text-purple-200 placeholder-purple-600/60 focus:outline-none focus:ring-2 focus:ring-purple-400 leading-relaxed shadow-inner"
                    />
                  </div>

                  {/* Notepad Action Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCheckPrediction(q)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/30 transition transform active:scale-95"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Check Prediction</span>
                      </button>

                      {userGuess && (
                        <button
                          onClick={() => handleClearPad(q.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-rose-800 text-slate-400 hover:text-rose-300 transition"
                          title="Clear your sketchpad input"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Toggle Comparison View if user made a guess */}
                      {userGuess && isRevealed && (
                        <button
                          onClick={() =>
                            setShowComparison((prev) => ({
                              ...prev,
                              [q.id]: !prev[q.id]
                            }))
                          }
                          className="flex items-center gap-1 text-[11px] text-purple-300 hover:text-purple-100 bg-purple-900/30 border border-purple-500/30 px-2.5 py-1 rounded-lg transition"
                        >
                          <SplitSquareVertical className="w-3 h-3" />
                          <span>
                            {isComparing ? "Hide Side-by-Side" : "Side-by-Side Compare"}
                          </span>
                        </button>
                      )}

                      <span className="text-[10px] text-purple-400/60 font-mono">
                        {userGuess.length} chars · {userGuess.split("\n").length} line(s)
                      </span>
                    </div>
                  </div>

                  {/* Verification Result Feedback Banner */}
                  {vResult && (
                    <div
                      className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs animate-in fade-in duration-200 ${
                        vResult.status === "correct"
                          ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200"
                          : vResult.status === "close"
                          ? "bg-amber-950/60 border-amber-500/50 text-amber-200"
                          : vResult.status === "empty"
                          ? "bg-slate-900 border-slate-700 text-slate-300"
                          : "bg-rose-950/60 border-rose-500/50 text-rose-200"
                      }`}
                    >
                      {vResult.status === "correct" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : vResult.status === "close" ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      ) : vResult.status === "empty" ? (
                        <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      )}

                      <div className="flex-1 space-y-1">
                        <p className="font-semibold">{vResult.message}</p>
                        {vResult.status !== "correct" && !isRevealed && (
                          <button
                            onClick={() => toggleReveal(q.id)}
                            className="text-[11px] underline font-medium text-sky-300 hover:text-sky-200 mt-1 block"
                          >
                            Click here to reveal the verified compiler output &amp; explanation
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Side-by-Side Comparison Box */}
                  {isComparing && isRevealed && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1 bg-slate-950/90 border border-purple-500/30 rounded-xl p-3">
                        <span className="text-[10px] uppercase font-bold text-purple-400 block tracking-wider">
                          Your Prediction:
                        </span>
                        <pre className="text-xs font-mono text-purple-200 whitespace-pre overflow-x-auto">
                          {userGuess || "(empty)"}
                        </pre>
                      </div>
                      <div className="space-y-1 bg-slate-950/90 border border-emerald-500/30 rounded-xl p-3">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                          Expected Compiler Output:
                        </span>
                        <pre className="text-xs font-mono text-emerald-300 whitespace-pre overflow-x-auto">
                          {q.output}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ------------------- REVEALED VERIFIED OUTPUT & EXPLANATION PANEL ------------------- */}
              {isRevealed && (
                <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 animate-in fade-in duration-300">
                  {/* macOS / Linux Terminal Window for Output */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-950 rounded-t-xl border-t border-x border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 ml-2">
                          gcc -O2 snippet_{q.id}.c -o run && ./run
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyOutput(q.id, q.output)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-300 transition"
                      >
                        {copiedOutputId === q.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Output Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Output</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-black/90 rounded-b-xl border border-slate-800 font-mono text-xs md:text-sm text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                      {q.output}
                    </div>
                  </div>

                  {/* Teacher's Step-by-Step Logic Explanation Box */}
                  <div className="bg-slate-950/80 border border-emerald-500/20 p-4 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>Teacher's Logic &amp; Execution Breakdown:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </section>

      {/* 5. FOOTER & EDUCATOR CREDITS */}
      <footer className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500 space-y-1">
        <p>
          <strong className="text-slate-400">{data.topic}</strong> · Designed for Systems Programming Rigor &amp; Technical Interview Mastery
        </p>
        <p>
          Educator: <span className="text-sky-400 font-medium">Sukanta Hui</span> · Coder &amp; AccoTax (Barrackpore &amp; Shyamnagar)
        </p>
      </footer>
    </div>
  );
}