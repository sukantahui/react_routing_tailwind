import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic6Questions } from "./topic6_files/topic6_questions";

export default function Topic6() {
  // l-value and r-value tester state
  const [lhsInput, setLhsInput] = useState("student_score");
  const [rhsInput, setRhsInput] = useState("95 + 5");

  const auditAssignment = (lhs, rhs) => {
    const cleanLhs = lhs.trim();
    if (!cleanLhs) return { valid: false, error: "LHS cannot be empty" };

    // Literal check
    if (/^\d+$/.test(cleanLhs) || /^["'].*["']$/.test(cleanLhs)) {
      return {
        valid: false,
        error: "SyntaxError: cannot assign to literal",
        details: `LHS '${cleanLhs}' is a constant Literal. Constant values have no mutable locator address in memory.`
      };
    }

    // Arithmetic operator in LHS
    if (/[+\-*/%^]/.test(cleanLhs) && !cleanLhs.startsWith("[") && !cleanLhs.startsWith("{")) {
      return {
        valid: false,
        error: "SyntaxError: cannot assign to expression",
        details: `LHS '${cleanLhs}' is an arithmetic expression producing an r-value, not an assignable memory target.`
      };
    }

    // Function call in LHS
    if (cleanLhs.includes("(") && cleanLhs.includes(")") && !cleanLhs.startsWith("(")) {
      return {
        valid: false,
        error: "SyntaxError: cannot assign to function call",
        details: `LHS '${cleanLhs}' is a function call. Functions return evaluated r-values and cannot act as l-values.`
      };
    }

    // Keyword check
    if (["def", "if", "for", "while", "class", "True", "False", "None", "return"].includes(cleanLhs)) {
      return {
        valid: false,
        error: `SyntaxError: cannot assign to ${cleanLhs}`,
        details: `'${cleanLhs}' is a reserved Python keyword.`
      };
    }

    return {
      valid: true,
      error: "Valid Assignment Statement",
      details: `'${cleanLhs}' is a 100% legal l-value target capable of receiving the evaluated r-value from '${rhs}'.`
    };
  };

  const auditResult = auditAssignment(lhsInput, rhsInput);

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic6Questions.forEach((q) => {
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
              <span>Unit 2: Python Basics & Lexical Tokens</span>
              <span>/</span>
              <span className="text-teal-200">Topic 6</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              The Concept of l-value &amp; r-value in Python Assignment
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Master the exact mechanics of assignment semantics in programming. Learn why left-hand-side l-values represent mutable locator targets,
              why right-hand-side r-values represent evaluated data expressions, and why statements like <code>10 = a</code> or <code>x + 2 = y</code> raise compile-time SyntaxErrors.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE ASSIGNMENT AUDITOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Interactive Diagnostic Studio
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">l-value vs r-value Syntax Diagnostic Lab</h2>
            <p className="text-slate-400 text-sm mt-1">
              Construct an assignment statement by typing an LHS (l-value) and RHS (r-value) to diagnose compiler assignment validity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-teal-300 block mb-1">
                    Left-Hand-Side (l-value Target):
                  </label>
                  <input
                    type="text"
                    value={lhsInput}
                    onChange={(e) => setLhsInput(e.target.value)}
                    className="w-full bg-slate-950 border border-teal-500/50 text-white font-mono text-sm rounded-xl p-3 focus:outline-none focus:border-teal-400"
                    placeholder="e.g. score"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-cyan-300 block mb-1">
                    Right-Hand-Side (r-value Expression):
                  </label>
                  <input
                    type="text"
                    value={rhsInput}
                    onChange={(e) => setRhsInput(e.target.value)}
                    className="w-full bg-slate-950 border border-cyan-500/50 text-white font-mono text-sm rounded-xl p-3 focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. 50 + 45"
                  />
                </div>
              </div>

              {/* Preset Test Chips */}
              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-1.5">Common Board Examination Traps:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { lhs: "10", rhs: "a", label: "10 = a" },
                    { lhs: "x + 2", rhs: "y", label: "x + 2 = y" },
                    { lhs: "len(s)", rhs: "5", label: "len(s) = 5" },
                    { lhs: "marks[0]", rhs: "98", label: "marks[0] = 98" },
                    { lhs: "a, b", rhs: "10, 20", label: "a, b = 10, 20" },
                    { lhs: "def", rhs: "10", label: "def = 10" }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setLhsInput(preset.lhs); setRhsInput(preset.rhs); }}
                      className="px-2.5 py-1 bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-lg text-xs font-mono text-slate-300"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagnostic Outcome Card */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                auditResult.valid
                  ? "bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/50"
                  : "bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-mono">
                <span className={`text-base font-bold ${auditResult.valid ? "text-emerald-400" : "text-rose-400"}`}>
                  {auditResult.valid ? "✔ LEGAL PYTHON ASSIGNMENT" : `✕ ${auditResult.error}`}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 mb-3">
                <code>{lhsInput} = {rhsInput}</code>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">{auditResult.details}</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: COMPREHENSIVE L-VALUE VS R-VALUE GUIDE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Taxonomy
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">l-value vs r-value Structural Comparison</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
            <div className="bg-slate-950 p-6 rounded-2xl border border-teal-500/30 space-y-3">
              <h3 className="text-base font-bold text-teal-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                Valid l-values (Storage Targets)
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Variable Identifiers:</strong> <code>total = 100</code></li>
                <li>• <strong>List Elements:</strong> <code>marks[0] = 95</code></li>
                <li>• <strong>Dictionary Subscripts:</strong> <code>student['age'] = 17</code></li>
                <li>• <strong>Object Attributes:</strong> <code>car.speed = 120</code></li>
                <li>• <strong>Unpacking Tuples/Lists:</strong> <code>x, y = 10, 20</code></li>
              </ul>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-rose-500/30 space-y-3">
              <h3 className="text-base font-bold text-rose-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                Illegal l-values (Raise SyntaxError)
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Constants &amp; Literals:</strong> <code>10 = a</code> (cannot assign to literal)</li>
                <li>• <strong>Arithmetic Expressions:</strong> <code>x + 2 = y</code> (cannot assign to expression)</li>
                <li>• <strong>Function Calls:</strong> <code>len(s) = 5</code> (cannot assign to function call)</li>
                <li>• <strong>Keywords:</strong> <code>def = 10</code> (invalid syntax)</li>
                <li>• <strong>Immutable Tuples:</strong> <code>t[0] = 5</code> (TypeError at runtime)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 4: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 5: PYTHON CODE SIMULATOR & NOTE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Python Simulation Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic6_files/python_lvalue_rvalue_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 6 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic6_files/topic6_note.txt"
            />
          </div>
        </div>

        {/* SECTION 6: FAQ TEMPLATE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <FAQTemplate />
        </div>

        {/* SECTION 7: INTERACTIVE PRACTICE QUIZ (25 MCQs) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Topic 6 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on l-value, r-value, and Assignment Syntax Rules.
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
                  Your Score: {calculateScore()} / {topic6Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic6Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! l-value & r-value Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic6Questions.map((q, idx) => {
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
