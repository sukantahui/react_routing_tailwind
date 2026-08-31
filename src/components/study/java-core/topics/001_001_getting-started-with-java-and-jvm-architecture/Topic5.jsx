import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jdkDemoCode from "./topic5_files/JdkJreJvmDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
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
            Module 001_001 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Core Architecture Layers
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          JDK vs JRE vs JVM: The Core Architectural Trio
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Demystify the nested relationship between the Java Development Kit (JDK), Java Runtime Environment (JRE), and Java Virtual Machine (JVM).
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🎯</span> The Fundamental Nested Relationship
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The easiest way to remember how Java executes is through the <strong>Nested Layer Equation</strong>:
          </p>
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-700 font-mono text-center text-sm md:text-base text-amber-300 space-y-1">
            <p>JDK = JRE + Development Tools (javac, javadoc, jdb, jar, jlink)</p>
            <p className="text-emerald-300">JRE = JVM + Standard Class Libraries (java.base, rt.jar)</p>
            <p className="text-purple-300">JVM = Virtual Machine Engine (ClassLoader + JIT + Memory + GC)</p>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300">
            <p className="font-medium text-emerald-300 mb-1">Classroom Analogy (Naihati to Barrackpore):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Abhronila</strong> sets up her laptop in our Naihati center, she installs the full <strong>JDK</strong> so she can compile source files with <code className="text-amber-300">javac</code>. Meanwhile, when our production banking server in Barrackpore deploys the pre-built application, it only needs the <strong>JRE/JVM</strong> to execute the bytecode!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>📦</span> Visual Nested Architectural Diagram
        </h2>
        <p className="text-sm text-slate-400">
          Observe how each layer encloses and extends the underlying runtime components:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 340"
            className="w-full h-auto"
            aria-label="JDK JRE JVM Nested Architecture Diagram"
          >
            {/* Outer Box: JDK */}
            <rect x="40" y="20" width="800" height="300" rx="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="70" y="55" fill="#38bdf8" fontWeight="bold" fontSize="16">
              JDK (Java Development Kit)
            </text>
            <text x="70" y="75" fill="#94a3b8" fontSize="12">
              For Software Developers · Tools: javac, javadoc, jar, jdb, jcmd, jps, jlink, jshell
            </text>

            {/* Middle Box: JRE */}
            <rect x="70" y="95" width="740" height="205" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
            <text x="100" y="125" fill="#a5b4fc" fontWeight="bold" fontSize="15">
              JRE (Java Runtime Environment)
            </text>
            <text x="100" y="145" fill="#cbd5e1" fontSize="11">
              For Running Java Applications · Standard Class Libraries (java.base, java.util, java.io, java.sql)
            </text>

            {/* Inner Core: JVM */}
            <rect x="100" y="165" width="680" height="115" rx="10" fill="#042f2e" stroke="#2dd4bf" strokeWidth="2" />
            <text x="130" y="195" fill="#5eead4" fontWeight="bold" fontSize="14">
              JVM (Java Virtual Machine)
            </text>

            {/* Sub-components of JVM */}
            <rect x="130" y="210" width="140" height="50" rx="6" fill="#134e4a" />
            <text x="200" y="232" textAnchor="middle" fill="#ccfbf1" fontWeight="bold" fontSize="11">
              ClassLoader Subsystem
            </text>
            <text x="200" y="248" textAnchor="middle" fill="#99f6e4" fontSize="10">
              Loading & Linking
            </text>

            <rect x="290" y="210" width="140" height="50" rx="6" fill="#134e4a" />
            <text x="360" y="232" textAnchor="middle" fill="#ccfbf1" fontWeight="bold" fontSize="11">
              Runtime Data Areas
            </text>
            <text x="360" y="248" textAnchor="middle" fill="#99f6e4" fontSize="10">
              Heap, Stack, Metaspace
            </text>

            <rect x="450" y="210" width="140" height="50" rx="6" fill="#134e4a" />
            <text x="520" y="232" textAnchor="middle" fill="#ccfbf1" fontWeight="bold" fontSize="11">
              Execution Engine
            </text>
            <text x="520" y="248" textAnchor="middle" fill="#99f6e4" fontSize="10">
              Interpreter & JIT (C1/C2)
            </text>

            <rect x="610" y="210" width="140" height="50" rx="6" fill="#134e4a" />
            <text x="680" y="232" textAnchor="middle" fill="#ccfbf1" fontWeight="bold" fontSize="11">
              Garbage Collector
            </text>
            <text x="680" y="248" textAnchor="middle" fill="#99f6e4" fontSize="10">
              G1, ZGC, Shenandoah
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Comparison Table */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Layer Comparison Matrix
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/80 text-sky-400">
                <th className="p-3 font-bold">Feature</th>
                <th className="p-3 font-bold">JVM</th>
                <th className="p-3 font-bold">JRE</th>
                <th className="p-3 font-bold">JDK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-white">Full Name</td>
                <td className="p-3 text-emerald-400">Java Virtual Machine</td>
                <td className="p-3 text-indigo-400">Java Runtime Environment</td>
                <td className="p-3 text-sky-400">Java Development Kit</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-white">Primary Purpose</td>
                <td className="p-3">Execute compiled bytecode</td>
                <td className="p-3">Run Java programs (JVM + APIs)</td>
                <td className="p-3">Develop, compile & debug Java code</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-white">Contains Compiler (javac)?</td>
                <td className="p-3 text-rose-400">❌ No</td>
                <td className="p-3 text-rose-400">❌ No</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-white">Target Audience</td>
                <td className="p-3">Runtime Engine</td>
                <td className="p-3">End Users & Production Servers</td>
                <td className="p-3">Java Software Engineers</td>
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
            Example: Inspecting JVM Heap & CPU Cores via Runtime API
          </h3>
          <JavaFileLoader
            fileModule={jdkDemoCode}
            title="JdkJreJvmDemo.java"
            highlightLines={[8, 9, 10, 11, 14, 15, 16]}
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
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Installing JRE Instead of JDK for Coursework</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Beginners often download the JRE and are surprised when the terminal outputs <code className="text-rose-400">'javac' is not recognized as an internal or external command</code>. Always download the full <strong>JDK</strong> for coding!
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Set JAVA_HOME to the Root JDK Folder</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Set <code className="text-amber-300">JAVA_HOME</code> to the JDK root directory (e.g. <code className="text-amber-300">C:\Program Files\Java\jdk-21</code>), and append <code className="text-emerald-300">%JAVA_HOME%\bin</code> to your system <code className="text-amber-300">PATH</code>.
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
            🤔 <em>“Why is the JDK download size around 200MB, while a custom jlink-generated runtime for a production microservice can be as small as 35MB?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about all the development compilers, debuggers, and unneeded modules that get stripped away in a custom production runtime!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="JDK vs JRE vs JVM FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 5: JDK vs JRE vs JVM"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic5_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Whenever you run into environment configuration issues, check your layers: Is JAVA_HOME pointing to the JDK? Is javac available in PATH? Is your IDE using the correct JVM version? Keeping this mental model crystal clear will save you hundreds of hours of debugging. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
