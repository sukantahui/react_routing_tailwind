// src/components/study/QuizEngine.jsx

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import CodeBlockGeneral from "../../common/CodeBlockGeneral";
import {
  RotateCcw,
  Eye,
  EyeOff,
  Award,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Flag,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Share2,
  Check,
  Copy,
  Layers,
  Zap,
  BookOpen,
  HelpCircle,
  ArrowRight,
  User,
  Sliders
} from "lucide-react";
import cnatLogo from "../../assets/cnat.png";
import QRCode from "react-qr-code";
import CertificateGenerator from "./common/CertificateGenerator";

// =========================================================
// ---------- Storage & Helper Functions -------------------
// =========================================================
const STORAGE_PREFIX = "quizEngine_";
const LEADERBOARD_PREFIX = "quizLeaderboard_";
const CANDIDATE_NAME_KEY = "cnat_quiz_candidate_name";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function prepareQuiz(questions, limit) {
  if (!Array.isArray(questions)) return [];

  const shuffled = shuffleArray(questions);
  const sliceSize = limit ? Math.min(limit, shuffled.length) : shuffled.length;
  const picked = shuffled.slice(0, sliceSize);

  return picked.map((q) => {
    const wrapped = q.options.map((opt, idx) => ({
      text: opt,
      originalIndex: idx,
    }));

    const shuffledOptions = shuffleArray(wrapped);
    const newAnswerIndex = shuffledOptions.findIndex(
      (item) => item.originalIndex === q.answerIndex
    );

    return {
      ...q,
      options: shuffledOptions.map((i) => i.text),
      answerIndex: newAnswerIndex,
    };
  });
}

function formatTimer(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// =========================================================
//                ⭐ MODERN ENHANCED QUIZ ENGINE ⭐
// =========================================================
export default function QuizEngine({
  title = "Quiz Test",
  questions = [],
  testId = "test_default",
  questionLimit = 25,
  certificateHeader = "Coder & AccoTax",
  certificateSubtitle = "Barrackpore · www.codernaccotax.co.in",
  certificateTitle = "Certificate of Completion",
  leaderboardTitle = "Coder & AccoTax Leaderboard",
  showStudentName = true,
  passPercent = 60,
  onResultSubmit,
}) {
  const STORAGE_KEY = STORAGE_PREFIX + testId;
  const LEADERBOARD_KEY = LEADERBOARD_PREFIX + testId;
  const BEST_KEY = STORAGE_PREFIX + "best_" + testId;

  // -------------------------------------------------------
  // Core states
  // -------------------------------------------------------
  const [quiz, setQuiz] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [flagged, setFlagged] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false); // only incorrect
  const [flaggedOnlyMode, setFlaggedOnlyMode] = useState(false);

  // View Mode: 'focus' (1-by-1 card) vs 'list' (all questions)
  const [viewMode, setViewMode] = useState("focus");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeCardInList, setActiveCardInList] = useState(0);

  // Timer State
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Candidate Name
  const [studentName, setStudentName] = useState(() => {
    try {
      return localStorage.getItem(CANDIDATE_NAME_KEY) || "";
    } catch {
      return "";
    }
  });
  const [nameEntered, setNameEntered] = useState(() => {
    try {
      return !!localStorage.getItem(CANDIDATE_NAME_KEY);
    } catch {
      return false;
    }
  });

  const [leaderboard, setLeaderboard] = useState([]);
  const [bestScores, setBestScores] = useState({});
  const [copiedShare, setCopiedShare] = useState(false);
  const [showMatrixModal, setShowMatrixModal] = useState(false);

  const [selectedCount, setSelectedCount] = useState(() =>
    Number.isFinite(questionLimit) && questionLimit > 0 ? questionLimit : 25
  );
  const [selectedLevel, setSelectedLevel] = useState("All");

  const questionRefs = useRef([]);
  const prevFinishedRef = useRef(false);

  // -------------------------------------------------------
  // Timer Effect
  // -------------------------------------------------------
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setSecondsElapsed((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isFinished]);

  // -------------------------------------------------------
  // Filter questions by difficulty
  // -------------------------------------------------------
  const availableQuestions = useMemo(() => {
    if (!Array.isArray(questions)) return [];
    if (selectedLevel === "All") return questions;

    const lvl = selectedLevel.toLowerCase();
    let filtered = questions.filter((q) => {
      if (!q.level) return true;
      return String(q.level).toLowerCase() === lvl;
    });

    if (!filtered.length) filtered = questions;
    return filtered;
  }, [questions, selectedLevel]);

  // -------------------------------------------------------
  // Load leaderboard & best scores
  // -------------------------------------------------------
  useEffect(() => {
    const savedLb = localStorage.getItem(LEADERBOARD_KEY);
    if (savedLb) {
      try {
        const parsed = JSON.parse(savedLb);
        setLeaderboard(Array.isArray(parsed) ? parsed : []);
      } catch {
        setLeaderboard([]);
      }
    }

    const savedBest = localStorage.getItem(BEST_KEY);
    if (savedBest) {
      try {
        const parsed = JSON.parse(savedBest);
        if (parsed && typeof parsed === "object") setBestScores(parsed);
      } catch {
        setBestScores({});
      }
    }
  }, [LEADERBOARD_KEY, BEST_KEY]);

  // -------------------------------------------------------
  // Load saved quiz
  // -------------------------------------------------------
  useEffect(() => {
    if (!nameEntered) return;
    if (!availableQuestions.length) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.quiz) && parsed.quiz.length) {
        setQuiz(parsed.quiz);
        setResponses(parsed.responses || {});
        setSubmitted(parsed.submitted || {});
        setFlagged(parsed.flagged || {});
        setScore(parsed.score || 0);
        setIsFinished(!!parsed.isFinished);
        setSecondsElapsed(parsed.secondsElapsed || 0);
        setSelectedCount(parsed.quiz.length);
        if (!parsed.isFinished) setIsTimerRunning(true);
      }
    } catch {
      // ignore
    }
  }, [nameEntered, availableQuestions, STORAGE_KEY]);

  // -------------------------------------------------------
  // Save quiz state
  // -------------------------------------------------------
  useEffect(() => {
    if (!quiz.length) return;
    const data = {
      quiz,
      responses,
      submitted,
      flagged,
      score,
      isFinished,
      secondsElapsed,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [quiz, responses, submitted, flagged, score, isFinished, secondsElapsed, STORAGE_KEY]);

  // -------------------------------------------------------
  // Scroll helper (for list mode)
  // -------------------------------------------------------
  const scrollTo = (index) => {
    const el = questionRefs.current[index];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // -------------------------------------------------------
  // Start quiz
  // -------------------------------------------------------
  const startQuiz = () => {
    if (!availableQuestions.length) return;

    const count =
      selectedCount === "All"
        ? availableQuestions.length
        : Math.min(
            Number(selectedCount) || questionLimit || 25,
            availableQuestions.length
          );

    if (count <= 0) return;

    const fresh = prepareQuiz(availableQuestions, count);

    setQuiz(fresh);
    setResponses({});
    setSubmitted({});
    setFlagged({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setFlaggedOnlyMode(false);
    setCurrentCardIndex(0);
    setSecondsElapsed(0);
    setIsTimerRunning(true);
    prevFinishedRef.current = false;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        quiz: fresh,
        responses: {},
        submitted: {},
        flagged: {},
        score: 0,
        isFinished: false,
        secondsElapsed: 0,
      })
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------------------------------------------------------
  // Option selection
  // -------------------------------------------------------
  const handleSelect = (id, optIndex) => {
    if (submitted[id]) return;
    setResponses((prev) => ({ ...prev, [id]: optIndex }));
  };

  // -------------------------------------------------------
  // Flag / Bookmark question
  // -------------------------------------------------------
  const toggleFlag = (id) => {
    setFlagged((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // -------------------------------------------------------
  // Submit one question
  // -------------------------------------------------------
  const handleSubmit = (q, index) => {
    if (submitted[q.id]) return;

    const userAns = responses[q.id];
    if (userAns === q.answerIndex) setScore((s) => s + 1);

    setSubmitted((prev) => {
      const updated = { ...prev, [q.id]: true };
      if (Object.keys(updated).length === quiz.length) {
        setIsFinished(true);
        setIsTimerRunning(false);
      }
      return updated;
    });

    if (viewMode === "list" && !reviewMode && index + 1 < quiz.length) {
      setTimeout(() => scrollTo(index + 1), 600);
    }
  };

  // -------------------------------------------------------
  // Restart
  // -------------------------------------------------------
  const handleRestart = () => {
    localStorage.removeItem(STORAGE_KEY);
    startQuiz();
  };

  // -------------------------------------------------------
  // Full Reset
  // -------------------------------------------------------
  const handleFullReset = () => {
    localStorage.removeItem(STORAGE_KEY);

    setQuiz([]);
    setResponses({});
    setSubmitted({});
    setFlagged({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setFlaggedOnlyMode(false);
    setCurrentCardIndex(0);
    setSecondsElapsed(0);
    setIsTimerRunning(false);

    setSelectedCount(
      Number.isFinite(questionLimit) && questionLimit > 0 ? questionLimit : 25
    );
    setSelectedLevel("All");
    prevFinishedRef.current = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------------------------------------------------------
  // Filtered Question Sets
  // -------------------------------------------------------
  const wrongQuestions = useMemo(
    () => quiz.filter((q) => submitted[q.id] && responses[q.id] !== q.answerIndex),
    [quiz, submitted, responses]
  );

  const flaggedQuestions = useMemo(
    () => quiz.filter((q) => flagged[q.id]),
    [quiz, flagged]
  );

  const visibleQuestions = useMemo(() => {
    if (reviewMode) return wrongQuestions;
    if (flaggedOnlyMode) return flaggedQuestions;
    return quiz;
  }, [reviewMode, flaggedOnlyMode, wrongQuestions, flaggedQuestions, quiz]);

  // -------------------------------------------------------
  // Keyboard Shortcuts (Focus Mode)
  // -------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!quiz.length || isFinished || nameEntered === false) return;
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      const currentQ = quiz[currentCardIndex];
      if (!currentQ) return;

      // 1-4 or A-D option selection
      if (["1", "2", "3", "4"].includes(e.key)) {
        const optIdx = parseInt(e.key, 10) - 1;
        if (optIdx < currentQ.options.length) handleSelect(currentQ.id, optIdx);
      } else if (["a", "b", "c", "d", "A", "B", "C", "D"].includes(e.key)) {
        const map = { a: 0, b: 1, c: 2, d: 3 };
        const optIdx = map[e.key.toLowerCase()];
        if (optIdx < currentQ.options.length) handleSelect(currentQ.id, optIdx);
      } else if (e.key === "Enter" || e.key === " ") {
        if (!submitted[currentQ.id] && responses[currentQ.id] != null) {
          e.preventDefault();
          handleSubmit(currentQ, currentCardIndex);
        }
      } else if (e.key === "ArrowRight" && viewMode === "focus") {
        if (currentCardIndex < quiz.length - 1) {
          setCurrentCardIndex((c) => c + 1);
        }
      } else if (e.key === "ArrowLeft" && viewMode === "focus") {
        if (currentCardIndex > 0) {
          setCurrentCardIndex((c) => c - 1);
        }
      } else if (e.key.toLowerCase() === "f") {
        toggleFlag(currentQ.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quiz, currentCardIndex, isFinished, nameEntered, responses, submitted, viewMode]);

  // -------------------------------------------------------
  // Leaderboard Recording
  // -------------------------------------------------------
  useEffect(() => {
    if (!isFinished || !quiz.length) return;
    if (prevFinishedRef.current) return;

    const total = quiz.length;
    const percent = total ? Number(((score / total) * 100).toFixed(2)) : 0;

    const entry = {
      name: studentName.trim() || "Guest",
      score,
      total,
      percent,
      time: secondsElapsed,
      date: new Date().toISOString(),
    };

    setLeaderboard((prev) => {
      const arr = [...prev, entry];
      arr.sort((a, b) => {
        if (b.percent !== a.percent) return b.percent - a.percent;
        if (b.score !== a.score) return b.score - a.score;
        return (a.time || 99999) - (b.time || 99999);
      });

      const top10 = arr.slice(0, 10);
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
      return top10;
    });

    setBestScores((prev) => {
      const map = { ...prev };
      const totalCount = total;
      const existing = map[totalCount];

      if (!existing || percent > existing.percent) {
        map[totalCount] = { score, total, percent, date: entry.date, time: secondsElapsed };
      }
      localStorage.setItem(BEST_KEY, JSON.stringify(map));
      return map;
    });

    if (typeof onResultSubmit === "function") {
      onResultSubmit({ ...entry, testId });
    }

    prevFinishedRef.current = true;
  }, [isFinished, score, quiz.length, secondsElapsed]);

  // -------------------------------------------------------
  // Copy Share Scorecard
  // -------------------------------------------------------
  const handleCopyScorecard = () => {
    const total = quiz.length;
    const pct = total ? Math.round((score / total) * 100) : 0;
    const text = `🏆 ${title} Result\n👤 Candidate: ${studentName || "Guest"}\n🎯 Score: ${score}/${total} (${pct}%)\n⏱️ Time Taken: ${formatTimer(secondsElapsed)}\n🎓 Verified at Coder & AccoTax\n🔗 ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2200);
  };

  // ========================================================
  // 1) CANDIDATE NAME ENTRY / ONBOARDING SCREEN
  // ========================================================
  if (!nameEntered) {
    const handleNameSubmit = (e) => {
      if (e) e.preventDefault();
      const final = studentName.trim();
      if (!final) return;
      const upper = final.toUpperCase();
      setStudentName(upper);
      try {
        localStorage.setItem(CANDIDATE_NAME_KEY, upper);
      } catch {
        // ignore
      }
      setNameEntered(true);
    };

    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4 pt-10 pb-12">
        <div className="w-full max-w-lg rounded-3xl bg-slate-950/90 border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 md:p-8 space-y-6 relative overflow-hidden backdrop-blur-xl">
          {/* Ambient background glows */}
          <div className="absolute -top-24 -right-16 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

          {/* Header Brand */}
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="h-12 w-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <img src={cnatLogo} alt="Coder & AccoTax" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-sky-400 font-semibold">
                Coder &amp; AccoTax Assessment
              </p>
              <h1 className="text-base md:text-lg font-bold text-slate-100">
                Candidate Entry Portal
              </h1>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-sky-100">
              Welcome to {title}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your official name below. This name will appear on your{" "}
              <span className="text-sky-300 font-medium">Verified Certificate of Completion</span> and be recorded on the local{" "}
              <span className="text-emerald-300 font-medium">Honor Roll Leaderboard</span>.
            </p>
          </div>

          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User size={14} className="text-sky-400" />
                Candidate Full Name:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SWADEEP MUKHERJEE"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-400 focus:outline-none text-sm transition font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={!studentName.trim()}
              className={`w-full py-3 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
                studentName.trim()
                  ? "bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-bold shadow-[0_10px_30px_rgba(56,189,248,0.35)] cursor-pointer"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <span>Continue to Test Configuration</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
            <Sparkles size={18} className="text-amber-400 shrink-0" />
            <p>
              Your name is stored locally on this device. You will only need to enter it once.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ========================================================
  // 2) TEST SETUP & LAUNCH SCREEN
  // ========================================================
  if (nameEntered && !quiz.length) {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "https://www.codernaccotax.co.in";
    const totalAvailable = availableQuestions.length;
    const choices = [5, 10, 20, 25, 50, 100, 200, "All"];
    const validChoices = choices.filter((x) => x === "All" || x <= totalAvailable);

    const displayedCount =
      selectedCount === "All"
        ? totalAvailable
        : Math.min(Number(selectedCount) || questionLimit || 25, totalAvailable);

    return (
      <section className="max-w-4xl mx-auto pt-8 md:pt-12 mb-12 px-4 space-y-6">
        {/* HERO CARD */}
        <header className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 md:p-8 overflow-hidden backdrop-blur-xl">
          <div className="absolute -top-24 -right-10 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl opacity-60 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <BookOpen size={13} />
                  <span>Module Assessment Hub</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {title}
                </h1>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
                  <span>
                    Candidate:{" "}
                    <span className="text-sky-300 font-bold">{studentName}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setNameEntered(false)}
                    className="text-slate-400 hover:text-slate-200 underline text-[11px]"
                  >
                    (Change)
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2 text-xs">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-emerald-300 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ready for Evaluation</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Total Question Bank:{" "}
                  <span className="text-sky-300 font-bold">{totalAvailable} items</span>
                </p>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 text-xs text-slate-300">
                <Sliders size={13} className="text-sky-400" />
                <span>Level:</span>
                <span className="text-emerald-300 font-bold">
                  {selectedLevel === "All" ? "All Tiers" : selectedLevel}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 text-xs text-slate-300">
                <Layers size={13} className="text-sky-400" />
                <span>Questions:</span>
                <span className="text-sky-300 font-bold">{displayedCount}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 text-xs text-slate-300">
                <Award size={13} className="text-amber-400" />
                <span>Passing Grade:</span>
                <span className="text-amber-300 font-bold">{passPercent}%</span>
              </span>
            </div>
          </div>
        </header>

        {/* SETUP CONTROLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Difficulty Tier */}
          <div className="p-5 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Zap size={14} className="text-amber-400" />
                1. Select Difficulty Tier
              </p>
              <span className="text-[10px] text-slate-400">Targeted Level</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: "All", label: "All Levels", desc: "Comprehensive Mixed" },
                { id: "Beginner", label: "Beginner", desc: "Core Foundations" },
                { id: "Intermediate", label: "Intermediate", desc: "Applied Mechanics" },
                { id: "Advanced", label: "Advanced", desc: "Edge Cases & Spec" },
              ].map((lvl) => {
                const isActive = selectedLevel.toLowerCase() === lvl.id.toLowerCase();
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      isActive
                        ? "bg-gradient-to-r from-sky-500/20 to-emerald-500/20 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <p className={`text-xs font-bold ${isActive ? "text-sky-300" : ""}`}>
                      {lvl.label}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{lvl.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Count Selection */}
          <div className="p-5 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Layers size={14} className="text-sky-400" />
                2. Select Question Count
              </p>
              <span className="text-[10px] text-slate-400">Test Length</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {validChoices.map((n) => {
                const isActive = selectedCount === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSelectedCount(n)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                      isActive
                        ? "bg-sky-500 text-slate-950 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {n === "All" ? `All (${totalAvailable})` : `${n} Qs`}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-400 pt-1">
              Selected set: <span className="text-sky-300 font-bold">{displayedCount}</span> questions randomly drawn &amp; shuffled from the module bank.
            </p>
          </div>
        </div>

        {/* START BUTTON BAR */}
        <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Clock size={16} className="text-sky-400 shrink-0" />
            <span>
              Self-paced assessment · Live stopwatch &amp; instant explanations upon answer submission.
            </span>
          </div>

          <button
            type="button"
            onClick={startQuiz}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-[0_10px_30px_rgba(16,185,129,0.4)] transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start Test Now</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* QR CODE SHARE */}
        <div className="p-5 rounded-3xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs font-semibold text-slate-200">
              📱 Practice on Mobile or Tablet
            </p>
            <p className="text-[11px] text-slate-400 max-w-md">
              Scan this QR code with your mobile camera to take this quiz on another device with full touch support.
            </p>
          </div>

          <div className="p-2 bg-white rounded-xl shadow-lg shrink-0">
            <QRCode value={currentUrl} size={70} level="M" />
          </div>
        </div>
      </section>
    );
  }

  // ========================================================
  // 3) ACTIVE QUIZ HUD & QUESTION CARDS
  // ========================================================
  if (!quiz.length) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-slate-400">
        Loading test questions...
      </div>
    );
  }

  const progress = Object.keys(submitted).length;
  const total = quiz.length;
  const percentComplete = total ? Math.round((progress / total) * 100) : 0;
  const scorePercent = total ? Math.round((score / total) * 100) : 0;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const bestForCurrent = bestScores[total] || null;

  // Active question in focus mode
  const activeFocusQuestion = visibleQuestions[currentCardIndex] || visibleQuestions[0] || quiz[0];
  const activeOriginalIndex = quiz.findIndex((q) => q.id === activeFocusQuestion?.id);

  return (
    <section className="max-w-5xl mx-auto space-y-6 mb-16 px-3 md:px-4 pt-8 md:pt-12">
      {/* =================================================== */}
      {/* 🚀 TOP TEST HUD & QUESTION NAVIGATOR                */}
      {/* =================================================== */}
      <header className="rounded-3xl border border-slate-800/90 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-5 relative overflow-hidden backdrop-blur-xl">
        {/* Subtle background glow */}
        <div className="absolute -top-20 -right-10 h-44 w-44 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        {/* Main Bar Top Row */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-5 border-b border-slate-800/80 pb-5">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/35 text-xs font-bold uppercase tracking-wider text-sky-300">
                <BookOpen size={13} className="text-sky-400" />
                <span>Online Evaluation Test</span>
              </span>
              {reviewMode && (
                <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <EyeOff size={13} />
                  Mistakes Review ({wrongQuestions.length})
                </span>
              )}
              {flaggedOnlyMode && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Flag size={13} />
                  Flagged ({flaggedCount})
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 pt-1">
              <span className="font-semibold text-white flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                <User size={14} className="text-sky-400" />
                Candidate: <strong className="text-sky-300 font-bold">{studentName || "Guest"}</strong>
              </span>
              <span className="text-slate-300 flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                <Clock size={14} className="text-amber-400" />
                Stopwatch: <span className="font-mono font-bold text-white">{formatTimer(secondsElapsed)}</span>
              </span>
              <span className="text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                Pass Score: <strong className="text-emerald-400 font-bold">{passPercent}%</strong>
              </span>
            </div>
          </div>

          {/* Quick Metrics & View Mode Toggle */}
          <div className="relative z-10 flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center gap-2 shadow-inner">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Submitted: <strong className="text-white font-bold">{progress}</strong> / {total}
              </span>
            </div>

            <div className="px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-inner">
              Score: <strong className="text-emerald-400 font-extrabold">{score}</strong> ({scorePercent}%)
            </div>

            {/* View Mode Toggle: Focus vs List */}
            <div className="flex rounded-2xl bg-slate-900 border border-slate-800 p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode("focus")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  viewMode === "focus"
                    ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-slate-950 font-extrabold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Single question focus mode"
              >
                Focus
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-slate-950 font-extrabold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Continuous list mode"
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar with Percentage */}
        <div className="space-y-1.5 relative z-10">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-medium">Evaluation Progress</span>
            <span className="font-bold text-sky-300">{percentComplete}% Completed</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-900/90 border border-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-300 transition-all duration-500 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Question Matrix Navigation Ribbon */}
        <div className="relative z-10 space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800/80 pt-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Layers size={13} className="text-sky-400" />
              <span>Question Navigator</span>
              <span className="text-[10px] text-slate-500 font-normal">
                (Click to jump · Currently on Q{viewMode === "focus" ? (currentCardIndex + 1) : (activeCardInList + 1)})
              </span>
            </span>

            {/* Quick Status Legend */}
            <div className="flex flex-wrap items-center gap-2.5 text-[10px]">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-500/40 text-sky-300 font-bold">
                <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-pulse" />
                Active Q
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="h-2 w-2 rounded-full bg-slate-700" /> Unanswered
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="h-2 w-2 rounded-full bg-sky-400" /> Selected
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Correct
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-400" /> Incorrect
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Flagged
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 px-1 custom-scrollbar">
            {quiz.map((q, idx) => {
              const isSub = submitted[q.id];
              const isCorrect = isSub && responses[q.id] === q.answerIndex;
              const isSelected = responses[q.id] != null && !isSub;
              const isFlag = flagged[q.id];
              const isCurrent =
                viewMode === "focus"
                  ? activeFocusQuestion?.id === q.id
                  : activeCardInList === idx;

              let badgeClass = "";

              if (isCurrent) {
                // High-visibility ACTIVE question color states
                if (isSub) {
                  badgeClass = isCorrect
                    ? "bg-emerald-500 text-slate-950 border-emerald-200 font-black shadow-[0_0_20px_rgba(16,185,129,0.9)] ring-2 ring-white scale-110"
                    : "bg-rose-500 text-white border-rose-200 font-black shadow-[0_0_20px_rgba(244,63,94,0.9)] ring-2 ring-white scale-110";
                } else if (isSelected) {
                  badgeClass = "bg-cyan-400 text-slate-950 border-white font-black shadow-[0_0_20px_rgba(34,211,238,0.9)] ring-2 ring-white scale-110";
                } else {
                  // Active & Unanswered: Bright electric sky blue
                  badgeClass = "bg-sky-500 text-slate-950 border-sky-200 font-black shadow-[0_0_20px_rgba(56,189,248,0.95)] ring-2 ring-white scale-110";
                }
              } else {
                // Inactive question states
                if (isSub) {
                  badgeClass = isCorrect
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-bold hover:bg-emerald-500/35 hover:scale-105"
                    : "bg-rose-500/20 text-rose-300 border-rose-500/60 font-bold hover:bg-rose-500/35 hover:scale-105";
                } else if (isSelected) {
                  badgeClass = "bg-sky-500/25 text-sky-200 border-sky-500/70 font-bold hover:bg-sky-500/40 hover:scale-105";
                } else {
                  badgeClass = "bg-slate-900/90 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200 hover:bg-slate-800/80 hover:scale-105";
                }
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    if (viewMode === "focus") {
                      const foundIdx = visibleQuestions.findIndex((x) => x.id === q.id);
                      if (foundIdx >= 0) setCurrentCardIndex(foundIdx);
                    } else {
                      setActiveCardInList(idx);
                      scrollTo(idx);
                    }
                  }}
                  className={`relative h-9 min-w-[2.4rem] px-2.5 rounded-xl border text-xs font-bold transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer ${badgeClass}`}
                  title={`Question ${idx + 1}${isCurrent ? " (Current Active)" : ""}${isFlag ? " (Flagged)" : ""}${isSub ? (isCorrect ? " - Correct" : " - Incorrect") : isSelected ? " - Selected" : " - Unanswered"}`}
                >
                  <span>{idx + 1}</span>
                  {isFlag && (
                    <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center text-[8px] text-slate-950 font-black shadow">
                      ★
                    </span>
                  )}
                  {isCurrent && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-3 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* =================================================== */}
      {/* 4) FINISHED TEST SUMMARY BANNER                     */}
      {/* =================================================== */}
      {isFinished && (
        <section className="rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 p-6 md:p-8 shadow-[0_20px_60px_rgba(16,185,129,0.2)] space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative h-24 w-24 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/40 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] shrink-0">
                <Award size={32} className="text-emerald-400 mb-0.5" />
                <span className="text-lg font-black text-white">{scorePercent}%</span>
              </div>

              <div className="space-y-1 text-center md:text-left">
                <p className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold">
                  {scorePercent >= passPercent ? "🎉 Assessment Passed" : "Needs Revision"}
                </p>
                <h2 className="text-xl md:text-2xl font-black text-white">
                  {studentName || "Candidate"}, You Scored {score} / {total}
                </h2>
                <p className="text-xs text-slate-400">
                  Completed in <strong className="text-sky-300">{formatTimer(secondsElapsed)}</strong> · Passing threshold: {passPercent}%
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-end">
              <button
                type="button"
                onClick={handleCopyScorecard}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5"
              >
                {copiedShare ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedShare ? "Scorecard Copied!" : "Copy Scorecard"}</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5"
              >
                <RotateCcw size={14} className="text-sky-400" />
                <span>Retake Test</span>
              </button>

              {wrongQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setReviewMode(!reviewMode);
                    setCurrentCardIndex(0);
                  }}
                  className={`px-4 py-2.5 rounded-2xl border text-xs font-semibold transition flex items-center gap-1.5 ${
                    reviewMode
                      ? "bg-rose-600 text-white border-rose-400"
                      : "bg-rose-500/10 border-rose-500/40 text-rose-300 hover:bg-rose-500/20"
                  }`}
                >
                  {reviewMode ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{reviewMode ? "Exit Mistake Review" : `Review Mistakes (${wrongQuestions.length})`}</span>
                </button>
              )}
            </div>
          </div>

          {/* Certificate Generator Card */}
          {showStudentName && (
            <div className="pt-4 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                <p className="font-semibold text-white">Official Printable Certificate</p>
                <p className="text-[11px] text-slate-400">
                  Generate high-resolution certificate with candidate name and QR validation code.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <CertificateGenerator
                  studentName={studentName || "Student Name"}
                  score={score}
                  total={quiz.length}
                  title={title}
                  level={selectedLevel}
                  certificateHeader={certificateHeader}
                  certificateSubtitle={certificateSubtitle}
                  certificateTitle={certificateTitle}
                  passPercent={passPercent}
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* =================================================== */}
      {/* 5) QUESTION VIEWS (Focus Mode vs List Mode)         */}
      {/* =================================================== */}
      {viewMode === "focus" ? (
        /* SINGLE CARD FOCUS MODE */
        <div className="space-y-4">
          <QuestionCard
            q={activeFocusQuestion}
            index={activeOriginalIndex}
            userAnswer={responses[activeFocusQuestion.id]}
            isSub={submitted[activeFocusQuestion.id]}
            isFlagged={flagged[activeFocusQuestion.id]}
            onSelect={(optIdx) => handleSelect(activeFocusQuestion.id, optIdx)}
            onSubmit={() => handleSubmit(activeFocusQuestion, activeOriginalIndex)}
            onToggleFlag={() => toggleFlag(activeFocusQuestion.id)}
          />

          {/* Navigation Controls in Focus Mode */}
          <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentCardIndex === 0}
              onClick={() => setCurrentCardIndex((c) => Math.max(0, c - 1))}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5"
            >
              <ChevronLeft size={16} />
              <span>Previous Question</span>
            </button>

            <span className="text-xs font-bold text-slate-400">
              Question {currentCardIndex + 1} of {visibleQuestions.length}
            </span>

            <button
              type="button"
              disabled={currentCardIndex >= visibleQuestions.length - 1}
              onClick={() => setCurrentCardIndex((c) => Math.min(visibleQuestions.length - 1, c + 1))}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5"
            >
              <span>Next Question</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* ALL QUESTIONS LIST MODE */
        <div className="space-y-6">
          {visibleQuestions.map((q) => {
            const originalIndex = quiz.findIndex((x) => x.id === q.id);
            return (
              <div key={q.id} ref={(el) => (questionRefs.current[originalIndex] = el)}>
                <QuestionCard
                  q={q}
                  index={originalIndex}
                  userAnswer={responses[q.id]}
                  isSub={submitted[q.id]}
                  isFlagged={flagged[q.id]}
                  onSelect={(optIdx) => handleSelect(q.id, optIdx)}
                  onSubmit={() => handleSubmit(q, originalIndex)}
                  onToggleFlag={() => toggleFlag(q.id)}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* =================================================== */}
      {/* 6) LEADERBOARD SECTION                              */}
      {/* =================================================== */}
      {leaderboard.length > 0 && (
        <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
                <Trophy size={20} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{leaderboardTitle}</h3>
                <p className="text-xs text-slate-400">
                  Top candidate scores recorded locally on this device
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/60">
            <table className="w-full text-xs text-slate-200">
              <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3 text-left">Rank</th>
                  <th className="py-2.5 px-3 text-left">Candidate</th>
                  <th className="py-2.5 px-3 text-right">Score</th>
                  <th className="py-2.5 px-3 text-right">Accuracy</th>
                  <th className="py-2.5 px-3 text-right">Time</th>
                  <th className="py-2.5 px-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leaderboard.map((entry, idx) => {
                  const dateStr = new Date(entry.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  });
                  return (
                    <tr key={idx} className="hover:bg-slate-800/40 transition">
                      <td className="py-2.5 px-3 font-bold text-amber-400">#{idx + 1}</td>
                      <td className="py-2.5 px-3 font-semibold text-white">{entry.name}</td>
                      <td className="py-2.5 px-3 text-right font-medium">
                        {entry.score} / {entry.total}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                        {typeof entry.percent === "number" ? entry.percent.toFixed(1) : entry.percent}%
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-400">
                        {entry.time ? formatTimer(entry.time) : "--:--"}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-500">{dateStr}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FOOTER RESET BAR */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-4">
        <button
          type="button"
          onClick={handleFullReset}
          className="text-rose-400 hover:text-rose-300 underline cursor-pointer"
        >
          Reset Quiz Configuration &amp; Start Over
        </button>

        <span>Test ID: <code className="text-slate-400">{testId}</code></span>
      </div>
    </section>
  );
}

// =========================================================
// ⭐ QUESTION CARD COMPONENT
// =========================================================
function QuestionCard({ q, index, userAnswer, isSub, isFlagged, onSelect, onSubmit, onToggleFlag }) {
  if (!q) return null;
  const isCorrect = isSub && userAnswer === q.answerIndex;

  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  return (
    <article className="border border-slate-800/90 bg-slate-950/90 rounded-3xl p-5 md:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.85)] space-y-4 backdrop-blur-xl transition hover:border-slate-700">
      {/* Header Badges & Question */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-6 min-w-[2.2rem] items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-xs font-extrabold text-sky-400">
              Q{index + 1}
            </span>

            {q.topic && (
              <span className="inline-flex items-center rounded-full bg-sky-500/10 border border-sky-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                {q.topic}
              </span>
            )}

            {q.level && (
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                {q.level}
              </span>
            )}

            {q.type && (
              <span className="inline-flex items-center rounded-full bg-violet-500/10 border border-violet-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-300">
                {q.type === "output" ? "Code Output" : "MCQ"}
              </span>
            )}
          </div>

          <h3 className="font-bold text-slate-100 text-base md:text-lg leading-snug">
            {q.question}
          </h3>
        </div>

        {/* Flag Bookmark & Result Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleFlag}
            className={`p-2 rounded-xl border transition ${
              isFlagged
                ? "bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
            }`}
            title={isFlagged ? "Flagged for review" : "Flag question"}
          >
            <Flag size={15} />
          </button>

          {isSub && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border shadow ${
                isCorrect
                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/60"
                  : "bg-rose-500/15 text-rose-300 border-rose-500/60"
              }`}
            >
              {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
              <span>{isCorrect ? "Correct" : "Incorrect"}</span>
            </span>
          )}
        </div>
      </div>

      {/* Code Snippet (if available) */}
      {q.code && (
        <div className="mt-2 rounded-2xl overflow-hidden border border-slate-800">
          <CodeBlockGeneral code={q.code} language="javascript" />
        </div>
      )}

      {/* Options List */}
      <div className="space-y-2.5 pt-2">
        {q.options.map((opt, optIdx) => {
          const selected = userAnswer === optIdx;
          const letter = optionLetters[optIdx] || String(optIdx + 1);

          let containerStyle = "border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 text-slate-200";
          let badgeStyle = "bg-slate-800 text-slate-400 border-slate-700";

          if (isSub) {
            if (optIdx === q.answerIndex) {
              containerStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
              badgeStyle = "bg-emerald-500 text-slate-950 font-black border-emerald-400";
            } else if (selected) {
              containerStyle = "border-rose-500 bg-rose-950/40 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.2)]";
              badgeStyle = "bg-rose-500 text-white font-black border-rose-400";
            }
          } else if (selected) {
            containerStyle = "border-sky-400 bg-sky-950/40 text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-sky-400";
            badgeStyle = "bg-sky-400 text-slate-950 font-black border-sky-300";
          }

          return (
            <button
              key={optIdx}
              type="button"
              disabled={isSub}
              onClick={() => onSelect(optIdx)}
              className={`w-full p-3.5 md:p-4 rounded-2xl border text-left flex items-start gap-3.5 transition duration-150 cursor-pointer ${containerStyle} ${
                isSub ? "cursor-default" : ""
              }`}
            >
              <span
                className={`h-7 w-7 rounded-xl border flex items-center justify-center text-xs font-bold shrink-0 transition ${badgeStyle}`}
              >
                {letter}
              </span>
              <span className="text-sm font-medium leading-relaxed pt-0.5 flex-1">{opt}</span>
              {isSub && optIdx === q.answerIndex && (
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isSub && selected && optIdx !== q.answerIndex && (
                <XCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Submit / Explanation Area */}
      {!isSub ? (
        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px]">1-4</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px]">A-D</kbd> then <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px]">Enter</kbd>
          </span>

          <button
            type="button"
            onClick={onSubmit}
            disabled={userAnswer == null}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${
              userAnswer != null
                ? "bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 shadow-[0_6px_20px_rgba(56,189,248,0.35)] cursor-pointer"
                : "bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed"
            }`}
          >
            <span>Submit Answer</span>
            <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="pt-3 space-y-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Correct Answer:</span>
            <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/30">
              {optionLetters[q.answerIndex]}. {q.options[q.answerIndex]}
            </span>
          </div>

          {q.explanation && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <p className="text-[11px] uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Concept Explanation &amp; Mechanics</span>
              </p>
              <p className="text-xs leading-relaxed text-slate-300">{q.explanation}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
