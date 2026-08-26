import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import domainDemoCode from "./topic1_files/RealWorldDomainModelingDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowDomain {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-dm {
            animation: glowDomain 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Domain Modeling &amp; Entities
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Real-World Modeling: Mapping Entities to State &amp; Behavior
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the foundation of Object-Oriented system design: transforming real-world business concepts into cohesive software classes, mapping attributes to <code className="text-sky-300 font-mono">State (fields)</code>, mapping capabilities to <code className="text-emerald-300 font-mono">Behavior (methods)</code>, and maintaining domain invariants.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> State vs. Behavior in Domain Modeling
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In software architecture, every business entity is defined by what it <em>holds</em> (State) and what it <em>does</em> (Behavior):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. State (Instance Attributes)</h3>
              <p className="text-sky-300 mb-1">private int roll; private double gpa;</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Represents the stored data values residing inside Heap memory. Kept <code className="text-emerald-400 font-mono">private</code> to protect domain consistency.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Behavior (Domain Operations)</h3>
              <p className="text-emerald-300 mb-1">public boolean isEligibleForHonors()</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Methods that execute business rules, validate state transitions, and enforce invariant boundaries (e.g. course capacity limits).
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Academic Domain):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (GPA 9.4) and <strong>Tuhina</strong> (GPA 9.8) qualified for Honors, while our <code className="text-sky-300 font-mono">Course</code> entity enrolled 3 students and safely rejected excess registration when maximum capacity was reached, collecting <code className="text-emerald-400 font-semibold">₹75,000.00 Total Tuition</code>!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Domain Entity Mapping &amp; Composition Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing how real-world entities decompose into state and behavior, and aggregate into higher-order domain models:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Real World Domain Modeling Diagram"
          >
            <defs>
              <linearGradient id="gradStud" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradCourse" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: Student Entity (State & Behavior) */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. STUDENT ENTITY (State &amp; Behavior)</text>

            <rect x="45" y="70" width="360" height="40" rx="4" fill="#082f49" />
            <text x="55" y="90" fill="#bae6fd" fontSize="10" fontWeight="bold">STATE (Private Fields):</text>
            <text x="55" y="103" fill="#7dd3fc" fontSize="9" fontFamily="monospace">rollNumber, studentName, attendance, GPA</text>

            <rect x="45" y="120" width="360" height="40" rx="4" fill="#082f49" />
            <text x="55" y="140" fill="#bae6fd" fontSize="10" fontWeight="bold">BEHAVIOR (Public Methods):</text>
            <text x="55" y="153" fill="#7dd3fc" fontSize="9" fontFamily="monospace">isEligibleForHonors(), recordAttendance(present)</text>

            <text x="225" y="215" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Self-Contained Domain Rules &amp; Validations</text>

            {/* Right Panel: Course Entity (Composition HAS-A) */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. COURSE ENTITY (Composition HAS-A)</text>

            <rect x="465" y="70" width="370" height="40" rx="4" fill="#022c22" />
            <text x="475" y="90" fill="#a7f3d0" fontSize="10" fontWeight="bold">COMPOSITION (Course HAS-A List&lt;Student&gt;):</text>
            <text x="475" y="103" fill="#6ee7b7" fontSize="9" fontFamily="monospace">courseCode, courseTitle, maxCapacity, tuitionFee</text>

            <rect x="465" y="120" width="370" height="40" rx="4" fill="#022c22" />
            <text x="475" y="140" fill="#a7f3d0" fontSize="10" fontWeight="bold">CAPACITY INVARIANT BEHAVIOR:</text>
            <text x="475" y="153" fill="#6ee7b7" fontSize="9" fontFamily="monospace">enrollStudent() &rarr; Rejects if enrolled &gt;= capacity</text>

            <text x="650" y="215" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">Defensive Copying: List.copyOf(enrolledStudents)</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Entities encapsulate state and behavior, composing complex multi-entity domain models with strict invariant rules.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Domain Modeling Patterns Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Model Pattern</th>
                <th className="p-3 font-semibold text-emerald-400">Characteristics</th>
                <th className="p-3 font-semibold text-purple-400">Key Advantage</th>
                <th className="p-3 font-semibold text-amber-400">Industry Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Rich Domain Model</td>
                <td className="p-3 text-slate-300 font-sans">State + Business Methods in Entity</td>
                <td className="p-3 text-emerald-400 font-sans font-bold">Self-protecting invariants &amp; high cohesion</td>
                <td className="p-3 text-emerald-300 font-sans font-bold">Industry Best Practice (DDD)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Anemic Domain Model</td>
                <td className="p-3 text-slate-300 font-sans">Only getters/setters; logic in services</td>
                <td className="p-3 text-slate-300 font-sans">Simple data structure mapping</td>
                <td className="p-3 text-rose-400 font-sans">Anti-pattern (Procedural in disguise)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Immutable Value Object</td>
                <td className="p-3 text-slate-300 font-sans">All fields `final`; zero mutators</td>
                <td className="p-3 text-emerald-400 font-sans font-bold">Thread-safe, hash-safe, zero side-effects</td>
                <td className="p-3 text-emerald-300 font-sans font-bold">Preferred for identity &amp; money</td>
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
            RealWorldDomainModelingDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program implements rich domain modeling for Student and Course entities with capacity constraints.
        </p>

        <JavaFileLoader
          fileModule={domainDemoCode}
          title="RealWorldDomainModelingDemo.java"
          highlightLines={[21, 26, 33, 44, 52, 65, 75, 87, 98, 110]}
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
              <span>❌</span> Pitfall 1: Leaking Mutable Collection References from Getters
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Returning <code className="text-rose-300 font-mono">return this.enrolledStudents;</code> allows external callers to call <code className="text-rose-300 font-mono">list.clear()</code>, corrupting internal state. Always return <code className="text-emerald-400 font-mono">List.copyOf(enrolledStudents)</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Build Rich Domain Models with Cohesive Methods
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Give your entities domain methods that express real-world actions (<code className="text-emerald-400 font-mono">enrollStudent()</code>, <code className="text-emerald-400 font-mono">isEligibleForHonors()</code>) rather than exposing dumb setters.
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
            🤔 <em>&ldquo;What is the difference between Command methods and Query methods?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Command-Query Separation (CQS)! A <strong>Query</strong> method (like <code className="text-emerald-400 font-mono">isFull()</code> or <code className="text-emerald-400 font-mono">getRemainingSeats()</code>) answers a question without modifying state. A <strong>Command</strong> method (like <code className="text-sky-300 font-mono">enrollStudent()</code>) mutates state. Keeping them distinct prevents unexpected side-effects!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Real-World Domain Modeling FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_001 Topic 1: Real-World Domain Modeling"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_001_topic1_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Rich domain modeling is what turns programmers into software architects. In Topic 2, we dive into Class Definition: Syntax, Anatomy, and Naming Conventions! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
