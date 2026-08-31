import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import stackDemoCode from "./topic13_files/CallStackAndStackFramesDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowStackFrame {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-sf {
            animation: glowStackFrame 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 13
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            JVM Runtime Memory Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Understanding the Call Stack &amp; Stack Frames in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Deep-dive into the JVM execution engine (JVMS §2.5.2 &amp; §2.6): thread stack allocation, stack frame anatomy (Local Variable Array, Operand Stack, Frame Data), LIFO push/pop mechanics, zero-GC deallocation, and invoice trace inspection in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Architecture of a JVM Stack Frame
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Every active Java thread possesses its own private <strong>JVM Call Stack</strong>. Each time a method is invoked, a new <strong>Stack Frame</strong> is pushed:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Local Variable Array (LVA)</h3>
              <p className="text-sky-300 mb-1">Slots [0..N-1]</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Stores <code className="text-sky-300 font-mono">this</code> (slot 0 for instance methods), formal parameters, and local variables. Primitive <code className="text-sky-300 font-mono">long</code> and <code className="text-sky-300 font-mono">double</code> take 2 slots.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Operand Stack (OS)</h3>
              <p className="text-emerald-300 mb-1">LIFO Bytecode Workspace</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Used by bytecode instructions (<code className="text-emerald-400 font-mono">dadd</code>, <code className="text-emerald-400 font-mono">dmul</code>, <code className="text-emerald-400 font-mono">dload</code>) to push operands, compute arithmetic, and return values.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Frame Data</h3>
              <p className="text-purple-300 mb-1">Constant Pool &amp; Return PC</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Holds references to the runtime Constant Pool, exception dispatch tables, and return address back to the caller.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Programmatic Stack Trace):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (₹20,000 base fee with 10% scholarship) triggered our programmatic inspector <code className="text-emerald-400 font-mono">printActiveStackFrames()</code> from deep inside <code className="text-sky-300 font-mono">applyTax()</code>. The stack snapshot revealed a 4-level deep call chain: <code className="text-emerald-400 font-mono">main() → processStudentFeeInvoice() → applyScholarshipDiscount() → applyTax()</code> computing final tuition in Indian Rupees (<code className="text-emerald-400 font-semibold">₹21,240.00</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The JVM Call Stack &amp; Anatomy of an Active Stack Frame
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing thread stack frame accumulation and internal frame components:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="JVM Call Stack and Frame Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradFrameTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradFrameMid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradFrameBot" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: The Call Stack (LIFO Stack) */}
            <rect x="30" y="30" width="360" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="210" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">JVM CALL STACK (LIFO Thread Stack)</text>

            {/* Frame 3 (Top - Active) */}
            <rect x="45" y="70" width="330" height="35" rx="4" fill="url(#gradFrameTop)" />
            <text x="210" y="92" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">[Frame 3] applyTax() &larr; ACTIVE (Top)</text>

            {/* Frame 2 */}
            <rect x="45" y="110" width="330" height="35" rx="4" fill="url(#gradFrameMid)" />
            <text x="210" y="132" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">[Frame 2] applyScholarshipDiscount()</text>

            {/* Frame 1 */}
            <rect x="45" y="150" width="330" height="35" rx="4" fill="url(#gradFrameMid)" />
            <text x="210" y="172" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">[Frame 1] processStudentFeeInvoice()</text>

            {/* Frame 0 (Bottom) */}
            <rect x="45" y="190" width="330" height="35" rx="4" fill="url(#gradFrameBot)" />
            <text x="210" y="212" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">[Frame 0] main(String[] args) &larr; Root</text>

            {/* Right Panel: Detailed Anatomy Zoom */}
            <rect x="420" y="30" width="430" height="215" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="635" y="55" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">ANATOMY OF ACTIVE FRAME (applyTax)</text>

            {/* Section A: LVA */}
            <rect x="435" y="70" width="400" height="45" rx="4" fill="#082f49" />
            <text x="445" y="88" fill="#38bdf8" fontSize="10" fontWeight="bold">1. Local Variable Array (LVA):</text>
            <text x="445" y="104" fill="#bae6fd" fontSize="9" fontFamily="monospace">Slot 0-1: netAmount (18000.0) | Slot 2-3: gst (3240.0)</text>

            {/* Section B: Operand Stack */}
            <rect x="435" y="120" width="400" height="45" rx="4" fill="#022c22" />
            <text x="445" y="138" fill="#10b981" fontSize="10" fontWeight="bold">2. Operand Stack (OS):</text>
            <text x="445" y="154" fill="#a7f3d0" fontSize="9" fontFamily="monospace">[dload_0] → [dload_2] → [dadd] → [21240.0 ready to return]</text>

            {/* Section C: Frame Data */}
            <rect x="435" y="170" width="400" height="55" rx="4" fill="#2e1065" />
            <text x="445" y="188" fill="#a78bfa" fontSize="10" fontWeight="bold">3. Frame Data &amp; Return Info:</text>
            <text x="445" y="204" fill="#ddd6fe" fontSize="9" fontFamily="monospace">Constant Pool Ref | Return PC: Line 43 in applyDiscount()</text>
            <text x="445" y="218" fill="#c4b5fd" fontSize="8">Instantly popped in O(1) time upon return (Zero GC!)</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JVMS §2.6: Every method invocation allocates a Stack Frame containing Local Variables, an Operand Stack, and Frame Data.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Stack Frame Component Analysis
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Frame Component</th>
                <th className="p-3 font-semibold text-emerald-400">Stored Contents</th>
                <th className="p-3 font-semibold text-purple-400">Slot Size / Rules</th>
                <th className="p-3 font-semibold text-amber-400">Lifecycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Local Variable Array</td>
                <td className="p-3 text-slate-300 font-sans">`this`, parameters, local variables</td>
                <td className="p-3 text-emerald-300 font-sans">32-bit slots (`long`/`double` take 2)</td>
                <td className="p-3 text-slate-300 font-sans">Created on call, destroyed on return</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Operand Stack</td>
                <td className="p-3 text-slate-300 font-sans">Calculation values, arithmetic operands</td>
                <td className="p-3 text-emerald-300 font-sans">LIFO depth fixed at compile time</td>
                <td className="p-3 text-slate-300 font-sans">Pushed and popped during bytecode execution</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Frame Data</td>
                <td className="p-3 text-slate-300 font-sans">Constant pool link, return PC address</td>
                <td className="p-3 text-emerald-300 font-sans">Internal JVM bookkeeping pointers</td>
                <td className="p-3 text-slate-300 font-sans">Guides return and exception handling</td>
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
            CallStackAndStackFramesDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates programmatic stack frame inspection and multi-level invoice fee processing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={stackDemoCode}
          title="CallStackAndStackFramesDemo.java"
          highlightLines={[19, 23, 33, 37, 44, 48, 55, 60, 71]}
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
              <span>❌</span> Pitfall 1: Assuming Local Variables Need Synchronization
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Local variables reside in the private Stack Frame of the executing thread. They are inherently thread-safe and never require synchronization locks!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Programmatic Stack Traces for Auditing &amp; Logging
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Use <code className="text-emerald-400 font-mono">Thread.currentThread().getStackTrace()</code> or modern <code className="text-emerald-400 font-mono">StackWalker</code> (Java 9+) to capture caller class context for security and diagnostics.
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
            🤔 <em>&ldquo;Why does stack memory deallocation never cause Garbage Collection pauses?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Pointer Movement! When a method returns, the JVM simply adjusts the Stack Pointer register back to the caller&apos;s frame. All frame memory is discarded in a single CPU cycle ($O(1)$) without scanning objects!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Call Stack & Stack Frames FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 13: Call Stack & Stack Frames"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic13_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Stack frames are the heartbeat of the JVM execution engine. Every method push is an allocation, and every return is instant deallocation. In Topic 14, we visualize Recursive Execution Trees and Multi-Branch Unwinding! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
