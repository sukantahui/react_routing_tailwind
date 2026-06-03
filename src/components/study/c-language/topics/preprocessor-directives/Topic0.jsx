// Topic0.jsx (corrected animations – no opacity-0, valid Tailwind classes)
import React from 'react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic0_files/example1.c?raw";
import example2 from "./topic0_files/example2.c?raw";
import example3 from "./topic0_files/example3.c?raw";

const Topic0 = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section – animated */}
        <section className="space-y-4 animate-fade-slide-up [animation-delay:0s]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            C Preprocessor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            What it does and when it runs (before compilation)
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </section>

        {/* Theory Section – staggered */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">What is the C Preprocessor?</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <p className="mb-3">
              The <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">C preprocessor</code> is a <strong>text substitution tool</strong> that runs <strong>before</strong> the actual compilation begins. It processes directives that start with <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">#</code> and transforms the source code by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Including header files (<code>#include</code>)</li>
              <li>Defining and expanding macros (<code>#define</code>)</li>
              <li>Conditionally compiling code (<code>#ifdef</code>, <code>#if</code>)</li>
              <li>Generating errors (<code>#error</code>)</li>
              <li>Controlling line information (<code>#line</code>)</li>
            </ul>
            <p className="mt-4 text-blue-600 dark:text-blue-400 font-medium">
              💡 The preprocessor doesn't understand C syntax — it performs pure text manipulation!
            </p>
          </div>
        </section>

        {/* When Preprocessor Runs - SVG Flow */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">When Does It Run? (Build Pipeline)</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Step 1 */}
              <div className="group flex-1 text-center p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-2xl font-bold text-blue-700 dark:text-blue-300 group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <p className="mt-2 font-semibold">Source.c</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your code with #directives</p>
                <svg className="w-full h-8 mt-2" viewBox="0 0 100 30">
                  <path d="M10,15 L90,15" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" fill="none">
                    <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                  </path>
                  <polygon points="90,10 100,15 90,20" fill="#3b82f6">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                  </polygon>
                </svg>
              </div>
              {/* Step 2 */}
              <div className="group flex-1 text-center p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-2xl font-bold text-purple-700 dark:text-purple-300 group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <p className="mt-2 font-semibold">Preprocessor (cpp)</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Textual transformation</p>
                <svg className="w-full h-8 mt-2" viewBox="0 0 100 30">
                  <path d="M10,15 L90,15" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" fill="none">
                    <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                  </path>
                  <polygon points="90,10 100,15 90,20" fill="#8b5cf6" />
                </svg>
              </div>
              {/* Step 3 */}
              <div className="group flex-1 text-center p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-2xl font-bold text-green-700 dark:text-green-300 group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <p className="mt-2 font-semibold">Expanded.i</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pure C code (no directives)</p>
                <svg className="w-full h-8 mt-2" viewBox="0 0 100 30">
                  <path d="M10,15 L90,15" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" fill="none">
                    <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                  </path>
                  <polygon points="90,10 100,15 90,20" fill="#10b981" />
                </svg>
              </div>
              {/* Step 4 */}
              <div className="group flex-1 text-center p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-2xl font-bold text-orange-700 dark:text-orange-300 group-hover:scale-110 transition-transform duration-300">
                  4
                </div>
                <p className="mt-2 font-semibold">Compiler</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Generates object code</p>
              </div>
            </div>
            <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
              ⚡ <strong>Command to see preprocessor output:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">gcc -E source.c -o expanded.i</code>
            </p>
          </div>
        </section>

        {/* Key Operations with Hover Cards */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Key Operations Performed by Preprocessor</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">📄 File Inclusion</h3>
              <p className="mt-2">Copies content of <code>#include &lt;file&gt;</code> or <code>"file"</code> into source.</p>
              <code className="block mt-3 bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">#include &lt;stdio.h&gt;</code>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">🔁 Macro Expansion</h3>
              <p className="mt-2">Replaces macro identifiers with their definitions.</p>
              <code className="block mt-3 bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">#define PI 3.14159 → PI becomes 3.14159</code>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">🚦 Conditional Compilation</h3>
              <p className="mt-2">Includes/excludes code based on conditions.</p>
              <code className="block mt-3 bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">#ifdef DEBUG ... #endif</code>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">⚠️ Error & Line Control</h3>
              <p className="mt-2"><code>#error</code> stops compilation, <code>#line</code> changes line numbers.</p>
            </div>
          </div>
        </section>

        {/* Live Code Examples */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Live Code Examples</h2>
          <EditableCCodeBlock title="Example 1: Basic macro & header inclusion" initialCode={example1} />
          <EditableCCodeBlock title="Example 2: Conditional compilation (debug vs release)" initialCode={example2} />
          <EditableCCodeBlock title="Example 3: #error and #line usage" initialCode={example3} />
        </section>

        {/* Common Pitfalls */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-5 rounded-r-xl space-y-2">
            <li><strong>Forgetting #include guards</strong> → multiple inclusion errors.</li>
            <li><strong>Macro side effects:</strong> <code>#define SQUARE(x) x*x</code> → <code>SQUARE(1+2)</code> expands to <code>1+2*1+2 = 5</code>, not 9.</li>
            <li><strong>No semicolon in #define</strong> but misuse in code.</li>
            <li><strong>Assuming preprocessor understands C types</strong> → it doesn't; it's pure text.</li>
            <li><strong>Using #define instead of const for constants</strong> (less type safety).</li>
          </ul>
        </section>

        {/* Best Practices & Checklist */}
        <section className="space-y-5 animate-fade-slide-up [animation-delay:0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">✅ Best Practices & Checklist</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <ul className="space-y-2 list-checkmark">
              <li>✔ Always wrap macro arguments in parentheses: <code>#define SQUARE(x) ((x)*(x))</code></li>
              <li>✔ Use <code>const</code> instead of <code>#define</code> for constants when possible.</li>
              <li>✔ Uppercase macro names to distinguish from functions.</li>
              <li>✔ Run <code>gcc -E</code> to debug macro expansions.</li>
              <li>✔ Include guards: <code>#ifndef HEADER_H ... #endif</code> or <code>#pragma once</code>.</li>
              <li>✔ Avoid side effects in macro arguments (e.g., <code>MAX(i++, j++)</code>).</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl">
            <p className="font-bold">📌 Mini Checklist for Students:</p>
            <ul className="mt-2 space-y-1">
              <li>□ Do I understand that preprocessor runs BEFORE compilation?</li>
              <li>□ Can I identify #include, #define, #ifdef in code?</li>
              <li>□ Do I know how to see preprocessor output?</li>
              <li>□ Have I used parentheses in function-like macros?</li>
            </ul>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher note={
          "The preprocessor is like a 'text robot' that modifies your code before the compiler sees it. I always tell my students in Barrackpore CNAT: run 'gcc -E' at least once to demystify macros. Practice with simple #define and watch how it replaces text. For Naihati CNAT batch, remember: the preprocessor doesn't know about types, so use 'const' for type safety. Twice as many bugs come from macro side effects!"
        } />

        {/* FAQ Section */}
        <FAQTemplate title="C Preprocessor FAQs" questions={questions} />

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p>💡 Pro tip: Always inspect preprocessed output when macros behave unexpectedly.</p>
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

export default Topic0;