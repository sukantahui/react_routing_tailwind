import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import demoCode from "./topic4_files/polynomial_addition_demo.c?raw";

export default function Topic4() {
  const sectionRefs = useRef([]);

  // Interactive Visualizer State
  const [items, setItems] = useState([12, 28, 45, 67, 89]);
  const [activeStep, setActiveStep] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Visualizer initialized. Ready for step-by-step state simulation.");
  const [inputValue, setInputValue] = useState("");

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

  const handleStepForward = () => {
    setActiveStep((prev) => (prev + 1) % items.length);
    setStatusMessage(`Advanced to step ${(activeStep + 1) % items.length}: Invariant verified at index ${(activeStep + 1) % items.length}.`);
  };

  const handleAddElement = () => {
    const val = inputValue.trim() !== "" ? parseInt(inputValue, 10) : Math.floor(Math.random() * 90 + 10);
    if (isNaN(val)) return;
    setItems((prev) => [...prev.slice(-7), val]);
    setStatusMessage(`Pushed value ${val} into active memory structure. Buffer state updated.`);
    setInputValue("");
  };

  const handleReset = () => {
    setItems([12, 28, 45, 67, 89]);
    setActiveStep(0);
    setStatusMessage("Structure reset to base state.");
    setInputValue("");
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
            <span>DSA Segment 1 · Topic 4</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Circular Linked Lists: Tail pointer optimization, round-robin process scheduler simulation, and break-loop mechanics
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Singly, Doubly &amp; Circular Linked Lists: Deep technical architectural breakdown, memory layout mechanics, pointer invariants, and industrial C implementation at Coder &amp; AccoTax Barrackpore Lab.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-104</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: FRIENDLY TEACHER'S DESK */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: Physical Intuition &amp; Mental Models
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Classroom Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> The Physical Intuition Behind Circular Linked Lists: Tail pointer optimization, round-robin process scheduler simulation, and break-loop mechanics
                </h3>
                <p>
                  In computer science and low-level C programming, algorithms are not abstract magic—they are physical instructions executed on silicon hardware! When manipulating memory, your primary goals are maximizing CPU Cache Line hits (64-byte spatial locality), eliminating pointer chasing, and guaranteeing zero memory leaks.
                </p>
              </div>

              {/* Classroom Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Barrackpore Lab Classroom Discussion
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p>
                    <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, what is the most critical invariant we must protect when implementing Circular Linked Lists: Tail pointer optimization, round-robin process scheduler simulation, and break-loop mechanics in C?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Always validate your memory boundaries and pointer validity before dereferencing! In C, accessing memory past allocated bounds or dereferencing NULL causes undefined behavior or segmentation faults. Every allocation must have deterministic ownership and cleanup."</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Tuhina:</strong> <em>"And by setting pointers to NULL immediately after calling free(), we prevent Dangling Pointers and Use-After-Free bugs!"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Exactly right! That zero-leak discipline is what separates a novice coder from a world-class systems engineer."</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE VISUALIZER SIMULATOR */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive State &amp; Memory Visualizer
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Step-by-step structural inspection &amp; pointer traversal simulation
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
                  Elements: <strong className="text-white">{items.length}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-sky-400">
                  Active Focus: <strong className="text-white">[{activeStep}]</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                  Memory: <strong className="text-white">{items.length * 4}B</strong>
                </div>
              </div>
            </div>

            {/* Interactive Visual Element Chain */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Memory Nodes &amp; Pointer Registers:
              </div>
              <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 min-h-[90px]">
                {items.map((val, idx) => {
                  const isFocused = idx === activeStep;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className={`flex flex-col items-center justify-center px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                          isFocused
                            ? "bg-gradient-to-b from-cyan-950 to-slate-900 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-950/80 scale-105"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-[10px] font-mono text-slate-400">ptr[{idx}]</span>
                        <span className="text-base font-bold my-0.5">{val}</span>
                        <span className="text-[9px] font-mono text-cyan-500/80">0x{(2048 + idx * 8).toString(16)}</span>
                      </div>
                      {idx < items.length - 1 && (
                        <span className="text-cyan-600 font-bold text-sm select-none">&rarr;</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Value"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono w-28"
              />
              <button
                onClick={handleAddElement}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-950 flex items-center gap-1.5"
              >
                <span>➕</span> Insert Node
              </button>
              <button
                onClick={handleStepForward}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all border border-slate-700 flex items-center gap-1.5"
              >
                <span>⏭️</span> Step Forward
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-sm transition-all border border-slate-800"
              >
                Reset
              </button>
            </div>

            {/* Real-time Status Log */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-400 flex items-center gap-2">
              <span className="text-base">ℹ️</span>
              <span>{statusMessage}</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: DEEP TECHNICAL EXPLANATION & ARCHITECTURE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <span>📚</span> Deep Technical Breakdown &amp; Architectural Invariants
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <span>1️⃣</span> Physical Memory &amp; Cache Mechanics
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hardware memory efficiency is dictated by cache line utilization. Sequential accesses allow the CPU L1 prefetcher to load 64-byte blocks in a single ~1ns cycle instead of suffering ~100ns RAM stalls.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>Stack vs Heap: Automatic fast frame cleanup vs dynamic lifetime control.</li>
                <li>Struct Alignment: Fields ordered to prevent unnecessary compiler padding bytes.</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                <span>2️⃣</span> State Transitions &amp; Invariants
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Algorithmic correctness depends on strictly maintaining structural invariants before and after every pointer mutation or state transition.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>Base Cases: Explicit guards for empty containers or single-element inputs.</li>
                <li>Pointer Ordering: Saving downstream references prior to link reassignment.</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>3️⃣</span> Asymptotic Complexity Bounds
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Asymptotic efficiency guarantees predictable execution time and minimal auxiliary space overhead across large input scales.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>Time Complexity: Optimal average and worst-case mathematical bounds.</li>
                <li>Auxiliary Space: Strictly constant O(1) or minimal linear working memory.</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                <span>4️⃣</span> Memory Safety &amp; Zero-Leak Protocol
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Industrial C applications enforce strict ownership semantics and systematic deallocation routines to avoid production vulnerabilities.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>Neutralization: Always setting ptr = NULL immediately following free(ptr).</li>
                <li>Diagnostics: Verification via AddressSanitizer (-fsanitize=address) and Valgrind.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable Production C Implementation
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="polynomial_addition_demo.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="DSA Topic Note: Circular Linked Lists: Tail pointer optimization, round-robin process scheduler simulation, and break-loop mechanics" />
        </section>

        {/* SECTION 8: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
