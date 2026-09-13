import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/StringizeTokenPastingDemo.c?raw";
import { topic2Questions } from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_011</span>
          <span>•</span>
          <span>Topic 2</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Preprocessor Metaprogramming: Stringizing (<code className="text-emerald-600 dark:text-emerald-400">#</code>) &amp; Token Concatenation (<code className="text-emerald-600 dark:text-emerald-400">##</code>)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlock compile-time metaprogramming in C. Learn how the stringizing operator <code>#</code> converts expressions into string literals, and how token pasting <code>##</code> synthesizes dynamic identifiers and generic data types with zero runtime cost.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⚡ Classroom Story: Synthesizing Dynamic Type Systems</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Barrackpore systems session, <strong>Abhronila</strong> needed generic stack data structures for <code>int</code>, <code>float</code>, and <code>char</code>. Instead of copy-pasting the struct definition three times, she wanted a single template.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> introduced token concatenation: <em>&ldquo;By writing <code>#define MAKE_STACK(type) typedef struct Stack_##type &#123; type data[100]; &#125; Stack_##type</code>, the preprocessor will glue <code>Stack_</code> and <code>type</code> together during compilation! You get strongly typed, zero-overhead generic structs before C++ templates even existed.&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Stringizing &amp; Token Pasting Operations
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Stringizing and Token Pasting Diagram"
          >
            <rect width="900" height="280" fill="none" />

            {/* Stringizing Box */}
            <rect x="40" y="40" width="380" height="200" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="70" fill="#38bdf8" fontSize="15" fontWeight="bold">1. Stringizing Operator (#x)</text>

            <rect x="60" y="85" width="340" height="60" rx="6" fill="#334155" />
            <text x="75" y="110" fill="#f8fafc" fontSize="12" font-family="monospace">#define PRINT(x) printf(&quot;%s = %d&quot;, #x, x)</text>
            <text x="75" y="130" fill="#94a3b8" fontSize="12" font-family="monospace">PRINT(a + b);</text>

            <rect x="60" y="155" width="340" height="65" rx="6" fill="#0c4a6e" stroke="#0284c7" />
            <text x="75" y="180" fill="#7dd3fc" fontSize="12" fontWeight="bold">Expands To:</text>
            <text x="75" y="202" fill="#e0f2fe" fontSize="12" font-family="monospace">printf(&quot;%s = %d&quot;, &quot;a + b&quot;, a + b);</text>

            {/* Token Concatenation Box */}
            <rect x="480" y="40" width="380" height="200" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="500" y="70" fill="#10b981" fontSize="15" fontWeight="bold">2. Token Pasting Operator (a ## b)</text>

            <rect x="500" y="85" width="340" height="60" rx="6" fill="#334155" />
            <text x="515" y="110" fill="#f8fafc" fontSize="12" font-family="monospace">#define MAKE_ID(p, n) p ## _ ## n</text>
            <text x="515" y="130" fill="#94a3b8" fontSize="12" font-family="monospace">int MAKE_ID(user, 101) = 500;</text>

            <rect x="500" y="155" width="340" height="65" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="515" y="180" fill="#6ee7b7" fontSize="12" fontWeight="bold">Expands To:</text>
            <text x="515" y="202" fill="#d1fae5" fontSize="12" font-family="monospace">int user_101 = 500;</text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: Metaprogramming Patterns
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              1. The Two-Level Expansion Trick
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              When <code>#</code> is placed in front of an argument, macro prescan is bypassed. To stringize the <em>value</em> of another macro, use a two-level helper:
            </p>
            <pre className="bg-slate-900 text-sky-300 p-2.5 rounded-lg text-xs font-mono overflow-x-auto">
{`#define STR_HELPER(x) #x
#define STR(x) STR_HELPER(x)

#define PORT 8080
// STR(PORT) expands to "8080"
// STR_HELPER(PORT) expands to "PORT"`}
            </pre>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              2. Token Pasting (##) for Code Synthesis
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Token pasting glues tokens into a single new C identifier at translation Phase 4. Widely used in operating system kernels to declare system call tables, command dispatchers, and state machine transitions.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Stringizing &amp; Token Concatenation in Action
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program demonstrates expression stringizing, the two-level macro expansion trick, dynamic struct instantiation, and command dispatching via token pasting.
        </p>
        <CFileLoader
          fileName="StringizeTokenPastingDemo.c"
          code={cCode}
          title="Stringizing (#) & Token Concatenation (##) Metaprogramming"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  Preprocessor Metaprogramming: # and ## Operators
=====================================================

>>> 1. Stringizing Operator (#):
Expression: a + b                = 40
Expression: a * b - 50           = 325
Expression: (a < b) ? 100 : 200  = 100

>>> 2. Stringizing Expanded Macro Constants:
    Build Version: 4.11

>>> 3. Token Concatenation (##) Struct Instantiation:
    Node_Int   -> id: 101, value: 42
    Node_Float -> id: 102, value: 3.14159
    Node_Char  -> id: 103, value: 'Z'

>>> 4. Dynamic Function Dispatch via Token Pasting:
    [Action] Starting telemetry service...
    [Action] Resetting core parameters...
    [Action] Stopping telemetry service...

=== Metaprogramming Demonstration Completed Successfully ===`}
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
              <span>⚠️ Invalid Token Construction</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Concatenating tokens that do not form a valid C token (such as <code>12 ## abc</code>) results in undefined behavior and triggers immediate compiler fatal errors.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ X-Macro Code Generation</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Use the X-Macro pattern to maintain a single source of truth for enumerations, string tables, and dispatch tables to completely prevent synchronization bugs in large systems.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: String Literal Auto-Concatenation</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Why does <code>printf(&quot;File: &quot; __FILE__ &quot;\n&quot;);</code> compile without any <code>strcat()</code>? In Translation Phase 6, the C compiler automatically merges adjacent string literals into a single contiguous string literal in binary memory!
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic2Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic2_Stringizing_Token_Concatenation_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Stringizing and token concatenation are the tools that allow C to construct self-documenting diagnostics and generic structures long before high-level language templates were conceived."
      />
    </div>
  );
};

export default Topic2;
