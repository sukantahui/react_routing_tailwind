import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic7Questions } from "./topic7_files/topic7_questions";

export default function Topic7() {
  // Algorithm selection in simulator
  const [selectedAlgo, setSelectedAlgo] = useState("sumDigits");

  // Sum of Digits Trace State
  const [inputNum, setInputNum] = useState(4835);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Generate Sum of Digits Steps
  const generateSumSteps = (val) => {
    let num = Math.abs(val);
    let sum = 0;
    const steps = [];
    let stepNum = 0;
    while (num > 0) {
      stepNum++;
      const digit = num % 10;
      const prevSum = sum;
      sum += digit;
      const nextNum = Math.floor(num / 10);
      steps.push({
        step: stepNum,
        num: num,
        cond: `${num} > 0 (True)`,
        digit: digit,
        calc: `${prevSum} + ${digit} = ${sum}`,
        sum: sum,
        nextNum: nextNum
      });
      num = nextNum;
    }
    return steps;
  };

  // Euclid GCD Steps
  const [numA, setNumA] = useState(54);
  const [numB, setNumB] = useState(24);
  const generateGcdSteps = (valA, valB) => {
    let a = Math.abs(valA);
    let b = Math.abs(valB);
    const steps = [];
    let stepNum = 0;
    while (b !== 0) {
      stepNum++;
      const rem = a % b;
      steps.push({
        step: stepNum,
        a: a,
        b: b,
        cond: `b (${b}) != 0 (True)`,
        rem: rem,
        nextA: b,
        nextB: rem
      });
      a = b;
      b = rem;
    }
    return { steps, finalGcd: a };
  };

  const sumSteps = generateSumSteps(inputNum);
  const gcdData = generateGcdSteps(numA, numB);

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
        <div className="bg-gradient-to-r from-teal-900/60 via-slate-900 to-cyan-900/60 p-6 sm:p-8 rounded-3xl border border-teal-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-teal-400">
              <span>CBSE Class 11 CS (083)</span>
              <span>/</span>
              <span>Unit 2: Computational Thinking & Problem Solving</span>
              <span>/</span>
              <span className="text-teal-200">Topic 7</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Tracing Flowcharts & Algorithms: Dry-Run Execution Tables
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Master the art of manual desk-checking and trace table construction. Learn how to simulate CPU instruction execution,
              record variable state mutations step-by-step, uncover off-by-one loop errors, and guarantee algorithm correctness.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE DRY-RUN SIMULATOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Interactive Stepper
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Dynamic Step-by-Step Trace Table Simulator</h2>
            </div>
            <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => { setSelectedAlgo("sumDigits"); setCurrentStepIdx(0); }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedAlgo === "sumDigits"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                1. Sum of Digits
              </button>
              <button
                onClick={() => { setSelectedAlgo("euclidGcd"); setCurrentStepIdx(0); }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedAlgo === "euclidGcd"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                2. Euclid GCD Trace
              </button>
            </div>
          </div>

          {/* SIMULATOR 1: SUM OF DIGITS */}
          {selectedAlgo === "sumDigits" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono text-slate-400">Input Integer N:</label>
                  <input
                    type="number"
                    value={inputNum}
                    onChange={(e) => {
                      setInputNum(Number(e.target.value));
                      setCurrentStepIdx(0);
                    }}
                    className="w-32 bg-slate-900 border border-teal-500/50 text-white text-xs rounded-xl p-2 font-mono text-center focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
                    disabled={currentStepIdx === 0}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-mono rounded-lg"
                  >
                    ◀ Prev Step
                  </button>
                  <span className="text-xs font-mono text-teal-400 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800">
                    Step {currentStepIdx + 1} of {sumSteps.length + 1}
                  </span>
                  <button
                    onClick={() => setCurrentStepIdx((prev) => Math.min(sumSteps.length, prev + 1))}
                    disabled={currentStepIdx >= sumSteps.length}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-xs font-mono font-bold rounded-lg shadow-lg shadow-teal-500/20"
                  >
                    Next Step ▶
                  </button>
                </div>
              </div>

              {/* Dynamic Trace Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-teal-300 uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">Step #</th>
                      <th className="p-3">Variable num</th>
                      <th className="p-3">Condition (num &gt; 0)</th>
                      <th className="p-3">digit (num % 10)</th>
                      <th className="p-3">sum Calculation</th>
                      <th className="p-3">Next num (num // 10)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {sumSteps.slice(0, currentStepIdx + 1).map((row, idx) => (
                      <tr
                        key={row.step}
                        className={`transition-all ${
                          idx === currentStepIdx ? "bg-teal-950/50 border-l-4 border-l-teal-400" : "hover:bg-slate-800/20"
                        }`}
                      >
                        <td className="p-3 font-bold text-teal-400">Step {row.step}</td>
                        <td className="p-3 text-white font-bold">{row.num}</td>
                        <td className="p-3 text-emerald-400">{row.cond}</td>
                        <td className="p-3 text-amber-300 font-bold">{row.digit}</td>
                        <td className="p-3 text-slate-300">{row.calc}</td>
                        <td className="p-3 text-cyan-300">{row.nextNum}</td>
                      </tr>
                    ))}
                    {currentStepIdx >= sumSteps.length && (
                      <tr className="bg-emerald-950/40 font-bold border-t-2 border-emerald-500">
                        <td className="p-3 text-emerald-300">Halt</td>
                        <td className="p-3 text-slate-400">0</td>
                        <td className="p-3 text-rose-400">0 &gt; 0 (False)</td>
                        <td className="p-3 text-slate-500">-</td>
                        <td className="p-3 text-emerald-300 font-bold text-sm">
                          FINAL SUM: {sumSteps.length > 0 ? sumSteps[sumSteps.length - 1].sum : 0}
                        </td>
                        <td className="p-3 text-slate-500">-</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SIMULATOR 2: EUCLID GCD */}
          {selectedAlgo === "euclidGcd" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400">Num A:</label>
                    <input
                      type="number"
                      value={numA}
                      onChange={(e) => setNumA(Number(e.target.value))}
                      className="w-24 bg-slate-900 border border-cyan-500/50 text-white text-xs rounded-xl p-2 font-mono text-center focus:outline-none ml-2"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400">Num B:</label>
                    <input
                      type="number"
                      value={numB}
                      onChange={(e) => setNumB(Number(e.target.value))}
                      className="w-24 bg-slate-900 border border-cyan-500/50 text-white text-xs rounded-xl p-2 font-mono text-center focus:outline-none ml-2"
                    />
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 font-bold px-3 py-1.5 bg-emerald-950/60 rounded-xl border border-emerald-700">
                  Computed GCD(A, B) = {gcdData.finalGcd}
                </div>
              </div>

              {/* GCD Trace Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-cyan-300 uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">Iteration #</th>
                      <th className="p-3">Dividend (a)</th>
                      <th className="p-3">Divisor (b)</th>
                      <th className="p-3">Condition (b != 0)</th>
                      <th className="p-3">Remainder (a % b)</th>
                      <th className="p-3">Next State (a = b, b = rem)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {gcdData.steps.map((row) => (
                      <tr key={row.step} className="hover:bg-slate-800/30">
                        <td className="p-3 font-bold text-cyan-400">Pass {row.step}</td>
                        <td className="p-3 text-white font-bold">{row.a}</td>
                        <td className="p-3 text-amber-300 font-bold">{row.b}</td>
                        <td className="p-3 text-emerald-400">{row.cond}</td>
                        <td className="p-3 text-rose-300 font-bold">{row.rem}</td>
                        <td className="p-3 text-slate-300">a = {row.nextA}, b = {row.nextB}</td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-950/40 font-bold">
                      <td className="p-3 text-emerald-400">Terminal</td>
                      <td className="p-3 text-emerald-300">{gcdData.finalGcd}</td>
                      <td className="p-3 text-slate-400">0</td>
                      <td className="p-3 text-rose-400">0 != 0 (False - Halt)</td>
                      <td className="p-3 text-slate-500">-</td>
                      <td className="p-3 text-emerald-300 font-bold">FINAL GCD = {gcdData.finalGcd}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: DRY RUN SYSTEMATIC METHODOLOGY */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Methodology
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">The 5-Step Desk-Checking Framework</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-teal-400 font-bold">Step 1</span>
              <h3 className="text-sm font-bold text-white">Identify Variables</h3>
              <p className="text-xs text-slate-400">
                List every counter, accumulator, flag, and input parameter in the algorithm.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-teal-400 font-bold">Step 2</span>
              <h3 className="text-sm font-bold text-white">Setup Grid Columns</h3>
              <p className="text-xs text-slate-400">
                Create dedicated columns for Step #, Condition evaluations, variable values, and display output.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-teal-400 font-bold">Step 3</span>
              <h3 className="text-sm font-bold text-white">Select Test Inputs</h3>
              <p className="text-xs text-slate-400">
                Choose representative values including edge cases (e.g., 0, 1, negatives, empty sets).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-teal-400 font-bold">Step 4</span>
              <h3 className="text-sm font-bold text-white">Execute Line-by-Line</h3>
              <p className="text-xs text-slate-400">
                Update only the modified variable in that row strictly following program control flow.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-teal-400 font-bold">Step 5</span>
              <h3 className="text-sm font-bold text-white">Verify Output</h3>
              <p className="text-xs text-slate-400">
                Compare final recorded output against theoretical mathematical expectations.
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
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic7_files/dry_run_trace_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 7 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic7_files/topic7_note.txt"
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
                25 High-Yield CBSE Class 11 Questions on Dry Runs, Trace Tables, State Mutations, and Error Detection.
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
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-cyan-500 transition-all"
              >
                {showResults ? "Update Results" : "Submit Quiz"}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-slate-900 to-cyan-950/80 border border-teal-500/40 flex flex-wrap items-center justify-between gap-4">
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
                  <span className="text-emerald-400 font-bold">Outstanding! Trace Tables Mastered.</span>
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
