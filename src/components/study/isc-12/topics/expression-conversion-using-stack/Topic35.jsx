import React from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import postfixToPrefixRulesJava from "./topic35_files/PostfixToPrefixRules.java?raw";
import questions from "./topic35_files/topic35_questions";

// Inline keyframes
const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeUp { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  @media (prefers-reduced-motion: reduce) {
    .animate-fadeUp { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

export default function Topic35() {
  const javaCode = typeof postfixToPrefixRulesJava === 'string'
    ? postfixToPrefixRulesJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rules for Postfix to Prefix Conversion
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Transform postfix expressions into prefix notation using a stack.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Convert Postfix to Prefix?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Postfix and prefix are both machine‑friendly notations. Converting between them is useful in:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Compiler design</strong> – some intermediate representations use postfix, others use prefix.</li>
                <li><strong>Expression evaluation</strong> – you may receive postfix input but prefer to evaluate using a prefix algorithm.</li>
                <li><strong>Educational purposes</strong> – to understand the relationship between the two notations.</li>
              </ul>
              <p>
                The conversion uses a stack of strings. The key is to scan the postfix expression from <strong>left to right</strong>,
                push operands, and when an operator is encountered, pop the <strong>right</strong> operand first,
                then the <strong>left</strong> operand, and push <code>operator + " " + left + " " + right</code>.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Postfix‑to‑prefix is the mirror of prefix‑to‑postfix.
                  We scan left to right, and combine as <code>operator + left + right</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE RULES */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              The Rules – Step by Step
            </h2>
            <div className="mt-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 1: Initialize Stack</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Create an empty stack to hold strings (sub‑expressions).
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 2: Scan from Left to Right</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Process each token in the postfix expression from <strong>left to right</strong>.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 3: Operand → Push</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  If the token is an operand, push it onto the stack as a string.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 4: Operator → Pop, Combine, Push</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  When an operator is encountered:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>Pop the <strong>right</strong> operand from the stack (first pop).</li>
                  <li>Pop the <strong>left</strong> operand from the stack (second pop).</li>
                  <li>Create a new string: <code>operator + " " + left + " " + right</code> (prefix order).</li>
                  <li>Push the resulting string back onto the stack.</li>
                </ul>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Note: In postfix, the operator is after the operands. When processing left to right, the last pushed operands are the rightmost ones. So the first popped is the right operand, the second is the left. The prefix order is operator, left, right.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 5: Final Result</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  After processing all tokens, the stack should contain exactly one string – the prefix expression. Pop and return it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED EXAMPLES */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example Traces
            </h2>
            <div className="mt-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 1: <code>A B +</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Step 1:</span> Scan 'A' → push <code>["A"]</code></p>
                  <p><span className="font-medium">Step 2:</span> Scan 'B' → push <code>["A", "B"]</code></p>
                  <p><span className="font-medium">Step 3:</span> Scan '+' → pop B (right), pop A (left) → combine <code>"+ A B"</code> → push</p>
                  <p><span className="font-medium">Result:</span> <code>+ A B</code></p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 2: <code>A B C * +</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Step 1:</span> A → push <code>["A"]</code></p>
                  <p><span className="font-medium">Step 2:</span> B → push <code>["A", "B"]</code></p>
                  <p><span className="font-medium">Step 3:</span> C → push <code>["A", "B", "C"]</code></p>
                  <p><span className="font-medium">Step 4:</span> * → pop C (right), pop B (left) → <code>"* B C"</code> → push → <code>["A", "* B C"]</code></p>
                  <p><span className="font-medium">Step 5:</span> + → pop "* B C" (right), pop A (left) → <code>"+ A * B C"</code> → push</p>
                  <p><span className="font-medium">Result:</span> <code>+ A * B C</code></p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 3: <code>A B + C *</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Step 1:</span> A → <code>["A"]</code></p>
                  <p><span className="font-medium">Step 2:</span> B → <code>["A", "B"]</code></p>
                  <p><span className="font-medium">Step 3:</span> + → pop B (right), pop A (left) → <code>"+ A B"</code> → push → <code>["+ A B"]</code></p>
                  <p><span className="font-medium">Step 4:</span> C → push → <code>["+ A B", "C"]</code></p>
                  <p><span className="font-medium">Step 5:</span> * → pop C (right), pop "+ A B" (left) → <code>"* + A B C"</code> → push</p>
                  <p><span className="font-medium">Result:</span> <code>* + A B C</code></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REAL‑WORLD USAGE */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Real‑World Usage
            </h2>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Compiler design</strong> – converting between intermediate representations.</li>
              <li><strong>Expression evaluation</strong> – you may have a postfix expression but a prefix evaluator.</li>
              <li><strong>Code generation</strong> – some code generators produce postfix, but the target architecture expects prefix.</li>
              <li><strong>Educational tools</strong> – to show the relationship between notations.</li>
            </ul>
            <div className="mt-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm">
                <span className="font-medium">🏫 Classroom story:</span> Tuhina from Shyamnagar was converting postfix
                to prefix for her compiler project and found this algorithm very helpful.
              </p>
            </div>
          </div>
        </section>

        {/* TIPS & TRICKS */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips &amp; Tricks
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Scan from <strong>left to right</strong>.</li>
              <li>Pop <strong>right</strong> operand first, then <strong>left</strong>.</li>
              <li>Combine as <code>operator + " " + left + " " + right</code>.</li>
              <li>Tokenise the postfix expression on spaces to handle multi‑character operands.</li>
            </ul>
          </div>
        </section>

        {/* COMMON PITFALLS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              ⚠️ Common Pitfalls
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Scanning from right to left (as in prefix conversion).</li>
              <li>Swapping the order of operands – remember: first pop is right, second is left.</li>
              <li>Combining in the wrong order – must be operator + left + right.</li>
              <li>Not handling spaces or multi‑character operands.</li>
            </ul>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-green-500 rounded-full"></span>
              ✅ Best Practices
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Write a clean, well‑commented function.</li>
              <li>Use a <code>Stack</code> or <code>Deque</code> for the operand stack.</li>
              <li>Validate input to avoid stack underflow.</li>
              <li>Add unit tests for various postfix expressions.</li>
            </ul>
          </div>
        </section>

        {/* MINI CHECKLIST */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              📋 Mini Checklist
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "I can explain the stack‑based conversion rules.",
                "I know to scan from left to right.",
                "I know the correct order of popping operands.",
                "I know the prefix order: operator, left, right.",
                "I can implement the conversion in Java.",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-indigo-500 text-xl">☐</span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HINT SECTION */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              🤔 Think About…
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Why do we scan postfix from left to right?</li>
              <li>What would happen if we scanned from right to left?</li>
              <li>How does the operand order differ from postfix‑to‑infix?</li>
              <li>Try converting <code>A B C * +</code> to prefix manually.</li>
            </ul>
          </div>
        </section>

        {/* JAVA CODE EXAMPLE */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-orange-500 rounded-full"></span>
              🖥️ Java Example
            </h2>
            <div className="mt-4">
              <JavaFileLoader
                fileModule={javaCode}
                title="PostfixToPrefixRules.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program implements postfix‑to‑prefix conversion with trace output.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Postfix‑to‑prefix is a key conversion that often confuses students because of the operand order. In Barrackpore, I tell them: 'Scan left to right, pop right first, then left, and combine as operator + left + right.' Practice with the examples to build confidence."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Postfix to Prefix – FAQs"
            questions={questions}
          />
        </div>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 • Expression Conversion Course • Barrackpore, India</p>
        </footer>
      </div>
    </div>
  );
}