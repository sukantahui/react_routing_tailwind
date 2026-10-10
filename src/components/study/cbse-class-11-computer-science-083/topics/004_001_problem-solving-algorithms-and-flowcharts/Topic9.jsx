import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import { topic9Questions } from "./topic9_files/topic9_questions";

export default function Topic9() {
  // Simulator Filter State: 'all', 'answered', 'unanswered', 'correct', 'incorrect'
  const [filterMode, setFilterMode] = useState("all");

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic9Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const totalQuestions = topic9Questions.length;
  const score = calculateScore();
  const percentage = (score / totalQuestions) * 100;

  // Grade calculation based on CBSE scale
  const getGrade = (pct) => {
    if (pct >= 90) return { grade: "A1 (Top 1/8th Band)", color: "text-emerald-400", border: "border-emerald-500" };
    if (pct >= 80) return { grade: "A2 (Distinction)", color: "text-teal-400", border: "border-teal-500" };
    if (pct >= 70) return { grade: "B1 (High Merit)", color: "text-cyan-400", border: "border-cyan-500" };
    if (pct >= 60) return { grade: "B2 (Merit)", color: "text-indigo-400", border: "border-indigo-500" };
    if (pct >= 50) return { grade: "C1 (Average)", color: "text-amber-400", border: "border-amber-500" };
    return { grade: "Needs Revision", color: "text-rose-400", border: "border-rose-500" };
  };

  const gradeInfo = getGrade(percentage);

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Filtered Questions List
  const filteredQuestions = topic9Questions.filter((q) => {
    const isAnswered = selectedAnswers[q.id] !== undefined;
    const isCorrect = selectedAnswers[q.id] === q.correct;
    if (filterMode === "answered") return isAnswered;
    if (filterMode === "unanswered") return !isAnswered;
    if (filterMode === "correct" && showResults) return isCorrect;
    if (filterMode === "incorrect" && showResults) return isAnswered && !isCorrect;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-teal-900/60 via-slate-900 to-indigo-900/60 p-6 sm:p-8 rounded-3xl border border-teal-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-teal-400">
              <span>CBSE Class 11 CS (083)</span>
              <span>/</span>
              <span>Unit 2: Computational Thinking & Problem Solving</span>
              <span>/</span>
              <span className="text-teal-200">Topic 9</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Practice Your Skill: CBSE Board Exam Simulator & Drills
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Test your mastery of Unit 2 with this comprehensive 30-question CBSE Board Exam simulation.
              Review bilingual explanations, subjective drawing drills, and exam marking traps.
            </p>
          </div>
        </div>

        {/* SECTION 2: LIVE SCORECARD & STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Total Questions</span>
            <div className="text-3xl font-black text-white mt-2">{totalQuestions}</div>
            <span className="text-[11px] text-teal-400 mt-1">Full Unit 2 Syllabus</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Questions Attempted</span>
            <div className="text-3xl font-black text-cyan-300 mt-2">
              {Object.keys(selectedAnswers).length} / {totalQuestions}
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {totalQuestions - Object.keys(selectedAnswers).length} Unanswered
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Current Score</span>
            <div className="text-3xl font-black text-teal-400 mt-2">
              {showResults ? score : "--"} <span className="text-sm font-normal text-slate-400">/ {totalQuestions}</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {showResults ? `${percentage.toFixed(1)}% Accuracy` : "Submit quiz to view score"}
            </span>
          </div>

          <div className={`p-5 rounded-2xl bg-slate-900/80 border ${showResults ? gradeInfo.border : "border-slate-800"} flex flex-col justify-between`}>
            <span className="text-xs font-mono text-slate-400 uppercase">CBSE Grade Standing</span>
            <div className={`text-xl font-black mt-2 ${showResults ? gradeInfo.color : "text-slate-500"}`}>
              {showResults ? gradeInfo.grade : "Pending"}
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {showResults ? "Based on CBSE criteria" : "Complete assessment"}
            </span>
          </div>
        </div>

        {/* SECTION 3: SUBJECTIVE EXAM DRILLS */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Subjective Drills
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">High-Yield CBSE Board Long-Answer Problems</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-teal-400">
                <span className="font-bold">Problem 1 (5 Marks)</span>
                <span className="text-slate-500">Algorithm + Flowchart</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">
                Roots of a Quadratic Equation (ax² + bx + c = 0)
              </h3>
              <p className="text-slate-300 font-sans text-xs">
                Write an algorithm and construct a flowchart to compute the discriminant (D = b² - 4ac) and display whether roots are Real & Distinct, Real & Equal, or Complex.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                <strong>Key Logic:</strong> If D &gt; 0 =&gt; 2 Real Roots; If D == 0 =&gt; 1 Equal Root (-b/2a); If D &lt; 0 =&gt; Complex Imaginary Roots.
              </div>
            </div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-cyan-400">
                <span className="font-bold">Problem 2 (5 Marks)</span>
                <span className="text-slate-500">Flowchart + Trace Table</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">
                Armstrong Number Check (e.g. 153 = 1³ + 5³ + 3³)
              </h3>
              <p className="text-slate-300 font-sans text-xs">
                Draw a flowchart and construct a dry-run trace table for N = 153 to verify if the sum of cubes of individual digits equals the original integer.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                <strong>Key Loop:</strong> Extract `d = N % 10`, `sum = sum + (d**3)`, `N = N // 10` while `N &gt; 0`. Compare final sum with original.
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: INTERACTIVE 30-MCQ BOARD SIMULATOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Board Simulator
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">30 Comprehensive Board Exam MCQs</h2>
            </div>
            <div className="flex items-center gap-3">
              {showResults && (
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-mono transition-all"
                >
                  Reset Quiz
                </button>
              )}
              <button
                onClick={() => setShowResults(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-indigo-500 transition-all"
              >
                {showResults ? "Update Results" : "Submit Assessment"}
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: `All (${topic9Questions.length})` },
              { id: "answered", label: `Answered (${Object.keys(selectedAnswers).length})` },
              { id: "unanswered", label: `Unanswered (${topic9Questions.length - Object.keys(selectedAnswers).length})` },
              ...(showResults
                ? [
                    { id: "correct", label: `Correct (${score})` },
                    { id: "incorrect", label: `Incorrect (${Object.keys(selectedAnswers).length - score})` }
                  ]
                : [])
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterMode(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                  filterMode === tab.id
                    ? "bg-teal-600 text-white border-teal-400"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correct;
              const originalIndex = topic9Questions.findIndex((item) => item.id === q.id);

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-rose-950/20 border-rose-500/40"
                      : isAnswered
                      ? "bg-slate-950/80 border-teal-500/30"
                      : "bg-slate-950/40 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-teal-300">
                        {originalIndex + 1}
                      </span>
                      <h4 className="text-base font-semibold text-slate-100">{q.question}</h4>
                    </div>
                    {showResults && (
                      <span
                        className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                          isCorrect
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-rose-950 text-rose-400 border border-rose-800"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisCorrect = q.correct === optIdx;

                      let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white";
                      if (showResults) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                        }
                      } else if (isThisSelected) {
                        btnStyle = "bg-teal-950/80 border-teal-400 text-teal-200 font-semibold shadow-inner";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showResults}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center gap-3 ${btnStyle}`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-mono text-slate-400 font-semibold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-300">
                        <span className="text-teal-400 font-bold font-mono uppercase">Explanation (EN): </span>
                        {q.explanationEn}
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-cyan-300">
                        <span className="text-cyan-400 font-bold font-mono uppercase">ব্যাখ্যা (বাংলা): </span>
                        {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 6: NOTE VIEWER */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Board Examination Tips & Trap Warnings
          </h3>
          <PlainTextPrint
            filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic9_files/topic9_note.txt"
          />
        </div>

        {/* SECTION 7: FAQ TEMPLATE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <FAQTemplate />
        </div>

      </div>
    </div>
  );
}
