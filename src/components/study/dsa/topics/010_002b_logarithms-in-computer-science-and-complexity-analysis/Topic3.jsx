import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import demoCode from "./topic3_files/BitLengthTreeHeightDemo.c?raw";

export default function Topic3() {
  const sectionRefs = useRef([]);

  // Hardware & Tree Calculator State
  const [nodeCount, setNodeCount] = useState(1024);

  const bitLength = nodeCount > 0 ? Math.floor(Math.log2(nodeCount)) + 1 : 1;
  const treeHeight = nodeCount > 0 ? Math.floor(Math.log2(nodeCount)) : 0;
  const binaryRep = nodeCount.toString(2);

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
        
        {/* HEADER */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Segment 10 · Module 3 · Topic 3</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Physical Connections: Bit Length, Tree Heights & Heap Depths
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Connecting logarithmic math directly to hardware binary registers <code className="text-amber-300 font-mono">⌊log₂ N⌋ + 1</code>, balanced search tree heights, and heap sift bounds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Bits: ⌊log₂ N⌋ + 1</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Tree Height: ⌊log₂ N⌋</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: INTERACTIVE HARDWARE & TREE CALCULATOR */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>🧮</span>
                <span>Interactive Hardware Bit Length & Tree Depth Studio</span>
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Value N:</span>
                {[7, 8, 15, 16, 255, 1024, 65535, 1000000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setNodeCount(v)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                      nodeCount === v
                        ? "bg-cyan-950 border-cyan-500 text-cyan-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Binary Bit Representation</div>
                <div className="text-lg font-bold text-cyan-300 mt-1 break-all">
                  {binaryRep} <span className="text-xs text-slate-500">₍₂₎</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Exact Bits: {bitLength} bits</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Physical Bit Formula</div>
                <div className="text-lg font-bold text-amber-300 mt-1">
                  ⌊log₂({nodeCount})⌋ + 1
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  = {Math.floor(Math.log2(nodeCount))} + 1 = <strong>{bitLength} bits</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Balanced Tree Height</div>
                <div className="text-lg font-bold text-emerald-300 mt-1">
                  h = ⌊log₂({nodeCount})⌋ = {treeHeight}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Max Heap Swaps: {treeHeight}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: C CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>💻</span>
              <span>C Program: Bit Shifts, Bit Length & Tree Depths</span>
            </h2>
            <EditableCCodeBlock defaultCode={demoCode} />
          </div>
        </section>

        {/* SECTION 4: TEACHER MENTOR DIALOGUE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            topicName="Physical Computer Connections: Bit Length & Tree Heights"
            noteTitle="Sukanta Hui's Mentor Guide: Why 64-bit Pointers Can Address the Whole World"
            mentorAdvice={`"Notice how logarithm connects software to silicon: A 32-bit register can address 2^32 = 4,294,967,296 bytes (4 GB). A 64-bit pointer can address 2^64 ≈ 18.4 Quintillion bytes (16 Exabytes). Why? Because log2(18,446,744,073,709,551,616) = 64! In data structures, an AVL tree or Red-Black tree storing 1 million nodes only has a height of ~20 levels. When you traverse from root to leaf, you only execute 20 pointer dereferences. That is why balanced trees are blindingly fast!"`}
          />
        </section>

        {/* SECTION 5: FAQS & EXERCISES */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 6: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="Topic 3: Bit Length & Tree Heights Study Note" />
        </section>

      </div>
    </>
  );
}
