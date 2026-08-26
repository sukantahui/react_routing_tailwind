import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import woraDemoCode from "./topic3_files/WoraDemo.java?raw";
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
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            WORA Architectural Model
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Understanding the "Write Once, Run Anywhere" (WORA) Philosophy
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover how the combination of universal Bytecode (.class) and platform-specific Java Virtual Machines eliminates OS re-compilation and unlocks seamless cross-platform deployment.
        </p>
      </header>

      {/* Section 1: The Portability Crisis */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🌍</span> The Software Portability Problem Solved by Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In the early 1990s, developing software across Windows, Solaris, macOS, and Linux required maintaining separate codebases, compilers, and QA processes. A C/C++ program compiled on Windows produced a machine-specific executable that failed instantly on Linux because operating systems use fundamentally different binary file formats, syscalls, and CPU instruction encodings.
          </p>
          <p>
            Java solved this with a two-tier execution pipeline: <span className="text-amber-300 font-semibold">Source (.java) → Bytecode (.class) → Native Machine Code via JVM</span>.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-indigo-500 text-slate-300">
            <p className="font-medium text-indigo-300 mb-1">Classroom Scenario (Barrackpore Lab):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Debangshu</strong> in our Barrackpore computer lab writes a Java program, compiles it into <code className="text-amber-300">App.class</code>, and uploads it to our cloud server, <strong>Swadeep</strong> in Shyamnagar and <strong>Tuhina</strong> in Ichapur can run that exact file on their Windows, Linux, and Mac machines with zero recompilation!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Comparison */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🔄</span> Architectural Comparison: C/C++ (Native) vs Java (WORA)
        </h2>
        <p className="text-sm text-slate-400">
          Observe how Java inserts the Bytecode and JVM layer to achieve universal portability:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 340"
            className="w-full h-auto"
            aria-label="C++ Native Compilation vs Java WORA Compilation Model"
          >
            {/* Top Lane: C++ Native Compilation */}
            <g>
              <rect x="30" y="30" width="820" height="130" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
              <text x="50" y="55" fill="#f87171" fontWeight="bold" fontSize="13">
                C / C++ Model (Platform-Dependent · Must Recompile per Target)
              </text>

              {/* Source */}
              <rect x="50" y="70" width="130" height="60" rx="8" fill="#334155" />
              <text x="115" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                Source (main.cpp)
              </text>

              {/* Arrows */}
              <path d="M 180 100 L 240 100" stroke="#f87171" strokeWidth="2" />

              {/* Compilers */}
              <rect x="240" y="70" width="140" height="60" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
              <text x="310" y="98" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                OS-Specific Compiler
              </text>
              <text x="310" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">
                (MSVC / GCC / Clang)
              </text>

              {/* Arrow */}
              <path d="M 380 100 L 440 100" stroke="#f87171" strokeWidth="2" />

              {/* Native Binaries */}
              <rect x="440" y="70" width="120" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
              <text x="500" y="98" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">
                Win x86 .exe
              </text>
              <text x="500" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Only runs on Win
              </text>

              <rect x="580" y="70" width="120" height="60" rx="8" fill="#1e1b4b" stroke="#eab308" strokeWidth="1" />
              <text x="640" y="98" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                Linux ELF .bin
              </text>
              <text x="640" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Only runs on Linux
              </text>

              <rect x="720" y="70" width="115" height="60" rx="8" fill="#1e1b4b" stroke="#ec4899" strokeWidth="1" />
              <text x="777" y="98" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">
                macOS Mach-O
              </text>
              <text x="777" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Only runs on Mac
              </text>
            </g>

            {/* Bottom Lane: Java WORA */}
            <g>
              <rect x="30" y="180" width="820" height="135" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
              <text x="50" y="205" fill="#4ade80" fontWeight="bold" fontSize="13">
                Java WORA Model (Universal Bytecode · Single Binary Everywhere)
              </text>

              {/* Source */}
              <rect x="50" y="225" width="130" height="60" rx="8" fill="#334155" />
              <text x="115" y="260" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                Source (App.java)
              </text>

              {/* Arrow */}
              <path d="M 180 255 L 240 255" stroke="#22c55e" strokeWidth="2" />

              {/* Single Compiler */}
              <rect x="240" y="225" width="130" height="60" rx="8" fill="#064e3b" stroke="#22c55e" strokeWidth="1" />
              <text x="305" y="253" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">
                Universal javac
              </text>
              <text x="305" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Single compiler
              </text>

              {/* Arrow */}
              <path d="M 370 255 L 430 255" stroke="#22c55e" strokeWidth="2" />

              {/* Universal Bytecode */}
              <rect x="430" y="225" width="140" height="60" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="500" y="253" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="bold">
                App.class (Bytecode)
              </text>
              <text x="500" y="270" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                0xCAFEBABE Standard
              </text>

              {/* Arrow */}
              <path d="M 570 255 L 630 255" stroke="#22c55e" strokeWidth="2" />

              {/* Execution via Host JVMs */}
              <rect x="630" y="225" width="205" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="732" y="250" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                Native Host JVM
              </text>
              <text x="732" y="270" textAnchor="middle" fill="#4ade80" fontSize="11">
                ✓ Win · Linux · macOS · Cloud
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Takeaways */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔑</span> The Core Axiom of WORA
        </h2>

        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p className="font-semibold text-sky-400 text-lg">
            “Bytecode is platform-independent, but the JVM is platform-dependent.”
          </p>
          <p>
            There is a distinct native JVM executable tailored for each operating system and processor (e.g., Windows x64, Linux ARM64, Apple Silicon M-series). However, every certified JVM reads the exact same bytecode format and executes it with 100% behavioral fidelity.
          </p>
        </div>
      </section>

      {/* Section 4: Hands-on Code with JavaFileLoader */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Source Code
        </h2>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example: Inspecting Host OS Properties in Pure Java
          </h3>
          <JavaFileLoader
            fileModule={woraDemoCode}
            title="WoraDemo.java"
            highlightLines={[8, 9, 10, 11, 14, 15, 16, 17]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls That Break WORA & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Hardcoding OS-Specific Path Separators</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300">String path = "C:\\data\\file.txt"</code> works only on Windows and crashes with <code className="text-rose-400">FileNotFoundException</code> on Linux and macOS. Always use <code className="text-emerald-300">Path.of("data", "file.txt")</code> or <code className="text-emerald-300">File.separator</code>.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Avoid Unportable JNI Calls Unless Strictly Necessary</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Rely on standard Java APIs (<code className="text-amber-300">java.nio</code>, <code className="text-amber-300">java.net</code>, <code className="text-amber-300">java.time</code>) rather than native C/C++ libraries via JNI, ensuring your software remains 100% portable.
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
            🤔 <em>“Why does opening a compiled `.class` file in a text editor show strange characters but always starts with the ASCII sequence `Êþº¾`?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Look at the 4 hexadecimal bytes `0xCAFEBABE` in standard Latin-1 ASCII encoding!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Write Once, Run Anywhere (WORA) FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 3: The WORA Philosophy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic3_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="WORA is what makes Java developers so uniquely valuable. The same application you build on your personal laptop can immediately be deployed into a Docker container on an AWS Linux cluster without modifying a single line of business code. Keep your code portable, clean, and decoupled from the host OS. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
