import React, { useEffect, useRef, useState, useMemo } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import demoCode from "./topic3_files/matrix_row_major_demo.c?raw";

// Default 4x5 Sparse Matrix Preset
const INITIAL_MATRIX = [
  [0, 10,  0,  0,  0],
  [0,  0, 20,  0,  0],
  [0,  0,  0,  0, 30],
  [40, 0,  0, 50,  0]
];

export default function Topic3() {
  const sectionRefs = useRef([]);

  // Matrix State: 4 rows x 5 cols
  const [matrix, setMatrix] = useState(INITIAL_MATRIX);
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Selected cell for interactive editing
  const [selectedCell, setSelectedCell] = useState({ r: 0, c: 1 });
  const [cellInputVal, setCellInputVal] = useState("10");

  // Format Representation Tab: "triplet" | "csr" | "linked"
  const [repFormat, setRepFormat] = useState("triplet");

  // Transpose Algorithm Mode: "fast" | "simple"
  const [transposeAlgo, setTransposeAlgo] = useState("fast");

  // Animation States
  const [animStep, setAnimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animSpeed, setAnimSpeed] = useState(1200);

  // 1. Calculate 3-Tuple (Triplet / COO) Representation
  const triplet = useMemo(() => {
    const nonZeroList = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] !== 0) {
          nonZeroList.push({ r, c, val: matrix[r][c] });
        }
      }
    }
    // Index 0 is the Header (Rows, Cols, NonZeroCount)
    return [
      { r: rows, c: cols, val: nonZeroList.length, isHeader: true },
      ...nonZeroList
    ];
  }, [matrix, rows, cols]);

  const numNonZero = triplet[0].val;

  // 2. Calculate CSR (Compressed Sparse Row) Representation
  const csr = useMemo(() => {
    const values = [];
    const colIndices = [];
    const rowPtr = [0];

    for (let r = 0; r < rows; r++) {
      let countInRow = 0;
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] !== 0) {
          values.push(matrix[r][c]);
          colIndices.push(c);
          countInRow++;
        }
      }
      rowPtr.push(rowPtr[rowPtr.length - 1] + countInRow);
    }

    return { values, colIndices, rowPtr };
  }, [matrix, rows, cols]);

  // 3. Calculate Linked Representation (Array of Linked Lists)
  const linkedRows = useMemo(() => {
    const list = [];
    for (let r = 0; r < rows; r++) {
      const rowNodes = [];
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] !== 0) {
          rowNodes.push({ r, c, val: matrix[r][c] });
        }
      }
      list.push(rowNodes);
    }
    return list;
  }, [matrix, rows, cols]);

  // 4. Generate Step-by-Step Simulation for FAST TRANSPOSE
  const fastTransposeSimulation = useMemo(() => {
    const numCols = triplet[0].c;
    const numTerms = triplet[0].val;

    // Step 1: Column Frequency Count (total[col])
    const total = Array(numCols).fill(0);
    for (let i = 1; i <= numTerms; i++) {
      total[triplet[i].c]++;
    }

    // Step 2: Starting Position Array (starting_pos[col])
    const startingPos = Array(numCols).fill(0);
    startingPos[0] = 1;
    for (let c = 1; c < numCols; c++) {
      startingPos[c] = startingPos[c - 1] + total[c - 1];
    }

    // Step 3: Single-Pass Placement Steps
    const currentStartingPos = [...startingPos];
    const transposedTriplet = Array(numTerms + 1).fill(null);
    transposedTriplet[0] = { r: triplet[0].c, c: triplet[0].r, val: numTerms, isHeader: true };

    const steps = [];

    // Step 0: Initial Setup
    steps.push({
      title: "Step 0: Initial 3-Tuple (COO) Array Ready",
      desc: `Original matrix (${rows}×${cols}) with ${numTerms} non-zero terms loaded in 3-Tuple array a[].`,
      activeCol: null,
      activeOriginalIdx: null,
      activeDestIdx: null,
      totalArr: Array(numCols).fill(0),
      posArr: Array(numCols).fill(0),
      transposed: Array(numTerms + 1).fill(null),
      codeSnippet: `// Matrix A[${rows}][${cols}] → 3-Tuple terms = ${numTerms}`,
    });

    // Step 1: Count Frequencies
    const runningTotal = Array(numCols).fill(0);
    for (let i = 1; i <= numTerms; i++) {
      const col = triplet[i].c;
      runningTotal[col]++;
      steps.push({
        title: `Step 1.${i}: Count Frequency for Column ${col}`,
        desc: `Inspecting Term #${i} (val=${triplet[i].val}) at Col ${col} → Incrementing total[${col}] = ${runningTotal[col]}.`,
        activeCol: col,
        activeOriginalIdx: i,
        activeDestIdx: null,
        totalArr: [...runningTotal],
        posArr: Array(numCols).fill(0),
        transposed: Array(numTerms + 1).fill(null),
        codeSnippet: `for (i = 1; i <= numTerms; i++) total[a[i].col]++;`,
      });
    }

    // Step 2: Calculate Starting Positions (Prefix Sum)
    const runningPos = Array(numCols).fill(0);
    runningPos[0] = 1;
    steps.push({
      title: "Step 2.0: Base Starting Position for Column 0",
      desc: "starting_pos[0] = 1 (Elements of Column 0 begin at index 1 of the transposed array).",
      activeCol: 0,
      activeOriginalIdx: null,
      activeDestIdx: null,
      totalArr: [...total],
      posArr: [...runningPos],
      codeSnippet: `starting_pos[0] = 1;`,
    });

    for (let c = 1; c < numCols; c++) {
      runningPos[c] = runningPos[c - 1] + total[c - 1];
      steps.push({
        title: `Step 2.${c}: Compute starting_pos[${c}]`,
        desc: `starting_pos[${c}] = starting_pos[${c - 1}] (${runningPos[c - 1]}) + total[${c - 1}] (${total[c - 1]}) = ${runningPos[c]}.`,
        activeCol: c,
        activeOriginalIdx: null,
        activeDestIdx: null,
        totalArr: [...total],
        posArr: [...runningPos],
        codeSnippet: `for (c = 1; c < numCols; c++) starting_pos[c] = starting_pos[c-1] + total[c-1];`,
      });
    }

    // Step 3: Single-Pass Placement
    for (let i = 1; i <= numTerms; i++) {
      const orig = triplet[i];
      const col = orig.c;
      const destIndex = currentStartingPos[col];

      transposedTriplet[destIndex] = {
        r: orig.c,
        c: orig.r,
        val: orig.val,
      };

      currentStartingPos[col]++;

      steps.push({
        title: `Step 3.${i}: Migrate Term #${i} (Val: ${orig.val}) to Transpose Slot [${destIndex}]`,
        desc: `Original Term #${i} at (${orig.r}, ${orig.c}) → Target index = starting_pos[${col}] = ${destIndex}. Writing (${orig.c}, ${orig.r}, ${orig.val}). Updated starting_pos[${col}] → ${currentStartingPos[col]}.`,
        activeCol: col,
        activeOriginalIdx: i,
        activeDestIdx: destIndex,
        totalArr: [...total],
        posArr: [...currentStartingPos],
        transposed: [...transposedTriplet],
        codeSnippet: `j = starting_pos[a[${i}].col]++;\nb[j].row = a[${i}].col; b[j].col = a[${i}].row; b[j].val = a[${i}].val;`,
      });
    }

    // Final Complete Step
    steps.push({
      title: "Step 4: Fast Transpose Complete",
      desc: `Transposed matrix dimension is ${cols}×${rows} with all ${numTerms} elements strictly sorted in Row-Major order in O(Cols + NonZero) = O(${numCols} + ${numTerms}) linear time!`,
      activeCol: null,
      activeOriginalIdx: null,
      activeDestIdx: null,
      totalArr: [...total],
      posArr: [...currentStartingPos],
      transposed: [...transposedTriplet],
      codeSnippet: `// Fast Transposition finished! Total complexity: O(${numCols} + ${numTerms})`,
      isFinal: true,
    });

    return {
      total,
      startingPos,
      transposedTriplet,
      steps,
    };
  }, [triplet, rows, cols]);

  // 5. Generate Step-by-Step Simulation for SIMPLE TRANSPOSE
  const simpleTransposeSimulation = useMemo(() => {
    const numCols = triplet[0].c;
    const numTerms = triplet[0].val;

    const transposedTriplet = Array(numTerms + 1).fill(null);
    transposedTriplet[0] = { r: triplet[0].c, c: triplet[0].r, val: numTerms, isHeader: true };

    const steps = [];
    let currentB = 1;

    steps.push({
      title: "Simple Transpose: Setup",
      desc: `Simple Transpose will scan all ${numTerms} terms ${numCols} separate times (once for each column c = 0..${numCols - 1}).`,
      activeCol: null,
      activeOriginalIdx: null,
      activeDestIdx: null,
      transposed: Array(numTerms + 1).fill(null),
      codeSnippet: `for (c = 0; c < numCols; c++) {\n    for (i = 1; i <= numTerms; i++) ...\n}`,
    });

    for (let c = 0; c < numCols; c++) {
      for (let i = 1; i <= numTerms; i++) {
        const orig = triplet[i];
        const isMatch = orig.c === c;

        if (isMatch) {
          transposedTriplet[currentB] = {
            r: orig.c,
            c: orig.r,
            val: orig.val,
          };
          steps.push({
            title: `Col Pass ${c}: Match Found at Term #${i} (Val: ${orig.val})`,
            desc: `Term #${i} matches Column ${c}! Placed into next available transpose slot b[${currentB}] as (${orig.c}, ${orig.r}, ${orig.val}).`,
            activeCol: c,
            activeOriginalIdx: i,
            activeDestIdx: currentB,
            transposed: [...transposedTriplet],
            codeSnippet: `if (a[${i}].col == ${c}) {\n    b[${currentB}].row = ${orig.c}; b[${currentB}].col = ${orig.r}; b[${currentB}].val = ${orig.val};\n    currentB++;\n}`,
          });
          currentB++;
        } else {
          steps.push({
            title: `Col Pass ${c}: Scanning Term #${i} (Col ${orig.c} ≠ ${c})`,
            desc: `Term #${i} has column ${orig.c} (not ${c}) → Skipped.`,
            activeCol: c,
            activeOriginalIdx: i,
            activeDestIdx: null,
            transposed: [...transposedTriplet],
            codeSnippet: `// Searching for column ${c}... a[${i}].col is ${orig.c} (No match)`,
          });
        }
      }
    }

    steps.push({
      title: "Simple Transpose Complete",
      desc: `Completed in O(Cols × NonZero) = O(${numCols} × ${numTerms}) = ${numCols * numTerms} total inner-loop comparisons.`,
      activeCol: null,
      activeOriginalIdx: null,
      activeDestIdx: null,
      transposed: [...transposedTriplet],
      codeSnippet: `// Simple Transpose finished in O(Cols * NonZero)`,
      isFinal: true,
    });

    return { steps };
  }, [triplet]);

  // Active steps collection based on selected algorithm
  const activeSimulation = transposeAlgo === "fast" ? fastTransposeSimulation : simpleTransposeSimulation;
  const currentStepData = activeSimulation.steps[animStep] || activeSimulation.steps[0];

  // Auto-play timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setAnimStep((prev) => {
          if (prev < activeSimulation.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, animSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, animSpeed, activeSimulation.steps.length]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Matrix Cell Modification Handlers
  const handleCellClick = (r, c) => {
    setSelectedCell({ r, c });
    setCellInputVal(matrix[r][c].toString());
  };

  const handleUpdateCellValue = () => {
    const val = parseInt(cellInputVal, 10);
    if (isNaN(val)) return;
    setMatrix((prev) => {
      const newM = prev.map((row) => [...row]);
      newM[selectedCell.r][selectedCell.c] = val;
      return newM;
    });
    setAnimStep(0);
    setIsPlaying(false);
  };

  const handlePresetMatrix = (type) => {
    setAnimStep(0);
    setIsPlaying(false);
    if (type === "sparse") {
      setMatrix(INITIAL_MATRIX);
    } else if (type === "diagonal") {
      setMatrix([
        [15,  0,  0,  0,  0],
        [ 0, 25,  0,  0,  0],
        [ 0,  0, 35,  0,  0],
        [ 0,  0,  0, 45,  0]
      ]);
    } else if (type === "random") {
      const newM = Array.from({ length: 4 }, () => Array(5).fill(0));
      let count = 0;
      while (count < 5) {
        const rr = Math.floor(Math.random() * 4);
        const cc = Math.floor(Math.random() * 5);
        if (newM[rr][cc] === 0) {
          newM[rr][cc] = Math.floor(Math.random() * 80 + 10);
          count++;
        }
      }
      setMatrix(newM);
    } else if (type === "empty") {
      setMatrix(Array.from({ length: 4 }, () => Array(5).fill(0)));
    }
  };

  // Reconstruct Transposed 2D Matrix from current animated state
  const transposed2DMatrix = useMemo(() => {
    const tRows = cols;
    const tCols = rows;
    const res = Array.from({ length: tRows }, () => Array(tCols).fill(0));

    if (currentStepData.transposed) {
      for (let i = 1; i < currentStepData.transposed.length; i++) {
        const item = currentStepData.transposed[i];
        if (item) {
          res[item.r][item.c] = item.val;
        }
      }
    }
    return res;
  }, [cols, rows, currentStepData.transposed]);

  // Memory Metrics
  const totalElements = rows * cols;
  const zeroCount = totalElements - numNonZero;
  const sparsityPercent = ((zeroCount / totalElements) * 100).toFixed(1);
  const denseMemoryBytes = totalElements * 4; // 4 bytes per int
  const tripletMemoryBytes = (numNonZero + 1) * 3 * 4; // 3 ints per term + 1 header term
  const memorySavedBytes = denseMemoryBytes - tripletMemoryBytes;
  const memoryEfficiency = (100 - (tripletMemoryBytes / denseMemoryBytes) * 100).toFixed(1);

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0.99;
          transform: translateY(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* SECTION 1: HEADER & METADATA */}
        <header ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Segment 1 · Topic 3</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Sparse Matrix Representation: 3-Tuple (Row, Column, Value) &amp; Fast Transpose Algorithm
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Architectural visualization studio for Sparse Matrix representations (3-Tuple COO, Linked Lists, CSR), Sparsity metrics, Simple Transpose O(Cols × NonZero) vs Fast Transpose O(Cols + NonZero), and prefix-sum bucket positioning.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-103</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 1.5: FORMAL DEFINITION & MATHEMATICAL FOUNDATIONS */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/40 border border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl">
                📐
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-300">
                  What is a Sparse Matrix? (Formal Definition &amp; Mathematical Foundations)
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Standard Definition, Density vs. Sparsity Ratios &amp; Storage Efficiency Invariants
                </p>
              </div>
            </div>

            {/* Core Definition Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                    <span>📖</span> Definition in Plain English &amp; Formal Terms:
                  </h3>
                  
                  <p className="text-slate-200">
                    A <strong className="text-cyan-300 text-base">Sparse Matrix</strong> is any two-dimensional grid of numbers where the <b>vast majority of entries are ZERO (0)</b>, and only a tiny fraction of cells contain meaningful non-zero data.
                  </p>

                  <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 font-mono text-xs text-cyan-300 space-y-1 text-center">
                    <div className="font-bold text-amber-300">
                      Count of Zero Elements ≫ Count of Non-Zero Elements (K)
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      K ≪ (Total Rows M × Total Columns N)
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">
                    Conversely, a matrix where most elements are filled with non-zero numbers is called a <strong className="text-slate-200">Dense Matrix</strong>. In software engineering, a matrix is officially treated as <b>Sparse</b> when its zero content exceeds <b>70% to 80%</b>.
                  </p>
                </div>
              </div>

              {/* Mathematical Metrics Callout */}
              <div className="lg:col-span-4 space-y-3">
                <div className="p-5 rounded-3xl bg-slate-950/90 border border-indigo-500/30 space-y-3 font-mono text-xs">
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📊</span> Exact Mathematical Formulas:
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 block font-sans">1. Sparsity Ratio (Percentage of 0s):</span>
                    <span className="text-amber-300 font-bold block text-xs">
                      Sparsity = (Zero Count / (M × N)) × 100%
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 block font-sans">2. Density Ratio (Percentage of Data):</span>
                    <span className="text-emerald-300 font-bold block text-xs">
                      Density = (Non-Zero [K] / (M × N)) × 100%
                    </span>
                    <span className="text-[10px] text-slate-500 block font-sans mt-0.5">
                      Invariant: Sparsity + Density = 100%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side-by-Side Visual Comparison: Dense Matrix vs Sparse Matrix */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block font-mono">
                🔍 Side-by-Side Visual Contrast: Dense Matrix vs. Sparse Matrix (4 × 4)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dense Matrix Visual Example */}
                <div className="p-4 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300">1. DENSE MATRIX (87.5% Numbers, 12.5% Zeros)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60">Standard 2D Array is OK</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-1.5 font-mono text-center text-xs max-w-xs mx-auto">
                    {[
                      [12, 8, 0, 45],
                      [33, 19, 72, 5],
                      [91, 0, 14, 28],
                      [64, 55, 39, 81]
                    ].map((rowArr, r) => rowArr.map((v, c) => (
                      <div key={`${r}-${c}`} className={`p-2 rounded-xl border ${v === 0 ? "bg-slate-950 text-slate-700 border-slate-850" : "bg-rose-950/30 text-rose-200 border-rose-800/40 font-bold"}`}>
                        {v}
                      </div>
                    )))}
                  </div>
                  <p className="text-[11px] text-slate-400 text-center font-sans">
                    Most cells hold values. Standard <code>int A[4][4]</code> is optimal here.
                  </p>
                </div>

                {/* Sparse Matrix Visual Example */}
                <div className="p-4 rounded-3xl bg-slate-950/90 border border-cyan-500/40 space-y-3 shadow-lg shadow-cyan-950/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300">2. SPARSE MATRIX (81.25% Zeros, 18.75% Numbers)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">Needs 3-Tuple / CSR!</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-1.5 font-mono text-center text-xs max-w-xs mx-auto">
                    {[
                      [0, 50, 0, 0],
                      [0, 0, 0, 90],
                      [0, 0, 0, 0],
                      [25, 0, 0, 0]
                    ].map((rowArr, r) => rowArr.map((v, c) => (
                      <div key={`${r}-${c}`} className={`p-2 rounded-xl border ${v === 0 ? "bg-slate-950 text-slate-700 border-slate-850" : "bg-emerald-950/80 text-emerald-300 border-emerald-400 font-bold scale-105 shadow-md shadow-emerald-950"}`}>
                        {v}
                      </div>
                    )))}
                  </div>
                  <p className="text-[11px] text-emerald-300 text-center font-sans font-semibold">
                    13 of 16 cells are dead zeros! 3-Tuple stores only 3 triplets <code>(r, c, val)</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Standard 2D Arrays Fail (The 4 Fatal Flaws) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Why Standard 2D Arrays Fail for Sparse Matrices:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-rose-950/60 space-y-1.5">
                  <span className="font-bold text-rose-300 block">1. Massive RAM Waste</span>
                  <p className="text-slate-400 leading-relaxed">
                    Storing a 100,000×100,000 array takes <b>40 GB RAM</b> just to hold empty zeros (O(M × N) space).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-950/60 space-y-1.5">
                  <span className="font-bold text-amber-300 block">2. Wasted CPU Cycles</span>
                  <p className="text-slate-400 leading-relaxed">
                    Matrix algorithms spend 99.9% of clock cycles computing useless <code>0 * x = 0</code> multiplications.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-sky-950/60 space-y-1.5">
                  <span className="font-bold text-sky-300 block">3. CPU Cache Trashing</span>
                  <p className="text-slate-400 leading-relaxed">
                    Loading 64-byte L1 cache lines filled with dead zeros causes severe prefetch stalls and cache misses.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-950/60 space-y-1.5">
                  <span className="font-bold text-emerald-300 block">4. 3-Tuple Solution</span>
                  <p className="text-slate-400 leading-relaxed">
                    Stores only (K + 1) non-zero triplets, slashing memory to <b>O(K) linear space</b> and skipping zeros!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: TEACHER'S DESK */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: Physical Intuition &amp; Why Sparse Matrices Matter
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Classroom Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Elaborated Metaphor & Physical Intuition */}
              <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base sm:text-lg border-b border-slate-800 pb-3">
                  <span>💡</span>
                  <span>The Reality of Big Data: Empty Vastness in Silicon Memory</span>
                </div>

                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    In theoretical mathematics, a matrix is often imagined as a solid, vibrant grid packed with numbers. But in the <b>physical reality of modern computer science and artificial intelligence</b>, data is not a dense solid—it is an <b>almost completely empty, cosmic void</b>.
                  </p>

                  <p>
                    Why? Because in the real universe, <i>everything is disconnected from almost everything else</i>. A person does not know all 8 billion people on Earth; they have 200 friends. A web page does not link to all 50 billion websites; it links to 25 URLs. A Netflix subscriber does not rate all 500,000 movies; they rate 80 movies. When you represent these relationships in a 2D matrix, <b>over 99.9% to 99.9999% of all grid cells are DEAD ZEROS</b>.
                  </p>
                </div>

                {/* Big Data Case Studies Table */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block font-mono">
                    📊 Real-World Big Data Scale: Dense Allocation vs. Sparse Reality
                  </span>
                  
                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">
                    <table className="w-full text-xs text-left font-mono">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="px-4 py-2.5 text-cyan-300">Domain / System</th>
                          <th className="px-4 py-2.5 text-slate-300">Matrix Scale (M × N)</th>
                          <th className="px-4 py-2.5 text-rose-400">Dense 2D RAM</th>
                          <th className="px-4 py-2.5 text-emerald-400">Sparse 3-Tuple RAM</th>
                          <th className="px-4 py-2.5 text-amber-300">Sparsity (% 0s)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70 text-slate-300">
                        <tr className="hover:bg-slate-850/50">
                          <td className="px-4 py-2.5 font-bold text-sky-300">Google Web PageRank</td>
                          <td className="px-4 py-2.5">50 Billion × 50 Billion</td>
                          <td className="px-4 py-2.5 font-bold text-rose-400">10,000 Exabytes 💀</td>
                          <td className="px-4 py-2.5 font-bold text-emerald-400">~21 Terabytes ⚡</td>
                          <td className="px-4 py-2.5 text-amber-400 font-bold">99.9999999%</td>
                        </tr>
                        <tr className="hover:bg-slate-850/50">
                          <td className="px-4 py-2.5 font-bold text-sky-300">Netflix Movie Recommender</td>
                          <td className="px-4 py-2.5">250 Million × 500,000</td>
                          <td className="px-4 py-2.5 font-bold text-rose-400">500 Terabytes 💀</td>
                          <td className="px-4 py-2.5 font-bold text-emerald-400">~300 Gigabytes ⚡</td>
                          <td className="px-4 py-2.5 text-amber-400 font-bold">99.98%</td>
                        </tr>
                        <tr className="hover:bg-slate-850/50">
                          <td className="px-4 py-2.5 font-bold text-sky-300">Facebook Social Graph</td>
                          <td className="px-4 py-2.5">3 Billion × 3 Billion</td>
                          <td className="px-4 py-2.5 font-bold text-rose-400">36 Petabytes 💀</td>
                          <td className="px-4 py-2.5 font-bold text-emerald-400">~10.8 Gigabytes ⚡</td>
                          <td className="px-4 py-2.5 text-amber-400 font-bold">99.99999%</td>
                        </tr>
                        <tr className="hover:bg-slate-850/50">
                          <td className="px-4 py-2.5 font-bold text-sky-300">LLM NLP Token Embedding</td>
                          <td className="px-4 py-2.5">10 Million × 100,000</td>
                          <td className="px-4 py-2.5 font-bold text-rose-400">4 Terabytes 💀</td>
                          <td className="px-4 py-2.5 font-bold text-emerald-400">~12 Gigabytes ⚡</td>
                          <td className="px-4 py-2.5 text-amber-400 font-bold">99.7%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Microscopic Silicon Physics Breakdown */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block font-mono">
                    🔬 The Microscopic Silicon Hardware Tragedy: What Happens Inside the CPU?
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <span>⚡</span>
                        <span>1. 64-Byte Cache Line Choke</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        CPUs fetch data in <b>64-byte hardware cache lines</b> (16 four-byte integers). If 15 out of 16 entries are zeros, <b>93.75% of memory bus bandwidth</b> is wasted carrying worthless electrical ground voltage.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🔋</span>
                        <span>2. Megawatt DRAM Energy Drain</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        In hyperscale data centers, holding and refreshing billions of empty zero-state capacitor cells in volatile DRAM consumes megawatts of electricity, heating up server racks for <b>zero informational value</b>.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>🚀</span>
                        <span>3. O(K) Algorithmic Triumph</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        Compressing to <b>3-Tuple / CSR</b> discards the void entirely. Matrix algorithms operate strictly on non-zero terms (K), transforming intractable operations from days to sub-second real-time execution!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Classroom Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Barrackpore Lab Classroom Discussion
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p>
                    <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why can't we simply swap `row` and `col` coordinates `(c, r, val)` to transpose a 3-Tuple matrix?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Because in 3-Tuple format, the array MUST stay strictly sorted in <b>Row-Major Order</b> (by row index first, then column index)! If you merely swap `row` and `col`, the resulting tuple array is sorted by its old row indices rather than its new row indices."</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Tuhina:</strong> <em>"So Simple Transpose scans the entire 3-tuple array C times (O(Cols × NonZero)), but how does Fast Transpose achieve linear time O(Cols + NonZero)?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Fast Transpose uses the genius of <b>Prefix Sums (Counting Sort)</b>! In one fast pass, it counts how many elements belong to each column (`total[]`), computes their exact target slot indices (`starting_pos[]`), and places every non-zero term directly into its final slot in a single pass!"</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE SPARSE MATRIX & FAST TRANSPOSE STUDIO */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            
            {/* Studio Header & Metrics */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive Sparse Matrix &amp; Transpose Studio
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Side-by-Side 2D Matrix vs 3-Tuple (COO) mapping, CSR, Linked Lists &amp; Animated Transpose Engine
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                  Size: <strong className="text-white">{rows} × {cols} ({totalElements} cells)</strong>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300">
                  Non-Zero (NZ): <strong className="text-white">{numNonZero}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300">
                  Sparsity: <strong className="text-white">{sparsityPercent}%</strong>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-sky-300">
                  RAM Savings: <strong className="text-white">{memoryEfficiency}%</strong>
                </div>
              </div>
            </div>

            {/* Top Toolbar: Presets & Format Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-medium mr-1">Presets:</span>
                <button
                  onClick={() => handlePresetMatrix("sparse")}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-semibold transition cursor-pointer"
                >
                  Standard Sparse
                </button>
                <button
                  onClick={() => handlePresetMatrix("diagonal")}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-800 text-xs font-semibold transition cursor-pointer"
                >
                  Diagonal
                </button>
                <button
                  onClick={() => handlePresetMatrix("random")}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800 text-xs font-semibold transition cursor-pointer"
                >
                  🎲 Random
                </button>
                <button
                  onClick={() => handlePresetMatrix("empty")}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 text-xs font-semibold transition cursor-pointer"
                >
                  Clear (All 0s)
                </button>
              </div>

              {/* Format Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
                <span className="text-[11px] text-slate-400 px-2 font-medium">Format:</span>
                <button
                  onClick={() => setRepFormat("triplet")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    repFormat === "triplet"
                      ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  📋 3-Tuple (COO)
                </button>
                <button
                  onClick={() => setRepFormat("csr")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    repFormat === "csr"
                      ? "bg-indigo-500/25 text-indigo-200 border border-indigo-400/40 shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  📦 CSR Format
                </button>
                <button
                  onClick={() => setRepFormat("linked")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    repFormat === "linked"
                      ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  🔗 Linked List
                </button>
              </div>
            </div>

            {/* STAGE 1: DUAL REPRESENTATION (2D Matrix on Left, Selected Sparse Format on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              
              {/* Left Column: Interactive 2D Matrix Card */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                      <span>🧱</span>
                      <span>Original 2D Matrix A [{rows} × {cols}]</span>
                    </h3>
                    <span className="text-[11px] text-slate-400">Click any cell to edit or toggle value</span>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
                    {denseMemoryBytes} Bytes
                  </span>
                </div>

                {/* Grid with Column & Row Headers */}
                <div className="flex flex-col items-center justify-center p-2">
                  <div className="space-y-2">
                    {/* Top Column Labels (C0, C1, C2, C3, C4) */}
                    <div className="flex items-center gap-2 pl-8 font-mono text-[11px] text-slate-500">
                      {Array.from({ length: cols }, (_, cIdx) => (
                        <div key={cIdx} className="w-12 text-center font-bold text-sky-400/80">
                          C{cIdx}
                        </div>
                      ))}
                    </div>

                    {/* Matrix Rows */}
                    {matrix.map((rowArr, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2">
                        {/* Row Label (R0, R1, R2, R3) */}
                        <div className="w-6 font-mono text-[11px] font-bold text-cyan-400/80 text-right">
                          R{rIdx}
                        </div>

                        {/* Cells in Row */}
                        <div className="flex items-center gap-2">
                          {rowArr.map((val, cIdx) => {
                            const isNonZero = val !== 0;
                            const isSelected = selectedCell.r === rIdx && selectedCell.c === cIdx;
                            const isCurrentActive =
                              currentStepData.activeOriginalIdx &&
                              triplet[currentStepData.activeOriginalIdx]?.r === rIdx &&
                              triplet[currentStepData.activeOriginalIdx]?.c === cIdx;

                            return (
                              <button
                                key={cIdx}
                                onClick={() => handleCellClick(rIdx, cIdx)}
                                className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center border font-mono transition-all duration-200 cursor-pointer shadow-inner ${
                                  isSelected
                                    ? "ring-2 ring-cyan-400 border-cyan-400 bg-cyan-950/80 scale-105"
                                    : isCurrentActive
                                    ? "ring-2 ring-amber-400 border-amber-400 bg-amber-950/80 scale-105 animate-pulse"
                                    : isNonZero
                                    ? "bg-slate-900/90 border-cyan-500/60 text-cyan-200 hover:border-cyan-400 shadow-md shadow-cyan-950/50"
                                    : "bg-slate-950 border-slate-850 text-slate-700 hover:border-slate-750"
                                }`}
                              >
                                <span className={`text-sm font-bold ${isNonZero ? "text-cyan-300" : "text-slate-700"}`}>
                                  {val}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cell Edit Bar */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400">Selected Cell:</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-cyan-300 font-bold">
                      A[{selectedCell.r}][{selectedCell.c}]
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={cellInputVal}
                      onChange={(e) => setCellInputVal(e.target.value)}
                      className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={handleUpdateCellValue}
                      className="px-3.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition cursor-pointer shadow-md"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Selected Representation Format */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg min-h-[340px]">
                
                {/* 1. 3-Tuple (COO) Table View */}
                {repFormat === "triplet" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                          <span>📋</span>
                          <span>3-Tuple Array Representation <code>a[]</code></span>
                        </h3>
                        <span className="text-[11px] text-slate-400">Header at Index [0] + Non-Zero Coordinates</span>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
                        {tripletMemoryBytes} Bytes
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 max-h-[250px] overflow-y-auto">
                      <table className="w-full text-xs text-left font-mono">
                        <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 sticky top-0">
                          <tr>
                            <th className="px-3.5 py-2 w-16 text-slate-500">Index</th>
                            <th className="px-3.5 py-2 w-20 text-cyan-400">Row (i)</th>
                            <th className="px-3.5 py-2 w-20 text-sky-400">Col (j)</th>
                            <th className="px-3.5 py-2 w-24 text-emerald-400">Value</th>
                            <th className="px-3.5 py-2 text-slate-400">Role / Invariant</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {triplet.map((t, idx) => {
                            const isCurrentActive = currentStepData.activeOriginalIdx === idx;
                            return (
                              <tr
                                key={idx}
                                className={`transition-colors ${
                                  isCurrentActive
                                    ? "bg-amber-500/25 text-amber-200 font-bold"
                                    : t.isHeader
                                    ? "bg-indigo-950/40 text-indigo-300 font-semibold"
                                    : "hover:bg-slate-850/60 text-slate-300"
                                }`}
                              >
                                <td className="px-3.5 py-2 font-bold text-slate-500">[{idx}]</td>
                                <td className="px-3.5 py-2 font-semibold text-cyan-300">{t.r}</td>
                                <td className="px-3.5 py-2 font-semibold text-sky-300">{t.c}</td>
                                <td className="px-3.5 py-2 font-bold text-emerald-300">{t.val}</td>
                                <td className="px-3.5 py-2 text-[11px] text-slate-400 font-sans">
                                  {t.isHeader
                                    ? `Header: ${t.r} Rows, ${t.c} Cols, ${t.val} Non-Zeros`
                                    : `Non-zero term at (${t.r}, ${t.c})`}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. CSR (Compressed Sparse Row) View */}
                {repFormat === "csr" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                          <span>📦</span>
                          <span>Compressed Sparse Row (CSR) 3-Array Model</span>
                        </h3>
                        <span className="text-[11px] text-slate-400">values + col_indices + row_ptr</span>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-indigo-300">
                        Modern ML Standard
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                        <span className="text-slate-400 text-[11px] font-semibold">1. values[] (Non-Zero Elements):</span>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {csr.values.map((v, i) => (
                            <span key={i} className="px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-bold">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                        <span className="text-slate-400 text-[11px] font-semibold">2. col_indices[] (Column index for each value):</span>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {csr.colIndices.map((c, i) => (
                            <span key={i} className="px-3 py-1 rounded-xl bg-sky-950/80 text-sky-300 border border-sky-700/60 font-bold">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                        <span className="text-slate-400 text-[11px] font-semibold">3. row_ptr[] (Slice offset per row in values array):</span>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {csr.rowPtr.map((p, i) => (
                            <span key={i} className="px-3 py-1 rounded-xl bg-indigo-950/80 text-indigo-300 border border-indigo-700/60 font-bold">
                              R{i}: {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Linked Representation View */}
                {repFormat === "linked" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                          <span>🔗</span>
                          <span>Array of Linked Lists Representation</span>
                        </h3>
                        <span className="text-[11px] text-slate-400">1 Singly Linked List per Matrix Row</span>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
                        Dynamic Growth
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-[250px] overflow-y-auto font-mono text-xs">
                      {linkedRows.map((rList, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
                          <span className="px-2.5 py-1 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold shrink-0">
                            Row[{rIdx}]
                          </span>
                          <span className="text-slate-500 font-bold">→</span>
                          {rList.length > 0 ? (
                            rList.map((node, nIdx) => (
                              <React.Fragment key={nIdx}>
                                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/60 text-emerald-300 shrink-0 text-center shadow-md">
                                  <div className="text-[9px] text-slate-400">Col {node.c}</div>
                                  <div className="font-bold text-xs">{node.val}</div>
                                </div>
                                <span className="text-slate-600 font-bold">→</span>
                              </React.Fragment>
                            ))
                          ) : (
                            <span className="text-slate-500 italic text-xs">empty (all 0s) →</span>
                          )}
                          <span className="text-rose-400 font-bold text-xs bg-rose-950/60 px-2.5 py-1 rounded-xl border border-rose-800/60">
                            NULL
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* STAGE 2: TRANSPOSITION SIMULATION & DUAL RESULT DISPLAY */}
            <div className="space-y-5 pt-6 border-t border-slate-800">
              
              {/* Toolbar: Algorithm Selection & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium mr-1">Algorithm:</span>
                  <button
                    onClick={() => {
                      setTransposeAlgo("fast");
                      setAnimStep(0);
                      setIsPlaying(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      transposeAlgo === "fast"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                    }`}
                  >
                    ⚡ Fast Transpose O(Cols + NonZero)
                  </button>
                  <button
                    onClick={() => {
                      setTransposeAlgo("simple");
                      setAnimStep(0);
                      setIsPlaying(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      transposeAlgo === "simple"
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                    }`}
                  >
                    🐢 Simple Transpose O(Cols × NonZero)
                  </button>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (animStep >= activeSimulation.steps.length - 1) setAnimStep(0);
                      setIsPlaying(!isPlaying);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md ${
                      isPlaying
                        ? "bg-amber-500 text-slate-950 shadow-amber-500/20"
                        : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/25"
                    }`}
                  >
                    <span>{isPlaying ? "⏸️ Pause" : "▶️ Play Transpose"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setAnimStep((prev) => Math.min(prev + 1, activeSimulation.steps.length - 1));
                    }}
                    disabled={animStep >= activeSimulation.steps.length - 1}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                  >
                    ⏭️ Step
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setAnimStep((prev) => Math.max(prev - 1, 0));
                    }}
                    disabled={animStep === 0}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                  >
                    ⏮️ Prev
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setAnimStep(0);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs border border-slate-800 transition cursor-pointer"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>

              {/* Current Step Instruction Banner */}
              <div className="bg-slate-950 border border-cyan-500/40 rounded-3xl p-5 space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <span>📍</span>
                    <span>{currentStepData.title}</span>
                  </h4>
                  <span className="text-[11px] font-mono px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-semibold">
                    Step {animStep + 1} / {activeSimulation.steps.length}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {currentStepData.desc}
                </p>
                <div className="bg-slate-900/95 rounded-2xl p-3 font-mono text-xs text-emerald-400 border border-slate-800">
                  <code>{currentStepData.codeSnippet}</code>
                </div>
              </div>

              {/* Fast Transpose Auxiliary Arrays (total[] and starting_pos[]) */}
              {transposeAlgo === "fast" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 1. Frequency Array: total[col] */}
                  <div className="bg-slate-950/90 rounded-3xl p-4 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        1. Column Frequency Count: <code>total[col]</code>
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Elements per column</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 font-mono text-center">
                      {currentStepData.totalArr?.map((cnt, cIdx) => (
                        <div
                          key={cIdx}
                          className={`p-2.5 rounded-2xl border transition-all ${
                            currentStepData.activeCol === cIdx
                              ? "bg-amber-500/25 border-amber-400 text-amber-200 scale-105 shadow-md shadow-amber-950"
                              : "bg-slate-900 border-slate-800 text-slate-300"
                          }`}
                        >
                          <div className="text-[10px] text-slate-500 font-bold">Col {cIdx}</div>
                          <div className="text-base font-bold text-amber-300 mt-0.5">{cnt}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Starting Position Array: starting_pos[col] */}
                  <div className="bg-slate-950/90 rounded-3xl p-4 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                        2. Prefix-Sum Positions: <code>starting_pos[col]</code>
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Target index in transposed array</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 font-mono text-center">
                      {currentStepData.posArr?.map((pos, cIdx) => (
                        <div
                          key={cIdx}
                          className={`p-2.5 rounded-2xl border transition-all ${
                            currentStepData.activeCol === cIdx
                              ? "bg-sky-500/25 border-sky-400 text-sky-200 scale-105 shadow-md shadow-sky-950"
                              : "bg-slate-900 border-slate-800 text-slate-300"
                          }`}
                        >
                          <div className="text-[10px] text-slate-500 font-bold">Col {cIdx}</div>
                          <div className="text-base font-bold text-sky-300 mt-0.5">{pos}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TRANSPOSED RESULTS: Transposed 3-Tuple Array b[] + Resulting 2D Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Transposed 3-Tuple Array b[] */}
                <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                        <span>📋</span>
                        <span>Transposed 3-Tuple Array <code>b[]</code></span>
                      </h3>
                      <span className="text-[11px] text-slate-400">Strictly Sorted in Row-Major Order!</span>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
                      {cols} Rows × {rows} Cols
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {currentStepData.transposed.map((t, idx) => {
                      const isTargetSlot = currentStepData.activeDestIdx === idx;
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-2xl border transition-all font-mono text-center flex flex-col justify-between ${
                            isTargetSlot
                              ? "bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400 scale-105 shadow-xl shadow-emerald-950"
                              : t
                              ? "bg-slate-900/90 border-slate-700 text-slate-200"
                              : "bg-slate-950/50 border-slate-850 text-slate-700 border-dashed"
                          }`}
                        >
                          <div className="text-[10px] text-slate-500 font-bold">Slot [{idx}]</div>
                          {t ? (
                            <div className="my-1">
                              <div className="text-base font-bold text-emerald-300">{t.val}</div>
                              <div className="text-[11px] text-cyan-300 font-semibold mt-0.5">
                                ({t.r}, {t.c})
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-700 my-2 font-sans italic">empty</div>
                          )}
                          <div className="text-[9px] text-slate-500 font-sans">
                            {idx === 0 ? "Header" : t ? `Term #${idx}` : "Pending"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Resulting Transposed 2D Matrix (5 x 4) */}
                <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                        <span>🔄</span>
                        <span>Transposed Matrix A<sup>T</sup> [{cols} × {rows}]</span>
                      </h3>
                      <span className="text-[11px] text-slate-400">Reconstructed 2D Visual Grid</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-2">
                    <div className="space-y-2">
                      {/* Top Column Labels for Transposed Matrix (C0, C1, C2, C3) */}
                      <div className="flex items-center gap-2 pl-8 font-mono text-[11px] text-slate-500">
                        {Array.from({ length: rows }, (_, cIdx) => (
                          <div key={cIdx} className="w-12 text-center font-bold text-emerald-400/80">
                            C{cIdx}
                          </div>
                        ))}
                      </div>

                      {/* Transposed Matrix Rows (5 rows) */}
                      {transposed2DMatrix.map((rowArr, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-2">
                          <div className="w-6 font-mono text-[11px] font-bold text-cyan-400/80 text-right">
                            R{rIdx}
                          </div>

                          <div className="flex items-center gap-2">
                            {rowArr.map((val, cIdx) => {
                              const isNonZero = val !== 0;
                              return (
                                <div
                                  key={cIdx}
                                  className={`w-12 h-10 rounded-xl flex items-center justify-center border font-mono transition-all ${
                                    isNonZero
                                      ? "bg-slate-900/90 border-emerald-500/70 text-emerald-200 shadow-md shadow-emerald-950/50"
                                      : "bg-slate-950 border-slate-850 text-slate-700"
                                  }`}
                                >
                                  <span className={`text-sm font-bold ${isNonZero ? "text-emerald-300" : "text-slate-700"}`}>
                                    {val}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Memory & Storage Comparison Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/30 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
              <div className="space-y-1.5">
                <span className="text-slate-400 font-medium block">Standard 2D Array RAM:</span>
                <span className="font-mono text-lg font-bold text-rose-300">{denseMemoryBytes} Bytes</span>
                <span className="text-[10px] text-slate-500 block">{rows}×{cols} × 4B = {denseMemoryBytes}B</span>
              </div>
              <div className="space-y-1.5">
                <span className="text-slate-400 font-medium block">3-Tuple (COO) Storage:</span>
                <span className="font-mono text-lg font-bold text-emerald-300">{tripletMemoryBytes} Bytes</span>
                <span className="text-[10px] text-slate-500 block">({numNonZero} + 1) × 3 × 4B = {tripletMemoryBytes}B</span>
              </div>
              <div className="space-y-1.5">
                <span className="text-slate-400 font-medium block">Memory Compression Gain:</span>
                <span className="font-mono text-lg font-bold text-cyan-300">{memorySavedBytes} Bytes ({memoryEfficiency}%)</span>
                <span className="text-[10px] text-slate-500 block">Sparsity: {sparsityPercent}% Zeros</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DEEP TECHNICAL EXPLANATION & ARCHITECTURAL INVARIANTS */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <span>📚</span> Deep Technical Breakdown &amp; Algorithmic Invariants
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: 3-Tuple Format */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <span>1️⃣</span> 3-Tuple (Coordinate List - COO) Invariants
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The 3-Tuple structure stores only non-zero entries. Index 0 serves as the structural metadata header, while subsequent rows record coordinates and values in strict row-major order:
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside font-mono">
                <li><code>triplet[0] = &#123; total_rows, total_cols, non_zero_count &#125;</code></li>
                <li><code>triplet[i] = &#123; row_i, col_i, value &#125;</code> where <code>value ≠ 0</code></li>
                <li>Strict Invariant: <code>triplet[i].row &lt; triplet[i+1].row</code> or <code>(triplet[i].row == triplet[i+1].row &amp;&amp; triplet[i].col &lt; triplet[i+1].col)</code>.</li>
              </ul>
            </div>

            {/* Card 2: Simple vs Fast Transpose */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                <span>2️⃣</span> Simple Transpose vs Fast Transpose Algorithms
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Transposing a sparse matrix requires producing a new 3-tuple array sorted by the new row indices (original column indices):
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-amber-300 font-bold block">Simple Transpose: O(Cols × NonZero)</span>
                  <span className="text-slate-400">Scans all non-zero terms Cols times looking for column 0, then 1, ..., C-1. Extremely slow for matrices with large column counts.</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-emerald-300 font-bold block">Fast Transpose: O(Cols + NonZero)</span>
                  <span className="text-slate-400">Uses prefix-sum starting positions to directly insert each tuple into its exact destination slot in a single linear pass.</span>
                </div>
              </div>
            </div>

            {/* Card 3: Prefix Sum Mechanics */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>3️⃣</span> Prefix-Sum Frequency Indexing Mechanics
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The core genius of Fast Transpose lies in two auxiliary integer arrays:
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside font-mono">
                <li><strong className="text-amber-300">total[c]:</strong> Frequency count of non-zero elements in column <code>c</code>. Computed in O(NonZero) time.</li>
                <li><strong className="text-sky-300">starting_pos[c]:</strong> <code>starting_pos[0] = 1; starting_pos[c] = starting_pos[c-1] + total[c-1];</code>. Computed in O(Cols) time.</li>
                <li><strong className="text-emerald-300">Placement:</strong> <code>j = starting_pos[a[i].col]++; b[j] = ...</code> directly in O(1) per term.</li>
              </ul>
            </div>

            {/* Card 4: CSR and Industrial Applications */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                <span>4️⃣</span> Compressed Sparse Row (CSR) &amp; Industrial AI/ML
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Beyond 3-Tuple Coordinate list (COO), modern GPU libraries (NVIDIA cuSPARSE, PyTorch Sparse, SciPy) utilize <b>Compressed Sparse Row (CSR)</b> and <b>CSC</b>:
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                <li><b className="text-indigo-300">Graph Neural Networks (GNNs):</b> Adjacency matrices of social networks and molecular structures.</li>
                <li><b className="text-sky-300">Natural Language Processing (NLP):</b> Term-Document TF-IDF and high-dimensional sparse token embeddings.</li>
                <li><b className="text-emerald-300">Finite Element Analysis (FEA):</b> Structural stress-strain stiffness matrices in civil and aerospace engineering.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: RUNNABLE C CODE IMPLEMENTATION */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable Production C Implementation: Simple Transpose &amp; Fast Transpose
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="sparse_matrix_fast_transpose.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE STUDY NOTE */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10">
          <PlainTextPrint content={noteText} title="DSA Topic Note: Sparse Matrix 3-Tuple Representation and Fast Transpose Algorithm" />
        </section>

        {/* SECTION 8: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10">
          <Teacher />
        </section>
      </div>
    </>
  );
}
