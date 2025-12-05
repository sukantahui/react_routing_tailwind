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
function prepareQuiz(questions) {
  return shuffleArray(questions).map((q) => {
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
// ⭐  QUIZ ENGINE COMPONENT  ⭐
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

  const questionRefs = useRef([]);

  // Load previous state OR create new quiz
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuiz(parsed.quiz || prepareQuiz(questions));
        setResponses(parsed.responses || {});
        setSubmitted(parsed.submitted || {});
        setScore(parsed.score || 0);
        setIsFinished(parsed.isFinished || false);
        return;
      } catch {}
    }

    // Fresh quiz
    setQuiz(prepareQuiz(questions));
  }, [questions]);

  // Save state to localStorage
  useEffect(() => {
    if (!quiz.length) return;
    const data = { quiz, responses, submitted, score, isFinished };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [quiz, responses, submitted, score, isFinished]);

  // Auto-scroll helper
  const scrollTo = (index) => {
    const el = questionRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Option selection
  const handleSelect = (id, idx) => {
    if (submitted[id]) return;
    setResponses((prev) => ({ ...prev, [id]: idx }));
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

    if (!reviewMode && index + 1 < quiz.length) {
      setTimeout(() => scrollTo(index + 1), 600);
    }
  };

  // Restart test
  const handleRestart = () => {
    const fresh = prepareQuiz(questions);
    setQuiz(fresh);
    setResponses({});
    setSubmitted({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setStudentName("");
    localStorage.removeItem(STORAGE_KEY);
  };

  // Wrong questions only
  const wrongQuestions = quiz.filter(
    (q) => submitted[q.id] && responses[q.id] !== q.answerIndex
  );

  const visibleQuestions = reviewMode ? wrongQuestions : quiz;

  // ===================================================================
  // ⭐ Certificate Generator ⭐
  // ===================================================================
  const generateCertificate = () => {
    const name = studentName || "Student Name";
    const total = quiz.length;
    const percent = ((score / total) * 100).toFixed(2);

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
  with a score of <strong>${score}/${total}</strong> (${percent}%)
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
    w.document.write(html);
    w.document.close();
  };

  // ===================================================================
  // ⭐ RENDER UI ⭐
  // ===================================================================
  if (!quiz.length) return <p className="text-slate-300">Loading…</p>;

  const progress = Object.keys(submitted).length;
  const total = quiz.length;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <header className="space-y-2 border-b border-slate-800 pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-sky-300">{title}</h2>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
          <div
            className="bg-sky-500 h-3 transition-all"
            style={{ width: `${(progress / total) * 100}%` }}
          />
        </div>

        <div className="text-xs text-slate-400">
          Progress: {progress}/{total} | Score: {score}
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

          return (
            <article
              key={q.id}
              ref={(el) => (questionRefs.current[index] = el)}
              className="border border-slate-800 bg-slate-900/60 rounded-2xl p-4 space-y-3"
            >
              <h3 className="font-semibold text-slate-100 text-sm md:text-base">
                <span className="text-sky-400 mr-2">Q{index + 1}.</span>
                {q.question}
              </h3>

              {q.code && <CodeBlock code={q.code} language="javascript" />}

              <div className="space-y-1">
                {q.options.map((opt, optIndex) => {
                  const inputId = `q${q.id}_${optIndex}`;
                  const selected = userAnswer === optIndex;

                  let style =
                    "border-slate-700 bg-slate-900/60 hover:bg-slate-800";
                  if (isSub) {
                    if (optIndex === q.answerIndex)
                      style = "border-emerald-500 bg-emerald-900/30 text-emerald-300";
                    else if (selected)
                      style = "border-rose-500 bg-rose-900/30 text-rose-300";
                  } else if (selected) {
                    style = "border-sky-500 bg-sky-900/30 text-sky-50";
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
                        onChange={() => handleSelect(q.id, optIndex)}
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
                  <p className="text-xs text-emerald-400">
                    Correct Answer: {q.options[q.answerIndex]}
                  </p>

                  {q.explanation && (
                    <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200">
                      <strong className="text-sky-400">Explanation:</strong>{" "}
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
