import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import timedDemoCode from "./topic12_files/Segment1TimedCodingAssessmentDemo.java?raw";
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
          @keyframes glowFinish {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(16, 185, 129, 0.9)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-fn {
            animation: glowFinish 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 12 (Final Topic)
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Segment 1 Capstone Complete
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Segment 1 Timed Coding Assessment: Capstone Evaluation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          The ultimate coding capstone for Segment 1 Foundations: evaluating dynamic matrix diagonal summations, recursive binary search pipelines, modern Java 14+ switch expressions, in-memory prime filters, and immutable student billing records in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🏆</span> The 5 Capstone Timed Challenges
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The Capstone Timed Assessment tests integrated problem-solving across all Segment 1 foundational pillars:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">1. Matrix Diagonals</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Computes primary and secondary diagonals in $O(N)$ time with center-overlap elimination.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">2. Binary Search Pipeline</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Recursive logarithmic divide-and-conquer with overflow-safe midpoint calculation.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">3. Switch &amp; Sieve Ledger</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Enhanced switch expressions + Sieve roll checks + Java Records billing in Indian Rupees (₹).
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Final Certification):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (Roll #101, Distinction, ₹17,700 net), <strong>Tuhina</strong> (Roll #103, Distinction, ₹22,125 net), <strong>Abhronila</strong> (Roll #107, First Class, ₹18,054 net), and <strong>Debangshu</strong> (Roll #110, Second Class, ₹24,662 net) successfully completed the assessment with <code className="text-emerald-400 font-semibold">₹82,541.00 Total Certified Revenue</code>!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Segment 1 Capstone Synthesis &amp; Milestone Badge
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the capstone assessment challenges and Segment 1 completion certificate:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Segment 1 Capstone Assessment Diagram"
          >
            <defs>
              <linearGradient id="gradCapLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradCapBadge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: The 5 Challenges */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">THE 5 CAPSTONE CODING CHALLENGES</text>

            <rect x="45" y="70" width="360" height="28" rx="4" fill="#082f49" />
            <text x="55" y="88" fill="#bae6fd" fontSize="9" fontFamily="monospace">1. Matrix Diagonals  : O(N) Primary + Secondary Sum</text>

            <rect x="45" y="103" width="360" height="28" rx="4" fill="#082f49" />
            <text x="55" y="121" fill="#bae6fd" fontSize="9" fontFamily="monospace">2. Binary Search     : Recursive O(log N) Overflow-Safe</text>

            <rect x="45" y="136" width="360" height="28" rx="4" fill="#082f49" />
            <text x="55" y="154" fill="#bae6fd" fontSize="9" fontFamily="monospace">3. Switch Dispatch   : Modern Java 14+ Enum Match</text>

            <rect x="45" y="169" width="360" height="28" rx="4" fill="#082f49" />
            <text x="55" y="187" fill="#bae6fd" fontSize="9" fontFamily="monospace">4. Sieve Primality   : O(1) Precomputed Array Lookup</text>

            <text x="225" y="225" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">5. Student Records &amp; GST Invoicing in INR (₹)</text>

            {/* Right Panel: Completion Milestone Badge */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">MILESTONE CERTIFICATE: SEGMENT 1 COMPLETE!</text>

            <rect x="465" y="70" width="370" height="60" rx="6" fill="#022c22" />
            <text x="475" y="92" fill="#a7f3d0" fontSize="11" fontWeight="bold">JAVA CORE FOUNDATIONS: 100% MASTERED</text>
            <text x="475" y="112" fill="#6ee7b7" fontSize="9" fontFamily="monospace">Modules 001_001 through 001_008 Completed Successfully</text>

            <rect x="465" y="140" width="370" height="55" rx="6" fill="#1e1b4b" />
            <text x="475" y="162" fill="#c7d2fe" fontSize="10" fontWeight="bold">NEXT DESTINATION: SEGMENT 2 (OOP CORE)</text>
            <text x="475" y="180" fill="#a5b4fc" fontSize="9" fontFamily="monospace">Module 002_001: Classes, Objects &amp; Constructors Deep Dive</text>

            <text x="650" y="225" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">Certified Total Revenue: ₹82,541.00</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Congratulations! Segment 1 Foundations is 100% complete. You are fully prepared for Segment 2 OOP!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Capstone Candidate Results &amp; Fee Breakdown
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Roll #</th>
                <th className="p-3 font-semibold text-emerald-400">Student Name</th>
                <th className="p-3 font-semibold text-purple-400">Tier / Waiver</th>
                <th className="p-3 font-semibold text-amber-400">Base Fee</th>
                <th className="p-3 font-semibold text-rose-400">Scholarship</th>
                <th className="p-3 font-semibold text-emerald-300">Net Payable (18% GST)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">#101 (Prime ✓)</td>
                <td className="p-3 text-slate-300">Swadeep</td>
                <td className="p-3 text-emerald-400">DISTINCTION (25%)</td>
                <td className="p-3 text-slate-300">₹20,000.00</td>
                <td className="p-3 text-emerald-300">₹5,000.00</td>
                <td className="p-3 text-emerald-400 font-bold">₹17,700.00</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">#103 (Prime ✓)</td>
                <td className="p-3 text-slate-300">Tuhina</td>
                <td className="p-3 text-emerald-400">DISTINCTION (25%)</td>
                <td className="p-3 text-slate-300">₹25,000.00</td>
                <td className="p-3 text-emerald-300">₹6,250.00</td>
                <td className="p-3 text-emerald-400 font-bold">₹22,125.00</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">#107 (Prime ✓)</td>
                <td className="p-3 text-slate-300">Abhronila</td>
                <td className="p-3 text-purple-400">FIRST_CLASS (15%)</td>
                <td className="p-3 text-slate-300">₹18,000.00</td>
                <td className="p-3 text-purple-300">₹2,700.00</td>
                <td className="p-3 text-purple-400 font-bold">₹18,054.00</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">#110</td>
                <td className="p-3 text-slate-300">Debangshu</td>
                <td className="p-3 text-amber-400">SECOND_CLASS (5%)</td>
                <td className="p-3 text-slate-300">₹22,000.00</td>
                <td className="p-3 text-amber-300">₹1,100.00</td>
                <td className="p-3 text-amber-400 font-bold">₹24,662.00</td>
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
            Segment1TimedCodingAssessmentDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program is the complete capstone assessment engine executing all 5 challenges.
        </p>

        <JavaFileLoader
          fileModule={timedDemoCode}
          title="Segment1TimedCodingAssessmentDemo.java"
          highlightLines={[22, 28, 38, 42, 57, 65, 75, 85, 96, 110]}
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
              <span>❌</span> Pitfall 1: Double-Counting the Center in Matrix Diagonals
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When $N$ is odd (e.g. 3x3), the center element <code className="text-rose-300 font-mono">matrix[1][1]</code> is on both diagonals; failing to subtract it once will overstate the total sum.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Celebrate Mastering Segment 1 Foundations!
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              You now have complete mastery over JVM memory, primitives, expressions, switch logic, loops, multi-dimensional arrays, and recursion. You are 100% prepared for Object-Oriented Programming in Segment 2!
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
            🤔 <em>&ldquo;What awaits us in Segment 2: Object-Oriented Programming (OOP) Core Mechanics?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Real-World Abstractions &amp; Polymorphism! In Segment 2, we will master Classes, Objects, Constructors, Encapsulation, Method Overriding, Inheritance, Abstract Classes, and Polymorphic Interfaces to design enterprise software systems!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Segment 1 Capstone Assessment FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 12: Segment 1 Timed Coding Assessment"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic12_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="Heartiest congratulations to Swadeep, Tuhina, Abhronila, and Debangshu! You have successfully conquered all 8 modules of Segment 1: Java Core Foundations! We now advance to Segment 2: Object-Oriented Programming (OOP) Core Mechanics, starting with Module 002_001: Classes, Objects, and Constructors Deep Dive! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
