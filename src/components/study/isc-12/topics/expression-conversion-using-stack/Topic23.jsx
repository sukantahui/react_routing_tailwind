import React from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import postfixToInfixRulesJava from "./topic23_files/PostfixToInfixRules.java?raw";
import questions from "./topic23_files/topic23_questions";

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

export default function Topic23() {
  const javaCode = typeof postfixToInfixRulesJava === 'string'
    ? postfixToInfixRulesJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rules for Postfix to Infix Conversion
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Reverse the process: convert postfix expressions back to infix using a stack.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Convert Postfix to Infix?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                While postfix notation is excellent for machine evaluation, humans often need to read expressions
                in the familiar infix form. Converting postfix back to infix is useful in:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Debugging</strong> – understanding the meaning of a postfix expression.</li>
                <li><strong>Code generation</strong> – compilers may produce postfix and then convert to infix for output.</li>
                <li><strong>Educational purposes</strong> – to verify the correctness of the conversion algorithm.</li>
              </ul>
              <p>
                The conversion uses a stack of strings. The algorithm is the inverse of the evaluation process:
                instead of popping operands and computing a value, we pop operand strings and combine them with the operator
                to form a new infix substring, which we push back onto the stack.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Postfix‑to‑infix conversion is essentially
                  the same as evaluation, but we operate on strings rather than numeric values.
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
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 2: Scan Postfix Left to Right</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Process each token in the postfix expression in order.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 3: Operand → Push</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  If the token is an operand (letter, number, or variable), push it onto the stack as a string.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Example: For <code>A</code>, push <code>"A"</code>.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 4: Operator → Pop, Combine, Push</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  When an operator is encountered:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>Pop the top operand (right operand) from the stack.</li>
                  <li>Pop the next operand (left operand) from the stack.</li>
                  <li>Create a new string: <code>"(" + left + operator + right + ")"</code>.</li>
                  <li>Push the resulting string back onto the stack.</li>
                </ul>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  The parentheses ensure the correct precedence in the final infix expression.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 5: Final Result</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  After processing all tokens, the stack should contain exactly one string – the fully parenthesised
                  infix expression. Pop and return it.
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
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 1: <code>AB+</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Step 1:</span> Scan 'A' → push <code>["A"]</code></p>
                  <p><span className="font-medium">Step 2:</span> Scan 'B' → push <code>["A", "B"]</code></p>
                  <p><span className="font-medium">Step 3:</span> Scan '+' → pop B, pop A, combine <code>"(A+B)"</code> → push → stack <code>["(A+B)"]</code></p>
                  <p><span className="font-medium">Result:</span> <code>(A+B)</code></p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 2: <code>ABC*+</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Step 1:</span> A → <code>["A"]</code></p>
                  <p><span className="font-medium">Step 2:</span> B → <code>["A", "B"]</code></p>
                  <p><span className="font-medium">Step 3:</span> C → <code>["A", "B", "C"]</code></p>
                  <p><span className="font-medium">Step 4:</span> * → pop C, pop B → <code>"(B*C)"</code> → push → <code>["A", "(B*C)"]</code></p>
                  <p><span className="font-medium">Step 5:</span> + → pop "(B*C)", pop A → <code>"(A+(B*C))"</code> → push</p>
                  <p><span className="font-medium">Result:</span> <code>(A+(B*C))</code></p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 3: <code>AB+C*</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Step 1:</span> A → <code>["A"]</code></p>
                  <p><span className="font-medium">Step 2:</span> B → <code>["A", "B"]</code></p>
                  <p><span className="font-medium">Step 3:</span> + → <code>"(A+B)"</code> → push → <code>["(A+B)"]</code></p>
                  <p><span className="font-medium">Step 4:</span> C → <code>["(A+B)", "C"]</code></p>
                  <p><span className="font-medium">Step 5:</span> * → pop C, pop "(A+B)" → <code>"((A+B)*C)"</code> → push</p>
                  <p><span className="font-medium">Result:</span> <code>((A+B)*C)</code></p>
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
              <li><strong>Expression pretty‑printing</strong> – converting postfix bytecode to human‑readable form.</li>
              <li><strong>Debugging compilers</strong> – when an internal representation is postfix, converting to infix helps diagnose issues.</li>
              <li><strong>Educational tools</strong> – to show the relationship between notations.</li>
              <li><strong>Spreadsheet formulas</strong> – some internal representations use postfix and need to be displayed as infix.</li>
            </ul>
            <div className="mt-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm">
                <span className="font-medium">🏫 Classroom story:</span> Swadeep from Ichapur was debugging his calculator
                app and used postfix‑to‑infix to verify the output – he found it extremely helpful.
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
              <li>Use <code>StringBuilder</code> for efficiency when building long strings.</li>
              <li>Always enclose the combined expression in parentheses to preserve precedence.</li>
              <li>Be careful about the order: pop right operand first, then left.</li>
              <li>For multi‑character operands, ensure proper tokenisation.</li>
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
              <li>Swapping the order of operands – left and right must be correct.</li>
              <li>Forgetting to add parentheses – results in ambiguous infix.</li>
              <li>Not handling spaces in the input – tokenisation is crucial.</li>
              <li>Assuming only single‑character operands – the algorithm works for any string.</li>
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
              <li>Write a clean function that takes a postfix string and returns an infix string.</li>
              <li>Use a <code>Deque</code> or <code>Stack</code> for the operand stack.</li>
              <li>Handle multi‑character operands by splitting on whitespace.</li>
              <li>Add unit tests covering single, binary, and nested operations.</li>
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
                "I know the order of popping operands.",
                "I understand why parentheses are needed.",
                "I can trace the algorithm on simple examples.",
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
              <li>Why is the right operand popped first?</li>
              <li>What would happen if we didn't add parentheses?</li>
              <li>How would you handle multi‑character operands?</li>
              <li>Try converting <code>AB+C*</code> manually and compare with the rule.</li>
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
                title="PostfixToInfixRules.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program implements the postfix‑to‑infix conversion with trace output.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Postfix‑to‑infix is a nice mirror of evaluation. I emphasise to students that the stack now holds strings instead of numbers. The parentheses are essential – they preserve precedence. Practice with expressions that have multiple operators to see the nesting."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Postfix to Infix – FAQs"
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