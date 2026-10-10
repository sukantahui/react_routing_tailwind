import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic1Questions } from "./topic1_files/topic1_questions";

export default function Topic1() {
  // Interactive Lifecycle Stage
  const [activeStage, setActiveStage] = useState("analysis");

  // Electricity Tariff Problem Solving Demo
  const [unitsInput, setUnitsInput] = useState(150);
  const [hasLogicalBug, setHasLogicalBug] = useState(false);

  // Compute Bill Logic
  let energyCharge = 0;
  let fixedCharge = 50.0;
  let totalBill = 0;
  let calculationNote = "";

  if (unitsInput < 0) {
    calculationNote = "🚨 Invalid Input: Units consumed cannot be negative!";
  } else if (hasLogicalBug) {
    // Demonstrating Logical Error: Flat rate applied instead of progressive slabs
    energyCharge = unitsInput * 5.0;
    totalBill = energyCharge + fixedCharge;
    calculationNote = "⚠️ LOGICAL BUG APPLIED: Flat ₹5.00/unit rate charged without progressive tiering!";
  } else {
    if (unitsInput <= 100) {
      energyCharge = unitsInput * 3.5;
      calculationNote = `${unitsInput} units @ ₹3.50/unit`;
    } else if (unitsInput <= 200) {
      energyCharge = 100 * 3.5 + (unitsInput - 100) * 5.0;
      calculationNote = `First 100 units @ ₹3.50 (₹350) + Next ${unitsInput - 100} units @ ₹5.00 (₹${(unitsInput - 100) * 5})`;
    } else {
      energyCharge = 100 * 3.5 + 100 * 5.0 + (unitsInput - 200) * 7.2;
      calculationNote = `First 100 @ ₹3.50 + Next 100 @ ₹5.00 + Balance ${unitsInput - 200} @ ₹7.20`;
    }
    totalBill = energyCharge + fixedCharge;
  }

  // Interactive Bug Diagnostic Simulator
  const [selectedBugType, setSelectedBugType] = useState("syntax");

  const bugExamples = {
    syntax: {
      title: "Syntax Error (Grammar Breach)",
      code: "if units > 100\n    print('High consumption')\n# Missing colon ':' at end of if statement",
      explanation: "Caught by Python compiler/parser BEFORE program execution begins. The script will not even start running.",
      remedy: "Add the required colon ':' after the condition."
    },
    runtime: {
      title: "Runtime Error (Execution Exception)",
      code: "total_cost = 500 / (units - 150)\n# When units = 150 -> ZeroDivisionError: division by zero!",
      explanation: "Program starts executing normally, but crashes abruptly at runtime when an illegal mathematical or memory operation occurs.",
      remedy: "Implement defensive checks (e.g., if units != 150 before dividing)."
    },
    logical: {
      title: "Logical Error (Flawed Semantic Formula)",
      code: "avg = a + b + c / 3\n# Operator precedence evaluates a + b + (c/3) instead of (a + b + c) / 3!",
      explanation: "The program runs completely without crashing, but silently produces mathematically incorrect results. The hardest bug to detect.",
      remedy: "Use parentheses '(a + b + c) / 3' to enforce correct evaluation precedence."
    }
  };

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic1Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-400/30">
            CBSE Class 11 CS (083) • Unit 2: Computational Thinking
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 1: Steps in Problem Solving — Lifecycle & Debugging
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Master the systematic 5-stage software engineering methodology: 
            <strong> Problem Analysis</strong>, <strong>Algorithm Design</strong>, <strong>Coding</strong>, 
            <strong> Testing (Boundary & Nominal Suites)</strong>, and <strong>Debugging (Syntax vs Runtime vs Logical Bugs)</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: The 5 Stages of Problem Solving */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">01</span>
            The 5 Stages of Problem-Solving Methodology
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Converting a real-world human challenge into an executable computer program follows a disciplined, step-by-step lifecycle:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-950/80 border border-blue-500/40 p-4 rounded-xl text-center">
              <div className="text-xs font-bold text-blue-400 uppercase mb-1">Stage 1</div>
              <h3 className="font-bold text-white text-sm mb-1">Problem Analysis</h3>
              <p className="text-slate-400 text-xs">Define objectives, inputs, outputs, and boundary constraints.</p>
            </div>

            <div className="bg-slate-950/80 border border-cyan-500/40 p-4 rounded-xl text-center">
              <div className="text-xs font-bold text-cyan-400 uppercase mb-1">Stage 2</div>
              <h3 className="font-bold text-white text-sm mb-1">Algorithm Design</h3>
              <p className="text-slate-400 text-xs">Formulate step-by-step language-independent blueprints and flowcharts.</p>
            </div>

            <div className="bg-slate-950/80 border border-teal-500/40 p-4 rounded-xl text-center">
              <div className="text-xs font-bold text-teal-400 uppercase mb-1">Stage 3</div>
              <h3 className="font-bold text-white text-sm mb-1">Coding</h3>
              <p className="text-slate-400 text-xs">Translate logic into clean, modular, documented Python 3.12 syntax.</p>
            </div>

            <div className="bg-slate-950/80 border border-purple-500/40 p-4 rounded-xl text-center">
              <div className="text-xs font-bold text-purple-400 uppercase mb-1">Stage 4</div>
              <h3 className="font-bold text-white text-sm mb-1">Testing</h3>
              <p className="text-slate-400 text-xs">Run test cases (nominal, boundary, invalid) to uncover flaws.</p>
            </div>

            <div className="bg-slate-950/80 border border-red-500/40 p-4 rounded-xl text-center">
              <div className="text-xs font-bold text-red-400 uppercase mb-1">Stage 5</div>
              <h3 className="font-bold text-white text-sm mb-1">Debugging</h3>
              <p className="text-slate-400 text-xs">Isolate root causes of bugs and eliminate errors systematically.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Problem Solving Laboratory (Electricity Tariff Problem) */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">02</span>
                Interactive Lifecycle Simulator: Tariff Calculator
              </h2>
              <p className="text-slate-400 text-xs md:text-sm">
                Trace how a practical problem transitions from Analysis &rarr; Algorithm &rarr; Code &rarr; Test &rarr; Debug.
              </p>
            </div>

            {/* Stage Selector */}
            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {["analysis", "algorithm", "code_test", "debugger"].map((st) => (
                <button
                  key={st}
                  onClick={() => setActiveStage(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                    activeStage === st
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {st.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Stage 1: Analysis */}
          {activeStage === "analysis" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-blue-400">1. Problem Analysis & Requirement Specification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-slate-400 font-semibold">Inputs & Constraints:</div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Input: <code>units_consumed</code> (numeric float &ge; 0).</li>
                    <li>Fixed Meter Rent: Fixed charge of ₹50.00 applicable to all bills.</li>
                    <li>Invalid Cases: Negative values must trigger an error message.</li>
                  </ul>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-slate-400 font-semibold">Progressive Tariff Slabs:</div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Slab 1 (0 to 100 units): ₹3.50 per unit</li>
                    <li>Slab 2 (101 to 200 units): ₹5.00 per unit for units above 100</li>
                    <li>Slab 3 (&gt; 200 units): ₹7.20 per unit for units above 200</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Stage 2: Algorithm */}
          {activeStage === "algorithm" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-lg font-bold text-cyan-400">2. Structured Step-by-Step Algorithm</h3>
              <ol className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1.5 list-decimal list-inside">
                <li>Start</li>
                <li>Input <code>units_consumed</code></li>
                <li>If <code>units_consumed &lt; 0</code> then display "Invalid Input" and Stop</li>
                <li>Initialize <code>fixed_charge = 50.0</code>, <code>energy_charge = 0.0</code></li>
                <li>If <code>units_consumed &le; 100</code> then <code>energy_charge = units_consumed * 3.50</code></li>
                <li>Else if <code>units_consumed &le; 200</code> then <code>energy_charge = (100 * 3.50) + ((units_consumed - 100) * 5.00)</code></li>
                <li>Else <code>energy_charge = (100 * 3.50) + (100 * 5.00) + ((units_consumed - 200) * 7.20)</code></li>
                <li>Calculate <code>total_bill = energy_charge + fixed_charge</code></li>
                <li>Output <code>total_bill</code></li>
                <li>Stop</li>
              </ol>
            </div>
          )}

          {/* Stage 3 & 4: Code & Testing */}
          {activeStage === "code_test" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <h3 className="text-lg font-bold text-teal-400">3 & 4. Python Implementation & Live Test Runner</h3>
                <button
                  onClick={() => setHasLogicalBug(!hasLogicalBug)}
                  className={`px-3 py-1 rounded text-xs font-bold transition border ${
                    hasLogicalBug
                      ? "bg-red-950 border-red-500 text-red-300"
                      : "bg-emerald-950 border-emerald-500 text-emerald-300"
                  }`}
                >
                  {hasLogicalBug ? "⚠️ Toggle: Fix Logical Bug" : "🐞 Toggle: Inject Logical Bug"}
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Units Consumed (Test Input):</span>
                  <span className="font-mono font-bold text-teal-300">{unitsInput} Units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="350"
                  step="10"
                  value={unitsInput}
                  onChange={(e) => setUnitsInput(parseInt(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">Energy Consumption Charge</div>
                  <div className="text-xl font-mono font-bold text-teal-400 mt-1">₹{energyCharge.toFixed(2)}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">Fixed Meter Rent</div>
                  <div className="text-xl font-mono font-bold text-slate-300 mt-1">₹{fixedCharge.toFixed(2)}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-teal-500/40">
                  <div className="text-[11px] text-slate-400">Total Electricity Bill</div>
                  <div className="text-2xl font-mono font-black text-emerald-400 mt-1">₹{totalBill.toFixed(2)}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
                <strong>Calculation Trace:</strong> {calculationNote}
              </div>
            </div>
          )}

          {/* Stage 5: Debugger */}
          {activeStage === "debugger" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <h3 className="text-lg font-bold text-red-400">5. Bug Diagnostic Classifier (Syntax vs Runtime vs Logical)</h3>
                <div className="flex gap-2">
                  {["syntax", "runtime", "logical"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBugType(b)}
                      className={`px-3 py-1 rounded text-xs font-bold uppercase transition ${
                        selectedBugType === b
                          ? "bg-red-600 text-white shadow"
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      {b} Bug
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm">{bugExamples[selectedBugType].title}</h4>
                <pre className="bg-slate-950 p-3 rounded text-xs text-amber-300 font-mono overflow-x-auto">
                  {bugExamples[selectedBugType].code}
                </pre>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Diagnostic Explanation:</strong> {bugExamples[selectedBugType].explanation}
                </p>
                <div className="text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded border border-emerald-500/30">
                  <strong>Remedy:</strong> {bugExamples[selectedBugType].remedy}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Testing vs. Debugging Comparison */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">03</span>
            Testing vs. Debugging: Key Examination Distinction
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-200 uppercase font-bold">
                <tr>
                  <th className="p-3.5 border-b border-slate-800">Parameter</th>
                  <th className="p-3.5 border-b border-slate-800 text-purple-400">Testing</th>
                  <th className="p-3.5 border-b border-slate-800 text-red-400">Debugging</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Core Objective</td>
                  <td className="p-3.5">To discover and expose the presence of errors / bugs using test cases.</td>
                  <td className="p-3.5">To locate, isolate, and remove the root cause of an exposed bug.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Execution Stage</td>
                  <td className="p-3.5">Performed continuously during and after code implementation.</td>
                  <td className="p-3.5">Triggered specifically after a test case fails or an error is thrown.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Tools Employed</td>
                  <td className="p-3.5">Automated test runners, boundary data matrices, unit test frameworks.</td>
                  <td className="p-3.5">Interactive IDE debuggers, breakpoints, call-stack tracers, print statements.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Conducted By</td>
                  <td className="p-3.5">Software Testers, QA Engineers, and Developers.</td>
                  <td className="p-3.5">Software Programmers / Developers who understand source code logic.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">04</span>
            Python Companion Simulation: Problem Solving Lifecycle Suite
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the pure Python code implementing all 5 problem solving stages for the domestic tariff calculator.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic1_files/problem_solving_lifecycle.py"
            title="problem_solving_lifecycle.py"
          />
        </section>

        {/* Section 5: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">05</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic1_files/topic1_note.txt"
            title="Topic 1 Revision Notes"
          />
        </section>

        {/* Section 6: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">06</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your mastery of Problem Solving stages, Testing vs Debugging, and Error classifications.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-blue-950/40 border border-blue-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-blue-400 my-1">
                {calculateScore()} / {topic1Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic1Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic1Questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-red-950/20 border-red-500/40"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-semibold text-white text-sm">
                      Q{qIndex + 1}. {q.question}
                    </span>
                    {showResults && (
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition border ${
                            isSelected
                              ? "bg-blue-600/30 border-blue-500 text-white font-medium"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-mono mr-2 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-blue-400">
                        <strong>Explanation (EN):</strong> {q.explanationEn}
                      </div>
                      <div className="text-cyan-300">
                        <strong>ব্যাখ্যা (বাংলা):</strong> {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 7: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">07</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "Why is problem analysis considered the most important step?",
                a: "Writing code without thorough problem analysis often leads to solving the wrong problem, misunderstanding boundary constraints, and requiring expensive architectural rewrites."
              },
              {
                q: "What is the difference between a Runtime Error and a Logical Error?",
                a: "A runtime error causes the program to crash abruptly during execution (e.g., ZeroDivisionError). A logical error allows the program to run completely without crashing, but outputs mathematically incorrect results due to flawed logic."
              },
              {
                q: "What is Boundary Value Testing?",
                a: "Boundary testing evaluates inputs at the extreme limits of acceptable values (e.g., if age >= 18, testing 17, 18, and 19) because relational operators and boundary conditions are where logical bugs most frequently reside."
              }
            ]}
          />
        </section>

        {/* Section 8: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Computer programming is 80% problem solving and 20% writing syntax. For your CBSE Class 11 examination, be ready to list the 5 problem-solving stages in sequence, contrast Testing vs Debugging, and classify errors into Syntax, Runtime, and Logical categories."
        />
      </div>
    </div>
  );
}
