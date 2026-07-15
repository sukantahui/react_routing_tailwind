import React from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import prefixToInfixRulesJava from "./topic27_files/PrefixToInfixRules.java?raw";
import questions from "./topic27_files/topic27_questions";

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

export default function Topic27() {
  const javaCode = typeof prefixToInfixRulesJava === 'string'
    ? prefixToInfixRulesJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rules for Prefix to Infix Conversion
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Transform prefix expressions back to human‑readable infix using a stack.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Convert Prefix to Infix?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                While prefix notation is excellent for machine evaluation (it eliminates parentheses and precedence),
                humans prefer the familiar infix form. Converting prefix to infix is useful in:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Debugging</strong> – understanding the meaning of a prefix expression.</li>
                <li><strong>Code generation</strong> – some compilers use prefix internally and need to output infix.</li>
                <li><strong>Educational purposes</strong> – to verify the correctness of the conversion algorithm.</li>
              </ul>
              <p>
                The conversion uses a stack of strings, similar to postfix‑to‑infix conversion, but with one key difference:
                <strong>we scan the prefix expression from right to left</strong>.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Prefix is evaluated from right to left, so we
                  scan in that direction and combine operands in the correct order.
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
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 2: Scan from Right to Left</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Process each token in the prefix expression from <strong>right to left</strong>.
                  This is the key difference from postfix‑to‑infix conversion.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 3: Operand → Push</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  If the token is an operand (letter, number, or variable), push it onto the stack as a string.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 4: Operator → Pop, Combine, Push</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  When an operator is encountered:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>Pop the <strong>left</strong> operand from the stack (this is the first operand).</li>
                  <li>Pop the <strong>right</strong> operand from the stack (this is the second operand).</li>
                  <li>Create a new string: <code>"(" + left + operator + right + ")"</code>.</li>
                  <li>Push the resulting string back onto the stack.</li>
                </ul>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Note: In prefix, the operator is followed by the left operand, then the right operand.
                  So when we pop from the stack (which is in reverse order), the first popped is the left operand,
                  and the second is the right operand.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 5: Final Result</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  After processing all tokens (right to left), the stack should contain exactly one string –
                  the fully parenthesised infix expression. Pop and return it.
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
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 1: <code>+ A B</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Step 1:</span> Scan from right: 'B' → push <code>["B"]</code></p>
                  <p><span className="font-medium">Step 2:</span> Scan 'A' → push <code>["B", "A"]</code></p>
                  <p><span className="font-medium">Step 3:</span> Scan '+' → pop A (left), pop B (right), combine <code>"(A+B)"</code> → push</p>
                  <p><span className="font-medium">Result:</span> <code>(A+B)</code></p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 2: <code>+ A * B C</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Step 1:</span> Scan from right: 'C' → push <code>["C"]</code></p>
                  <p><span className="font-medium">Step 2:</span> Scan 'B' → push <code>["C", "B"]</code></p>
                  <p><span className="font-medium">Step 3:</span> Scan '*' → pop B (left), pop C (right) → <code>"(B*C)"</code> → push → <code>["(B*C)"]</code></p>
                  <p><span className="font-medium">Step 4:</span> Scan 'A' → push <code>["(B*C)", "A"]</code></p>
                  <p><span className="font-medium">Step 5:</span> Scan '+' → pop A (left), pop (B*C) (right) → <code>"(A+(B*C))"</code> → push</p>
                  <p><span className="font-medium">Result:</span> <code>(A+(B*C))</code></p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 3: <code>* + A B C</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Step 1:</span> 'C' → push <code>["C"]</code></p>
                  <p><span className="font-medium">Step 2:</span> 'B' → push <code>["C", "B"]</code></p>
                  <p><span className="font-medium">Step 3:</span> 'A' → push <code>["C", "B", "A"]</code></p>
                  <p><span className="font-medium">Step 4:</span> '+' → pop A (left), pop B (right) → <code>"(A+B)"</code> → push → <code>["C", "(A+B)"]</code></p>
                  <p><span className="font-medium">Step 5:</span> '*' → pop (A+B) (left), pop C (right) → <code>"((A+B)*C)"</code> → push</p>
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
              <li><strong>Lisp interpreters</strong> – Lisp code is prefix; sometimes it's displayed to users as infix.</li>
              <li><strong>Compiler debugging</strong> – when an internal representation is prefix, converting to infix helps diagnose issues.</li>
              <li><strong>Educational tools</strong> – to show the relationship between notations.</li>
              <li><strong>Expression pretty‑printing</strong> – making machine‑readable code human‑friendly.</li>
            </ul>
            <div className="mt-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm">
                <span className="font-medium">🏫 Classroom story:</span> Abhronila from Naihati was surprised to learn
                that her Lisp code was actually prefix – and that she could convert it to infix using this algorithm.
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
              <li>Always scan from <strong>right to left</strong> – this is the critical difference from postfix conversion.</li>
              <li>The first popped operand is the <strong>left</strong> operand; the second is the <strong>right</strong> operand.</li>
              <li>Parentheses are essential for preserving precedence – never skip them.</li>
              <li>Tokenise the prefix expression on spaces to handle multi‑character operands.</li>
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
              <li>Scanning from left to right (as in postfix) – must scan from right to left.</li>
              <li>Swapping the order of operands – left operand is popped first, then right.</li>
              <li>Forgetting to wrap the combined expression in parentheses.</li>
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
              <li>Write a clean, well‑commented function with clear variable names.</li>
              <li>Use a <code>Deque</code> or <code>Stack</code> from the Java Collections Framework.</li>
              <li>Validate input to avoid stack underflow.</li>
              <li>Add unit tests for various prefix expressions.</li>
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
                "I know to scan from right to left.",
                "I know the correct order of popping operands.",
                "I understand why parentheses are needed.",
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
              <li>Why do we scan prefix from right to left?</li>
              <li>What would happen if we scanned from left to right?</li>
              <li>How does the operand order differ from postfix conversion?</li>
              <li>Try converting <code>+ A * B C</code> manually and compare with the rule.</li>
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
                title="PrefixToInfixRules.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program implements prefix‑to‑infix conversion with trace output.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Prefix‑to‑infix is a mirror of postfix‑to‑infix. I tell my students in Barrackpore: 'Just like you read a sentence from right to left, you scan prefix from right to left.' The key is the order of operands – first popped is left, second is right. Practice with examples to build intuition."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Prefix to Infix – FAQs"
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