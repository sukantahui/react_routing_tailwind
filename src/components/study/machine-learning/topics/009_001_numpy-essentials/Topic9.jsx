import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic9_files/01_integer_array_indexing_basics.py?raw";
import pyCode2 from "./topic9_files/02_multidimensional_paired_coords_vs_open_mesh.py?raw";
import pyCode3 from "./topic9_files/03_in_place_fancy_modification_and_np_add_at.py?raw";
import pyCode4 from "./topic9_files/04_ml_stochastic_batch_sampling_and_shuffling.py?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_integer_array_indexing_basics.py",
    title: "1. Integer Array Indexing & Copy Proof",
    badge: "Fancy Basics",
    code: pyCode1,
    summary: "Demonstrates 1D index lists, arbitrary ordering, index repetition, and confirms fancy indexing returns a memory-independent copy.",
  },
  {
    id: "part2",
    fileName: "02_multidimensional_paired_coords_vs_open_mesh.py",
    title: "2. Paired Coordinates vs np.ix_() Subgrids",
    badge: "Paired vs np.ix_",
    code: pyCode2,
    summary: "Explains the zip-pairing rule of multi-axis index arrays and how to use np.ix_() to extract rectangular 2D sub-matrices.",
  },
  {
    id: "part3",
    fileName: "03_in_place_fancy_modification_and_np_add_at.py",
    title: "3. In-Place Mutation & np.add.at()",
    badge: "np.add.at()",
    code: pyCode3,
    summary: "Reveals the repeated index += 1 buffering trap and demonstrates how np.add.at() performs safe unbuffered histogram accumulation.",
  },
  {
    id: "part4",
    fileName: "04_ml_stochastic_batch_sampling_and_shuffling.py",
    title: "4. ML Stochastic Mini-Batch Sampling",
    badge: "SGD Sampling",
    code: pyCode4,
    summary: "Implements SGD mini-batch extraction, dataset shuffling with np.random.permutation, and synchronous feature/label permuting.",
  },
];

// ─── Dataset for 1D and 2D Interactive Indexing ──────────────────────────────
const SAMPLE_STUDENTS = [
  { id: 0, name: "Debangshu", marks: [75, 82, 90], total: 247 },
  { id: 1, name: "Susmita", marks: [88, 94, 91], total: 273 },
  { id: 2, name: "Swadeep", marks: [62, 70, 74], total: 206 },
  { id: 3, name: "Tuhina", marks: [92, 89, 96], total: 277 },
  { id: 4, name: "Sachin", marks: [85, 80, 88], total: 253 },
  { id: 5, name: "Mahima", marks: [79, 85, 82], total: 246 },
];

const PRESET_INDEX_SETS = [
  { id: "top_rankers", label: "Top Rankers [3, 1, 4]", indices: [3, 1, 4] },
  { id: "even_rows", label: "Even Rows [0, 2, 4]", indices: [0, 2, 4] },
  { id: "odd_rows", label: "Odd Rows [1, 3, 5]", indices: [1, 3, 5] },
  { id: "reverse_all", label: "Reversed [5, 4, 3, 2, 1, 0]", indices: [5, 4, 3, 2, 1, 0] },
];

const Topic9 = () => {
  const [activeTab, setActiveTab] = useState("visual_picker");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Interactive Selected Indices State
  const [selectedIndices, setSelectedIndices] = useState([3, 1, 4]);

  // Copy vs View Interactive State
  const [masterArray, setMasterArray] = useState([65, 78, 92, 54, 88]);
  const [fancyCopy, setFancyCopy] = useState([78, 54]);

  // Mini-batch SGD state
  const [batchSize, setBatchSize] = useState(3);
  const [currentBatchIndices, setCurrentBatchIndices] = useState([1, 3, 4]);

  const toggleIndex = (idx) => {
    if (selectedIndices.includes(idx)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== idx));
    } else {
      setSelectedIndices([...selectedIndices, idx]);
    }
  };

  const sampleNewMiniBatch = () => {
    const all = [0, 1, 2, 3, 4, 5];
    const shuffled = [...all].sort(() => 0.5 - Math.random());
    setCurrentBatchIndices(shuffled.slice(0, batchSize));
  };

  const mutateFancyCopy = () => {
    setFancyCopy([999, fancyCopy[1]]);
  };

  const resetCopyProof = () => {
    setMasterArray([65, 78, 92, 54, 88]);
    setFancyCopy([78, 54]);
  };

  const selectedStudents = selectedIndices
    .filter((idx) => idx >= 0 && idx < SAMPLE_STUDENTS.length)
    .map((idx) => SAMPLE_STUDENTS[idx]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* ─── HEADER ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  BCAC701B • Segment 9
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Module 1 • Topic 9
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>🎯 Fancy Indexing (Integer Arrays)</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  arr[[0, 2, 5]] • mat[np.ix_()] • X[batch_idx]
                </span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Mastering non-sequential element selection, deep memory copies, paired coordinate indexing, and ML mini-batch sampling.
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-mono px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700 text-slate-400">
                Mentor: <strong className="text-emerald-400">Sukanta Hui</strong> • Barrackpore
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── TOP LEVEL NAVIGATION TABS ─────────────────────────────────────────── */}
      <nav className="bg-slate-950 border-b border-slate-800/80 sticky top-[73px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-1 py-2 scrollbar-thin scrollbar-thumb-slate-700">
            {[
              { id: "visual_picker", label: "🎛️ Interactive Index Picker", icon: "🎯" },
              { id: "copy_vs_view_proof", label: "🧬 Copy vs View Memory Proof", icon: "⚡" },
              { id: "paired_vs_grid", label: "📐 Paired Coordinates vs np.ix_()", icon: "🧩" },
              { id: "ml_minibatch_sampler", label: "🤖 SGD Mini-Batch Sampler", icon: "🎲" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── MAIN CONTENT CONTAINER ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ─── TAB 1: VISUAL INDEX PICKER ─── */}
        {activeTab === "visual_picker" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🎛️ Interactive Integer Array (Fancy) Index Selector</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Click any student row to add or remove its integer index from the index list <code className="text-emerald-400">indices = [{selectedIndices.join(", ")}]</code>.
                  </p>
                </div>
                {/* Presets */}
                <div className="flex flex-wrap gap-2">
                  {PRESET_INDEX_SETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedIndices(p.indices)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-emerald-500 hover:text-emerald-300 transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generated Syntax Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md text-xs font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono">
                    selected = data[[{selectedIndices.join(", ")}]]
                  </span>
                  <span className="text-xs text-slate-300">
                    Output Shape: <strong className="text-white">({selectedIndices.length}, 3)</strong> • Type:{" "}
                    <strong className="text-emerald-400">Deep Memory Copy</strong>
                  </span>
                </div>
                <code className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  subset = marks_table[[{selectedIndices.join(", ")}]]
                </code>
              </div>

              {/* Interactive Row Cards */}
              <div className="space-y-2 mb-6">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-2">
                  Master Student Table (Click to Select / Deselect Indices):
                </span>
                {SAMPLE_STUDENTS.map((st) => {
                  const isSelected = selectedIndices.includes(st.id);
                  return (
                    <button
                      key={st.id}
                      onClick={() => toggleIndex(st.id)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all text-left ${
                        isSelected
                          ? "bg-emerald-950/30 border-emerald-500/60 shadow-md shadow-emerald-950/20 scale-[1.01]"
                          : "bg-slate-950/60 border-slate-800 hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center border ${
                            isSelected
                              ? "bg-emerald-500 text-slate-950 border-emerald-400"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {st.id}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-white">{st.name}</p>
                          <p className="text-xs text-slate-400 font-mono">
                            Sub 1: {st.marks[0]} | Sub 2: {st.marks[1]} | Sub 3: {st.marks[2]}
                          </p>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-xs font-bold text-emerald-300">{st.total} pts</span>
                        <span className="block text-[10px] text-slate-500">
                          {isSelected ? "✅ Selected" : "Click to Add"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Extracted Output Preview */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Extracted Resulting Matrix: data[[{selectedIndices.join(", ")}]]
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    shape: ({selectedStudents.length}, 3)
                  </span>
                </div>
                {selectedStudents.length > 0 ? (
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    {selectedStudents.map((st, i) => (
                      <p key={i}>
                        Row {i} (Original #{st.id} - {st.name}): [{st.marks.join(", ")}]
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No indices selected.</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 2: COPY VS VIEW PROOF ─── */}
        {activeTab === "copy_vs_view_proof" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🧬 Memory Truth: Fancy Indexing ALWAYS Returns a COPY!</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                While slicing (<code className="text-blue-400">arr[1:3]</code>) returns a zero-copy view, fancy indexing (<code className="text-emerald-400">arr[[1, 3]]</code>) always allocates a brand new memory block on the heap.
              </p>

              {/* Interactive Mutation Demo */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Fancy Index Copy Panel */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      fancy_sub = arr[[1, 3]]
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      fancy_sub.base is None: True (Independent Copy!)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Click below to mutate <code className="text-emerald-300">fancy_sub[0] = 999</code>. Notice that the parent <code className="text-white">arr[1]</code> stays completely untouched at <strong className="text-white">78</strong>!
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={mutateFancyCopy}
                      className="px-3 py-1.5 bg-emerald-600/30 border border-emerald-500 text-emerald-300 rounded text-xs font-mono font-bold hover:bg-emerald-500 hover:text-slate-950 transition-all"
                    >
                      Set fancy_sub[0] = 999
                    </button>
                    <button
                      onClick={resetCopyProof}
                      className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 rounded text-xs font-mono hover:text-white"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-slate-500 font-semibold">fancy_sub Content in RAM:</p>
                    <p className="text-emerald-300 font-bold">[{fancyCopy.join(", ")}]</p>
                  </div>
                </div>

                {/* Master Array Panel */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-mono">
                      Master Array in RAM (arr)
                    </span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                      Shape: (5,)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    The master array buffer is completely isolated from modifications to <code className="text-emerald-300">fancy_sub</code>.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-slate-500 font-semibold">arr Content:</p>
                    <p className="text-white font-bold">[{masterArray.join(", ")}]</p>
                    <p className="text-xs text-emerald-400 pt-1">
                      arr[1] remains {masterArray[1]} (Safe & Untouched)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 3: PAIRED COORDINATES VS NP.IX_ ─── */}
        {activeTab === "paired_vs_grid" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>📐 Paired Coordinates vs Rectangular Subgrid (np.ix_)</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Understand the classic NumPy distinction between pairing indices element-by-element vs taking the full Cartesian cross-product grid.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Paired Coordinates */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-blue-400 font-mono">
                      1. Paired Coordinates: mat[[0, 2], [1, 2]]
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded border border-blue-500/30">
                      Returns (2,) [1D Vector]
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    NumPy pairs index arrays element-by-element:
                    <br />
                    • Point 1: Row 0, Col 1 ➔ <code className="text-emerald-400">82</code>
                    <br />
                    • Point 2: Row 2, Col 2 ➔ <code className="text-emerald-400">74</code>
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      result = mat[[0, 2], [1, 2]]<br />
                      print(result) # Output: array([82, 74])
                    </code>
                  </div>
                </div>

                {/* np.ix_ Subgrid */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-emerald-400 font-mono">
                      2. Submatrix Grid: mat[np.ix_([0, 2], [1, 2])]
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/30">
                      Returns (2, 2) [2D Submatrix]
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <code className="text-emerald-300">np.ix_()</code> forms an open mesh to compute the Cartesian cross-product, extracting all 4 intersections into a 2×2 submatrix.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-emerald-300 border border-slate-800">
                    <code>
                      subgrid = mat[np.ix_([0, 2], [1, 2])]<br />
                      # Output (2x2 Matrix):<br />
                      # [[82, 90],<br />
                      #  [70, 74]]
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 4: SGD MINI-BATCH SAMPLER ─── */}
        {activeTab === "ml_minibatch_sampler" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🎲 Stochastic Gradient Descent (SGD) Mini-Batch Sampler</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    See how fancy indexing extracts random mini-batches during neural network training epochs while keeping <code className="text-blue-400">X</code> and <code className="text-emerald-400">y</code> strictly synchronized.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">Batch Size:</span>
                  {[2, 3, 4].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setBatchSize(sz);
                        const all = [0, 1, 2, 3, 4, 5];
                        setCurrentBatchIndices(all.slice(0, sz));
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                        batchSize === sz
                          ? "bg-emerald-500 text-slate-950 border-emerald-400"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      {sz} samples
                    </button>
                  ))}
                  <button
                    onClick={sampleNewMiniBatch}
                    className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-lg text-xs hover:opacity-90 shadow-md"
                  >
                    🎲 Draw Random Batch
                  </button>
                </div>
              </div>

              {/* Sampled Batch Visualizer */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    batch_idx = np.random.choice(6, size={batchSize}, replace=False) ➔ [{currentBatchIndices.join(", ")}]
                  </span>
                  <span className="text-xs text-slate-400">
                    X_batch.shape: ({batchSize}, 3) • y_batch.shape: ({batchSize},)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Features Matrix X_batch */}
                  <div className="bg-slate-900/80 border border-blue-500/40 rounded-xl p-4 space-y-2">
                    <span className="text-xs font-bold text-blue-300 font-mono">
                      X_batch = X[batch_idx]
                    </span>
                    <div className="space-y-1 font-mono text-xs">
                      {currentBatchIndices.map((idx, i) => (
                        <div key={i} className="flex justify-between p-2 bg-slate-950 rounded text-slate-200">
                          <span className="text-slate-400">#{idx} {SAMPLE_STUDENTS[idx].name}</span>
                          <span>[{SAMPLE_STUDENTS[idx].marks.join(", ")}]</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Vector y_batch */}
                  <div className="bg-slate-900/80 border border-emerald-500/40 rounded-xl p-4 space-y-2">
                    <span className="text-xs font-bold text-emerald-300 font-mono">
                      y_batch = y[batch_idx]
                    </span>
                    <div className="space-y-1 font-mono text-xs">
                      {currentBatchIndices.map((idx, i) => (
                        <div key={i} className="flex justify-between p-2 bg-slate-950 rounded text-slate-200">
                          <span className="text-slate-400">#{idx} Total</span>
                          <span className="text-emerald-400 font-bold">{SAMPLE_STUDENTS[idx].total} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-400 border border-slate-800">
                  <code>
                    # Pass mini-batch to Neural Network optimizer<br />
                    loss = model.train_on_batch(X_batch, y_batch)
                  </code>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── CODE DEMONSTRATION (MULTI-SCRIPT SUITE) ────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">💻</div>
            <div>
              <h2 className="text-xl font-bold text-white">Python Code Demonstration Suite (4 Focused Scripts)</h2>
              <p className="text-xs text-slate-400">Select a script below to inspect integer indexing, paired coords vs np.ix_, np.add.at(), or SGD mini-batch sampling</p>
            </div>
          </div>

          {/* Script Selection Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PYTHON_SCRIPTS.map((script) => (
              <button
                key={script.id}
                onClick={() => setSelectedScriptId(script.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedScriptId === script.id
                    ? "bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/40 scale-[1.02]"
                    : "bg-slate-950/70 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      selectedScriptId === script.id
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                  }`}
                >
                  {script.badge}
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate">{script.title}</p>
            </button>
          ))}
        </div>

        {/* Active Script Description Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                {activeScript.fileName}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{activeScript.summary}</p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={activeScript.code}
          title={activeScript.fileName}
        />
      </section>

        {/* ─── COMMON PITFALLS ───────────────────────────────────────────────── */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-rose-400 flex items-center gap-2">
            <span>⚠️ Fancy Indexing Pitfalls & How to Avoid Them</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                1. The Repeated Index In-Place Increment Trap
              </strong>
              <p>
                <code className="text-white">arr[[0, 0]] += 1</code> only increments index 0 ONCE because buffered assignment extracts the value once and writes it back once. Use <code className="text-emerald-400">np.add.at(arr, [0, 0], 1)</code> for repeated increments!
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                2. Assuming Paired Coordinates Return a 2D Grid
              </strong>
              <p>
                <code className="text-white">mat[[0, 2], [1, 3]]</code> returns a 1D vector of 2 paired points, NOT a 2x2 matrix. Use <code className="text-blue-300">mat[np.ix_([0, 2], [1, 3])]</code> for a 2x2 grid.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                3. Expecting Fancy Indexing to Share Memory (View)
              </strong>
              <p>
                Unlike slicing, fancy indexing ALWAYS creates a copy. Modifying a fancy-indexed slice will not mutate the parent array.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                4. Shuffling X and y Independently in ML
              </strong>
              <p>
                Never call <code className="text-white">np.random.shuffle(X)</code> and <code className="text-white">np.random.shuffle(y)</code> separately! Generate one permutation array <code className="text-emerald-400">perm = np.random.permutation(N)</code> and apply <code className="text-emerald-400">X[perm], y[perm]</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── CLASSROOM INTERACTION / BARRACKPORE DIALOGUES ─────────────────── */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>💬 Barrackpore Classroom Q&A</span>
            </h2>
            <span className="text-xs text-emerald-400 font-mono">Coder & AccoTax Live Session</span>
          </div>

          <div className="space-y-3">
            {[
              {
                student: "Debangshu",
                avatar: "👨‍💻",
                question: "Sir, why did arr[[0, 0]] += 1 only add 1 instead of 2 to arr[0]?",
                answer: "Debangshu, that is NumPy's famous buffered assignment trap! Python extracts arr[[0, 0]] as a temporary array [0, 0], increments both to [1, 1], and then writes 1 back into arr[0] twice. The second write simply overwrites the first! To accumulate repeated indices properly, always use np.add.at(arr, [0, 0], 1).",
              },
              {
                student: "Susmita",
                avatar: "👩‍💻",
                question: "If I want to extract the top 3 students by score from a 100-student array, how do I do it with fancy indexing?",
                answer: "Susmita, combine np.argsort() with fancy indexing! np.argsort(scores)[-3:][::-1] gives the indices of the top 3 scores. Then top_students = scores[top_indices] extracts them directly in descending order!",
              },
              {
                student: "Swadeep",
                avatar: "👨‍🎓",
                question: "Why does fancy indexing allocate a copy instead of a view like normal slicing?",
                answer: "Swadeep, normal slicing follows a constant step/stride (e.g. hop every 4 bytes). But fancy indexing picks arbitrary non-contiguous memory locations (e.g. index 1, then 100, then 4). A single stride formula cannot represent arbitrary scattered addresses, so NumPy must copy those selected bytes into a fresh contiguous buffer!",
              },
            ].map((dialogue, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                  <span>{dialogue.avatar}</span>
                  <span>{dialogue.student} asks:</span>
                </div>
                <p className="text-xs text-slate-300 italic pl-6">"{dialogue.question}"</p>
                <div className="flex items-start gap-2 pt-2 border-t border-slate-800 text-xs text-emerald-300">
                  <span className="font-bold text-emerald-400 whitespace-nowrap">Sukanta Sir:</span>
                  <p className="text-slate-300">{dialogue.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ ACCORDION ─────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>❓ Frequently Asked Questions & Practice Problems</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">{questions.length} Questions & Answers</span>
          </div>
          <FAQTemplate questions={questions} />
        </section>

        {/* ─── PRINTABLE SUMMARY NOTE ────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📄 Printable Topic Summary Note</span>
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              topic9_note.txt
            </span>
          </div>
          <PlainTextPrint text={noteText} fileName="topic9_note.txt" />
        </section>

        {/* ─── TEACHER PERSONA SIGNATURE ─────────────────────────────────────── */}
        <Teacher />
      </main>
    </div>
  );
};

export default Topic9;
