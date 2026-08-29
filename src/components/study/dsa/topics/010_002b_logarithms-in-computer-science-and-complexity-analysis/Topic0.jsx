import React, { useEffect, useRef, useState, useMemo } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/LogarithmFoundationsDemo.c?raw";

export default function Topic0() {
  const sectionRefs = useRef([]);

  // Interactive Continuous Halving Simulator State
  const [inputN, setInputN] = useState(1024);
  const [customInput, setCustomInput] = useState("");
  const [selectedBase, setSelectedBase] = useState(2);

  // Compute halving steps for visualizer
  const halvingTrace = useMemo(() => {
    const steps = [];
    let current = Math.max(1, Math.floor(Number(inputN) || 1));
    let stepCount = 0;
    while (current > 1) {
      const next = Math.floor(current / selectedBase);
      steps.push({
        step: stepCount + 1,
        before: current,
        after: next,
        quotient: (current / selectedBase).toFixed(2)
      });
      current = next;
      stepCount++;
      if (stepCount > 100) break; // safety guard
    }
    return steps;
  }, [inputN, selectedBase]);

  const exactLog = useMemo(() => {
    const n = Math.max(1, Number(inputN) || 1);
    if (selectedBase === 2) return Math.log2(n);
    if (selectedBase === 10) return Math.log10(n);
    return Math.log(n) / Math.log(selectedBase);
  }, [inputN, selectedBase]);

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

  const handlePreset = (val) => {
    setInputN(val);
    setCustomInput("");
  };

  const handleCustomApply = () => {
    const parsed = parseInt(customInput, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setInputN(parsed);
    }
  };

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

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* SECTION 1: HEADER & METADATA */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Segment 10 · Module 3 · Topic 0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            The Mathematical Foundation of Logarithms in Computer Science & DSA
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Unraveling the inverse of exponentiation, the fundamental "Halving" paradigm in computer algorithms, and why <code className="text-amber-300 font-mono">O(log₂ N)</code> enables modern computing to search billions of records in just 30 operations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course: DSA Master Edition</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder & AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: CORE DEFINITIONS & TAXONOMY CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <span className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xl">
                📐
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  1. What is a Logarithm? (The Inverse of Exponentiation)
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Mathematical formalization and its physical role in computer memory & algorithm complexity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Box: Standard Mathematical Definition */}
              <div className="p-5 sm:p-6 rounded-xl bg-slate-950 border border-cyan-500/30 shadow-lg space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      Standard Mathematical Definition
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Pure Mathematics
                    </span>
                  </div>

                  {/* Main Math Equation Box */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-400/40 text-center shadow-inner my-2">
                    <div className="flex items-center justify-center gap-3 font-mono text-lg sm:text-xl font-bold text-cyan-200">
                      <span className="text-sky-300">log<sub className="text-xs text-amber-300 font-normal">b</sub>(x) = y</span>
                      <span className="text-slate-400 font-sans text-xl font-normal">⟺</span>
                      <span className="text-emerald-300">b<sup className="text-xs text-amber-300 font-normal">y</sup> = x</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                    A logarithm answers the fundamental question: <em>"To what power <code className="text-amber-300 font-bold">y</code> must we raise base <code className="text-sky-300 font-bold">b</code> to produce number <code className="text-emerald-300 font-bold">x</code>?"</em>
                  </p>
                </div>

                {/* Concrete Examples Grid */}
                <div className="mt-4 pt-3 border-t border-slate-850 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="text-cyan-300 font-bold">log₂(8) = 3</span>
                    <span className="text-slate-400 text-[11px]">because 2³ = 8</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="text-cyan-300 font-bold">log₂(1024) = 10</span>
                    <span className="text-slate-400 text-[11px]">because 2¹⁰ = 1024</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="text-cyan-300 font-bold">log₁₀(1000) = 3</span>
                    <span className="text-slate-400 text-[11px]">because 10³ = 1000</span>
                  </div>
                </div>
              </div>

              {/* Right Box: The Computer Science Intuition */}
              <div className="p-5 sm:p-6 rounded-xl bg-slate-950 border border-amber-500/30 shadow-lg space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      The Computer Science Intuition
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Halve-and-Conquer
                    </span>
                  </div>

                  {/* Operational Question Box */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-400/40 text-center shadow-inner my-2">
                    <div className="text-sm sm:text-base font-bold text-amber-200 font-sans leading-snug">
                      "How many times can you divide N by 2 before reaching 1?"
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                    If an algorithm cuts the remaining problem size <code className="text-amber-300 font-bold">N</code> in half at every step (Binary Search, MergeSort, Balanced BST), the total number of halving steps <code className="text-cyan-300 font-bold">k</code> satisfies:
                  </p>
                </div>

                {/* Mathematical Derivation Flow */}
                <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-slate-200">
                    <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-amber-300 font-bold">N / 2ᵏ = 1</span>
                    <span className="text-slate-500 font-sans text-sm font-normal">⟹</span>
                    <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-sky-300 font-bold">N = 2ᵏ</span>
                    <span className="text-slate-500 font-sans text-sm font-normal">⟹</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/60 text-emerald-300 font-bold shadow-sm">k = log₂ N</span>
                  </div>
                  <div className="text-[11px] text-slate-400 text-center pt-1 font-sans">
                    Each division by 2 eliminates <strong className="text-white">50%</strong> of all remaining candidates.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE CONTINUOUS HALVING SIMULATOR */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-cyan-950 border border-cyan-700/60 text-cyan-300 text-xl">
                  ⚙️
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Interactive Logarithm & Halving Studio
                  </h2>
                  <p className="text-xs text-slate-400">
                    Observe how any input N is progressively halved down to 1, demonstrating exact step count vs ⌊log₂(N)⌋.
                  </p>
                </div>
              </div>

              {/* Base Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 px-2 font-mono">Base:</span>
                {[2, 3, 10].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBase(b)}
                    className={`px-2.5 py-1 rounded-lg font-bold font-mono transition cursor-pointer ${
                      selectedBase === b
                        ? "bg-cyan-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    log<sub>{b}</sub>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls & Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Presets (N):</span>
              {[8, 16, 64, 128, 1024, 1000000].map((p) => (
                <button
                  key={p}
                  onClick={() => handlePreset(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition cursor-pointer border ${
                    inputN === p && !customInput
                      ? "bg-cyan-950 border-cyan-500 text-cyan-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {p.toLocaleString()}
                </button>
              ))}

              <div className="flex items-center gap-1.5 ml-auto">
                <input
                  type="number"
                  placeholder="Custom N..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCustomApply()}
                  className="w-32 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleCustomApply}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-semibold transition cursor-pointer border border-slate-700"
                >
                  Set N
                </button>
              </div>
            </div>

            {/* Results Metric Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-mono">Current Input (N)</div>
                <div className="text-2xl font-black text-cyan-300 font-mono mt-1">
                  {inputN.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-mono">Exact log<sub>{selectedBase}</sub>(N)</div>
                <div className="text-2xl font-black text-amber-300 font-mono mt-1">
                  {exactLog.toFixed(4)}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-mono">Total Halving Steps</div>
                <div className="text-2xl font-black text-emerald-300 font-mono mt-1">
                  {halvingTrace.length} <span className="text-xs font-normal text-slate-400">(= ⌊log⌋)</span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Halving Trace Table */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Step-by-Step Division Log:</span>
                <span className="text-slate-500 text-[11px] font-normal">
                  Reduces to 1 in {halvingTrace.length} steps
                </span>
              </div>

              <div className="max-h-60 overflow-y-auto border border-slate-800 rounded-xl bg-slate-950/90 divide-y divide-slate-850">
                {halvingTrace.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    N is already 1. 0 divisions required.
                  </div>
                ) : (
                  halvingTrace.map((row) => (
                    <div
                      key={row.step}
                      className="px-4 py-2.5 flex items-center justify-between text-xs font-mono hover:bg-slate-900/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-[10px]">
                          Step #{row.step}
                        </span>
                        <span className="text-slate-300">
                          {row.before.toLocaleString()} ÷ {selectedBase}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <span>→</span>
                        <span className="font-bold text-amber-300">
                          {row.after.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: LINEAR VS LOGARITHMIC TIME BENCHMARK */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>🚀</span>
              <span>Linear Time O(N) vs Logarithmic Time O(log₂ N)</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To appreciate why log is considered the "holy grail" of algorithmic efficiency, observe the astronomical gap in operation count as datasets scale to industrial proportions:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left font-mono border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Problem Size (N)</th>
                    <th className="py-3 px-4 text-rose-400">Linear Search O(N)</th>
                    <th className="py-3 px-4 text-emerald-400">Binary Search O(log₂ N)</th>
                    <th className="py-3 px-4 text-cyan-400">Speedup Multiplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-200">
                  <tr className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-4 font-bold">10 items</td>
                    <td className="py-2.5 px-4 text-rose-300">10 steps</td>
                    <td className="py-2.5 px-4 text-emerald-300">4 steps</td>
                    <td className="py-2.5 px-4 text-cyan-300">2.5× faster</td>
                  </tr>
                  <tr className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-4 font-bold">1,000 items</td>
                    <td className="py-2.5 px-4 text-rose-300">1,000 steps</td>
                    <td className="py-2.5 px-4 text-emerald-300">10 steps</td>
                    <td className="py-2.5 px-4 text-cyan-300">100× faster</td>
                  </tr>
                  <tr className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-4 font-bold">1,000,000 (1 Million)</td>
                    <td className="py-2.5 px-4 text-rose-300">1,000,000 steps</td>
                    <td className="py-2.5 px-4 text-emerald-300">20 steps</td>
                    <td className="py-2.5 px-4 text-cyan-300">50,000× faster</td>
                  </tr>
                  <tr className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-4 font-bold">1,000,000,000 (1 Billion)</td>
                    <td className="py-2.5 px-4 text-rose-300">1,000,000,000 steps (~1 sec)</td>
                    <td className="py-2.5 px-4 text-emerald-300">30 steps (&lt; 1 nanosec)</td>
                    <td className="py-2.5 px-4 text-cyan-300">33,333,333× faster</td>
                  </tr>
                  <tr className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-4 font-bold">10¹⁸ (1 Exabyte items)</td>
                    <td className="py-2.5 px-4 text-rose-300">10¹⁸ steps (31.7 years)</td>
                    <td className="py-2.5 px-4 text-emerald-300">60 steps (&lt; 1 microsec)</td>
                    <td className="py-2.5 px-4 text-cyan-300">10¹⁶× faster</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: C CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>💻</span>
              <span>Runnable C Program: Continuous Halving vs log2(N)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Compile and run this C implementation to test step counts against exact logarithmic formulas across small and gigantic datasets.
            </p>
            <EditableCCodeBlock defaultCode={demoCode} />
          </div>
        </section>

        {/* SECTION 6: TEACHER MENTOR DIALOGUE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            topicName="Mathematical Foundations of Logarithms in Computer Science"
            noteTitle="Sukanta Hui's Mentor Guide: Why Logarithms are the Crown Jewel of Algorithm Design"
            mentorAdvice={`"When beginners see Big-O notation, they memorize O(log N) as a theoretical formula. But in my Barrackpore lab, I always tell my students: Logarithm is not just math—it is the physics of cutting a search space in half. Every time you divide an array into two halves in binary search or balanced BST, you eliminate 50% of the entire universe of data in one single CPU clock cycle! That is why searching 1 billion sorted records takes only 30 comparisons. Always remember: exponentiation (2^k) blows numbers up into astronomical sizes, and logarithm (log2 N) collapses astronomical sizes back down into tiny, lightning-fast CPU steps."`}
          />
        </section>

        {/* SECTION 7: FAQS & EXERCISES */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 8: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="Topic 0: Mathematical Foundations of Logarithms in CS Study Note" />
        </section>

      </div>
    </>
  );
}
