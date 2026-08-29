import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/sorting_searching_demo.c?raw";

export default function SortingSearchingTopic() {
  const sectionRefs = useRef([]);

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
            <span>DSA Module 08 · Topic 0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Sorting Algorithms, Binary Search &amp; Big-O Analysis in C
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master asymptotic analysis, Divide &amp; Conquer partitioning, Quick Sort, Merge Sort, Heap Sort, and logarithmic Binary Searching.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-302</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* FRIENDLY TEACHER EXPLANATION SECTION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/30 border border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-2xl shadow-inner">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-blue-300">
                  Teacher's Desk: Divide &amp; Conquer Intuition &amp; Binary Searching
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui's Phonebook Analogy &amp; Big-O Complexity Breakdown
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-blue-400 font-bold flex items-center gap-2 text-base">
                  <span>📖</span> The Phonebook Search Metaphor
                </h3>
                <p>
                  Imagine searching for a friend's name in a 1,000-page telephone directory.
                </p>
                <p>
                  A <strong>Linear Search</strong> looks page-by-page from page 1 to 1000 — taking up to 1,000 checks!
                </p>
                <p>
                  A <strong>Binary Search</strong> opens the book right in the middle (page 500). Is the name before or after? If after, throw away pages 1-500 and open page 750! In just 10 steps (<code className="text-emerald-400 font-mono">log2(1000) ≈ 10</code>), you find the exact entry!
                </p>
              </div>

              {/* Lab Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Lab Session: Swadeep &amp; Tuhina on Quick Sort Pivots
                </h3>
                <div className="space-y-2 text-xs sm:text-sm font-sans border-l-2 border-blue-500/40 pl-4 py-1">
                  <p><strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why is Quick Sort generally faster than Merge Sort in practice if both are O(n log n)?"</em></p>
                  <p><strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Excellent question, Swadeep! Quick Sort sorts <strong>in-place</strong> directly in RAM cache, whereas Merge Sort requires allocating extra O(n) array memory!"</em></p>
                  <p><strong className="text-purple-400">Tuhina:</strong> <em>"So Quick Sort has better cache locality!"</em></p>
                  <p><strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Exactly, Tuhina! Hardware CPU caches love contiguous in-place element swapping!"</em></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL CONCEPT EXPOSITION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <span>💡</span> Algorithmic Efficiency &amp; Partitioning
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              Sorting algorithms organize data elements into non-decreasing order. Quick Sort uses Lomuto or Hoare partitioning to achieve <code className="text-emerald-400 font-mono">O(n log n)</code> average execution time.
            </p>
          </div>
        </section>

        {/* CODE EDITOR DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable C Quick Sort &amp; Binary Search Code
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="quick_sort_binary_search.c" />
        </section>

        {/* FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="DSA Module 8 Note: Sorting &amp; Searching Mechanics" />
        </section>

        {/* MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
