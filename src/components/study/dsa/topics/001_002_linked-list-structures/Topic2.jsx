import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import demoCode from "./topic2_files/floyd_cycle_detection_demo.c?raw";

const BASE_NODES = [
  { idx: 0, val: 10 },
  { idx: 1, val: 20 },
  { idx: 2, val: 30 },
  { idx: 3, val: 40 },
  { idx: 4, val: 50 },
];

export default function Topic2() {
  const sectionRefs = useRef([]);

  // Loop target: 2 means node 4 (50) -> node 2 (30); null means no cycle (-> NULL)
  const [loopTarget, setLoopTarget] = useState(2);
  const [phase, setPhase] = useState("phase1"); // "phase1" | "met" | "phase2" | "found_start" | "no_cycle" | "broken"
  const [slowIdx, setSlowIdx] = useState(0);
  const [fastIdx, setFastIdx] = useState(0);
  const [entryIdx, setEntryIdx] = useState(null);
  const [stepCount, setStepCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    "Phase 1 Ready: Both 🐢 slow and 🐇 fast start at Head [10]. Click 'Step Tortoise & Hare'!"
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

  const getNextIndex = (idx) => {
    if (idx === null || idx === -1) return -1;
    if (idx < BASE_NODES.length - 1) return idx + 1;
    return loopTarget !== null ? loopTarget : -1;
  };

  const resetSim = (target = loopTarget) => {
    setLoopTarget(target);
    setPhase("phase1");
    setSlowIdx(0);
    setFastIdx(0);
    setEntryIdx(null);
    setStepCount(0);
    setStatusMessage(
      target === null
        ? "No-Cycle Mode: Tail [50] points to NULL. Watch fast safely hit NULL!"
        : `Cycle Mode: Tail [50] loops back to [${BASE_NODES[target].val}]. Both pointers start at [10].`
    );
  };

  const handleStep = () => {
    if (phase === "phase1") {
      const f1 = getNextIndex(fastIdx);
      if (fastIdx === -1 || f1 === -1) {
        setPhase("no_cycle");
        setStatusMessage(
          "🐇 fast (or fast->next) reached NULL! Safe exit: NO cycle exists in this linked list."
        );
        return;
      }
      const nextSlow = getNextIndex(slowIdx);
      const nextFast = getNextIndex(f1);
      const nextStep = stepCount + 1;
      setSlowIdx(nextSlow);
      setFastIdx(nextFast);
      setStepCount(nextStep);

      if (nextFast === -1) {
        setPhase("no_cycle");
        setStatusMessage(
          `Step ${nextStep}: 🐇 fast stepped onto NULL! No cycle found — loop terminates safely.`
        );
      } else if (nextSlow === nextFast) {
        setPhase("met");
        setStatusMessage(
          `Step ${nextStep}: 💥 COLLISION at [${BASE_NODES[nextSlow].val}]! slow == fast proves a cycle exists! Now click 'Start Phase 2' to find where the loop begins.`
        );
      } else {
        setStatusMessage(
          `Step ${nextStep}: 🐢 slow moved +1 to [${BASE_NODES[nextSlow].val}], 🐇 fast moved +2 to [${BASE_NODES[nextFast].val}].`
        );
      }
    } else if (phase === "phase2") {
      if (entryIdx === slowIdx) {
        setPhase("found_start");
        setStatusMessage(
          `🎯 FOUND LOOP START at [${BASE_NODES[entryIdx].val}]! Notice entry and slow met at the exact cycle entry node!`
        );
        return;
      }
      const nextEntry = getNextIndex(entryIdx);
      const nextSlow = getNextIndex(slowIdx);
      const nextStep = stepCount + 1;
      setEntryIdx(nextEntry);
      setSlowIdx(nextSlow);
      setStepCount(nextStep);

      if (nextEntry === nextSlow) {
        setPhase("found_start");
        setStatusMessage(
          `Step ${nextStep}: 🎯 entry == slow at [${BASE_NODES[nextEntry].val}]! That is the exact Loop Start Node!`
        );
      } else {
        setStatusMessage(
          `Phase 2 Step ${nextStep}: 📍 entry moved +1 to [${BASE_NODES[nextEntry].val}], 🐢 slow moved +1 to [${BASE_NODES[nextSlow].val}].`
        );
      }
    }
  };

  const handleStartPhase2 = () => {
    setPhase("phase2");
    setEntryIdx(0);
    setFastIdx(-1);
    if (slowIdx === 0) {
      setPhase("found_start");
      setStatusMessage(
        "📍 entry = Head [10] and 🐢 slow is already at [10]! So [10] itself is the Loop Start!"
      );
    } else {
      setStatusMessage(
        `Phase 2 Started: 📍 entry reset to Head [10], 🐢 slow stays at meeting point [${BASE_NODES[slowIdx].val}]. Both move +1 step per click!`
      );
    }
  };

  const handleBreakLoop = () => {
    setLoopTarget(null);
    setPhase("broken");
    setStatusMessage(
      "✂️ Loop Removed! Walked around loop to [50] (whose next was loopStart) and set [50]->next = NULL. Now safe for freeList()!"
    );
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
            <span>DSA Module 001_002 · Topic 2</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Floyd's Cycle-Finding Algorithm (Tortoise &amp; Hare)
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Detect infinite pointer loops in <code className="text-emerald-300 font-mono">O(1)</code> extra space, locate the exact node where the cycle begins, and break the loop safely.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course: DSA-C-102</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: FRIENDLY RUNNING TRACK ANALOGY & CLASSROOM DISCUSSION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                🐢
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: The Circular Running Track Intuition
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Why the Hare ALWAYS catches the Tortoise — no fancy math required first!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-emerald-400 font-bold">1. The Chase (Phase 1)</div>
                <p className="leading-relaxed">
                  Imagine two runners on a track: 🐢 <strong>slow</strong> takes 1 step at a time, 🐇 <strong>fast</strong> takes 2 steps. If the track ends at a finish line (<code className="text-rose-300 font-mono">NULL</code>), 🐇 reaches it first. If there's a loop, 🐇 enters it and closes the gap by <code className="font-mono">2 - 1 = 1</code> step every turn—so 🐇 can never jump over 🐢!
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-amber-400 font-bold">2. Finding the Gate (Phase 2)</div>
                <p className="leading-relaxed">
                  They don't necessarily meet at the gate of the loop! To find the exact gate, put a new runner 📍 <code className="font-mono text-amber-300">entry</code> at <code className="font-mono">head</code> and leave 🐢 at the collision spot. Move both <strong>1 step</strong> at a time—they meet right at the gate!
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-rose-400 font-bold">3. Breaking the Loop (Phase 3)</div>
                <p className="leading-relaxed">
                  Once you know the gate (<code className="font-mono">loopStart</code>), walk around the loop until you reach the node whose <code className="font-mono">next == loopStart</code>, and set its <code className="text-emerald-300 font-mono">next = NULL</code>. Now your list is healthy again!
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-sky-400 font-bold flex items-center gap-2 text-sm sm:text-base">
                <span>💬</span> Barrackpore Lab Classroom Discussion
              </h3>
              <div className="space-y-3 text-xs sm:text-sm border-l-2 border-cyan-500/40 pl-4 py-1 text-slate-300">
                <p>
                  <strong className="text-emerald-400">Abhronila:</strong> <em>"Sir, why don't we just store every visited node address in an array or hash set? Isn't that easier?"</em>
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Great question! Storing 10 million visited addresses costs 80 MB of extra RAM (<code className="font-mono">O(N)</code> space). Floyd's algorithm uses just TWO pointer variables (<code className="text-emerald-300 font-mono">O(1)</code> space — 16 bytes total!) and still runs in <code className="font-mono">O(N)</code> time."</em>
                </p>
                <p>
                  <strong className="text-emerald-400">Debangshu:</strong> <em>"And remember to write <code className="text-cyan-300 font-mono">while (fast != NULL &amp;&amp; fast-&gt;next != NULL)</code> so <code className="font-mono">fast-&gt;next-&gt;next</code> never crashes when there's no loop!"</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE TORTOISE & HARE SIMULATOR */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive Tortoise &amp; Hare Simulator
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Pick a list topology below, then step through Phase 1 (Detection), Phase 2 (Find Loop Start), and Phase 3 (Break Loop).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <button
                  onClick={() => resetSim(2)}
                  className={`px-3 py-1.5 rounded-lg border transition ${loopTarget === 2 ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400" : "bg-slate-950 text-slate-300 border-slate-800"}`}
                >
                  Loop → [30]
                </button>
                <button
                  onClick={() => resetSim(0)}
                  className={`px-3 py-1.5 rounded-lg border transition ${loopTarget === 0 ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400" : "bg-slate-950 text-slate-300 border-slate-800"}`}
                >
                  Loop → Head [10]
                </button>
                <button
                  onClick={() => resetSim(null)}
                  className={`px-3 py-1.5 rounded-lg border transition ${loopTarget === null ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400" : "bg-slate-950 text-slate-300 border-slate-800"}`}
                >
                  No Loop (NULL)
                </button>
              </div>
            </div>

            {/* Nodes Visualization */}
            <div className="p-5 bg-slate-950/90 rounded-2xl border border-slate-800 overflow-x-auto space-y-4">
              <div className="flex flex-wrap items-center gap-3 min-h-[115px]">
                {BASE_NODES.map((n, idx) => {
                  const hasSlow = slowIdx === idx;
                  const hasFast = fastIdx === idx && (phase === "phase1" || phase === "met");
                  const hasEntry = entryIdx === idx && (phase === "phase2" || phase === "found_start");
                  const isLoopTargetNode = loopTarget === idx;
                  const isStartHighlight = phase === "found_start" && entryIdx === idx;

                  return (
                    <React.Fragment key={n.idx}>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-6 flex items-center gap-1">
                          {hasSlow && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-mono font-bold">
                              🐢 slow
                            </span>
                          )}
                          {hasFast && (
                            <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-[10px] font-mono font-bold">
                              🐇 fast
                            </span>
                          )}
                          {hasEntry && (
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400 text-amber-300 text-[10px] font-mono font-bold">
                              📍 entry
                            </span>
                          )}
                        </div>

                        <div
                          className={`px-4 py-2.5 rounded-xl border text-center transition-all duration-300 min-w-[84px] ${
                            isStartHighlight
                              ? "border-amber-400 bg-amber-950/60 shadow-lg scale-105 ring-2 ring-amber-400"
                              : hasSlow && hasFast
                              ? "border-rose-400 bg-rose-950/60 shadow-lg scale-105 ring-2 ring-rose-400"
                              : hasSlow || hasFast || hasEntry
                              ? "border-cyan-400 bg-cyan-950/50 scale-105"
                              : "border-slate-700 bg-slate-900"
                          }`}
                        >
                          <div className="text-[10px] font-mono text-slate-400">
                            {idx === 0 ? "HEAD" : isLoopTargetNode ? "LOOP GATE" : `Node ${idx}`}
                          </div>
                          <div className="text-lg font-bold text-white">{n.val}</div>
                        </div>
                      </div>

                      {idx < BASE_NODES.length - 1 && (
                        <span className="text-cyan-500 font-bold text-lg select-none">→</span>
                      )}
                    </React.Fragment>
                  );
                })}

                <span className="text-cyan-500 font-bold text-lg">→</span>
                {loopTarget !== null ? (
                  <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold">
                    ↩ Loops back to [{BASE_NODES[loopTarget].val}]
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-400 font-mono text-xs font-bold">
                    NULL
                  </span>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {(phase === "phase1" || phase === "phase2") && (
                <button
                  onClick={handleStep}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-md"
                >
                  {phase === "phase1" ? "⏭️ Step Tortoise (+1) & Hare (+2)" : "⏭️ Step Entry (+1) & Slow (+1)"}
                </button>
              )}

              {phase === "met" && (
                <button
                  onClick={handleStartPhase2}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-md"
                >
                  📍 Start Phase 2: Find Loop Start
                </button>
              )}

              {phase === "found_start" && loopTarget !== null && (
                <button
                  onClick={handleBreakLoop}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-md"
                >
                  ✂️ Phase 3: Break Loop ([50]-&gt;next = NULL)
                </button>
              )}

              <button
                onClick={() => resetSim(loopTarget)}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm border border-slate-800 transition"
              >
                Reset Simulation
              </button>
            </div>

            {/* Status Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 flex items-start gap-2.5">
              <span>📢</span>
              <span className="leading-relaxed">{statusMessage}</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: GENTLE MATHEMATICAL PROOF & EDGE CASES */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <span>📐</span> Why Phase 2 Works (The 4-Line Proof) &amp; Edge Cases
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-amber-400">1️⃣ The 4-Line Proof</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Let <strong>L</strong> = steps from <code className="font-mono">head</code> to loop start, <strong>x</strong> = steps from loop start to meeting spot, and <strong>C</strong> = loop length.
              </p>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-200 space-y-1">
                <div>Distance(slow) = L + x</div>
                <div>Distance(fast) = L + x + k·C</div>
                <div>Since fast = 2 · slow: 2(L + x) = L + x + k·C</div>
                <div className="text-emerald-300 font-bold">⇒ L = (k - 1)·C + (C - x)</div>
              </div>
              <p className="text-xs text-slate-400">
                Walking <strong>L</strong> steps from <code className="font-mono">head</code> equals walking <strong>(C - x)</strong> steps forward from the meeting point (plus whole laps)!
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-rose-400">2️⃣ Critical Edge Cases in C</h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Empty / 1-node list:</strong> Guard <code className="font-mono text-cyan-300">while (fast &amp;&amp; fast-&gt;next)</code> prevents <code className="font-mono">SIGSEGV</code>.</li>
                <li><strong>Compare addresses, not data:</strong> Use <code className="font-mono text-emerald-300">slow == fast</code>, never <code className="font-mono text-rose-300">slow-&gt;data == fast-&gt;data</code>!</li>
                <li><strong>Move BEFORE comparing:</strong> Both start at <code className="font-mono">head</code>, so advance first inside the loop.</li>
                <li><strong>Break before freeing:</strong> Never call <code className="font-mono">freeList()</code> on a cyclic list or you trigger a Double-Free crash!</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable C Implementation
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="floyd_cycle_detection_demo.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="DSA Topic Note: Floyd's Cycle-Finding Algorithm (Tortoise & Hare)"
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
