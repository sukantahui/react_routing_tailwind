import React, { useState } from "react";
import {
  Binary,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

import pyCode1 from "./topic9_files/01_matrix_inverse_and_solve.py?raw";
import pyCode2 from "./topic9_files/02_determinant_and_eigenvalues.py?raw";
import pyCode3 from "./topic9_files/03_lu_and_svd_decomposition.py?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions.js";

export default function Topic9() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Matrix A (2x2) and Vector b
  const [a11, setA11] = useState(3);
  const [a12, setA12] = useState(2);
  const [a21, setA21] = useState(1);
  const [a22, setA22] = useState(4);
  const [b1, setB1] = useState(18);
  const [b2, setB2] = useState(16);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_matrix_inverse_and_solve.py", code: pyCode1 },
    { name: "02_determinant_and_eigenvalues.py", code: pyCode2 },
    { name: "03_lu_and_svd_decomposition.py", code: pyCode3 }
  ];

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  // Matrix math
  const det = a11 * a22 - a12 * a21;
  const isSingular = Math.abs(det) < 0.0001;

  // Inverse: (1/det) * [[a22, -a12], [-a21, a11]]
  const inv11 = !isSingular ? a22 / det : 0;
  const inv12 = !isSingular ? -a12 / det : 0;
  const inv21 = !isSingular ? -a21 / det : 0;
  const inv22 = !isSingular ? a11 / det : 0;

  // Solution x = A_inv * b
  const solX1 = !isSingular ? inv11 * b1 + inv12 * b2 : 0;
  const solX2 = !isSingular ? inv21 * b1 + inv22 * b2 : 0;

  // Trace & Eigenvalues for 2x2: lambda^2 - Tr(A)*lambda + Det(A) = 0
  const trace = a11 + a22;
  const disc = trace * trace - 4 * det;
  const eig1 = disc >= 0 ? (trace + Math.sqrt(disc)) / 2 : null;
  const eig2 = disc >= 0 ? (trace - Math.sqrt(disc)) / 2 : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Binary className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 9</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                scipy.linalg: Basic Linear Algebra
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master hardware-accelerated LAPACK and BLAS matrix operations in Python: matrix inverses (<code className="text-emerald-400 font-mono">inv()</code>), system solvers (<code className="text-emerald-400 font-mono">solve()</code>), determinants (<code className="text-emerald-400 font-mono">det()</code>), and eigenvalues (<code className="text-emerald-400 font-mono">eig()</code>).
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Matrix Solver & Decompositions", icon: Sparkles },
              { id: "code", label: "Python Code Lab", icon: Code2 },
              { id: "notes", label: "Revision Notes", icon: BookOpen },
              { id: "quiz", label: "Knowledge Check", icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Interactive Studio */}
        {activeTab === "interactive" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Matrix Input Panel */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Binary className="w-4 h-4" />
                <span>Matrix A &amp; Vector b (Ax = b)</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-slate-300 mb-2 block">Matrix A (2×2):</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={a11}
                      onChange={(e) => setA11(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      value={a12}
                      onChange={(e) => setA12(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      value={a21}
                      onChange={(e) => setA21(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      value={a22}
                      onChange={(e) => setA22(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-300 mb-2 block">Vector b (RHS):</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={b1}
                      onChange={(e) => setB1(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="number"
                      value={b2}
                      onChange={(e) => setB2(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Equation View */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1 font-mono text-xs text-slate-300">
                <div className="text-[10px] uppercase font-bold text-slate-500">System Equations:</div>
                <div>{a11}x₁ + {a12}x₂ = {b1}</div>
                <div>{a21}x₁ + {a22}x₂ = {b2}</div>
              </div>
            </div>

            {/* Matrix Properties & Solvers */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Cpu className="w-4 h-4" />
                  <span>Calculated Linear Algebra Properties</span>
                </div>
                {isSingular ? (
                  <span className="text-xs font-mono text-rose-400 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Singular Matrix (det = 0)
                  </span>
                ) : (
                  <span className="text-xs font-mono text-emerald-400 font-bold">Non-Singular (Invertible)</span>
                )}
              </div>

              {/* Solved Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Solution Vector x */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-mono">Exact Solution via linalg.solve(A, b)</span>
                  {!isSingular ? (
                    <div className="text-lg font-bold text-emerald-400 font-mono">
                      x₁ = {solX1.toFixed(3)}, x₂ = {solX2.toFixed(3)}
                    </div>
                  ) : (
                    <div className="text-sm font-bold text-rose-400 font-mono">No unique solution (Singular)</div>
                  )}
                  <span className="text-[10px] text-slate-500">Computed via direct LAPACK LU decomposition</span>
                </div>

                {/* Determinant */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-mono">Determinant: linalg.det(A)</span>
                  <div className="text-lg font-bold text-cyan-400 font-mono">
                    det(A) = {det.toFixed(3)}
                  </div>
                  <span className="text-[10px] text-slate-500">Area scaling factor</span>
                </div>

                {/* Matrix Inverse */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-mono">Matrix Inverse: linalg.inv(A)</span>
                  {!isSingular ? (
                    <div className="font-mono text-xs text-teal-300 bg-slate-900 p-2 rounded border border-slate-800">
                      [[{inv11.toFixed(2)}, {inv12.toFixed(2)}], [{inv21.toFixed(2)}, {inv22.toFixed(2)}]]
                    </div>
                  ) : (
                    <div className="text-xs text-rose-400">Undefined (Division by zero det)</div>
                  )}
                  <span className="text-[10px] text-slate-500">A @ A^{-1} = I</span>
                </div>

                {/* Eigenvalues */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-mono">Eigenvalues: linalg.eig(A)</span>
                  {eig1 !== null ? (
                    <div className="text-sm font-bold text-amber-400 font-mono">
                      λ₁ = {eig1.toFixed(3)}, λ₂ = {eig2.toFixed(3)}
                    </div>
                  ) : (
                    <div className="text-xs text-amber-400 font-mono">Complex Conjugate Roots</div>
                  )}
                  <span className="text-[10px] text-slate-500">Variance axes for PCA</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((script, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {script.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
              <pre>{scripts[selectedScript].code}</pre>
            </div>
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Classroom Printable Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Notes"}</span>
              </button>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Quiz */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Concept Validation &amp; Knowledge Check</span>
              </div>
              {submittedQuiz && (
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-white">
                      {idx + 1}. {q.question}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = "bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300";
                        if (selected === optIdx) {
                          btnClass = "bg-emerald-950 border-emerald-500 text-white";
                        }
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnClass = "bg-emerald-900/80 border-emerald-500 text-white font-semibold";
                          } else if (selected === optIdx && selected !== q.correctAnswer) {
                            btnClass = "bg-rose-950 border-rose-500 text-rose-200";
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="font-semibold text-emerald-400">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setSubmittedQuiz(!submittedQuiz)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/30"
              >
                {submittedQuiz ? "Reset Quiz" : "Submit Answers"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
