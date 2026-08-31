import React, { useEffect, useRef, useState, useMemo } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import demoCode from "./topic2_files/MultiplicativeLoopDemo.c?raw";

export default function Topic2() {
  const sectionRefs = useRef([]);

  // Interactive Loop Step Counter State
  const [loopN, setLoopN] = useState(64);
  const [multiplier, setMultiplier] = useState(2);
  const [loopType, setLoopType] = useState("multiply"); // 'multiply' | 'divide'

  const iterations = useMemo(() => {
    const list = [];
    const n = Math.max(2, Number(loopN) || 2);
    const m = Math.max(2, Number(multiplier) || 2);

    if (loopType === "multiply") {
      let i = 1;
      let step = 0;
      while (i < n) {
        list.push({
          step: step + 1,
          iVal: i,
          power: Math.round(Math.log(i) / Math.log(m)),
          next: i * m
        });
        i *= m;
        step++;
        if (step > 100) break;
      }
    } else {
      let i = n;
      let step = 0;
      while (i > 1) {
        list.push({
          step: step + 1,
          iVal: i,
          power: Math.round(Math.log(i) / Math.log(m)),
          next: Math.floor(i / m)
        });
        i = Math.floor(i / m);
        step++;
        if (step > 100) break;
      }
    }
    return list;
  }, [loopN, multiplier, loopType]);

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
            <span>DSA Segment 10 · Module 3 · Topic 2</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Multiplicative Loop Stepping in C: i *= 2, i /= 2, i *= k
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Deriving exact logarithmic step-count summations from C loop control structures, analyzing nested multiplicative loops, and avoiding common complexity pitfalls.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Step Counting Formula: ⌈log_k N⌉</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Class: O(log N)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: INTERACTIVE STEP COUNTER STUDIO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>⏱️</span>
                  <span>Interactive C Loop Step Counter</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Simulate C loop executions with custom bounds and multipliers to inspect exact iteration states.
                </p>
              </div>

              {/* Loop Type Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <button
                  onClick={() => setLoopType("multiply")}
                  className={`px-3 py-1 rounded-lg font-mono font-bold transition cursor-pointer ${
                    loopType === "multiply"
                      ? "bg-cyan-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  i *= {multiplier}
                </button>
                <button
                  onClick={() => setLoopType("divide")}
                  className={`px-3 py-1 rounded-lg font-mono font-bold transition cursor-pointer ${
                    loopType === "divide"
                      ? "bg-cyan-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  i /= {multiplier}
                </button>
              </div>
            </div>

            {/* Config inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-mono text-slate-400 flex justify-between">
                  <span>Target Limit (N):</span>
                  <span className="font-bold text-cyan-300">{loopN}</span>
                </label>
                <input
                  type="range"
                  min="8"
                  max="1024"
                  step="8"
                  value={loopN}
                  onChange={(e) => setLoopN(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-mono text-slate-400 flex justify-between">
                  <span>Step Multiplier (k):</span>
                  <span className="font-bold text-amber-300">{multiplier}</span>
                </label>
                <div className="flex items-center gap-2">
                  {[2, 3, 4, 8].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMultiplier(m)}
                      className={`flex-1 py-1 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                        multiplier === m
                          ? "bg-amber-950 border-amber-500 text-amber-200"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      k = {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Metric Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-500 uppercase">C Loop Syntax</div>
                <div className="text-xs font-bold text-slate-200 mt-1">
                  {loopType === "multiply" ? `for(int i=1; i<${loopN}; i*=${multiplier})` : `for(int i=${loopN}; i>1; i/=${multiplier})`}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-500 uppercase">Theoretical Formula</div>
                <div className="text-xs font-bold text-amber-300 mt-1">
                  ⌈log<sub>{multiplier}</sub>({loopN})⌉ = {Math.ceil(Math.log(loopN) / Math.log(multiplier))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-500 uppercase">Physical Iteration Count</div>
                <div className="text-xl font-black text-emerald-300 mt-0.5">
                  {iterations.length} ticks
                </div>
              </div>
            </div>

            {/* Loop Trace */}
            <div className="max-h-56 overflow-y-auto border border-slate-800 rounded-xl bg-slate-950 divide-y divide-slate-850 font-mono text-xs">
              {iterations.map((it) => (
                <div key={it.step} className="px-4 py-2 flex items-center justify-between hover:bg-slate-900/60 transition">
                  <span className="text-cyan-400 font-bold">Tick #{it.step}</span>
                  <span className="text-slate-300">
                    variable i = {it.iVal} {loopType === "multiply" ? `(= ${multiplier}^${it.step - 1})` : ""}
                  </span>
                  <span className="text-amber-400">→ next i = {it.next}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: C CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>💻</span>
              <span>C Program: Multiplicative Loop Step Analysis</span>
            </h2>
            <EditableCCodeBlock defaultCode={demoCode} />
          </div>
        </section>

        {/* SECTION 4: TEACHER MENTOR DIALOGUE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            topicName="Multiplicative Loop Stepping in C"
            noteTitle="Sukanta Hui's Mentor Guide: Spotting Hidden Logarithms in Code Loops"
            mentorAdvice={`"When analyzing loops, train your eyes to look at the step update expression:
1) If i increases by addition (i += 1 or i += c) => LINEAR time O(N).
2) If i increases by multiplication (i *= 2 or i *= k) or decreases by division (i /= 2) => LOGARITHMIC time O(log N).
3) If i increases quadratically (i = i * i) => DOUBLE LOGARITHMIC time O(log log N).
This single diagnostic heuristic will solve 95% of all loop complexity questions in competitive programming!"`}
          />
        </section>

        {/* SECTION 5: FAQS & EXERCISES */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 6: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="Topic 2: Multiplicative Loop Stepping Study Note" />
        </section>

      </div>
    </>
  );
}
