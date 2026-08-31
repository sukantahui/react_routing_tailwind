import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import runtimeDemoCode from "./topic16_files/RuntimeErrorsDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
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
            Module 001_001 · Topic 16
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Runtime Exceptions & Errors
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Common Beginner Runtime Errors & Defensive Handling
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master defensive programming: diagnose and safeguard against the most frequent runtime crashes—<code className="text-rose-400">NullPointerException</code>, <code className="text-rose-400">ArrayIndexOutOfBoundsException</code>, <code className="text-rose-400">ClassCastException</code>, <code className="text-rose-400">StackOverflowError</code>, and <code className="text-rose-400">OutOfMemoryError</code>.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>⚡</span> Runtime Exceptions vs Compile-Time Errors
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Unlike compilation errors that stop <code className="text-amber-300">javac</code>, <strong>Runtime Exceptions</strong> occur while the program is actively executing inside the JVM. They arise from unexpected input, boundary overflows, or null state.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300">
            <p className="font-medium text-rose-300 mb-1">Classroom Scenario (Shyamnagar Lab):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Tuhina</strong> in Shyamnagar processed student attendance from an array of 5 elements using a loop condition <code className="text-rose-400">i &lt;= attendance.length</code>, the JVM crashed on iteration 5 with <code className="text-rose-400">ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5</code>. Changing the condition to <code className="text-emerald-300">i &lt; attendance.length</code> made the loop rock-solid!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🛡️</span> The "Big 5" Runtime Pitfalls Diagnostic Map
        </h2>
        <p className="text-sm text-slate-400">
          Understand the cause and defensive strategy for each classic runtime failure:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 340"
            className="w-full h-auto"
            aria-label="Common Java Runtime Errors Diagnostic Map"
          >
            {/* Box 1: NPE */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="20" y="30" width="155" height="280" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
              <rect x="30" y="45" width="135" height="35" rx="6" fill="#881337" />
              <text x="97" y="68" textAnchor="middle" fill="#fecdd3" fontWeight="bold" fontSize="11">
                NullPointerEx
              </text>
              <text x="97" y="105" textAnchor="middle" fill="#fb7185" fontWeight="bold" fontSize="11">
                Trigger:
              </text>
              <text x="97" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Calling method or
              </text>
              <text x="97" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                accessing field on
              </text>
              <text x="97" y="165" textAnchor="middle" fill="#fca5a5" fontSize="10">
                null reference
              </text>
              <rect x="30" y="210" width="135" height="80" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="97" y="235" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Defense:
              </text>
              <text x="97" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                if (obj != null)
              </text>
              <text x="97" y="275" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Optional&lt;T&gt;
              </text>
            </g>

            {/* Box 2: ArrayIndexOutOfBounds */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="190" y="30" width="155" height="280" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <rect x="200" y="45" width="135" height="35" rx="6" fill="#78350f" />
              <text x="267" y="68" textAnchor="middle" fill="#fef3c7" fontWeight="bold" fontSize="11">
                IndexOutOfBounds
              </text>
              <text x="267" y="105" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="11">
                Trigger:
              </text>
              <text x="267" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                index &lt; 0 or
              </text>
              <text x="267" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                index &gt;= length
              </text>
              <text x="267" y="165" textAnchor="middle" fill="#fde68a" fontSize="10">
                Array / String
              </text>
              <rect x="200" y="210" width="135" height="80" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="267" y="235" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Defense:
              </text>
              <text x="267" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                i &lt; arr.length
              </text>
              <text x="267" y="275" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                for (var x : arr)
              </text>
            </g>

            {/* Box 3: ClassCastException */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="360" y="30" width="155" height="280" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
              <rect x="370" y="45" width="135" height="35" rx="6" fill="#581c87" />
              <text x="437" y="68" textAnchor="middle" fill="#f3e8ff" fontWeight="bold" fontSize="11">
                ClassCastEx
              </text>
              <text x="437" y="105" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="11">
                Trigger:
              </text>
              <text x="437" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Illegal downcast
              </text>
              <text x="437" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                to unmatching
              </text>
              <text x="437" y="165" textAnchor="middle" fill="#e9d5ff" fontSize="10">
                class hierarchy
              </text>
              <rect x="370" y="210" width="135" height="80" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="437" y="235" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Defense:
              </text>
              <text x="437" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                instanceof check
              </text>
              <text x="437" y="275" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Pattern Matching
              </text>
            </g>

            {/* Box 4: StackOverflowError */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="530" y="30" width="155" height="280" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="540" y="45" width="135" height="35" rx="6" fill="#0c4a6e" />
              <text x="607" y="68" textAnchor="middle" fill="#bae6fd" fontWeight="bold" fontSize="11">
                StackOverflow
              </text>
              <text x="607" y="105" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="11">
                Trigger:
              </text>
              <text x="607" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Infinite recursive
              </text>
              <text x="607" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                method calls
              </text>
              <text x="607" y="165" textAnchor="middle" fill="#7dd3fc" fontSize="10">
                exceeding -Xss
              </text>
              <rect x="540" y="210" width="135" height="80" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="607" y="235" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Defense:
              </text>
              <text x="607" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Base condition
              </text>
              <text x="607" y="275" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Convert to loops
              </text>
            </g>

            {/* Box 5: OutOfMemoryError */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="700" y="30" width="160" height="280" rx="10" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
              <rect x="710" y="45" width="140" height="35" rx="6" fill="#831843" />
              <text x="780" y="68" textAnchor="middle" fill="#fbcfe8" fontWeight="bold" fontSize="11">
                OutOfMemory
              </text>
              <text x="780" y="105" textAnchor="middle" fill="#f472b6" fontWeight="bold" fontSize="11">
                Trigger:
              </text>
              <text x="780" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Heap exhaustion
              </text>
              <text x="780" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Reachable object
              </text>
              <text x="780" y="165" textAnchor="middle" fill="#f9a8d4" fontSize="10">
                leaks over -Xmx
              </text>
              <rect x="710" y="210" width="140" height="80" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="780" y="235" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Defense:
              </text>
              <text x="780" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Stream datasets
              </text>
              <text x="780" y="275" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Tune -Xmx heap
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Defensive Coding Principles */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🛡️</span> 3 Rules of Defensive Programming
        </h2>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-sky-400 text-base mb-1">1. Validate Arguments Early (Fail-Fast)</h3>
            <p>
              Use <code className="text-emerald-300">Objects.requireNonNull(name, "Name cannot be null")</code> at the top of your constructors and methods so nulls are caught immediately before corrupting system state.
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-emerald-400 text-base mb-1">2. Use Pattern Matching `instanceof`</h3>
            <p>
              In modern Java, write <code className="text-emerald-300 font-mono">if (obj instanceof Student s)</code> to check type and cast in a single step, eliminating any possibility of a <code className="text-rose-400">ClassCastException</code>.
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
            Example: Defensive Runtime Exception Handling
          </h3>
          <JavaFileLoader
            fileModule={runtimeDemoCode}
            title="RuntimeErrorsDemo.java"
            highlightLines={[10, 11, 12, 13, 14, 18, 19, 20, 24, 25, 26]}
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
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Catching `Throwable` or `Error`</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Never write <code className="text-rose-300 font-mono">catch (Throwable t)</code> or <code className="text-rose-300 font-mono">catch (Error e)</code>. Fatal errors like <code className="text-rose-400">OutOfMemoryError</code> mean the JVM is corrupted; suppressing them prevents container orchestrators from restarting unhealthy services.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Prefer Enhanced For-Each Loops</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Using <code className="text-emerald-300 font-mono">for (int score : scores)</code> eliminates index arithmetic completely, guaranteeing zero <code className="text-rose-400">ArrayIndexOutOfBoundsException</code> bugs.
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
            🤔 <em>“Why does `Integer boxed = null; int x = boxed;` throw a NullPointerException even though there is no visible method call in the source code?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The compiler secretly converts unboxing into `boxed.intValue()`, which invokes a method on a null reference!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Common Beginner Runtime Errors FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 16: Common Runtime Errors"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic16_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Congratulations on completing Module 1! You now understand the JVM architecture, compilation lifecycle, environment variables, program structure, and defensive exception handling. You have built a rock-solid foundation for enterprise Java mastery. Next, we explore variables, literals, and primitive data types in Module 2! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
