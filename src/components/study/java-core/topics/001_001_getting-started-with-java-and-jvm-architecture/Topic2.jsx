import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import buzzwordsDemoCode from "./topic2_files/JavaBuzzwordsDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_001 · Topic 2
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Core Architecture Pillars
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Key Features of Java: The Architectural Buzzwords
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Deep-dive into the 11 foundational design pillars of the Java platform: Object-Oriented design, Automatic Garbage Collection, Strict Memory Safety, Multi-threading, and Architecture Neutrality.
        </p>
      </header>

      {/* Section 1: Conceptual Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Sun White Paper Architectural Pillars
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When Sun Microsystems published <em>"The Java Language Environment"</em> white paper, James Gosling codified 11 distinct architectural principles (popularly known as the <strong>Java Buzzwords</strong>) that solve the reliability and security problems plaguing traditional systems programming.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300">
            <p className="font-medium text-emerald-300 mb-1">Classroom Scenario (Naihati to Barrackpore):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Abhronila</strong> at our Naihati coaching batch asked why Java apps rarely suffer the fatal blue-screen crashes typical of unmanaged C++ binaries, we analyzed Java’s <strong>Robustness</strong>: automated garbage collection prevents memory leaks, while explicit array bounds checking prevents illegal buffer overflows before they ever reach hardware memory!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🧩</span> The 6 Key Pillars of the Java Platform
        </h2>
        <p className="text-sm text-slate-400">
          Hover over each pillar to visualize its role in making Java the world's most resilient enterprise language:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 320"
            className="w-full h-auto"
            aria-label="The 6 Architectural Pillars of Java"
          >
            {/* Center Core Hub */}
            <circle cx="440" cy="160" r="60" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" className="transition-all duration-300 hover:scale-105" />
            <text x="440" y="155" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="16">
              JAVA CORE
            </text>
            <text x="440" y="175" textAnchor="middle" fill="#bae6fd" fontSize="12">
              Architecture
            </text>

            {/* Pillar 1: Simple & OOP */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="50" y="40" width="180" height="85" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="140" y="70" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="14">
                1. Simple & OOP
              </text>
              <text x="140" y="90" textAnchor="middle" fill="#94a3b8" fontSize="11">
                No Raw Pointers
              </text>
              <text x="140" y="106" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Clean Classes & Objects
              </text>
              <line x1="230" y1="90" x2="385" y2="135" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3" />
            </g>

            {/* Pillar 2: Platform Independent */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="350" y="20" width="180" height="75" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <text x="440" y="48" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="14">
                2. Platform-Independent
              </text>
              <text x="440" y="68" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Bytecode (.class) + JVM
              </text>
              <line x1="440" y1="95" x2="440" y2="100" stroke="#a855f7" strokeWidth="1.5" />
            </g>

            {/* Pillar 3: Robust */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="650" y="40" width="180" height="85" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
              <text x="740" y="70" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="14">
                3. Robust
              </text>
              <text x="740" y="90" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Automatic Garbage Collection
              </text>
              <text x="740" y="106" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Static Type Verification
              </text>
              <line x1="650" y1="90" x2="495" y2="135" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3" />
            </g>

            {/* Pillar 4: Secure */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="50" y="195" width="180" height="85" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
              <text x="140" y="225" textAnchor="middle" fill="#fb7185" fontWeight="bold" fontSize="14">
                4. Secure
              </text>
              <text x="140" y="245" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Bytecode Verifier
              </text>
              <text x="140" y="261" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Sandboxed ClassLoaders
              </text>
              <line x1="230" y1="230" x2="385" y2="185" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3" />
            </g>

            {/* Pillar 5: Multi-Threaded */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="350" y="225" width="180" height="75" rx="10" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
              <text x="440" y="253" textAnchor="middle" fill="#fde047" fontWeight="bold" fontSize="14">
                5. Multi-Threaded
              </text>
              <text x="440" y="273" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Native Threads & Virtual Threads
              </text>
              <line x1="440" y1="225" x2="440" y2="220" stroke="#eab308" strokeWidth="1.5" />
            </g>

            {/* Pillar 6: Architecture Neutral */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="650" y="195" width="180" height="85" rx="10" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
              <text x="740" y="225" textAnchor="middle" fill="#22d3ee" fontWeight="bold" fontSize="14">
                6. Architecture Neutral
              </text>
              <text x="740" y="245" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Fixed 32-bit int & 64-bit long
              </text>
              <text x="740" y="261" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Strict IEEE 754 Floating Point
              </text>
              <line x1="650" y1="230" x2="495" y2="185" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3" />
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Feature Explanations */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔍</span> Detailed Feature Analysis
        </h2>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-sky-400 text-lg mb-1">1. Why Java Excluded Pointer Arithmetic</h3>
            <p>
              In C/C++, explicit pointer arithmetic (<code className="text-amber-300">ptr++</code>) allows reading and writing arbitrary memory locations. This causes catastrophic bugs like buffer overflow attacks and memory corruption. Java replaces raw pointers with <strong>safe object references</strong> completely managed by the JVM.
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-emerald-400 text-lg mb-1">2. Architecture Neutrality: Guaranteed Data Type Sizes</h3>
            <p>
              In C/C++, the size of an <code className="text-amber-300">int</code> is compiler and hardware dependent (16, 32, or 64 bits). In Java, data types have fixed bit-widths guaranteed by the specification: <code className="text-amber-300">byte = 8 bits</code>, <code className="text-amber-300">short = 16 bits</code>, <code className="text-amber-300">int = 32 bits</code>, <code className="text-amber-300">long = 64 bits</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Hands-on Code with JavaFileLoader */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Source Code
        </h2>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example: Multi-threading & Robust Execution in Core Java
          </h3>
          <JavaFileLoader
            fileModule={buzzwordsDemoCode}
            title="JavaBuzzwordsDemo.java"
            highlightLines={[9, 10, 11, 15, 18, 20]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Assuming Garbage Collection Prevents All Memory Leaks</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              While GC automatically cleans unreachable objects, if you keep static references or unclosed listeners pointing to objects you no longer need, the JVM cannot reclaim them, resulting in unintentional memory retention (logical memory leaks).
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Embrace Fail-Fast Exception Handling</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Never write empty <code className="text-rose-300">catch (Exception e) {}</code> blocks that swallow errors silently. Always log or propagate exceptions to preserve Java's robust diagnostic capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Hints & Thinking Guidance */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>“Why does Java prohibit multiple class inheritance (<code className="text-rose-300">class C extends A, B</code>) but allow implementing multiple interfaces (<code className="text-emerald-300">class C implements X, Y</code>)?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about state vs behavior contracts and how the "Diamond Problem" of duplicate field state is eliminated with pure interface contracts.
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Key Features of Java FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 2: Key Features of Java"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic2_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Whenever you design Java classes, leverage these architectural strengths. Use encapsulation to protect data, static typing to catch edge cases early, and clean exception handling. The robust foundation you build today will prevent thousands of production outages tomorrow. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
