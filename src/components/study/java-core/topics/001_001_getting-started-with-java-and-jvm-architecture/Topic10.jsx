import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import structureDemoCode from "./topic10_files/StandardProgramStructureDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
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
            Module 001_001 · Topic 10
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Program Structure
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Structure of a Standard Java Program: Packages, Imports, Classes & Members
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the mandatory structural rules of a Java compilation unit (.java): package namespaces, explicit vs wildcard imports, access modifiers, constructors, instance vs static fields, and the <code className="text-amber-300">main()</code> entry point.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Mandatory Top-to-Bottom Structure
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Every Java file (<code className="text-amber-300">.java</code>) follows an immutable top-to-bottom structural hierarchy governed by the Java Language Specification (JLS):
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-slate-300">
            <li><strong>Package Declaration:</strong> Line 1 (optional, defines directory namespace).</li>
            <li><strong>Import Statements:</strong> Declares external classes needed by the file.</li>
            <li><strong>Class / Interface Declaration:</strong> Encapsulates data fields, constructors, and methods.</li>
          </ol>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300">
            <p className="font-medium text-amber-300 mb-1">Classroom Rule (Naihati Center):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Abhronila</strong> wrote an import statement above her package declaration in our Naihati center, <code className="text-amber-300">javac</code> immediately threw a compilation error: <code className="text-rose-400">class, interface, or enum expected</code>. Remember: <strong>Package ALWAYS comes first!</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>📐</span> Visual Anatomy of a `.java` Source File
        </h2>
        <p className="text-sm text-slate-400">
          Inspect how sections and class members are organized:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 340"
            className="w-full h-auto"
            aria-label="Java Source File Structure Blueprint"
          >
            {/* Main Outer File Box */}
            <rect x="40" y="20" width="800" height="300" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="45" fill="#38bdf8" fontWeight="bold" fontSize="13" fontFamily="monospace">
              StandardProgramStructureDemo.java
            </text>

            {/* Section 1: Package */}
            <g className="transition-all duration-300 hover:opacity-95">
              <rect x="60" y="60" width="760" height="35" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="80" y="82" fill="#a5b4fc" fontWeight="bold" fontSize="12" fontFamily="monospace">
                package topic10_files;
              </text>
              <text x="790" y="82" textAnchor="end" fill="#94a3b8" fontSize="11">
                Section 1: Namespace (Optional)
              </text>
            </g>

            {/* Section 2: Imports */}
            <g className="transition-all duration-300 hover:opacity-95">
              <rect x="60" y="105" width="760" height="40" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
              <text x="80" y="125" fill="#86efac" fontWeight="bold" fontSize="11" fontFamily="monospace">
                import java.util.Date;  import java.time.LocalDateTime;
              </text>
              <text x="790" y="130" textAnchor="end" fill="#94a3b8" fontSize="11">
                Section 2: External Dependencies
              </text>
            </g>

            {/* Section 3: Class Declaration & Body */}
            <g className="transition-all duration-300 hover:opacity-95">
              <rect x="60" y="155" width="760" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="80" y="178" fill="#fde047" fontWeight="bold" fontSize="12" fontFamily="monospace">
                public class StandardProgramStructureDemo &#123; ... &#125;
              </text>
              <text x="790" y="178" textAnchor="end" fill="#94a3b8" fontSize="11">
                Section 3: Class Definition
              </text>

              {/* Inner Member Blocks */}
              <rect x="80" y="195" width="165" height="95" rx="6" fill="#0f172a" stroke="#475569" />
              <text x="162" y="220" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="11">
                1. Fields (State)
              </text>
              <text x="162" y="240" textAnchor="middle" fill="#94a3b8" fontSize="10">
                static final String ORG;
              </text>
              <text x="162" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10">
                private String name;
              </text>

              <rect x="260" y="195" width="165" height="95" rx="6" fill="#0f172a" stroke="#475569" />
              <text x="342" y="220" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="11">
                2. Constructors
              </text>
              <text x="342" y="240" textAnchor="middle" fill="#94a3b8" fontSize="10">
                public Demo(String s)
              </text>
              <text x="342" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Object Initialization
              </text>

              <rect x="440" y="195" width="170" height="95" rx="6" fill="#0f172a" stroke="#475569" />
              <text x="525" y="220" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="11">
                3. Methods (Behavior)
              </text>
              <text x="525" y="240" textAnchor="middle" fill="#94a3b8" fontSize="10">
                displayStudentProfile()
              </text>
              <text x="525" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Getters & Setters
              </text>

              <rect x="625" y="195" width="180" height="95" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
              <text x="715" y="220" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="11">
                4. Entry Point (main)
              </text>
              <text x="715" y="240" textAnchor="middle" fill="#e9d5ff" fontSize="9" fontFamily="monospace">
                public static void main
              </text>
              <text x="715" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Launches Application
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Golden Rules */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📜</span> The Golden Rules of Java Program Structure
        </h2>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-sky-400 text-lg mb-1">1. Single Public Class Rule</h3>
            <p>
              A single <code className="text-amber-300">.java</code> file can contain multiple non-public helper classes, but at most <strong>ONE</strong> class can be declared <code className="text-amber-300">public</code>, and the filename on disk must match that public class name character-for-character.
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-emerald-400 text-lg mb-1">2. Implicit java.lang Import</h3>
            <p>
              The compiler automatically imports <code className="text-amber-300">java.lang.*</code> into every Java file. Core types like <code className="text-emerald-300">String</code>, <code className="text-emerald-300">System</code>, <code className="text-emerald-300">Math</code>, <code className="text-emerald-300">Integer</code>, and <code className="text-emerald-300">Thread</code> are always immediately accessible without an explicit import statement.
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
            Example: Standard Program Structure Architecture
          </h3>
          <JavaFileLoader
            fileModule={structureDemoCode}
            title="StandardProgramStructureDemo.java"
            highlightLines={[1, 3, 4, 11, 14, 17, 20, 24, 30]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Structural Pitfalls & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Package Name Doesn't Match Folder Path</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If your package is <code className="text-amber-300">package com.codernaccotax.banking;</code>, the source file must reside physically in the directory <code className="text-amber-300">com/codernaccotax/banking/</code>. Otherwise, <code className="text-rose-400">javac</code> will throw a package mismatch error.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Explicit Imports Over Wildcard Imports</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Prefer explicit imports (<code className="text-emerald-300">import java.util.List;</code>) over wildcards (<code className="text-amber-300">import java.util.*;</code>) in production codebases to prevent accidental naming collisions (e.g. between <code className="text-amber-300">java.util.Date</code> and <code className="text-amber-300">java.sql.Date</code>).
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
            🤔 <em>“Why does Java prohibit top-level classes from being declared `private` or `protected`?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about scope—who could access a private class that isn't enclosed inside any other class?
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Structure of a Java Program FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 10: Structure of a Java Program"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic10_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Structure is discipline. When your Java source files follow clean, organized layouts—packages first, organized imports, encapsulated fields, constructors, and clear public methods—your code becomes self-documenting and effortless for your team to maintain. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
