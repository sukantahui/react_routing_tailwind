import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import demoCode from "./topic5_files/SortingLowerBoundDemo.c?raw";

export default function Topic5() {
  const sectionRefs = useRef([]);

  // Decision tree simulation state
  const [elementsN, setElementsN] = useState(8);

  // Compute log2(N!)
  let log2Fact = 0;
  for (let i = 1; i <= elementsN; i++) {
    log2Fact += Math.log2(i);
  }
  const nLogn = elementsN * Math.log2(elementsN);

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
            <span>DSA Segment 10 · Module 3 · Topic 5</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            The Asymptotic Scale & Sorting Lower Bound: Ω(N log N)
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Proving the mathematical impossibility of comparison sorting below <code className="text-amber-300 font-mono">Ω(N log N)</code> via Decision Trees and Stirling's Approximation of <code className="text-cyan-300 font-mono">log₂(N!)</code>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Proof: Decision Tree Leaves ≥ N!</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Bound: Ω(N log N)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: INTERACTIVE DECISION TREE BENCHMARK */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>🌲</span>
                <span>Decision Tree Permutations vs log₂(N!) Studio</span>
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Array Size (N):</span>
                {[4, 8, 16, 32, 64, 100].map((v) => (
                  <button
                    key={v}
                    onClick={() => setElementsN(v)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                      elementsN === v
                        ? "bg-cyan-950 border-cyan-500 text-cyan-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    N={v}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Permutations (Leaves)</div>
                <div className="text-xl font-bold text-cyan-300 mt-1">
                  {elementsN}! permutations
                </div>
                <div className="text-[10px] text-slate-500 mt-1">All possible orderings</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Min Tree Height ⌈log₂(N!)⌉</div>
                <div className="text-xl font-bold text-amber-300 mt-1">
                  {Math.ceil(log2Fact)} comparisons
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Exact decision tree depth</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">N × log₂(N) Metric</div>
                <div className="text-xl font-bold text-emerald-300 mt-1">
                  {nLogn.toFixed(1)} operations
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Asymptotically Θ(N log N)</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: C CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>💻</span>
              <span>C Program: Decision Tree & Stirling's Approximation</span>
            </h2>
            <EditableCCodeBlock defaultCode={demoCode} />
          </div>
        </section>

        {/* SECTION 4: TEACHER MENTOR DIALOGUE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            topicName="The Asymptotic Scale & Sorting Lower Bound"
            noteTitle="Sukanta Hui's Mentor Guide: Why MergeSort & HeapSort Cannot Be Beaten"
            mentorAdvice={`"Whenever a student tells me they invented an O(N) comparison sort, I show them the Decision Tree proof: To distinguish between N! possible permutations with binary true/false comparisons, the tree MUST have at least N! leaves. A binary tree with N! leaves has height log2(N!) = Theta(N log N). MergeSort and HeapSort achieve O(N log N), making them mathematically optimal. You can only beat N log N by abandoning comparisons altogether (e.g. Radix Sort or Counting Sort)!"`}
          />
        </section>

        {/* SECTION 5: FAQS & EXERCISES */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 6: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="Topic 5: Sorting Lower Bound Study Note" />
        </section>

      </div>
    </>
  );
}
