import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import demoCode from "./topic1_files/ChangeOfBaseDemo.c?raw";

export default function Topic1() {
  const sectionRefs = useRef([]);

  // Multi-Base Workbench State
  const [testN, setTestN] = useState(1000000);

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

  const l2 = Math.log2(testN);
  const l10 = Math.log10(testN);
  const ln = Math.log(testN);
  const l16 = Math.log2(testN) / 4;

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
            <span>DSA Segment 10 · Module 3 · Topic 1</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Change-of-Base Theorem & Big-O Base Invariance
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Mathematical proof of why <code className="text-amber-300 font-mono">O(log₂ N) = O(log₁₀ N) = O(ln N) = O(log N)</code> and why computer scientists omit the base in asymptotic complexity notation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Concept: Change of Base</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Proof: Constant Scalar Invariance</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: MATHEMATICAL PROOF */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>📜</span>
              <span>The Change of Base Theorem & Algebraic Proof</span>
            </h2>

            <div className="p-5 sm:p-6 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-sm space-y-4 shadow-lg">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-400/40 text-center shadow-inner">
                <div className="text-base sm:text-lg font-bold text-cyan-200">
                  log<sub className="text-xs text-amber-300">a</sub>(N) = <span className="text-sky-300">log<sub className="text-xs text-amber-300">b</sub>(N) / log<sub className="text-xs text-amber-300">b</sub>(a)</span> = <span className="text-emerald-300">(1 / log<sub className="text-xs text-amber-300">b</sub>(a)) × log<sub className="text-xs text-amber-300">b</sub>(N)</span>
                </div>
              </div>
              <hr className="border-slate-800" />
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed font-sans">
                <p><strong>Step 1:</strong> Let <code className="text-amber-300 font-mono">y = log_a(N)</code>. By inverse exponentiation, <code className="text-amber-300 font-mono">aʸ = N</code>.</p>
                <p><strong>Step 2:</strong> Take log base <code className="text-sky-300 font-mono">b</code> on both sides: <code className="text-sky-300 font-mono">log_b(aʸ) = log_b(N)</code>.</p>
                <p><strong>Step 3:</strong> Using exponent pull-down rule: <code className="text-sky-300 font-mono">y × log_b(a) = log_b(N)</code>.</p>
                <p><strong>Step 4:</strong> Solve for <code className="text-amber-300 font-mono">y</code>: <code className="text-emerald-300 font-mono">y = log_b(N) / log_b(a)</code>.</p>
                <div className="mt-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-medium">
                  <strong>Asymptotic Conclusion:</strong> Since <code className="text-amber-300 font-mono">1 / log_b(a)</code> is a constant scalar independent of N, Big-O notation absorbs it: <code className="text-white font-mono">O(log_a N) ≡ O(log_b N) ≡ O(log N)</code>.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE MULTI-BASE CONVERTER */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>🔄</span>
                <span>Interactive Multi-Base Logarithm Workbench</span>
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">Test N:</span>
                {[100, 1000, 1000000, 1000000000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setTestN(v)}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                      testN === v
                        ? "bg-cyan-950 border-cyan-500 text-cyan-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {v >= 1e9 ? "1 Billion" : v >= 1e6 ? "1 Million" : v}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-500 uppercase">Binary (log₂)</div>
                <div className="text-xl font-black text-cyan-300 mt-1">{l2.toFixed(3)}</div>
                <div className="text-[10px] text-slate-400 mt-1">Multiplier: 1.000</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-500 uppercase">Natural (ln / log_e)</div>
                <div className="text-xl font-black text-sky-300 mt-1">{ln.toFixed(3)}</div>
                <div className="text-[10px] text-slate-400 mt-1">≈ 0.693 × log₂</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-500 uppercase">Decimal (log₁₀)</div>
                <div className="text-xl font-black text-amber-300 mt-1">{l10.toFixed(3)}</div>
                <div className="text-[10px] text-slate-400 mt-1">≈ 0.301 × log₂</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-500 uppercase">Hexadecimal (log₁₆)</div>
                <div className="text-xl font-black text-emerald-300 mt-1">{l16.toFixed(3)}</div>
                <div className="text-[10px] text-slate-400 mt-1">≈ 0.250 × log₂</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>💻</span>
              <span>C Implementation: Verifying Constant Ratio Invariance</span>
            </h2>
            <EditableCCodeBlock defaultCode={demoCode} />
          </div>
        </section>

        {/* SECTION 5: TEACHER MENTOR DIALOGUE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            topicName="Change-of-Base Theorem & Big-O Base Invariance"
            noteTitle="Sukanta Hui's Mentor Guide: Why Interviewers Never Write the Base in O(log N)"
            mentorAdvice={`"Many students lose confidence in technical interviews when asked whether a ternary search (dividing into 3 parts) is asymptotically faster than binary search (dividing into 2 parts). The answer is NO! Ternary search takes log_3(N) steps, which is simply (log_2(N) / log_2(3)) ≈ 0.63 * log_2(N). Because 0.63 is a constant multiplier, both binary and ternary search belong to the exact same complexity class Theta(log N). Never get tricked by different bases!"`}
          />
        </section>

        {/* SECTION 6: FAQS & EXERCISES */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="Topic 1: Change of Base Theorem Study Note" />
        </section>

      </div>
    </>
  );
}
