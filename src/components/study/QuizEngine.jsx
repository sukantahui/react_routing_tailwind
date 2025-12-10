// src/components/study/common/QuizEngine.jsx

import React, { useState, useEffect, useRef, useMemo } from "react";
import CodeBlockGeneral from "../../common/CodeBlockGeneral";
import { RotateCcw, Eye, EyeOff, Award, Trophy } from "lucide-react";
import cnatLogo from "../../assets/cnat.png";
import QRCode from "react-qr-code";
import CertificateGenerator from "../study/common/CertificateGenerator";

// =========================================================
// ---------- Helpers --------------------------------------
// =========================================================
const STORAGE_PREFIX = "quizEngine_";
const LEADERBOARD_PREFIX = "quizLeaderboard_";

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

// =========================================================
//                ⭐ QUIZ ENGINE ⭐
// =========================================================
export default function QuizEngine({
  title = "Quiz Test",
  questions = [],
  testId = "test_default",
  questionLimit = 25, // just default, not forced
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
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [nameEntered, setNameEntered] = useState(false);

  const [leaderboard, setLeaderboard] = useState([]);
  const [bestScores, setBestScores] = useState({});

  const [selectedCount, setSelectedCount] = useState(() =>
    Number.isFinite(questionLimit) && questionLimit > 0 ? questionLimit : 25
  );
  const [selectedLevel, setSelectedLevel] = useState("All"); // All / beginner / moderate / advanced

  const questionRefs = useRef([]);
  const prevFinishedRef = useRef(false);

  // -------------------------------------------------------
  // Detect Mobile → auto-enter name
  // -------------------------------------------------------
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile && !nameEntered) {
      setStudentName("Mobile User");
      setNameEntered(true);
    }
  }, [isMobile, nameEntered]);

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

    if (!filtered.length) filtered = questions; // fallback
    return filtered;
  }, [questions, selectedLevel]);

  // -------------------------------------------------------
  // Load leaderboard + best scores once
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
        if (parsed && typeof parsed === "object") {
          setBestScores(parsed);
        }
      } catch {
        setBestScores({});
      }
    }
  }, [LEADERBOARD_KEY, BEST_KEY]);

  // -------------------------------------------------------
  // Load saved quiz (ONLY if exists). Otherwise show start screen.
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
        setScore(parsed.score || 0);
        setIsFinished(!!parsed.isFinished);
        setReviewMode(false);
        setSelectedCount(parsed.quiz.length);
      }
    } catch {
      // ignore corrupted save
    }
  }, [nameEntered, availableQuestions, STORAGE_KEY]);

  // -------------------------------------------------------
  // Save quiz state whenever it changes
  // -------------------------------------------------------
  useEffect(() => {
    if (!quiz.length) return;
    const data = { quiz, responses, submitted, score, isFinished };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [quiz, responses, submitted, score, isFinished, STORAGE_KEY]);

  // -------------------------------------------------------
  // Scroll helper
  // -------------------------------------------------------
  const scrollTo = (index) => {
    const el = questionRefs.current[index];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // -------------------------------------------------------
  // Start quiz (called from start screen & restart)
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
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    prevFinishedRef.current = false;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        quiz: fresh,
        responses: {},
        submitted: {},
        score: 0,
        isFinished: false,
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
      }
      return updated;
    });

    if (!reviewMode && index + 1 < quiz.length) {
      setTimeout(() => scrollTo(index + 1), 600);
    }
  };

  // -------------------------------------------------------
  // Restart (same level & question count, new random set)
  // -------------------------------------------------------
  const handleRestart = () => {
    localStorage.removeItem(STORAGE_KEY);
    startQuiz();
  };

  // -------------------------------------------------------
  // Full Reset → back to name + selection screen
  // -------------------------------------------------------
  const handleFullReset = () => {
    localStorage.removeItem(STORAGE_KEY);

    setQuiz([]);
    setResponses({});
    setSubmitted({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);

    setStudentName("");
    setNameEntered(false);
    setSelectedCount(
      Number.isFinite(questionLimit) && questionLimit > 0 ? questionLimit : 25
    );
    setSelectedLevel("All");

    prevFinishedRef.current = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------------------------------------------------------
  // Wrong questions list
  // -------------------------------------------------------
  const wrongQuestions = quiz.filter(
    (q) => submitted[q.id] && responses[q.id] !== q.answerIndex
  );
  const visibleQuestions = reviewMode ? wrongQuestions : quiz;

  // -------------------------------------------------------
  // Leaderboard logic
  // -------------------------------------------------------
  useEffect(() => {
    if (!isFinished || !quiz.length) return;
    if (prevFinishedRef.current) return; // run once per completion

    const total = quiz.length;
    const percent = total ? Number(((score / total) * 100).toFixed(2)) : 0;

    const entry = {
      name: studentName.trim() || "Guest",
      score,
      total,
      percent,
      date: new Date().toISOString(),
    };

    // Update leaderboard
    setLeaderboard((prev) => {
      const arr = [...prev, entry];

      arr.sort((a, b) => {
        if (b.percent !== a.percent) return b.percent - a.percent;
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.date) - new Date(a.date);
      });

      const top10 = arr.slice(0, 10);
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
      return top10;
    });

    // Best scores map
    setBestScores((prev) => {
      const map = { ...prev };
      const totalCount = total;
      const existing = map[totalCount];

      if (!existing || percent > existing.percent) {
        map[totalCount] = { score, total, percent, date: entry.date };
      }
      localStorage.setItem(BEST_KEY, JSON.stringify(map));
      return map;
    });

    if (typeof onResultSubmit === "function") {
      onResultSubmit({ ...entry, testId });
    }

    prevFinishedRef.current = true;
  }, [isFinished, score, quiz.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // ========================================================
  // 1) NAME ENTRY (DESKTOP ONLY)
  // ========================================================
  if (!nameEntered && !isMobile) {
    const handleNameStart = (event) => {
      if (event) event.preventDefault();
      const finalName = studentName.trim();
      if (!finalName) return;

      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }

      setTimeout(() => {
        setStudentName(finalName);
        setNameEntered(true);
      }, 30);
    };

    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-slate-950/90 border border-slate-800 shadow-[0_18px_50px_rgba(0,0,0,0.8)] p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-2xl bg-sky-500/10 border border-sky-500/40 flex items-center justify-center">
              <img
                src={cnatLogo}
                alt="Coder & AccoTax"
                className="h-6 w-6 object-contain"
              />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                Coder &amp; AccoTax
              </p>
              <h1 className="text-sm font-semibold text-sky-100">
                Module Test · Candidate Entry
              </h1>
            </div>
          </div>

          <h2 className="text-lg font-bold text-sky-200">
            Enter Student Name to Begin
          </h2>
          <p className="text-xs text-slate-400">
            This name will be printed on the{" "}
            <span className="text-sky-300 font-semibold">certificate</span> and
            shown on the{" "}
            <span className="text-emerald-300 font-semibold">leaderboard</span>.
          </p>

          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-sky-500 focus:outline-none text-sm"
          />

          <button
            type="button"
            onClick={handleNameStart}
            className={`w-full py-2.5 rounded-2xl text-white font-semibold text-sm transition ${studentName.trim()
                ? "bg-sky-600 hover:bg-sky-500 shadow-[0_10px_30px_rgba(56,189,248,0.3)]"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
          >
            Continue to Test Setup
          </button>

          <p className="text-[11px] text-slate-500 text-center pt-1">
            Tip: Use your{" "}
            <span className="text-sky-300">full official name</span> for
            printed certificates.
          </p>
        </div>
      </section>
    );
  }

  // ========================================================
  // 2) START SCREEN (Level + Question Count)
  // ========================================================
  if (nameEntered && !quiz.length) {
    const currentUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "https://www.codernaccotax.co.in";

    const totalAvailable = availableQuestions.length;

    const choices = [5, 10, 15, 20, 25, 30, 40, 50, "All"];
    const validChoices = choices.filter(
      (x) => x === "All" || x <= totalAvailable
    );

    const displayedCount =
      selectedCount === "All"
        ? totalAvailable
        : Math.min(
          Number(selectedCount) || questionLimit || 25,
          totalAvailable
        );

    return (
      <section className="max-w-4xl mx-auto mt-8 mb-10 px-3 space-y-8">
        {/* INTRO CARD */}
        <header className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 shadow-[0_18px_60px_rgba(0,0,0,0.85)] p-6 overflow-hidden">
          <div className="absolute -top-24 -right-10 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl opacity-60" />
          <div className="absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl opacity-60" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                  Coder &amp; AccoTax · Online Assessment
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-sky-100 mt-1">
                  {title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Candidate:{" "}
                  <span className="text-sky-300 font-semibold">
                    {studentName || "Guest"}
                  </span>
                </p>
              </div>

              <div className="hidden sm:flex flex-col items-end gap-2 text-[11px]">
                <div className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-slate-700 px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-slate-200 font-medium">
                    Ready to Start
                  </span>
                </div>
                <p className="text-slate-500">
                  Question pool:{" "}
                  <span className="text-sky-300 font-semibold">
                    {totalAvailable}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-slate-700 px-2.5 py-1 text-slate-300">
                Selected Level:{" "}
                <span className="text-emerald-300 font-semibold">
                  {selectedLevel === "All"
                    ? "All Levels"
                    : selectedLevel.charAt(0).toUpperCase() +
                    selectedLevel.slice(1)}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-slate-700 px-2.5 py-1 text-slate-300">
                Planned Questions:{" "}
                <span className="text-sky-300 font-semibold">
                  {displayedCount}
                </span>
              </span>
            </div>
          </div>
        </header>

        {/* LEVEL SELECTION */}
        <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner shadow-black/40">
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-xs font-semibold text-slate-200">
              1. Select Difficulty Level
            </p>
            <p className="text-[10px] text-slate-500">
              Un-tagged questions appear in all levels
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "beginner", "moderate", "advanced"].map((lvl) => {
              const isActive = selectedLevel === lvl;
              const label =
                lvl === "All"
                  ? "All Levels"
                  : lvl.charAt(0).toUpperCase() + lvl.slice(1);

              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-full text-[11px] border transition flex items-center gap-1 ${isActive
                      ? "bg-emerald-600 text-white border-emerald-400 shadow-[0_8px_25px_rgba(16,185,129,0.4)]"
                      : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                    }`}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* NUMBER OF QUESTIONS */}
        <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner shadow-black/40 space-y-3">
          <p className="text-xs font-semibold text-slate-200">
            2. Select Number of Questions
          </p>

          <div className="flex flex-wrap gap-2">
            {validChoices.map((n) => {
              const value = n;
              const isActive = selectedCount === value;

              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSelectedCount(value)}
                  className={`px-3 py-1.5 rounded-full text-[11px] border transition ${isActive
                      ? "bg-sky-600 text-white border-sky-400 shadow-[0_8px_25px_rgba(56,189,248,0.4)]"
                      : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                    }`}
                >
                  {n === "All" ? "All" : n}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>
              You will get{" "}
              <span className="text-sky-300 font-semibold">
                {displayedCount}
              </span>{" "}
              question(s) from{" "}
              <span className="text-slate-200 font-semibold">
                {totalAvailable}
              </span>{" "}
              in this test.
            </span>
          </div>

          <button
            type="button"
            onClick={startQuiz}
            className="mt-2 w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-[0_14px_40px_rgba(16,185,129,0.55)] transition"
          >
            Start Test Now
          </button>
        </div>

        {/* QR SHARE */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-[11px] text-slate-400">
            Scan to open this test on another device:
          </p>

          <div className="relative p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-[0_14px_40px_rgba(15,23,42,0.9)]">
            <div className="absolute inset-0 rounded-2xl bg-sky-500/10 blur-xl opacity-40 pointer-events-none" />
            <div className="relative bg-slate-900 p-3 rounded-xl border border-slate-700">
              <QRCode value={currentUrl} size={150} level="H" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-slate-950 p-1 rounded-lg border border-slate-600">
                  <img src={cnatLogo} alt="logo" className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 break-all text-center">
            {currentUrl}
          </p>
        </div>
      </section>
    );
  }

  // ========================================================
  // 3) QUIZ MODE (after Start)
  // ========================================================
  if (!quiz.length) {
    return (
      <div className="max-w-5xl mx-auto text-slate-300 text-sm">
        Loading questions…
      </div>
    );
  }

  const progress = Object.keys(submitted).length;
  const total = quiz.length;
  const percentComplete = total ? Math.round((progress / total) * 100) : 0;
  const scorePercent = total ? ((score / total) * 100).toFixed(1) : "0.0";

  const bestForCurrent = bestScores[total] || null;
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.codernaccotax.co.in";

  return (
    <section className="max-w-5xl mx-auto space-y-8 mb-10 px-3">
      {/* HEADER CARD */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-5 md:px-6 md:py-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute -top-28 -left-16 h-44 w-44 rounded-full bg-sky-500/30 blur-3xl" />
          <div className="absolute -bottom-28 -right-10 h-52 w-52 rounded-full bg-violet-500/25 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-4">
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-1">
                Coder &amp; AccoTax · Module Test
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-sky-100">
                {title}
              </h2>
              <p className="text-[11px] text-slate-400 mt-1">
                Candidate:{" "}
                <span className="text-sky-300 font-semibold">
                  {studentName || "Guest"}
                </span>
              </p>

              <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-slate-700 px-2.5 py-1 text-slate-300">
                  Level:{" "}
                  <span className="text-emerald-300 font-semibold">
                    {selectedLevel === "All"
                      ? "All Levels"
                      : selectedLevel.charAt(0).toUpperCase() +
                      selectedLevel.slice(1)}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-slate-700 px-2.5 py-1 text-slate-300">
                  Questions in this test:{" "}
                  <span className="text-sky-300 font-semibold">{total}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-sky-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {progress}/{total} submitted
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-100">
                Score: {score} ({scorePercent}%)
              </span>
              {bestForCurrent && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-amber-100">
                  Best: {bestForCurrent.score}/{bestForCurrent.total} (
                  {bestForCurrent.percent.toFixed
                    ? bestForCurrent.percent.toFixed(1)
                    : bestForCurrent.percent}
                  %)
                </span>
              )}
              {reviewMode && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-amber-100">
                  <EyeOff size={12} />
                  Review incorrect only
                </span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Progress</span>
              <span>{percentComplete}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-violet-400 transition-all"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex flex-wrap gap-2 pt-1">
            {/* RESET to Start Screen */}
            <button
              type="button"
              onClick={handleFullReset}
              className="inline-flex items-center gap-1.5 rounded-full bg-rose-600/90 px-3 py-1.5 
                text-[11px] font-medium text-white border border-rose-700 
                hover:bg-rose-500 shadow-[0_10px_30px_rgba(248,113,113,0.55)] transition"
            >
              Reset Test
            </button>

            {/* Restart with same settings */}
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-100 border border-slate-700 hover:border-sky-500 hover:text-sky-100 hover:bg-slate-900 transition"
            >
              <RotateCcw size={12} />
              Restart (new {total} Qs)
            </button>

            {!reviewMode && wrongQuestions.length > 0 && isFinished && (
              <button
                type="button"
                onClick={() => setReviewMode(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-[11px] font-medium text-amber-100 border border-amber-500/60 hover:bg-amber-500/20 transition"
              >
                <Eye size={12} />
                Review incorrect only
              </button>
            )}

            {reviewMode && (
              <button
                type="button"
                onClick={() => setReviewMode(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-100 border border-slate-600 hover:border-slate-400 transition"
              >
                <EyeOff size={12} />
                Exit review mode
              </button>
            )}
          </div>

          {/* Small QR (optional while in quiz) */}
          <div className="mt-3 flex items-center gap-3 text-[11px]">
            <div className="relative p-2 rounded-xl bg-slate-950 border border-slate-700">
              <QRCode value={currentUrl} size={80} level="H" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-slate-950 p-0.5 rounded-md border border-slate-600">
                  <img src={cnatLogo} alt="logo" className="h-4 w-4" />
                </div>
              </div>
            </div>
            <p className="text-slate-400">
              Scan to continue this quiz on another device.
            </p>
          </div>

          {/* Certificate (using CertificateGenerator component) */}
          {isFinished && (
            <div className="mt-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-3 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/15 border border-sky-500/50">
                  <Award size={14} className="text-sky-300" />
                </div>
                <div>
                  <p className="font-medium text-slate-100">
                    Test completed – generate certificate
                  </p>
                  <p className="text-[11px] text-slate-400">
                    The name shown above will appear on the printed
                    certificate.
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row gap-2 md:justify-end">
                {showStudentName && (
                  <input
                    type="text"
                    placeholder="Student name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-700 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                )}

                <CertificateGenerator
                  studentName={studentName || "Student Name"}
                  score={score}
                  total={quiz.length}
                  title={title}
                  certificateHeader={certificateHeader}
                  certificateSubtitle={certificateSubtitle}
                  certificateTitle={certificateTitle}
                  passPercent={passPercent}
                />
              </div>
            </div>
          )}

          {/* Leaderboard */}
          {leaderboard.length > 0 && (
            <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/50">
                    <Trophy size={14} className="text-amber-300" />
                  </span>
                  <div>
                    <h3 className="text-xs font-semibold text-amber-100">
                      {leaderboardTitle}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Top {leaderboard.length} scores recorded locally on this
                      device.
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/90">
                <table className="w-full text-[11px] text-slate-100">
                  <thead className="bg-slate-900/80 text-slate-400">
                    <tr>
                      <th className="py-1.5 px-2 text-left">#</th>
                      <th className="py-1.5 px-2 text-left">Name</th>
                      <th className="py-1.5 px-2 text-right">Score</th>
                      <th className="py-1.5 px-2 text-right">%</th>  {/* FIXED */}
                      <th className="py-1.5 px-2 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, idx) => {
                      const dateStr = new Date(entry.date).toLocaleDateString(
                        "en-IN",
                        { day: "2-digit", month: "short" }
                      );
                      const pct =
                        typeof entry.percent === "number"
                          ? entry.percent.toFixed(1)
                          : entry.percent;
                      return (
                        <tr
                          key={idx}
                          className="border-t border-slate-800/70 hover:bg-slate-900/70"
                        >
                          <td className="py-1.5 px-2">{idx + 1}</td>
                          <td className="py-1.5 px-2">{entry.name}</td>
                          <td className="py-1.5 px-2 text-right">
                            {entry.score}/{entry.total}
                          </td>
                          <td className="py-1.5 px-2 text-right">{pct}</td>
                          <td className="py-1.5 px-2 text-right">{dateStr}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* QUESTIONS LIST */}
      <div className="space-y-6">
        {visibleQuestions.map((q) => {
          const index = quiz.findIndex((x) => x.id === q.id);
          const userAnswer = responses[q.id];
          const isSub = submitted[q.id];
          const isCorrect = isSub && userAnswer === q.answerIndex;

          return (
            <article
              key={q.id}
              ref={(el) => (questionRefs.current[index] =
                el)}
              className="border border-slate-800 bg-slate-950/80 rounded-2xl p-4 md:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] space-y-3 transition-transform duration-150 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="inline-flex h-6 min-w-[2rem] items-center justify-center rounded-full bg-slate-900 text-[11px] text-slate-300 border border-slate-700">
                      Q{index + 1}
                    </span>
                    {q.topic && (
                      <span className="inline-flex items-center rounded-full bg-sky-500/10 border border-sky-500/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-sky-200">
                        {q.topic}
                      </span>
                    )}
                    {q.level && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-200">
                        {String(q.level)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-50 text-sm md:text-base leading-snug">
                    {q.question}
                  </h3>
                </div>

                {isSub && (
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold border ${isCorrect
                        ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/60"
                        : "bg-rose-500/15 text-rose-200 border-rose-500/60"
                      }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              {q.code && (
                <div className="mt-1">
                  <CodeBlockGeneral code={q.code} language="javascript" />
                </div>
              )}

              <div className="space-y-1 mt-1">
                {q.options.map((opt, optIndex) => {
                  const inputId = `q${q.id}_${optIndex}`;
                  const selected = userAnswer === optIndex;

                  let style =
                    "border-slate-700 bg-slate-950 hover:bg-slate-900";
                  if (isSub) {
                    if (optIndex === q.answerIndex) {
                      style =
                        "border-emerald-500 bg-emerald-900/40 text-emerald-50";
                    } else if (selected) {
                      style =
                        "border-rose-500 bg-rose-900/40 text-rose-100";
                    }
                  } else if (selected) {
                    style =
                      "border-sky-500 bg-sky-900/40 text-sky-50";
                  }

                  return (
                    <label
                      key={inputId}
                      htmlFor={inputId}
                      className={`cursor-pointer px-3 py-2 border rounded-xl flex gap-2 text-sm transition ${style}`}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        disabled={isSub}
                        checked={selected}
                        onChange={() => handleSelect(q.id, optIndex)}
                        className="mt-0.5 accent-sky-500"
                      />
                      <span className="leading-snug">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {!isSub ? (
                <button
                  type="button"
                  onClick={() => handleSubmit(q, index)}
                  disabled={responses[q.id] == null}
                  className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold transition"
                >
                  Submit answer
                </button>
              ) : (
                <div className="space-y-2 mt-2">
                  <p className="text-xs text-emerald-400">
                    Correct answer:{" "}
                    <span className="font-semibold">
                      {q.options[q.answerIndex]}
                    </span>
                  </p>

                  {q.explanation && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-sky-400 mb-1">
                        Explanation
                      </p>
                      <p className="text-sm leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
