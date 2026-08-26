import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import resourceDemoCode from "./topic18_files/ScannerResourceManagementDemo.java?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions";

export default function Topic18() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shieldPulse {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-shield-pulse {
            animation: shieldPulse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 18 (Capstone Topic)
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Closing Scanner Resources &amp; Avoiding Operating System Leaks
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master resource lifecycle management in Java: the <code className="text-emerald-300 font-mono">AutoCloseable</code> interface, automatic resource cleanup via Try-With-Resources (Java 7+), preventing OS file descriptor leaks, and navigating the critical <code className="text-amber-300 font-mono">System.in</code> lifecycle rule in student fee audit applications.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Importance of Resource Management in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Operating systems allocate finite resources (file descriptors, sockets, native buffers) to every running Java process. When a program creates a <code className="text-sky-300 font-mono">Scanner</code> over disk files or network channels and neglects to close it, those operating system handles remain locked indefinitely, eventually triggering catastrophic <strong>&quot;Too many open files&quot;</strong> crashes.
          </p>
          <p>
            Java 7 solved this through the <strong>Try-With-Resources</strong> statement (<code className="text-emerald-300 font-mono">try (Scanner sc = ...) &#123; &#125;</code>), which automatically invokes <code className="text-emerald-400 font-mono">close()</code> at block exit. However, developers must understand the crucial caveat: <strong>never close a Scanner wrapping <code className="text-amber-300 font-mono">System.in</code> inside helper methods</strong>, as doing so closes keyboard input globally for the entire JVM!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Audit Service):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> developed a financial tuition audit daemon that processes transaction logs in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) for vocational centers in Naihati and Shyamnagar. By using Try-With-Resources for file streams while managing a singleton shared console reader, their server operated 24/7 with zero resource exhaustion.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Resource Lifecycle Architecture: Files vs <code className="text-amber-300">System.in</code>
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing the automatic cleanup of disk file descriptors versus the global lifetime of the standard console stream:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 280"
            className="w-full h-auto"
            aria-label="Scanner Resource Lifecycle Diagram"
          >
            <defs>
              <linearGradient id="gradAuto" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradWarn" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Left Box: File Stream Auto-Close */}
            <rect x="30" y="40" width="395" height="190" rx="12" fill="url(#gradAuto)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="227" y="70" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              1. Disk Files &amp; Streams: ALWAYS CLOSE
            </text>
            <rect x="50" y="85" width="355" height="60" rx="8" fill="#064e3b" />
            <text x="60" y="110" fill="#a7f3d0" fontSize="11" fontFamily="monospace">
              try (Scanner sc = new Scanner(file)) &#123;
            </text>
            <text x="60" y="130" fill="#a7f3d0" fontSize="11" fontFamily="monospace">
              &#125; // sc.close() executed automatically!
            </text>
            <text x="227" y="175" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Releases OS file descriptors &amp; locks
            </text>
            <text x="227" y="195" fill="#d1fae5" fontSize="10" textAnchor="middle">
              Prevents &quot;Too many open files&quot; operating system crashes
            </text>

            {/* Right Box: System.in Global Rule */}
            <rect x="455" y="40" width="395" height="190" rx="12" fill="url(#gradWarn)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="652" y="70" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              2. System.in Console: DO NOT CLOSE IN HELPERS
            </text>
            <rect x="475" y="85" width="355" height="60" rx="8" fill="#451a03" />
            <text x="485" y="110" fill="#fde68a" fontSize="11" fontFamily="monospace">
              // Scanner(System.in).close() terminates
            </text>
            <text x="485" y="130" fill="#fca5a5" fontSize="11" fontFamily="monospace">
              // System.in globally for the entire JVM!
            </text>
            <text x="652" y="175" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ Keep a single shared console Scanner
            </text>
            <text x="652" y="195" fill="#fed7aa" fontSize="10" textAnchor="middle">
              Pass shared Scanner to helpers; close only at final app shutdown
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Standard Architecture: Try-With-Resources for Files | Singleton / Shared Passing for System.in
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Resource Targets &amp; Lifecycle Policies
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Resource Type</th>
                <th className="p-3 font-semibold text-emerald-400">Recommended Close Pattern</th>
                <th className="p-3 font-semibold text-amber-400">OS Resource Involved</th>
                <th className="p-3 font-semibold text-slate-400">Impact of Missing Close</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Disk Files</td>
                <td className="p-3 font-mono text-emerald-400">try (Scanner sc = new Scanner(file))</td>
                <td className="p-3 text-xs">OS File Descriptor &amp; File Lock</td>
                <td className="p-3 text-xs text-rose-300">File locking on Windows, descriptor exhaustion</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Network Sockets</td>
                <td className="p-3 font-mono text-emerald-400">try (Scanner sc = new Scanner(socket.in))</td>
                <td className="p-3 text-xs">Socket Descriptor &amp; TCP Port</td>
                <td className="p-3 text-xs text-rose-300">Socket connection remains open, port exhaustion</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">System.in (Console)</td>
                <td className="p-3 font-mono text-emerald-400">Shared Singleton / App Exit</td>
                <td className="p-3 text-xs">Standard Input Keyboard Pipe</td>
                <td className="p-3 text-xs text-amber-300">Closing it breaks all subsequent console reading</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">In-Memory Strings</td>
                <td className="p-3 font-mono text-emerald-400">Try-With-Resources or GC</td>
                <td className="p-3 text-xs">JVM Heap Memory Only</td>
                <td className="p-3 text-xs text-slate-400">No OS handles; reclaimed automatically by GC</td>
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
            ScannerResourceManagementDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates automatic resource management via Try-With-Resources for student tuition audit records in Indian Rupees (₹), and demonstrates the shared console reader pattern.
        </p>

        <JavaFileLoader
          fileModule={resourceDemoCode}
          title="ScannerResourceManagementDemo.java"
          highlightLines={[22, 23, 24, 25, 26, 32, 45, 46, 48, 51, 56, 57, 58]}
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
              <span>❌</span> Pitfall 1: Closing Scanner(System.in) in Transient Functions
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If a helper function opens and closes a <code className="text-rose-300 font-mono">Scanner(System.in)</code>, any subsequent attempt to read from the console elsewhere in the program will throw <code className="text-rose-400 font-mono">IllegalStateException</code> or <code className="text-rose-400 font-mono">NoSuchElementException</code> because <code className="text-amber-300 font-mono">System.in</code> is dead.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Pass a shared <code className="bg-slate-900 px-1 py-0.5 rounded">Scanner</code> instance into functions as a method parameter.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Always Use Try-With-Resources for File I/O
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never rely on the Garbage Collector or legacy <code className="text-slate-400 font-mono">finally</code> blocks to close disk files. Try-With-Resources guarantees that file descriptors are freed immediately even when unchecked runtime exceptions occur.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Clean Code Idiom:</strong> <code className="bg-slate-900 px-1 py-0.5 rounded">try (Scanner sc = new Scanner(file)) &#123; ... &#125;</code>.
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
            🤔 <em>&ldquo;Why can the Garbage Collector reclaim JVM memory objects automatically, but cannot reliably release native operating system file descriptors?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The JVM Garbage Collector only monitors heap memory pressure. It is completely unaware of external operating system descriptor limits! An unclosed file scanner holding just a few bytes of Java heap memory can keep an entire OS file descriptor locked until the OS table is exhausted!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Scanner Resource Management FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 18: Scanner Resource Management & Leaks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic18_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="Heartiest congratulations to Swadeep, Tuhina, Abhronila, and Debangshu! Completing Topic 18 marks the 100% completion of Module 001_002 (Java Syntax, Variables, Literals, Data Types & Console Input). You now possess an industrial-grade foundation in lexical rules, numeric precision, ASCII/Unicode representation, immutability, and resource management. We are now ready to advance to Module 001_003: Operators, Expressions, and Type Casting! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
