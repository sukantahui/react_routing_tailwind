import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic7Questions } from "./topic7_files/topic7_questions";

export default function Topic7() {
  // Swapping simulator state
  const [swapA, setSwapA] = useState(10);
  const [swapB, setSwapB] = useState(25);

  const performSwap = () => {
    const tempA = swapA;
    setSwapA(swapB);
    setSwapB(tempA);
  };

  // Augmented assignment state
  const [baseVal, setBaseVal] = useState(10);
  const [addVal, setAddVal] = useState(5);
  const [multVal, setMultVal] = useState(2);
  const augmentedResult = (baseVal + (addVal * multVal));

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic7Questions.forEach((q) => {
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
              <span className="text-teal-200">Topic 7</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Assignment Semantics: 'lvalue = rvalue' Rules &amp; Variations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Explore the five standard assignment variations in Python. Master simple assignment, chained assignment, simultaneous tuple unpacking,
              elegant variable swapping without temporary storage, augmented in-place operators, and starred unpacking.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE SIMULTANEOUS SWAPPING SANDBOX */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Interactive Sandbox
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Simultaneous Assignment &amp; Swapping Laboratory</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Swapping Controller */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-teal-300 font-mono">1. Python Variable Swap (a, b = b, a)</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Variable a:</label>
                  <input
                    type="number"
                    value={swapA}
                    onChange={(e) => setSwapA(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-teal-500/50 text-white font-mono text-sm rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Variable b:</label>
                  <input
                    type="number"
                    value={swapB}
                    onChange={(e) => setSwapB(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-indigo-500/50 text-white font-mono text-sm rounded-xl p-2.5"
                  />
                </div>
              </div>

              <button
                onClick={performSwap}
                className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-bold font-mono text-xs rounded-xl shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-indigo-500 transition-all"
              >
                Execute `a, b = b, a` (Swap Values)
              </button>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <div>Current State: <code>a = {swapA}</code>, <code>b = {swapB}</code></div>
                <div className="text-[11px] text-teal-400">RHS temporary tuple created: <code>({swapB}, {swapA})</code></div>
              </div>
            </div>

            {/* Augmented Assignment Calculator */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-cyan-300 font-mono">2. Augmented Assignment Precedence</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Base x:</label>
                  <input
                    type="number"
                    value={baseVal}
                    onChange={(e) => setBaseVal(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Add y:</label>
                  <input
                    type="number"
                    value={addVal}
                    onChange={(e) => setAddVal(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Mult z:</label>
                  <input
                    type="number"
                    value={multVal}
                    onChange={(e) => setMultVal(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded-xl p-2"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400">Statement: <code>x += {addVal} * {multVal}</code></div>
                <div className="text-slate-400">Equivalent To: <code>x = x + ({addVal} * {multVal})</code></div>
                <div className="text-emerald-400 font-bold text-sm pt-1 border-t border-slate-800">
                  Evaluated Result: x = {augmentedResult}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE 5 ASSIGNMENT FORMS GUIDE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Taxonomy
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">The 5 Statutory Python Assignment Styles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-mono text-teal-400 font-bold uppercase">1. Simple Assignment</span>
              <p className="text-slate-300">
                Directly binds a single variable identifier to an evaluated value.<br/>
                <code>x = 25</code>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-mono text-sky-400 font-bold uppercase">2. Chained Assignment</span>
              <p className="text-slate-300">
                Binds multiple identifiers to the same single shared object reference in memory.<br/>
                <code>a = b = c = 50</code>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-mono text-indigo-400 font-bold uppercase">3. Simultaneous Unpacking</span>
              <p className="text-slate-300">
                Unpacks tuple elements into individual targets and allows swapping without third variable.<br/>
                <code>x, y = y, x</code>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-mono text-amber-400 font-bold uppercase">4. Augmented Assignment</span>
              <p className="text-slate-300">
                In-place arithmetic calculation and reassignment.<br/>
                <code>total += score</code> (<code>total = total + score</code>)
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 md:col-span-2 lg:col-span-2">
              <span className="font-mono text-purple-400 font-bold uppercase">5. Extended Starred Unpacking (PEP 3132)</span>
              <p className="text-slate-300">
                Collects excess elements into a list using the starred target <code>*rest</code>.<br/>
                <code>first, *middle, last = [10, 20, 30, 40, 50]</code> &rarr; <code>first=10, middle=[20, 30, 40], last=50</code>
              </p>
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
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic7_files/python_assignment_semantics_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 7 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic7_files/topic7_note.txt"
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
              <h2 className="text-2xl font-bold text-white mt-2">Topic 7 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on Python Assignment Semantics & Unpacking Rules.
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
                  Your Score: {calculateScore()} / {topic7Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic7Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Assignment Semantics Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic7Questions.map((q, idx) => {
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
