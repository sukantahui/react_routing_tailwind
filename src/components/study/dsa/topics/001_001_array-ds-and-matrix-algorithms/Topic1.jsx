import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import demoCode from "./topic1_files/dynamic_array_demo.c?raw";

export default function Topic1() {
  const sectionRefs = useRef([]);

  // Interactive Visualizer State
  const [elements, setElements] = useState([10, 20, 30]);
  const [capacity, setCapacity] = useState(4);
  const [logMessages, setLogMessages] = useState([
    "Initial vector created: Size = 3, Capacity = 4 (Allocated 16 bytes on Heap)"
  ]);
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

  // Push element with Geometric Doubling
  const handlePush = () => {
    const val = inputValue.trim() !== "" ? parseInt(inputValue, 10) : (elements.length + 1) * 10;
    if (isNaN(val)) return;

    let newCap = capacity;
    const logs = [...logMessages];

    if (elements.length >= capacity) {
      newCap = capacity * 2;
      logs.unshift(
        `⚡ CAPACITY FULL (${elements.length}/${capacity}) -> Doubling capacity to ${newCap} via realloc()! (Heap block expanded)`
      );
    }

    const nextElements = [...elements, val];
    logs.unshift(`✓ Pushed ${val} at index ${elements.length}. New Size = ${nextElements.length}, Capacity = ${newCap}`);

    setCapacity(newCap);
    setElements(nextElements);
    setLogMessages(logs.slice(0, 8));
    setInputValue("");
  };

  // Pop element with 1/4 capacity shrinking
  const handlePop = () => {
    if (elements.length === 0) {
      setLogMessages((prev) => ["⚠️ Underflow! Cannot pop from empty vector.", ...prev.slice(0, 7)]);
      return;
    }

    const popped = elements[elements.length - 1];
    const nextElements = elements.slice(0, elements.length - 1);
    let newCap = capacity;
    const logs = [...logMessages];

    logs.unshift(`✗ Popped ${popped} from index ${elements.length - 1}. New Size = ${nextElements.length}`);

    // Hysteresis Shrink: at 1/4 capacity
    if (nextElements.length > 0 && nextElements.length <= capacity / 4 && capacity > 4) {
      newCap = capacity / 2;
      logs.unshift(`↓ HYSTERESIS SHRINK: Size (${nextElements.length}) <= Capacity/4 (${capacity / 4}) -> Halved capacity to ${newCap}`);
    }

    setCapacity(newCap);
    setElements(nextElements);
    setLogMessages(logs.slice(0, 8));
  };

  // Reset
  const handleReset = () => {
    setElements([10, 20, 30]);
    setCapacity(4);
    setLogMessages(["Reset vector: Size = 3, Capacity = 4"]);
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
            <span>DSA Segment 1 · Module 001_001 · Topic 1</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Dynamic Array (Vector) Implementation in C
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the engineering mechanics of resizable dynamic arrays in C: struct encapsulation, geometric doubling strategy, safe <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">realloc()</code> pointer reassignment, amortized $O(1)$ bounds, and hysteresis memory shrinking.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-101</span>
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
                  Teacher's Desk: The Expandable Airport Passenger Lounge
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>🏢</span> The Airport Lounge Analogy
                </h3>
                <p>
                  Imagine an airport waiting lounge that starts with 4 chairs. When the 5th passenger arrives, instead of buying just 1 chair, the airport manager doubles the room size to 8 chairs. When passenger #9 arrives, they expand to 16 chairs!
                </p>
                <p>
                  Why? Because building new rooms takes time! By doubling capacity geometrically ($2\times$), the expensive expansion happens very rarely. Almost every passenger sits down instantly in strictly $O(1)$ constant time! This is the essence of a <strong>C Dynamic Array (Vector)</strong>.
                </p>
              </div>

              {/* Classroom Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Barrackpore Lab Classroom Discussion
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p>
                    <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why can't we just write <code>vec-&gt;data = realloc(vec-&gt;data, new_size);</code> directly?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Because if the operating system is out of memory, <code>realloc()</code> returns <code>NULL</code>! Directly assigning it overwrites your only reference to the original memory block, permanently orphaning and leaking that memory. Always use a temporary pointer like <code>int* temp = realloc(...);</code> first!"</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Tuhina:</strong> <em>"And if the heap block has to be relocated to a new memory address, any raw pointers pointing inside the old array become dangling pointers!"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Exactly right, Tuhina! That's known as 'Iterator Invalidation' in systems engineering. When capacity expands, always re-evaluate your element pointers."</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE DYNAMIC ARRAY VISUALIZER */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive Dynamic Array Simulator
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Observe Geometric Doubling &amp; Hysteresis Shrinking in Real-Time
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
                  Size: <strong className="text-white">{elements.length}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-sky-400">
                  Capacity: <strong className="text-white">{capacity}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                  Utilization: <strong className="text-white">{capacity > 0 ? Math.round((elements.length / capacity) * 100) : 0}%</strong>
                </div>
              </div>
            </div>

            {/* Interactive Memory Slots */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Contiguous Heap Buffer Layout ({capacity * 4} Bytes Allocated):
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-2">
                {Array.from({ length: capacity }).map((_, idx) => {
                  const isActive = idx < elements.length;
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-950/50 scale-100"
                          : "bg-slate-950/60 border-slate-800/80 text-slate-600 border-dashed"
                      }`}
                    >
                      <span className="text-xs font-mono text-slate-400">[{idx}]</span>
                      <span className="text-base font-bold my-1">
                        {isActive ? elements[idx] : "—"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {isActive ? `${4 * idx}B` : "free"}
                      </span>
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
                placeholder="Value (e.g. 99)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono w-36"
              />
              <button
                onClick={handlePush}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-950 flex items-center gap-1.5"
              >
                <span>➕</span> Push Back
              </button>
              <button
                onClick={handlePop}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all border border-slate-700 flex items-center gap-1.5"
              >
                <span>➖</span> Pop Back
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-sm transition-all border border-slate-800"
              >
                Reset
              </button>
            </div>

            {/* Real-time Execution Log */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1.5 font-mono text-xs text-slate-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                <span>📋</span> Memory Allocator Event Log:
              </div>
              {logMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`leading-relaxed ${
                    i === 0 ? "text-cyan-400 font-semibold" : "text-slate-400 opacity-80"
                  }`}
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: DEEP TECHNICAL EXPLANATION & ARCHITECTURE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <span>📚</span> Complete Technical Breakdown: Dynamic Array Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <span>1️⃣</span> Struct Encapsulation &amp; Invariants
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                In pure C, a vector is represented as a triple-member composite struct:
              </p>
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
{`typedef struct {
    int* data;       // Pointer to heap buffer
    size_t size;     // Current element count
    size_t capacity; // Allocated slots limit
} DynamicArray;`}
              </pre>
              <p className="text-xs text-slate-400 leading-relaxed">
                Invariant Rule: <code className="text-cyan-300">0 &lt;= size &lt;= capacity</code> must hold at all times before and after every operation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                <span>2️⃣</span> Amortized O(1) Proof
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Why double by 2x instead of adding +100?
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Linear (+C):</strong> Triggers N/C reallocations &rarr; O(N&sup2;) total work &rarr; O(N) per push.</li>
                <li><strong>Geometric (2x):</strong> Total copies for N pushes = 1 + 2 + 4 + ... + N/2 = N - 1.</li>
                <li><strong>Total Cost:</strong> N (insertions) + (N - 1) (copies) = 2N - 1.</li>
                <li><strong>Amortized Cost per Push:</strong> (2N - 1) / N &approx; <strong className="text-emerald-400">O(1)</strong> constant time!</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>3️⃣</span> Safe Reallocation Pattern
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Never assign <code className="text-cyan-300">realloc()</code> return directly to your main pointer:
              </p>
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
{`// 1. Temporary Pointer Check
int* temp = (int*)realloc(v->data, new_cap * sizeof(int));
if (!temp) {
    perror("Memory allocation failed");
    return; // v->data is still SAFE & preserved!
}
v->data = temp;
v->capacity = new_cap;`}
              </pre>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                <span>4️⃣</span> Hysteresis Shrinking (1/4 Rule)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Never shrink capacity when <code className="text-cyan-300">size == capacity / 2</code>!
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Alternating pushes and pops right at the 50% boundary would cause expensive reallocation thrashing (O(N) on every single step).
              </p>
              <p className="text-xs text-indigo-300 leading-relaxed">
                <strong>Solution:</strong> Only shrink capacity to half when size drops to <strong>&le; 25% (capacity / 4)</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Production-Grade C Implementation: Dynamic Array Library
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="dynamic_array_demo.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="DSA Topic Note: Dynamic Array (Vector) Implementation in C" />
        </section>

        {/* SECTION 8: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
