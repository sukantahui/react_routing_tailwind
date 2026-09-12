import React from "react";
import clsx from "clsx";
import {
  Bot,
  Sparkles,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Server,
  Cpu,
  Zap,
  Layers,
  AlertTriangle
} from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sbufDemoCode from "./topic2_files/StringBufferSynchronizedDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 2
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Synchronized Buffer
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-amber-400 font-mono">java.lang.StringBuffer</code>: Synchronized Thread-Safe String Builder
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore Java's legacy synchronized buffer: testing multi-threaded concurrent appends, monitor locking, and understanding the synchronization performance penalty.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-sky-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Thread Safety &amp; Locking</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              Meet StringBuffer: The Thread-Safe Veteran
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Imagine you have 10 worker threads in a bank application all trying to append log entries into a single shared text buffer at the exact same millisecond.
          If you used <code className="text-emerald-300 font-mono">StringBuilder</code>, race conditions would corrupt your characters or throw an <code className="text-rose-400 font-mono">ArrayIndexOutOfBoundsException</code>.
          This is where <code className="text-amber-300 font-mono">StringBuffer</code> comes in: every public method is guarded by a synchronized lock, guaranteeing thread safety.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <AlertCircle size={16} />
              <span>Race Conditions Prevented</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Without synchronization, concurrent thread writes will overlap on internal buffer indices. <code className="text-amber-300">StringBuffer</code> forces threads to queue up in orderly line.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Lightbulb size={16} />
              <span>Bank Teller Analogy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Think of a single bank teller counter with a token display: only one customer can speak with the teller at a time. Other customers must wait outside until the lock is released!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 size={16} />
              <span>Assistant Rule of Thumb</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Only choose <code className="text-amber-300">StringBuffer</code> when a single buffer instance is shared across multiple concurrent threads. For single-threaded tasks, use <code className="text-emerald-300">StringBuilder</code>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-amber-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Key Concepts You Need to Remember:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><strong>Synchronized Methods:</strong> Methods like <code className="text-amber-300">synchronized StringBuffer append(...)</code> acquire the object's intrinsic monitor lock automatically.</li>
            <li><strong>Thread-Safe but Slower:</strong> The locking overhead makes it roughly 2x to 3x slower in single-threaded code compared to <code className="text-emerald-300">StringBuilder</code>.</li>
            <li><strong>Legacy Presence:</strong> Introduced in Java 1.0; still prevalent in legacy enterprise codebases, older libraries, and specific multi-threaded shared buffer architectures.</li>
          </ul>
        </div>
      </section>

      {/* ================= COMPREHENSIVE THREAD-SAFE DEFINITION & USE-CASES SECTION ================= */}
      <section className="space-y-8 bg-slate-800/20 border border-slate-700/60 rounded-2xl p-6 md:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/50 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <ShieldCheck size={14} /> Core Architectural Definition
              </span>
              <span className="text-xs text-slate-500">• Multi-Threading &amp; Concurrency</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>What is &quot;Thread-Safe&quot; and Where is It Used?</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400">
              A definitive breakdown of concurrency safety, race conditions, real-world enterprise architectures, and Java implementations.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-900/80 rounded-xl border border-slate-700/70 text-xs font-mono text-amber-300">
            <Lock size={14} className="text-amber-400" />
            <span>Thread Safety Guaranteed</span>
          </div>
        </div>

        {/* Core Definition Box */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-6 space-y-4">
          <div className="flex items-center gap-3 text-amber-300 font-semibold text-base md:text-lg">
            <ShieldCheck size={22} className="text-amber-400 shrink-0" />
            <span>The Formal Definition of &quot;Thread-Safe&quot;</span>
          </div>
          <blockquote className="border-l-4 border-amber-500/60 pl-4 py-1 text-slate-200 text-sm md:text-base italic leading-relaxed bg-slate-900/50 rounded-r-lg">
            &quot;A class, method, or data structure is <strong>Thread-Safe</strong> if it functions correctly and maintains its internal state consistency when accessed and modified concurrently by multiple threads at the same time, without requiring the calling code to provide additional synchronization.&quot;
            <span className="block mt-1 text-xs text-slate-400 not-italic font-sans">
              — Standard definition synthesized from <em>Java Concurrency in Practice</em> (Brian Goetz)
            </span>
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs md:text-sm text-slate-300">
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="font-semibold text-rose-400 block mb-1">What Happens When NOT Thread-Safe?</span>
              Threads interleave unpredictably. Two threads read the same index simultaneously, overwrite each other's data (Lost Updates), corrupt internal counters, or throw unexpected runtime exceptions.
            </div>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-1">What Guarantees Thread-Safety?</span>
              Mutual exclusion via locks (<code className="text-amber-300 font-mono">synchronized</code>), lock-free hardware atomics (CAS), or complete <strong>Immutability</strong> (like <code className="text-sky-300 font-mono">String</code>) where data can never change.
            </div>
          </div>
        </div>

        {/* Where is Thread-Safety Used (4 Real-World Cards) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-300">
            <Server size={16} className="text-sky-400" />
            <span>Where is Thread-Safety Used in Real-World Systems?</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Banking */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <span>🏦</span>
                <span>Banking &amp; Transactions</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                When two ATM withdrawals or UPI debit requests hit the same bank account at the exact same millisecond. Thread-safe synchronization ensures balance updates are serialized and never double-debited.
              </p>
            </div>

            {/* Card 2: Web Servers */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                <span>🌐</span>
                <span>Web Servlets &amp; APIs</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Spring Boot and Tomcat allocate a distinct thread per incoming HTTP request. Shared singleton services, in-memory caches, and active user counters must be thread-safe to avoid cross-request data leaks.
              </p>
            </div>

            {/* Card 3: E-Commerce Inventory */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <span>📦</span>
                <span>Flash Sales &amp; Inventory</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                During flash sales (e.g. Amazon Great Indian Festival), 10,000 customers try to purchase the last available phone. Thread-safe atomic decrements guarantee the stock counter never falls below zero (no overselling).
              </p>
            </div>

            {/* Card 4: Logging */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                <span>📋</span>
                <span>Centralized Logging</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dozens of background worker threads all writing trace messages to the same log file or shared buffer simultaneously. Thread-safety ensures lines do not interleave into gibberish characters.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Comparison: What Happens Under the Hood */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-300">
            <Cpu size={16} className="text-amber-400" />
            <span>Under the Hood: Non-Thread-Safe vs. Thread-Safe Execution</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Non-Thread-Safe (StringBuilder) */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle size={15} /> Non-Thread-Safe (StringBuilder)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  Zero Locks · Unsynchronized
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
                <div className="text-slate-500">// 2 threads append concurrently to same buffer</div>
                <div className="text-rose-300">Thread A: reads count = 5</div>
                <div className="text-rose-300">Thread B: reads count = 5 (Race Condition!)</div>
                <div className="text-rose-300">Thread A: writes 'X' at value[5], count becomes 6</div>
                <div className="text-rose-400 font-bold">Thread B: writes 'Y' at value[5] (OVERWRITING 'X'!)</div>
                <div className="text-rose-500 font-semibold">❌ Result: Lost Data or IndexOutOfBoundsException</div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Super fast for single-threaded methods because the CPU avoids acquiring monitor locks, but dangerous if shared across threads.
              </p>
            </div>

            {/* Thread-Safe (StringBuffer) */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldCheck size={15} /> Thread-Safe (StringBuffer)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Intrinsic Monitor Lock
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
                <div className="text-slate-500">// synchronized append(char c)</div>
                <div className="text-emerald-300">Thread A: acquires monitor lock (monitorenter)</div>
                <div className="text-amber-300">Thread B: attempts append -&gt; BLOCKED &amp; WAITS</div>
                <div className="text-emerald-300">Thread A: writes 'X' at value[5], count=6, releases lock</div>
                <div className="text-emerald-300">Thread B: wakes up, acquires lock, writes 'Y' at value[6]</div>
                <div className="text-emerald-400 font-semibold">✅ Result: Both 'X' and 'Y' preserved safely</div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Guarantees complete thread safety, but introduces lock acquisition overhead and CPU thread context switching.
              </p>
            </div>
          </div>
        </div>

        {/* Java Thread-Safety Comparison Matrix */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-300">
            <Layers size={16} className="text-sky-400" />
            <span>Java Standard Library: Thread-Safe vs. Non-Thread-Safe Matrix</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-900 text-slate-400 font-mono text-xs uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Category</th>
                  <th className="p-3">Thread-Safe Implementation</th>
                  <th className="p-3">Non-Thread-Safe (Faster)</th>
                  <th className="p-3">Thread-Safety Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Text Buffers</td>
                  <td className="p-3 text-amber-300 font-mono">StringBuffer</td>
                  <td className="p-3 text-emerald-300 font-mono">StringBuilder</td>
                  <td className="p-3 text-slate-400">Synchronized methods (monitor lock)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Immutable Strings</td>
                  <td className="p-3 text-sky-300 font-mono">String</td>
                  <td className="p-3 text-slate-500 italic">— None needed —</td>
                  <td className="p-3 text-slate-400">100% Immutable (state cannot mutate)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Key-Value Maps</td>
                  <td className="p-3 text-amber-300 font-mono">ConcurrentHashMap</td>
                  <td className="p-3 text-emerald-300 font-mono">HashMap</td>
                  <td className="p-3 text-slate-400">Bucket-level locks &amp; CAS</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Dynamic Lists</td>
                  <td className="p-3 text-amber-300 font-mono">CopyOnWriteArrayList / Vector</td>
                  <td className="p-3 text-emerald-300 font-mono">ArrayList</td>
                  <td className="p-3 text-slate-400">Copy-on-write / synchronized methods</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Integer Counters</td>
                  <td className="p-3 text-amber-300 font-mono">AtomicInteger / LongAdder</td>
                  <td className="p-3 text-emerald-300 font-mono">int count++</td>
                  <td className="p-3 text-slate-400">Hardware atomic CAS (Compare-And-Swap)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* When NOT to use Thread-Safe classes */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-amber-400 flex items-center gap-1.5">
            <Zap size={15} />
            <span>The Developer's Golden Rule: When Should You NOT Use Thread-Safe Classes?</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Thread-safety is <strong>NOT free</strong>. Acquiring and releasing monitor locks consumes CPU cycles and slows down your code by 2x to 3x.
            In 99% of regular application code, string buffers are created as <strong>local variables inside a method</strong>:
          </p>
          <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
            <div className="text-slate-500">// Local variable: Stored on the thread's private stack!</div>
            <div>public String generateReport() &#123;</div>
            <div className="pl-4 text-emerald-300">StringBuilder sb = new StringBuilder(); // ✅ Correct &amp; ultra-fast!</div>
            <div className="pl-4">sb.append(&quot;Report ID: &quot;).append(101);</div>
            <div className="pl-4">return sb.toString();</div>
            <div>&#125;</div>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Because local variables live exclusively on that specific thread's private stack, <strong>no other thread can ever touch it</strong>!
            Using <code className="text-amber-300 font-mono">StringBuffer</code> here is a wasteful anti-pattern because you are locking against nobody!
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sbufDemoCode}
          title="StringBufferSynchronizedDemo.java"
          highlightLines={[7, 15, 18, 22, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="StringBuffer FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 2: StringBuffer Synchronization"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic2_stringbuffer_note.txt"
        />
      </section>

      <Teacher
        note="StringBuffer was created in Java 1.0 back when computers only had single CPU cores. Today, we use StringBuilder 99.9% of the time, and only touch StringBuffer for legacy multithreaded code. — Sukanta Hui"
      />
    </div>
  );
}