import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic1_files/MacroPitfallsDemo.c?raw";
import { topic1Questions } from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_011</span>
          <span>•</span>
          <span>Topic 1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Macro Pitfalls: Side Effects &amp; The <code className="text-emerald-600 dark:text-emerald-400">do &#123; ... &#125; while(0)</code> Idiom
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master safe macro design. Uncover the hidden hazards of argument multiple evaluation (side-effect bugs) and learn why the Linux kernel wraps multi-statement macros in the <code className="font-mono text-emerald-500">do &#123; ... &#125; while(0)</code> idiom.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⚠️ Classroom Story: The Mysterious Double Increment Bug</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Barrackpore lab, <strong>Tuhina</strong> called <code>SQUARE(counter++)</code> inside a loop. Mysteriously, the loop jumped by +2 on every iteration instead of +1, causing an off-by-one array overflow.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> broke down the expansion on the whiteboard: <em>&ldquo;Because <code>#define SQUARE(x) ((x) * (x))</code> contains two occurrences of <code>x</code>, the expression <code>((counter++) * (counter++))</code> executes the <code>++</code> post-increment operator twice! Never pass state-mutating expressions into macros. If you need side-effect safety and strict type checking, write a <code>static inline</code> function instead.&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Anatomy of the do-while(0) Wrapper
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="do-while(0) Macro Idiom Diagram"
          >
            <rect width="900" height="280" fill="none" />

            {/* Bad Macro Box */}
            <rect x="40" y="40" width="380" height="200" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
            <text x="60" y="70" fill="#f43f5e" fontSize="15" fontWeight="bold">❌ Unsafe Multi-Statement Macro</text>

            <rect x="60" y="85" width="340" height="60" rx="6" fill="#334155" />
            <text x="75" y="110" fill="#fecdd3" fontSize="12" font-family="monospace">#define SWAP(a,b) &#123; int t=a; a=b; b=t; &#125;</text>
            <text x="75" y="130" fill="#fecdd3" fontSize="12" font-family="monospace">if (flag) SWAP(x, y); else foo();</text>

            <rect x="60" y="155" width="340" height="65" rx="6" fill="#4c0519" stroke="#be123c" />
            <text x="75" y="175" fill="#f87171" fontSize="11" fontWeight="bold">Expands to: &#123; ... &#125;; else foo();</text>
            <text x="75" y="195" fill="#fca5a5" fontSize="11">Compile Error: Trailing &apos;;&apos; orphans the else!</text>

            {/* Good Macro Box */}
            <rect x="480" y="40" width="380" height="200" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="500" y="70" fill="#10b981" fontSize="15" fontWeight="bold">✅ Safe do &#123; ... &#125; while(0) Idiom</text>

            <rect x="500" y="85" width="340" height="60" rx="6" fill="#334155" />
            <text x="515" y="110" fill="#a7f3d0" fontSize="12" font-family="monospace">#define SWAP(a,b) do &#123; ... &#125; while(0)</text>
            <text x="515" y="130" fill="#a7f3d0" fontSize="12" font-family="monospace">if (flag) SWAP(x, y); else foo();</text>

            <rect x="500" y="155" width="340" height="65" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="515" y="175" fill="#34d399" fontSize="11" fontWeight="bold">Expands to: do &#123; ... &#125; while(0); else ...</text>
            <text x="515" y="195" fill="#6ee7b7" fontSize="11">Valid single C statement. Else connects cleanly!</text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The 3 Golden Rules of Macro Safety
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base text-rose-500">
              1. Side-Effect Ban
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Never invoke function-like macros with expressions that modify state: <code>a++</code>, <code>*ptr++</code>, or function calls with internal I/O.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base text-emerald-500">
              2. do-while(0) Enclosure
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Any macro comprising more than one statement or variable declaration must be wrapped in <code>do &#123; ... &#125; while (0)</code>.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base text-sky-500">
              3. Prefer Static Inline
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Whenever type checking and single-evaluation safety are needed, use C99 <code>static inline</code> functions instead of preprocessor macros.
            </p>
          </div>
        </div>

        {/* Macro vs Inline Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">Function-like Macro (#define)</th>
                <th className="p-3">C99 Static Inline Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold">Type Safety</td>
                <td className="p-3 text-rose-500">None (untyped lexical substitution)</td>
                <td className="p-3 text-emerald-500">Strict compile-time type checking</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Side Effects (a++)</td>
                <td className="p-3 text-rose-500">Hazardous (evaluated multiple times)</td>
                <td className="p-3 text-emerald-500">Safe (evaluated strictly once)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Debugging / Stack Traces</td>
                <td className="p-3 text-rose-500">Cannot step into with GDB</td>
                <td className="p-3 text-emerald-500">Full source-level debugger support</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Call Overhead</td>
                <td className="p-3">Zero (expanded in place)</td>
                <td className="p-3">Zero (inlined directly by compiler)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Side Effect Hazard vs do-while(0) Idiom
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This code demonstrates the multiple-evaluation side-effect bug alongside a multi-statement swap macro wrapped safely in <code>do &#123; ... &#125; while(0)</code>.
        </p>
        <CFileLoader
          fileName="MacroPitfallsDemo.c"
          code={cCode}
          title="Macro Side-Effects & do-while(0) Idiom Verification"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  Macro Pitfalls: Side Effects & do-while(0) Idioms
=====================================================

>>> 1. Side Effect Trap with SQUARE(a++):
    Initial a = 5
    SQUARE(a++) Result = 30 (Expected 25, got 30 or UB!)
    After macro, a = 7 (Incremented twice!)

    Inline Function square_inline(b++) Result = 25
    After inline function, b = 6 (Incremented exactly once!)

>>> 2. Multi-statement Macro with do { ... } while(0):
    Before Swap: x = 10, y = 20
    After SWAP_SAFE: x = 20, y = 10

=== Macro Pitfalls Demonstration Completed Successfully ===`}
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
              <span>⚠️ Variable Shadowing in Macro Blocks</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              If a macro declares <code>int temp = a;</code>, and the caller passes a variable named <code>temp</code>, the inner local variable shadows the caller&apos;s variable, causing corrupted computations. Always use obscure names like <code>temp_macro_var_</code>.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Embrace C99 Inline Functions</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Only use macros when metaprogramming (stringizing, token concatenation, capturing file/line metadata) is mandatory. For computational logic, default to <code>static inline</code> functions.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Why Not Use a Regular While Loop?</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Why does the idiom specifically use <code>do &#123; ... &#125; while(0)</code> instead of <code>while(0) &#123; ... &#125;</code>? Because <code>while(0)</code> evaluates the condition first and would skip the loop body entirely! <code>do ... while(0)</code> guarantees that the block executes exactly once and terminates.
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic1Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic1_Macro_Pitfalls_DoWhile0_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Every seasoned C systems programmer knows the do-while(0) idiom by heart. It is the signature of code written for battle-tested production environments."
      />
    </div>
  );
};

export default Topic1;
