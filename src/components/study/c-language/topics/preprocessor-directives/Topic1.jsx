// Topic1.jsx
import React from 'react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic1_files/example1.c?raw";
import example2 from "./topic1_files/example2.c?raw";
import example3 from "./topic1_files/example3.c?raw";
import example4 from "./topic1_files/example4.c?raw";

const Topic1 = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-4 animate-fade-slide-up [animation-delay:0s]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
            Symbolic Constants: #define vs const
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            When to use #define and when to use const – trade-offs, best practices, and type safety
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
        </section>

        {/* Theory: What are symbolic constants? */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">What Are Symbolic Constants?</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <p className="mb-3">
              Symbolic constants give meaningful names to fixed values (like <code>PI</code>, <code>MAX_USERS</code>, <code>BUFFER_SIZE</code>). 
              In C, there are two primary ways:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>#define preprocessor macro</strong>: textual substitution before compilation.</li>
              <li><strong>const qualifier</strong>: a typed, read-only variable evaluated at compile time or runtime.</li>
            </ul>
            <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
              💡 Choosing between them affects type safety, debugging, scope, and memory usage.
            </p>
          </div>
        </section>

        {/* Comparison Table with Hover Cards */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">#define vs const – Side by Side</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">#define PI 3.14159</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>✅ No runtime memory (pure text replacement)</li>
                <li>✅ Can be used in preprocessor directives (#if)</li>
                <li>✅ Works for array sizes in C89/C90</li>
                <li>❌ No type checking</li>
                <li>❌ Debugging harder (symbol not in debug info)</li>
                <li>❌ No scope – global from definition to #undef</li>
                <li>❌ Side effects with expressions</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">const double PI = 3.14159;</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>✅ Type checked by compiler</li>
                <li>✅ Debugger shows variable name & value</li>
                <li>✅ Obey scoping rules (block, file, global)</li>
                <li>✅ Can be used with pointers and complex types</li>
                <li>❌ May consume memory (unless optimized out)</li>
                <li>❌ Not usable in #if directives</li>
                <li>❌ In C (not C++), const is not a compile-time constant by default</li>
              </ul>
            </div>
          </div>
        </section>

        {/* When to Use Which - Flowchart SVG */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">Decision Guide: #define or const?</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <svg viewBox="0 0 800 300" className="w-full h-auto" aria-label="Decision flowchart for #define vs const">
              <rect x="300" y="20" width="200" height="40" rx="20" fill="#3b82f6" className="dark:fill-blue-700" />
              <text x="400" y="45" textAnchor="middle" fill="white" fontSize="14">Do you need a constant?</text>
              <path d="M400,60 L400,90" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)" />
              <polygon points="390,80 400,100 410,80" fill="#333" />
              <rect x="250" y="100" width="300" height="40" rx="10" fill="#f59e0b" className="dark:fill-amber-700" />
              <text x="400" y="125" textAnchor="middle" fill="white" fontSize="14">Must it be used in #if / array size (C89)?</text>
              <path d="M400,140 L400,170" stroke="#333" strokeWidth="2" />
              <rect x="280" y="170" width="240" height="40" rx="10" fill="#10b981" className="dark:fill-green-700" />
              <text x="400" y="195" textAnchor="middle" fill="white" fontSize="14">YES → Use #define</text>
              <path d="M520,120 L620,120 L620,190 L530,190" stroke="#333" strokeWidth="2" fill="none" />
              <rect x="550" y="170" width="240" height="40" rx="10" fill="#ef4444" className="dark:fill-red-700" />
              <text x="670" y="195" textAnchor="middle" fill="white" fontSize="14">NO → Use const (preferred)</text>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#333" />
                </marker>
              </defs>
            </svg>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
              💡 <strong>Modern C (C99+):</strong> Use <code>const</code> for type safety, <code>#define</code> only when required by preprocessor logic.
            </p>
          </div>
        </section>

        {/* Live Code Examples */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">Code Examples</h2>
          <EditableCCodeBlock title="Example 1: #define for array size & preprocessor" initialCode={example1} />
          <EditableCCodeBlock title="Example 2: const for type-safe constants" initialCode={example2} />
          <EditableCCodeBlock title="Example 3: const vs #define pointer differences" initialCode={example3} />
          <EditableCCodeBlock title="Example 4: Mixing both – best practices" initialCode={example4} />
        </section>

        {/* Common Pitfalls */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4">⚠️ Common Pitfalls</h2>
          <ul className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-5 rounded-r-xl space-y-2">
            <li><strong>Macro without parentheses:</strong> <code>#define TWICE(x) 2*x</code> → <code>TWICE(1+2)</code> = 2*1+2 = 4, not 6.</li>
            <li><strong>Assuming const is compile-time constant in C:</strong> In C, <code>const int size = 10; int arr[size];</code> is invalid in C89, valid only in C99+ (VLA).</li>
            <li><strong>Redefining macros without #undef:</strong> Causes warnings/errors.</li>
            <li><strong>Using #define for strings with side effects:</strong> <code>#define MSG "Hello";</code> trailing semicolon breaks.</li>
            <li><strong>Forgetting that const variables have scope:</strong> A const in a function is not global.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">✅ Best Practices & Checklist</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <ul className="space-y-2 list-checkmark">
              <li>✔ Prefer <code>const</code> over <code>#define</code> for constants with types.</li>
              <li>✔ Use uppercase names for macros, camelCase or lowercase for <code>const</code> variables (convention).</li>
              <li>✔ Always wrap macro bodies and arguments in parentheses.</li>
              <li>✔ Use <code>static const</code> at file scope to limit visibility.</li>
              <li>✔ For true compile-time constants in C (array sizes, bit masks), use <code>enum</code> or <code>#define</code>.</li>
              <li>✔ Debug: <code>gcc -E</code> to see macro expansion, and use debugger for const variables.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
            <p className="font-bold">📌 Mini Checklist for Students:</p>
            <ul className="mt-2 space-y-1">
              <li>□ Do I understand the difference between compile-time text substitution and typed variables?</li>
              <li>□ Can I explain why <code>#define SQUARE(x) x*x</code> fails for <code>SQUARE(1+2)</code>?</li>
              <li>□ Do I know that <code>const</code> in C is not a true constant for array sizes in older standards?</li>
              <li>□ Have I used <code>gcc -E</code> to inspect macro expansions?</li>
            </ul>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher note={
          "Students often think '#define' and 'const' are interchangeable. In my Barrackpore CNAT classes, I show them a simple bug: #define AREA(l,b) l*b vs const int area = l*b; The macro fails with expressions. For Naihati CNAT batch, remember: use 'const' by default, '#define' only when necessary for preprocessor directives or array sizes in legacy C. Also, run 'gcc -E' to see the truth!"
        } />

        {/* FAQ */}
        <FAQTemplate title="#define vs const – FAQs" questions={questions} />

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p>💡 Pro tip: When in doubt, use <code>const</code> – it's safer and more readable. Reserve <code>#define</code> for conditional compilation and true preprocessor needs.</p>
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

export default Topic1;