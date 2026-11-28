import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import demoCode from "./topic4_files/circular_round_robin_demo.c?raw";

const INITIAL_PROCS = [
  { id: 1, pid: "P1", burst: 7 },
  { id: 2, pid: "P2", burst: 4 },
  { id: 3, pid: "P3", burst: 6 },
];

export default function Topic4() {
  const sectionRefs = useRef([]);

  const [procs, setProcs] = useState(INITIAL_PROCS);
  const [activeIdx, setActiveIdx] = useState(0); // Current CPU turn (starts at head = tail->next)
  const [quantum, setQuantum] = useState(3);
  const [isLoopBroken, setIsLoopBroken] = useState(false);
  const [newBurst, setNewBurst] = useState("5");
  const [nextPidNum, setNextPidNum] = useState(4);
  const [statusMessage, setStatusMessage] = useState(
    "Circular Ready Queue initialized! TAIL [P3] points back to HEAD [P1]. Run 1 CPU Quantum!"
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
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
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };

  const handleAddProcess = () => {
    const burst = parseInt(newBurst, 10);
    if (isNaN(burst) || burst <= 0) return;
    const added = { id: Date.now(), pid: `P${nextPidNum}`, burst };
    setProcs((prev) => [...prev, added]);
    setNextPidNum((n) => n + 1);
    setIsLoopBroken(false);
    setStatusMessage(
      `O(1) Tail Insert: Added ${added.pid} (${added.burst}ms) after old tail, linked ${added.pid}->next = HEAD, and updated tail = ${added.pid}.`
    );
  };

  const handleRunQuantum = () => {
    if (isLoopBroken) {
      setStatusMessage("Loop was broken (tail->next = NULL). Click Reset to restart the circular scheduler!");
      return;
    }
    if (procs.length === 0) {
      setStatusMessage("CPU Idle: Circular Queue is empty (tail == NULL). Add a task or Reset!");
      return;
    }
    const idx = activeIdx % procs.length;
    const curr = procs[idx];
    const slice = Math.min(curr.burst, quantum);
    const rem = curr.burst - slice;

    if (rem === 0) {
      const updated = procs.filter((_, i) => i !== idx);
      setProcs(updated);
      setActiveIdx(updated.length === 0 ? 0 : idx % updated.length);
      setStatusMessage(
        `⚡ CPU ran ${curr.pid} for ${slice}ms → FINISHED (0ms left)! Unlinked & freed ${curr.pid} from the ring.`
      );
    } else {
      const updated = procs.map((p, i) => (i === idx ? { ...p, burst: rem } : p));
      setProcs(updated);
      const nextIdx = (idx + 1) % updated.length;
      setActiveIdx(nextIdx);
      setStatusMessage(
        `⚡ CPU ran ${curr.pid} for ${slice}ms (${rem}ms left). Advanced curr = curr->next to ${updated[nextIdx].pid}!`
      );
    }
  };

  const handleBreakLoop = () => {
    if (procs.length === 0) {
      setStatusMessage("Queue is already empty (tail == NULL).");
      return;
    }
    setIsLoopBroken(true);
    setStatusMessage(
      `✂️ Break-Loop Executed: tail (${procs[procs.length - 1].pid})->next set to NULL! Now safe to run while (curr != NULL) free()!`
    );
  };

  const handleReset = () => {
    setProcs(INITIAL_PROCS);
    setActiveIdx(0);
    setIsLoopBroken(false);
    setNextPidNum(4);
    setNewBurst("5");
    setStatusMessage("Reset Circular Queue: P1 (7ms) -> P2 (4ms) -> P3 (6ms) -> back to P1.");
  };

  return (
    <>
      <style>{`
        .reveal-section { opacity: 0.99; transform: translateY(0); transition: opacity 0.4s ease-out, transform 0.4s ease-out; }
        .reveal-section.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* SECTION 1: HEADER */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Module 001_002 · Topic 4</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Circular Linked Lists: Tail Optimization, Round-Robin &amp; Break-Loop
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Connect the tail straight back to the head to build infinite turn-taking rings, achieve <code className="text-emerald-300 font-mono">O(1)</code> inserts at both ends using only <code className="text-cyan-300 font-mono">tail</code>, and safely break the ring before freeing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course: DSA-C-104</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: ROUND TABLE ANALOGY & CLASSROOM DISCUSSION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                🔁
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: The Round-Table Turn Game
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Why `tail` beats `head`, and why `while (curr != NULL)` loops forever!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-cyan-400 font-bold">1. Zero `NULL` Ends</div>
                <p className="leading-relaxed">
                  Just like players seated around a circular table, the last player passes the turn back to the first (<code className="text-amber-300 font-mono">tail-&gt;next == head</code>). If only 1 player sits at the table, they point to themselves (<code className="font-mono">p-&gt;next = p</code>)!
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-emerald-400 font-bold">2. The `tail` Pointer Trick</div>
                <p className="leading-relaxed">
                  If we store <code className="text-emerald-300 font-mono">tail</code> instead of <code className="font-mono">head</code>, we STILL get <code className="font-mono">head</code> in <code className="font-mono">O(1)</code> as <code className="text-cyan-300 font-mono">tail-&gt;next</code>! That means BOTH <code className="font-mono">insertHead</code> and <code className="font-mono">insertTail</code> become <code className="text-emerald-300 font-mono">O(1)</code>!
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-rose-400 font-bold">3. Break Before Freeing</div>
                <p className="leading-relaxed">
                  A standard <code className="font-mono">while (curr != NULL)</code> loop never ends on a ring! Before cleanup, save <code className="font-mono">head = tail-&gt;next</code>, set <code className="text-rose-300 font-mono">tail-&gt;next = NULL</code>, and free linearly.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-sky-400 font-bold flex items-center gap-2 text-sm sm:text-base">
                <span>💬</span> Barrackpore Lab Classroom Discussion
              </h3>
              <div className="space-y-3 text-xs sm:text-sm border-l-2 border-cyan-500/40 pl-4 py-1 text-slate-300">
                <p>
                  <strong className="text-emerald-400">Abhronila:</strong> <em>"Sir, why did my <code className="text-rose-300 font-mono">while (curr != head)</code> print function print NOTHING at all?"</em>
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Because you set <code className="font-mono">curr = head</code> right before the loop, so <code className="font-mono">curr != head</code> was false before printing a single node! Use a <code className="text-emerald-300 font-mono">do &#123; ... curr = curr-&gt;next; &#125; while (curr != head);</code> loop (after checking <code className="font-mono">tail != NULL</code>)."</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE ROUND-ROBIN CIRCULAR SIMULATOR */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>⚙️</span> Interactive Round-Robin CPU Scheduler (Circular Queue)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Watch the CPU hand out {quantum}ms time slices around the circular ring until every task finishes.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <label className="text-slate-400">Quantum (ms):</label>
                <select
                  value={quantum}
                  onChange={(e) => setQuantum(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-cyan-300"
                >
                  <option value={2}>2 ms</option>
                  <option value={3}>3 ms</option>
                  <option value={4}>4 ms</option>
                </select>
              </div>
            </div>

            {/* Circular Ring Chain */}
            <div className="p-5 bg-slate-950/90 rounded-2xl border border-slate-800 overflow-x-auto">
              <div className="flex flex-wrap items-center gap-3 min-h-[115px]">
                {procs.length === 0 ? (
                  <span className="text-sm font-mono text-emerald-400 px-3">
                    ✅ All tasks completed! tail == NULL (Empty Circular List)
                  </span>
                ) : (
                  procs.map((p, idx) => {
                    const isHead = idx === 0;
                    const isTail = idx === procs.length - 1;
                    const isCpuTurn = !isLoopBroken && idx === activeIdx % procs.length;
                    return (
                      <React.Fragment key={p.id}>
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="h-5 flex items-center gap-1 text-[10px] font-mono">
                            {isHead && (
                              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-400 text-indigo-300 font-bold">
                                HEAD (tail-&gt;next)
                              </span>
                            )}
                            {isTail && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold">
                                TAIL
                              </span>
                            )}
                            {isCpuTurn && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400 text-amber-300 font-bold">
                                CPU ▶
                              </span>
                            )}
                          </div>

                          <div
                            className={`px-4 py-2.5 rounded-xl border text-center transition-all min-w-[100px] ${
                              isCpuTurn
                                ? "border-amber-400 bg-amber-950/50 shadow-lg scale-105 ring-2 ring-amber-400/50"
                                : "border-slate-700 bg-slate-900"
                            }`}
                          >
                            <div className="text-xs font-mono text-cyan-300 font-bold">{p.pid}</div>
                            <div className="text-base font-bold text-white">{p.burst} ms</div>
                          </div>
                        </div>

                        {idx < procs.length - 1 && (
                          <span className="text-cyan-400 font-bold text-lg select-none">→</span>
                        )}
                      </React.Fragment>
                    );
                  })
                )}

                {procs.length > 0 && (
                  <>
                    <span className="text-cyan-400 font-bold text-lg">→</span>
                    {isLoopBroken ? (
                      <span className="px-3 py-1.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-300 font-mono text-xs font-bold">
                        NULL (Loop Broken!)
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold">
                        ↩ Loops back to HEAD ({procs[0].pid})
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRunQuantum}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-md"
              >
                ⚡ Run 1 CPU Quantum ({quantum}ms)
              </button>

              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={newBurst}
                  onChange={(e) => setNewBurst(e.target.value)}
                  placeholder="ms"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono w-20"
                />
                <button
                  onClick={handleAddProcess}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm transition"
                >
                  + Add Task O(1)
                </button>
              </div>

              <button
                onClick={handleBreakLoop}
                className="px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700 font-semibold text-xs sm:text-sm transition"
              >
                ✂️ Break Loop (tail-&gt;next = NULL)
              </button>

              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 text-xs sm:text-sm border border-slate-800 transition"
              >
                Reset
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 flex items-start gap-2.5">
              <span>💻</span>
              <span>{statusMessage}</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: TAIL POINTER OPTIMIZATION & TRAVERSAL PATTERNS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <span>📚</span> Essential Circular Linked List Patterns
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-emerald-400">1️⃣ O(1) Insert at Tail (Using `tail`)</h3>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
                <div>if (*tail == NULL) &#123;</div>
                <div className="pl-3">newNode-&gt;next = newNode; *tail = newNode;</div>
                <div>&#125; else &#123;</div>
                <div className="pl-3">newNode-&gt;next = (*tail)-&gt;next; // head</div>
                <div className="pl-3">(*tail)-&gt;next = newNode;</div>
                <div className="pl-3">*tail = newNode;</div>
                <div>&#125;</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-rose-400">2️⃣ Break-Loop Safe Free</h3>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-rose-200 space-y-1">
                <div>if (*tail == NULL) return;</div>
                <div>Node *head = (*tail)-&gt;next;</div>
                <div className="text-amber-300">(*tail)-&gt;next = NULL; // Break circle!</div>
                <div>while (head != NULL) &#123;</div>
                <div className="pl-3">Node *t = head-&gt;next; free(head); head = t;</div>
                <div>&#125;</div>
                <div>*tail = NULL;</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable C Implementation
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="circular_round_robin_demo.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="DSA Topic Note: Circular Linked Lists — Tail Optimization, Round-Robin & Break-Loop"
          />
        </section>

        {/* SECTION 8: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
