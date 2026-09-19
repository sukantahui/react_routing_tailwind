import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Grid,
  RefreshCw,
  Sparkles,
  Layers,
  CheckCircle2,
  HelpCircle,
  Eye,
  Compass,
  Info
} from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import matrixDemoCode from "./topic3_files/MatrixSpiralAndRotationAlgorithmsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

// Spiral Traversal Data
const SPIRAL_GRID = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];

const SPIRAL_STEPS = [
  {
    step: 0,
    r: null,
    c: null,
    val: null,
    top: 0,
    bottom: 2,
    left: 0,
    right: 3,
    phase: "Ready to Traverse",
    desc: "Matrix boundaries set: top=0, bottom=2, left=0, right=3. Click 'Next Step' or 'Auto Play' to begin.",
    dir: null,
    output: [],
    highlightBound: "all"
  },
  {
    step: 1,
    r: 0,
    c: 0,
    val: 1,
    top: 0,
    bottom: 2,
    left: 0,
    right: 3,
    phase: "Top Row: Left → Right",
    desc: "Traversing top row (row = 0): visit matrix[0][0] = 1.",
    dir: "right",
    output: [1],
    highlightBound: "top"
  },
  {
    step: 2,
    r: 0,
    c: 1,
    val: 2,
    top: 0,
    bottom: 2,
    left: 0,
    right: 3,
    phase: "Top Row: Left → Right",
    desc: "Traversing top row (row = 0): visit matrix[0][1] = 2.",
    dir: "right",
    output: [1, 2],
    highlightBound: "top"
  },
  {
    step: 3,
    r: 0,
    c: 2,
    val: 3,
    top: 0,
    bottom: 2,
    left: 0,
    right: 3,
    phase: "Top Row: Left → Right",
    desc: "Traversing top row (row = 0): visit matrix[0][2] = 3.",
    dir: "right",
    output: [1, 2, 3],
    highlightBound: "top"
  },
  {
    step: 4,
    r: 0,
    c: 3,
    val: 4,
    top: 1,
    bottom: 2,
    left: 0,
    right: 3,
    phase: "Top Row Complete",
    desc: "Visiting matrix[0][3] = 4. Reached right boundary. Top boundary shrinks: top++ (top is now 1).",
    dir: "right",
    output: [1, 2, 3, 4],
    highlightBound: "top"
  },
  {
    step: 5,
    r: 1,
    c: 3,
    val: 8,
    top: 1,
    bottom: 2,
    left: 0,
    right: 3,
    phase: "Right Column: Top → Bottom",
    desc: "Traversing right column (col = 3): visit matrix[1][3] = 8.",
    dir: "down",
    output: [1, 2, 3, 4, 8],
    highlightBound: "right"
  },
  {
    step: 6,
    r: 2,
    c: 3,
    val: 12,
    top: 1,
    bottom: 2,
    left: 0,
    right: 2,
    phase: "Right Column Complete",
    desc: "Visiting matrix[2][3] = 12. Reached bottom boundary. Right boundary shrinks: right-- (right is now 2).",
    dir: "down",
    output: [1, 2, 3, 4, 8, 12],
    highlightBound: "right"
  },
  {
    step: 7,
    r: 2,
    c: 2,
    val: 11,
    top: 1,
    bottom: 2,
    left: 0,
    right: 2,
    phase: "Bottom Row: Right → Left",
    desc: "Guard check (top <= bottom: 1 <= 2) passed. Traverse bottom row (row = 2): visit matrix[2][2] = 11.",
    dir: "left",
    output: [1, 2, 3, 4, 8, 12, 11],
    highlightBound: "bottom"
  },
  {
    step: 8,
    r: 2,
    c: 1,
    val: 10,
    top: 1,
    bottom: 2,
    left: 0,
    right: 2,
    phase: "Bottom Row: Right → Left",
    desc: "Traversing bottom row (row = 2): visit matrix[2][1] = 10.",
    dir: "left",
    output: [1, 2, 3, 4, 8, 12, 11, 10],
    highlightBound: "bottom"
  },
  {
    step: 9,
    r: 2,
    c: 0,
    val: 9,
    top: 1,
    bottom: 1,
    left: 0,
    right: 2,
    phase: "Bottom Row Complete",
    desc: "Visiting matrix[2][0] = 9. Reached left boundary. Bottom boundary shrinks: bottom-- (bottom is now 1).",
    dir: "left",
    output: [1, 2, 3, 4, 8, 12, 11, 10, 9],
    highlightBound: "bottom"
  },
  {
    step: 10,
    r: 1,
    c: 0,
    val: 5,
    top: 1,
    bottom: 1,
    left: 1,
    right: 2,
    phase: "Left Column Complete",
    desc: "Guard check (left <= right: 0 <= 2) passed. Visit matrix[1][0] = 5. Left boundary shrinks: left++ (left is now 1).",
    dir: "up",
    output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5],
    highlightBound: "left"
  },
  {
    step: 11,
    r: 1,
    c: 1,
    val: 6,
    top: 1,
    bottom: 1,
    left: 1,
    right: 2,
    phase: "Inner Layer: Top Row",
    desc: "Inner spiral layer! (top <= bottom && left <= right: 1 <= 1 && 1 <= 2). Visit matrix[1][1] = 6.",
    dir: "right",
    output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6],
    highlightBound: "top"
  },
  {
    step: 12,
    r: 1,
    c: 2,
    val: 7,
    top: 2,
    bottom: 1,
    left: 1,
    right: 2,
    phase: "Traversal Finished! 🎉",
    desc: "Final element matrix[1][2] = 7 visited. Boundary top++ makes top = 2 (> bottom = 1). While loop terminates!",
    dir: "right",
    output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
    highlightBound: "none"
  }
];

// 90° Clockwise Rotation Stages
const ROTATE_STAGES = [
  {
    stage: 0,
    badge: "Stage 0",
    title: "Original Square Matrix (3 × 3)",
    sub: "Color-coded rows before rotation",
    matrix: [
      [{ val: 1, origRow: 0 }, { val: 2, origRow: 0 }, { val: 3, origRow: 0 }],
      [{ val: 4, origRow: 1 }, { val: 5, origRow: 1 }, { val: 6, origRow: 1 }],
      [{ val: 7, origRow: 2 }, { val: 8, origRow: 2 }, { val: 9, origRow: 2 }]
    ],
    desc: "Notice the three distinct colored rows: Row 0 (Sky Blue: [1, 2, 3]), Row 1 (Emerald: [4, 5, 6]), and Row 2 (Purple: [7, 8, 9]). In a 90° clockwise rotation, Row 0 must become Column 2, Row 1 must become Column 1, and Row 2 must become Column 0!",
    formula: "Input: int[][] matrix (strictly N × N)",
    swaps: [
      "Target: Row 0 [1, 2, 3] → New Column 2",
      "Target: Row 1 [4, 5, 6] → New Column 1",
      "Target: Row 2 [7, 8, 9] → New Column 0"
    ]
  },
  {
    stage: 1,
    badge: "Step 1",
    title: "Transpose Across Main Diagonal",
    sub: "Swap matrix[i][j] ↔ matrix[j][i] for all j > i",
    matrix: [
      [{ val: 1, origRow: 0 }, { val: 4, origRow: 1 }, { val: 7, origRow: 2 }],
      [{ val: 2, origRow: 0 }, { val: 5, origRow: 1 }, { val: 8, origRow: 2 }],
      [{ val: 3, origRow: 0 }, { val: 6, origRow: 1 }, { val: 9, origRow: 2 }]
    ],
    desc: "Main diagonal elements [1, 5, 9] remain untouched. Symmetric pairs across the diagonal are swapped: (0,1)[2] ↔ (1,0)[4], (0,2)[3] ↔ (2,0)[7], and (1,2)[6] ↔ (2,1)[8]. Rows have now turned into columns, but they are horizontally mirrored!",
    formula: "for (int i = 0; i < N; i++) for (int j = i + 1; j < N; j++) swap(matrix[i][j], matrix[j][i]);",
    swaps: [
      "Swap (0,1)[2] ↔ (1,0)[4]",
      "Swap (0,2)[3] ↔ (2,0)[7]",
      "Swap (1,2)[6] ↔ (2,1)[8]"
    ]
  },
  {
    stage: 2,
    badge: "Step 2",
    title: "Horizontal Row Reversal",
    sub: "Two-pointer swap across each row: left = 0, right = N - 1",
    matrix: [
      [{ val: 7, origRow: 2 }, { val: 4, origRow: 1 }, { val: 1, origRow: 0 }],
      [{ val: 8, origRow: 2 }, { val: 5, origRow: 1 }, { val: 2, origRow: 0 }],
      [{ val: 9, origRow: 2 }, { val: 6, origRow: 1 }, { val: 3, origRow: 0 }]
    ],
    desc: "Each individual row is reversed horizontally: Row 0 [1, 4, 7] → [7, 4, 1]; Row 1 [2, 5, 8] → [8, 5, 2]; Row 2 [3, 6, 9] → [9, 6, 3]. Notice: Original Row 0 ([1, 2, 3]) is now Column 2! Original Row 2 ([7, 8, 9]) is now Column 0! 90° Clockwise rotation is complete in strictly O(1) auxiliary memory!",
    formula: "for (int i = 0; i < N; i++) { int l = 0, r = N - 1; while (l < r) swap(matrix[i][l++], matrix[i][r--]); }",
    swaps: [
      "Row 0: Swap [0][0](1) ↔ [0][2](7)",
      "Row 1: Swap [1][0](2) ↔ [1][2](8)",
      "Row 2: Swap [2][0](3) ↔ [2][2](9)"
    ]
  }
];

export default function Topic3() {
  const [activeTab, setActiveTab] = useState("spiral"); // "spiral" | "rotation"
  const [spiralStep, setSpiralStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [rotateStage, setRotateStage] = useState(0);

  // Auto-play timer for spiral simulation
  useEffect(() => {
    let timer = null;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setSpiralStep((prev) => {
          if (prev >= SPIRAL_STEPS.length - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 950);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPlaying]);

  const currentSpiral = SPIRAL_STEPS[spiralStep];
  const currentRotation = ROTATE_STAGES[rotateStage];

  // Helper to get visited info for a spiral cell
  const getCellVisitedInfo = (r, c) => {
    for (let i = 1; i <= spiralStep; i++) {
      if (SPIRAL_STEPS[i].r === r && SPIRAL_STEPS[i].c === c) {
        return {
          visited: true,
          stepNum: i,
          dir: SPIRAL_STEPS[i].dir
        };
      }
    }
    return { visited: false, stepNum: null, dir: null };
  };

  // Row color styles for rotation
  const getRowColorClasses = (origRow) => {
    if (origRow === 0) {
      return "bg-sky-500/20 text-sky-300 border-sky-500/60 shadow-[0_0_12px_rgba(56,189,248,0.25)]";
    } else if (origRow === 1) {
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]";
    } else {
      return "bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.25)]";
    }
  };

  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowMatrix {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          @keyframes pulseActiveCell {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
            50% { transform: scale(1.06); box-shadow: 0 0 16px 4px rgba(56, 189, 248, 0.8); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-mx {
            animation: glowMatrix 3s ease-in-out infinite;
          }
          .animate-pulse-cell {
            animation: pulseActiveCell 1.5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 3
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Algorithmic Lab 3 · 2D Matrices
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Matrix Spiral Traversal &amp; In-Place 90-Degree Clockwise Rotation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master interview-grade 2D matrix manipulation in Java: 4-boundary pointer spiral traversal (<code className="text-emerald-400 font-mono">O(R &times; C)</code>), and the two-step formula for in-place 90-degree clockwise square rotation (<code className="text-purple-300 font-mono">Transpose + Row Reversal</code> in <code className="text-emerald-400 font-mono">O(1) Auxiliary Space</code>).
        </p>
      </header>

      {/* Section 1: Problem Definition & Clear Algorithmic Specifications */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
          <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
            <span>🎯</span> Problem Definition &amp; Clear Algorithmic Specifications
          </h2>
          <span className="text-xs font-semibold px-3 py-1 bg-sky-500/10 text-sky-300 border border-sky-500/30 rounded-full w-fit">
            Foundations Assessment Lab · Problem 3
          </span>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          In this algorithmic lab, you are required to solve <strong>two classical 2D matrix manipulation problems</strong> using exclusively Java Foundations constructs (primitive multidimensional arrays, explicit index pointers, and loops without any external collections or utility classes).
        </p>

        {/* Two Columns / Cards for Problem A and Problem B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: Spiral Order Traversal */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 border border-sky-500/30 p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-sky-950 text-sky-400 border border-sky-800">
                  Problem 3A
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                  O(R × C) Time · O(1) Extra Space
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Spiral Matrix Traversal
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Given a 2D matrix of dimensions <code className="text-sky-300 font-mono">R × C</code> containing integers, visit and collect every element in <strong>clockwise spiral order</strong>, beginning at top-left <code className="text-sky-300 font-mono">[0][0]</code> and spiraling inwards layer by layer.
              </p>

              {/* Specs Table */}
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Input:</span>
                  <span className="col-span-2 font-mono text-sky-300">int[][] matrix (R rows, C cols)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Output:</span>
                  <span className="col-span-2 font-mono text-emerald-300">int[] (length = R × C)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Key Constraint:</span>
                  <span className="col-span-2 text-slate-300">No collections (<code className="text-slate-400">ArrayList</code>); exact 1D array allocation</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Edge Cases:</span>
                  <span className="col-span-2 text-slate-300">Single-row (1×C) &amp; single-column (R×1) grids</span>
                </div>
              </div>

              {/* Concrete Graphical Mini Illustration for Card 3A */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Concrete Graphical Illustration (3 × 4 Grid):
                </p>
                <div className="p-3 bg-slate-900/95 rounded-xl border border-slate-800 space-y-3">
                  <div className="grid grid-cols-4 gap-1.5 text-center font-mono font-bold text-xs">
                    {/* Row 0: Top Row (Cyan) */}
                    <div className="p-2 rounded-lg bg-sky-950/70 border border-sky-500/50 text-sky-300 flex items-center justify-between">
                      <span>1</span> <ArrowRight className="w-3 h-3 text-sky-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-sky-950/70 border border-sky-500/50 text-sky-300 flex items-center justify-between">
                      <span>2</span> <ArrowRight className="w-3 h-3 text-sky-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-sky-950/70 border border-sky-500/50 text-sky-300 flex items-center justify-between">
                      <span>3</span> <ArrowRight className="w-3 h-3 text-sky-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-sky-950/70 border border-sky-500/50 text-sky-300 flex items-center justify-between">
                      <span>4</span> <ArrowDown className="w-3 h-3 text-amber-400" />
                    </div>

                    {/* Row 1 */}
                    <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 flex items-center justify-between">
                      <span>5</span> <ArrowRight className="w-3 h-3 text-rose-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-rose-950/70 border border-rose-500/50 text-rose-300 flex items-center justify-between">
                      <span>6</span> <ArrowRight className="w-3 h-3 text-rose-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-rose-950/70 border border-rose-500/50 text-rose-300 flex items-center justify-center">
                      <span>7</span>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-950/70 border border-amber-500/50 text-amber-300 flex items-center justify-between">
                      <span>8</span> <ArrowDown className="w-3 h-3 text-amber-400" />
                    </div>

                    {/* Row 2 */}
                    <div className="p-2 rounded-lg bg-purple-950/70 border border-purple-500/50 text-purple-300 flex items-center justify-between">
                      <span>9</span> <ArrowUp className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-purple-950/70 border border-purple-500/50 text-purple-300 flex items-center justify-between">
                      <span>10</span> <ArrowLeft className="w-3 h-3 text-purple-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-purple-950/70 border border-purple-500/50 text-purple-300 flex items-center justify-between">
                      <span>11</span> <ArrowLeft className="w-3 h-3 text-purple-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-amber-950/70 border border-amber-500/50 text-amber-300 flex items-center justify-between">
                      <span>12</span> <ArrowLeft className="w-3 h-3 text-purple-400" />
                    </div>
                  </div>

                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300 flex flex-wrap items-center gap-1">
                    <span className="text-slate-400">Spiral Output Array:</span>
                    <span className="font-semibold text-emerald-400">[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: In-Place 90° Clockwise Rotation */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 border border-purple-500/30 p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-400 border border-purple-800">
                  Problem 3B
                </span>
                <span className="text-xs font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/50 px-2 py-0.5 rounded">
                  O(N²) Time · O(1) In-Place Memory
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                In-Place 90° Clockwise Rotation
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Given an <code className="text-purple-300 font-mono">N × N</code> 2D square matrix representing an image or grid, rotate the matrix <strong>90 degrees clockwise directly in-place</strong>. You must modify the input array with strictly zero auxiliary 2D buffers.
              </p>

              {/* Specs Table */}
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Input:</span>
                  <span className="col-span-2 font-mono text-purple-300">int[][] matrix (strictly N × N square)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Output:</span>
                  <span className="col-span-2 font-mono text-emerald-300">void (mutates matrix in-place)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Key Constraint:</span>
                  <span className="col-span-2 text-slate-300">Strictly O(1) auxiliary space (no <code className="text-slate-400">new int[N][N]</code>)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Methodology:</span>
                  <span className="col-span-2 text-slate-300">Phase 1: Transpose + Phase 2: Horizontal Row Reversal</span>
                </div>
              </div>

              {/* Concrete Graphical Mini Illustration for Card 3B */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" /> Concrete 2-Step Geometric Transformation:
                </p>
                <div className="p-3 bg-slate-900/95 rounded-xl border border-slate-800 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    {/* Step 1: Initial */}
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                      <div className="text-[10px] text-slate-400 font-semibold">1. Initial (A)</div>
                      <div className="text-sky-300 font-bold bg-sky-950/40 rounded px-1">[1, 2, 3]</div>
                      <div className="text-emerald-300 font-bold bg-emerald-950/40 rounded px-1">[4, 5, 6]</div>
                      <div className="text-purple-300 font-bold bg-purple-950/40 rounded px-1">[7, 8, 9]</div>
                    </div>

                    {/* Step 2: Transposed */}
                    <div className="p-2 rounded-lg bg-slate-950 border border-purple-500/40 space-y-1">
                      <div className="text-[10px] text-purple-300 font-semibold">2. Transpose (Aᵀ)</div>
                      <div className="text-slate-200 font-bold rounded px-1">[1, 4, 7]</div>
                      <div className="text-slate-200 font-bold rounded px-1">[2, 5, 8]</div>
                      <div className="text-slate-200 font-bold rounded px-1">[3, 6, 9]</div>
                    </div>

                    {/* Step 3: Rotated */}
                    <div className="p-2 rounded-lg bg-slate-950 border border-emerald-500/40 space-y-1">
                      <div className="text-[10px] text-emerald-300 font-semibold">3. Reverse Rows</div>
                      <div className="text-emerald-300 font-bold rounded px-1">[7, 4, 1]</div>
                      <div className="text-emerald-300 font-bold rounded px-1">[8, 5, 2]</div>
                      <div className="text-emerald-300 font-bold rounded px-1">[9, 6, 3]</div>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-purple-300 flex items-center justify-between">
                    <span>Proof: Row 0 [1, 2, 3] turned into Column 2!</span>
                    <span className="text-emerald-400 font-bold">90° Clockwise ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE GRAPHICAL PROBLEM PLAYGROUND & STEP-BY-STEP SIMULATOR */}
        {/* ========================================================================= */}
        <div className="mt-8 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-indigo-500/40 p-5 md:p-7 shadow-2xl space-y-6">
          {/* Playground Header & Tab Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Interactive Graphical Problem Simulator
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Step through each algorithm visually to verify pointer movements, boundary shrinkages, and in-place transformations.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab("spiral")}
                className={clsx(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
                  activeTab === "spiral"
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <Compass className="w-3.5 h-3.5" />
                Problem 3A: Spiral Traversal (3×4)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("rotation")}
                className={clsx(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
                  activeTab === "rotation"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Problem 3B: 90° In-Place Rotation (3×3)
              </button>
            </div>
          </div>

          {/* TAB 1: SPIRAL TRAVERSAL SIMULATOR */}
          {activeTab === "spiral" && (
            <div className="space-y-6">
              {/* Boundary Pointers HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div
                  className={clsx(
                    "p-3 rounded-xl border transition-all duration-200 flex items-center justify-between",
                    currentSpiral.highlightBound === "top" || currentSpiral.highlightBound === "all"
                      ? "bg-sky-950/80 border-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                      : "bg-slate-900/60 border-slate-800 text-slate-400"
                  )}
                >
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-sky-400 block">
                      top pointer
                    </span>
                    <span className="text-base font-bold font-mono text-white">row {currentSpiral.top}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono">
                    min row
                  </span>
                </div>

                <div
                  className={clsx(
                    "p-3 rounded-xl border transition-all duration-200 flex items-center justify-between",
                    currentSpiral.highlightBound === "right" || currentSpiral.highlightBound === "all"
                      ? "bg-amber-950/80 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                      : "bg-slate-900/60 border-slate-800 text-slate-400"
                  )}
                >
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-400 block">
                      right pointer
                    </span>
                    <span className="text-base font-bold font-mono text-white">col {currentSpiral.right}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    max col
                  </span>
                </div>

                <div
                  className={clsx(
                    "p-3 rounded-xl border transition-all duration-200 flex items-center justify-between",
                    currentSpiral.highlightBound === "bottom" || currentSpiral.highlightBound === "all"
                      ? "bg-purple-950/80 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                      : "bg-slate-900/60 border-slate-800 text-slate-400"
                  )}
                >
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-purple-400 block">
                      bottom pointer
                    </span>
                    <span className="text-base font-bold font-mono text-white">row {currentSpiral.bottom}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                    max row
                  </span>
                </div>

                <div
                  className={clsx(
                    "p-3 rounded-xl border transition-all duration-200 flex items-center justify-between",
                    currentSpiral.highlightBound === "left" || currentSpiral.highlightBound === "all"
                      ? "bg-emerald-950/80 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                      : "bg-slate-900/60 border-slate-800 text-slate-400"
                  )}
                >
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400 block">
                      left pointer
                    </span>
                    <span className="text-base font-bold font-mono text-white">col {currentSpiral.left}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    min col
                  </span>
                </div>
              </div>

              {/* Graphical 3x4 Matrix Visualization */}
              <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 relative">
                {/* Column Index Markers */}
                <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto mb-2 text-center text-slate-400 font-mono text-xs">
                  <div>col 0</div>
                  <div>col 1</div>
                  <div>col 2</div>
                  <div>col 3</div>
                </div>

                {/* The 3x4 Matrix Grid */}
                <div className="space-y-3 max-w-lg mx-auto">
                  {SPIRAL_GRID.map((rowArr, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-3">
                      {/* Row Index Label */}
                      <span className="w-12 text-right text-slate-400 font-mono text-xs">
                        row {rIdx}
                      </span>

                      {/* 4 Cells for Row */}
                      <div className="grid grid-cols-4 gap-3 flex-1">
                        {rowArr.map((cellVal, cIdx) => {
                          const isCurrent = currentSpiral.r === rIdx && currentSpiral.c === cIdx;
                          const cellInfo = getCellVisitedInfo(rIdx, cIdx);

                          // Style according to state
                          let cellStyle = "bg-slate-900/70 border-slate-800 text-slate-400";

                          if (isCurrent) {
                            cellStyle = "bg-white text-slate-900 border-white font-extrabold shadow-[0_0_20px_rgba(255,255,255,0.9)] animate-pulse-cell z-10";
                          } else if (cellInfo.visited) {
                            // Visited phases
                            if (rIdx === 0) {
                              cellStyle = "bg-sky-950/80 border-sky-500/60 text-sky-300";
                            } else if (cIdx === 3) {
                              cellStyle = "bg-amber-950/80 border-amber-500/60 text-amber-300";
                            } else if (rIdx === 2) {
                              cellStyle = "bg-purple-950/80 border-purple-500/60 text-purple-300";
                            } else if (cIdx === 0) {
                              cellStyle = "bg-emerald-950/80 border-emerald-500/60 text-emerald-300";
                            } else {
                              cellStyle = "bg-rose-950/80 border-rose-500/60 text-rose-300";
                            }
                          }

                          return (
                            <div
                              key={cIdx}
                              className={clsx(
                                "relative p-3 sm:p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300",
                                cellStyle
                              )}
                            >
                              {/* Order Badge if visited */}
                              {cellInfo.visited && !isCurrent && (
                                <span className="absolute top-1 left-1.5 text-[9px] font-mono font-bold px-1 rounded bg-black/50 text-slate-300">
                                  #{cellInfo.stepNum}
                                </span>
                              )}
                              {isCurrent && (
                                <span className="absolute top-1 left-1.5 text-[9px] font-mono font-extrabold px-1 rounded bg-sky-600 text-white">
                                  ACTIVE
                                </span>
                              )}

                              {/* Direction Indicator */}
                              {cellInfo.visited && !isCurrent && cellInfo.dir && (
                                <span className="absolute top-1 right-1.5 text-[10px] text-slate-400">
                                  {cellInfo.dir === "right" && <ArrowRight className="w-2.5 h-2.5" />}
                                  {cellInfo.dir === "down" && <ArrowDown className="w-2.5 h-2.5" />}
                                  {cellInfo.dir === "left" && <ArrowLeft className="w-2.5 h-2.5" />}
                                  {cellInfo.dir === "up" && <ArrowUp className="w-2.5 h-2.5" />}
                                </span>
                              )}

                              {/* Cell Value */}
                              <span className="text-base sm:text-lg font-mono font-bold">
                                {cellVal}
                              </span>

                              {/* Coordinate Tag */}
                              <span className={clsx(
                                "text-[10px] font-mono",
                                isCurrent ? "text-slate-700 font-semibold" : "text-slate-400"
                              )}>
                                [{rIdx}][{cIdx}]
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Loop Invariant Condition Indicator */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-sans">Loop Guard:</span>
                    <span className={clsx(
                      "px-2 py-0.5 rounded font-semibold",
                      currentSpiral.top <= currentSpiral.bottom && currentSpiral.left <= currentSpiral.right
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    )}>
                      (top &lt;= bottom &amp;&amp; left &lt;= right) : {currentSpiral.top} &le; {currentSpiral.bottom} &amp;&amp; {currentSpiral.left} &le; {currentSpiral.right}
                    </span>
                  </div>
                  <span className="text-sky-400 font-sans font-medium">
                    {currentSpiral.phase}
                  </span>
                </div>
              </div>

              {/* Step Description & Output Ribbon */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/40">
                      Step {spiralStep} / 12
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      {currentSpiral.desc}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Visited: {currentSpiral.output.length} / 12 cells
                  </span>
                </div>

                {/* Output Array Ribbon */}
                <div className="pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1.5">
                    <span>1D Result Array:</span>
                    <span className="text-emerald-400 font-semibold">
                      [ {currentSpiral.output.join(", ")}{currentSpiral.output.length < 12 ? ", ..." : ""} ]
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 font-mono text-center">
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const item = currentSpiral.output[idx];
                      return (
                        <div
                          key={idx}
                          className={clsx(
                            "py-1.5 rounded text-xs font-bold transition-all duration-300",
                            item !== undefined
                              ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300"
                              : "bg-slate-950 border border-slate-800 text-slate-400"
                          )}
                        >
                          {item !== undefined ? item : "-"}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSpiralStep((prev) => Math.max(0, prev - 1));
                    }}
                    disabled={spiralStep === 0}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={clsx(
                      "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all shadow-lg",
                      isAutoPlaying
                        ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30"
                        : "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30"
                    )}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-4 h-4" /> Pause Auto-Play
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> Auto Play
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSpiralStep((prev) => Math.min(SPIRAL_STEPS.length - 1, prev + 1));
                    }}
                    disabled={spiralStep === SPIRAL_STEPS.length - 1}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setSpiralStep(0);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white text-xs cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Traversal
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: IN-PLACE 90° ROTATION SIMULATOR */}
          {activeTab === "rotation" && (
            <div className="space-y-6">
              {/* Stage Selection Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ROTATE_STAGES.map((stg) => (
                  <button
                    key={stg.stage}
                    type="button"
                    onClick={() => setRotateStage(stg.stage)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer",
                      rotateStage === stg.stage
                        ? "bg-purple-950/80 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={clsx(
                        "text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                        rotateStage === stg.stage ? "bg-purple-500 text-white" : "bg-slate-800 text-slate-400"
                      )}>
                        {stg.badge}
                      </span>
                      {rotateStage === stg.stage && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      )}
                    </div>
                    <div className={clsx(
                      "text-xs font-bold",
                      rotateStage === stg.stage ? "text-white" : "text-slate-300"
                    )}>
                      {stg.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {stg.sub}
                    </div>
                  </button>
                ))}
              </div>

              {/* 3x3 Graphical Matrix Grid */}
              <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  {/* The Matrix */}
                  <div className="space-y-3">
                    <div className="text-center font-mono text-xs text-slate-400 mb-1">
                      Current Matrix State (3 × 3)
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {currentRotation.matrix.map((rowArr, rIdx) =>
                        rowArr.map((cell, cIdx) => {
                          const isDiagonal = rIdx === cIdx;
                          return (
                            <div
                              key={`${rIdx}-${cIdx}`}
                              className={clsx(
                                "relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-500",
                                getRowColorClasses(cell.origRow),
                                isDiagonal && rotateStage === 1 && "ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950"
                              )}
                            >
                              {/* Original Row Color Tag */}
                              <span className="absolute top-1.5 left-2 text-[9px] font-mono font-bold opacity-80">
                                Row {cell.origRow}
                              </span>

                              {/* Diagonal marker */}
                              {isDiagonal && (
                                <span className="absolute top-1.5 right-2 text-[9px] font-mono px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                  diag
                                </span>
                              )}

                              {/* Value */}
                              <span className="text-2xl font-bold font-mono">
                                {cell.val}
                              </span>

                              {/* Index */}
                              <span className="text-[10px] font-mono opacity-60">
                                [{rIdx}][{cIdx}]
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Geometric Explanation & Proof Card */}
                  <div className="flex-1 max-w-md space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-purple-500/20 text-purple-300">
                          <Info className="w-4 h-4" />
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {currentRotation.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {currentRotation.desc}
                      </p>

                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Java In-Place Logic:</div>
                        <div className="text-emerald-300 text-[11px] break-all">
                          {currentRotation.formula}
                        </div>
                      </div>

                      <div className="space-y-1 text-xs font-mono">
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Action Details:</div>
                        {currentRotation.swaps.map((swp, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-slate-300 text-[11px]">
                            <span className="text-purple-400">▸</span> {swp}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage Navigation Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setRotateStage((prev) => Math.max(0, prev - 1))}
                  disabled={rotateStage === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous Stage
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    Stage {rotateStage + 1} of 3
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((stg) => (
                      <div
                        key={stg}
                        className={clsx(
                          "w-2.5 h-2.5 rounded-full transition-all duration-300",
                          rotateStage === stg ? "bg-purple-500 scale-125" : "bg-slate-700"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRotateStage((prev) => Math.min(2, prev + 1))}
                  disabled={rotateStage === 2}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-lg shadow-purple-600/30"
                >
                  Next Stage <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Two Landmark Matrix Operations
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            2D array algorithms test your precision with multi-index pointer manipulation and in-place transformations:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Spiral Order Traversal</h3>
              <p className="text-sky-300 mb-1">4 Pointers: top, bottom, left, right</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Visits cells in clockwise spiral boundaries. Top (left→right), Right (top→bottom), Bottom (right→left, guarded by <code className="text-slate-300 font-mono">top &lt;= bottom</code>), Left (bottom→top, guarded by <code className="text-slate-300 font-mono">left &lt;= right</code>).
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. In-Place 90° Clockwise Rotation</h3>
              <p className="text-emerald-300 mb-1">Transpose + Horizontal Row Reversal</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Step 1: Swap <code className="text-emerald-400 font-mono">matrix[i][j]</code> with <code className="text-emerald-400 font-mono">matrix[j][i]</code> across main diagonal. Step 2: Reverse each row horizontally in <code className="text-emerald-400 font-mono">O(1)</code> space without allocating a second matrix.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Seating &amp; Score Grids):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> traversed a 3×4 seating grid yielding spiral order <code className="text-emerald-400 font-semibold">[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]</code>, while <strong>Abhronila</strong> and <strong>Debangshu</strong> rotated a 4×4 student assessment score matrix 90 degrees clockwise in-place with zero memory allocation!
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: High-Fidelity Architectural Vector Visualizations */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Algorithmic Visualizations: Spiral Path &amp; In-Place 90° Rotation
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing the 4-boundary spiral flow with the two-step in-place matrix rotation pipeline:
        </p>

        {/* Semantic Architectural SVG Diagram */}
        <div className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-4 sm:p-6 shadow-2xl">
          <svg
            viewBox="0 0 940 330"
            className="w-full h-auto"
            aria-label="Matrix Spiral Traversal Path and 90-Degree Rotation Architecture"
          >
            <defs>
              {/* Arrow Markers */}
              <marker id="arrowSky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
              </marker>
              <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
              </marker>
              <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#c084fc" />
              </marker>
              <marker id="arrowEmerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
              </marker>
              <marker id="arrowRose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#fb7185" />
              </marker>
              <marker id="arrowGeneral" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#a855f7" />
              </marker>
            </defs>

            {/* ============================================================= */}
            {/* LEFT PANEL: 3x4 SPIRAL TRAVERSAL GRID WITH CONTINUOUS PATH */}
            {/* ============================================================= */}
            <rect x="20" y="20" width="430" height="290" rx="14" fill="#090d16" stroke="#0284c7" strokeWidth="1.5" />
            <text x="235" y="48" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              1. SPIRAL ORDER PATH (4 BOUNDARY POINTERS)
            </text>

            {/* Boundary Brackets and Pointers */}
            <text x="235" y="70" fill="#7dd3fc" fontSize="10" fontFamily="monospace" textAnchor="middle">
              top = 0 ↓ (increments to 1 after row 0)
            </text>
            <text x="235" y="295" fill="#d8b4fe" fontSize="10" fontFamily="monospace" textAnchor="middle">
              bottom = 2 ↑ (decrements to 1 after row 2)
            </text>
            <text x="32" y="180" fill="#6ee7b7" fontSize="10" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 32 180)">
              left = 0 →
            </text>
            <text x="438" y="180" fill="#fcd34d" fontSize="10" fontFamily="monospace" textAnchor="middle" transform="rotate(90 438 180)">
              right = 3 ←
            </text>

            {/* 3x4 Cells Grid */}
            {/* Row 0 */}
            <rect x="65" y="85" width="70" height="50" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="100" y="115" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">1</text>
            <text x="100" y="128" fill="#7dd3fc" fontSize="8" fontFamily="monospace" textAnchor="middle">[0][0]</text>

            <rect x="150" y="85" width="70" height="50" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="185" y="115" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">2</text>
            <text x="185" y="128" fill="#7dd3fc" fontSize="8" fontFamily="monospace" textAnchor="middle">[0][1]</text>

            <rect x="235" y="85" width="70" height="50" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="270" y="115" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">3</text>
            <text x="270" y="128" fill="#7dd3fc" fontSize="8" fontFamily="monospace" textAnchor="middle">[0][2]</text>

            <rect x="320" y="85" width="70" height="50" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="355" y="115" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">4</text>
            <text x="355" y="128" fill="#7dd3fc" fontSize="8" fontFamily="monospace" textAnchor="middle">[0][3]</text>

            {/* Row 1 */}
            <rect x="65" y="150" width="70" height="50" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
            <text x="100" y="180" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">5</text>
            <text x="100" y="193" fill="#6ee7b7" fontSize="8" fontFamily="monospace" textAnchor="middle">[1][0]</text>

            <rect x="150" y="150" width="70" height="50" rx="8" fill="#4c0519" stroke="#fb7185" strokeWidth="1.5" />
            <text x="185" y="180" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">6</text>
            <text x="185" y="193" fill="#fecdd3" fontSize="8" fontFamily="monospace" textAnchor="middle">[1][1]</text>

            <rect x="235" y="150" width="70" height="50" rx="8" fill="#4c0519" stroke="#fb7185" strokeWidth="1.5" />
            <text x="270" y="180" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">7</text>
            <text x="270" y="193" fill="#fecdd3" fontSize="8" fontFamily="monospace" textAnchor="middle">[1][2]</text>

            <rect x="320" y="150" width="70" height="50" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="355" y="180" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">8</text>
            <text x="355" y="193" fill="#fcd34d" fontSize="8" fontFamily="monospace" textAnchor="middle">[1][3]</text>

            {/* Row 2 */}
            <rect x="65" y="215" width="70" height="50" rx="8" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
            <text x="100" y="245" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">9</text>
            <text x="100" y="258" fill="#e9d5ff" fontSize="8" fontFamily="monospace" textAnchor="middle">[2][0]</text>

            <rect x="150" y="215" width="70" height="50" rx="8" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
            <text x="185" y="245" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">10</text>
            <text x="185" y="258" fill="#e9d5ff" fontSize="8" fontFamily="monospace" textAnchor="middle">[2][1]</text>

            <rect x="235" y="215" width="70" height="50" rx="8" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
            <text x="270" y="245" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">11</text>
            <text x="270" y="258" fill="#e9d5ff" fontSize="8" fontFamily="monospace" textAnchor="middle">[2][2]</text>

            <rect x="320" y="215" width="70" height="50" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="355" y="245" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">12</text>
            <text x="355" y="258" fill="#fcd34d" fontSize="8" fontFamily="monospace" textAnchor="middle">[2][3]</text>

            {/* Traversal Path Vectors with Arrowheads */}
            {/* Top Leg: 1 -> 2 -> 3 -> 4 */}
            <line x1="135" y1="110" x2="148" y2="110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowSky)" />
            <line x1="220" y1="110" x2="233" y2="110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowSky)" />
            <line x1="305" y1="110" x2="318" y2="110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowSky)" />

            {/* Right Leg: 4 -> 8 -> 12 */}
            <line x1="355" y1="135" x2="355" y2="148" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrowAmber)" />
            <line x1="355" y1="200" x2="355" y2="213" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrowAmber)" />

            {/* Bottom Leg: 12 -> 11 -> 10 -> 9 */}
            <line x1="320" y1="240" x2="307" y2="240" stroke="#c084fc" strokeWidth="2.5" markerEnd="url(#arrowPurple)" />
            <line x1="235" y1="240" x2="222" y2="240" stroke="#c084fc" strokeWidth="2.5" markerEnd="url(#arrowPurple)" />
            <line x1="150" y1="240" x2="137" y2="240" stroke="#c084fc" strokeWidth="2.5" markerEnd="url(#arrowPurple)" />

            {/* Left Leg: 9 -> 5 */}
            <line x1="100" y1="215" x2="100" y2="202" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arrowEmerald)" />

            {/* Inner Leg: 5 -> 6 -> 7 */}
            <line x1="135" y1="175" x2="148" y2="175" stroke="#fb7185" strokeWidth="2.5" markerEnd="url(#arrowRose)" />
            <line x1="220" y1="175" x2="233" y2="175" stroke="#fb7185" strokeWidth="2.5" markerEnd="url(#arrowRose)" />

            {/* ============================================================= */}
            {/* RIGHT PANEL: 2-STEP IN-PLACE 90° ROTATION TRANSFORMATION */}
            {/* ============================================================= */}
            <rect x="475" y="20" width="445" height="290" rx="14" fill="#090d16" stroke="#9333ea" strokeWidth="1.5" />
            <text x="697" y="48" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              2. IN-PLACE 90° CLOCKWISE ROTATION (2-STEP FORMULA)
            </text>

            {/* Matrix 1: Initial Grid (x=495) */}
            <g transform="translate(495, 75)">
              <text x="39" y="0" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Initial A</text>
              {/* Row 0: Blue */}
              <rect x="0" y="10" width="24" height="24" rx="4" fill="#0284c7" />
              <text x="12" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
              <rect x="27" y="10" width="24" height="24" rx="4" fill="#0284c7" />
              <text x="39" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
              <rect x="54" y="10" width="24" height="24" rx="4" fill="#0284c7" />
              <text x="66" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>

              {/* Row 1: Emerald */}
              <rect x="0" y="37" width="24" height="24" rx="4" fill="#059669" />
              <text x="12" y="53" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>
              <rect x="27" y="37" width="24" height="24" rx="4" fill="#059669" />
              <text x="39" y="53" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">5</text>
              <rect x="54" y="37" width="24" height="24" rx="4" fill="#059669" />
              <text x="66" y="53" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>

              {/* Row 2: Purple */}
              <rect x="0" y="64" width="24" height="24" rx="4" fill="#7c3aed" />
              <text x="12" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">7</text>
              <rect x="27" y="64" width="24" height="24" rx="4" fill="#7c3aed" />
              <text x="39" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">8</text>
              <rect x="54" y="64" width="24" height="24" rx="4" fill="#7c3aed" />
              <text x="66" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">9</text>
            </g>

            {/* Connector 1: Transpose Arrow */}
            <path d="M 585,125 L 620,125" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowGeneral)" />
            <text x="605" y="115" fill="#e9d5ff" fontSize="8" fontWeight="bold" textAnchor="middle">TRANSPOSE</text>
            <text x="605" y="145" fill="#a855f7" fontSize="8" fontFamily="monospace" textAnchor="middle">[i][j]↔[j][i]</text>

            {/* Matrix 2: Transposed Grid Aᵀ (x=635) */}
            <g transform="translate(635, 75)">
              <text x="39" y="0" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Transposed Aᵀ</text>
              {/* Row 0 */}
              <rect x="0" y="10" width="24" height="24" rx="4" fill="#0284c7" />
              <text x="12" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
              <rect x="27" y="10" width="24" height="24" rx="4" fill="#059669" />
              <text x="39" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>
              <rect x="54" y="10" width="24" height="24" rx="4" fill="#7c3aed" />
              <text x="66" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">7</text>

              {/* Row 1 */}
              <rect x="0" y="37" width="24" height="24" rx="4" fill="#0284c7" />
              <text x="12" y="53" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
              <rect x="27" y="37" width="24" height="24" rx="4" fill="#059669" />
              <text x="39" y="53" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">5</text>
              <rect x="54" y="37" width="24" height="24" rx="4" fill="#7c3aed" />
              <text x="66" y="53" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">8</text>

              {/* Row 2 */}
              <rect x="0" y="64" width="24" height="24" rx="4" fill="#0284c7" />
              <text x="12" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>
              <rect x="27" y="64" width="24" height="24" rx="4" fill="#059669" />
              <text x="39" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>
              <rect x="54" y="64" width="24" height="24" rx="4" fill="#7c3aed" />
              <text x="66" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">9</text>
            </g>

            {/* Connector 2: Row Reversal Arrow */}
            <path d="M 725,125 L 760,125" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowEmerald)" />
            <text x="745" y="115" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">REVERSE ROWS</text>
            <text x="745" y="145" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">left↔right</text>

            {/* Matrix 3: Rotated Grid (x=775) */}
            <g transform="translate(775, 75)">
              <text x="39" y="0" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Rotated 90°</text>
              {/* Row 0 */}
              <rect x="0" y="10" width="24" height="24" rx="4" fill="#7c3aed" />
              <text x="12" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">7</text>
              <rect x="27" y="10" width="24" height="24" rx="4" fill="#059669" />
              <text x="39" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>
              <rect x="54" y="10" width="24" height="24" rx="4" fill="#0284c7" />
              <text x="66" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>

              {/* Row 1 */}
              <rect x="0" y="37" width="24" height="24" rx="4" fill="#7c3aed" />
              <text x="12" y="53" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">8</text>
              <rect x="27" y="37" width="24" height="24" rx="4" fill="#059669" />
              <text x="39" y="53" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">5</text>
              <rect x="54" y="37" width="24" height="24" rx="4" fill="#0284c7" />
              <text x="66" y="53" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>

              {/* Row 2 */}
              <rect x="0" y="64" width="24" height="24" rx="4" fill="#7c3aed" />
              <text x="12" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">9</text>
              <rect x="27" y="64" width="24" height="24" rx="4" fill="#059669" />
              <text x="39" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>
              <rect x="54" y="64" width="24" height="24" rx="4" fill="#0284c7" />
              <text x="66" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>
            </g>

            {/* Bottom Summary Callout */}
            <rect x="495" y="195" width="405" height="90" rx="10" fill="#1e1035" stroke="#7c3aed" strokeWidth="1" />
            <text x="510" y="220" fill="#e9d5ff" fontSize="11" fontWeight="bold">
              Why this produces a 90° Clockwise Rotation:
            </text>
            <text x="510" y="240" fill="#cbd5e1" fontSize="10">
              • Transpose converts row i to column i: element (i, j) → (j, i).
            </text>
            <text x="510" y="258" fill="#cbd5e1" fontSize="10">
              • Row Reversal mirrors horizontally: (j, i) → (j, N - 1 - i).
            </text>
            <text x="510" y="275" fill="#34d399" fontSize="10" fontWeight="bold">
              • Notice: Original Blue Row 0 [1, 2, 3] is now the Rightmost Column!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 4: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Matrix Operations Complexity &amp; Invariant Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operation</th>
                <th className="p-3 font-semibold text-emerald-400">Time Complexity</th>
                <th className="p-3 font-semibold text-purple-400">Auxiliary Space</th>
                <th className="p-3 font-semibold text-amber-400">Core Invariant Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Spiral Traversal (R × C)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(R × C)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(1) auxiliary</td>
                <td className="p-3 text-slate-300 font-sans">Guard bottom &amp; left with `top &lt;= bottom` &amp; `left &lt;= right`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">90° Clockwise Rotation (N × N)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N²)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(1) in-place</td>
                <td className="p-3 text-slate-300 font-sans">Transpose across diagonal + Reverse rows horizontally</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">90° Counter-Clockwise (N × N)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N²)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(1) in-place</td>
                <td className="p-3 text-slate-300 font-sans">Transpose across diagonal + Reverse columns vertically</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">180° In-Place Rotation (N × N)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N²)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(1) in-place</td>
                <td className="p-3 text-slate-300 font-sans">Reverse rows horizontally + Reverse rows vertically</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Hands-on Code Example */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>💻</span> Compilable Java Source Code
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            MatrixSpiralAndRotationAlgorithmsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program implements 4-boundary spiral matrix traversal and in-place 90-degree square matrix rotation.
        </p>

        <JavaFileLoader
          fileModule={matrixDemoCode}
          title="MatrixSpiralAndRotationAlgorithmsDemo.java"
          highlightLines={[19, 26, 34, 36, 42, 48, 56, 69, 74, 83, 97, 136]}
        />
      </section>

      {/* Section 6: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Best Practices
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 1: Starting Transposition Inner Loop at `j = 0`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Starting transposition at <code className="text-rose-300 font-mono">j = 0</code> will swap elements twice, leaving the matrix unchanged! Always start at <code className="text-emerald-400 font-mono">int j = i + 1</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Guard Bottom and Left Passes in Rectangular Spiral
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always wrap the bottom-row and left-column passes with <code className="text-emerald-400 font-mono">if (top &lt;= bottom)</code> and <code className="text-emerald-400 font-mono">if (left &lt;= right)</code> to prevent duplicate traversals on single-row or single-column matrices.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Thinking & Hints Section */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;Can an R × C non-square rectangular matrix (e.g. 3x4) be rotated 90° strictly in-place in Java?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Dimension Mismatch! A 3x4 matrix rotated 90° becomes a 4x3 matrix. In Java&apos;s array memory model, an array&apos;s row and column dimensions are immutable once created; rotating a non-square matrix requires allocating a new <code className="text-emerald-400 font-mono">new int[cols][rows]</code> matrix!
          </p>
        </div>
      </section>

      {/* Section 8: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Matrix Spiral & Rotation FAQs"
          questions={questions}
        />
      </section>

      {/* Section 9: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 3: Matrix Spiral & 90-Degree Rotation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic3_note.txt"
        />
      </section>

      {/* Section 10: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Matrix algorithms are the ultimate test of pointer bounds discipline. In Topic 4, we conquer Algorithmic Problem 4: Finding Duplicate & Missing Numbers in Arrays! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
