import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";

// Import Python Source Files
import refactoringCode from "./topic5_files/spaghetti_vs_dry_refactoring.py?raw";
import dataDrivenCode from "./topic5_files/data_driven_graphics_engine.py?raw";
import unitTestingCode from "./topic5_files/graphical_unit_testing_invariants.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes badgeShine {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.6)); }
}
`;

const Topic5 = () => {
  const [activeView, setActiveView] = useState("dry"); // "spaghetti" vs "dry"

  const prototypes = [
    {
      name: "DRY Refactoring Pattern",
      returnType: "Architectural Principle",
      purpose: "Replaces redundant copy-pasted drawing commands with a single authoritative parameterized function.",
      usage: "for h in houses:\n    draw_house(t, **h)"
    },
    {
      name: "Data-Driven Renderer",
      returnType: "Separation of Concerns",
      purpose: "Decouples spatial layout datasets (JSON / Dicts) completely from geometric rendering algorithms.",
      usage: "render_scene_from_data(t, SCENE_DATA)"
    },
    {
      name: "Graphical Invariant Assertion",
      returnType: "Unit Testing",
      purpose: "Automated assertion testing verifying that drawing functions leave zero side effects on turtle state.",
      usage: "assert t.position() == initial_pos"
    }
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* =========================================================================
            HERO SECTION
        ========================================================================= */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_004 · Modular Graphics with Functions · Topic 5
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-300 to-indigo-400 bg-clip-text text-transparent">
            Clean Code & DRY Principles in Graphical Programming
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform monolithic spaghetti code into elegant, production-grade graphics software. Master the <span className="text-emerald-400 font-bold">DRY (Don't Repeat Yourself)</span> principle, <span className="text-cyan-300 font-semibold">Single Responsibility (SRP)</span>, data-driven pipelines, and automated invariant testing.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🧼 DRY (Don't Repeat Yourself)
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📊 Data-Driven Rendering Pipelines
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🧪 Graphical Invariant Unit Testing
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE DRY REFACTORING STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>⚡</span> Interactive DRY Refactoring Comparator
              </h3>
              <p className="text-xs text-slate-400">
                Compare monolithic spaghetti script metrics against clean, data-driven DRY architecture.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveView("spaghetti")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeView === "spaghetti"
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                🍝 Spaghetti Anti-Pattern (80 Lines)
              </button>

              <button
                onClick={() => setActiveView("dry")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeView === "dry"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                ✨ Clean DRY Architecture (15 Lines)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Rendered Canvas */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Rendered Output (Village Layout: 3 Houses)
              </span>
              <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* Ground */}
                <line x1="10" y1="150" x2="310" y2="150" stroke="#334155" strokeWidth="2" />

                {/* House 1 */}
                <g transform="translate(25, 65)">
                  <rect x="0" y="45" width="60" height="40" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                  <polygon points="30,20 -5,45 65,45" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="10" y="65" width="14" height="20" fill="#78350f" />
                  <rect x="35" y="55" width="12" height="12" fill="#fef08a" />
                </g>

                {/* House 2 */}
                <g transform="translate(115, 45)">
                  <rect x="0" y="55" width="80" height="50" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                  <polygon points="40,25 -8,55 88,55" fill="#eab308" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="15" y="80" width="18" height="25" fill="#78350f" />
                  <rect x="48" y="68" width="16" height="16" fill="#fef08a" />
                </g>

                {/* House 3 */}
                <g transform="translate(225, 75)">
                  <rect x="0" y="40" width="55" height="35" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5" />
                  <polygon points="27,18 -5,40 60,40" fill="#fb923c" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="10" y="57" width="12" height="18" fill="#78350f" />
                  <rect x="32" y="48" width="12" height="12" fill="#fef08a" />
                </g>
              </svg>
            </div>

            {/* View 2: Code Metrics Breakdown */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Code Quality & Maintainability Index</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  activeView === "dry"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                }`}>
                  {activeView === "dry" ? "Grade: A+ (Production Quality)" : "Grade: F (High Technical Debt)"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Total Lines of Code</div>
                  <div className="text-base font-mono font-bold text-sky-400">
                    {activeView === "dry" ? "15 Lines (78% Reduction)" : "80+ Lines (Copy-Pasted)"}
                  </div>
                  <div className="text-[10px] text-slate-500">Maintainability Factor</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Change Propagation Cost</div>
                  <div className="text-base font-mono font-bold text-emerald-400">
                    {activeView === "dry" ? "1 Single Function Edit" : "30+ Manual Search/Replaces"}
                  </div>
                  <div className="text-[10px] text-slate-500">Refactoring Efficiency</div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # {activeView === "dry" ? "Clean Data-Driven Architecture" : "Copy-Pasted Monolithic Anti-Pattern"}
                </span>
                <pre className={`font-mono text-xs overflow-x-auto ${
                  activeView === "dry" ? "text-emerald-300" : "text-rose-300"
                }`}>
{activeView === "dry"
  ? `for house in village_dataset:
    draw_house(t, **house)`
  : `# House 1 (20 lines)
t.forward(80); t.left(90)...
# House 2 (20 lines duplicate)
t.forward(100); t.left(90)...`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Clean Code Standards in Graphics Engineering
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Clean Code Principle</th>
                  <th className="py-3 px-4">Core Rule</th>
                  <th className="py-3 px-4">Graphical Benefit</th>
                  <th className="py-3 px-4">Implementation Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-cyan-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-indigo-400 text-xs">{proto.returnType}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{proto.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-amber-300 text-xs">{proto.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            PYTHON CODE IMPLEMENTATION SCRIPTS
        ========================================================================= */}
        <div className="space-y-6 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>💻</span> Professional Python Implementation Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: spaghetti_vs_dry_refactoring.py */}
            <PythonFileLoader
              fileModule={refactoringCode}
              title="spaghetti_vs_dry_refactoring.py"
              highlightLines={[14, 28, 38, 59, 60, 61, 62, 65]}
            />

            {/* File 2: data_driven_graphics_engine.py */}
            <PythonFileLoader
              fileModule={dataDrivenCode}
              title="data_driven_graphics_engine.py"
              highlightLines={[12, 13, 27, 28, 41, 42, 43, 44, 47]}
            />

            {/* File 3: graphical_unit_testing_invariants.py */}
            <PythonFileLoader
              fileModule={unitTestingCode}
              title="graphical_unit_testing_invariants.py"
              highlightLines={[12, 13, 14, 23, 27, 34, 38, 39]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🧹</span> Barrackpore Code Review: The 600-Line Cleanup
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima brought a 650-line script drawing a railway terminal to class in Barrackpore. When the teacher requested changing track gauge widths, she was overwhelmed by 40 copy-pasted blocks. Teacher Sukanta Hui guided her to apply DRY principles. In 15 minutes, her code shrank to <strong>65 lines</strong>, and modifying the gauge width required altering just 1 configuration constant!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🧪</span> Jadavpur Software Testing: Invariant CI/CD
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu integrated automated assertion testing into his graphics project. By writing <code className="text-emerald-300 font-mono">assert t.pos() == start_pos</code> before and after every drawing helper, he caught 3 elusive state leakage bugs before his final semester submission, earning top honors in software engineering.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Clean Code Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Copy-Pasting Drawing Code Blocks</strong>
              <p className="text-slate-400">
                Duplicating 20 lines of code every time you need a new house or star multiplies technical debt and makes bug fixes 10x harder. Always extract to a function.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Embedding Data Directly Inside Functions</strong>
              <p className="text-slate-400">
                Hardcoding coordinate arrays inside functions couples data with rendering. Keep datasets in standalone lists/dictionaries or external JSON files.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Magic Numbers Everywhere</strong>
              <p className="text-slate-400">
                Writing literal numbers like <code className="text-rose-300 font-mono">t.forward(137.4)</code> without comments or named constants leaves future maintainers completely unable to decipher geometric intent.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Megafunctions Over 100 Lines</strong>
              <p className="text-slate-400">
                A single function that sets up the screen, calculates math, draws sky, mountains, houses, and handles mouse clicks violates Single Responsibility. Decompose it into small, single-purpose units.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT CHECKLIST
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-cyan-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3">📝 Student Mastery Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-gray-200">
            {[
              "I practice DRY (Don't Repeat Yourself) by turning repeated code into parameterized functions",
              "I adhere to the Single Responsibility Principle (SRP) by keeping functions focused",
              "I decouple scene layout datasets from geometric rendering algorithms",
              "I replace magic numbers with UPPERCASE configuration constants",
              "I write automated unit tests and assertions to verify turtle state invariants",
              "I use type annotations and standardized docstrings across all drawing APIs"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            HINTS & EXPERT MINDSET
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-cyan-900/20 rounded-2xl p-5 border border-cyan-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-cyan-300">💡 Hints to Explore</h3>
            <p className="text-xs text-slate-300">
              👉 <strong>Think about:</strong> How modern software teams use automated CI/CD linters (Black, Ruff, PyTest) to prevent messy code from ever entering production repositories!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How refactoring to data-driven pipelines allows loading entirely new levels or scenes simply by swapping a JSON file!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Write a pytest test suite that verifies 5 of your custom drawing functions leave zero state leakage!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Anyone can write code that a computer understands; great programmers write code that humans understand. By cultivating clean code habits, DRY principles, and disciplined modularity early in your journey, you build the foundation required to architect million-line enterprise applications, game engines, and distributed cloud systems.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Clean Code & DRY Principles FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Clean Code & DRY Principles Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic5_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="As we conclude Module 005_004 at Coder & AccoTax in Barrackpore and Kolkata, remember: modularity is not just a coding style—it is a superpower. Clean functions, DRY architecture, and state invariants turn programming from a frustrating maze of copy-pasted lines into a joyful discipline of creative engineering. Keep your functions pure, your datasets decoupled, and your code DRY!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic5;
