import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import indexingBounds from "./topic2_files/indexing_and_bounds.py?raw";
import slicingStep from "./topic2_files/slicing_and_step.py?raw";
import reversingPalindromes from "./topic2_files/string_reversing_and_palindromes.py?raw";
import logParserPacket from "./topic2_files/log_parser_and_packet_extractor.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Indexing, Slicing, Step Slicing & Reversing Strings
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("indexing");
  const [selectedPresetSlice, setSelectedPresetSlice] = useState("s[0:6]");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Sample string for interactive character tape
  const sampleWord = "BARRACKPORE"; // Length 11
  const sampleChars = sampleWord.split("");

  // Preset slices for the interactive playground
  const slicePresets = [
    { label: "s[0:6]", desc: "First 6 characters (indices 0..5)", result: "BARRAC", activeIndices: [0, 1, 2, 3, 4, 5] },
    { label: "s[6:]", desc: "From index 6 to the end", result: "KPORE", activeIndices: [6, 7, 8, 9, 10] },
    { label: "s[:4]", desc: "Prefix: start omitted defaults to 0", result: "BARR", activeIndices: [0, 1, 2, 3] },
    { label: "s[-4:]", desc: "Suffix: last 4 characters", result: "PORE", activeIndices: [7, 8, 9, 10] },
    { label: "s[::2]", desc: "Stride 2: every second character", result: "BRCOE", activeIndices: [0, 2, 4, 6, 8, 10] },
    { label: "s[::-1]", desc: "Full string reversal (negative stride)", result: "EROPKCARRAB", activeIndices: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0] },
    { label: "s[5:1:-1]", desc: "Reverse subset: indices 5, 4, 3, 2", result: "CARR", activeIndices: [5, 4, 3, 2] },
    { label: "s[100:200]", desc: "Oversized range: Fault-tolerant empty string", result: '""', activeIndices: [] },
  ];

  const currentPreset = slicePresets.find((p) => p.label === selectedPresetSlice) || slicePresets[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowCyan {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(6, 182, 212, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.8)); }
        }
        .animate-glow-cyan {
          animation: pulseGlowCyan 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-blue-950/80 text-blue-300 px-3 py-1 rounded-full border border-blue-800/80 shadow-sm shadow-blue-950/50">
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing &amp; Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Indexing, Slicing, Step Slicing &amp; Reversing
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master dual-direction sequence indexing (0-based &amp; negative), the half-open interval <code className="text-cyan-400 font-mono">[start:stop)</code>, step strides <code className="text-emerald-400 font-mono">[::step]</code>, idiomatic reversal <code className="text-pink-400 font-mono">s[::-1]</code>, and fault-tolerant parsing.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Zero-Based (0..N-1) &amp; Negative (-1..-N)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ✂️ Half-Open Interval [start:stop)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Step Strides &amp; s[::-1] Reversal
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Fault-Tolerant Boundary Clamping
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CORE INDEXING & SLICING PRINCIPLES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Sequence Coordinate System &amp; Boundary Rules
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, strings are ordered, indexed collections of characters. Because Python sequences are indexed symmetrically from both ends, every single position has two valid coordinates: a <strong className="text-cyan-400">positive index</strong> (0 to <code className="text-cyan-300 font-mono">len - 1</code>) and a <strong className="text-purple-400">negative index</strong> (-1 to <code className="text-purple-300 font-mono">-len</code>).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg mb-2">
                  <span>➡️</span> Left-to-Right (0-Based)
                </div>
                <p className="text-sm text-slate-300">
                  Index <code className="text-cyan-300 font-mono">0</code> is the first character. The last character is at <code className="text-cyan-300 font-mono">len(s) - 1</code>.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-purple-500">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2">
                  <span>⬅️</span> Right-to-Left (Negative)
                </div>
                <p className="text-sm text-slate-300">
                  Index <code className="text-purple-300 font-mono">-1</code> is the last character. The first character is at <code className="text-purple-300 font-mono">-len(s)</code>.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>✂️</span> Half-Open Slice [start:stop)
                </div>
                <p className="text-sm text-slate-300">
                  Slices include <code className="text-emerald-300 font-mono">start</code> and stop strictly before <code className="text-emerald-300 font-mono">stop</code>. Length is <code className="text-emerald-300 font-mono">stop - start</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-cyan-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Indexing vs Slicing: The Critical Difference in Error Handling
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-2">
                • <strong className="text-rose-400">Single Indexing is Strict:</strong> Accessing <code className="text-rose-300 font-mono">s[100]</code> when <code className="text-rose-300 font-mono">len(s) = 10</code> instantly crashes with an <code className="text-rose-300 font-mono">IndexError: string index out of range</code>.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                • <strong className="text-emerald-400">Slicing is Fault-Tolerant:</strong> Slicing <code className="text-emerald-300 font-mono">s[100:200]</code> NEVER raises an error! Python gracefully clamps out-of-range boundaries and returns an empty string <code className="text-emerald-300 font-mono">""</code> or the available subset.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUALIZER (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visual Architecture &amp; Index Mapping
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("indexing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "indexing"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Dual Index Grid
              </button>
              <button
                onClick={() => setActiveInteractiveTab("slicing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "slicing"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Half-Open Boundaries
              </button>
              <button
                onClick={() => setActiveInteractiveTab("reversal")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "reversal"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Step &amp; Reversal s[::-1]
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining character memory slots for the string <code className="text-cyan-400 font-mono">"BARRACKPORE"</code> (<code className="text-slate-400 font-mono">len = 11</code>).
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "indexing" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                {/* Header Legend */}
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">POSITIVE INDICES (0 to len - 1)</text>
                <text x="30" y="270" fill="#c084fc" fontSize="14" fontWeight="bold">NEGATIVE INDICES (-1 to -len)</text>

                {/* Character Tape Boxes */}
                {sampleChars.map((ch, idx) => {
                  const xPos = 40 + idx * 72;
                  const negIdx = idx - sampleChars.length;
                  return (
                    <g key={idx}>
                      {/* Positive Index Label */}
                      <rect x={xPos} y="45" width="60" height="28" rx="6" fill="#082f49" stroke="#0284c7" strokeWidth="1" />
                      <text x={xPos + 30} y="64" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">{idx}</text>

                      {/* Character Box */}
                      <rect x={xPos} y="85" width="60" height="75" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                      <text x={xPos + 30} y="132" fill="#f8fafc" fontSize="24" fontWeight="extrabold" textAnchor="middle">{ch}</text>

                      {/* Down Arrow */}
                      <path d={`M ${xPos + 30} 170 L ${xPos + 30} 185`} stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />

                      {/* Negative Index Label */}
                      <rect x={xPos} y="195" width="60" height="28" rx="6" fill="#3b0764" stroke="#9333ea" strokeWidth="1" />
                      <text x={xPos + 30} y="214" fill="#d8b4fe" fontSize="14" fontWeight="bold" textAnchor="middle">{negIdx}</text>
                    </g>
                  );
                })}

                {/* Summary Info Banner */}
                <rect x="40" y="285" width="800" height="38" rx="6" fill="#090d16" stroke="#334155" />
                <text x="60" y="309" fill="#94a3b8" fontSize="13">
                  Symmetry Formula: <tspan fill="#38bdf8" fontWeight="bold">s[0] == s[-11] ('B')</tspan> &nbsp;|&nbsp; <tspan fill="#d8b4fe" fontWeight="bold">s[10] == s[-1] ('E')</tspan> &nbsp;|&nbsp; <tspan fill="#fca5a5" fontWeight="bold">s[11] → IndexError!</tspan>
                </text>
              </svg>
            ) : activeInteractiveTab === "slicing" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                {/* Boundary Fencepost Markers */}
                <text x="30" y="30" fill="#34d399" fontSize="14" fontWeight="bold">HALF-OPEN SLICE INTERVAL: s[0:6] = "BARRAC"</text>
                
                {/* Character Tape Boxes with Highlighted Region */}
                {sampleChars.map((ch, idx) => {
                  const xPos = 40 + idx * 72;
                  const isHighlighted = idx < 6;
                  return (
                    <g key={idx}>
                      {/* Fencepost Index Cut Line */}
                      <line x1={xPos} y1="45" x2={xPos} y2="175" stroke={idx === 0 || idx === 6 ? "#10b981" : "#334155"} strokeWidth={idx === 0 || idx === 6 ? "2.5" : "1"} strokeDasharray={idx === 0 || idx === 6 ? "none" : "3,3"} />
                      <text x={xPos} y="40" fill={idx === 0 ? "#34d399" : idx === 6 ? "#f43f5e" : "#64748b"} fontSize="12" fontWeight="bold" textAnchor="middle">
                        |{idx}
                      </text>

                      {/* Character Box */}
                      <rect
                        x={xPos + 6}
                        y="60"
                        width="60"
                        height="70"
                        rx="6"
                        fill={isHighlighted ? "#064e3b" : "#1e293b"}
                        stroke={isHighlighted ? "#10b981" : "#475569"}
                        strokeWidth={isHighlighted ? "2" : "1"}
                      />
                      <text x={xPos + 36} y="104" fill={isHighlighted ? "#a7f3d0" : "#94a3b8"} fontSize="22" fontWeight="bold" textAnchor="middle">{ch}</text>
                    </g>
                  );
                })}

                {/* Final Fencepost at end */}
                <line x1={40 + 11 * 72} y1="45" x2={40 + 11 * 72} y2="175" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
                <text x={40 + 11 * 72} y="40" fill="#64748b" fontSize="12" fontWeight="bold" textAnchor="middle">|11</text>

                {/* Slice Bracket Explanations */}
                <rect x="40" y="160" width={6 * 72} height="32" rx="6" fill="#065f46" stroke="#34d399" />
                <text x={40 + 3 * 72} y="181" fill="#ecfdf5" fontSize="13" fontWeight="bold" textAnchor="middle">
                  s[0:6] Extracted: 'BARRAC' (Length: 6 - 0 = 6 items)
                </text>

                <rect x={40 + 6 * 72} y="160" width={5 * 72} height="32" rx="6" fill="#1e1b4b" stroke="#6366f1" />
                <text x={40 + 8.5 * 72} y="181" fill="#e0e7ff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  s[6:11] Extracted: 'KPORE' (5 items)
                </text>

                {/* Bottom Preservation Formula */}
                <rect x="40" y="220" width="800" height="95" rx="8" fill="#090d16" stroke="#334155" />
                <text x="60" y="250" fill="#38bdf8" fontSize="14" fontWeight="bold">Key Invariant: s[:k] + s[k:] == s</text>
                <text x="60" y="275" fill="#cbd5e1" fontSize="13">
                  Because 'stop' is exclusive, slicing at boundary index 6 partitions the string cleanly without overlapping or dropping characters:
                </text>
                <text x="60" y="298" fill="#a7f3d0" fontSize="13" fontStyle="italic">
                  "BARRAC" (s[:6]) + "KPORE" (s[6:]) == "BARRACKPORE" (s)
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">STEP STRIDE: s[::2] (EVERY 2nd CHAR) VS REVERSAL: s[::-1]</text>

                {/* Stride 2 Grid */}
                <g transform="translate(0, 15)">
                  <text x="40" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold">1. Stride +2: s[::2] (Even Indices 0, 2, 4, 6, 8, 10)</text>
                  {sampleChars.map((ch, idx) => {
                    const xPos = 40 + idx * 72;
                    const isPicked = idx % 2 === 0;
                    return (
                      <g key={idx}>
                        <rect
                          x={xPos}
                          y="60"
                          width="60"
                          height="50"
                          rx="6"
                          fill={isPicked ? "#0c4a6e" : "#1e293b"}
                          stroke={isPicked ? "#0ea5e9" : "#334155"}
                          strokeWidth={isPicked ? "2" : "1"}
                        />
                        <text x={xPos + 30} y="92" fill={isPicked ? "#38bdf8" : "#64748b"} fontSize="18" fontWeight="bold" textAnchor="middle">{ch}</text>
                        <text x={xPos + 30} y="125" fill={isPicked ? "#7dd3fc" : "#475569"} fontSize="11" textAnchor="middle">i={idx}</text>
                      </g>
                    );
                  })}
                  <text x="40" y="150" fill="#a7f3d0" fontSize="13" fontWeight="bold">Result of s[::2] → 'BRCOE'</text>
                </g>

                {/* Reversal Stride -1 */}
                <g transform="translate(0, 165)">
                  <text x="40" y="35" fill="#f43f5e" fontSize="13" fontWeight="bold">2. Negative Stride -1: s[::-1] (Right-to-Left C-Memcpy Reversal)</text>
                  <rect x="40" y="45" width="800" height="65" rx="8" fill="#4c0519" stroke="#e11d48" strokeWidth="1.5" />
                  <text x="60" y="72" fill="#ffe4e6" fontSize="14" fontWeight="bold">
                    s[::-1] Output: 'EROPKCARRAB'
                  </text>
                  <text x="60" y="96" fill="#fda4af" fontSize="12">
                    Traverses from index 10 down to 0 in a single pass at native C speed without creating iterator overhead.
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SLICE PLAYGROUND / EXPERIMENT TAPE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Slice Experiment Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Click any preset slice below to see how Python evaluates boundary indices on the character string <code className="text-cyan-400 font-mono">"BARRACKPORE"</code>:
          </p>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
            {slicePresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setSelectedPresetSlice(preset.label)}
                className={clsx(
                  "p-3 rounded-xl text-left border transition-all duration-200",
                  selectedPresetSlice === preset.label
                    ? "bg-cyan-950/80 border-cyan-500 shadow-lg shadow-cyan-950/50 text-cyan-200"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                )}
              >
                <div className="font-mono font-bold text-sm text-cyan-300">{preset.label}</div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-1">{preset.desc}</div>
              </button>
            ))}
          </div>

          {/* Interactive Character Tape */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Current Slice Expression</span>
                <div className="text-2xl font-mono font-bold text-cyan-400 mt-0.5">{selectedPresetSlice}</div>
              </div>
              <div className="sm:text-right">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Extracted Substring</span>
                <div className="text-2xl font-mono font-bold text-emerald-400 mt-0.5">
                  "{currentPreset.result.replace(/^"|"$/g, "")}"
                </div>
              </div>
            </div>

            {/* Character Boxes with Dynamic Active State */}
            <div className="overflow-x-auto pb-2">
              <div className="flex items-center gap-2 min-w-[650px] justify-between">
                {sampleChars.map((ch, idx) => {
                  const isActive = currentPreset.activeIndices.includes(idx);
                  return (
                    <div
                      key={idx}
                      className={clsx(
                        "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300",
                        isActive
                          ? "bg-cyan-950/90 border-cyan-400 shadow-lg shadow-cyan-950 scale-105"
                          : "bg-slate-900/60 border-slate-800/80 opacity-40"
                      )}
                    >
                      <span className="text-xs font-mono text-slate-400">i={idx}</span>
                      <span className={clsx("text-2xl font-extrabold my-1", isActive ? "text-cyan-200" : "text-slate-500")}>
                        {ch}
                      </span>
                      <span className="text-xs font-mono text-purple-400">{-sampleChars.length + idx}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-sm text-slate-400 italic bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
              💡 <strong className="text-slate-200">Behavior:</strong> {currentPreset.desc}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: IN-DEPTH MECHANICS & FORMULAS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Complete Slicing Syntax Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Slice Syntax</th>
                  <th className="py-3.5 px-4 font-bold">Start Index</th>
                  <th className="py-3.5 px-4 font-bold">Stop Index</th>
                  <th className="py-3.5 px-4 font-bold">Step Stride</th>
                  <th className="py-3.5 px-4 font-bold">Example on "KOLKATA"</th>
                  <th className="py-3.5 px-4 font-bold">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">s[start:stop]</td>
                  <td className="py-3 px-4">start</td>
                  <td className="py-3 px-4">stop (exclusive)</td>
                  <td className="py-3 px-4 text-slate-400">+1 (default)</td>
                  <td className="py-3 px-4 font-mono">s[0:3]</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'KOL'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">s[:stop]</td>
                  <td className="py-3 px-4">0 (default)</td>
                  <td className="py-3 px-4">stop (exclusive)</td>
                  <td className="py-3 px-4 text-slate-400">+1</td>
                  <td className="py-3 px-4 font-mono">s[:4]</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'KOLK'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">s[start:]</td>
                  <td className="py-3 px-4">start</td>
                  <td className="py-3 px-4">len(s) (default)</td>
                  <td className="py-3 px-4 text-slate-400">+1</td>
                  <td className="py-3 px-4 font-mono">s[3:]</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'KATA'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">s[:]</td>
                  <td className="py-3 px-4">0</td>
                  <td className="py-3 px-4">len(s)</td>
                  <td className="py-3 px-4 text-slate-400">+1</td>
                  <td className="py-3 px-4 font-mono">s[:]</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'KOLKATA'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">s[::2]</td>
                  <td className="py-3 px-4">0</td>
                  <td className="py-3 px-4">len(s)</td>
                  <td className="py-3 px-4 text-cyan-400 font-bold">+2</td>
                  <td className="py-3 px-4 font-mono">s[::2]</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'KLAA'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">s[::-1]</td>
                  <td className="py-3 px-4">len(s) - 1</td>
                  <td className="py-3 px-4">before index 0</td>
                  <td className="py-3 px-4 text-pink-400 font-bold">-1</td>
                  <td className="py-3 px-4 font-mono">s[::-1]</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'ATAKLOK'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">s[5:1:-1]</td>
                  <td className="py-3 px-4">5 ('T')</td>
                  <td className="py-3 px-4">1 ('O' excl.)</td>
                  <td className="py-3 px-4 text-pink-400 font-bold">-1</td>
                  <td className="py-3 px-4 font-mono">s[5:1:-1]</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'TAKL'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">s[100:200]</td>
                  <td className="py-3 px-4">Clamped</td>
                  <td className="py-3 px-4">Clamped</td>
                  <td className="py-3 px-4 text-slate-400">+1</td>
                  <td className="py-3 px-4 font-mono">s[100:200]</td>
                  <td className="py-3 px-4 font-mono text-slate-400 font-bold">'' (Zero Error)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating indexing safety, slice strides, palindrome detection algorithms, and telemetry log parsing:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "indexing_and_bounds.py",
                code: indexingBounds,
                description: "Positive/negative indexing, IndexError behavior, and defensive character access.",
              },
              {
                filename: "slicing_and_step.py",
                code: slicingStep,
                description: "Half-open slicing interval, step strides, fault-tolerant clamping, and ISO date parsing.",
              },
              {
                filename: "string_reversing_and_palindromes.py",
                code: reversingPalindromes,
                description: "s[::-1] stride mechanics, phrase-level palindrome verification, and performance benchmarks.",
              },
              {
                filename: "log_parser_and_packet_extractor.py",
                code: logParserPacket,
                description: "Real-world payment transaction packet parser using exact slice boundaries.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Expecting Reverse Traversal without Negative Step
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">s[5:2]</code> with default positive step yields <code className="text-rose-300 font-mono">""</code> (empty string) because positive slicing only moves forward from left to right.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Supply <code className="text-emerald-300">s[5:2:-1]</code> with negative stride!
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Attempting Slice Item Mutation
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">s[0:2] = "AB"</code> crashes with <code className="text-amber-300 font-mono">TypeError: 'str' object does not support slice assignment</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Recombine substrings: <code className="text-emerald-300">s = "AB" + s[2:]</code>
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Off-By-One Stop Index Assumption
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Beginners often think <code className="text-purple-300 font-mono">s[0:4]</code> includes character at index 4. The stop index is strictly <strong>exclusive</strong>, so it extracts indices 0, 1, 2, 3 (4 characters total).
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> To include index <code className="text-emerald-300">k</code>, pass <code className="text-emerald-300">k + 1</code> as stop.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Direct Indexing vs Slicing Empty Strings
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If string <code className="text-cyan-300 font-mono">s = ""</code>, <code className="text-rose-400 font-mono">s[0]</code> raises <code className="text-rose-400 font-mono">IndexError</code>, while <code className="text-emerald-400 font-mono">s[:1]</code> safely yields <code className="text-emerald-400 font-mono">""</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Defensive Tip:</span> Use slice <code className="text-emerald-300">s[:1]</code> for optional first character checks!
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering sequence coordinates, half-open intervals, stride arithmetic, palindrome tests, and CPython optimization:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with ASCII coordinate grids, slice invariants, and palindrome detection formulas:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic2_indexing_and_slicing_notes.txt"
              title="Print Topic 2 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
