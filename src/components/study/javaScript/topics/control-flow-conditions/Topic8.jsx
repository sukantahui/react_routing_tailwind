import React, { useState, useRef, useEffect } from "react";
import questions from "./js-control-flow-test.json";
import CodeBlock from "../../../../../common/CodeBlock";

const STORAGE_KEY = "controlFlowTestState_v1";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Shuffle questions and options, adjust answerIndex
function buildShuffledQuiz(originalQuestions) {
  const shuffledQuestions = shuffleArray(originalQuestions).map((q) => {
    const optionObjects = q.options.map((opt, idx) => ({
      text: opt,
      originalIndex: idx,
    }));

    const shuffledOptions = shuffleArray(optionObjects);
    const newAnswerIndex = shuffledOptions.findIndex(
      (o) => o.originalIndex === q.answerIndex
    );

    return {
      ...q,
      options: shuffledOptions.map((o) => o.text),
      answerIndex: newAnswerIndex,
    };
  });

  return shuffledQuestions;
}

export default function Topic8() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [studentName, setStudentName] = useState("");

  const questionRefs = useRef([]);

  // Load from localStorage OR create new shuffled quiz
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuizQuestions(parsed.quizQuestions || buildShuffledQuiz(questions));
        setResponses(parsed.responses || {});
        setSubmitted(parsed.submitted || {});
        setScore(parsed.score || 0);
        setIsFinished(parsed.isFinished || false);
        setReviewMode(false); // start in normal mode
        return;
      } catch {
        // Fall through to fresh quiz
      }
    }

    const freshQuiz = buildShuffledQuiz(questions);
    setQuizQuestions(freshQuiz);
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (!quizQuestions.length) return;
    const payload = {
      quizQuestions,
      responses,
      submitted,
      score,
      isFinished,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [quizQuestions, responses, submitted, score, isFinished]);

  const scrollToQuestion = (index) => {
    const el = questionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleChange = (id, optionIndex) => {
    if (submitted[id]) return;
    setResponses((prev) => ({ ...prev, [id]: optionIndex }));
  };

  const handleSubmitQuestion = (q, index) => {
    if (submitted[q.id]) return;

    const userAnswer = responses[q.id];
    if (userAnswer === q.answerIndex) {
      setScore((prev) => prev + 1);
    }

    setSubmitted((prev) => {
      const updated = { ...prev, [q.id]: true };

      // Mark test finished if all questions are submitted
      if (Object.keys(updated).length === quizQuestions.length) {
        setIsFinished(true);
      }

      return updated;
    });

    // Auto scroll to next question (only in normal mode)
    if (index + 1 < quizQuestions.length && !reviewMode) {
      setTimeout(() => scrollToQuestion(index + 1), 600);
    }
  };

  const handleRestart = () => {
    const newQuiz = buildShuffledQuiz(questions);
    setQuizQuestions(newQuiz);
    setResponses({});
    setSubmitted({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setStudentName("");
    localStorage.removeItem(STORAGE_KEY);
    setTimeout(() => scrollToQuestion(0), 200);
  };

  const completedCount = Object.keys(submitted).length;
  const totalQuestions = quizQuestions.length;

  const jumpToNextUnanswered = () => {
    for (let i = 0; i < quizQuestions.length; i++) {
      const q = quizQuestions[i];
      if (!submitted[q.id]) {
        scrollToQuestion(i);
        break;
      }
    }
  };

  const wrongQuestions = quizQuestions.filter(
    (q) => submitted[q.id] && responses[q.id] !== q.answerIndex
  );

  const visibleQuestions = reviewMode
    ? wrongQuestions
    : quizQuestions;

  const handleGenerateCertificate = () => {
    if (!studentName.trim()) {
      alert("Please enter student name before generating the certificate.");
      return;
    }

    const percentage =
      totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : "0.00";
    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Certificate of Completion</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f172a;
      color: #0f172a;
    }
    .page {
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      box-sizing: border-box;
    }
    .card {
      max-width: 900px;
      width: 100%;
      background: #f9fafb;
      border-radius: 24px;
      padding: 40px 32px;
      box-shadow: 0 20px 40px rgba(15,23,42,0.3);
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }
    .card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(56,189,248,0.12), rgba(168,85,247,0.12));
      pointer-events: none;
    }
    .inner {
      position: relative;
      z-index: 1;
    }
    .header {
      text-align: center;
      margin-bottom: 24px;
    }
    .org-name {
      font-size: 1.3rem;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .subtitle {
      font-size: 0.9rem;
      color: #6b7280;
      margin-top: 4px;
    }
    .title {
      margin-top: 24px;
      font-size: 2rem;
      font-weight: 800;
      color: #111827;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .line {
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, #38bdf8, #a855f7);
      margin: 12px auto 0;
      border-radius: 999px;
    }
    .body-text {
      margin-top: 32px;
      font-size: 1rem;
      color: #374151;
      line-height: 1.7;
      text-align: center;
      padding: 0 24px;
    }
    .student-name {
      display: inline-block;
      margin-top: 16px;
      font-size: 1.6rem;
      font-weight: 700;
      color: #0f172a;
      border-bottom: 2px solid #38bdf8;
      padding: 4px 16px;
      border-radius: 999px;
      background: rgba(56,189,248,0.08);
    }
    .details {
      margin-top: 20px;
      font-size: 0.98rem;
      color: #4b5563;
    }
    .details span {
      font-weight: 600;
      color: #111827;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 40px;
      font-size: 0.9rem;
      color: #6b7280;
    }
    .signature-block {
      text-align: right;
    }
    .sign-line {
      width: 180px;
      border-bottom: 1px solid #9ca3af;
      margin-bottom: 6px;
      margin-left: auto;
    }
    .sign-name {
      font-weight: 600;
      color: #111827;
    }
    .badge {
      position: absolute;
      top: 24px;
      right: 32px;
      padding: 6px 12px;
      font-size: 0.8rem;
      border-radius: 999px;
      background: #e0f2fe;
      color: #0369a1;
      font-weight: 600;
      border: 1px solid #bae6fd;
    }
    @media print {
      body {
        background: #ffffff;
      }
      .page {
        padding: 0;
      }
      .card {
        box-shadow: none;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="card">
      <div class="badge">Score: ${score}/${totalQuestions} (${percentage}%)</div>
      <div class="inner">
        <div class="header">
          <div class="org-name">Coder &amp; AccoTax – Premium Computer Training Institute, Barrackpore</div>
          <div class="subtitle">Barrackpore · www.codernaccotax.co.in</div>
          <div class="title">Certificate of Completion</div>
          <div class="line"></div>
        </div>

        <div class="body-text">
          This is to certify that
          <br />
          <span class="student-name">${studentName}</span>
          <br />
          has successfully completed the
          <strong>Module Test – Control Flow &amp; Decision Making (JavaScript)</strong>
          with a score of <span>${score}</span> out of <span>${totalQuestions}</span>, 
          demonstrating a strong understanding of conditional logic and decision making in JavaScript.
          <div class="details">
            Date of issue: <span>${dateStr}</span>
          </div>
        </div>

        <div class="footer">
          <div>
            © Coder &amp; AccoTax, Barrackpore<br />
            Premium Coding &amp; Accounts Training Institute
          </div>
          <div class="signature-block">
            <div class="sign-line"></div>
            <div class="sign-name">Sukanta Hui</div>
            <div>Director, Coder &amp; AccoTax</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
    `;

    const win = window.open("", "_blank");
    if (win) {
      win.document.open();
      win.document.write(html);
      win.document.close();
      win.focus();
    }
  };

  if (!quizQuestions.length) {
    return (
      <div className="text-slate-300 text-sm">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <header className="space-y-3 border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-sky-300">
          Module Test – Control Flow &amp; Decision Making
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Submit each question individually. Correct answers and explanations (if provided)
          will appear immediately. Your progress is saved automatically.
        </p>

        {/* PROGRESS BAR */}
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-sky-500 h-3 transition-all"
            style={{ width: `${(completedCount / totalQuestions) * 100}%` }}
          />
        </div>

        <p className="text-xs text-slate-400">
          Progress: {completedCount} / {totalQuestions} | Score: {score}
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={jumpToNextUnanswered}
            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
          >
            Jump to Next Unanswered
          </button>

          <button
            onClick={handleRestart}
            className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs"
          >
            Restart Test (New Shuffle)
          </button>

          {isFinished && wrongQuestions.length > 0 && !reviewMode && (
            <button
              onClick={() => scrollToQuestion(0) || setReviewMode(true)}
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-white text-xs"
            >
              Review Incorrect Answers
            </button>
          )}

          {reviewMode && (
            <button
              onClick={() => setReviewMode(false)}
              className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 text-xs"
            >
              Exit Review Mode
            </button>
          )}
        </div>

        {/* CERTIFICATE PANEL */}
        {isFinished && (
          <div className="mt-3 p-3 border border-slate-700 rounded-xl bg-slate-900/70 space-y-2">
            <p className="text-xs md:text-sm text-slate-200">
              ✅ Test completed! You can now generate a certificate.
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name for certificate"
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-xs md:text-sm text-slate-100 flex-1"
              />
              <button
                onClick={handleGenerateCertificate}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs md:text-sm font-semibold"
              >
                Download Certificate (Print / PDF)
              </button>
            </div>
            {wrongQuestions.length > 0 && (
              <p className="text-[11px] text-slate-400">
                Tip: Use <span className="text-amber-400 font-semibold">Review Incorrect Answers</span> 
                to focus only on questions you got wrong.
              </p>
            )}
          </div>
        )}
      </header>

      {/* QUESTIONS */}
      <div className="space-y-6">
        {visibleQuestions.map((q) => {
          const fullIndex = quizQuestions.findIndex((qq) => qq.id === q.id);
          const userAnswer = responses[q.id];
          const isSubmitted = submitted[q.id];
          const correctAnswer = q.answerIndex;

          return (
            <article
              key={q.id}
              ref={(el) => (questionRefs.current[fullIndex] = el)}
              className="border border-slate-800 bg-slate-900/60 rounded-2xl p-4 md:p-5 space-y-4"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm md:text-base font-semibold text-slate-100">
                  <span className="text-sky-400 mr-2">
                    Q{fullIndex + 1}.
                  </span>
                  {q.question}
                </h3>

                {q.topic && (
                  <span className="text-[10px] md:text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {q.topic}
                  </span>
                )}
              </div>

              {/* Code Block */}
              {q.code && (
                <div className="mt-1">
                  <CodeBlock language="javascript" code={q.code} />
                </div>
              )}

              {/* Options */}
              <div className="space-y-1 mt-1">
                {q.options.map((opt, optIndex) => {
                  const inputId = `q${q.id}-opt${optIndex}`;
                  const selected = userAnswer === optIndex;

                  let optionStyle =
                    "border-slate-700 bg-slate-900/60 hover:bg-slate-800";

                  if (isSubmitted) {
                    if (optIndex === correctAnswer) {
                      optionStyle =
                        "border-emerald-500 bg-emerald-900/30 text-emerald-300";
                    } else if (selected && selected !== correctAnswer) {
                      optionStyle =
                        "border-rose-500 bg-rose-900/30 text-rose-300";
                    }
                  } else if (selected) {
                    optionStyle =
                      "border-sky-500 bg-sky-900/30 text-sky-50";
                  }

                  return (
                    <label
                      key={inputId}
                      htmlFor={inputId}
                      className={`flex items-start gap-2 text-sm md:text-base cursor-pointer rounded-lg px-3 py-2 border transition ${optionStyle}`}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name={`question-${q.id}`}
                        disabled={isSubmitted}
                        checked={selected}
                        onChange={() => handleChange(q.id, optIndex)}
                        className="mt-0.5 accent-sky-500"
                      />
                      <span className="leading-snug">
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Submit / Results */}
              {!isSubmitted ? (
                <button
                  onClick={() => handleSubmitQuestion(q, fullIndex)}
                  disabled={responses[q.id] == null}
                  className="mt-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-400 transition text-white text-sm font-semibold"
                >
                  Submit Answer
                </button>
              ) : (
                <>
                  <p className="text-[12px] text-emerald-400 mt-1">
                    Correct Answer: {q.options[q.answerIndex]}
                  </p>

                  {/* Optional explanation from JSON */}
                  {q.explanation && (
                    <div className="mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm leading-relaxed">
                      <strong className="text-sky-400">Explanation: </strong>
                      {q.explanation}
                    </div>
                  )}
                </>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
