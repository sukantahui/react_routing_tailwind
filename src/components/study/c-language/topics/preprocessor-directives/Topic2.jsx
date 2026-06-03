// Topic2.jsx
import React from 'react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic2_files/example1.c?raw";
import example2 from "./topic2_files/example2.c?raw";
import example3 from "./topic2_files/example3.c?raw";
import example4 from "./topic2_files/example4.c?raw";

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-4 animate-fade-slide-up [animation-delay:0s]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            Function-like Macros
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Syntax, use cases, and hidden dangers – when they help and when they harm
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </section>

        {/* Theory */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4">What Are Function-like Macros?</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <p className="mb-3">
              Function-like macros look like function calls but are expanded inline by the preprocessor. 
              Syntax: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#define MACRO_NAME(params) replacement_text</code>
            </p>
            <p className="mb-3">
              Unlike real functions, they don't have overhead of call/return, but they also lack type checking and can cause unexpected behavior due to multiple evaluation and operator precedence.
            </p>
            <p className="text-orange-600 dark:text-orange-400 font-medium">
              💡 Common in C for simple operations, logging, and performance-critical code where function call overhead matters.
            </p>
          </div>
        </section>

        {/* Syntax Anatomy SVG */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4">Syntax Anatomy</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <svg viewBox="0 0 800 200" className="w-full h-auto" aria-label="Function-like macro syntax">
              <rect x="50" y="30" width="700" height="50" rx="8" fill="#fef3c7" className="dark:fill-gray-700" stroke="#f59e0b" strokeWidth="2" />
              <text x="70" y="60" fontSize="16" fill="#333" className="dark:fill-gray-200">#define</text>
              <text x="170" y="60" fontSize="16" fontWeight="bold" fill="#d97706"> MAX</text>
              <text x="240" y="60" fontSize="16" fill="#333" className="dark:fill-gray-200">(</text>
              <text x="250" y="60" fontSize="16" fill="#ef4444">a</text>
              <text x="265" y="60" fontSize="16" fill="#333">,</text>
              <text x="275" y="60" fontSize="16" fill="#ef4444">b</text>
              <text x="290" y="60" fontSize="16" fill="#333">)</text>
              <text x="310" y="60" fontSize="16" fill="#333" className="dark:fill-gray-200"> → ( (</text>
              <text x="370" y="60" fontSize="16" fill="#ef4444">a</text>
              <text x="385" y="60" fontSize="16" fill="#333">)</text>
              <text x="395" y="60" fontSize="16" fill="#333"> &gt; (</text>
              <text x="435" y="60" fontSize="16" fill="#ef4444">b</text>
              <text x="450" y="60" fontSize="16" fill="#333">) ? (</text>
              <text x="495" y="60" fontSize="16" fill="#ef4444">a</text>
              <text x="510" y="60" fontSize="16" fill="#333">) : (</text>
              <text x="550" y="60" fontSize="16" fill="#ef4444">b</text>
              <text x="565" y="60" fontSize="16" fill="#333">) )</text>
              <rect x="50" y="100" width="700" height="80" rx="8" fill="#fff" className="dark:fill-gray-800" stroke="#ccc" strokeWidth="1" />
              <text x="70" y="125" fontSize="14" fill="#555" className="dark:fill-gray-400">1. Macro name (uppercase by convention)</text>
              <text x="70" y="145" fontSize="14" fill="#555" className="dark:fill-gray-400">2. Parameters (comma-separated, no types)</text>
              <text x="70" y="165" fontSize="14" fill="#555" className="dark:fill-gray-400">3. Replacement text (each parameter wrapped in parentheses, whole expression in parentheses)</text>
            </svg>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-lg font-semibold text-orange-600">🚀 Performance-critical simple ops</h3>
              <code className="block mt-2 text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">{`#define ABS(x) ((x) < 0 ? -(x) : (x))`}</code>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-lg font-semibold text-orange-600">📝 Type-agnostic code</h3>
              <code className="block mt-2 text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">{`#define SWAP(a,b) do { typeof(a) _t = (a); (a)=(b); (b)=_t; } while(0)`}</code>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-lg font-semibold text-orange-600">🐞 Debug print macros</h3>
              <code className="block mt-2 text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">#define LOG(fmt, ...) printf("[%s:%d] " fmt, __FILE__, __LINE__, __VA_ARGS__)</code>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-lg font-semibold text-orange-600">🧮 Generic min/max</h3>
              <code className="block mt-2 text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">{`#define MIN(a,b) ((a) < (b) ? (a) : (b))`}</code>
            </div>
          </div>
        </section>

        {/* Hidden Dangers */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4">⚠️ Hidden Dangers</h2>
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border-l-4 border-red-500">
              <h3 className="font-bold text-red-700 dark:text-red-300">1. Double evaluation of arguments</h3>
              <code className="block mt-2 text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">#define SQUARE(x) ((x)*(x))</code>
              <p className="mt-1">If x has side effects (e.g., <code>i++</code>), it's evaluated twice → <code>SQUARE(i++)</code> becomes <code>((i++)*(i++))</code> – undefined behavior.</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border-l-4 border-red-500">
              <h3 className="font-bold text-red-700 dark:text-red-300">2. Operator precedence with arguments</h3>
              <code className="block mt-2 text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">#define BAD(x) x*x → BAD(1+2) = 1+2*1+2 = 5, not 9</code>
              <p className="mt-1">Solution: wrap each argument and whole expression in parentheses.</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border-l-4 border-red-500">
              <h3 className="font-bold text-red-700 dark:text-red-300">3. Multi-statement macro in if-else</h3>
              <code className="block mt-2 text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">#define SWAP(a,b) int t=a; a=b; b=t; → if (cond) SWAP(x,y); else ...</code>
              <p className="mt-1">Only first statement is conditional. Solution: wrap in <code>{`do { ... } while(0)`}</code>.</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border-l-4 border-red-500">
              <h3 className="font-bold text-red-700 dark:text-red-300">4. No type checking, no scope</h3>
              <p className="mt-1">Macros ignore types and block scopes, leading to subtle bugs.</p>
            </div>
          </div>
        </section>

        {/* Safe Idioms */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">✅ Safe Macro Idioms</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <ul className="space-y-3 list-checkmark">
              <li><strong>Parenthesize everything:</strong> <code>#define MACRO(x) ((x) + 1)</code></li>
              <li><strong>Use do-while(0) for multi-statement macros:</strong>
                <code className="block mt-1 bg-gray-100 dark:bg-gray-700 p-2 rounded">{`#define LOG(msg) do { printf("%s\n", msg); fflush(stdout); } while(0)`}</code>
              </li>
              <li><strong>Avoid side effects in macro arguments:</strong> Use temporary variables or consider inline functions.</li>
              <li><strong>Use uppercase names to differentiate from functions.</strong></li>
              <li><strong>For complex logic, prefer <code>inline</code> functions (C99+)</strong> – they have type checking and no double evaluation.</li>
            </ul>
          </div>
        </section>

        {/* Code Examples */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4">Live Code Examples</h2>
          <EditableCCodeBlock title="Example 1: Basic function-like macro (dangerous)" initialCode={example1} />
          <EditableCCodeBlock title="Example 2: Safe macro with parentheses & do-while" initialCode={example2} />
          <EditableCCodeBlock title="Example 3: Double evaluation catastrophe" initialCode={example3} />
          <EditableCCodeBlock title="Example 4: Inline function alternative (C99)" initialCode={example4} />
        </section>

        {/* Common Pitfalls Section */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.7s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4">🐞 Common Mistakes</h2>
          <ul className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-5 rounded-r-xl space-y-2">
            <li><strong>Forgetting parentheses:</strong> <code>#define CUBE(x) x*x*x</code> → <code>CUBE(1+2)</code> = 1+2*1+2*1+2 = 7, not 27.</li>
            <li><strong>Semicolon inside macro:</strong> <code>#define PRINT(x) printf("%d", x);</code> leads to double semicolons or broken if-else.</li>
            <li><strong>Using <code>return</code> inside macro:</strong> Can cause unexpected early exit.</li>
            <li><strong>Macro argument with comma:</strong> <code>MAX(3, 4, 5)</code> fails – macro sees 3 arguments.</li>
            <li><strong>Assuming macro is a function:</strong> Cannot take address, cannot be used with function pointers.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.8s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">📌 Best Practices & Checklist</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <ul className="space-y-2 list-checkmark">
              <li>✔ Always wrap macro arguments in parentheses: <code>#define SQUARE(x) ((x)*(x))</code></li>
              <li>✔ Wrap entire macro body in parentheses if it's an expression.</li>
              <li>{`✔ Use <code>do { ... } while(0)</code> for multi-statement macros.`}</li>
              <li>{`✔ Avoid macros that evaluate arguments more than once.`}</li>
              <li>✔ Prefer <code>inline</code> functions for anything more complex than a simple expression.</li>
              <li>✔ Use <code>gcc -E</code> to inspect macro expansion.</li>
            </ul>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl">
            <p className="font-bold">📋 Mini Checklist for Students:</p>
            <ul className="mt-2 space-y-1">
              <li>□ Do I understand that macros are text substitution, not functions?</li>
              <li>□ Have I parenthesized every parameter and the whole body?</li>
              <li>□ Does my macro evaluate any argument twice? (e.g., MAX(i++, j))</li>
              <li>□ Is my multi-statement macro wrapped in <code>do-while(0)</code>?</li>
              <li>□ Could an inline function be a safer alternative?</li>
            </ul>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher note={
          "Function-like macros are powerful but dangerous. In my Barrackpore CNAT classes, I show the 'SQUARE(i++)' example – students are shocked when i increments twice. Rule of thumb: use macros only for simple, side-effect-free expressions. For anything else, use inline functions. And always, always run 'gcc -E' to see what the preprocessor actually produces. Remember the story of Swadeep who spent 3 hours debugging a macro that evaluated his function call twice!"
        } />

        {/* FAQ */}
        <FAQTemplate title="Function-like Macros – FAQs" questions={questions} />

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p>💡 Pro tip: When in doubt, write an inline function. Modern compilers inline better than macros and are typesafe.</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-slide-up {
            animation: none !important;
            opacity: 1;
            transform: translateY(0);
          }
        }
        .list-checkmark li::before {
          content: "✓ ";
          color: #10b981;
          font-weight: bold;
        }
        .list-checkmark {
          list-style: none;
          padding-left: 0;
        }
        .list-checkmark li {
          padding-left: 1.25rem;
          position: relative;
        }
        .list-checkmark li::before {
          position: absolute;
          left: 0;
        }
      `}</style>
    </div>
  );
};

export default Topic2;