import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic14_files/01_dot_product_vectors_and_geometry.py?raw";
import pyCode2 from "./topic14_files/02_matrix_multiplication_2d_dot_vs_matmul.py?raw";
import pyCode3 from "./topic14_files/03_inner_dimension_mismatch_and_transpose.py?raw";
import pyCode4 from "./topic14_files/04_ml_forward_pass_linear_layer.py?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_dot_product_vectors_and_geometry.py",
    title: "1. 1D Dot Product & Cosine Similarity",
    badge: "Vector Dot",
    code: pyCode1,
    summary: "Calculates algebraic dot product sum(u_i * v_i), Euclidean vector norms, and cosine similarity angle between embeddings.",
  },
  {
    id: "part2",
    fileName: "02_matrix_multiplication_2d_dot_vs_matmul.py",
    title: "2. 2D Matrix Multiplication & @ vs *",
    badge: "2D (M, K) @ (K, N)",
    code: pyCode2,
    summary: "Demonstrates row-by-column matrix multiplication, checks inner dimension alignment, and contrasts (*) element-wise vs (@) matrix dot product.",
  },
  {
    id: "part3",
    fileName: "03_inner_dimension_mismatch_and_transpose.py",
    title: "3. Dimension Mismatches & Transposition (.T)",
    badge: "Shapes & Transpose",
    code: pyCode3,
    summary: "Fixes shape mismatch ValueError via transposing matrices (.T) to compute Gram sample similarities and feature covariance matrices.",
  },
  {
    id: "part4",
    fileName: "04_ml_forward_pass_linear_layer.py",
    title: "4. ML Forward Pass & Normal Equation",
    badge: "ML Dense Layer",
    code: pyCode4,
    summary: "Implements dense layer forward pass Z = X @ W + b and solves Ordinary Least Squares (OLS) closed-form normal equation theta = (X^T X)^-1 X^T y.",
  },
];

const MATRIX_A_PRESETS = [
  {
    name: "Students x Scores (3x2)",
    rows: 3,
    cols: 2,
    rowLabels: ["Debangshu", "Susmita", "Swadeep"],
    colLabels: ["Theory", "Lab"],
    data: [
      [80, 20],
      [90, 25],
      [70, 15],
    ],
  },
  {
    name: "Linear Layer Batch (2x3)",
    rows: 2,
    cols: 3,
    rowLabels: ["Sample 1", "Sample 2"],
    colLabels: ["F1", "F2", "F3"],
    data: [
      [2, 4, 1],
      [5, 1, 3],
    ],
  },
];

const MATRIX_B_PRESETS = [
  {
    name: "Weights x Criteria (2x3)",
    rows: 2,
    cols: 3,
    rowLabels: ["Theory", "Lab"],
    colLabels: ["Term 1", "Term 2", "Final"],
    data: [
      [0.3, 0.3, 0.4],
      [0.2, 0.2, 0.6],
    ],
  },
  {
    name: "Dense Weights (3x2)",
    rows: 3,
    cols: 2,
    rowLabels: ["F1", "F2", "F3"],
    colLabels: ["Neuron 1", "Neuron 2"],
    data: [
      [0.5, -0.2],
      [0.1, 0.8],
      [-0.4, 0.6],
    ],
  },
];

const Topic14 = () => {
  const [activeTab, setActiveTab] = useState("interactive_matmul");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [selectedPresetA, setSelectedPresetA] = useState(0);
  const [selectedPresetB, setSelectedPresetB] = useState(0);
  const [selectedCell, setSelectedCell] = useState({ r: 0, c: 0 });

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const matA = MATRIX_A_PRESETS[selectedPresetA];
  const matB = MATRIX_B_PRESETS[selectedPresetB];

  const canMultiply = matA.cols === matB.rows;

  // Compute resulting matrix C
  const resultRows = matA.rows;
  const resultCols = matB.cols;

  const computeProduct = () => {
    if (!canMultiply) return null;
    const res = [];
    for (let r = 0; r < resultRows; r++) {
      const row = [];
      for (let c = 0; c < resultCols; c++) {
        let sum = 0;
        for (let k = 0; k < matA.cols; k++) {
          sum += matA.data[r][k] * matB.data[k][c];
        }
        row.push(parseFloat(sum.toFixed(2)));
      }
      res.push(row);
    }
    return res;
  };

  const matC = computeProduct();

  // Highlighted row from A and col from B for the selected cell in C
  const activeRowA = canMultiply && selectedCell ? matA.data[selectedCell.r] : [];
  const activeColB = canMultiply && selectedCell ? matB.data.map((r) => r[selectedCell.c]) : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-teal-900/60 via-slate-900 to-indigo-900/60 border border-teal-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/40">
                Topic 14 • Linear Algebra in ML
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                np.dot() &amp; @ Operator
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Matrix Multiplication with np.dot() &amp; @
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Master row-by-column matrix dot products, dimensional alignment rules <code className="text-teal-300 font-mono">(M, K) @ (K, N) → (M, N)</code>, the critical distinction between element-wise <code className="text-amber-300">*</code> and matrix dot <code className="text-teal-300">@</code>, and neural network forward pass mechanics.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "interactive_matmul", label: "Interactive MatMul Visualizer", icon: "🔢" },
            { id: "operator_comparison", label: "@ vs * Comparison", icon: "⚡" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive MatMul Visualizer */}
      {activeTab === "interactive_matmul" && (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Matrix A Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-teal-300">Matrix A (Left Matrix)</h3>
                <span className="text-xs px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded font-mono">
                  ({matA.rows}, {matA.cols})
                </span>
              </div>
              <div className="flex gap-2 mb-4">
                {MATRIX_A_PRESETS.map((p, idx) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setSelectedPresetA(idx);
                      setSelectedCell({ r: 0, c: 0 });
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                      selectedPresetA === idx
                        ? "bg-teal-500/20 border-teal-500 text-teal-200"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Matrix A Grid */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-center text-xs font-mono">
                  <thead>
                    <tr>
                      <th className="p-1 text-slate-500"></th>
                      {matA.colLabels.map((c, i) => (
                        <th key={i} className="p-1 text-teal-400 font-semibold">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matA.data.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="p-1 text-slate-400 font-sans text-[11px] text-right pr-2">
                          {matA.rowLabels[rIdx]}
                        </td>
                        {row.map((val, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-2 rounded border transition ${
                              selectedCell.r === rIdx && canMultiply
                                ? "bg-teal-500/30 border-teal-400 text-teal-200 font-bold"
                                : "bg-slate-900/60 border-slate-800 text-slate-300"
                            }`}
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Matrix B Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-indigo-300">Matrix B (Right Matrix)</h3>
                <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-mono">
                  ({matB.rows}, {matB.cols})
                </span>
              </div>
              <div className="flex gap-2 mb-4">
                {MATRIX_B_PRESETS.map((p, idx) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setSelectedPresetB(idx);
                      setSelectedCell({ r: 0, c: 0 });
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                      selectedPresetB === idx
                        ? "bg-indigo-500/20 border-indigo-500 text-indigo-200"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Matrix B Grid */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-center text-xs font-mono">
                  <thead>
                    <tr>
                      <th className="p-1 text-slate-500"></th>
                      {matB.colLabels.map((c, i) => (
                        <th key={i} className="p-1 text-indigo-400 font-semibold">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matB.data.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="p-1 text-slate-400 font-sans text-[11px] text-right pr-2">
                          {matB.rowLabels[rIdx]}
                        </td>
                        {row.map((val, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-2 rounded border transition ${
                              selectedCell.c === cIdx && canMultiply
                                ? "bg-indigo-500/30 border-indigo-400 text-indigo-200 font-bold"
                                : "bg-slate-900/60 border-slate-800 text-slate-300"
                            }`}
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Matrix C (Result) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-amber-300">Result Matrix C = A @ B</h3>
                {canMultiply ? (
                  <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-mono">
                    ({resultRows}, {resultCols})
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded font-mono">
                    Dimension Mismatch
                  </span>
                )}
              </div>

              {canMultiply ? (
                <div>
                  <p className="text-xs text-slate-400 mb-3">
                    Click any cell below to see its exact row-dot-column calculation:
                  </p>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 overflow-x-auto">
                    <table className="w-full text-center text-xs font-mono">
                      <thead>
                        <tr>
                          <th className="p-1 text-slate-500"></th>
                          {matB.colLabels.map((c, i) => (
                            <th key={i} className="p-1 text-amber-400 font-semibold">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {matC.map((row, rIdx) => (
                          <tr key={rIdx}>
                            <td className="p-1 text-slate-400 font-sans text-[11px] text-right pr-2">
                              {matA.rowLabels[rIdx]}
                            </td>
                            {row.map((val, cIdx) => (
                              <td
                                key={cIdx}
                                onClick={() => setSelectedCell({ r: rIdx, c: cIdx })}
                                className={`p-2 rounded border cursor-pointer transition transform hover:scale-105 ${
                                  selectedCell.r === rIdx && selectedCell.c === cIdx
                                    ? "bg-amber-500 border-amber-300 text-slate-950 font-black shadow-lg shadow-amber-500/30"
                                    : "bg-slate-900/80 border-slate-700 text-amber-200 hover:border-amber-400"
                                }`}
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-xl text-xs text-rose-300">
                  <p className="font-bold text-sm mb-1">❌ ValueError: shapes not aligned!</p>
                  <p>Matrix A columns ({matA.cols}) ≠ Matrix B rows ({matB.rows}).</p>
                  <p className="mt-2 text-slate-300">
                    Fix: Transpose matrix B as <code className="text-amber-300 font-mono">A @ B.T</code> or adjust matrix dimensions.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cell Calculation Breakdown */}
          {canMultiply && selectedCell && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
                <h4 className="text-lg font-bold text-teal-300 flex items-center gap-2">
                  <span>🔬 Step-by-Step Dot Product for Cell C[{selectedCell.r}, {selectedCell.c}]</span>
                  <span className="text-xs px-2.5 py-1 bg-teal-500/20 text-teal-300 rounded-md font-mono">
                    ({matA.rowLabels[selectedCell.r]} × {matB.colLabels[selectedCell.c]})
                  </span>
                </h4>
                <span className="text-sm font-bold text-amber-400 font-mono">
                  Result = {matC[selectedCell.r][selectedCell.c]}
                </span>
              </div>

              {/* Equation Visualizer */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs md:text-sm text-slate-300 flex flex-wrap items-center gap-2">
                <span className="text-slate-500 font-sans font-semibold">Formula:</span>
                <span>C[{selectedCell.r}, {selectedCell.c}] = </span>
                {activeRowA.map((valA, k) => {
                  const valB = activeColB[k];
                  return (
                    <React.Fragment key={k}>
                      {k > 0 && <span className="text-slate-500">+</span>}
                      <span className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200">
                        (<span className="text-teal-300 font-bold">{valA}</span> × <span className="text-indigo-300 font-bold">{valB}</span>)
                      </span>
                    </React.Fragment>
                  );
                })}
                <span className="text-slate-500">=</span>
                <span className="px-2 py-1 bg-amber-500/20 border border-amber-500 text-amber-300 font-bold rounded">
                  {matC[selectedCell.r][selectedCell.c]}
                </span>
              </div>

              {/* Dimensionality Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Matrix A Shape:</span>
                  <span className="text-teal-300 font-mono font-bold text-sm">
                    ({matA.rows}, <span className="underline decoration-amber-400">{matA.cols}</span>)
                  </span>
                  <span className="text-slate-500 block text-[11px] mt-1">Left rows × Inner dim</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Matrix B Shape:</span>
                  <span className="text-indigo-300 font-mono font-bold text-sm">
                    (<span className="underline decoration-amber-400">{matB.rows}</span>, {matB.cols})
                  </span>
                  <span className="text-slate-500 block text-[11px] mt-1">Inner dim × Right cols</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Result Matrix C Shape:</span>
                  <span className="text-amber-300 font-mono font-bold text-sm">
                    ({matA.rows}, {matB.cols})
                  </span>
                  <span className="text-slate-500 block text-[11px] mt-1">Left rows × Right cols</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Operator Comparison */}
      {activeTab === "operator_comparison" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/40">
                  Element-Wise: A * B
                </span>
                <span className="text-slate-400 text-xs font-mono">Hadamard Product</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Multiplies matching positions directly: <code className="text-amber-300">C[i,j] = A[i,j] * B[i,j]</code>. Requires shapes to be identical or broadcastable.
              </p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <p className="text-slate-500"># Example with (2, 2) arrays</p>
                <p>A = np.array([[1, 2], [3, 4]])</p>
                <p>B = np.array([[5, 6], [7, 8]])</p>
                <p className="text-amber-300 pt-2 font-bold">A * B =&gt;</p>
                <p className="text-emerald-400">[[ 5, 12],</p>
                <p className="text-emerald-400"> [21, 32]]</p>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-bold rounded-lg border border-teal-500/40">
                  Matrix Dot Product: A @ B
                </span>
                <span className="text-slate-400 text-xs font-mono">Row-Dot-Column</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Computes algebraic dot products of row vectors from A and column vectors from B. Requires inner dimension match <code className="text-teal-300">(M, K) @ (K, N)</code>.
              </p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <p className="text-slate-500"># Matrix dot product (Python 3.5+)</p>
                <p>A = np.array([[1, 2], [3, 4]])</p>
                <p>B = np.array([[5, 6], [7, 8]])</p>
                <p className="text-teal-300 pt-2 font-bold">A @ B (or np.dot(A, B)) =&gt;</p>
                <p className="text-emerald-400">[[19, 22],   # [1*5+2*7, 1*6+2*8]</p>
                <p className="text-emerald-400"> [43, 50]]   # [3*5+4*7, 3*6+4*8]</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-slate-200 mb-3">Summary Cheat Sheet</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2">Syntax</th>
                    <th className="p-2">Underlying Method</th>
                    <th className="p-2">Dimension Requirement</th>
                    <th className="p-2">ML Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  <tr>
                    <td className="p-2 text-amber-300 font-bold">A * B</td>
                    <td className="p-2 text-slate-300 font-sans">np.multiply</td>
                    <td className="p-2 text-slate-300">Exact match or Broadcastable</td>
                    <td className="p-2 text-slate-400 font-sans">Masking, Dropout layer filters</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-teal-300 font-bold">A @ B</td>
                    <td className="p-2 text-slate-300 font-sans">np.matmul</td>
                    <td className="p-2 text-slate-300">Inner dims match: A.shape[-1] == B.shape[-2]</td>
                    <td className="p-2 text-slate-400 font-sans">Dense layer projection, Batch MatMul</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-cyan-300 font-bold">np.dot(A, B)</td>
                    <td className="p-2 text-slate-300 font-sans">np.dot</td>
                    <td className="p-2 text-slate-300">Last axis of A matches 2nd-to-last of B</td>
                    <td className="p-2 text-slate-400 font-sans">Vector dot products, 2D matrix mult</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-teal-950/40 border-teal-500 shadow-lg shadow-teal-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {s.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.py</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">{s.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{s.summary}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-teal-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                NumPy Linear Algebra Suite
              </span>
            </div>
            <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
          </div>
        </div>
      )}

      {/* Tab 4: Teacher Notes */}
      {activeTab === "teacher_notes" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Teacher
            name="Sukanta Hui"
            title="Senior ML Instructor, Barrackpore Lab"
            quote="In machine learning and deep learning, matrix multiplication is the true engine of intelligence. From linear regression to 70-billion parameter transformers, nearly all compute time is spent in matrix dot products (GEMM). Remember the golden rule: for (M, K) @ (K, N), inner dimensions must match, and the resulting shape is always (M, N)."
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-teal-300 mb-4 flex items-center gap-2">
              <span>📚 Comprehensive Topic Notes</span>
            </h3>
            <PlainTextPrint content={noteText} />
          </div>
        </div>
      )}

      {/* Tab 5: Quizzes & FAQs */}
      {activeTab === "faqs_questions" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <FAQTemplate questions={questions} />
        </div>
      )}
    </div>
  );
};

export default Topic14;
