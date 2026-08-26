import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jvmDemoCode from "./topic6_files/JvmAnatomyDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
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
            Module 001_001 · Topic 6
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            JVM Internal Engine
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Anatomy of the Java Virtual Machine (JVM Architecture)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Look under the hood of the JVM: inspect the ClassLoader Subsystem (Loading, Linking, Initialization), Runtime Memory Areas (Heap, Stack, Metaspace, PC Register), and the Execution Engine (JIT Compiler and Garbage Collection).
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🧠</span> The Three Architectural Pillars of the JVM
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The JVM is divided into three major functional subsystems:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>ClassLoader Subsystem:</strong> Loads .class files from disk/network, verifies bytecode safety, allocates static memory, and executes static initialization.</li>
            <li><strong>Runtime Data Areas:</strong> Partitions memory into shared zones (Heap, Metaspace) and per-thread isolated zones (Stack Frames, PC Registers, Native Stacks).</li>
            <li><strong>Execution Engine:</strong> Translates bytecode into native CPU instructions using the Interpreter and JIT Compilers (C1/C2), and continuously reclaims unreferenced heap memory via the Garbage Collector.</li>
          </ol>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-indigo-500 text-slate-300">
            <p className="font-medium text-indigo-300 mb-1">Classroom Scenario (Barrackpore to Shyamnagar):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep</strong> in Barrackpore executes a function, the JVM creates a new <strong>Stack Frame</strong> on his thread's private stack to hold local variables. When he instantiates <code className="text-amber-300">new Student("Swadeep")</code>, the object is placed in the global <strong>Heap</strong> where <strong>Debangshu</strong>'s thread in Shyamnagar can safely read it if shared!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🗺️</span> Full JVM Architectural Blueprint
        </h2>
        <p className="text-sm text-slate-400">
          Trace how .class files flow from the ClassLoader through Runtime Memory into the Execution Engine:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 460"
            className="w-full h-auto"
            aria-label="Comprehensive JVM Architecture Diagram"
          >
            {/* Top Block: ClassLoader Subsystem */}
            <g className="transition-all duration-300 hover:opacity-95">
              <rect x="40" y="20" width="800" height="95" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="60" y="45" fill="#a5b4fc" fontWeight="bold" fontSize="14">
                1. ClassLoader Subsystem (Loading · Linking · Initialization)
              </text>

              {/* Sub-phases */}
              <rect x="60" y="55" width="220" height="45" rx="6" fill="#312e81" />
              <text x="170" y="75" textAnchor="middle" fill="#e0e7ff" fontWeight="bold" fontSize="11">
                Loading (ClassLoaders)
              </text>
              <text x="170" y="90" textAnchor="middle" fill="#c7d2fe" fontSize="10">
                Bootstrap → Platform → App
              </text>

              <rect x="300" y="55" width="260" height="45" rx="6" fill="#312e81" />
              <text x="430" y="75" textAnchor="middle" fill="#e0e7ff" fontWeight="bold" fontSize="11">
                Linking (Verification · Preparation · Resolution)
              </text>
              <text x="430" y="90" textAnchor="middle" fill="#c7d2fe" fontSize="10">
                Bytecode Verifier & Default Values
              </text>

              <rect x="580" y="55" width="240" height="45" rx="6" fill="#312e81" />
              <text x="700" y="75" textAnchor="middle" fill="#e0e7ff" fontWeight="bold" fontSize="11">
                Initialization (&lt;clinit&gt;)
              </text>
              <text x="700" y="90" textAnchor="middle" fill="#c7d2fe" fontSize="10">
                Static Blocks & Static Variables
              </text>
            </g>

            {/* Connecting Arrow */}
            <line x1="440" y1="115" x2="440" y2="135" stroke="#818cf8" strokeWidth="2" strokeDasharray="3" />

            {/* Middle Block: Runtime Data Areas */}
            <g className="transition-all duration-300 hover:opacity-95">
              <rect x="40" y="135" width="800" height="175" rx="10" fill="#042f2e" stroke="#2dd4bf" strokeWidth="1.5" />
              <text x="60" y="160" fill="#5eead4" fontWeight="bold" fontSize="14">
                2. Runtime Data Areas (JVM Memory Architecture)
              </text>

              {/* Shared Memory Zone */}
              <rect x="60" y="175" width="370" height="120" rx="8" fill="#134e4a" stroke="#14b8a6" strokeWidth="1" />
              <text x="80" y="195" fill="#ccfbf1" fontWeight="bold" fontSize="12">
                Shared Memory (All Threads)
              </text>

              <rect x="75" y="210" width="165" height="70" rx="6" fill="#0f766e" />
              <text x="157" y="235" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                Heap Memory
              </text>
              <text x="157" y="255" textAnchor="middle" fill="#99f6e4" fontSize="10">
                Eden · S0/S1 · Old Gen
              </text>
              <text x="157" y="270" textAnchor="middle" fill="#ccfbf1" fontSize="9">
                All Objects & Arrays
              </text>

              <rect x="250" y="210" width="165" height="70" rx="6" fill="#0f766e" />
              <text x="332" y="235" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                Metaspace
              </text>
              <text x="332" y="255" textAnchor="middle" fill="#99f6e4" fontSize="10">
                Off-Heap Native Memory
              </text>
              <text x="332" y="270" textAnchor="middle" fill="#ccfbf1" fontSize="9">
                Class Metadata & Statics
              </text>

              {/* Per-Thread Private Zone */}
              <rect x="450" y="175" width="370" height="120" rx="8" fill="#134e4a" stroke="#14b8a6" strokeWidth="1" />
              <text x="470" y="195" fill="#ccfbf1" fontWeight="bold" fontSize="12">
                Thread-Private Memory (Per Active Thread)
              </text>

              <rect x="465" y="210" width="110" height="70" rx="6" fill="#0f766e" />
              <text x="520" y="235" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                Java Stack
              </text>
              <text x="520" y="255" textAnchor="middle" fill="#99f6e4" fontSize="9">
                Stack Frames
              </text>
              <text x="520" y="270" textAnchor="middle" fill="#ccfbf1" fontSize="8">
                LVT & Operand Stack
              </text>

              <rect x="585" y="210" width="110" height="70" rx="6" fill="#0f766e" />
              <text x="640" y="235" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                PC Register
              </text>
              <text x="640" y="255" textAnchor="middle" fill="#99f6e4" fontSize="9">
                Instruction Ptr
              </text>
              <text x="640" y="270" textAnchor="middle" fill="#ccfbf1" fontSize="8">
                Current Opcode Addr
              </text>

              <rect x="705" y="210" width="105" height="70" rx="6" fill="#0f766e" />
              <text x="757" y="235" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                Native Stack
              </text>
              <text x="757" y="255" textAnchor="middle" fill="#99f6e4" fontSize="9">
                C / C++ Frames
              </text>
              <text x="757" y="270" textAnchor="middle" fill="#ccfbf1" fontSize="8">
                JNI Invocations
              </text>
            </g>

            {/* Connecting Arrow */}
            <line x1="440" y1="310" x2="440" y2="330" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="3" />

            {/* Bottom Block: Execution Engine */}
            <g className="transition-all duration-300 hover:opacity-95">
              <rect x="40" y="330" width="800" height="110" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="60" y="355" fill="#fbbf24" fontWeight="bold" fontSize="14">
                3. Execution Engine & Native Bridges
              </text>

              <rect x="60" y="365" width="170" height="60" rx="6" fill="#334155" />
              <text x="145" y="390" textAnchor="middle" fill="#fef08a" fontWeight="bold" fontSize="12">
                Interpreter
              </text>
              <text x="145" y="410" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                Line-by-line Opcode Exec
              </text>

              <rect x="245" y="365" width="220" height="60" rx="6" fill="#334155" />
              <text x="355" y="390" textAnchor="middle" fill="#fef08a" fontWeight="bold" fontSize="12">
                JIT Compiler (C1 / C2)
              </text>
              <text x="355" y="410" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                Hotspot Native Compilation
              </text>

              <rect x="480" y="365" width="180" height="60" rx="6" fill="#334155" />
              <text x="570" y="390" textAnchor="middle" fill="#fef08a" fontWeight="bold" fontSize="12">
                Garbage Collector
              </text>
              <text x="570" y="410" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                G1 GC · ZGC · Shenandoah
              </text>

              <rect x="675" y="365" width="145" height="60" rx="6" fill="#334155" />
              <text x="747" y="390" textAnchor="middle" fill="#fef08a" fontWeight="bold" fontSize="12">
                JNI / Native Libs
              </text>
              <text x="747" y="410" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                C/C++ OS Interop (.dll/.so)
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>⚙️</span> Memory Area Rules to Remember
        </h2>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-teal-400 text-lg mb-1">1. Stack vs Heap Object Allocation</h3>
            <p>
              Local primitive variables (<code className="text-amber-300">int x = 10;</code>) live on the thread's private <strong>Stack Frame</strong> and vanish automatically when the method finishes. Objects instantiated with <code className="text-amber-300">new</code> always reside in the shared <strong>Heap</strong> and remain there until the Garbage Collector proves they are no longer reachable from any active GC Root.
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-amber-400 text-lg mb-1">2. Tiered JIT Compilation (Interpreter + C1 + C2)</h3>
            <p>
              The JVM does not wait to compile your entire application before starting. It launches instantly via the <strong>Interpreter</strong>. As methods repeat (passing invocation thresholds), the <strong>C1 (Client)</strong> compiler compiles them with fast optimizations. If methods continue to execute heavily, the <strong>C2 (Server)</strong> compiler optimizes them aggressively into native machine code.
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
            Example: Inspecting ClassLoaders and Memory Allocation
          </h3>
          <JavaFileLoader
            fileModule={jvmDemoCode}
            title="JvmAnatomyDemo.java"
            highlightLines={[8, 14, 17, 20, 21, 23, 24]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Memory Pitfalls & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Confusing StackOverflowError with OutOfMemoryError</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A <code className="text-rose-400">StackOverflowError</code> is caused by infinite method recursion filling the private Thread Stack. An <code className="text-rose-400">OutOfMemoryError: Java heap space</code> is caused by accumulating too many live, uncollected objects in the shared Heap.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Match -Xms and -Xmx in Production</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              In production server environments, setting <code className="text-amber-300">-Xms</code> equal to <code className="text-amber-300">-Xmx</code> (e.g. <code className="text-emerald-300">-Xms4g -Xmx4g</code>) avoids runtime garbage collection pauses triggered when the JVM expands the heap dynamically.
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
            🤔 <em>“If a method creates a local variable `int x = 10;`, why does it not need Garbage Collection when the method finishes?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about what happens to the entire Stack Frame when the method's `return` opcode executes!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="JVM Architecture & Anatomy FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 6: Anatomy of the JVM"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic6_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Always visualize the memory map when debugging Java: Primitives in methods are on the Stack, Objects are in the Heap, Classes and static constants are in Metaspace. Once this mental picture becomes second nature, you will write cleaner, high-performance code with zero memory leaks. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
