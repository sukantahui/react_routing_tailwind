import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic5Questions } from "./topic5_files/topic5_questions";

export default function Topic5() {
  // Mode toggle: 'sequential', 'decision', 'iterative'
  const [activeTab, setActiveTab] = useState("sequential");

  // Sequential state: Simple interest
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(8);
  const [timeYears, setTimeYears] = useState(2);

  const simpleInterest = (principal * rate * timeYears) / 100;
  const totalAmount = principal + simpleInterest;

  // Decision state: Largest of 3
  const [valA, setValA] = useState(45);
  const [valB, setValB] = useState(78);
  const [valC, setValC] = useState(32);

  let largestVal = valA;
  let decisionPath = "";
  if (valA >= valB) {
    if (valA >= valC) {
      largestVal = valA;
      decisionPath = "Branch A >= B (True) -> Branch A >= C (True) => A is Largest";
    } else {
      largestVal = valC;
      decisionPath = "Branch A >= B (True) -> Branch A >= C (False) => C is Largest";
    }
  } else {
    if (valB >= valC) {
      largestVal = valB;
      decisionPath = "Branch A >= B (False) -> Branch B >= C (True) => B is Largest";
    } else {
      largestVal = valC;
      decisionPath = "Branch A >= B (False) -> Branch B >= C (False) => C is Largest";
    }
  }

  // Iterative state: Factorial & Sum of N
  const [nLimit, setNLimit] = useState(5);
  const loopIterations = [];
  let factAcc = 1;
  let sumAcc = 0;
  for (let i = 1; i <= Math.min(Math.max(1, nLimit), 10); i++) {
    const prevF = factAcc;
    const prevS = sumAcc;
    factAcc *= i;
    sumAcc += i;
    loopIterations.push({
      step: i,
      prevF,
      factAcc,
      prevS,
      sumAcc,
      cond: `i (${i}) <= N (${nLimit}) -> TRUE`
    });
  }

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic5Questions.forEach((q) => {
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
              <span className="text-teal-200">Topic 5</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Developing Flowcharts: Sequential, Decision & Iterative Structures
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Discover the Böhm-Jacopini control structures that power all modern algorithms. Master the visual architecture
              of linear sequence flow, conditional branching (If-Else, Nested Selection), and iterative repetition loops (While/For Accumulators).
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE CONTROL STRUCTURE SANDBOX */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Interactive Simulator
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">The 3 Fundamental Control Structures Sandbox</h2>
            </div>
            {/* Mode Switcher Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab("sequential")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === "sequential"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                1. Sequential Flow
              </button>
              <button
                onClick={() => setActiveTab("decision")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === "decision"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                2. Decision Branching
              </button>
              <button
                onClick={() => setActiveTab("iterative")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === "iterative"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                3. Iterative Looping
              </button>
            </div>
          </div>

          {/* TAB 1: SEQUENTIAL */}
          {activeTab === "sequential" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-teal-300">Simple Interest Linear Sequence</h3>
                <p className="text-xs text-slate-400">
                  Every step executes once from top to bottom with no jumping or skipped lines.
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Principal (P ₹):</label>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full mt-1 bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-2.5 font-mono focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Rate (R %):</label>
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full mt-1 bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-2.5 font-mono focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Time (T Yrs):</label>
                    <input
                      type="number"
                      value={timeYears}
                      onChange={(e) => setTimeYears(Number(e.target.value))}
                      className="w-full mt-1 bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-2.5 font-mono focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Calculated Simple Interest (SI):</span>
                    <span className="font-mono font-bold text-teal-400">₹{simpleInterest.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Total Payable Amount (P + SI):</span>
                    <span className="font-mono font-bold text-emerald-400">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Visual Sequence Chain */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center space-y-2 font-mono text-xs text-center">
                <div className="px-6 py-2 bg-emerald-700/60 border border-emerald-500 rounded-full font-bold text-white">
                  START
                </div>
                <div className="text-teal-400 font-bold">↓</div>
                <div className="px-6 py-2 bg-sky-800/60 border border-sky-500 transform -skew-x-12 rounded-lg text-white">
                  READ Principal, Rate, Time
                </div>
                <div className="text-teal-400 font-bold">↓</div>
                <div className="px-6 py-2 bg-indigo-800/60 border border-indigo-500 rounded-lg text-white">
                  SI = (P * R * T) / 100
                </div>
                <div className="text-teal-400 font-bold">↓</div>
                <div className="px-6 py-2 bg-indigo-800/60 border border-indigo-500 rounded-lg text-white">
                  Total = P + SI
                </div>
                <div className="text-teal-400 font-bold">↓</div>
                <div className="px-6 py-2 bg-sky-800/60 border border-sky-500 transform -skew-x-12 rounded-lg text-white">
                  DISPLAY SI, Total
                </div>
                <div className="text-teal-400 font-bold">↓</div>
                <div className="px-6 py-2 bg-rose-700/60 border border-rose-500 rounded-full font-bold text-white">
                  STOP
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DECISION MAKING */}
          {activeTab === "decision" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-indigo-300">Nested Decision: Largest of 3 Numbers</h3>
                <p className="text-xs text-slate-400">
                  Execution path diverges based on conditional Boolean evaluation.
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Number A:</label>
                    <input
                      type="number"
                      value={valA}
                      onChange={(e) => setValA(Number(e.target.value))}
                      className="w-full mt-1 bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-2.5 font-mono focus:border-indigo-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Number B:</label>
                    <input
                      type="number"
                      value={valB}
                      onChange={(e) => setValB(Number(e.target.value))}
                      className="w-full mt-1 bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-2.5 font-mono focus:border-indigo-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Number C:</label>
                    <input
                      type="number"
                      value={valC}
                      onChange={(e) => setValC(Number(e.target.value))}
                      className="w-full mt-1 bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-2.5 font-mono focus:border-indigo-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-indigo-400 font-bold uppercase">Dynamic Branch Path Taken:</div>
                  <p className="text-sm font-mono text-slate-200">{decisionPath}</p>
                  <div className="pt-2 border-t border-slate-800/80 flex justify-between text-sm">
                    <span className="text-slate-400">Determined Maximum:</span>
                    <span className="font-mono font-bold text-indigo-300 text-base">{largestVal}</span>
                  </div>
                </div>
              </div>

              {/* Visual Branch Tree */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-center font-bold text-slate-400">Branching Logic Architecture</div>
                <div className="p-3 bg-amber-950/40 border border-amber-600/60 rounded-xl text-center text-amber-200">
                  Decision 1: Is (A &gt;= B) ?
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900 border border-teal-500/40 rounded-xl space-y-1">
                    <span className="text-teal-400 font-bold">TRUE Branch:</span>
                    <div className="p-2 bg-amber-950/30 border border-amber-500/40 rounded text-[11px]">
                      Decision 2: Is (A &gt;= C) ?
                    </div>
                    <div className="text-[10px] text-slate-300">
                      • True =&gt; Output A<br/>• False =&gt; Output C
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 border border-rose-500/40 rounded-xl space-y-1">
                    <span className="text-rose-400 font-bold">FALSE Branch:</span>
                    <div className="p-2 bg-amber-950/30 border border-amber-500/40 rounded text-[11px]">
                      Decision 3: Is (B &gt;= C) ?
                    </div>
                    <div className="text-[10px] text-slate-300">
                      • True =&gt; Output B<br/>• False =&gt; Output C
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ITERATIVE */}
          {activeTab === "iterative" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-purple-300">Loop Counter & Accumulator Trace</h3>
                  <p className="text-xs text-slate-400">
                    Calculates Factorial (N!) and Series Sum (1 + 2 + ... + N) across iterative cycles.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono text-slate-400">Set N (1 to 10):</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={nLimit}
                    onChange={(e) => setNLimit(Math.max(1, Math.min(10, Number(e.target.value))))}
                    className="w-20 bg-slate-950 border border-purple-500/50 text-white text-sm rounded-xl p-2 font-mono text-center focus:outline-none"
                  />
                </div>
              </div>

              {/* Loop Step Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-purple-300 uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">Iteration (i)</th>
                      <th className="p-3">Condition (i &le; N)</th>
                      <th className="p-3">Factorial Calculation (fact = fact * i)</th>
                      <th className="p-3">Sum Calculation (sum = sum + i)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {loopIterations.map((row) => (
                      <tr key={row.step} className="hover:bg-slate-800/30">
                        <td className="p-3 text-purple-400 font-bold">i = {row.step}</td>
                        <td className="p-3 text-emerald-400">{row.cond}</td>
                        <td className="p-3 text-slate-300">{row.prevF} * {row.step} = <strong className="text-white">{row.factAcc}</strong></td>
                        <td className="p-3 text-slate-300">{row.prevS} + {row.step} = <strong className="text-white">{row.sumAcc}</strong></td>
                      </tr>
                    ))}
                    <tr className="bg-purple-950/20 font-bold">
                      <td className="p-3 text-rose-400">i = {nLimit + 1}</td>
                      <td className="p-3 text-rose-400">i ({nLimit + 1}) &le; N ({nLimit}) -&gt; FALSE (Loop Exits)</td>
                      <td className="p-3 text-purple-300">Final Factorial: {factAcc}</td>
                      <td className="p-3 text-purple-300">Final Sum: {sumAcc}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: DETAILED ARCHITECTURAL COMPARISON */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Comparative Analysis
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Comprehensive Comparison of Control Structures</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-teal-900/60 border border-teal-500 flex items-center justify-center font-bold text-teal-300">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Sequence (Sequential)</h3>
              <p className="text-xs text-slate-400">
                Executes linear instructions one after another without branching or repetition.
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs space-y-1.5 text-slate-300">
                <div><strong>In/Out Degree:</strong> 1 in, 1 out per step</div>
                <div><strong>Condition Check:</strong> None</div>
                <div><strong>Example:</strong> Celsius to Fahrenheit, Circle Area</div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-900/60 border border-indigo-500 flex items-center justify-center font-bold text-indigo-300">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Selection (Decision)</h3>
              <p className="text-xs text-slate-400">
                Diverges execution path into alternate routes based on Boolean condition evaluation.
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs space-y-1.5 text-slate-300">
                <div><strong>In/Out Degree:</strong> 1 in, 2 (or 3) out</div>
                <div><strong>Condition Check:</strong> Evaluated once per branch</div>
                <div><strong>Example:</strong> Even/Odd, Leap Year, Grade Assignment</div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-500 flex items-center justify-center font-bold text-purple-300">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Iteration (Looping)</h3>
              <p className="text-xs text-slate-400">
                Repeats a block of instructions while a specific Boolean condition evaluates to True.
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs space-y-1.5 text-slate-300">
                <div><strong>In/Out Degree:</strong> Back-edge to decision diamond</div>
                <div><strong>Condition Check:</strong> Evaluated on every cycle</div>
                <div><strong>Example:</strong> Factorial, Prime Check, Fibonacci Series</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: LOOP MECHANICS & ANATOMY */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Deep Dive
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">The 4 Mandatory Components of Every Loop</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase">1. Initialization</span>
              <p className="text-xs text-slate-300">
                Setting up loop counters and accumulators before entering the loop (e.g., <code>i = 1</code>, <code>sum = 0</code>).
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">2. Condition Test</span>
              <p className="text-xs text-slate-300">
                A decision diamond that evaluates whether the loop body should execute again or exit (e.g., <code>i &le; N</code>).
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase">3. Loop Body</span>
              <p className="text-xs text-slate-300">
                The core calculations or actions performed on each iteration cycle (e.g., <code>sum = sum + i</code>).
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. Updation / Step</span>
              <p className="text-xs text-slate-300">
                Incrementing or decrementing the counter (e.g., <code>i = i + 1</code>) to guarantee progress toward termination.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 6: PYTHON CODE SIMULATOR & NOTE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Python Simulation Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic5_files/flowchart_control_structures.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 5 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic5_files/topic5_note.txt"
            />
          </div>
        </div>

        {/* SECTION 7: FAQ TEMPLATE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <FAQTemplate />
        </div>

        {/* SECTION 8: INTERACTIVE PRACTICE QUIZ (25 MCQs) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Topic 5 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 Rigorous CBSE Class 11 Questions on Sequential, Decision, and Iterative Control Structures.
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
                  Your Score: {calculateScore()} / {topic5Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic5Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Control Structures Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic5Questions.map((q, idx) => {
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
