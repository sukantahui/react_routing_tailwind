import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic8Questions } from "./topic8_files/topic8_questions";

export default function Topic8() {
  // Rebinding Stage Index
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      code: "data = 42",
      val: "42",
      type: "<class 'int'>",
      mem: "0x7FFF420A",
      desc: "Variable 'data' is bound to an Integer object in memory."
    },
    {
      code: "data = 98.75",
      val: "98.75",
      type: "<class 'float'>",
      mem: "0x7FFF98BF",
      desc: "Identifier 'data' is rebound to a newly created Float object. Old integer reference count drops."
    },
    {
      code: "data = 'Python 3.12'",
      val: "'Python 3.12'",
      type: "<class 'str'>",
      mem: "0x7FFF312C",
      desc: "Identifier 'data' seamlessly points to an immutable String object."
    },
    {
      code: "data = [10, 20, 30]",
      val: "[10, 20, 30]",
      type: "<class 'list'>",
      mem: "0x7FFF505D",
      desc: "Identifier 'data' is rebound to a mutable List sequence collection."
    }
  ];

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
              <span>Unit 2: Python Basics & Lexical Tokens</span>
              <span>/</span>
              <span className="text-teal-200">Topic 8</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Dynamic Typing: Variable Rebinding &amp; Runtime Type Resolution
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Understand how Python dynamically resolves data types at runtime. Explore how variable identifiers act as flexible reference labels
              capable of pointing to integers, floats, strings, or lists across different lifecycle stages without static type declarations.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE DYNAMIC REBINDING STUDIO */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Interactive Stepper
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Variable Type-Morphing Timeline Studio</h2>
            </div>
            <div className="flex gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 font-mono text-xs">
              {stages.map((stg, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStage(idx)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeStage === idx
                      ? "bg-teal-600 text-white font-bold shadow-lg shadow-teal-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Stage {idx + 1}: {stg.type.split("'")[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider block">
                Executed Statement:
              </span>
              <div className="p-4 bg-slate-900 rounded-xl border border-teal-500/40 text-xl font-mono text-teal-300 font-bold">
                <code>{stages[activeStage].code}</code>
              </div>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {stages[activeStage].desc}
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Current Value:</span>
                <div className="text-lg font-bold text-white truncate">{stages[activeStage].val}</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">type(data):</span>
                <div className="text-sm font-bold text-teal-400 truncate">{stages[activeStage].type}</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Memory Address (id):</span>
                <div className="text-sm font-bold text-indigo-400">{stages[activeStage].mem}</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Runtime Status:</span>
                <div className="text-sm font-bold text-emerald-400">✔ 100% Legal Rebinding</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: STATIC VS DYNAMIC TYPING MATRIX */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Comparative Analysis
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Static Typing vs Dynamic Typing Paradigm</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-teal-300 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Feature Dimension</th>
                  <th className="p-4">Static Typing (C++, Java, Rust)</th>
                  <th className="p-4">Dynamic Typing (Python, Ruby, JS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Type Binding</td>
                  <td className="p-4 text-slate-300">Fixed to the variable container at compile time</td>
                  <td className="p-4 text-teal-300">Bound to the heap object in memory at runtime</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Declaration Syntax</td>
                  <td className="p-4 text-slate-300">Mandatory: <code>int score = 90;</code></td>
                  <td className="p-4 text-teal-300">Implicit: <code>score = 90</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Type Rebinding</td>
                  <td className="p-4 text-rose-400">Illegal (Compile-time error)</td>
                  <td className="p-4 text-emerald-400">100% Legal anytime during execution</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Type Checking</td>
                  <td className="p-4 text-slate-300">Strictly verified during compilation</td>
                  <td className="p-4 text-teal-300">Evaluated on the fly when lines execute</td>
                </tr>
              </tbody>
            </table>
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
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic8_files/python_dynamic_typing_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 8 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic8_files/topic8_note.txt"
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
              <h2 className="text-2xl font-bold text-white mt-2">Topic 8 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on Dynamic Typing, Rebinding & Type Introspection.
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
                  <span className="text-emerald-400 font-bold">Outstanding! Dynamic Typing Mastered.</span>
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
