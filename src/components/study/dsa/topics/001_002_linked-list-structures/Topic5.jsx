import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import demoCode from "./topic5_files/ExampleDiscussionPolynomialAddDemo.c?raw";

const PRESETS = {
  sparse: {
    label: "Sparse & Cancellation (5x¹⁰⁰ + 4x² + 2) + (3x¹⁰⁰ - 4x² + 7x + 1)",
    p1: [
      { coeff: 5, exp: 100 },
      { coeff: 4, exp: 2 },
      { coeff: 2, exp: 0 },
    ],
    p2: [
      { coeff: 3, exp: 100 },
      { coeff: -4, exp: 2 },
      { coeff: 7, exp: 1 },
      { coeff: 1, exp: 0 },
    ],
  },
  classic: {
    label: "Classic Classroom (5x³ + 4x² + 2) + (5x² + 5x + 1)",
    p1: [
      { coeff: 5, exp: 3 },
      { coeff: 4, exp: 2 },
      { coeff: 2, exp: 0 },
    ],
    p2: [
      { coeff: 5, exp: 2 },
      { coeff: 5, exp: 1 },
      { coeff: 1, exp: 0 },
    ],
  },
};

function multiplyPolys(p1, p2) {
  const map = new Map();
  for (const a of p1) {
    for (const b of p2) {
      const e = a.exp + b.exp;
      map.set(e, (map.get(e) || 0) + a.coeff * b.coeff);
    }
  }
  return Array.from(map.entries())
    .filter(([, c]) => c !== 0)
    .sort((a, b) => b[0] - a[0])
    .map(([exp, coeff]) => ({ coeff, exp }));
}

export default function Topic5() {
  const sectionRefs = useRef([]);

  const [presetKey, setPresetKey] = useState("sparse");
  const [i1, setI1] = useState(0);
  const [i2, setI2] = useState(0);
  const [sumTerms, setSumTerms] = useState([]);
  const [mode, setMode] = useState("add"); // "add" | "multiply"
  const [statusMessage, setStatusMessage] = useState(
    "Pointers p1 and p2 sit at the highest exponents. Click 'Step Merge (+)' to watch O(N + M) addition!"
  );

  const p1 = PRESETS[presetKey].p1;
  const p2 = PRESETS[presetKey].p2;
  const isAddDone = i1 >= p1.length && i2 >= p2.length;
  const productTerms = multiplyPolys(p1, p2);

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

  const resetMerge = (nextPreset = presetKey) => {
    setPresetKey(nextPreset);
    setI1(0);
    setI2(0);
    setSumTerms([]);
    setStatusMessage(
      "Merge reset! Click 'Step Merge (+)' to compare p1->exp and p2->exp one node at a time."
    );
  };

  const handleStepMerge = () => {
    if (isAddDone) return;

    if (i1 < p1.length && i2 < p2.length) {
      const t1 = p1[i1];
      const t2 = p2[i2];
      if (t1.exp > t2.exp) {
        setSumTerms((prev) => [...prev, t1]);
        setI1(i1 + 1);
        setStatusMessage(
          `Case 1 (p1->exp ${t1.exp} > p2->exp ${t2.exp}): Copied ${t1.coeff}x^${t1.exp} to sum and advanced p1.`
        );
      } else if (t1.exp < t2.exp) {
        setSumTerms((prev) => [...prev, t2]);
        setI2(i2 + 1);
        setStatusMessage(
          `Case 2 (p1->exp ${t1.exp} < p2->exp ${t2.exp}): Copied ${t2.coeff}x^${t2.exp} to sum and advanced p2.`
        );
      } else {
        const combined = t1.coeff + t2.coeff;
        setI1(i1 + 1);
        setI2(i2 + 1);
        if (combined === 0) {
          setStatusMessage(
            `Case 3 (exp == ${t1.exp}): ${t1.coeff} + (${t2.coeff}) = 0! Terms CANCELLED OUT (skipped node!) and advanced both p1 & p2.`
          );
        } else {
          setSumTerms((prev) => [...prev, { coeff: combined, exp: t1.exp }]);
          setStatusMessage(
            `Case 3 (exp == ${t1.exp}): Summed coefficients ${t1.coeff} + (${t2.coeff}) = ${combined}x^${t1.exp} and advanced both p1 & p2.`
          );
        }
      }
    } else if (i1 < p1.length) {
      const t1 = p1[i1];
      setSumTerms((prev) => [...prev, t1]);
      setI1(i1 + 1);
      setStatusMessage(`p2 finished — copied remaining p1 term ${t1.coeff}x^${t1.exp}.`);
    } else if (i2 < p2.length) {
      const t2 = p2[i2];
      setSumTerms((prev) => [...prev, t2]);
      setI2(i2 + 1);
      setStatusMessage(`p1 finished — copied remaining p2 term ${t2.coeff}x^${t2.exp}.`);
    }
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
            <span>DSA Module 001_002 · Topic 5</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Sparse Polynomial Addition &amp; Multiplication with Sorted Linked Nodes
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Why waste 10,000 array slots on <code className="text-amber-300 font-mono">5x^10000 + 2</code>? Store only non-zero <code className="text-cyan-300 font-mono">[coeff | exp | next]</code> nodes and merge them like Merge Sort!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course: DSA-C-105</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: TEACHER'S DESK & SPARSE POLYNOMIAL INTUITION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                🧮
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: Why Sparse Linked Lists Crush Coefficient Arrays
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Real-World Symbolic Algebra &amp; Memory Savings
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-rose-400 font-bold">1. The Array Waste Problem</div>
                <p className="leading-relaxed">
                  To store <code className="font-mono text-amber-300">5x^100 + 2</code> in an array <code className="font-mono">poly[101]</code>, you allocate 101 integers where <strong>99 of them are 0</strong>! Linked nodes store ONLY the 2 non-zero terms.
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-cyan-400 font-bold">2. Zero Padding Node Layout</div>
                <p className="leading-relaxed">
                  <code className="font-mono text-cyan-300">struct Term &#123; int coeff; int exp; struct Term *next; &#125;</code> packs two 4-byte ints (8B) + one 8-byte pointer (8B) = <strong>16 bytes with 0 padding waste</strong>!
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-emerald-400 font-bold">3. 3-Case Sorted Merge</div>
                <p className="leading-relaxed">
                  Because exponents stay sorted descending, adding two polynomials compares <code className="font-mono">p1-&gt;exp</code> vs <code className="font-mono">p2-&gt;exp</code> in a single <strong>O(N + M)</strong> walk!
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-sky-400 font-bold flex items-center gap-2 text-sm sm:text-base">
                <span>💬</span> Barrackpore Lab Classroom Discussion
              </h3>
              <div className="space-y-3 text-xs sm:text-sm border-l-2 border-cyan-500/40 pl-4 py-1 text-slate-300">
                <p>
                  <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, what if <code className="text-cyan-300 font-mono">+4x²</code> and <code className="text-rose-300 font-mono">-4x²</code> cancel out to 0 during addition or multiplication?"</em>
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Never create a <code className="font-mono">0x²</code> node! In addition, skip appending when <code className="font-mono">sum == 0</code>. In multiplication, if <code className="font-mono">curr-&gt;coeff</code> drops to 0, unlink and <code className="text-rose-300 font-mono">free(curr)</code> immediately!"</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE POLYNOMIAL ADDITION & MULTIPLICATION LAB */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive Polynomial Linked List Merge Lab
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Watch how sorted descending exponents let <code className="text-cyan-300 font-mono">p1</code> and <code className="text-sky-300 font-mono">p2</code> merge in O(N + M) time.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <button
                  onClick={() => setMode("add")}
                  className={`px-3 py-1.5 rounded-lg border transition ${mode === "add" ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400" : "bg-slate-950 text-slate-300 border-slate-800"}`}
                >
                  Addition (Step-by-Step)
                </button>
                <button
                  onClick={() => setMode("multiply")}
                  className={`px-3 py-1.5 rounded-lg border transition ${mode === "multiply" ? "bg-purple-500 text-slate-950 font-bold border-purple-400" : "bg-slate-950 text-slate-300 border-slate-800"}`}
                >
                  Multiplication (P1 × P2)
                </button>
              </div>
            </div>

            {/* Preset Switcher */}
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(PRESETS).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => resetMerge(key)}
                  className={`px-3 py-1.5 rounded-xl border transition font-mono ${
                    presetKey === key
                      ? "bg-slate-800 border-cyan-400 text-cyan-200 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* P1 and P2 Chains */}
            <div className="space-y-4 bg-slate-950/90 p-5 rounded-2xl border border-slate-800 overflow-x-auto">
              {[
                { name: "P1(x)", list: p1, ptrIdx: i1, ptrName: "p1", color: "cyan" },
                { name: "P2(x)", list: p2, ptrIdx: i2, ptrName: "p2", color: "sky" },
              ].map((poly) => (
                <div key={poly.name} className="flex flex-wrap items-center gap-2.5">
                  <span className="w-14 text-xs font-mono font-bold text-slate-300">{poly.name}</span>
                  {poly.list.map((term, idx) => {
                    const isActive = mode === "add" && idx === poly.ptrIdx;
                    return (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center">
                          {isActive && (
                            <span className="text-[10px] font-mono font-bold text-amber-300 mb-0.5">
                              ▼ {poly.ptrName}
                            </span>
                          )}
                          <div
                            className={`px-3 py-1.5 rounded-xl border font-mono text-xs transition-all ${
                              isActive
                                ? "border-amber-400 bg-amber-950/50 text-white scale-105"
                                : idx < poly.ptrIdx && mode === "add"
                                ? "border-slate-800 bg-slate-900/40 text-slate-500"
                                : "border-slate-700 bg-slate-900 text-slate-200"
                            }`}
                          >
                            <span className="text-emerald-300 font-bold">{term.coeff}</span>
                            <span className="text-slate-400"> | </span>
                            <span className="text-cyan-300">x^{term.exp}</span>
                          </div>
                        </div>
                        <span className="text-slate-600 font-bold">→</span>
                      </React.Fragment>
                    );
                  })}
                  <span className="text-xs font-mono text-rose-400">NULL</span>
                </div>
              ))}

              {/* Result Chain */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2.5">
                <span className="w-14 text-xs font-mono font-bold text-emerald-300">
                  {mode === "add" ? "SUM" : "PROD"}
                </span>
                {(mode === "add" ? sumTerms : productTerms).length === 0 ? (
                  <span className="text-xs font-mono text-slate-500 italic">
                    {mode === "add" ? "(Click 'Step Merge (+)' below to build the sum list)" : "0"}
                  </span>
                ) : (
                  (mode === "add" ? sumTerms : productTerms).map((term, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-3 py-1.5 rounded-xl border border-emerald-500/50 bg-emerald-950/30 font-mono text-xs text-white">
                        <span className="text-emerald-300 font-bold">{term.coeff}</span>
                        <span className="text-slate-400"> | </span>
                        <span className="text-cyan-300">x^{term.exp}</span>
                      </div>
                      <span className="text-emerald-500 font-bold">→</span>
                    </React.Fragment>
                  ))
                )}
                {(mode === "add" ? sumTerms : productTerms).length > 0 && (
                  <span className="text-xs font-mono text-rose-400">NULL</span>
                )}
              </div>
            </div>

            {/* Controls */}
            {mode === "add" ? (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleStepMerge}
                  disabled={isAddDone}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition"
                >
                  ⏭️ Step Merge (+)
                </button>
                <button
                  onClick={() => resetMerge(presetKey)}
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm border border-slate-800 transition"
                >
                  Reset Merge
                </button>
              </div>
            ) : (
              <div className="text-xs text-slate-300 bg-purple-950/30 border border-purple-500/30 rounded-xl p-3.5">
                Every term in <strong>P1</strong> multiplies every term in <strong>P2</strong> (<code className="font-mono text-purple-300">(c1·c2)x^(e1+e2)</code>), and <code className="font-mono">insertTermSorted()</code> automatically combines matching exponents and cancels zero terms!
              </div>
            )}

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 flex items-start gap-2.5">
              <span>💡</span>
              <span>{statusMessage}</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable C Implementation (Addition + Multiplication)
          </h2>
          <EditableCCodeBlock
            code={demoCode}
            initialCode={demoCode}
            title="ExampleDiscussionPolynomialAddDemo.c"
          />
        </section>

        {/* SECTION 5: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 6: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="DSA Topic Note: Sparse Polynomial Addition & Multiplication using Sorted Linked Nodes"
          />
        </section>

        {/* SECTION 7: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
