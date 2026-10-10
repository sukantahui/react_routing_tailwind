import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic2Questions } from "./topic2_files/topic2_questions";

export default function Topic2() {
  // Interactive State for 4 Pillars Sandbox
  const [activePillar, setActivePillar] = useState("decomposition");

  // Abstraction Demo State
  const [hideNoise, setHideNoise] = useState(true);

  // Algorithm Design Demo State (Marks Input)
  const [marksCS, setMarksCS] = useState(94);
  const [marksMaths, setMarksMaths] = useState(88);
  const [marksPhysics, setMarksPhysics] = useState(92);

  const totalMarks = marksCS + marksMaths + marksPhysics;
  const percentage = Number((totalMarks / 3).toFixed(2));
  const hasPassed = marksCS >= 33 && marksMaths >= 33 && marksPhysics >= 33;

  let assignedGrade = "Essential Repeat (E)";
  if (hasPassed) {
    if (percentage >= 91) assignedGrade = "A1";
    else if (percentage >= 81) assignedGrade = "A2";
    else if (percentage >= 71) assignedGrade = "B1";
    else if (percentage >= 61) assignedGrade = "B2";
    else if (percentage >= 51) assignedGrade = "C1";
    else if (percentage >= 41) assignedGrade = "C2";
    else assignedGrade = "D";
  }

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic2Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 border border-teal-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-teal-400/30">
            CBSE Class 11 CS (083) • Unit 2: Computational Thinking
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 2: The 4 Pillars of Computational Thinking
          </h1>
          <p className="text-teal-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Discover the four foundational cognitive pillars championed by Jeannette Wing: 
            <strong> Decomposition</strong> (Breaking down), <strong>Pattern Recognition</strong> (Finding trends), 
            <strong> Abstraction</strong> (Filtering noise), and <strong>Algorithm Design</strong> (Step-by-step recipes).
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Overview of the 4 Pillars */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">01</span>
            What is Computational Thinking & The 4 Pillars?
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            <strong>Computational Thinking (CT)</strong> is a universal analytical problem-solving process that formulates problems and their solutions so that they can be effectively executed by a computer. It is anchored on four essential pillars:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-teal-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">🧩</div>
              <h3 className="font-bold text-teal-400 text-sm uppercase mb-1">1. Decomposition</h3>
              <p className="text-slate-400 text-xs">Breaking complex monolithic challenges into smaller, solvable sub-tasks.</p>
            </div>

            <div className="bg-slate-950/80 border border-cyan-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">🔍</div>
              <h3 className="font-bold text-cyan-400 text-xs uppercase mb-1">2. Pattern Recognition</h3>
              <p className="text-slate-400 text-xs">Identifying similarities and recurring sequences across problems.</p>
            </div>

            <div className="bg-slate-950/80 border border-purple-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">🎯</div>
              <h3 className="font-bold text-purple-400 text-xs uppercase mb-1">3. Abstraction</h3>
              <p className="text-slate-400 text-xs">Filtering out irrelevant noise to focus strictly on essential properties.</p>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">📋</div>
              <h3 className="font-bold text-emerald-400 text-xs uppercase mb-1">4. Algorithm Design</h3>
              <p className="text-slate-400 text-xs">Creating deterministic, step-by-step executable instructional rules.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive 4 Pillars Laboratory (Report Card System) */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">02</span>
                Interactive 4 Pillars Simulator: Report Card Engine
              </h2>
              <p className="text-slate-400 text-xs md:text-sm">
                Explore how the four pillars work together to build an automated Class 11 Student Grading System.
              </p>
            </div>

            {/* Pillar Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {["decomposition", "patterns", "abstraction", "algorithm"].map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePillar(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                    activePillar === p
                      ? "bg-teal-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Pillar 1: Decomposition */}
          {activePillar === "decomposition" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-teal-400">1. Decomposition: Modular Sub-Task Tree</h3>
              <p className="text-xs text-slate-300">
                Instead of tackling "Build a Student Grading System" as one overwhelming code file, we decompose it into 5 decoupled sub-modules:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-center">
                  <div className="text-teal-400 font-bold mb-1">Module 1</div>
                  <div className="text-white font-semibold">Input Validation</div>
                  <div className="text-[10px] text-slate-400 mt-1">Check marks &isin; [0, 100]</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-center">
                  <div className="text-cyan-400 font-bold mb-1">Module 2</div>
                  <div className="text-white font-semibold">Aggregate Math</div>
                  <div className="text-[10px] text-slate-400 mt-1">Calculate Total & %</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-center">
                  <div className="text-purple-400 font-bold mb-1">Module 3</div>
                  <div className="text-white font-semibold">Passing Checker</div>
                  <div className="text-[10px] text-slate-400 mt-1">Check min 33% per subject</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-center">
                  <div className="text-amber-400 font-bold mb-1">Module 4</div>
                  <div className="text-white font-semibold">Grade Classifier</div>
                  <div className="text-[10px] text-slate-400 mt-1">Assign A1 to D letter grade</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-center">
                  <div className="text-emerald-400 font-bold mb-1">Module 5</div>
                  <div className="text-white font-semibold">Report Formatter</div>
                  <div className="text-[10px] text-slate-400 mt-1">Print formatted marksheet</div>
                </div>
              </div>
            </div>
          )}

          {/* Pillar 2: Patterns */}
          {activePillar === "patterns" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-cyan-400">2. Pattern Recognition: Finding Trends & Reusable Logic</h3>
              <p className="text-xs text-slate-300">
                Observing multiple students shows that percentage calculation always follows the exact same formula: <code>Total / (Subjects &times; 100) &times; 100</code>. We don't write new logic for every student; we write one reusable loop!
              </p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div>Student 101: [94, 88, 92] &rarr; Avg = 91.33% (Pattern A1 Grade)</div>
                <div>Student 102: [82, 85, 80] &rarr; Avg = 82.33% (Pattern A2 Grade)</div>
                <div>Student 103: [74, 78, 72] &rarr; Avg = 74.67% (Pattern B1 Grade)</div>
                <div className="pt-2 border-t border-slate-800 text-cyan-400">
                  ⚡ <strong>Recognized Pattern:</strong> Repeated application of uniform grading boundaries across arbitrary numbers of students.
                </div>
              </div>
            </div>
          )}

          {/* Pillar 3: Abstraction */}
          {activePillar === "abstraction" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <h3 className="text-lg font-bold text-purple-400">3. Abstraction: Filtering Out Irrelevant Data Noise</h3>
                <button
                  onClick={() => setHideNoise(!hideNoise)}
                  className={`px-3 py-1 rounded text-xs font-bold transition border ${
                    hideNoise
                      ? "bg-purple-600 text-white border-purple-400"
                      : "bg-slate-900 text-slate-400 border-slate-700"
                  }`}
                >
                  {hideNoise ? "✅ Noise Filtered (Clean Model)" : "⚠️ Show Raw Unfiltered Object (With Noise)"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-emerald-400 font-bold font-sans">Core Abstracted Attributes (Essential):</div>
                  <div>"roll_no": 101</div>
                  <div>"student_name": "Rahul Verma"</div>
                  <div>"marks": [94, 88, 92]</div>
                  <div>"attendance_pct": 95.0%</div>
                </div>

                <div className={`p-4 rounded-lg border transition ${hideNoise ? "bg-slate-950/40 border-slate-800/40 text-slate-600" : "bg-red-950/30 border-red-500/40 text-red-300"}`}>
                  <div className="font-bold font-sans mb-1">Irrelevant Details (Filtered by Abstraction):</div>
                  <div>"favorite_ice_cream": "Chocolate"</div>
                  <div>"shoe_size": 9</div>
                  <div>"bus_route_no": 14</div>
                  <div>"hair_color": "Black"</div>
                  {hideNoise && <div className="text-[11px] text-purple-400 mt-2 font-sans">✨ Filtered out to keep the grading model lightweight and focused.</div>}
                </div>
              </div>
            </div>
          )}

          {/* Pillar 4: Algorithm Design */}
          {activePillar === "algorithm" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400">4. Algorithm Design: Step-by-Step Execution</h3>
              <p className="text-xs text-slate-300">
                Adjust the subject mark sliders below to watch the algorithmic grading recipe execute dynamically:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Computer Science:</span>
                    <span className="font-mono font-bold text-teal-400">{marksCS}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={marksCS}
                    onChange={(e) => setMarksCS(parseInt(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Mathematics:</span>
                    <span className="font-mono font-bold text-cyan-400">{marksMaths}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={marksMaths}
                    onChange={(e) => setMarksMaths(parseInt(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Physics:</span>
                    <span className="font-mono font-bold text-purple-400">{marksPhysics}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={marksPhysics}
                    onChange={(e) => setMarksPhysics(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>

              {/* Output Report */}
              <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400 uppercase">Computed Percentage</div>
                  <div className="text-3xl font-mono font-black text-white">{percentage}%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Total Marks: {totalMarks}/300</div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-xs text-slate-400 uppercase">Assigned CBSE Grade</div>
                  <div className="text-3xl font-black text-emerald-400">{assignedGrade}</div>
                  <div className={`text-xs font-bold mt-1 ${hasPassed ? "text-emerald-400" : "text-red-400"}`}>
                    {hasPassed ? "STATUS: PASSED (Qualifies for Promotion)" : "STATUS: FAILED (Subject < 33)"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Summary Table */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">03</span>
            Summary Comparison: The 4 Pillars of Computational Thinking
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-200 uppercase font-bold">
                <tr>
                  <th className="p-3.5 border-b border-slate-800">Pillar</th>
                  <th className="p-3.5 border-b border-slate-800 text-teal-400">Core Action</th>
                  <th className="p-3.5 border-b border-slate-800 text-cyan-400">Software Benefit</th>
                  <th className="p-3.5 border-b border-slate-800 text-emerald-400">Real-World Analogy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">1. Decomposition</td>
                  <td className="p-3.5">Breaking a large monolithic problem into smaller sub-tasks.</td>
                  <td className="p-3.5">Enables modular coding and parallel team development.</td>
                  <td className="p-3.5">Organizing a wedding by assigning separate committees for food, venue, and music.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">2. Pattern Recognition</td>
                  <td className="p-3.5">Identifying trends, similarities, and shared patterns.</td>
                  <td className="p-3.5">Allows reusing existing tested formulas and algorithms.</td>
                  <td className="p-3.5">Recognizing that volume calculations for cones, cylinders, and spheres all share Pi (π).</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">3. Abstraction</td>
                  <td className="p-3.5">Filtering out irrelevant noise to focus on core essentials.</td>
                  <td className="p-3.5">Reduces complexity and creates clean data models/APIs.</td>
                  <td className="p-3.5">A metro map showing transit station dots while ignoring rivers and building interiors.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">4. Algorithm Design</td>
                  <td className="p-3.5">Formulating ordered, deterministic step-by-step rules.</td>
                  <td className="p-3.5">Provides a repeatable recipe for computer automation.</td>
                  <td className="p-3.5">A cooking recipe with numbered sequential steps and precise ingredient quantities.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">04</span>
            Python Companion Simulation: 4 Pillars Execution Suite
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the pure Python script implementing decomposition, pattern matching, abstraction filtering, and algorithmic grading.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic2_files/computational_thinking_engine.py"
            title="computational_thinking_engine.py"
          />
        </section>

        {/* Section 5: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">05</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic2_files/topic2_note.txt"
            title="Topic 2 Revision Notes"
          />
        </section>

        {/* Section 6: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">06</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your mastery of Decomposition, Pattern Recognition, Abstraction, and Algorithm Design.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-teal-950/40 border border-teal-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-teal-400 my-1">
                {calculateScore()} / {topic2Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic2Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic2Questions.map((q, qIndex) => {
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
                              ? "bg-teal-600/30 border-teal-500 text-white font-medium"
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
                      <div className="text-teal-400">
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
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">07</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What is the single most important objective of Decomposition?",
                a: "Decomposition reduces cognitive overload by breaking complex monolithic problems into smaller, manageable sub-tasks that can be solved and tested independently."
              },
              {
                q: "How does Abstraction differ from Decomposition?",
                a: "Decomposition divides a big task into smaller sub-tasks. Abstraction filters out non-essential, distracting background noise to focus only on the properties relevant to the problem."
              },
              {
                q: "Can Computational Thinking be applied without computers?",
                a: "Yes! Computational thinking is a problem-solving mental model applicable to everyday life (cooking recipes, event management, scientific analysis, medical diagnoses) without writing a single line of software code."
              }
            ]}
          />
        </section>

        {/* Section 8: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Computational thinking is the cognitive foundation of all programming. When answering CBSE Class 11 questions, ensure you can define all 4 pillars with crisp real-world examples (such as Google Maps for Abstraction and School Systems for Decomposition)."
        />
      </div>
    </div>
  );
}
