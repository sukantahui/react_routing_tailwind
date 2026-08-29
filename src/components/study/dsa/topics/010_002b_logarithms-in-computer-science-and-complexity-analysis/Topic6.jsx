import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import demoCode from "./topic6_files/LogarithmBenchmarkLab.c?raw";

export default function Topic6() {
  const sectionRefs = useRef([]);

  // Hardware log bench state
  const [benchVal, setBenchVal] = useState(1024);

  const bitLength = benchVal > 0 ? Math.floor(Math.log2(benchVal)) + 1 : 1;
  const hardwareLog = benchVal > 0 ? Math.floor(Math.log2(benchVal)) : 0;

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
            <span>DSA Segment 10 · Module 3 · Topic 6</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Practical Coding Lab & Hardware Benchmarking Projects
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Industrial C implementer for single-cycle CPU instructions <code className="text-amber-300 font-mono">__builtin_clz()</code>, Sparse Table Range Minimum Queries (RMQ), and Binary Lifting.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Instruction: __builtin_clz (1 Cycle)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Application: Sparse Tables & RMQ</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: INTERACTIVE HARDWARE BENCH */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>⚡</span>
                <span>Interactive Hardware Bit-Scan & Log₂ Workbench</span>
              </h2>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">Test N:</span>
                {[15, 16, 255, 1024, 65535, 1048576, 1073741824].map((v) => (
                  <button
                    key={v}
                    onClick={() => setBenchVal(v)}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                      benchVal === v
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
                <div className="text-xs uppercase text-slate-500">Selected Integer N</div>
                <div className="text-xl font-black text-cyan-300 mt-1">{benchVal.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500 mt-1">32-bit unsigned uint</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Hardware CLZ Bit Scan</div>
                <div className="text-xl font-black text-amber-300 mt-1">
                  31 - CLZ({benchVal}) = {hardwareLog}
                </div>
                <div className="text-[10px] text-emerald-400 mt-1">1 CPU cycle latency</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs uppercase text-slate-500">Binary Register Width</div>
                <div className="text-xl font-black text-emerald-300 mt-1">{bitLength} bits</div>
                <div className="text-[10px] text-slate-500 mt-1">Active bit count</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: C CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>💻</span>
              <span>C Program: Hardware CLZ vs Bit-Shifts vs Math Library</span>
            </h2>
            <EditableCCodeBlock defaultCode={demoCode} />
          </div>
        </section>

        {/* SECTION 4: TEACHER MENTOR DIALOGUE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            topicName="Practical Coding Lab & Hardware Benchmarking Projects"
            noteTitle="Sukanta Hui's Mentor Guide: The Capstone of Logarithmic Mastery in C"
            mentorAdvice={`"When writing competitive programming code in C/C++, never call log2() from math.h inside tight loops because floating-point operations incur high overhead. Instead, write (31 - __builtin_clz(n)) or (63 - __builtin_clzll(n)). This single assembly instruction computes the exact floor(log2 N) in 1 nanosecond. Use it for Sparse Tables, LCA binary lifting, and bitmask algorithms. Master the mathematics, and your code will run at the absolute physical speed limit of the silicon chip!"`}
          />
        </section>

        {/* SECTION 5: FAQS & EXERCISES */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 6: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="Topic 6: Practical Logarithm Coding Lab Study Note" />
        </section>

      </div>
    </>
  );
}
