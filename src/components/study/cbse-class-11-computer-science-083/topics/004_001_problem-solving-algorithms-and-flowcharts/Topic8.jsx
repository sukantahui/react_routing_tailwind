import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic8Questions } from "./topic8_files/topic8_questions";

export default function Topic8() {
  // Downloadable doc active tab
  const [docCategory, setDocCategory] = useState("cheatsheet");

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic8Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

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
              <span className="text-teal-200">Topic 8</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Downloadable Documents & Revision Master Handbook
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Access curated high-yield revision summaries, printable formula cheat sheets, ANSI flowchart symbol reference cards,
              and master Python test suites covering all topics of Unit 2 Computational Thinking & Problem Solving.
            </p>
          </div>
        </div>

        {/* SECTION 2: DOCUMENT & RESOURCE HUB */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Resource Library
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Board Examination Quick Reference Cards</h2>
            </div>
            <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setDocCategory("cheatsheet")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  docCategory === "cheatsheet"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                1. Symbols & Syntax Cheatsheet
              </button>
              <button
                onClick={() => setDocCategory("pillars")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  docCategory === "pillars"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                2. CT Pillars & Lifecycle
              </button>
            </div>
          </div>

          {/* CARD 1: SYMBOLS & SYNTAX */}
          {docCategory === "cheatsheet" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider">
                  Flowchart Geometric Standards
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-emerald-400 font-bold">Oval / Stadium:</span>
                    <span>Start / Stop (Terminal)</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-sky-400 font-bold">Parallelogram:</span>
                    <span>Input / Output (Read / Print)</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-indigo-400 font-bold">Rectangle:</span>
                    <span>Process (Calculations / Assignments)</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-amber-400 font-bold">Rhombus / Diamond:</span>
                    <span>Decision / Branching (True / False)</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-rose-400 font-bold">Circle:</span>
                    <span>On-Page Connector (Labeled 'A', '1')</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-purple-400 font-bold">Pentagon:</span>
                    <span>Off-Page Connector</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                  Standard Pseudocode Keywords
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-teal-300 font-bold">INPUT / READ / GET:</span>
                    <span>User Data Input</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-teal-300 font-bold">OUTPUT / PRINT:</span>
                    <span>Display Screen Output</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-teal-300 font-bold">SET / ASSIGN:</span>
                    <span>Variable Value Update</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-teal-300 font-bold">IF .. THEN .. ELSE:</span>
                    <span>Conditional Branch</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-teal-300 font-bold">WHILE .. DO:</span>
                    <span>Condition Loop</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-teal-300 font-bold">FOR .. DO:</span>
                    <span>Count-Controlled Loop</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* CARD 2: PILLARS & LIFECYCLE */}
          {docCategory === "pillars" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                  4 Pillars of Computational Thinking
                </h3>
                <div className="space-y-2 text-slate-300">
                  <div><strong className="text-teal-300">1. Decomposition:</strong> Breaking large problems into smaller solvable parts.</div>
                  <div><strong className="text-teal-300">2. Pattern Recognition:</strong> Identifying trends, repetitions, and recurring structures.</div>
                  <div><strong className="text-teal-300">3. Abstraction:</strong> Focusing on relevant elements while ignoring distracting details.</div>
                  <div><strong className="text-teal-300">4. Algorithm Design:</strong> Constructing ordered, step-by-step instructions.</div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  Problem Solving Lifecycle Phases
                </h3>
                <div className="space-y-2 text-slate-300">
                  <div><strong>Phase 1:</strong> Problem Analysis (Inputs, Outputs, Constraints)</div>
                  <div><strong>Phase 2:</strong> Algorithm Development & Flowcharting</div>
                  <div><strong>Phase 3:</strong> Coding in Target Language (Python 3)</div>
                  <div><strong>Phase 4:</strong> Testing & Debugging (Dry run & Unit tests)</div>
                  <div><strong>Phase 5:</strong> Documentation & Maintenance</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 4: PYTHON CODE SIMULATOR & NOTE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Master Python Suite
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic8_files/problem_solving_master_suite.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Unit 2 Master Revision Handbook
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic8_files/topic8_note.txt"
            />
          </div>
        </div>

        {/* SECTION 5: FAQ TEMPLATE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <FAQTemplate />
        </div>

        {/* SECTION 6: INTERACTIVE PRACTICE QUIZ (25 MCQs) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Topic 8 Master Comprehensive Assessment</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 Multi-topic Board Practice Questions covering the entire Problem Solving & Algorithm Lifecycle.
              </p>
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
                {showResults ? "Update Results" : "Submit Quiz"}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-slate-900 to-indigo-950/80 border border-teal-500/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase font-semibold">Assessment Result</span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Your Score: {calculateScore()} / {topic8Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic8Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Full Handbook Mastery.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic8Questions.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correct;

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
                        {idx + 1}
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

      </div>
    </div>
  );
}
