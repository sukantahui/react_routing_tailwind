import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import infiniteDemoCode from "./topic8_files/InfiniteLoopsLegitimateAndAccidentalDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowInfinite {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(244, 63, 94, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-inf {
            animation: glowInfinite 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 8
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Infinite Loops (<code className="text-sky-400 font-mono">for(;;)</code>, <code className="text-emerald-400 font-mono">while(true)</code>): Legitimate Patterns &amp; Accidental Traps
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master unconditioned iteration in Java (JLS §14.21): intentional server daemons, event dispatch loops with graceful <code className="text-sky-300 font-mono">break</code> shutdowns, CPU utilization safety, accidental overflow wrap-around traps (byte/short boundaries), and tuition payment gateway listeners in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Intentional Architecture vs. Accidental Bugs
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            An <strong>Infinite Loop</strong> is a loop whose termination condition never evaluates to <code className="text-rose-400 font-mono">false</code>:
          </p>
          <p className="font-mono text-rose-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            while ( true ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;PaymentPayload payload = queue.take(); // Blocks when idle (0% CPU)
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;processUPIPayment(payload);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if ( isShutdownSignalReceived() ) break; // Graceful exit
            <br />
            &#125;
          </p>
          <p>
            <strong>Legitimate Use Cases:</strong> Network servers (<code className="text-sky-300 font-mono">ServerSocket.accept()</code>), background worker daemons, and GUI event queues operate inside intentional infinite loops.
          </p>
          <p>
            <strong>Accidental Traps:</strong> Missing counter increments (<code className="text-slate-300 font-mono">i++</code>), stepping in the wrong direction (<code className="text-rose-300 font-mono">i--</code> in an ascending loop), and numeric overflow (e.g. <code className="text-rose-300 font-mono">byte b = 0; b &lt;= 127; b++</code> where <code className="text-rose-300 font-mono">127 + 1</code> wraps to <code className="text-rose-300 font-mono">-128</code>) create devastating CPU-hanging bugs!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Case Study (Barrackpore Payment Gateway Daemon):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a daemon listener that polls for incoming student tuition payments in Indian Rupees (<code className="text-emerald-400 font-semibold">₹5,000</code>). By embedding an explicit <code className="text-sky-300 font-mono">if (isShutdown) break;</code> condition, <strong>Abhronila</strong> and <strong>Debangshu</strong> allowed the daemon to run persistently while guaranteeing zero runaway CPU freezing across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Intentional Daemon Loop vs. Accidental Infinite Traps
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Contrasting purposeful server daemons against subtle numeric overflow and syntax traps:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Infinite Loops Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradIntentional" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradTrapOverflow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradTrapSyntax" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Intentional Daemon Loop */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradIntentional)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Intentional Daemon</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">while (true) &#123;</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&nbsp;&nbsp;listen();</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">&nbsp;&nbsp;if (done) break; &#125; // Clean!</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Graceful Exit Path
            </text>

            {/* Box 2: Overflow Trap */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradTrapOverflow)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Byte Overflow Trap</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="10" fontFamily="monospace">for (byte b=0; b&lt;=127; b++)</text>
            <text x="335" y="122" fill="#fca5a5" fontSize="10">127 + 1 → -128 (Wraps!)</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">-128 is still &lt;= 127! (Infinite)</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ Numeric Wrap Bug
            </text>

            {/* Box 3: Semicolon / Missing Update */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradTrapSyntax)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Missing Update Trap</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="10" fontFamily="monospace">while (i &lt; 5); // Empty body</text>
            <text x="615" y="122" fill="#fef3c7" fontSize="10">Or missing &apos;i++&apos; in body</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Spins CPU core at 100%!</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ Accidental Freeze
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.21: Intentional infinite loops must provide break/return paths; guard against numeric overflow traps.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Summary of Infinite Loop Patterns &amp; Hazards
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Pattern</th>
                <th className="p-3 font-semibold text-emerald-400">Syntax Example</th>
                <th className="p-3 font-semibold text-amber-400">Classification</th>
                <th className="p-3 font-semibold text-rose-400">Remedy / Best Practice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400 font-bold">Daemon Worker</td>
                <td className="p-3 font-mono text-xs">while (true) &#123; take(); &#125;</td>
                <td className="p-3 text-xs text-emerald-400 font-semibold">✓ Intentional</td>
                <td className="p-3 text-xs">Include graceful `if (shutdown) break;`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">Canonical for(;;)</td>
                <td className="p-3 font-mono text-xs">for (;;) &#123; if (done) break; &#125;</td>
                <td className="p-3 text-xs text-emerald-400 font-semibold">✓ Intentional</td>
                <td className="p-3 text-xs">Clean multi-exit settlement loop</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400 font-bold">Byte Overflow</td>
                <td className="p-3 font-mono text-xs">for (byte b=0; b&lt;=127; b++)</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ Accidental Bug</td>
                <td className="p-3 text-xs">Use `int` counter instead of `byte`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">Floating-Point Check</td>
                <td className="p-3 font-mono text-xs">while (d != 1.0) d += 0.1;</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ Accidental Bug</td>
                <td className="p-3 text-xs">Avoid exact `!=` equality on floating-point</td>
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
            InfiniteLoopsLegitimateAndAccidentalDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates legitimate event daemon loops with internal break, canonical <code className="text-sky-300 font-mono">for (;;)</code> balance settlements, and byte overflow trap prevention in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={infiniteDemoCode}
          title="InfiniteLoopsLegitimateAndAccidentalDemo.java"
          highlightLines={[22, 27, 36, 40, 49, 53]}
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
              <span>❌</span> Pitfall 1: Writing Code After an Unbroken `while (true)`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing statements after <code className="text-rose-300 font-mono">while (true) &#123; ... &#125;</code> without an internal <code className="text-sky-300 font-mono">break</code> causes a compile error (&quot;unreachable statement&quot;).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Block or Sleep Inside Background Polling Loops
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never write a busy-wait <code className="text-rose-300 font-mono">while (true) &#123; &#125;</code> that spins CPU cores at 100%. Use blocking queues (<code className="text-emerald-300 font-mono">queue.take()</code>) or <code className="text-emerald-300 font-mono">Thread.sleep()</code>.
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
            🤔 <em>&ldquo;Why does `for (byte b = 0; b &lt;= 127; b++)` never finish?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> 8-Bit Two&apos;s Complement Wrapping! A signed <code className="text-rose-300 font-mono">byte</code> ranges from <code className="text-slate-300 font-mono">-128</code> to <code className="text-slate-300 font-mono">+127</code>. When <code className="text-rose-300 font-mono">b = 127</code>, executing <code className="text-purple-300 font-mono">b++</code> causes an overflow wrap-around to <code className="text-rose-400 font-mono">-128</code>. Since <code className="text-slate-300 font-mono">-128 &lt;= 127</code> is <code className="text-emerald-400 font-mono">true</code>, the condition can never be false!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Infinite Loops FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 8: Infinite Loops"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic8_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Infinite loops are powerful for servers and daemons when paired with graceful break conditions and blocking queues. Always watch out for byte overflow and missing counter updates! In Topic 9, we explore Loop Counter Manipulation, Accumulators, and Running Sums! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
