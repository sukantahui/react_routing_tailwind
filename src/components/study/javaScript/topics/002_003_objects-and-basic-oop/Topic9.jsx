import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import demoCode from "./topic9_files/OopTopic9PropertyDescriptorsMetaprDemo.js?raw";

export default function Topic9() {
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

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* ─── SECTION 1: HEADER & METADATA ─────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 002_003_objects-and-basic-oop · Topic 9</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {"Comprehensive master guide to Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor() in JavaScript, exploring V8 heap allocation, prototypal mechanics, and enterprise software engineering patterns."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400">Course Code: JS-PRO-101</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* ─── SECTION 2: DETAILED CONCEPT DISCUSSION & MENTAL MODELS ── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              <span>💡</span> Detailed Discussion &amp; Conceptual Foundation
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              {"Comprehensive master guide to Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor() in JavaScript, exploring V8 heap allocation, prototypal mechanics, and enterprise software engineering patterns."} In enterprise application development, understanding object memory structures, prototype chains, and encapsulation models is the key to building scalable software systems.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              The V8 engine manages objects through dynamic Hidden Classes (Maps) and inline caches. When multiple objects share identical shapes and property declaration order, method invocations and property lookups execute at near-C++ speed.
            </p>

            {/* Classroom Story with Code/State */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                {"During the Barrackpore lab session, students encountered runtime exceptions when working with Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor() due to subtle object reference or context binding nuances."}
              </p>
              <p>
                {"Mentor Sukanta Hui diagrammed the V8 object shape transitions and prototype lookup algorithms on the board to resolve the issue with defensive invariants."}
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC-SPECIFIC SEMANTIC SVG DIAGRAM ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Runtime Architecture &amp; Execution Pipeline Diagram
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 240" className="w-full h-auto" role="img" aria-label={"Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"}>
                <defs>
                  <linearGradient id="oopGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="oopGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="oopGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <rect width="800" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="400" y="30" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">&#123;"Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"&#125; · Architecture &amp; Pipeline</text>

                {/* Box 1 */}
                <rect x="40" y="70" width="200" height="110" rx="12" fill="url(#oopGrad1)" stroke="#f59e0b" strokeWidth="1" />
                <text x="140" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Phase 1: Object Model</text>
                <text x="140" y="135" fill="#fef3c7" fontSize="11" textAnchor="middle">&#123;"Object Initialization & Memory Allocation"&#125;</text>

                {/* Arrow 1 */}
                <path d="M 250 125 L 290 125" stroke="#f59e0b" strokeWidth="2" />

                {/* Box 2 */}
                <rect x="300" y="70" width="200" height="110" rx="12" fill="url(#oopGrad2)" stroke="#38bdf8" strokeWidth="1" />
                <text x="400" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Phase 2: Prototype &amp; Engine</text>
                <text x="400" y="135" fill="#e0f2fe" fontSize="11" textAnchor="middle">&#123;"V8 Engine Shape & Property Descriptor Lookup"&#125;</text>

                {/* Arrow 2 */}
                <path d="M 510 125 L 550 125" stroke="#38bdf8" strokeWidth="2" />

                {/* Box 3 */}
                <rect x="560" y="70" width="200" height="110" rx="12" fill="url(#oopGrad3)" stroke="#10b981" strokeWidth="1" />
                <text x="660" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Phase 3: Output State</text>
                <text x="660" y="135" fill="#d1fae5" fontSize="11" textAnchor="middle">&#123;"Evaluated Result & Instance State"&#125;</text>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure: Step-by-step architectural execution for {"Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"}.
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: DEEP TECHNICAL BREAKDOWN & SPECIFICATIONS ───── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Deep Technical Know-How, Spec Invariants &amp; Mechanics
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              The ECMAScript specification mandates precise abstract operations during the lifecycle of {"Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"}. The table below outlines formal specification rules, engine runtime dynamics, and actionable developer invariants.
            </p>

            {/* Specifications Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Feature / Phase</th>
                    <th className="p-3 border border-slate-800">ECMAScript Spec Rule</th>
                    <th className="p-3 border border-slate-800">Runtime / Engine Behavior</th>
                    <th className="p-3 border border-slate-800">Developer Invariant &amp; Best Practice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Object Spec Rule</td>
                    <td className="p-3 text-slate-300 font-sans">ECMAScript internal property descriptor algorithm</td>
                    <td className="p-3 text-amber-300 font-sans">V8 Hidden Class / Shape transition map</td>
                    <td className="p-3 text-emerald-400 font-sans">Maintain uniform property initialization order</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Memory Dynamics</td>
                    <td className="p-3 text-slate-300 font-sans">Heap allocated reference pointer with hash table overflow</td>
                    <td className="p-3 text-amber-300 font-sans">Zero-copy pointer sharing across scopes</td>
                    <td className="p-3 text-emerald-400 font-sans">Use structuredClone for independent deep copies</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Prototypal Inheritance</td>
                    <td className="p-3 text-slate-300 font-sans">[[Prototype]] link traversal to Object.prototype</td>
                    <td className="p-3 text-amber-300 font-sans">Monomorphic inline cache lookup</td>
                    <td className="p-3 text-emerald-400 font-sans">Share methods on prototype, state on instance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Exceptions, Quirks &amp; Corner Cases to Know
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">TypeError on Undefined Navigation:</strong> Accessing nested properties on null/undefined without optional chaining (?.).</li>
                <li><strong className="text-rose-300">Shallow Mutation Side Effects:</strong> Mutating nested objects after a shallow copy corrupts the original instance.</li>
                <li><strong className="text-rose-300">this Context Loss:</strong> Detaching object methods from their parent object changes `this` to undefined or global.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: HANDS-ON MONACO CODE RUNNER (5+ EXAMPLES) ──── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 flex items-center gap-2">
              <span>💻</span> Interactive Monaco Playground: 5+ Practical Working Examples
            </h2>
            <span className="text-xs font-mono px-3 py-1 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
              Live In-Browser Execution
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <JavaScriptEditableCodeBlock
              initialCode={demoCode}
              title="OopTopic9PropertyDescriptorsMetaprDemo.js"
            />
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS & SENIOR BEST PRACTICES ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>⚖️</span> Common Pitfalls vs Senior Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfall Anti-Pattern */}
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span>
                <span>Anti-Pattern: {"Improper Usage of Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Failing to handle object references or dynamic context properly causes subtle bugs and memory leaks."}
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{"// ❌ AVOID: Direct mutation or unsafe property access\nconst obj = { a: 1 };\nconst copy = obj; // Shared pointer!\ncopy.a = 99; // Mutates obj.a!"}
              </pre>
            </div>

            {/* Senior Best Practice */}
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro Practice: {"Senior Pro Best Practice for Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Always use immutable patterns, defensive property guards, and explicit binding."}
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{"// ✓ RECOMMENDED: Defensive & Predictable\nconst obj = { a: 1 };\nconst clone = { ...obj };\nclone.a = 99;\nconsole.log(obj.a); // 1 (Safe)"}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: 💎 JAVASCRIPT HIDDEN GEMS & PRO TRICKS ──────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-purple-950/20 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xl shadow-md">
                💎
              </span>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold block">
                  JavaScript Hidden Gem &amp; Senior Pro Secret
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {"Senior Pro Gem for Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {"Leverage modern ECMAScript reflection, hidden class optimization, or TC39 syntax features for maximum performance and readability."}
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{"// 💎 SENIOR SECRET: High-performance object handling\nconst record = Object.freeze({ id: \"REC_001\", status: \"VALIDATED\" });\nconsole.log(\"Object is frozen:\", Object.isFrozen(record));"}</pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Think About This...
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              {"In the context of Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor(), how does the JavaScript engine optimize property lookups when objects share the exact same instantiation order?"}
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: {"V8 creates identical Hidden Classes (Shapes) for objects initialized with identical property sequences."}
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: COMPREHENSIVE FAQ SECTION (25-30 ITEMS) ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · " + "Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"}
            subtitle="Explore 25+ comprehensive questions from basic concepts to senior enterprise architecture"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · " + "Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()"}
            downloadFileName="002-003-topic9-note.txt"
          />
        </section>

        {/* ─── SECTION 11: TEACHER'S NOTE & MENTORSHIP ────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of mentoring software engineers at Coder & AccoTax in Barrackpore, I have consistently seen that mastering " + "Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor()" + " separates code monkeys from genuine software engineers. " + "Mastering Property Descriptors & Metaprogramming: Object.defineProperty(), getOwnPropertyDescriptor() is what gives you full control over JavaScript's flexible, prototype-driven object model."}
          />
        </section>

      </div>
    </>
  );
}
