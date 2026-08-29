import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/heap_tree_sort_demo.c?raw";

export default function HeapTreeSortTopic() {
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
            <span>DSA Master Class · Sorting Topic 03</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Tree &amp; Priority Queue Sorts: Heap Sort &amp; Tree Sort in C
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master in-place max heap array extraction, binary search tree inorder extraction, space complexity comparisons, and priority sorting.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-SORT-103</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* FRIENDLY TEACHER EXPLANATION SECTION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
                  Teacher's Desk: Heap Sort vs Tree Sort
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-amber-400 font-bold flex items-center gap-2 text-base">
                  <span>🏆</span> King of the Hill Heap Sort
                </h3>
                <p>
                  Think of Heap Sort as a "King of the Hill" tournament! The largest number is crowned King at the top (index 0). We move the King to the winner's podium at the end of the array, re-heapify the remaining players, and crown the next King until everyone is sorted!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CODE EDITOR DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable C Heap Sort &amp; Tree Sort Code
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="heap_tree_sort.c" />
        </section>

        {/* FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="Sorting Master Class Note 3: Heap & Tree Sort" />
        </section>

        {/* MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
