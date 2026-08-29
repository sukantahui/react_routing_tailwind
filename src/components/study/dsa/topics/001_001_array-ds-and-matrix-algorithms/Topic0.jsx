import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import arrayDemoCode from "./topic0_files/array_demo.c?raw";

export default function ArrayTopic() {
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
        
        {/* SECTION 1: HEADER & METADATA */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Module 01 · Topic 0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Array Data Structure &amp; Dynamic Memory in C
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master physical memory layouts, row-major matrices, pointer arithmetic, and dynamic heap array resizing using <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">malloc()</code> and <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">realloc()</code> in C.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-101</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: FRIENDLY TEACHER EXPLANATION & CLASSROOM DISCUSSIONS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: Friendly Guide to Arrays &amp; Memory
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Concept breakdown with Sukanta Hui &amp; Barrackpore Lab Students
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Intuition & Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>🏢</span> The Apartment Building Metaphor
                </h3>
                <p>
                  Hello my dear students! Imagine a long hallway in a modern apartment building where flat numbers are sequential: <strong>Room 101, Room 102, Room 103...</strong> Each room takes up the exact same physical width along the hallway.
                </p>
                <p>
                  If you know the location of Room 101 (Base Address), finding Room 105 doesn't require knocking on every door from 101 onwards! You simply jump forward 4 doors: <code className="text-cyan-300 font-mono">Address = Base + 4 * RoomWidth</code>. This instant calculation is why array index lookup takes <strong>O(1) constant time</strong>!
                </p>
              </div>

              {/* Classroom Lab Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Lab Dialogue: Swadeep &amp; Tuhina's Discovery
                </h3>
                <div className="space-y-2 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p><strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why does C array indexing start at 0 instead of 1?"</em></p>
                  <p><strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Great question, Swadeep! In C, an array name `arr` is actually a pointer to the very first byte of the block. Index `i` represents the <strong>offset distance</strong> from the start. For the first element, offset is 0 bytes away: `*(arr + 0)`!"</em></p>
                  <p><strong className="text-purple-400">Tuhina:</strong> <em>"Ah! So `arr[3]` literally means move 3 steps forward in RAM from `arr`!"</em></p>
                  <p><strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Exactly, Tuhina! And that is also why accessing `arr[10]` in an array of size 5 doesn't throw a polite exception in C — it simply peeks into someone else's room in memory, causing a Segmentation Fault!"</em></p>
                </div>
              </div>

              {/* Pro-Tip Highlights */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-amber-400 font-semibold mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span>⚠️</span> Common Rookie Mistake
                  </h4>
                  <p className="text-xs text-slate-400">
                    Forgetting to check if <code className="text-amber-300 font-mono">realloc()</code> returned <code className="text-amber-300 font-mono">NULL</code> when resizing a dynamic array, leading to lost pointers and un-freeable memory leaks.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-emerald-400 font-semibold mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span>💎</span> Senior Pro Golden Rule
                  </h4>
                  <p className="text-xs text-slate-400">
                    Always double dynamic array capacity (<code className="text-emerald-300 font-mono">capacity *= 2</code>) on overflow to achieve <strong>amortized O(1)</strong> push operations instead of O(n) reallocation per item.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TECHNICAL KNOW-HOW & MEMORY LAYOUT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all">
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <span>💡</span> Detailed Memory Mechanics &amp; Address Calculation
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              In C programming, an array is a linear data structure storing elements in contiguous memory addresses. Because RAM addresses increase sequentially, computing element locations is purely arithmetic.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="text-cyan-300 font-semibold mb-2">1D Array Address Formula</h3>
                <div className="font-mono text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  Address(A[i]) = BaseAddress + (i * sizeof(type))
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="text-cyan-300 font-semibold mb-2">2D Row-Major Matrix Formula</h3>
                <div className="font-mono text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  Address(A[i][j]) = Base + (i * COLS + j) * sizeof(type)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: VISUAL MEMORY DIAGRAM */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg text-center">
            <h2 className="text-xl font-bold text-sky-400 mb-4">Memory Layout Visualization</h2>
            
            <div className="overflow-x-auto py-4">
              <div className="inline-flex items-center gap-1 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                {[
                  { idx: 0, val: 10, addr: "0x7fff00" },
                  { idx: 1, val: 20, addr: "0x7fff04" },
                  { idx: 2, val: 30, addr: "0x7fff08" },
                  { idx: 3, val: 40, addr: "0x7fff0c" },
                  { idx: 4, val: 50, addr: "0x7fff10" },
                ].map((item) => (
                  <div key={item.idx} className="flex flex-col items-center">
                    <span className="text-slate-500 mb-1">A[{item.idx}]</span>
                    <div className="w-16 h-16 bg-cyan-950/60 border border-cyan-500/50 rounded-lg flex items-center justify-center font-bold text-cyan-300 text-sm shadow-md">
                      {item.val}
                    </div>
                    <span className="text-[10px] text-emerald-400 mt-1">{item.addr}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Contiguous memory allocation with 4-byte step offsets for standard <code className="text-cyan-300 font-mono">int</code> types.
            </p>
          </div>
        </section>

        {/* SECTION 5: CODE ENGINE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
              <span>🛠️</span> Runnable C Dynamic Array Code Demo
            </h2>
            <span className="text-xs text-slate-400 font-mono">EditableCCodeBlock</span>
          </div>

          <EditableCCodeBlock code={arrayDemoCode} initialCode={arrayDemoCode} title="dynamic_array_demo.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="DSA Module 1 Note: Array Data Structure &amp; Memory Mechanics" />
        </section>

        {/* SECTION 8: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
