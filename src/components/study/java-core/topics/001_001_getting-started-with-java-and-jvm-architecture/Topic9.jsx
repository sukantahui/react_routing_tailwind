import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ideDemoCode from "./topic9_files/IdeSetupDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
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
            Module 001_001 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Developer Tooling
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Choosing & Setting Up Java IDEs: IntelliJ IDEA, Eclipse, VS Code & BlueJ
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Supercharge your productivity: compare the major Java IDEs, learn essential keyboard shortcuts (<code className="text-amber-300">psvm</code>, <code className="text-amber-300">sout</code>, <code className="text-amber-300">Alt+Enter</code>), and master the interactive graphical debugger.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🚀</span> The Modern Java IDE Ecosystem
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            An <strong>Integrated Development Environment (IDE)</strong> combines an intelligent code editor, compiler, debugger, build automation (Maven/Gradle), and version control (Git) into a single cohesive workspace.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300">
            <p className="font-medium text-sky-300 mb-1">Classroom Mentorship Advice (Barrackpore):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep</strong> and <strong>Debangshu</strong> start in our Barrackpore laboratory, we ensure they write their first programs in plain terminal with <code className="text-amber-300">javac</code> to understand fundamentals. Once the core concepts are solid, we transition to <strong>IntelliJ IDEA Community Edition</strong>, which accelerates development speed by 10x with intelligent autocomplete and refactoring!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Comparison */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚖️</span> Comparing the 4 Major Java IDEs
        </h2>
        <p className="text-sm text-slate-400">
          Explore the strengths, best use cases, and architectures of each tool:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 320"
            className="w-full h-auto"
            aria-label="Java IDE Landscape Comparison"
          >
            {/* IDE 1: IntelliJ IDEA */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="30" y="30" width="190" height="260" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
              <rect x="50" y="45" width="150" height="35" rx="6" fill="#312e81" />
              <text x="125" y="68" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="13">
                IntelliJ IDEA
              </text>
              <text x="125" y="105" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="11">
                ⭐ Industry Gold Standard
              </text>
              <text x="125" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Deep Static Code Analysis
              </text>
              <text x="125" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Safe Automated Refactorings
              </text>
              <text x="125" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Free Community Edition
              </text>
              <text x="125" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Integrated Git & Maven
              </text>
              <rect x="45" y="235" width="160" height="35" rx="6" fill="#1e293b" stroke="#4ade80" />
              <text x="125" y="257" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Recommended for All
              </text>
            </g>

            {/* IDE 2: Eclipse */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="240" y="30" width="190" height="260" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="260" y="45" width="150" height="35" rx="6" fill="#0369a1" />
              <text x="335" y="68" textAnchor="middle" fill="#bae6fd" fontWeight="bold" fontSize="13">
                Eclipse IDE
              </text>
              <text x="335" y="105" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="11">
                Open-Source Veteran
              </text>
              <text x="335" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Incremental Compiler (ECJ)
              </text>
              <text x="335" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Massive Plugin Ecosystem
              </text>
              <text x="335" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • 100% Free & Open Source
              </text>
              <text x="335" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Enterprise legacy systems
              </text>
              <rect x="255" y="235" width="160" height="35" rx="6" fill="#0f172a" />
              <text x="335" y="257" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Enterprise Workhorse
              </text>
            </g>

            {/* IDE 3: VS Code */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="450" y="30" width="190" height="260" rx="10" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
              <rect x="470" y="45" width="150" height="35" rx="6" fill="#0891b2" />
              <text x="545" y="68" textAnchor="middle" fill="#cffafe" fontWeight="bold" fontSize="13">
                VS Code
              </text>
              <text x="545" y="105" textAnchor="middle" fill="#22d3ee" fontWeight="bold" fontSize="11">
                Lightweight & Modular
              </text>
              <text x="545" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Fast startup time
              </text>
              <text x="545" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Extension Pack for Java
              </text>
              <text x="545" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Language Server Protocol
              </text>
              <text x="545" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Polyglot web projects
              </text>
              <rect x="465" y="235" width="160" height="35" rx="6" fill="#0f172a" />
              <text x="545" y="257" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Great for Multi-language
              </text>
            </g>

            {/* IDE 4: BlueJ */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="660" y="30" width="190" height="260" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <rect x="680" y="45" width="150" height="35" rx="6" fill="#b45309" />
              <text x="755" y="68" textAnchor="middle" fill="#fef3c7" fontWeight="bold" fontSize="13">
                BlueJ
              </text>
              <text x="755" y="105" textAnchor="middle" fill="#fde047" fontWeight="bold" fontSize="11">
                Educational Beginner IDE
              </text>
              <text x="755" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Interactive Object Workbench
              </text>
              <text x="755" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Visual UML class diagrams
              </text>
              <text x="755" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • No main() method required
              </text>
              <text x="755" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • ICSE / School curriculum
              </text>
              <rect x="675" y="235" width="160" height="35" rx="6" fill="#0f172a" />
              <text x="755" y="257" textAnchor="middle" fill="#94a3b8" fontSize="10">
                School Classrooms
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Must-Know Shortcuts */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>⚡</span> Essential Productivity Shortcuts (IntelliJ IDEA)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-sky-400 mb-1">Code Generation</h3>
            <p><code className="text-amber-300 font-mono">psvm + Tab</code> → Generates `main` method</p>
            <p><code className="text-amber-300 font-mono">sout + Tab</code> → Generates `System.out.println()`</p>
            <p><code className="text-amber-300 font-mono">Alt + Insert</code> → Generates Constructor / Getters / Setters</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-emerald-400 mb-1">Refactoring & Fixes</h3>
            <p><code className="text-amber-300 font-mono">Alt + Enter</code> → Show intention actions & quick-fixes</p>
            <p><code className="text-amber-300 font-mono">Shift + F6</code> → Safe Project-Wide Rename</p>
            <p><code className="text-amber-300 font-mono">Ctrl + Alt + L</code> → Reformat & Indent Code cleanly</p>
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
            Example: Java IDE Landscape Demonstration
          </h3>
          <JavaFileLoader
            fileModule={ideDemoCode}
            title="IdeSetupDemo.java"
            highlightLines={[8, 9, 10, 11, 14, 19]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common IDE Pitfalls & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Committing .idea/ and .iml Files to Git</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Never commit IDE configuration folders (<code className="text-rose-300">.idea/</code>, <code className="text-rose-300">*.iml</code>, <code className="text-rose-300">.settings/</code>) into Git. Always add them to your <code className="text-amber-300">.gitignore</code> to prevent workspace conflicts with team members using different OS environments.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Learn the Interactive Debugger Early</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Instead of scattering dozens of <code className="text-amber-300">System.out.println()</code> statements to debug code, set breakpoints and use the graphical debugger (<code className="text-emerald-300">Shift + F9</code>) to inspect live variables and call stacks.
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
            🤔 <em>“Why does IntelliJ IDEA highlight errors in red squiggly lines while you are still typing, even before you click the Run or Build button?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The IDE runs a real-time background static syntax analyzer that continuously parses your AST tree as you edit!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Java IDEs (IntelliJ, Eclipse, VS Code) FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 9: Choosing and Setting Up Java IDEs"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic9_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Invest time into learning your IDE like a master craftsman learns their tools. Memorize your keybindings, master the interactive debugger, and let IntelliJ handle formatting and imports while you focus 100% of your mental energy on algorithmic problem solving and clean architecture. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
