import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import paramDemoCode from "./topic3_files/FormalParametersVsArgumentsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowParam {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-pm {
            animation: glowParam 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Stack Frame Data Binding
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Formal Parameters vs. Actual Arguments in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the precise boundary between parameter definitions and argument values (JLS §8.4.1, §15.7.4): stack frame allocation, eager left-to-right evaluation, automatic widening conversions, positional matching, and student fee computations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Understanding the Parameter-Argument Duality
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            While often used interchangeably in casual speech, <strong>Parameters</strong> and <strong>Arguments</strong> have distinct technical roles in Java memory architecture:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Formal Parameters (Definition)</h3>
              <p className="text-slate-300 mb-2">void compute(String name, double fee)</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Variable placeholders declared in the method signature header. They occupy local variable slots in the newly pushed Stack Frame when the method is invoked.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Actual Arguments (Call Site)</h3>
              <p className="text-emerald-300 mb-2">compute(&quot;Swadeep&quot;, 4000.0 * 6)</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                The evaluated values, literal expressions, or variables supplied at the call site. Java evaluates arguments from left-to-right before entering the method.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Batch Invocations):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (literals: <code className="text-sky-300 font-mono">&quot;Swadeep&quot;, 4000.0, 6, true</code>), <strong>Tuhina</strong> (variables: <code className="text-sky-300 font-mono">candidate, baseRate, duration, hasMerit</code>), <strong>Abhronila</strong> (expressions: <code className="text-purple-300 font-mono">3000.0 + 1500.0, 2 * 3</code>), and <strong>Debangshu</strong> (widening: integer <code className="text-emerald-400 font-mono">6000</code> $\to$ double <code className="text-emerald-400 font-mono">6000.0</code>) invoked the exact same fee method in Indian Rupees (<code className="text-emerald-400 font-semibold">₹18,000 to ₹27,000</code>) demonstrating diverse argument forms.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Call Site to Stack Frame Data Binding Flow
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How actual arguments are evaluated and bound into formal parameter slots on the JVM Call Stack:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Parameters vs Arguments Binding Diagram"
          >
            <defs>
              <linearGradient id="gradCallSite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradStack" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Step 1: Call Site (Actual Arguments) */}
            <rect x="30" y="30" width="250" height="210" rx="10" fill="url(#gradCallSite)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="155" y="55" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">1. CALL SITE (Actual Arguments)</text>
            <rect x="45" y="70" width="220" height="150" rx="6" fill="#2e1065" />
            <text x="55" y="95" fill="#ddd6fe" fontSize="10" fontFamily="monospace">computeTotalFee(</text>
            <text x="65" y="120" fill="#a78bfa" fontSize="10" fontFamily="monospace">&quot;Swadeep&quot;,   // arg 0</text>
            <text x="65" y="145" fill="#a78bfa" fontSize="10" fontFamily="monospace">4000.0,      // arg 1</text>
            <text x="65" y="170" fill="#a78bfa" fontSize="10" fontFamily="monospace">6,           // arg 2</text>
            <text x="65" y="195" fill="#a78bfa" fontSize="10" fontFamily="monospace">true         // arg 3</text>
            <text x="55" y="212" fill="#ddd6fe" fontSize="10" fontFamily="monospace">);</text>

            {/* Step 2: Method Signature Header (Formal Parameters) */}
            <rect x="315" y="30" width="250" height="210" rx="10" fill="url(#gradHeader)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="55" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">2. METHOD HEADER (Parameters)</text>
            <rect x="330" y="70" width="220" height="150" rx="6" fill="#082f49" />
            <text x="340" y="95" fill="#bae6fd" fontSize="10" fontFamily="monospace">computeTotalFee(</text>
            <text x="350" y="120" fill="#38bdf8" fontSize="10" fontFamily="monospace">String studentName,</text>
            <text x="350" y="145" fill="#38bdf8" fontSize="10" fontFamily="monospace">double monthlyFee,</text>
            <text x="350" y="170" fill="#38bdf8" fontSize="10" fontFamily="monospace">int months,</text>
            <text x="350" y="195" fill="#38bdf8" fontSize="10" fontFamily="monospace">boolean isScholarship</text>
            <text x="340" y="212" fill="#bae6fd" fontSize="10" fontFamily="monospace">)</text>

            {/* Step 3: JVM Stack Frame */}
            <rect x="600" y="30" width="250" height="210" rx="10" fill="url(#gradStack)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="725" y="55" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">3. STACK FRAME SLOTS</text>
            <rect x="615" y="70" width="220" height="150" rx="6" fill="#022c22" />
            <text x="625" y="95" fill="#a7f3d0" fontSize="10" fontFamily="monospace">[Slot 0] &quot;Swadeep&quot; (ref)</text>
            <text x="625" y="125" fill="#a7f3d0" fontSize="10" fontFamily="monospace">[Slot 1-2] 4000.0 (64b)</text>
            <text x="625" y="155" fill="#a7f3d0" fontSize="10" fontFamily="monospace">[Slot 3] 6 (32b int)</text>
            <text x="625" y="185" fill="#a7f3d0" fontSize="10" fontFamily="monospace">[Slot 4] 1 (boolean true)</text>
            <text x="625" y="210" fill="#d1fae5" fontSize="9" textAnchor="middle">✓ Values copied into frame</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §15.7.4: Java evaluates arguments left-to-right, pushes a Stack Frame, and binds values into parameter slots.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> The 3 Invariants for Argument Matching
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Invariant</th>
                <th className="p-3 font-semibold text-emerald-400">Rule Description</th>
                <th className="p-3 font-semibold text-rose-400">Violation Consequence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">1. Count Match</td>
                <td className="p-3 text-slate-300 font-sans">Number of arguments must equal declared parameter count</td>
                <td className="p-3 text-rose-400 font-sans">`Compile Error: argument lists differ in length`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-300 font-bold">2. Type Compatibility</td>
                <td className="p-3 text-slate-300 font-sans">Argument type must be assignable (supports widening: `int` $\to$ `double`)</td>
                <td className="p-3 text-rose-400 font-sans">`Compile Error: incompatible types`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-300 font-bold">3. Order Match</td>
                <td className="p-3 text-slate-300 font-sans">Sequence of arguments must strictly match positional parameter order</td>
                <td className="p-3 text-rose-400 font-sans">`Compile Error` or subtle runtime calculation bugs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code Example */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>💻</span> Compilable Java Source Code
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            FormalParametersVsArgumentsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates literal arguments, variable arguments, complex expression evaluation, and automatic widening conversions in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={paramDemoCode}
          title="FormalParametersVsArgumentsDemo.java"
          highlightLines={[20, 36, 44, 49, 54]}
        />
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Best Practices
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 1: Assuming Java Supports Named Arguments
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">compute(monthlyFee = 4000, months = 6)</code> causes a <code className="text-rose-400 font-mono">Compile Error</code> in Java. Arguments in Java are strictly <strong>positional</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Java Records to Group Excessive Parameters
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When a method requires more than 3 or 4 parameters, bundle them into an immutable <code className="text-emerald-400 font-mono">record EnrollmentRequest(...)</code> to improve readability and eliminate parameter ordering bugs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Thinking & Hints Section */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;Why can an integer argument <code className="text-emerald-400 font-mono">6000</code> be passed to a <code className="text-sky-300 font-mono">double</code> parameter, but a <code className="text-rose-300 font-mono">double</code> argument cannot be passed to an <code className="text-sky-300 font-mono">int</code> parameter?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Widening vs Narrowing Conversions! Converting 32-bit <code className="text-emerald-400 font-mono">int</code> to 64-bit IEEE 754 <code className="text-emerald-400 font-mono">double</code> is lossless, so Java performs it automatically. Converting <code className="text-rose-300 font-mono">double</code> to <code className="text-rose-300 font-mono">int</code> truncates decimals (lossy), requiring an explicit cast!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Formal Parameters vs Arguments FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 3: Formal Parameters vs Actual Arguments"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic3_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Always remember that Formal Parameters live in the method definition header, while Actual Arguments are the evaluated values provided at the call site. In Topic 4, we examine Return Statement Semantics & Guard Clauses! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
