import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import commentsDemoCode from "./topic14_files/JavaCommentsDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
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
            Module 001_001 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Documentation Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Single-line (<code className="text-amber-300">//</code>), Multi-line (<code className="text-amber-300">/* */</code>), and Javadoc (<code className="text-amber-300">/** */</code>) Comments
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the art of software documentation in Java: understand how the compiler strips comments, author standard Javadoc tags (<code className="text-emerald-300">@param</code>, <code className="text-emerald-300">@return</code>, <code className="text-emerald-300">@throws</code>), and generate enterprise HTML API documentation.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📝</span> The 3 Comment Types in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java provides three levels of comments, each tailored for a distinct communication purpose:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Single-line (<code className="text-sky-300">//</code>):</strong> Line-level notes and quick annotations.</li>
            <li><strong>Multi-line (<code className="text-amber-300">/* ... */</code>):</strong> Multi-line block comments for algorithms or temporarily disabling code.</li>
            <li><strong>Javadoc (<code className="text-emerald-300">/** ... */</code>):</strong> Structured documentation comments compiled into HTML by the <code className="text-amber-300">javadoc</code> tool.</li>
          </ol>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300">
            <p className="font-medium text-emerald-300 mb-1">Classroom Scenario (Naihati Academy):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Abhronila</strong> in Naihati authored her scholarship calculation service, she added full Javadoc tags (<code className="text-emerald-300">@param</code>, <code className="text-emerald-300">@return</code>, and <code className="text-emerald-300">@throws</code>). When <strong>Debangshu</strong> imported her class into his project, IntelliJ IDEA displayed instant rich hover tooltips with parameter descriptions automatically!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🗺️</span> Comment Styles & Javadoc HTML Pipeline
        </h2>
        <p className="text-sm text-slate-400">
          Trace how comments are processed by the compiler and documentation generators:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 300"
            className="w-full h-auto"
            aria-label="Java Comments and Javadoc Architecture Diagram"
          >
            {/* Box 1: Single Line */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="30" y="40" width="250" height="220" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <rect x="45" y="55" width="220" height="35" rx="6" fill="#0369a1" />
              <text x="155" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                // Single-Line
              </text>
              <text x="155" y="115" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="12">
                Line-Level Annotations
              </text>
              <text x="155" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Spans to end of current line
              </text>
              <rect x="45" y="150" width="220" height="95" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="55" y="175" fill="#86efac" fontSize="10" fontFamily="monospace">
                int score = 95; // 0-100
              </text>
              <text x="55" y="200" fill="#94a3b8" fontSize="10">
                • Stripped by javac Lexer
              </text>
              <text x="55" y="220" fill="#94a3b8" fontSize="10">
                • 0 bytes in .class file
              </text>
            </g>

            {/* Box 2: Multi Line */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="315" y="40" width="250" height="220" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <rect x="330" y="55" width="220" height="35" rx="6" fill="#b45309" />
              <text x="440" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                /* ... */ Multi-Line
              </text>
              <text x="440" y="115" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="12">
                Block & Algorithm Notes
              </text>
              <text x="440" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Spans multiple lines
              </text>
              <rect x="330" y="150" width="220" height="95" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="340" y="175" fill="#86efac" fontSize="10" fontFamily="monospace">
                /* Business algorithm */
              </text>
              <text x="340" y="200" fill="#fca5a5" fontSize="10">
                ⚠️ Cannot be nested!
              </text>
              <text x="340" y="220" fill="#94a3b8" fontSize="10">
                • Discarded by compiler
              </text>
            </g>

            {/* Box 3: Javadoc */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="600" y="40" width="250" height="220" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
              <rect x="615" y="55" width="220" height="35" rx="6" fill="#15803d" />
              <text x="725" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                /** ... */ Javadoc
              </text>
              <text x="725" y="115" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="12">
                API Documentation System
              </text>
              <text x="725" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Compiled into HTML pages
              </text>
              <rect x="615" y="150" width="220" height="95" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="625" y="172" fill="#4ade80" fontSize="10" fontFamily="monospace">
                @param score Grade (0-100)
              </text>
              <text x="625" y="190" fill="#4ade80" fontSize="10" fontFamily="monospace">
                @return Total scholarship
              </text>
              <text x="625" y="208" fill="#4ade80" fontSize="10" fontFamily="monospace">
                @throws IllegalArgumentEx
              </text>
              <text x="625" y="230" fill="#fde047" fontSize="9" fontWeight="bold">
                → Parsed by 'javadoc' CLI
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Essential Javadoc Tags Table */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🏷️</span> Standard Javadoc Tags Reference
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/80 text-sky-400">
                <th className="p-3 font-bold">Tag</th>
                <th className="p-3 font-bold">Applies To</th>
                <th className="p-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">@param name desc</td>
                <td className="p-3">Methods / Constructors</td>
                <td className="p-3">Documents method parameter meaning and acceptable ranges</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">@return desc</td>
                <td className="p-3">Methods</td>
                <td className="p-3">Documents the return value and possible edge states</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">@throws Type desc</td>
                <td className="p-3">Methods / Constructors</td>
                <td className="p-3">Documents exceptions thrown under error conditions</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">@deprecated desc</td>
                <td className="p-3">Classes / Methods</td>
                <td className="p-3">Explains why an API is obsolete and points to replacement</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">&#123;@code snippet&#125;</td>
                <td className="p-3">Inline Text</td>
                <td className="p-3">Renders monospaced code font without manual HTML escaping</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code with JavaFileLoader */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Source Code
        </h2>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example: Documenting a Class with Full Javadoc
          </h3>
          <JavaFileLoader
            fileModule={commentsDemoCode}
            title="JavaCommentsDemo.java"
            highlightLines={[3, 10, 11, 16, 17, 18, 19, 21, 23, 27, 28, 29, 30]}
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
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Attempting to Nest Multi-Line Comments</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">/* Outer /* Inner */ Still comment? */</code> causes a compilation error because the first <code className="text-rose-400">*/</code> immediately closes the entire comment block, leaving the trailing text as invalid syntax.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Explain 'Why', Not 'What'</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Do not write redundant comments like <code className="text-rose-300 font-mono">i++; // increment i</code>. Use comments to explain non-obvious business rules, algorithmic complexity trade-offs, or workarounds for external API quirks.
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
            🤔 <em>“Why do the official Java API docs (like java.util.ArrayList) look like clean, professional HTML websites?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Oracle runs the `javadoc` tool against the OpenJDK source code repositories during every build to generate those exact web pages!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Java Comments & Javadoc Documentation FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 14: Java Comments & Javadoc"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic14_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Writing code is only half the job of a software engineer; documenting your API contracts is what makes your code timeless and enterprise-ready. Treat your Javadoc comments as binding contracts that your future self and your teammates will thank you for. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
