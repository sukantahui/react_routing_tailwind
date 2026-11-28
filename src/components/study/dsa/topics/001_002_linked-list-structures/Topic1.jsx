import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import demoCode from "./topic1_files/singly_linked_list_demo.c?raw";

const INITIAL_NODES = [
  { id: 1, val: 10 },
  { id: 2, val: 20 },
  { id: 3, val: 30 },
  { id: 4, val: 40 },
];

export default function Topic1() {
  const sectionRefs = useRef([]);

  // Interactive Singly Linked List State
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [inputValue, setInputValue] = useState("");
  const [deleteValue, setDeleteValue] = useState("20");
  const [highlightIdx, setHighlightIdx] = useState(null);
  const [statusMessage, setStatusMessage] = useState(
    "List ready: Head points to [10]. Try inserting, deleting a middle node, or stepping through 3-Pointer Reversal!"
  );

  // Interactive 3-Pointer Reversal Stepper State
  const [revMode, setRevMode] = useState(false);
  const [revLinks, setRevLinks] = useState([]); // direction: "right" | "left" | "null"
  const [prevIdx, setPrevIdx] = useState(-1); // -1 represents NULL
  const [currIdx, setCurrIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(null);
  const [revPhase, setRevPhase] = useState("idle"); // "idle" | "save_next" | "flip" | "advance" | "done"

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

  // List Mutations (exit reversal stepper cleanly)
  const exitRevIfActive = () => {
    if (revMode) {
      setRevMode(false);
      setRevPhase("idle");
    }
  };

  const handleInsertHead = () => {
    exitRevIfActive();
    const val = inputValue.trim() !== "" ? parseInt(inputValue, 10) : Math.floor(Math.random() * 89 + 10);
    if (isNaN(val)) return;
    const newNode = { id: Date.now(), val };
    setNodes((prev) => [newNode, ...prev]);
    setHighlightIdx(0);
    setStatusMessage(
      `O(1) Insert Head: Created [${val}], set newNode->next = oldHead, then updated head = [${val}].`
    );
    setInputValue("");
  };

  const handleInsertTail = () => {
    exitRevIfActive();
    const val = inputValue.trim() !== "" ? parseInt(inputValue, 10) : Math.floor(Math.random() * 89 + 10);
    if (isNaN(val)) return;
    const newNode = { id: Date.now(), val };
    const nextNodes = [...nodes, newNode];
    setNodes(nextNodes);
    setHighlightIdx(nextNodes.length - 1);
    setStatusMessage(
      nodes.length === 0
        ? `List was empty: head now points to [${val}].`
        : `O(N) Insert Tail: Walked to [${nodes[nodes.length - 1].val}] and set its next pointer to [${val}].`
    );
    setInputValue("");
  };

  const handleDeleteMiddleOrValue = () => {
    exitRevIfActive();
    const target = parseInt(deleteValue, 10);
    if (isNaN(target)) {
      setStatusMessage("Enter a valid integer value to delete.");
      return;
    }
    const idx = nodes.findIndex((n) => n.val === target);
    if (idx === -1) {
      setStatusMessage(`Value ${target} was not found in the list. Nothing deleted.`);
      setHighlightIdx(null);
      return;
    }
    const nextNodes = nodes.filter((_, i) => i !== idx);
    setNodes(nextNodes);
    setHighlightIdx(idx > 0 ? idx - 1 : 0);
    if (idx === 0) {
      setStatusMessage(
        `Deleted Head (${target}): Moved head to ${nextNodes.length ? `[${nextNodes[0].val}]` : "NULL"} and called free().`
      );
    } else {
      const prevVal = nodes[idx - 1].val;
      const afterVal = idx + 1 < nodes.length ? `[${nodes[idx + 1].val}]` : "NULL";
      setStatusMessage(
        `Deleted [${target}]: Stopped at predecessor [${prevVal}], set [${prevVal}]->next = ${afterVal}, and freed [${target}]!`
      );
    }
  };

  const handleReset = () => {
    setNodes(INITIAL_NODES);
    setHighlightIdx(null);
    setInputValue("");
    setDeleteValue("20");
    setRevMode(false);
    setRevPhase("idle");
    setStatusMessage("Reset to [10] -> [20] -> [30] -> [40] -> NULL.");
  };

  // Start / Step 3-Pointer Reversal Animator
  const handleStartReversal = () => {
    if (nodes.length === 0) {
      setStatusMessage("Empty list (head == NULL) — reversing an empty list still gives NULL!");
      return;
    }
    setRevMode(true);
    setHighlightIdx(null);
    setRevLinks(nodes.map((_, i) => (i === nodes.length - 1 ? "null" : "right")));
    setPrevIdx(-1);
    setCurrIdx(0);
    setNextIdx(null);
    setRevPhase("save_next");
    setStatusMessage(
      `3-Pointer Reversal Started: prev = NULL, curr = [${nodes[0].val}], next = NULL. Click "Next Reversal Step"!`
    );
  };

  const handleStepReversal = () => {
    if (!revMode || revPhase === "done") return;

    if (revPhase === "save_next") {
      const nIdx = currIdx + 1 < nodes.length ? currIdx + 1 : -1;
      setNextIdx(nIdx);
      setRevPhase("flip");
      setStatusMessage(
        `Step 1 (Save): next = curr->next (${nIdx === -1 ? "NULL" : `[${nodes[nIdx].val}]`}) — so we don't lose the rest of the train!`
      );
    } else if (revPhase === "flip") {
      const updated = [...revLinks];
      updated[currIdx] = prevIdx === -1 ? "null" : "left";
      setRevLinks(updated);
      setRevPhase("advance");
      setStatusMessage(
        `Step 2 (Flip Arrow): curr->next = prev (${prevIdx === -1 ? "NULL" : `[${nodes[prevIdx].val}]`}). Notice [${nodes[currIdx].val}] now points backward!`
      );
    } else if (revPhase === "advance") {
      const newPrev = currIdx;
      const newCurr = nextIdx;
      setPrevIdx(newPrev);
      setCurrIdx(newCurr);
      if (newCurr === -1) {
        setRevPhase("done");
        const reversed = [...nodes].reverse();
        setNodes(reversed);
        setStatusMessage(
          `Loop Done (curr == NULL)! head = prev ([${nodes[newPrev].val}]). The list is now completely reversed in O(1) extra space!`
        );
      } else {
        setRevPhase("save_next");
        setStatusMessage(
          `Step 3 (Slide): prev = [${nodes[newPrev].val}], curr = [${nodes[newCurr].val}]. Ready to reverse the next node!`
        );
      }
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
        {/* SECTION 1: HEADER */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Module 001_002 · Topic 1</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Singly Linked List: Head/Tail Insertion, Middle Deletion &amp; 3-Pointer Reversal
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Learn how to grow, shrink, and flip a one-way chain of heap nodes without ever dropping a pointer or leaking memory.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course: DSA-C-101</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: TEACHER'S DESK & TRAIN COACH ANALOGY */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                🚆
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: The One-Way Train Analogy
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Plain-English Intuition &amp; Barrackpore Lab Discussion
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-cyan-400 font-bold">1. Why Head Insert is O(1)</div>
                <p className="leading-relaxed">
                  To add a new engine at the front, you hook the new engine to the old front (<code className="text-cyan-300 font-mono">newNode-&gt;next = head</code>), then move your <code className="text-emerald-300 font-mono">head</code> flag to the new engine. Two quick moves—no matter if there are 5 coaches or 5 million!
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-sky-400 font-bold">2. Why Middle Delete Needs "One Step Before"</div>
                <p className="leading-relaxed">
                  Because coaches only hook <em>forward</em>, if you walk onto coach <strong>20</strong>, you cannot step back to coach <strong>10</strong>! So during deletion, we stop on <code className="text-sky-300 font-mono">curr</code> where <code className="text-amber-300 font-mono">curr-&gt;next</code> is the node to delete.
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-emerald-400 font-bold">3. How 3-Pointer Reversal Works</div>
                <p className="leading-relaxed">
                  You cannot reverse a coach's hook without first holding onto the next coach! So we use <strong>3 hands</strong>: <code className="text-amber-300 font-mono">prev</code> (behind), <code className="text-cyan-300 font-mono">curr</code> (working on), and <code className="text-purple-300 font-mono">next</code> (safety grip on the rest of the train).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-sky-400 font-bold flex items-center gap-2 text-sm sm:text-base">
                <span>💬</span> Barrackpore Lab Classroom Discussion
              </h3>
              <div className="space-y-3 text-xs sm:text-sm border-l-2 border-cyan-500/40 pl-4 py-1 text-slate-300">
                <p>
                  <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why does my list disappear or hang forever when I write <code className="text-rose-300 font-mono">head = newNode; newNode-&gt;next = head;</code>?"</em>
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Look at what happened! You moved the <code className="font-mono">head</code> label onto <code className="font-mono">newNode</code> BEFORE hooking <code className="font-mono">newNode-&gt;next</code> to the old list. So <code className="font-mono">newNode-&gt;next</code> pointed back to itself, and all the old coaches floated away unreferenced!"</em>
                </p>
                <p>
                  <strong className="text-emerald-400">Tuhina:</strong> <em>"So the golden rule is: <strong>Always connect the new node's outgoing pointer FIRST</strong>, and only then update <code className="text-cyan-300 font-mono">head</code> or <code className="text-cyan-300 font-mono">prev-&gt;next</code>!"</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE SINGLY LINKED LIST & 3-POINTER REVERSAL PLAYGROUND */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive Singly Linked List &amp; 3-Pointer Reversal Lab
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add/delete nodes or step through iterative <code className="text-amber-300 font-mono">prev / curr / next</code> reversal one click at a time.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
                  Length: <strong className="text-white">{nodes.length}</strong>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400">
                  Head: <strong className="text-white">{nodes.length ? `[${nodes[0].val}]` : "NULL"}</strong>
                </span>
              </div>
            </div>

            {/* Visual Chain */}
            <div className="p-5 bg-slate-950/90 rounded-2xl border border-slate-800 overflow-x-auto">
              <div className="flex flex-wrap items-center gap-3 min-h-[115px]">
                {/* Head badge */}
                <div className="px-3 py-2 rounded-xl bg-indigo-950/70 border border-indigo-500/50 text-center">
                  <div className="text-[10px] font-mono text-indigo-300 font-bold">HEAD</div>
                  <div className="text-xs font-mono text-white">
                    {revMode && revPhase === "done"
                      ? `[${nodes[0]?.val}]`
                      : nodes.length
                      ? `[${nodes[0].val}]`
                      : "NULL"}
                  </div>
                </div>
                <span className="text-cyan-500 font-bold">→</span>

                {nodes.length === 0 ? (
                  <div className="text-sm font-mono text-rose-400 px-3">
                    NULL (Empty List)
                  </div>
                ) : (
                  nodes.map((node, idx) => {
                    const isPrev = revMode && idx === prevIdx;
                    const isCurr = revMode && idx === currIdx;
                    const isNext = revMode && idx === nextIdx;
                    const isHighlighted = !revMode && idx === highlightIdx;
                    const arrowDir = revMode ? revLinks[idx] : idx === nodes.length - 1 ? "null" : "right";

                    return (
                      <React.Fragment key={node.id}>
                        <div className="flex flex-col items-center gap-1.5">
                          {/* Pointer Tags above node during Reversal */}
                          <div className="h-5 flex items-center gap-1">
                            {isPrev && (
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400 text-amber-300 text-[10px] font-mono font-bold">
                                prev
                              </span>
                            )}
                            {isCurr && (
                              <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-[10px] font-mono font-bold">
                                curr
                              </span>
                            )}
                            {isNext && (
                              <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-400 text-purple-300 text-[10px] font-mono font-bold">
                                next
                              </span>
                            )}
                          </div>

                          {/* Node Box */}
                          <div
                            className={`flex items-stretch rounded-xl border overflow-hidden transition-all duration-300 ${
                              isCurr || isHighlighted
                                ? "border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-950/80 scale-105"
                                : isPrev
                                ? "border-amber-400/70 bg-amber-950/30"
                                : "border-slate-700 bg-slate-900"
                            }`}
                          >
                            <div className="px-4 py-2.5 text-center border-r border-slate-700/80">
                              <div className="text-[9px] font-mono text-slate-400">data</div>
                              <div className="text-base font-bold text-white">{node.val}</div>
                            </div>
                            <div className="px-3 py-2.5 text-center flex flex-col justify-center bg-slate-950/50">
                              <div className="text-[9px] font-mono text-slate-400">next</div>
                              <div className="text-xs font-mono font-bold text-sky-300">
                                {arrowDir === "left"
                                  ? "← prev"
                                  : arrowDir === "null"
                                  ? "NULL"
                                  : "→"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Connector */}
                        {idx < nodes.length - 1 && (
                          <span
                            className={`font-bold text-lg select-none ${
                              revMode && revLinks[idx + 1] === "left"
                                ? "text-amber-400"
                                : revMode && revLinks[idx] === "null"
                                ? "text-slate-600"
                                : "text-cyan-400"
                            }`}
                          >
                            {revMode && revLinks[idx + 1] === "left"
                              ? "←"
                              : revMode && revLinks[idx] === "null"
                              ? "×"
                              : "→"}
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })
                )}

                {nodes.length > 0 && (
                  <>
                    <span className="text-cyan-500 font-bold">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-400 font-mono text-xs font-bold">
                      NULL
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Live Reversal Step Checklist */}
            {revMode && (
              <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                <div className={`p-2 rounded-lg border ${revPhase === "save_next" ? "bg-purple-950/50 border-purple-400 text-purple-200" : "border-slate-800 text-slate-400"}`}>
                  1. next = curr-&gt;next;
                </div>
                <div className={`p-2 rounded-lg border ${revPhase === "flip" ? "bg-amber-950/50 border-amber-400 text-amber-200" : "border-slate-800 text-slate-400"}`}>
                  2. curr-&gt;next = prev;
                </div>
                <div className={`p-2 rounded-lg border ${revPhase === "advance" ? "bg-cyan-950/50 border-cyan-400 text-cyan-200" : "border-slate-800 text-slate-400"}`}>
                  3. prev = curr; curr = next;
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Insert val"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono w-28"
              />
              <button
                onClick={handleInsertHead}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm transition"
              >
                + Insert Head O(1)
              </button>
              <button
                onClick={handleInsertTail}
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-slate-950 font-bold text-xs sm:text-sm transition"
              >
                + Insert Tail O(N)
              </button>

              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={deleteValue}
                  onChange={(e) => setDeleteValue(e.target.value)}
                  placeholder="Del val"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-rose-300 focus:outline-none focus:border-rose-500 font-mono w-24"
                />
                <button
                  onClick={handleDeleteMiddleOrValue}
                  className="px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700 font-semibold text-xs sm:text-sm transition"
                >
                  Delete Value
                </button>
              </div>

              {!revMode ? (
                <button
                  onClick={handleStartReversal}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition"
                >
                  🔄 Start 3-Pointer Reversal
                </button>
              ) : (
                <button
                  onClick={handleStepReversal}
                  disabled={revPhase === "done"}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition"
                >
                  ⏭️ Next Reversal Step
                </button>
              )}

              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs sm:text-sm border border-slate-800 transition"
              >
                Reset
              </button>
            </div>

            {/* Narration Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 flex items-start gap-2.5">
              <span>💡</span>
              <span className="leading-relaxed">{statusMessage}</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: STEP-BY-STEP MECHANICS & BEGINNER PITFALLS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <span>📚</span> Step-by-Step Mechanics &amp; Common Mistakes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-cyan-400">1️⃣ Head vs Tail Insertion</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong>Head Insertion</strong> takes <code className="text-emerald-300 font-mono">O(1)</code> because you already hold <code className="font-mono">head</code>. <strong>Tail Insertion</strong> takes <code className="text-amber-300 font-mono">O(N)</code> because you must walk until <code className="font-mono">curr-&gt;next == NULL</code> (unless you maintain an extra <code className="font-mono">tail</code> pointer).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                newNode-&gt;next = *headRef; // Always connect FIRST<br />
                *headRef = newNode;       // Then move head
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-sky-400">2️⃣ Middle Deletion (3-Step Bypass)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Stop <code className="font-mono">curr</code> one node BEFORE the target. Save <code className="font-mono">toDelete = curr-&gt;next</code>, bridge across it (<code className="font-mono">curr-&gt;next = toDelete-&gt;next</code>), then call <code className="text-rose-300 font-mono">free(toDelete)</code>.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Node *del = curr-&gt;next;<br />
                curr-&gt;next = del-&gt;next;<br />
                free(del);
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-amber-400">3️⃣ Why 3 Pointers for Reversal?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Flipping <code className="font-mono">curr-&gt;next = prev</code> destroys the only bridge to the next node! Storing <code className="text-purple-300 font-mono">next = curr-&gt;next</code> beforehand lets us reverse the whole list in <strong>O(N) time</strong> and <strong>O(1) space</strong>.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>Initialize: <code className="text-slate-200 font-mono">prev = NULL, curr = head</code></li>
                <li>Loop until <code className="text-slate-200 font-mono">curr == NULL</code></li>
                <li>Finish: <code className="text-emerald-300 font-mono">*headRef = prev</code></li>
              </ul>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-rose-400">4️⃣ Beginner Traps to Avoid</h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Forgetting empty list check:</strong> Checking <code className="font-mono text-rose-300">head-&gt;next</code> when <code className="font-mono">head == NULL</code> crashes immediately.</li>
                <li><strong>Walking with <code className="font-mono">head</code> directly:</strong> Always use a helper <code className="font-mono">Node *curr = head</code> so you never lose the front of your list.</li>
                <li><strong>Unlinking without <code className="font-mono">free()</code>:</strong> Skipping <code className="font-mono">free(del)</code> causes a silent memory leak.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable C Implementation
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="singly_linked_list_demo.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="DSA Topic Note: Singly Linked List — Head/Tail Insertion, Middle Deletion & 3-Pointer Reversal"
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
