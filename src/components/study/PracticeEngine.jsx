// src/components/study/common/PracticeEngine.jsx

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import CodeBlockGeneral from "../../common/CodeBlockGeneral";

const STORAGE_PREFIX = "quizEngine_";

// ===================== SHARED HELPERS ======================

// Simple shuffle
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Prepare quiz with difficulty + question count
function prepareQuiz(questions, difficulty = "all", questionCount) {
  if (!Array.isArray(questions) || !questions.length) return [];

  let pool = [...questions];

  if (difficulty && difficulty !== "all") {
    const d = difficulty.toLowerCase();
    const filtered = pool.filter(
      (q) => q.level && q.level.toLowerCase() === d
    );
    if (filtered.length) {
      pool = filtered;
    }
  }

  const shuffledQuestions = shuffleArray(pool);
  const sliceSize = questionCount
    ? Math.min(questionCount, shuffledQuestions.length)
    : shuffledQuestions.length;
  const picked = shuffledQuestions.slice(0, sliceSize);

  return picked.map((q) => {
    const wrapped = q.options.map((opt, idx) => ({
      text: opt,
      originalIndex: idx,
    }));

    const shuffled = shuffleArray(wrapped);
    const newAnswerIndex = shuffled.findIndex(
      (item) => item.originalIndex === q.answerIndex
    );

    return {
      ...q,
      options: shuffled.map((i) => i.text),
      answerIndex: newAnswerIndex,
    };
  });
}

// Tiny Web Audio beep (no external files)
function playBeep(type = "click") {
  if (typeof window === "undefined") return;
  const AudioContext =
    window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "correct") osc.frequency.value = 880;
    else if (type === "wrong") osc.frequency.value = 220;
    else osc.frequency.value = 440;

    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + 0.18
    );

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // ignore audio errors
  }
}

// Small helper to format seconds as mm:ss
function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

// ===================================================================
// ⭐  PRACTICE ENGINE COMPONENT  ⭐
// ===================================================================
export default function PracticeEngine({
  title = "Quiz Test",
  questions = [],
  testId = "test_default",
  certificateHeader = "Coder & AccoTax – Premium Computer Training Institute",
  certificateSubtitle = "Barrackpore · www.codernaccotax.co.in",
  certificateTitle = "Certificate of Completion",
  showStudentName = true,
  countdownSeconds = 30 * 60, // 30 minutes default for countdown
}) {
  const STORAGE_KEY = STORAGE_PREFIX + testId;

  const [quiz, setQuiz] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [studentName, setStudentName] = useState("");

  const [difficulty, setDifficulty] = useState("all");
  const [questionCount, setQuestionCount] = useState(() =>
    questions && questions.length ? Math.min(25, questions.length) : 25
  );
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [openExplanation, setOpenExplanation] = useState({});
  const [soundOn, setSoundOn] = useState(false);

  // Code overlay state
  const [expandedCodeQuestionId, setExpandedCodeQuestionId] =
    useState(null);

  // Timer state
  const [timerMode, setTimerMode] = useState("off"); // off | stopwatch | countdown
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] =
    useState(countdownSeconds);
  const timerRef = useRef(null);

  const questionRefs = useRef([]);
  const mainScrollRef = useRef(null);
  const sidebarScrollRef = useRef(null);

  // ------------------- LOAD / INIT -------------------
  useEffect(() => {
    if (!questions || !questions.length) return;

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        const savedDifficulty = parsed.difficulty || "all";
        const savedCount =
          parsed.questionCount || Math.min(25, questions.length);

        setDifficulty(savedDifficulty);
        setQuestionCount(savedCount);

        const restoredQuiz =
          parsed.quiz && parsed.quiz.length
            ? parsed.quiz
            : prepareQuiz(questions, savedDifficulty, savedCount);

        setQuiz(restoredQuiz);
        setResponses(parsed.responses || {});
        setSubmitted(parsed.submitted || {});
        setScore(parsed.score || 0);
        setIsFinished(parsed.isFinished || false);
        setStudentName(parsed.studentName || "");
        setTimerMode(parsed.timerMode || "off");
        setElapsedSeconds(parsed.elapsedSeconds || 0);
        setRemainingSeconds(
          parsed.remainingSeconds != null
            ? parsed.remainingSeconds
            : countdownSeconds
        );
        setSoundOn(parsed.soundOn || false);
        setActiveQuestionIndex(0);
        return;
      } catch {
        // ignore and fall through
      }
    }

    // Fresh quiz
    const initialCount = Math.min(25, questions.length);
    setQuestionCount(initialCount);
    const fresh = prepareQuiz(questions, "all", initialCount);
    setQuiz(fresh);
    setActiveQuestionIndex(0);
    setElapsedSeconds(0);
    setRemainingSeconds(countdownSeconds);
    setTimerMode("off");
  }, [questions, STORAGE_KEY, countdownSeconds]);

  // ------------------- SAVE STATE -------------------
  useEffect(() => {
    if (!quiz.length) return;
    const data = {
      quiz,
      responses,
      submitted,
      score,
      isFinished,
      difficulty,
      questionCount,
      studentName,
      timerMode,
      elapsedSeconds,
      remainingSeconds,
      soundOn,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [
    quiz,
    responses,
    submitted,
    score,
    isFinished,
    difficulty,
    questionCount,
    studentName,
    timerMode,
    elapsedSeconds,
    remainingSeconds,
    soundOn,
    STORAGE_KEY,
  ]);

  // ------------------- SCROLL TO ACTIVE QUESTION -------------------
  const scrollToQuestion = useCallback((index) => {
    const el = questionRefs.current[index];
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  useEffect(() => {
    if (!quiz.length) return;
    scrollToQuestion(activeQuestionIndex);
  }, [activeQuestionIndex, quiz.length, scrollToQuestion]);

  // ------------------- TIMER EFFECT -------------------
  useEffect(() => {
    if (timerMode === "off" || isFinished) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      if (timerMode === "countdown") {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            // Time up → lock the test
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timerMode, isFinished]);

  // ------------------- KEYBOARD NAV (← / →) -------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!quiz.length || isFinished) return;
      if (e.key === "ArrowRight") {
        setActiveQuestionIndex((prev) =>
          prev < quiz.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowLeft") {
        setActiveQuestionIndex((prev) =>
          prev > 0 ? prev - 1 : prev
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [quiz.length, isFinished]);

  // ------------------- HANDLERS -------------------

  const handleSelect = (id, idx, qIndex) => {
    if (submitted[id] || isFinished) return;
    if (soundOn) playBeep("click");
    setResponses((prev) => ({ ...prev, [id]: idx }));
    setActiveQuestionIndex(qIndex);
  };

  const handleSubmit = (q, index) => {
    if (submitted[q.id] || isFinished) return;

    const userAns = responses[q.id];
    if (userAns === q.answerIndex) {
      setScore((s) => s + 1);
      if (soundOn) playBeep("correct");
    } else if (soundOn) {
      playBeep("wrong");
    }

    setSubmitted((prev) => {
      const updated = { ...prev, [q.id]: true };
      if (Object.keys(updated).length === quiz.length) {
        setIsFinished(true);
      }
      return updated;
    });

    if (index + 1 < quiz.length) {
      setActiveQuestionIndex(index + 1);
    }
  };

  const handleRestart = () => {
    const fresh = prepareQuiz(questions, difficulty, questionCount);
    setQuiz(fresh);
    setResponses({});
    setSubmitted({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setActiveQuestionIndex(0);
    setOpenExplanation({});
    setElapsedSeconds(0);
    setRemainingSeconds(countdownSeconds);
    setTimerMode("off");
    // keep name & settings; don't clear them
  };

  const applySettings = () => {
    if (!questions || !questions.length) return;
    const fresh = prepareQuiz(questions, difficulty, questionCount);
    setQuiz(fresh);
    setResponses({});
    setSubmitted({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setActiveQuestionIndex(0);
    setOpenExplanation({});
    setElapsedSeconds(0);
    setRemainingSeconds(countdownSeconds);
    // timer mode unchanged
  };

  // Wrong questions only
  const wrongQuestions = quiz.filter(
    (q) => submitted[q.id] && responses[q.id] !== q.answerIndex
  );

  const visibleQuestions = reviewMode ? wrongQuestions : quiz;

  // Progress stats
  const total = quiz.length;
  const answeredCount = Object.keys(submitted).length;

  let correctCount = 0;
  let wrongCount = 0;
  quiz.forEach((q) => {
    if (submitted[q.id]) {
      if (responses[q.id] === q.answerIndex) correctCount++;
      else wrongCount++;
    }
  });

  const notAttempted = total - correctCount - wrongCount;
  const progressPercent =
    total > 0 ? Math.round((answeredCount / total) * 100) : 0;
  const accuracyPercent =
    answeredCount > 0
      ? Math.round((correctCount / answeredCount) * 100)
      : 0;

  const timerDisplay =
    timerMode === "stopwatch"
      ? formatTime(elapsedSeconds)
      : timerMode === "countdown"
      ? formatTime(remainingSeconds)
      : "--:--";

  // Suggested next difficulty
  let suggestedNext = "Beginner";
  if (accuracyPercent >= 80 && difficulty !== "advanced") {
    suggestedNext = "Advanced";
  } else if (accuracyPercent >= 50) {
    suggestedNext = "Moderate";
  }

  // ===================================================================
  // ⭐ Certificate Generator ⭐
  // ===================================================================
  const generateCertificate = () => {
    if (!quiz.length) return;

    const name = studentName || "Student Name";
    const totalQ = quiz.length;
    const percent = totalQ
      ? ((score / totalQ) * 100).toFixed(2)
      : "0.00";

    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
<title>${certificateTitle}</title>
<meta charset="UTF-8" />
<style>
  body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #0f172a; margin: 0; }
  .page { padding: 40px 16px; display:flex; justify-content:center; }
  .card {
    background: radial-gradient(circle at top, #eff6ff, #e2e8f0 40%, #cbd5f5 80%);
    padding:40px; max-width:900px; width:100%;
    border-radius:24px; box-shadow:0 24px 60px rgba(15,23,42,0.7);
    border: 2px solid #1d4ed8;
  }
  h1 { font-size:2rem; text-align:center; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:#0f172a; }
  .org { text-align:center; font-weight:700; margin-bottom:6px; color:#1d4ed8; font-size:0.95rem; }
  .sub { text-align:center; color:#4b5563; font-size:0.8rem; margin-bottom:24px; }
  .student {
    font-size:1.8rem; font-weight:700; text-align:center; margin-top:20px;
    border-bottom:2px solid #38bdf8; display:inline-block; padding:4px 12px;
    color:#0f172a;
  }
  .body-text { text-align:center; margin-top:12px; font-size:0.98rem; color:#111827; }
  .score-chip {
    margin-top:16px; text-align:center;
    font-size:0.95rem; font-weight:600; color:#1d4ed8;
  }
  .footer { margin-top:40px; display:flex; justify-content:space-between; font-size:0.85rem; color:#374151; }
  .sign-line { border-top:1px solid #111827; width:180px; margin-left:auto; margin-bottom:4px; }
</style>
</head>
<body>
<div class="page">
<div class="card">

<div class="org">${certificateHeader}</div>
<div class="sub">${certificateSubtitle}</div>

<h1>${certificateTitle}</h1>

<div class="body-text">
  This is to certify that<br/>
  <span class="student">${name}</span><br/>
  has successfully completed the test<br/>
  <strong>${title}</strong>
</div>

<div class="score-chip">
  Score: ${score}/${totalQ} (${percent}%)
</div>

<div style="text-align:center;margin-top:10px;font-size:0.85rem;color:#4b5563;">
  Issued on: ${today}
</div>

<div class="footer">
  <div>© Coder & AccoTax</div>
  <div style="text-align:right;">
    <div class="sign-line"></div>
    <div style="font-weight:600;">Sukanta Hui</div>
    <div>Director</div>
  </div>
</div>

</div>
</div>

<script>window.print();</script>
</body>
</html>
    `;

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  };

  // ===================================================================
  // ⭐ RENDER UI ⭐
  // ===================================================================
  if (!quiz.length)
    return <p className="text-slate-300 text-sm">Loading…</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* MAIN CONTENT AREA */}
      <div
        className="flex-1 space-y-6"
        ref={mainScrollRef}
      >
        {/* STICKY TOP RIBBON */}
        <div
          className={`sticky top-16 z-20 mb-1 rounded-2xl border ${
            reviewMode
              ? "border-amber-500/40 bg-amber-950/60"
              : "border-slate-700 bg-slate-950/70"
          } px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 backdrop-blur-md shadow-md shadow-black/40`}
        >
          <div className="space-y-0.5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              {reviewMode ? "Review Mode" : "Active Test"}
            </p>
            <div className="text-xs text-slate-200 flex flex-wrap gap-3">
              <span>
                Question{" "}
                <span className="font-semibold text-sky-400">
                  {activeQuestionIndex + 1}
                </span>{" "}
                of {total}
              </span>
              <span>
                Score:{" "}
                <span className="font-semibold text-emerald-400">
                  {score}
                </span>
              </span>
              <span>
                Difficulty:{" "}
                <span className="font-semibold capitalize text-sky-300">
                  {difficulty}
                </span>
              </span>
            </div>
          </div>

          {/* Timer + sound toggle */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Timer:
                </span>
                <span className="font-mono text-sm text-sky-300">
                  {timerDisplay}
                </span>
              </div>
              <div className="flex gap-1.5">
                {["off", "stopwatch", "countdown"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setTimerMode(m);
                      if (m === "off") {
                        setElapsedSeconds(0);
                        setRemainingSeconds(countdownSeconds);
                      }
                    }}
                    className={`px-2 py-0.5 rounded-full border text-[10px] capitalize ${
                      timerMode === m
                        ? "bg-sky-600 text-white border-sky-400"
                        : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundOn((prev) => !prev)}
              className={`px-3 py-1 rounded-full text-[11px] border ${
                soundOn
                  ? "bg-emerald-600 text-white border-emerald-400"
                  : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
              }`}
            >
              {soundOn ? "🔊 Sound On" : "🔈 Sound Off"}
            </button>
          </div>
        </div>

        {/* HEADER / SETTINGS */}
        <header className="space-y-3 border-b border-slate-800 pb-4">
          <h2 className="text-xl md:text-2xl font-bold text-sky-300">
            {title}
          </h2>

          {/* Difficulty + Question Count Controls */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mt-1">
            {/* Difficulty */}
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Difficulty
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "All" },
                  { key: "beginner", label: "Beginner" },
                  { key: "moderate", label: "Moderate" },
                  { key: "advanced", label: "Advanced" },
                ].map((d) => {
                  const active = difficulty === d.key;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDifficulty(d.key)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        active
                          ? "bg-sky-600 text-white border-sky-400"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Question Count
              </p>
              <div className="flex flex-wrap gap-2">
                {[10, 25, 50, 100, "All"].map((n) => {
                  const value =
                    n === "All"
                      ? questions.length ||
                        quiz.length ||
                        questionCount
                      : n;
                  const active = questionCount === value;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        setQuestionCount(
                          Math.min(
                            value,
                            questions.length || value
                          )
                        )
                      }
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        active
                          ? "bg-emerald-600 text-white border-emerald-400"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      {n === "All" ? "All" : n}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={applySettings}
                className="mt-2 inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Apply &amp; Restart
              </button>
              <p className="text-[10px] text-slate-500 mt-1">
                Applying settings will restart the test with new random
                questions.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 space-y-1">
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-500 via-emerald-400 to-violet-400 h-3 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 flex flex-wrap gap-3">
              <span>
                Progress: {answeredCount}/{total} (
                {progressPercent}%)
              </span>
              <span>
                Accuracy: {accuracyPercent}
                %
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={handleRestart}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs"
            >
              Restart Test
            </button>

            {!reviewMode && wrongQuestions.length > 0 && (
              <button
                onClick={() => setReviewMode(true)}
                className="px-3 py-1 bg-amber-500 text-white rounded-lg text-xs"
              >
                Review Incorrect Only
              </button>
            )}

            {reviewMode && (
              <button
                onClick={() => setReviewMode(false)}
                className="px-3 py-1 bg-slate-700 text-white rounded-lg text-xs"
              >
                Exit Review Mode
              </button>
            )}
          </div>

          {/* Certificate + Name */}
          {isFinished && (
            <div
              className={`mt-3 p-3 rounded-xl border ${
                score / (total || 1) >= 0.6
                  ? "bg-emerald-950/50 border-emerald-500/40"
                  : "bg-slate-900/60 border-slate-700"
              } space-y-2`}
            >
              {showStudentName && (
                <input
                  type="text"
                  placeholder="Enter student name (for certificate)"
                  value={studentName}
                  onChange={(e) =>
                    setStudentName(e.target.value)
                  }
                  className="px-3 py-1.5 w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg text-sm"
                />
              )}

              <button
                onClick={generateCertificate}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold"
              >
                Download Certificate
              </button>
            </div>
          )}
        </header>

        {/* STUDENT REPORT CARD */}
        {isFinished && (
          <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 md:p-5 space-y-3 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-sky-300">
              Performance Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-200">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700">
                <p className="text-[11px] text-slate-400">
                  Total Questions
                </p>
                <p className="text-lg font-semibold text-sky-300">
                  {total}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-emerald-600/40">
                <p className="text-[11px] text-slate-400">
                  Correct
                </p>
                <p className="text-lg font-semibold text-emerald-400">
                  {correctCount}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-rose-600/40">
                <p className="text-[11px] text-slate-400">
                  Wrong
                </p>
                <p className="text-lg font-semibold text-rose-400">
                  {wrongCount}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700">
                <p className="text-[11px] text-slate-400">
                  Not Attempted
                </p>
                <p className="text-lg font-semibold text-slate-200">
                  {notAttempted}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-slate-200">
              <div className="px-3 py-2 rounded-full bg-slate-900/80 border border-sky-500/40">
                Accuracy:{" "}
                <span className="font-semibold text-sky-300">
                  {accuracyPercent}%
                </span>
              </div>
              {timerMode !== "off" && (
                <div className="px-3 py-2 rounded-full bg-slate-900/80 border border-emerald-500/40">
                  Time Taken:{" "}
                  <span className="font-semibold text-emerald-300">
                    {timerMode === "stopwatch"
                      ? formatTime(elapsedSeconds)
                      : formatTime(
                          countdownSeconds - remainingSeconds
                        )}
                  </span>
                </div>
              )}
              <div className="px-3 py-2 rounded-full bg-slate-900/80 border border-amber-500/40">
                Suggested Next Level:{" "}
                <span className="font-semibold text-amber-300">
                  {suggestedNext}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Tip: Focus on the questions you got wrong using{" "}
              <span className="text-amber-300 font-semibold">
                “Review Incorrect Only”
              </span>{" "}
              to strengthen weak areas.
            </p>
          </section>
        )}

        {/* QUESTIONS */}
        <div className="space-y-6">
          {visibleQuestions.map((q) => {
            const index = quiz.findIndex((x) => x.id === q.id);
            const userAnswer = responses[q.id];
            const isSub = submitted[q.id];
            const isActive = index === activeQuestionIndex;
            const isCorrect =
              isSub && userAnswer === q.answerIndex;

            return (
              <article
                key={q.id}
                ref={(el) => (questionRefs.current[index] = el)}
                className={`border border-slate-800 bg-slate-900/70 rounded-2xl p-4 md:p-5 space-y-3 shadow-lg shadow-black/40 transition-transform duration-200 ${
                  isActive
                    ? "ring-1 ring-sky-500/70 scale-[1.01]"
                    : "scale-[1.0]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 min-w-[2rem] items-center justify-center rounded-full bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
                        Q{index + 1}
                      </span>
                      {q.topic && (
                        <span className="inline-flex items-center rounded-full bg-sky-500/10 border border-sky-500/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-sky-200">
                          {q.topic}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-100 text-sm md:text-base">
                      {q.question}
                    </h3>
                  </div>

                  {q.level && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] border bg-slate-800 ${
                        q.level === "beginner"
                          ? "border-emerald-500/60 text-emerald-300"
                          : q.level === "moderate"
                          ? "border-amber-500/60 text-amber-300"
                          : "border-rose-500/60 text-rose-300"
                      }`}
                    >
                      {q.level.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Code Block with overlay controls */}
                {q.code && (
                  <div className="mt-1 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 text-[11px] text-slate-400">
                      <span>Code Snippet</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(
                                q.code
                              );
                            }
                          }}
                          className="px-2 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700"
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedCodeQuestionId(q.id)
                          }
                          className="px-2 py-0.5 rounded-full bg-sky-700 hover:bg-sky-600 text-white border border-sky-500"
                        >
                          Expand
                        </button>
                      </div>
                    </div>
                    <CodeBlockGeneral code={q.code} language="javascript" />
                  </div>
                )}

                {/* Options */}
                <div className="space-y-1 mt-1">
                  {q.options.map((opt, optIndex) => {
                    const inputId = `q${q.id}_${optIndex}`;
                    const selected = userAnswer === optIndex;

                    let style =
                      "border-slate-700 bg-slate-900/60 hover:bg-slate-800";
                    if (isSub) {
                      if (optIndex === q.answerIndex) {
                        style =
                          "border-emerald-500 bg-emerald-900/40 text-emerald-200";
                      } else if (selected) {
                        style =
                          "border-rose-500 bg-rose-900/40 text-rose-200";
                      }
                    } else if (selected) {
                      style =
                        "border-sky-500 bg-sky-900/40 text-sky-50";
                    }

                    return (
                      <label
                        key={inputId}
                        htmlFor={inputId}
                        className={`cursor-pointer px-3 py-2.5 border rounded-xl flex gap-2 text-sm items-center transition ${style}`}
                      >
                        <input
                          id={inputId}
                          type="radio"
                          disabled={isSub || isFinished}
                          checked={selected}
                          onChange={() =>
                            handleSelect(q.id, optIndex, index)
                          }
                          className="h-4 w-4 mt-0.5 accent-sky-500"
                        />
                        <span className="leading-snug">
                          {opt}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Submit / Explanation */}
                {!isSub && !isFinished ? (
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => handleSubmit(q, index)}
                      disabled={responses[q.id] == null}
                      className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-400 text-white rounded-full text-sm"
                    >
                      Submit Answer
                    </button>
                    <p className="text-[11px] text-slate-500">
                      Use ← / → arrow keys or the navigator to
                      move between questions.
                    </p>
                  </div>
                ) : (
                  <>
                    <p
                      className={`text-xs mt-1 ${
                        isCorrect
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {isCorrect ? "Correct!" : "Incorrect."}{" "}
                      Correct Answer:{" "}
                      <span className="font-semibold">
                        {q.options[q.answerIndex]}
                      </span>
                    </p>

                    {q.explanation && (
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenExplanation((prev) => ({
                              ...prev,
                              [q.id]: !prev[q.id],
                            }))
                          }
                          className="px-3 py-1 text-xs rounded-full bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700"
                        >
                          {openExplanation[q.id]
                            ? "Hide Explanation"
                            : "Show Explanation"}
                        </button>

                        {openExplanation[q.id] && (
                          <div className="mt-2 p-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200">
                            <strong className="text-sky-400">
                              Explanation:
                            </strong>{" "}
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </article>
            );
          })}
        </div>

        {/* MOBILE BOTTOM NAV (Prev / Next) */}
        {!isFinished && (
          <div className="fixed bottom-3 left-1/2 -translate-x-1/2 md:hidden z-30">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/90 border border-slate-700 shadow-lg shadow-black/50 text-xs text-slate-200">
              <button
                type="button"
                onClick={() =>
                  setActiveQuestionIndex((prev) =>
                    prev > 0 ? prev - 1 : prev
                  )
                }
                className="px-3 py-1 rounded-full bg-slate-800 border border-slate-600"
              >
                ◀ Prev
              </button>
              <span className="text-[11px] text-slate-400">
                Q{activeQuestionIndex + 1}/{total}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveQuestionIndex((prev) =>
                    prev < total - 1 ? prev + 1 : prev
                  )
                }
                className="px-3 py-1 rounded-full bg-sky-600 border border-sky-500 text-white"
              >
                Next ▶
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR: PROGRESS + QUESTION NAV */}
      <aside className="w-full md:w-64 md:sticky md:top-20 space-y-4">
        {/* Progress Summary + Circular Meter */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-3 text-xs text-slate-200">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Test Overview
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Circular Progress */}
            <svg
              width="52"
              height="52"
              viewBox="0 0 40 40"
              className="shrink-0"
            >
              <defs>
                <linearGradient
                  id="quizProgress"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#1f2937"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="url(#quizProgress)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 16}
                strokeDashoffset={
                  2 *
                  Math.PI *
                  16 *
                  (1 - progressPercent / 100)
                }
                transform="rotate(-90 20 20)"
              />
              <text
                x="50%"
                y="50%"
                dy="1"
                textAnchor="middle"
                fontSize="9"
                fill="#e5e7eb"
              >
                {progressPercent}%
              </text>
            </svg>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span>Total</span>
                <span className="font-semibold">{total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Correct</span>
                <span className="font-semibold text-emerald-400">
                  {correctCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Wrong</span>
                <span className="font-semibold text-rose-400">
                  {wrongCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Not Attempted</span>
                <span className="font-semibold text-slate-400">
                  {notAttempted}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500">
            Legend below shows status of each question. Click a
            number to jump directly.
          </p>
        </div>

        {/* Question Navigation */}
        <div
          className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-2 text-xs max-h-[60vh] overflow-y-auto"
          ref={sidebarScrollRef}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-1">
            Question Navigation
          </p>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
            {quiz.map((q, index) => {
              const userAns = responses[q.id];
              const isSub = submitted[q.id];
              const isCorrect =
                isSub && userAns === q.answerIndex;
              const isActive = index === activeQuestionIndex;

              let classes =
                "text-[11px] h-7 w-7 flex items-center justify-center rounded-full border transition cursor-pointer";

              if (isActive) {
                classes +=
                  " bg-sky-600 text-white border-sky-400";
              } else if (isSub) {
                if (isCorrect) {
                  classes +=
                    " bg-emerald-600 text-white border-emerald-400";
                } else {
                  classes +=
                    " bg-rose-600 text-white border-rose-400";
                }
              } else if (userAns != null) {
                classes +=
                  " bg-amber-500/80 text-white border-amber-400";
              } else {
                classes +=
                  " bg-slate-800 text-slate-300 border-slate-700";
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  className={classes}
                  onClick={() => {
                    setActiveQuestionIndex(index);
                    scrollToQuestion(index);
                  }}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-2 space-y-1 text-[10px] text-slate-400">
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-sky-600 border border-sky-400" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-emerald-600 border border-emerald-400" />
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-rose-600 border border-rose-400" />
              <span>Wrong</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-amber-500 border border-amber-400" />
              <span>Marked (not submitted)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-slate-800 border border-slate-700" />
              <span>Not Attempted</span>
            </div>
          </div>
        </div>
      </aside>

      {/* CODE EXPANSION OVERLAY */}
      {expandedCodeQuestionId != null && (
        <div className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-950 rounded-2xl border border-slate-700 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl shadow-black/70">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
              <h4 className="text-sm font-semibold text-slate-100">
                Code Snippet
              </h4>
              <button
                type="button"
                onClick={() => setExpandedCodeQuestionId(null)}
                className="px-2 py-1 text-[11px] rounded-full bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-auto p-3">
              {(() => {
                const q = quiz.find(
                  (qq) => qq.id === expandedCodeQuestionId
                );
                if (!q || !q.code) return null;
                return (
                  <CodeBlockGeneral code={q.code} language="javascript" />
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
