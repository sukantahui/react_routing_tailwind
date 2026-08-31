import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cliDemoCode from "./topic12_files/CommandLineWorkflowDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
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
            Module 001_001 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            CLI & Terminal Mastery
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Writing, Compiling (<code className="text-amber-300">javac</code>) and Running (<code className="text-amber-300">java</code>) from Command Line
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master professional terminal workflow: compile organized source hierarchies with <code className="text-amber-300">javac -d bin</code>, execute packaged applications via <code className="text-amber-300">java -cp bin</code>, and run single-file scripts in modern Java.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>💻</span> The 3-Step Command Line Lifecycle
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Operating system command lines (CMD, PowerShell, Bash, Zsh) interact with Java through two fundamental binaries:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>The Compiler (<code className="text-amber-300">javac</code>):</strong> Reads <code className="text-amber-300">.java</code> files and compiles them into <code className="text-amber-300">.class</code> Bytecode files.</li>
            <li><strong>The Launcher (<code className="text-amber-300">java</code>):</strong> Initializes the host JVM, loads the specified class from the classpath, and launches <code className="text-amber-300">public static void main(String[] args)</code>.</li>
          </ol>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300">
            <p className="font-medium text-emerald-300 mb-1">Classroom Scenario (Barrackpore Terminal Lab):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep</strong> in our Barrackpore lab separated his project into <code className="text-amber-300">src/</code> and <code className="text-amber-300">bin/</code> folders, he compiled with <code className="text-emerald-300">javac -d bin src/topic12_files/CommandLineWorkflowDemo.java</code> and launched with <code className="text-emerald-300">java -cp bin topic12_files.CommandLineWorkflowDemo</code>. This clean separation of sources and binaries is the exact standard used in production Docker containers!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🛠️</span> Visual CLI Compilation & Execution Flow
        </h2>
        <p className="text-sm text-slate-400">
          Follow the directory layout and command execution path:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 300"
            className="w-full h-auto"
            aria-label="Command Line Compilation and Execution Workflow Diagram"
          >
            {/* Box 1: Source Code on Disk */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="30" y="70" width="220" height="150" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="140" y="100" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="14">
                1. Source File (.java)
              </text>
              <rect x="45" y="120" width="190" height="50" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="140" y="142" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                src/com/example/
              </text>
              <text x="140" y="158" textAnchor="middle" fill="#fde047" fontSize="11" fontFamily="monospace" fontWeight="bold">
                App.java
              </text>
              <text x="140" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                Human-readable syntax
              </text>
            </g>

            {/* Arrow with javac command */}
            <path d="M 250 145 L 340 145" stroke="#38bdf8" strokeWidth="2.5" />
            <rect x="250" y="105" width="90" height="30" rx="4" fill="#0369a1" />
            <text x="295" y="125" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10" fontFamily="monospace">
              javac -d bin
            </text>

            {/* Box 2: Compiled Bytecode in bin */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="340" y="70" width="230" height="150" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="455" y="100" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="14">
                2. Bytecode (.class)
              </text>
              <rect x="355" y="120" width="200" height="50" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="455" y="142" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                bin/com/example/
              </text>
              <text x="455" y="158" textAnchor="middle" fill="#4ade80" fontSize="11" fontFamily="monospace" fontWeight="bold">
                App.class
              </text>
              <text x="455" y="195" textAnchor="middle" fill="#fde68a" fontSize="10">
                0xCAFEBABE Bytecode
              </text>
            </g>

            {/* Arrow with java command */}
            <path d="M 570 145 L 650 145" stroke="#4ade80" strokeWidth="2.5" />
            <rect x="570" y="105" width="80" height="30" rx="4" fill="#15803d" />
            <text x="610" y="125" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10" fontFamily="monospace">
              java -cp bin
            </text>

            {/* Box 3: Execution Output */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="650" y="70" width="200" height="150" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
              <text x="750" y="100" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="14">
                3. JVM Execution
              </text>
              <rect x="665" y="120" width="170" height="75" rx="6" fill="#0f172a" stroke="#166534" />
              <text x="675" y="142" fill="#86efac" fontSize="10" fontFamily="monospace">
                &gt; java -cp bin com.example.App
              </text>
              <text x="675" y="165" fill="#fde047" fontSize="10" fontFamily="monospace">
                Output: Hello Java!
              </text>
              <text x="675" y="183" fill="#4ade80" fontSize="9" fontFamily="monospace">
                Exit status: 0 (Success)
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Essential Commands Cheat Sheet */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📋</span> CLI Command Cheat Sheet
        </h2>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="font-bold text-sky-400 text-base">1. Clean Compilation to Output Directory</h3>
            <pre className="p-3 bg-slate-950 rounded text-emerald-300 font-mono text-xs overflow-x-auto">
              javac -d bin src/com/example/App.java
            </pre>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="font-bold text-purple-400 text-base">2. Running Packaged Applications</h3>
            <pre className="p-3 bg-slate-950 rounded text-emerald-300 font-mono text-xs overflow-x-auto">
              java -cp bin com.example.App
            </pre>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">3. Single-File Script Execution (Java 11+)</h3>
            <pre className="p-3 bg-slate-950 rounded text-emerald-300 font-mono text-xs overflow-x-auto">
              java src/com/example/App.java
            </pre>
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
            Example: Command-Line Workflow Demonstration
          </h3>
          <JavaFileLoader
            fileModule={cliDemoCode}
            title="CommandLineWorkflowDemo.java"
            highlightLines={[1, 10, 13, 14, 15, 18]}
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
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Appending .class to the Execution Command</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300">java App.class</code> causes the JVM to search for a class named <code className="text-rose-400">class</code> inside a package named <code className="text-rose-400">App</code>! Always omit the file extension: <code className="text-emerald-300">java App</code>.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Always Use `-d` to Separate Output Folders</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Never pollute your <code className="text-amber-300">src/</code> directory by letting <code className="text-amber-300">javac</code> place <code className="text-amber-300">.class</code> files next to <code className="text-amber-300">.java</code> files. Always compile into a separate <code className="text-emerald-300">bin/</code> or <code className="text-emerald-300">target/</code> directory with <code className="text-emerald-300">javac -d bin</code>.
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
            🤔 <em>“Why does `javac App.java` take the filename with extension, while `java App` takes the class name without extension?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> `javac` is an OS file compiler reading physical files from disk, while `java` is a virtual machine launcher searching for a class entity in its internal Classpath!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Command-Line (javac / java) FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 12: CLI Compilation & Execution"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic12_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="When you understand how javac and java work from the terminal, you demystify what IDEs do behind the scenes. You become fully equipped to debug Docker builds, write CI/CD pipelines, and deploy enterprise microservices to cloud Linux servers with total confidence. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
