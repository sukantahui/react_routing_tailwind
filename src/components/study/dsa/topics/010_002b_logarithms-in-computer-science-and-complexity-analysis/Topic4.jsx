import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import demoCode from "./topic4_files/ExoticLogarithmsDemo.c?raw";

export default function Topic4() {
  const sectionRefs = useRef([]);

  // Exotic Logarithm State
  const [exoticN, setExoticN] = useState(1000000000);

  const l2 = Math.log2(exoticN);
  const ll2 = l2 > 0 ? Math.log2(l2) : 0;

  // Compute log*
  let temp = exoticN;
  let lstar = 0;
  while (temp > 1) {
    temp = Math.log2(temp);
    lstar++;
  }

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
            <span>DSA Segment 10 · Module 3 · Topic 4</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Exotic Logarithms: Double Log O(log log N) & Iterated Log O(log* N)
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Exploring hyper-efficient sub-logarithmic algorithms, Van Emde Boas Trees, and the legendary Iterated Logarithm <code className="text-amber-300 font-mono">log* N ≤ 5</code> in Disjoint Set Union.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Class: O(log log N)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Class: O(log* N) ≤ 5</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: INTERACTIVE EXOTIC LOG STUDIO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>🌌</span>
                <span>Interactive Double Log & Iterated Log Studio</span>
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Preset:</span>
                {[16, 256, 65536, 1000000, 1000000000, 1e15].map((v) => (
                  <button
                    key={v}
                    onClick={() => setExoticN(v)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                      exoticN === v
                        ? "bg-cyan-950 border-cyan-500 text-cyan-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {v >= 1e9 ? `${(v/1e9).toFixed(0)}B` : v}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Standard log₂(N)</div>
                <div className="text-2xl font-black text-cyan-300 mt-1">{l2.toFixed(2)}</div>
                <div className="text-[11px] text-slate-400 mt-1">Binary Search Steps</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Double log₂(log₂ N)</div>
                <div className="text-2xl font-black text-amber-300 mt-1">{ll2.toFixed(2)}</div>
                <div className="text-[11px] text-slate-400 mt-1">vEB Tree / Sieve Bound</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Iterated log*(N)</div>
                <div className="text-2xl font-black text-emerald-300 mt-1">{lstar}</div>
                <div className="text-[11px] text-slate-400 mt-1">DSU Path Compression (≤ 5)</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: C CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>💻</span>
              <span>C Program: Exotic Logarithm Benchmark</span>
            </h2>
            <EditableCCodeBlock defaultCode={demoCode} />
          </div>
        </section>

        {/* SECTION 4: TEACHER MENTOR DIALOGUE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            topicName="Exotic Logarithms: Double Log & Iterated Log (log* N)"
            noteTitle="Sukanta Hui's Mentor Guide: The Slowest Growing Function in Computer Science"
            mentorAdvice={`"Iterated logarithm log* N is so astonishingly slow that it barely increases even if your dataset reaches the number of protons in the entire universe (10^80). When you use Disjoint Set Union (DSU) with Path Compression and Union by Rank, each find operation runs in O(alpha(N)) <= O(log* N) <= 5. In computer science engineering, this is practically constant time O(1)!"`}
          />
        </section>

        {/* SECTION 5: FAQS & EXERCISES */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 6: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="Topic 4: Exotic Logarithms Study Note" />
        </section>

      </div>
    </>
  );
}
