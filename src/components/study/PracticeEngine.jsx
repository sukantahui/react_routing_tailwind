// src/components/study/common/PracticeEngine.jsx

import React, { useState, useEffect, useRef } from "react";
import CodeBlock from "../../common/CodeBlock";

const STORAGE_PREFIX = "quizEngine_";

// Shuffle helper
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Shuffle questions + options and correct answer index
function prepareQuiz(questions, difficulty = "all", questionCount) {
  if (!Array.isArray(questions) || !questions.length) return [];

  let pool = [...questions];

  // Filter by difficulty if selected
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
}) {
  const STORAGE_KEY = STORAGE_PREFIX + testId;

  const [quiz, setQuiz] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [studentName, setStudentName] = useState("");

  const [difficulty, setDifficulty] = useState("all"); // all | beginner | moderate | advanced
  const [questionCount, setQuestionCount] = useState(() =>
    questions && questions.length ? Math.min(25, questions.length) : 25
  );
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [openExplanation, setOpenExplanation] = useState({}); // { [id]: bool }

  const questionRefs = useRef([]);

  // Load previous state OR create new quiz
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
  }, [questions, STORAGE_KEY]);

  // Save state to localStorage
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
    STORAGE_KEY,
  ]);

  // Auto-scroll helper
  const scrollTo = (index) => {
    const el = questionRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Option selection
  const handleSelect = (id, idx, qIndex) => {
    if (submitted[id]) return;
    setResponses((prev) => ({ ...prev, [id]: idx }));
    setActiveQuestionIndex(qIndex);
  };

  // Submit answer
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

    // move active to next question
    if (index + 1 < quiz.length) {
      setActiveQuestionIndex(index + 1);
      if (!reviewMode) {
        setTimeout(() => scrollTo(index + 1), 600);
      }
    }
  };

  // Restart test
  const handleRestart = () => {
    const fresh = prepareQuiz(questions, difficulty, questionCount);
    setQuiz(fresh);
    setResponses({});
    setSubmitted({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setStudentName("");
    setActiveQuestionIndex(0);
    setOpenExplanation({});
    localStorage.removeItem(STORAGE_KEY);
  };

  // Apply difficulty / question-count settings (restarts test)
  const applySettings = () => {
    if (!questions || !questions.length) return;
    const fresh = prepareQuiz(questions, difficulty, questionCount);
    setQuiz(fresh);
    setResponses({});
    setSubmitted({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setStudentName("");
    setActiveQuestionIndex(0);
    setOpenExplanation({});
    localStorage.removeItem(STORAGE_KEY);
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
  const remaining = notAttempted;
  const progressPercent =
    total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  // ===================================================================
  // ⭐ Certificate Generator ⭐
  // ===================================================================
  const generateCertificate = () => {
    if (!quiz.length) return;

    const name = studentName || "Student Name";
    const totalQ = quiz.length;
    const percent = totalQ ? ((score / totalQ) * 100).toFixed(2) : "0.00";

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
  body { font-family: system-ui; background: #f0f2f5; margin: 0; }
  .page { padding: 40px; display:flex; justify-content:center; }
  .card {
    background:white; padding:40px; max-width:900px; width:100%;
    border-radius:20px; box-shadow:0 20px 50px rgba(0,0,0,0.2);
  }
  h1 { font-size:2rem; text-align:center; font-weight:800; }
  .org { text-align:center; font-weight:700; margin-bottom:10px; }
  .student {
    font-size:1.7rem; font-weight:700; text-align:center; margin-top:20px;
    border-bottom:2px solid #38bdf8; display:inline-block; padding:4px 12px;
  }
  .footer { margin-top:40px; display:flex; justify-content:space-between; }
</style>
</head>
<body>
<div class="page">
<div class="card">

<div class="org">${certificateHeader}</div>
<div style="text-align:center;color:#555;margin-bottom:20px;">
  ${certificateSubtitle}
</div>

<h1>${certificateTitle}</h1>

<div style="text-align:center;font-size:1rem;margin-top:20px;">
  This is to certify that<br/>
  <span class="student">${name}</span><br/>
  has completed the test: <strong>${title}</strong><br/>
  with a score of <strong>${score}/${totalQ}</strong> (${percent}%)
</div>

<div style="text-align:center;margin-top:10px;">Issued on: ${today}</div>

<div class="footer">
  <div>© Coder & AccoTax</div>
  <div style="text-align:right;">
    <div style="border-bottom:1px solid #444;width:150px;margin-left:auto;"></div>
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
      <div className="flex-1 space-y-8">
        {/* HEADER */}
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
                      ? questions.length || quiz.length || questionCount
                      : n;
                  const active = questionCount === value;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        setQuestionCount(
                          Math.min(value, questions.length || value)
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
          <div className="mt-2">
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-3 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Progress: {answeredCount}/{total} | Score: {score}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={handleRestart}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs"
            >
              Restart Test
            </button>

            {!reviewMode && wrongQuestions.length > 0 && isFinished && (
              <button
                onClick={() => setReviewMode(true)}
                className="px-3 py-1 bg-amber-500 text-white rounded-lg text-xs"
              >
                Review Incorrect
              </button>
            )}

            {reviewMode && (
              <button
                onClick={() => setReviewMode(false)}
                className="px-3 py-1 bg-slate-700 text-white rounded-lg text-xs"
              >
                Exit Review
              </button>
            )}
          </div>

          {/* Certificate */}
          {isFinished && (
            <div className="mt-3 p-3 bg-slate-900/60 rounded-xl border border-slate-700 space-y-2">
              {showStudentName && (
                <input
                  type="text"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
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
                className={`border border-slate-800 bg-slate-900/60 rounded-2xl p-4 space-y-3 ${
                  isActive ? "ring-1 ring-sky-500/60" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-slate-100 text-sm md:text-base">
                    <span className="text-sky-400 mr-2">
                      Q{index + 1}.
                    </span>
                    {q.question}
                  </h3>

                  {q.level && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] border border-slate-600 text-slate-300 bg-slate-800">
                      {q.level.toUpperCase()}
                    </span>
                  )}
                </div>

                {q.code && (
                  <CodeBlock code={q.code} language="javascript" />
                )}

                <div className="space-y-1">
                  {q.options.map((opt, optIndex) => {
                    const inputId = `q${q.id}_${optIndex}`;
                    const selected = userAnswer === optIndex;

                    let style =
                      "border-slate-700 bg-slate-900/60 hover:bg-slate-800";
                    if (isSub) {
                      if (optIndex === q.answerIndex) {
                        style =
                          "border-emerald-500 bg-emerald-900/30 text-emerald-300";
                      } else if (selected) {
                        style =
                          "border-rose-500 bg-rose-900/30 text-rose-300";
                      }
                    } else if (selected) {
                      style =
                        "border-sky-500 bg-sky-900/30 text-sky-50";
                    }

                    return (
                      <label
                        key={inputId}
                        htmlFor={inputId}
                        className={`cursor-pointer px-3 py-2 border rounded-lg flex gap-2 text-sm ${style}`}
                      >
                        <input
                          id={inputId}
                          type="radio"
                          disabled={isSub}
                          checked={selected}
                          onChange={() =>
                            handleSelect(q.id, optIndex, index)
                          }
                          className="mt-0.5 accent-sky-500"
                        />
                        {opt}
                      </label>
                    );
                  })}
                </div>

                {/* Submit / Explanation */}
                {!isSub ? (
                  <button
                    onClick={() => handleSubmit(q, index)}
                    disabled={responses[q.id] == null}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-400 text-white rounded-lg text-sm"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <>
                    <p
                      className={`text-xs ${
                        isCorrect
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {isCorrect
                        ? "Correct!"
                        : "Incorrect."}{" "}
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
      </div>

      {/* RIGHT SIDEBAR: PROGRESS + QUESTION NAV */}
      <aside className="w-full md:w-64 md:sticky md:top-20 space-y-4">
        {/* Progress Summary */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-2 text-xs text-slate-200">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Test Overview
          </p>
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
          <div className="flex items-center justify-between pt-1 border-t border-slate-800 mt-1">
            <span>Completed</span>
            <span className="font-semibold text-sky-400">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-2 text-xs">
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
                // selected but not submitted
                classes +=
                  " bg-amber-500/80 text-white border-amber-400";
              } else {
                // not attempted
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
                    scrollTo(index);
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
              <span className="h-3 w-3 rounded-full bg-slate-800 border border-slate-700" />
              <span>Not Attempted</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
