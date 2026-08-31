import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import passDemoCode from "./topic10_files/PassingAndReturningArraysDemo.java?raw";
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
          @keyframes glowMethods {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-me {
            animation: glowMethods 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Passing &amp; Returning Arrays in Java Methods
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master pass-by-value reference mechanics in Java (JLS §8.4): in-place element mutation across stack frames, parameter reassignment isolation, factory methods returning newly allocated arrays, returning empty arrays (<code className="text-emerald-400 font-mono">new int[0]</code>) vs <code className="text-rose-400 font-mono">null</code>, and student discount processing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Pass-by-Value Reference Semantics
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java is strictly <strong>Pass-by-Value</strong>. When an array is passed into a method:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
            <li>
              <strong className="text-emerald-300 font-mono">In-Place Mutation:</strong> The reference pointer value is copied onto the method&apos;s stack frame. Mutating <code className="text-emerald-300 font-mono">fees[i] -= 1500.0;</code> modifies the shared Heap array object directly!
            </li>
            <li>
              <strong className="text-rose-300 font-mono">Reassignment Isolation:</strong> Reassigning the parameter variable (<code className="text-rose-300 font-mono">fees = new double[10];</code>) only changes the local copy on that stack frame; the caller&apos;s variable remains completely unchanged.
            </li>
            <li>
              <strong className="text-purple-300 font-mono">Returning Arrays:</strong> Factory methods can allocate and return new arrays (<code className="text-purple-300 font-mono">return new double[n];</code>). Always return <code className="text-emerald-400 font-mono">new int[0]</code> instead of <code className="text-rose-400 font-mono">null</code>!
            </li>
          </ul>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Fee Discount &amp; Bonus Distribution):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> passed batch fee arrays to <code className="text-emerald-400 font-mono">applyInstitutionalDiscount()</code>, deducting ₹1,500 in Indian Rupees across all accounts. When generating festival bonuses, the factory method returned newly allocated bonus arrays directly across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Stack Frame Pointer Passing &amp; Heap In-Place Mutation
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How stack frame parameter copying operates with shared heap array objects:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Passing and Returning Arrays Diagram"
          >
            <defs>
              <linearGradient id="gradCallerStack" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradSharedHeap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradMethodStack" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Caller Stack Frame */}
            <rect x="30" y="40" width="240" height="180" rx="10" fill="url(#gradCallerStack)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="150" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">CALLER STACK (main)</text>
            <rect x="45" y="80" width="210" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">batchFees: 0x90A1</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="10">Passes pointer to method</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Retains original reference</text>
            <text x="150" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Caller Reference Pointer
            </text>

            {/* Box 2: Shared Heap Object */}
            <rect x="290" y="40" width="300" height="180" rx="10" fill="url(#gradSharedHeap)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">HEAP ARRAY OBJECT (0x90A1)</text>
            <rect x="305" y="80" width="270" height="80" rx="6" fill="#022c22" />
            <text x="315" y="100" fill="#fde68a" fontSize="10" fontFamily="monospace">Header: 16B | length = 4</text>
            <text x="315" y="120" fill="#a7f3d0" fontSize="10" fontFamily="monospace">[0] ₹10,500 (Discounted!)</text>
            <text x="315" y="140" fill="#a7f3d0" fontSize="10" fontFamily="monospace">[1] ₹13,500 | [2] ₹16,500</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              In-Place Mutated Payload
            </text>

            {/* Box 3: Method Stack Frame */}
            <rect x="610" y="40" width="240" height="180" rx="10" fill="url(#gradMethodStack)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="730" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">METHOD STACK FRAME</text>
            <rect x="625" y="80" width="210" height="80" rx="6" fill="#2e1065" />
            <text x="635" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">fees: 0x90A1 (Copied!)</text>
            <text x="635" y="122" fill="#ddd6fe" fontSize="10">Mutates fees[i] on Heap</text>
            <text x="635" y="142" fill="#fca5a5" fontSize="10">Reassigning fees = new... isolated</text>
            <text x="730" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Copied Pointer Value
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §8.4: Passing array reference values allows methods to mutate caller Heap elements in-place.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Array Parameter Operations &amp; Caller Impact
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Method Action</th>
                <th className="p-3 font-semibold text-purple-400">Code Syntax</th>
                <th className="p-3 font-semibold text-emerald-400">Effect on Caller&apos;s Array</th>
                <th className="p-3 font-semibold text-amber-400">Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Element Mutation</td>
                <td className="p-3 text-slate-300">`arr[0] = 99;`</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Caller sees 99</td>
                <td className="p-3 text-slate-400">Direct write to shared Heap memory</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-300 font-bold">Parameter Reassignment</td>
                <td className="p-3 text-slate-300">`arr = new int[5];`</td>
                <td className="p-3 text-rose-400 font-bold">❌ Caller UNAFFECTED</td>
                <td className="p-3 text-slate-400">Mutates local stack copy only</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-300 font-bold">In-Place Sorting</td>
                <td className="p-3 text-slate-300">`Arrays.sort(arr);`</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Caller sees sorted array</td>
                <td className="p-3 text-slate-400">In-place Heap rearrangement</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-300 font-bold">Factory Creation</td>
                <td className="p-3 text-slate-300">`return new double[n];`</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Caller receives new array</td>
                <td className="p-3 text-slate-400">Allocates new object on Heap</td>
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
            PassingAndReturningArraysDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates in-place element discount mutation, parameter reassignment immunity, and factory array return methods in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={passDemoCode}
          title="PassingAndReturningArraysDemo.java"
          highlightLines={[19, 20, 21, 29, 36, 37, 38, 51, 57, 63]}
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
              <span>❌</span> Pitfall 1: Returning `null` from Array Methods (Effective Java Item 54)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Returning <code className="text-rose-300 font-mono">null</code> when no data exists forces callers to write repetitive null checks or suffer <code className="text-rose-400 font-mono">NullPointerException</code>. Always return <code className="text-emerald-400 font-mono">new int[0]</code> instead!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Defensive Copying to Protect Encapsulation
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When returning a private array field from a class getter, return a clone (<code className="text-emerald-400 font-mono">return scores.clone();</code>) so external callers cannot mutate your internal state.
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
            🤔 <em>&ldquo;Why does `swap(int a, int b)` fail to swap numbers, but `swap(int[] arr, int i, int j)` succeeds?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Primitive Values vs Memory Indices! In <code className="text-rose-300 font-mono">swap(x, y)</code>, primitive integers are copied onto the method stack; modifying them only alters the local copies. In <code className="text-emerald-400 font-bold">swap(arr, i, j)</code>, the shared heap memory addresses <code className="text-sky-300 font-mono">arr[i]</code> and <code className="text-sky-300 font-mono">arr[j]</code> are directly mutated!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Passing & Returning Arrays FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 10: Passing & Returning Arrays in Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic10_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Passing arrays to methods allows powerful in-place mutations like sorting and discounting without memory reallocations. Remember Effective Java Item 54: Always return empty arrays (new int[0]) instead of null! In Topic 11, we master Linear Search vs Binary Search! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
