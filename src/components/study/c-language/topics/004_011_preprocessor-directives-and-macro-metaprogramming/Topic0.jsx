import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/PreprocessorPipelineDemo.c?raw";
import { topic0Questions } from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_011</span>
          <span>•</span>
          <span>Topic 0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          The Preprocessor Pipeline &amp; Translation Phases (<code className="text-emerald-600 dark:text-emerald-400">gcc -E</code>)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Uncover the first phase of the C compilation pipeline. Discover how the preprocessor performs lexical text substitution, header file inclusion, comment stripping, and macro expansion before the compiler parses syntax.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🔍 Classroom Story: Inspecting the Ghost Output at Shyamnagar</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Shyamnagar lab, <strong>Swadeep</strong> wrote a macro <code>#define MULTIPLY(a, b) a * b</code>. When he called <code>MULTIPLY(3 + 2, 4 + 1)</code>, he expected $(3+2) \times (4+1) = 25$, but the console printed <code>12</code>! He suspected a bug in the GCC math runtime.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> smiled and ran <code>gcc -E main.c -o main.i</code>: <em>&ldquo;Look inside <code>main.i</code>. The preprocessor did not perform arithmetic; it performed dumb text replacement! Your expression literally expanded into <code>3 + 2 * 4 + 1</code>. Because multiplication binds tighter than addition, C evaluated $3 + 8 + 1 = 12$. Always respect the preprocessor as a pure text-replacement engine!&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: The 4-Stage C Compilation Pipeline
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="C Compilation Pipeline Stages"
          >
            <rect width="900" height="280" fill="none" />

            {/* Stage 1: Preprocessor */}
            <rect x="30" y="50" width="180" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="120" y="80" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">1. PREPROCESSOR</text>
            <text x="120" y="105" fill="#94a3b8" fontSize="12" textAnchor="middle">gcc -E (main.i)</text>
            <rect x="45" y="125" width="150" height="85" rx="6" fill="#334155" />
            <text x="55" y="145" fill="#f8fafc" fontSize="10">• Expand #include</text>
            <text x="55" y="165" fill="#f8fafc" fontSize="10">• Expand #define</text>
            <text x="55" y="185" fill="#f8fafc" fontSize="10">• Strip comments</text>
            <text x="55" y="200" fill="#f8fafc" fontSize="10">• Handle #ifdef</text>

            <path d="M 210 140 L 250 140" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow-pipe)" />

            {/* Stage 2: Compiler */}
            <rect x="250" y="50" width="180" height="180" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="340" y="80" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">2. COMPILER</text>
            <text x="340" y="105" fill="#94a3b8" fontSize="12" textAnchor="middle">gcc -S (main.s)</text>
            <rect x="265" y="125" width="150" height="85" rx="6" fill="#334155" />
            <text x="275" y="150" fill="#f8fafc" fontSize="10">• Syntax analysis</text>
            <text x="275" y="170" fill="#f8fafc" fontSize="10">• Type checking</text>
            <text x="275" y="190" fill="#f8fafc" fontSize="10">• Emit Assembly</text>

            <path d="M 430 140 L 470 140" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow-pipe)" />

            {/* Stage 3: Assembler */}
            <rect x="470" y="50" width="180" height="180" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text x="560" y="80" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">3. ASSEMBLER</text>
            <text x="560" y="105" fill="#94a3b8" fontSize="12" textAnchor="middle">gcc -c (main.o)</text>
            <rect x="485" y="125" width="150" height="85" rx="6" fill="#334155" />
            <text x="495" y="150" fill="#f8fafc" fontSize="10">• Machine code</text>
            <text x="495" y="170" fill="#f8fafc" fontSize="10">• Relocatable object</text>
            <text x="495" y="190" fill="#f8fafc" fontSize="10">• Symbol tables</text>

            <path d="M 650 140 L 690 140" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow-pipe)" />

            {/* Stage 4: Linker */}
            <rect x="690" y="50" width="180" height="180" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
            <text x="780" y="80" fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">4. LINKER</text>
            <text x="780" y="105" fill="#94a3b8" fontSize="12" textAnchor="middle">gcc -o (app.exe)</text>
            <rect x="705" y="125" width="150" height="85" rx="6" fill="#334155" />
            <text x="715" y="150" fill="#f8fafc" fontSize="10">• Resolve symbols</text>
            <text x="715" y="170" fill="#f8fafc" fontSize="10">• Link libc.a/so</text>
            <text x="715" y="190" fill="#f8fafc" fontSize="10">• Output Executable</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-pipe" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The Preprocessor Mindset
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              1. Translation Phase Rules
            </h3>
            <ul className="text-sm space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li><strong>Line Splicing:</strong> Lines ending with backslash <code>\</code> are merged with the next line.</li>
              <li><strong>Comments:</strong> Replaced with a single ASCII space character before expansion.</li>
              <li><strong>Header Expansion:</strong> <code>#include</code> replaces the line with the exact contents of the target header file.</li>
              <li><strong>No Semicolons:</strong> Semicolons in <code>#define</code> will be injected literally into C statements!</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              2. Command-Line Preprocessor Flags
            </h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300 font-mono text-xs">
              <li className="bg-slate-900 text-sky-300 p-2 rounded">
                gcc -E main.c -o main.i
                <div className="text-slate-400 font-sans text-xs mt-1">Stops after preprocessing and writes expanded code.</div>
              </li>
              <li className="bg-slate-900 text-emerald-300 p-2 rounded">
                gcc -DDEBUG=1 -DMAX_USERS=500 main.c
                <div className="text-slate-400 font-sans text-xs mt-1">Defines macros globally from CLI without altering source files.</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Preprocessor Translation &amp; Precedence Trap
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program demonstrates object-like macro constants, and contrasts unsafe vs safe function-like macro parenthesization.
        </p>
        <CFileLoader
          fileName="PreprocessorPipelineDemo.c"
          code={cCode}
          title="Preprocessor Translation & Precedence Verification"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  C Preprocessor Translation Pipeline (gcc -E)
=====================================================

>>> 1. String Constant Replacements:
    Academy : Coder & AccoTax Barrackpore
    Course  : Advanced C Systems Engineering
    Buffer  : 1024 bytes

>>> 2. Lexical Text Replacement & Precedence Trap:
    Expression: (3 + 2) * (4 + 1)
    Unsafe Macro Result (x + 2 * y + 1) = 12 [WRONG PRECEDENCE!]
    Safe Macro Result   (((x + 2) * (y + 1))) = 25 [CORRECT!]

>>> 3. Inspecting Macro Expansion via CLI:
    Run 'gcc -E PreprocessorPipelineDemo.c -o expanded.i' to view
    the pure preprocessed output before assembler translation.

=== Preprocessor Pipeline Demonstration Completed ===`}
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
              <span>⚠️ Adding Semicolons in #define</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Writing <code>#define MAX_SIZE 100;</code> causes <code>if (x &gt; MAX_SIZE)</code> to expand into <code>if (x &gt; 100;)</code>, producing a cryptic syntax error during the compilation stage!
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ The Triple-Parenthesis Rule</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Always wrap every individual parameter in parentheses, and wrap the entire resulting expression in parentheses: <code>#define CLAMP(x, min, max) (((x) &lt; (min)) ? (min) : (((x) &gt; (max)) ? (max) : (x)))</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Can Macros Call Themselves Recursively?</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          If you write <code>#define FOO(x) FOO(x + 1)</code>, does GCC get stuck in an infinite preprocessor loop? No! The ISO C specification prohibits recursive macro expansion. When a macro name is scanned during its own expansion, it is disabled (&ldquo;painted blue&rdquo;) and remains unchanged text.
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic0Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic0_Preprocessor_Pipeline_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="The preprocessor is a double-edged sword: wielded with discipline, it unlocks zero-overhead abstractions; wielded carelessly, it creates elusive, un-debuggable syntax ghosts."
      />
    </div>
  );
};

export default Topic0;
