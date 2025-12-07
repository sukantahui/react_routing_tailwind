// src/components/study/common/QuizEngine.jsx

import React, { useState, useEffect, useRef } from "react";
import CodeBlockGeneral from "../../common/CodeBlockGeneral";
import { RotateCcw, Eye, EyeOff, Award, Trophy } from "lucide-react";
import logoSrc from "../../assets/cnat.png";

const STORAGE_PREFIX = "quizEngine_";
const LEADERBOARD_PREFIX = "quizLeaderboard_";

// ------- Helpers --------
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Prepare quiz: random sample + shuffle options
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

// Convert image URL (bundled asset) to Base64 data URL
function convertImageToBase64(url) {
  return fetch(url)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        })
    )
    .catch(() => "");
}

// Sequential certificate number generator
function getNextCertificateNumber() {
  const key = "certificate_counter";
  let current = parseInt(localStorage.getItem(key), 10);

  if (isNaN(current) || current < 1) current = 1;

  const year = new Date().getFullYear();
  const padded = String(current).padStart(5, "0");
  const certNumber = `CAT-${year}-${padded}`;

  localStorage.setItem(key, current + 1);

  return certNumber;
}

// ===================================================================
// ⭐  QUIZ ENGINE COMPONENT  ⭐
// ===================================================================
export default function QuizEngine({
  title = "Quiz Test",
  questions = [],
  testId = "test_default",
  questionLimit = 25, // default
  certificateHeader = "Coder & AccoTax",
  certificateSubtitle = "www.codernaccotax.co.in",
  certificateTitle = "Certificate of Completion",
  leaderboardTitle = "Coder & AccoTax Leaderboard",
  showStudentName = true,
  passPercent = 60, // pass threshold for certificate
  // Optional callback for backend (result object)
  onResultSubmit,
}) {
  const STORAGE_KEY = STORAGE_PREFIX + testId;
  const LEADERBOARD_KEY = LEADERBOARD_PREFIX + testId;
  const BEST_KEY = STORAGE_PREFIX + "best_" + testId;

  const [quiz, setQuiz] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [studentName, setStudentName] = useState("");

  const [leaderboard, setLeaderboard] = useState([]);
  const [bestScores, setBestScores] = useState({}); // per question-count
  const [selectedCount, setSelectedCount] = useState(() =>
    questionLimit ? questionLimit : 25
  );

  const [logoBase64, setLogoBase64] = useState("");

  const questionRefs = useRef([]);
  const prevFinishedRef = useRef(false);

  // --------------------------------------------------
  // Load logo as Base64 for seal
  // --------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    convertImageToBase64(logoSrc).then((data) => {
      if (!cancelled && typeof data === "string") {
        setLogoBase64(data);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // --------------------------------------------------
  // Load leaderboard
  // --------------------------------------------------
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
  }, [LEADERBOARD_KEY]);

  // Load best scores map
  useEffect(() => {
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
  }, [BEST_KEY]);

  // --------------------------------------------------
  // Load previous quiz OR start fresh respecting selectedCount
  // --------------------------------------------------
  useEffect(() => {
    if (!questions || !questions.length) return;

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasSubmitted =
          parsed && parsed.submitted && Object.keys(parsed.submitted).length > 0;

        // If an attempt was previously started, resume it
        if (hasSubmitted && Array.isArray(parsed.quiz)) {
          setQuiz(parsed.quiz);
          setResponses(parsed.responses || {});
          setSubmitted(parsed.submitted || {});
          setScore(parsed.score || 0);
          setIsFinished(!!parsed.isFinished);

          const previousCount =
            (parsed.quiz && parsed.quiz.length) || questionLimit;
          setSelectedCount(previousCount);
          return;
        }
      } catch {
        // ignore & fall through to fresh quiz
      }
    }

    // Otherwise start a fresh quiz using selectedCount
    const limit =
      selectedCount && selectedCount > 0
        ? Math.min(selectedCount, questions.length)
        : Math.min(questionLimit || 25, questions.length);

    const fresh = prepareQuiz(questions, limit);
    setQuiz(fresh);
  }, [questions, selectedCount, STORAGE_KEY, questionLimit]);

  // --------------------------------------------------
  // Save quiz state
  // --------------------------------------------------
  useEffect(() => {
    if (!quiz.length) return;
    const data = { quiz, responses, submitted, score, isFinished };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [quiz, responses, submitted, score, isFinished, STORAGE_KEY]);

  // Auto-scroll helper
  const scrollTo = (index) => {
    const el = questionRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Option selection
  const handleSelect = (id, optIndex) => {
    if (submitted[id]) return;
    setResponses((prev) => ({ ...prev, [id]: optIndex }));
  };

  // Submit a question
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

    // Auto-scroll to next in normal mode
    if (!reviewMode && index + 1 < quiz.length) {
      setTimeout(() => scrollTo(index + 1), 600);
    }
  };

  // Restart test: new random sample + reset state
  const handleRestart = () => {
    const limit =
      selectedCount && selectedCount > 0
        ? Math.min(selectedCount, questions.length || selectedCount)
        : Math.min(questionLimit || 25, questions.length || questionLimit);

    const fresh = prepareQuiz(questions, limit);
    setQuiz(fresh);
    setResponses({});
    setSubmitted({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setStudentName("");
    localStorage.removeItem(STORAGE_KEY);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Wrong questions only
  const wrongQuestions = quiz.filter(
    (q) => submitted[q.id] && responses[q.id] !== q.answerIndex
  );

  const visibleQuestions = reviewMode ? wrongQuestions : quiz;

  // ========================= LEADERBOARD & BEST SCORE =========================
  const addToLeaderboard = () => {
    if (!quiz.length) return;

    const total = quiz.length;
    const percent = total
      ? Number(((score / total) * 100).toFixed(2))
      : 0;

    const entry = {
      name: studentName.trim() || "Guest",
      score,
      total,
      percent,
      date: new Date().toISOString(),
    };

    // Leaderboard
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

    // Best score map per question-count
    setBestScores((prev) => {
      const map = { ...prev };
      const existing = map[total];
      if (!existing || percent > existing.percent) {
        map[total] = {
          score,
          total,
          percent,
          date: entry.date,
        };
      }
      localStorage.setItem(BEST_KEY, JSON.stringify(map));
      return map;
    });

    if (typeof onResultSubmit === "function") {
      onResultSubmit({ ...entry, testId });
    }
  };

  // When test finishes for the first time in this session -> add to leaderboard
  useEffect(() => {
    if (!prevFinishedRef.current && isFinished) {
      addToLeaderboard();
    }
    prevFinishedRef.current = isFinished;
  }, [isFinished, score, quiz.length]);

  // ========================= CERTIFICATE (Premium) =========================
  const generateCertificate = () => {
    const name = studentName || "Student Name";
    const total = quiz.length;
    const percent = total ? ((score / total) * 100).toFixed(2) : "0.00";

    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const certificateNumber = getNextCertificateNumber();

    const percentNum = parseFloat(percent);
    let grade = "D";
    if (percentNum >= 85) grade = "A+";
    else if (percentNum >= 70) grade = "A";
    else if (percentNum >= 60) grade = "B";
    else if (percentNum >= 50) grade = "C";

    const passed = percentNum >= passPercent;

    const sealInnerHTML = logoBase64
      ? `<img src="${logoBase64}" class="seal-img" />`
      : `<div class="seal-text">Verified</div>`;

    const html = `
<!DOCTYPE html>
<html>
<head>
<title>${certificateTitle}</title>
<meta charset="UTF-8" />

<style>
  @page {
    size: A4;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: #0f172a;
    font-family: "Times New Roman", serif;
  }

  .page {
    width: 210mm;
    height: 297mm;
    background: radial-gradient(circle at top, #eff6ff, #e2e8f0 40%, #cbd5f5 80%);
    margin: auto;
    padding: 18mm;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .certificate {
    position: relative;
    width: 100%;
    height: auto;
    padding: 18mm 20mm;
    background: #ffffff;
    border: 8px solid #1e3a8a;
    outline: 5px solid #93c5fd;
    box-shadow: 0 0 18px rgba(15,23,42,0.4);
    text-align: center;
    box-sizing: border-box;
  }

  .cert-number {
    text-align: right;
    font-size: 13px;
    color: #111827;
    margin-bottom: 8px;
  }

  .header-title {
    font-size: 22px;
    font-weight: bold;
    color: #1e3a8a;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .subtitle {
    font-size: 13px;
    color: #4b5563;
    margin-bottom: 20px;
  }

  .main-title {
    font-size: 38px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .tagline {
    font-size: 13px;
    color: #1f2933;
    margin-bottom: 22px;
    text-transform: uppercase;
    letter-spacing: 4px;
  }

  .body-text {
    font-size: 17px;
    color: #111827;
    padding: 0 10mm;
    margin-bottom: 16px;
    line-height: 1.6;
  }

  .student-name {
    font-size: 28px;
    font-weight: bold;
    color: #0f172a;
    border-bottom: 2px solid #38bdf8;
    display: inline-block;
    padding: 4px 22px;
    margin: 12px 0 18px 0;
  }

  .test-title {
    font-size: 17px;
    font-weight: 600;
    color: #1e40af;
  }

  .score-box {
    font-size: 18px;
    font-weight: bold;
    color: #1d4ed8;
    margin: 8px 0 6px 0;
  }

  .result-box {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 18px;
  }

  .result-box span {
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid #1e40af;
  }

  .result-pass {
    background: #dcfce7;
    color: #166534;
    border-color: #16a34a;
  }

  .result-fail {
    background: #fee2e2;
    color: #b91c1c;
    border-color: #ef4444;
  }

  .grade-pill {
    margin-left: 8px;
    background: #e0f2fe;
    color: #1d4ed8;
    border-color: #38bdf8;
  }

  .issue-date {
    font-size: 14px;
    color: #374151;
    margin-bottom: 8px;
  }

 .seal {
  position: absolute;
  bottom: 40mm;   /* moved higher (was 32mm) */
  left: 30mm;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #1e3a8a;
  box-shadow: 0 0 8px rgba(30,64,175,0.6);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 30%, #e0f2fe, #bfdbfe);
  box-sizing: border-box;
}


  .seal-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }

  .seal-text {
    font-size: 10px;
    font-weight: 700;
    color: #111827;
    text-transform: uppercase;
    text-align: center;
    padding: 6px;
    box-sizing: border-box;
  }

  .footer-row {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    padding: 0 10mm;
  }

  .signature-block {
    text-align: center;
  }

  .line {
    width: 170px;
    border-top: 1px solid #111827;
    margin: auto;
    margin-bottom: 5px;
  }

  .director {
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }

  .designation {
    font-size: 12px;
    color: #374151;
  }

  .date-block {
    border-top: 1px solid #111827;
    width: 160px;
    margin: auto;
    margin-bottom: 5px;
  }

  .footer-note {
    margin-top: 18px;
    font-size: 11px;
    color: #6b7280;
  }

  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>

</head>
<body>

<div class="page">
  <div class="certificate">

    <div class="cert-number">
      <strong>Certificate No:</strong> ${certificateNumber}
    </div>

    <div class="header-title">${certificateHeader}</div>
    <div class="subtitle">${certificateSubtitle}</div>

    <div class="main-title">${certificateTitle}</div>
    <div class="tagline">Verified Assessment · Coder & AccoTax</div>

    <div class="body-text">
      This is to certify that
      <br><br>
      <span class="student-name">${name}</span>
      <br><br>
      has successfully completed the test:
      <br>
      <span class="test-title">${title}</span>
    </div>

    <div class="score-box">
      Score: ${score}/${total} &nbsp; | &nbsp; ${percent}%
    </div>

    <div class="result-box">
      <span class="${passed ? "result-pass" : "result-fail"}">
        ${passed ? "PASSED" : "NOT PASSED"}
      </span>
      <span class="grade-pill">
        Grade: ${grade}
      </span>
    </div>

    <div class="issue-date">Issued on: ${today}</div>

    <div class="footer-row">
      <div class="signature-block">
        <div class="date-block"></div>
        <div>Date</div>
      </div>

      <div class="signature-block">
        <div class="line"></div>
        <div class="director">Sukanta Hui</div>
        <div class="designation">Director, Coder & AccoTax</div>
      </div>
    </div>

    <div class="footer-note">
      This is a system-generated certificate and does not require a physical signature.
    </div>

    <div class="seal">
      ${sealInnerHTML}
    </div>

  </div>
</div>

<script>
  window.print();
</script>

</body>
</html>
    `;

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  };

  // ========================= QUESTION COUNT APPLY =========================
  const applyQuestionCount = () => {
    const value =
      selectedCount && selectedCount > 0
        ? Math.min(selectedCount, questions.length || selectedCount)
        : Math.min(questionLimit || 25, questions.length || questionLimit);

    const fresh = prepareQuiz(questions, value);
    setQuiz(fresh);
    setResponses({});
    setSubmitted({});
    setScore(0);
    setIsFinished(false);
    setReviewMode(false);
    setStudentName("");
    localStorage.removeItem(STORAGE_KEY);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ========================= RENDER UI =========================
  if (!quiz.length) {
    return (
      <div className="max-w-5xl mx-auto text-slate-300 text-sm">
        Loading questions…
      </div>
    );
  }

  const progress = Object.keys(submitted).length;
  const total = quiz.length;
  const percentComplete = total
    ? Math.round((progress / total) * 100)
    : 0;
  const scorePercent = total ? ((score / total) * 100).toFixed(1) : "0.0";

  const bestForCurrent =
    bestScores[total] || bestScores[selectedCount] || null;

  return (
    <section className="max-w-5xl mx-auto space-y-8">
      {/* HEADER CARD */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900 to-slate-950 px-4 py-5 md:px-6 md:py-6 shadow-xl shadow-slate-950/40">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-24 -left-16 h-40 w-40 rounded-full bg-sky-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-10 h-48 w-48 rounded-full bg-violet-500/25 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-1">
                Coder &amp; AccoTax · Module Test
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-sky-200">
                {title}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px]">
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
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-violet-400 transition-all"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-100 border border-slate-700 hover:border-sky-500 hover:text-sky-100 hover:bg-slate-900 transition"
            >
              <RotateCcw size={12} />
              Restart (new {selectedCount} Qs)
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

          {/* Question Count Selector (only before quiz starts) */}
          {progress === 0 && !isFinished && (
            <div className="mt-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-700 space-y-2">
              <p className="text-xs text-slate-300 font-medium">
                Select number of questions:
              </p>

              <div className="flex flex-wrap gap-2">
                {[10, 15, 20, 25, 50, "All"].map((n) => {
                  const value = n === "All" ? questions.length : n;
                  const active = selectedCount === value;

                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        setSelectedCount(
                          Math.min(value, questions.length || value)
                        )
                      }
                      className={`px-3 py-1.5 rounded-full text-[11px] border transition ${
                        active
                          ? "bg-sky-600 text-white border-sky-400"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={applyQuestionCount}
                className="mt-2 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Start with {selectedCount} Question
                {selectedCount !== 1 ? "s" : ""}
              </button>
            </div>
          )}

          {/* Certificate */}
          {isFinished && (
            <div className="mt-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-3 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/15 border border-sky-500/50">
                  <Award size={14} className="text-sky-300" />
                </div>
                <div>
                  <p className="font-medium text-slate-100">
                    Test completed – generate certificate
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Enter the student name to print or save a digital certificate.
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

                <button
                  type="button"
                  onClick={generateCertificate}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-sky-600 px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-sky-500 transition"
                >
                  <Award size={12} />
                  Download certificate
                </button>
              </div>
            </div>
          )}

          {/* Leaderboard */}
          {leaderboard.length > 0 && (
            <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3 space-y-2">
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

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-[11px] text-slate-100">
                  <thead className="bg-slate-900/80 text-slate-400">
                    <tr>
                      <th className="py-1.5 px-2 text-left">#</th>
                      <th className="py-1.5 px-2 text-left">Name</th>
                      <th className="py-1.5 px-2 text-right">Score</th>
                      <th className="py-1.5 px-2 text-right">%</th>
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
                          className="border-t border-slate-800/70 hover:bg-slate-900/60"
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

      {/* QUESTIONS */}
      <div className="space-y-6">
        {visibleQuestions.map((q) => {
          const index = quiz.findIndex((x) => x.id === q.id);
          const userAnswer = responses[q.id];
          const isSub = submitted[q.id];
          const isCorrect = isSub && userAnswer === q.answerIndex;

          return (
            <article
              key={q.id}
              ref={(el) => (questionRefs.current[index] = el)}
              className="border border-slate-800 bg-slate-900/70 rounded-2xl p-4 md:p-5 shadow-lg shadow-black/40 space-y-3"
            >
              {/* Question header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex h-6 min-w-[2rem] items-center justify-center rounded-full bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
                      Q{index + 1}
                    </span>
                    {q.topic && (
                      <span className="inline-flex items-center rounded-full bg-sky-500/10 border border-sky-500/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-sky-200">
                        {q.topic}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-50 text-sm md:text-base leading-snug">
                    {q.question}
                  </h3>
                </div>

                {isSub && (
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold border ${
                      isCorrect
                        ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/60"
                        : "bg-rose-500/15 text-rose-200 border-rose-500/60"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              {/* Code snippet (if any) */}
              {q.code && (
                <div className="mt-1">
                  <CodeBlockGeneral code={q.code} language="javascript" />
                </div>
              )}

              {/* Options */}
              <div className="space-y-1 mt-1">
                {q.options.map((opt, optIndex) => {
                  const inputId = `q${q.id}_${optIndex}`;
                  const selected = userAnswer === optIndex;

                  let style =
                    "border-slate-700 bg-slate-900/70 hover:bg-slate-800/90";
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

              {/* Submit / Explanation */}
              {!isSub ? (
                <button
                  type="button"
                  onClick={() => handleSubmit(q, index)}
                  disabled={responses[q.id] == null}
                  className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-400 text-white text-xs font-semibold transition"
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
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-200">
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
