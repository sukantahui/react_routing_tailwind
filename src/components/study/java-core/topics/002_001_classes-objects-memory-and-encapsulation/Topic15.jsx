import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import readOnlyWriteOnlyDemoCode from "./topic15_files/ReadOnlyWriteOnlyClassesDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes showcaseGlow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(14, 165, 233, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(14, 165, 233, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-showcase {
            animation: showcaseGlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 15
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Selective Encapsulation &amp; Access Exposure
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Read-Only and Write-Only Classes Using Selective Getter/Setter Exposure
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master advanced architectural encapsulation through selective accessor and mutator exposure: creating tamper-proof Read-Only domain entities (museum showcases), secure Write-Only secret ingestion sinks (ballot boxes), and enterprise Hybrid profiles with granular field-level access control.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Three Selective Exposure Patterns
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Enterprise software design avoids blanket getters and setters. Instead, it tailors exposure to the precise operational role of each entity:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">1. Read-Only (Showcase)</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                <strong>Getters Only</strong>. Immutable snapshots, certified academic report cards, financial audit receipts.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">2. Write-Only (Ballot Box)</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                <strong>Setters Only</strong>. Password reset ingesters, encryption sinks, append-only compliance loggers.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">3. Hybrid Selective</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                <strong>Granular per field</strong>. Read-only ID, read-write contact info, write-only payment PIN.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Swadeep&apos;s Report Card &amp; Tuhina&apos;s Profile):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> graduated with a 93.83% score, our academy generated a <code className="text-sky-300 font-mono">ReadOnlyAcademicReportCard</code> that outside callers can inspect freely, but cannot tamper with because zero setters exist! Meanwhile, <strong>Tuhina Das</strong> updated her hybrid profile with a write-only payment PIN that digested into a hash without exposing the secret to reading APIs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Selective Exposure Architecture: Read-Only, Write-Only, and Hybrid Profiles
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing the three architectural access models in Java:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 310"
            className="w-full h-auto"
            aria-label="Selective Exposure Architecture Diagram"
          >
            {/* Box 1: Read-Only Showcase */}
            <rect x="25" y="25" width="270" height="260" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="160" y="52" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">READ-ONLY (SHOWCASE)</text>
            <text x="160" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">All Getters &middot; ZERO Setters</text>

            <rect x="35" y="85" width="250" height="55" rx="4" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="45" y="105" fill="#bae6fd" fontSize="9" fontWeight="bold">Public Read Accessors:</text>
            <text x="45" y="125" fill="#38bdf8" fontSize="9" fontFamily="monospace">+ getMarks() | + getGrade()</text>

            <rect x="35" y="150" width="250" height="120" rx="4" fill="#0c4a6e" stroke="#0284c7" strokeWidth="1" />
            <text x="45" y="172" fill="#e0f2fe" fontSize="9" fontWeight="bold">Immutable Heap Core:</text>
            <text x="45" y="192" fill="#7dd3fc" fontSize="9" fontFamily="monospace">- private final double marks</text>
            <text x="45" y="208" fill="#7dd3fc" fontSize="9" fontFamily="monospace">- private final String certDate</text>
            <text x="45" y="235" fill="#fde047" fontSize="8" fontWeight="bold">&check; 100% Tamper-Proof Snapshot</text>
            <text x="45" y="252" fill="#a7f3d0" fontSize="8">External mutation is impossible</text>

            {/* Box 2: Write-Only Ballot Box */}
            <rect x="325" y="25" width="270" height="260" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
            <text x="460" y="52" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">WRITE-ONLY (BALLOT BOX)</text>
            <text x="460" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">All Setters &middot; ZERO Getters</text>

            <rect x="335" y="85" width="250" height="55" rx="4" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
            <text x="345" y="105" fill="#f3e8ff" fontSize="9" fontWeight="bold">Public Ingestion Mutators:</text>
            <text x="345" y="125" fill="#c084fc" fontSize="9" fontFamily="monospace">+ setPassword(p) | + setSalt(s)</text>

            <rect x="335" y="150" width="250" height="120" rx="4" fill="#581c87" stroke="#a855f7" strokeWidth="1" />
            <text x="345" y="172" fill="#f3e8ff" fontSize="9" fontWeight="bold">Confidential Ingestor Core:</text>
            <text x="345" y="192" fill="#e9d5ff" fontSize="9" fontFamily="monospace">- private String digestedHash</text>
            <text x="345" y="208" fill="#fca5a5" fontSize="8" fontFamily="monospace">&times; No getPassword() getter!</text>
            <text x="345" y="235" fill="#fde047" fontSize="8" fontWeight="bold">&check; Secret Sinkhole Protection</text>
            <text x="345" y="252" fill="#a7f3d0" fontSize="8">Verifies matches without exposure</text>

            {/* Box 3: Hybrid Mixed Profile */}
            <rect x="625" y="25" width="270" height="260" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="760" y="52" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">HYBRID SELECTIVE PROFILE</text>
            <text x="760" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">Fine-Grained Field Exposure</text>

            <rect x="635" y="85" width="250" height="185" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="645" y="105" fill="#34d399" fontSize="9" fontWeight="bold">Field-Level Access Policy:</text>
            <text x="645" y="125" fill="#38bdf8" fontSize="8" fontFamily="monospace">&bull; (Read-Only)  getId()</text>
            <text x="645" y="145" fill="#4ade80" fontSize="8" fontFamily="monospace">&bull; (Read-Write) get/setEmail()</text>
            <text x="645" y="165" fill="#c084fc" fontSize="8" fontFamily="monospace">&bull; (Write-Only) setPaymentPin()</text>
            <text x="645" y="185" fill="#fca5a5" fontSize="8" fontFamily="monospace">&bull; (Internal)   auditCounter (None)</text>
            <text x="645" y="215" fill="#fde047" fontSize="8" fontWeight="bold">&check; Tailored Enterprise Security</text>
            <text x="645" y="232" fill="#a7f3d0" fontSize="8">Zero accidental credential leaks</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Live Interactive Java Demonstration */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
            <span>💻</span> Production Java Demonstration
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
            ReadOnlyWriteOnlyClassesDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The executable code below showcases pure read-only report cards, write-only password ingestion sinks with boolean verifiers, and hybrid selective exposure profiles:
        </p>

        <JavaFileLoader
          fileName="ReadOnlyWriteOnlyClassesDemo.java"
          code={readOnlyWriteOnlyDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; Architecture Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Read-Only vs Truly Immutable
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Omitting setters makes a class read-only, but true immutability additionally requires declaring the class <code className="text-sky-300 font-mono">final</code>, all fields <code className="text-sky-300 font-mono">final</code>, and performing defensive copying on all collection inputs and outputs.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Write-Only Security Pattern
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Write-only classes accept credentials, digest them immediately into salted cryptographic hashes, and expose only boolean verifiers (<code className="text-emerald-300 font-mono">verifyMatch(...)</code>) rather than returning hashes.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Jackson WRITE_ONLY Integration
            </h3>
            <p className="text-slate-300 leading-relaxed">
              In Spring Boot REST APIs, annotating fields with <code className="text-purple-300 font-mono">@JsonProperty(access = Access.WRITE_ONLY)</code> allows incoming JSON to bind credentials without ever returning them in HTTP GET responses.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Java 16+ Records as Read-Only DTOs
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Records are Java&apos;s modern built-in solution for pure read-only data carriers, generating private final fields and component accessors automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Defensive Best Practices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Bad Practice */}
          <div className="p-5 bg-rose-950/20 rounded-xl border border-rose-500/30 space-y-3">
            <h3 className="text-rose-400 font-bold text-base flex items-center gap-2">
              <span>❌</span> Pitfall: Returning Mutable References from Read-Only Classes
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              If a read-only class has no setters but returns a raw <code className="text-rose-300 font-mono">Date</code> or <code className="text-rose-300 font-mono">List</code> reference in a getter, external code can call <code className="text-rose-300 font-mono">list.clear()</code> and destroy internal state.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// LEAK IN READ-ONLY CLASS:
public List<String> getSkills() {
    return this.skills; // Callers can call .clear()!
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Return Unmodifiable Views or Clones
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Wrap collections with <code className="text-emerald-300 font-mono">Collections.unmodifiableList()</code> and clone arrays before returning in getters.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// SAFE: Read-only armor on collections
public List<String> getSkills() {
    return Collections.unmodifiableList(this.skills);
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-emerald-500/10 p-6 md:p-8 rounded-2xl border border-sky-500/30">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why is a Write-Only class with a getter that returns a masked hash NOT write-only?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          The moment any getter is exposed—even if it returns a masked string or a cryptographic hash—the class ceases to be write-only and becomes a <strong>Hybrid Profile</strong>! A true write-only class exposes <strong>zero accessor methods</strong> of any kind, functioning strictly as a one-way terminal data sinkhole (like a sealed ballot box).
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="A master software architect never gives blanket read/write access to everything. Design museum showcases (read-only) for your certificates, ballot boxes (write-only) for your secrets, and dedicated bank windows (hybrid) for your domain records."
        mentor="Sukanta Hui"
        role="Lead Java Architect & Senior Academic Mentor"
        location="Barrackpore & Naihati Campus, West Bengal"
      />

      {/* Section 8: FAQ Catalog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>❓</span> Frequently Asked Technical Questions (30 Q&amp;As)
        </h2>
        <FAQTemplate questions={questions} />
      </section>

      {/* Section 9: Plain Text Printable Reference */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-300 flex items-center gap-2">
            <span>🖨️</span> Printable Quick Reference Note
          </h2>
        </div>
        <PlainTextPrint
          content={noteText}
          fileName="Topic15_ReadOnly_WriteOnly_Classes_Note.txt"
        />
      </section>
    </div>
  );
}
