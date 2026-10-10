import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic3Questions } from "./topic3_files/topic3_questions";

export default function Topic3() {
  // Interactive State for Euclid GCD Simulator
  const [numA, setNumA] = useState(48);
  const [numB, setNumB] = useState(18);

  // Compute GCD trace dynamically
  const gcdTrace = [];
  let a = Math.abs(numA);
  let b = Math.abs(numB);
  let stepCount = 0;

  while (b !== 0) {
    stepCount++;
    const rem = a % b;
    gcdTrace.push({
      step: stepCount,
      a: a,
      b: b,
      remainder: rem,
      nextA: b,
      nextB: rem
    });
    a = b;
    b = rem;
  }
  const finalGCD = a;

  // Infinite Loop / Finiteness Bug Simulator
  const [startVal, setStartVal] = useState(1);
  const [stepSize, setStepSize] = useState(2);
  const [targetVal, setTargetVal] = useState(10);

  // Check if loop hits target
  let currentVal = startVal;
  let iterations = 0;
  let hasInfiniteLoop = false;
  const loopTrace = [startVal];

  while (currentVal !== targetVal && iterations < 15) {
    iterations++;
    currentVal += stepSize;
    loopTrace.push(currentVal);
    if (stepSize > 0 && currentVal > targetVal && (currentVal - targetVal) % stepSize !== 0) {
      hasInfiniteLoop = true;
      break;
    }
  }

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic3Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-400/30">
            CBSE Class 11 CS (083) • Unit 2: Computational Thinking
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 3: Characteristics of a Good Algorithm
          </h1>
          <p className="text-amber-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Master Donald Knuth's 5 fundamental criteria for any valid algorithm: 
            <strong> Finiteness</strong> (Terminates), <strong>Definiteness</strong> (Unambiguous), 
            <strong> Input</strong> (&ge; 0), <strong>Output</strong> (&ge; 1), and <strong>Effectiveness</strong> (Feasible operations).
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Donald Knuth's 5 Criteria */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">01</span>
            Donald Knuth's 5 Essential Characteristics of an Algorithm
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            In <em>The Art of Computer Programming</em>, Professor Donald Knuth established that any valid computational algorithm must strictly fulfill five mandatory properties:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-950/80 border border-amber-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">⏳</div>
              <h3 className="font-bold text-amber-400 text-xs uppercase mb-1">1. Finiteness</h3>
              <p className="text-slate-400 text-xs">Must always terminate after a finite number of steps.</p>
            </div>

            <div className="bg-slate-950/80 border border-orange-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">🎯</div>
              <h3 className="font-bold text-orange-400 text-xs uppercase mb-1">2. Definiteness</h3>
              <p className="text-slate-400 text-xs">Every step must be clear, precise, and completely unambiguous.</p>
            </div>

            <div className="bg-slate-950/80 border border-yellow-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">📥</div>
              <h3 className="font-bold text-yellow-400 text-xs uppercase mb-1">3. Input</h3>
              <p className="text-slate-400 text-xs">Accepts zero (0) or more well-defined external inputs.</p>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">📤</div>
              <h3 className="font-bold text-emerald-400 text-xs uppercase mb-1">4. Output</h3>
              <p className="text-slate-400 text-xs">Must produce at least one (1) or more well-defined outputs.</p>
            </div>

            <div className="bg-slate-950/80 border border-cyan-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">⚙️</div>
              <h3 className="font-bold text-cyan-400 text-xs uppercase mb-1">5. Effectiveness</h3>
              <p className="text-slate-400 text-xs">Operations must be feasible and computable on paper in finite time.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Euclid GCD Algorithm Simulator */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">02</span>
            Interactive Algorithm in Action: Euclid's GCD Method
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mb-6">
            Euclid's Greatest Common Divisor (GCD) algorithm is a timeless example satisfying all 5 Knuth criteria. Adjust the input integers below to watch the step-by-step remainder reduction terminate in finite steps.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800">
            {/* Input Form */}
            <div className="space-y-4 text-xs">
              <span className="font-bold text-amber-400 uppercase tracking-wider block">
                1. Input Quantities (Input Criterion: 2 Positive Integers)
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <label className="text-slate-300 block mb-1">Integer A:</label>
                  <input
                    type="number"
                    value={numA}
                    onChange={(e) => setNumA(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono font-bold"
                  />
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <label className="text-slate-300 block mb-1">Integer B:</label>
                  <input
                    type="number"
                    value={numB}
                    onChange={(e) => setNumB(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/40 text-center">
                <div className="text-xs text-slate-400 uppercase">Computed Output Result (Output Criterion)</div>
                <div className="text-3xl font-mono font-black text-emerald-400 mt-1">
                  GCD({numA}, {numB}) = {finalGCD}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Terminated in {gcdTrace.length} finite steps (Finiteness guaranteed).
                </div>
              </div>
            </div>

            {/* Step-by-Step Trace */}
            <div className="space-y-3 text-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                  2. Definite & Effective Execution Trace
                </span>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 max-h-56 overflow-y-auto space-y-2 font-mono text-[11px]">
                  {gcdTrace.map((row) => (
                    <div key={row.step} className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      <strong className="text-amber-400">Step {row.step}:</strong> Remainder = {row.a} % {row.b} ={" "}
                      <span className="text-cyan-300 font-bold">{row.remainder}</span>. Update A &rarr; {row.nextA}, B &rarr;{" "}
                      {row.nextB}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2.5 bg-amber-950/40 border border-amber-500/30 rounded text-xs text-amber-200">
                💡 <strong>Why Finiteness Holds:</strong> At every step, the remainder strictly decreases (R &lt; B), guaranteeing that remainder 0 must be reached in finite iterations.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Infinite Loop Violation Sandbox */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-300 text-sm">03</span>
            Finiteness Violation Simulator (The Infinite Loop Bug)
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Observe how a seemingly simple loop fails the <strong>Finiteness</strong> criterion when step increments skip the exact target value.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800 text-xs">
            <div className="space-y-3">
              <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-2">
                <div>
                  <label className="text-slate-300 block mb-1">Start Value: {startVal}</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={startVal}
                    onChange={(e) => setStartVal(parseInt(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Step Increment: +{stepSize}</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={stepSize}
                    onChange={(e) => setStepSize(parseInt(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Target Stop Value: {targetVal}</label>
                  <input
                    type="range"
                    min="6"
                    max="15"
                    value={targetVal}
                    onChange={(e) => setTargetVal(parseInt(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="font-bold text-white mb-2">Simulated Loop Sequence:</div>
                <div className="p-2 bg-slate-950 rounded font-mono text-xs text-slate-300 mb-3 break-all">
                  Sequence: [{loopTrace.join(" &rarr; ")} ...]
                </div>

                {hasInfiniteLoop ? (
                  <div className="p-3 bg-red-950/60 border border-red-500 rounded text-red-300 font-bold">
                    🚨 VIOLATION: INFINITE LOOP!
                    <div className="text-[11px] font-normal text-slate-300 mt-1">
                      Start {startVal} with step +{stepSize} jumped past Target {targetVal} without landing on it. The sequence never terminates!
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500 rounded text-emerald-300 font-bold">
                    ✅ FINITENESS SATISFIED
                    <div className="text-[11px] font-normal text-slate-300 mt-1">
                      Sequence successfully landed on Target {targetVal} and terminated cleanly.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Algorithm vs. Program Matrix */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">04</span>
            Algorithm vs. Computer Program (Examination Comparison)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-200 uppercase font-bold">
                <tr>
                  <th className="p-3.5 border-b border-slate-800">Parameter</th>
                  <th className="p-3.5 border-b border-slate-800 text-amber-400">Algorithm (Logical Design)</th>
                  <th className="p-3.5 border-b border-slate-800 text-cyan-400">Program (Concrete Code)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Definition</td>
                  <td className="p-3.5">An abstract, language-independent logical blueprint to solve a problem.</td>
                  <td className="p-3.5">The concrete implementation of an algorithm in a specific language syntax (Python).</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Language Dependency</td>
                  <td className="p-3.5">Language-independent (written in plain English, steps, or pseudocode).</td>
                  <td className="p-3.5">Strictly language-dependent (bound by Python grammar, syntax, and indentation).</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Execution</td>
                  <td className="p-3.5">Executed mentally by humans on paper via dry-run trace tables.</td>
                  <td className="p-3.5">Executed directly by computer hardware via compilers/interpreters.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Primary Focus</td>
                  <td className="p-3.5">Logical correctness, time complexity, and mathematical soundness.</td>
                  <td className="p-3.5">Grammar correctness, memory allocation, formatting, and file I/O.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-300 text-sm">05</span>
            Python Companion Simulation: Knuth Criteria Validator Engine
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the pure Python script implementing Euclid's GCD algorithm and infinite loop finiteness testing.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic3_files/algorithm_properties_engine.py"
            title="algorithm_properties_engine.py"
          />
        </section>

        {/* Section 6: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">06</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic3_files/topic3_note.txt"
            title="Topic 3 Revision Notes"
          />
        </section>

        {/* Section 7: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">07</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your mastery of Donald Knuth's 5 algorithm criteria and complexity fundamentals.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-amber-400 my-1">
                {calculateScore()} / {topic3Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic3Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic3Questions.map((q, qIndex) => {
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
                              ? "bg-amber-600/30 border-amber-500 text-white font-medium"
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
                      <div className="text-amber-400">
                        <strong>Explanation (EN):</strong> {q.explanationEn}
                      </div>
                      <div className="text-orange-300">
                        <strong>ব্যাখ্যা (বাংলা):</strong> {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 8: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-300 text-sm">08</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What are the five mandatory characteristics of an algorithm according to Donald Knuth?",
                a: "Finiteness (must terminate), Definiteness (unambiguous steps), Input (0 or more), Output (at least 1), and Effectiveness (all operations feasible)."
              },
              {
                q: "Can an algorithm have zero inputs?",
                a: "Yes! An algorithm that generates a fixed sequence (e.g., printing the first 10 prime numbers or Pi up to 100 decimal places) requires zero external user inputs."
              },
              {
                q: "Can an algorithm have zero outputs?",
                a: "No. An algorithm must produce at least one output; otherwise, the computation serves no functional purpose."
              }
            ]}
          />
        </section>

        {/* Section 9: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Algorithms are the heart of computer science. When sitting for your Class 11 CBSE examinations, ensure you can define all 5 Knuth criteria with precise counter-examples (such as an infinite loop violating Finiteness or 'Add some salt' violating Definiteness)."
        />
      </div>
    </div>
  );
}
