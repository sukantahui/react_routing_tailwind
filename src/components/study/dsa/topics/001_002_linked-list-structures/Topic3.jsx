import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import demoCode from "./topic3_files/doubly_linked_list_demo.c?raw";

const INITIAL_DLL = [
  { id: 1, val: 10 },
  { id: 2, val: 20 },
  { id: 3, val: 30 },
  { id: 4, val: 40 },
];

export default function Topic3() {
  const sectionRefs = useRef([]);

  const [nodes, setNodes] = useState(INITIAL_DLL);
  const [cursorIdx, setCursorIdx] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [statusMessage, setStatusMessage] = useState(
    "Cursor sits on [20]. Move forward (next), backward (prev), delete in O(1), or swap with the next node!"
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

  const handleMoveForward = () => {
    if (nodes.length === 0) return;
    if (cursorIdx >= nodes.length - 1) {
      setStatusMessage("Reached tail->next == NULL. Cannot step forward past the tail!");
      return;
    }
    const next = cursorIdx + 1;
    setCursorIdx(next);
    setStatusMessage(`Moved forward via curr = curr->next to [${nodes[next].val}].`);
  };

  const handleMoveBackward = () => {
    if (nodes.length === 0) return;
    if (cursorIdx <= 0) {
      setStatusMessage("Reached head->prev == NULL. Cannot step backward past the head!");
      return;
    }
    const prev = cursorIdx - 1;
    setCursorIdx(prev);
    setStatusMessage(`Moved backward via curr = curr->prev to [${nodes[prev].val}] — impossible in a Singly Linked List!`);
  };

  const handleInsertHead = () => {
    const val = inputValue.trim() !== "" ? parseInt(inputValue, 10) : Math.floor(Math.random() * 89 + 10);
    if (isNaN(val)) return;
    const nextNodes = [{ id: Date.now(), val }, ...nodes];
    setNodes(nextNodes);
    setCursorIdx(0);
    setInputValue("");
    setStatusMessage(`O(1) Insert Head [${val}]: Wired newNode->next = head and oldHead->prev = newNode.`);
  };

  const handleInsertTail = () => {
    const val = inputValue.trim() !== "" ? parseInt(inputValue, 10) : Math.floor(Math.random() * 89 + 10);
    if (isNaN(val)) return;
    const nextNodes = [...nodes, { id: Date.now(), val }];
    setNodes(nextNodes);
    setCursorIdx(nextNodes.length - 1);
    setInputValue("");
    setStatusMessage(`O(1) Insert Tail [${val}]: Wired newNode->prev = tail and oldTail->next = newNode.`);
  };

  const handleDeleteCursor = () => {
    if (nodes.length === 0) {
      setStatusMessage("List is empty (head == NULL, tail == NULL).");
      return;
    }
    const delVal = nodes[cursorIdx].val;
    const nextNodes = nodes.filter((_, i) => i !== cursorIdx);
    setNodes(nextNodes);
    const nextIdx = nextNodes.length === 0 ? 0 : Math.min(cursorIdx, nextNodes.length - 1);
    setCursorIdx(nextIdx);
    setStatusMessage(
      `O(1) Deleted [${delVal}]! Updated del->prev->next and del->next->prev directly without walking from head, then called free().`
    );
  };

  const handleSwapWithNext = () => {
    if (nodes.length < 2 || cursorIdx >= nodes.length - 1) {
      setStatusMessage("Select a node that has a next neighbor (not the tail) to swap with!");
      return;
    }
    const a = nodes[cursorIdx];
    const b = nodes[cursorIdx + 1];
    const updated = [...nodes];
    updated[cursorIdx] = b;
    updated[cursorIdx + 1] = a;
    setNodes(updated);
    setCursorIdx(cursorIdx + 1);
    setStatusMessage(
      `Swapped [${a.val}] and [${b.val}] by relinking outer neighbors (before->next, after->prev) and flipping a<->b pointers!`
    );
  };

  const handleReset = () => {
    setNodes(INITIAL_DLL);
    setCursorIdx(1);
    setInputValue("");
    setStatusMessage("Reset Doubly Linked List to NULL <- [10] <-> [20] <-> [30] <-> [40] -> NULL.");
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
            <span>DSA Module 001_002 · Topic 3</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Doubly Linked List: Bidirectional Pointers, Node Swapping &amp; Cleanup
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Add a <code className="text-amber-300 font-mono">prev</code> pointer to walk backward as easily as forward, delete any known node in <code className="text-emerald-300 font-mono">O(1)</code> time, and swap neighbors safely.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course: DSA-C-103</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: TEACHER'S DESK & BROWSER HISTORY ANALOGY */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                🧭
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: Browser Back/Forward &amp; Two-Way Streets
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Why adding ONE extra pointer unlocks O(1) deletion and reverse walking
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-cyan-400 font-bold">1. Two-Way Navigation</div>
                <p className="leading-relaxed">
                  Just like your web browser's <strong>Back</strong> and <strong>Forward</strong> buttons (or Undo/Redo in VS Code), every node stores <code className="text-amber-300 font-mono">prev</code> and <code className="text-sky-300 font-mono">next</code>.
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-emerald-400 font-bold">2. O(1) Direct Deletion</div>
                <p className="leading-relaxed">
                  If someone hands you a pointer <code className="font-mono">del</code>, you don't need to start from <code className="font-mono">head</code>! You ask <code className="text-amber-300 font-mono">del-&gt;prev</code> and <code className="text-sky-300 font-mono">del-&gt;next</code> to shake hands directly.
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-purple-400 font-bold">3. The Symmetry Rule</div>
                <p className="leading-relaxed">
                  Every forward arrow has a twin backward arrow: if <code className="font-mono">A-&gt;next == B</code>, then <code className="font-mono">B-&gt;prev</code> MUST equal <code className="font-mono">A</code>. Never update one without the other!
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-sky-400 font-bold flex items-center gap-2 text-sm sm:text-base">
                <span>💬</span> Barrackpore Lab Classroom Discussion
              </h3>
              <div className="space-y-3 text-xs sm:text-sm border-l-2 border-cyan-500/40 pl-4 py-1 text-slate-300">
                <p>
                  <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why did my Doubly Linked List crash when I ran <code className="text-rose-300 font-mono">del-&gt;prev-&gt;next = del-&gt;next;</code> on the first node?"</em>
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Because the first node is <code className="font-mono">head</code>, and <code className="font-mono">head-&gt;prev</code> is <code className="text-rose-300 font-mono">NULL</code>! Always wrap neighbor updates in <code className="text-emerald-300 font-mono">if (del-&gt;prev)</code> and <code className="text-emerald-300 font-mono">if (del-&gt;next)</code>!"</em>
                </p>
                <p>
                  <strong className="text-emerald-400">Tuhina:</strong> <em>"And when freeing the whole list, we still save <code className="text-cyan-300 font-mono">temp = curr-&gt;next</code> before <code className="font-mono">free(curr)</code>, and reset BOTH <code className="font-mono">head = NULL</code> and <code className="font-mono">tail = NULL</code>!"</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE DOUBLY LINKED LIST PLAYGROUND */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive Bidirectional Doubly Linked List Lab
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Click any node to place your <code className="text-cyan-300 font-mono">curr</code> cursor, then walk left/right, delete in O(1), or swap neighbors!
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
                  Node Size: <strong className="text-white">24B (64-bit)</strong>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400">
                  Total RAM: <strong className="text-white">{nodes.length * 24}B</strong>
                </span>
              </div>
            </div>

            {/* Visual Bidirectional Chain */}
            <div className="p-5 bg-slate-950/90 rounded-2xl border border-slate-800 overflow-x-auto">
              <div className="flex flex-wrap items-center gap-2.5 min-h-[120px]">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-400 font-mono text-xs font-bold">
                  NULL
                </span>
                <span className="text-amber-400 font-bold">←</span>

                {nodes.length === 0 ? (
                  <span className="text-sm font-mono text-slate-500 px-3">Empty DLL (head == NULL, tail == NULL)</span>
                ) : (
                  nodes.map((node, idx) => {
                    const isCursor = idx === cursorIdx;
                    const prevLabel = idx === 0 ? "NULL" : `[${nodes[idx - 1].val}]`;
                    const nextLabel = idx === nodes.length - 1 ? "NULL" : `[${nodes[idx + 1].val}]`;
                    return (
                      <React.Fragment key={node.id}>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-5 flex items-center gap-1 text-[10px] font-mono">
                            {idx === 0 && (
                              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-400 text-indigo-300 font-bold">
                                HEAD
                              </span>
                            )}
                            {isCursor && (
                              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold">
                                curr
                              </span>
                            )}
                            {idx === nodes.length - 1 && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold">
                                TAIL
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setCursorIdx(idx);
                              setStatusMessage(`Moved cursor to [${node.val}] (prev=${prevLabel}, next=${nextLabel}).`);
                            }}
                            className={`flex items-stretch rounded-xl border overflow-hidden transition-all cursor-pointer ${
                              isCursor
                                ? "border-cyan-400 bg-cyan-950/60 shadow-lg scale-105 ring-2 ring-cyan-400/50"
                                : "border-slate-700 bg-slate-900 hover:border-slate-500"
                            }`}
                          >
                            <div className="px-2.5 py-2 bg-slate-950/60 border-r border-slate-700/80 text-center">
                              <div className="text-[9px] font-mono text-amber-400">prev</div>
                              <div className="text-[11px] font-mono text-slate-300">{prevLabel}</div>
                            </div>
                            <div className="px-3.5 py-2 text-center border-r border-slate-700/80">
                              <div className="text-[9px] font-mono text-slate-400">data</div>
                              <div className="text-base font-bold text-white">{node.val}</div>
                            </div>
                            <div className="px-2.5 py-2 bg-slate-950/60 text-center">
                              <div className="text-[9px] font-mono text-sky-400">next</div>
                              <div className="text-[11px] font-mono text-slate-300">{nextLabel}</div>
                            </div>
                          </button>
                        </div>

                        {idx < nodes.length - 1 && (
                          <span className="text-cyan-400 font-bold text-base select-none">⇄</span>
                        )}
                      </React.Fragment>
                    );
                  })
                )}

                <span className="text-sky-400 font-bold">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-400 font-mono text-xs font-bold">
                  NULL
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleMoveBackward}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-semibold text-xs sm:text-sm transition"
              >
                ⬅️ Step Backward (curr-&gt;prev)
              </button>
              <button
                onClick={handleMoveForward}
                className="px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-200 font-semibold text-xs sm:text-sm transition"
              >
                ➡️ Step Forward (curr-&gt;next)
              </button>

              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Val"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono w-20"
              />
              <button
                onClick={handleInsertHead}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm transition"
              >
                + Head
              </button>
              <button
                onClick={handleInsertTail}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm transition"
              >
                + Tail
              </button>
              <button
                onClick={handleSwapWithNext}
                className="px-3.5 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm transition"
              >
                🔀 Swap curr &amp; Next
              </button>
              <button
                onClick={handleDeleteCursor}
                className="px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700 font-semibold text-xs sm:text-sm transition"
              >
                🗑️ Delete curr O(1)
              </button>
              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 text-xs sm:text-sm border border-slate-800 transition"
              >
                Reset
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 flex items-start gap-2.5">
              <span>💡</span>
              <span>{statusMessage}</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: POINTER RULES & COMPARISON */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <span>📚</span> Pointer Wiring Checklist &amp; Singly vs Doubly Comparison
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-cyan-400">1️⃣ Safe O(1) Node Deletion Pattern</h3>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
                <div>if (*head == del) *head = del-&gt;next;</div>
                <div>if (*tail == del) *tail = del-&gt;prev;</div>
                <div>if (del-&gt;prev) del-&gt;prev-&gt;next = del-&gt;next;</div>
                <div>if (del-&gt;next) del-&gt;next-&gt;prev = del-&gt;prev;</div>
                <div className="text-rose-300">free(del);</div>
              </div>
              <p className="text-xs text-slate-400">
                Works identically for Head, Middle, Tail, AND 1-node lists!
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-sky-400">2️⃣ Singly vs Doubly Trade-off</h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>Node RAM (64-bit):</strong> 16B (Singly) vs 24B (Doubly).</li>
                <li><strong>Delete Tail (`pop_back`):</strong> O(N) in Singly vs <strong className="text-emerald-300">O(1)</strong> in Doubly!</li>
                <li><strong>Delete given pointer:</strong> O(N) in Singly vs <strong className="text-emerald-300">O(1)</strong> in Doubly!</li>
                <li><strong>Famous Real-World Use:</strong> LRU Cache (Hash Map + Doubly Linked List).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable C Implementation
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="doubly_linked_list_demo.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="DSA Topic Note: Doubly Linked List — prev/next Pointers, Node Swapping & Cleanup"
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
