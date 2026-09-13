import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic4_files/HeaderGuardsDemo.c?raw";
import { topic4Questions } from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_011</span>
          <span>•</span>
          <span>Topic 4</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Header Guards, Include Guards &amp; <code className="text-emerald-600 dark:text-emerald-400">#pragma once</code>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master multi-file code modularity. Learn how to prevent fatal type and struct redefinition errors, eliminate circular dependency loops, and compare standard <code>#ifndef</code> guards against compiler <code>#pragma once</code> directives.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🛡️ Classroom Story: The 50-Error Cascade from One Missing Guard</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Barrackpore project lab, <strong>Swadeep</strong> and <strong>Tuhina</strong> were integrating a game engine. <code>player.h</code> included <code>vector.h</code>, and <code>physics.h</code> also included <code>vector.h</code>. When compiling <code>main.c</code>, GCC threw over 50 cascading error messages claiming <code>error: redefinition of &apos;struct Vector2D&apos;</code>.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> explained the mechanism: <em>&ldquo;Because <code>vector.h</code> had no include guard, the preprocessor inserted the struct definition into <code>main.c</code> twice! By wrapping every header in an <code>#ifndef VECTOR_H / #define VECTOR_H / #endif</code> guard, subsequent inclusions are skipped cleanly.&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Diamond Inclusion &amp; Header Guard Filtering
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Diamond Inclusion and Header Guard Diagram"
          >
            <rect width="900" height="280" fill="none" />

            {/* Root: vector.h */}
            <rect x="360" y="20" width="180" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="450" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">vector.h</text>
            <text x="450" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle">struct Vector2D definition</text>

            {/* Branches: player.h & physics.h */}
            <path d="M 400 80 L 250 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-guard)" />
            <path d="M 500 80 L 650 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-guard)" />

            <rect x="160" y="120" width="180" height="55" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="250" y="145" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">player.h</text>
            <text x="250" y="163" fill="#a7f3d0" fontSize="10" textAnchor="middle">#include &quot;vector.h&quot;</text>

            <rect x="560" y="120" width="180" height="55" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="650" y="145" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">physics.h</text>
            <text x="650" y="163" fill="#a7f3d0" fontSize="10" textAnchor="middle">#include &quot;vector.h&quot;</text>

            {/* Merge: main.c */}
            <path d="M 250 175 L 400 215" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-guard)" />
            <path d="M 650 175 L 500 215" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-guard)" />

            <rect x="340" y="215" width="220" height="60" rx="8" fill="#047857" stroke="#10b981" strokeWidth="2" />
            <text x="450" y="240" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">main.c (Protected by Guards)</text>
            <text x="450" y="260" fill="#ccfbf1" fontSize="10" textAnchor="middle">Vector2D parsed ONCE. 0 Errors.</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-guard" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: #ifndef Guards vs #pragma once
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3">Attribute</th>
                <th className="p-3">Traditional #ifndef Guard</th>
                <th className="p-3">#pragma once Directive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold">ISO C Standard</td>
                <td className="p-3 text-emerald-500 font-bold">100% Standard C Compliant</td>
                <td className="p-3 text-amber-500">Non-standard (de facto compiler standard)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Boilerplate Lines</td>
                <td className="p-3">3 lines (#ifndef, #define, #endif)</td>
                <td className="p-3 text-emerald-500">1 single line (#pragma once)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Name Collision Risk</td>
                <td className="p-3 text-rose-500">Possible if two files use identical guard names</td>
                <td className="p-3 text-emerald-500">Zero collision risk (based on file identity)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Symlinks / Inodes</td>
                <td className="p-3 text-emerald-500">Immune to filesystem aliasing</td>
                <td className="p-3 text-amber-500">Can occasionally fail on complex symlinks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Header Guard Verification
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program demonstrates how simulated duplicate include guards protect structure definitions and static inline functions from duplicate definition errors.
        </p>
        <CFileLoader
          fileName="HeaderGuardsDemo.c"
          code={cCode}
          title="Header Guard & Circular Inclusion Protection Verification"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  Header Guard Mechanics: Preventing Type Redefinitions
=====================================================

>>> 1. Creating Structs Defined Behind Include Guards:
    Vector A: (10.50, 20.00)
    Vector B: (5.50, -4.00)
    Sum (A+B): (16.00, 16.00)

>>> 2. Composite Transform Object:
    Entity Position: (16.00, 16.00)
    Entity Rotation: 45.0 deg
    Entity Scale   : 1.0x

>>> 3. Multiple Inclusion Protection:
    VECTOR2D_H guard prevented duplicate typedef struct redefinitions.

=== Header Guard Demonstration Completed Successfully ===`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Common Pitfalls &amp; Professional Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <span>⚠️ Variable Definitions in Header Files</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Never write <code>int counter = 0;</code> in a <code>.h</code> file! If included across multiple <code>.c</code> files, each translation unit allocates its own storage, causing a fatal <code>multiple definition of &apos;counter&apos;</code> linker error. Always declare as <code>extern int counter;</code>.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Unique Project Prefixes</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Format header guards as <code>PROJECT_MODULE_FILENAME_H</code> (e.g. <code>ACCOTAX_MATH_VECTOR2D_H</code>) to prevent accidental collisions with third-party open-source libraries.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Circular Header Dependencies</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          If <code>struct Teacher</code> points to <code>struct Student*</code> and <code>struct Student</code> points to <code>struct Teacher*</code>, how do you prevent circular include deadlocks? (<em>Answer: Use a Forward Declaration: <code>typedef struct Student Student;</code> before the teacher struct, without including the entire student header!</em>)
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic4Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic4_Header_Guards_Pragma_Once_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="A C codebase without header guards is a house built without mortar. Guard every header from line one to guarantee seamless multi-file compilation."
      />
    </div>
  );
};

export default Topic4;
