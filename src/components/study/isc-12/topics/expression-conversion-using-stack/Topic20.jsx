import React from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import reverseSwapExampleJava from "./topic20_files/ReverseSwapExample.java?raw";
import questions from "./topic20_files/topic20_questions";

// Inline keyframes (motion‑safe)
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

export default function Topic20() {
  // Safeguard for Java import
  const javaCode = typeof reverseSwapExampleJava === 'string'
    ? reverseSwapExampleJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reverse and Parentheses Swapping Technique
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            The critical steps that make infix‑to‑prefix conversion work.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Reverse and Swap?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                The infix‑to‑prefix algorithm cleverly reuses the familiar infix‑to‑postfix algorithm by applying a
                <strong>mirror transformation</strong>. The two key steps are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Reversing</strong> the infix expression.</li>
                <li><strong>Swapping</strong> '(' and ')' in the reversed string.</li>
              </ul>
              <p>
                Why? Because prefix notation is effectively <strong>postfix evaluated from right to left</strong>.
                By reversing the expression and swapping parentheses, we turn the problem into a standard left‑to‑right
                postfix conversion. After applying the modified postfix algorithm (with no equal precedence pop), we
                reverse the result to obtain the prefix.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Reversing and swapping are the "mirror" that
                  allows us to reuse the postfix algorithm logic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REVERSING THE EXPRESSION */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Step 1: Reversing the Infix Expression
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                <strong>Why reverse?</strong> Prefix evaluation is done from right to left. By reversing the infix
                expression, we can process it from left to right (as we do in postfix) and then reverse the final output.
              </p>
              <p>
                <strong>How to reverse?</strong> Simply reverse the string order. For example:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li><code>A+B</code> → <code>B+A</code></li>
                <li><code>A+B*C</code> → <code>C*B+A</code></li>
                <li><code>(A+B)*C</code> → <code>C*(B+A)</code></li>
              </ul>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <p className="text-sm">
                  ⚠️ <span className="font-medium">Important:</span> Reversing alone is not enough – we must also swap parentheses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PARENTHESES SWAPPING */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Step 2: Swapping Parentheses
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                <strong>Why swap?</strong> After reversing, the nesting of parentheses is inverted. For example, in
                <code>(A+B)*C</code>, reversing gives <code>C*(B+A)</code>. Notice that the parentheses are now around
                <code>B+A</code>, which is fine. But for more complex nested expressions, the parentheses must be
                swapped to preserve the correct grouping.
              </p>
              <p>
                <strong>How to swap?</strong> Replace every <code>'('</code> with <code>')'</code> and vice versa.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li><code>C*(B+A)</code> → no change (no swap needed here).</li>
                <li><code>((A+B)*C)</code> → reverse → <code>(C*(B+A))</code> → swap → <code>)C*(B+A)(</code>? Wait, careful.</li>
              </ul>
              <p className="text-sm">
                Let's take a more illustrative example: <code>((A+B)*C)-D</code>. Reverse: <code>D-)C*(B+A((</code>.
                Swap parentheses: <code>D-(C*(B+A))</code>. Now the grouping is correct.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  💡 <span className="font-medium">Pro tip:</span> Swapping parentheses ensures that the algorithm sees
                  the correct structure after reversal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VISUALIZATION */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Visualizing the Transformation
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 700 200"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Visualization of reverse and swap"
              >
                <rect x="20" y="20" width="660" height="160" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="660" height="160" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                <text x="350" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">
                  Infix to Prefix: Reverse + Swap
                </text>

                {/* Original */}
                <text x="120" y="80" fontSize="14" fill="#0ea5e9" textAnchor="middle">Original</text>
                <rect x="60" y="90" width="120" height="30" rx="6" fill="#0ea5e9" opacity="0.15" />
                <text x="120" y="110" textAnchor="middle" fontSize="16" fill="#0ea5e9">(A+B)*C</text>

                {/* Arrow */}
                <line x1="180" y1="105" x2="220" y2="105" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Reversed */}
                <text x="280" y="80" fontSize="14" fill="#22c55e" textAnchor="middle">Reverse</text>
                <rect x="220" y="90" width="120" height="30" rx="6" fill="#22c55e" opacity="0.15" />
                <text x="280" y="110" textAnchor="middle" fontSize="16" fill="#22c55e">C*(B+A)</text>

                {/* Arrow */}
                <line x1="340" y1="105" x2="380" y2="105" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Swapped */}
                <text x="440" y="80" fontSize="14" fill="#f59e0b" textAnchor="middle">Swap ()</text>
                <rect x="380" y="90" width="120" height="30" rx="6" fill="#f59e0b" opacity="0.15" />
                <text x="440" y="110" textAnchor="middle" fontSize="16" fill="#f59e0b">C*(B+A)</text>

                {/* Final result */}
                <text x="560" y="80" fontSize="14" fill="#ec4899" textAnchor="middle">After Algorithm</text>
                <rect x="500" y="90" width="120" height="30" rx="6" fill="#ec4899" opacity="0.15" />
                <text x="560" y="110" textAnchor="middle" fontSize="16" fill="#ec4899">*+ABC</text>

                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              The expression goes through reverse, swap, then the modified postfix algorithm, and finally reverse again.
            </p>
          </div>
        </section>

        {/* DETAILED EXAMPLES */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Detailed Examples
            </h2>
            <div className="mt-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 1: Simple <code>A+B</code></h3>
                <div className="mt-2 text-sm space-y-1">
                  <p><span className="font-medium">Original:</span> <code>A+B</code></p>
                  <p><span className="font-medium">Reverse:</span> <code>B+A</code></p>
                  <p><span className="font-medium">Swap parentheses:</span> (none) → <code>B+A</code></p>
                  <p><span className="font-medium">Modified postfix output:</span> <code>BA+</code></p>
                  <p><span className="font-medium">Final reverse:</span> <code>+AB</code></p>
                  <p className="text-emerald-600 dark:text-emerald-400">✅ Result: <code>+AB</code></p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 2: With Parentheses <code>(A+B)*C</code></h3>
                <div className="mt-2 text-sm space-y-1">
                  <p><span className="font-medium">Original:</span> <code>(A+B)*C</code></p>
                  <p><span className="font-medium">Reverse:</span> <code>C*(B+A)</code></p>
                  <p><span className="font-medium">Swap parentheses:</span> <code>C*(B+A)</code> (no change)</p>
                  <p><span className="font-medium">Modified postfix output:</span> <code>CBA+*</code></p>
                  <p><span className="font-medium">Final reverse:</span> <code>*+ABC</code></p>
                  <p className="text-emerald-600 dark:text-emerald-400">✅ Result: <code>*+ABC</code></p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 3: Nested Parentheses <code>((A+B)*C)-D</code></h3>
                <div className="mt-2 text-sm space-y-1">
                  <p><span className="font-medium">Original:</span> <code>((A+B)*C)-D</code></p>
                  <p><span className="font-medium">Reverse:</span> <code>D-)C*(B+A((</code> (note the swapped parentheses)</p>
                  <p><span className="font-medium">Swap parentheses:</span> <code>D-(C*(B+A))</code></p>
                  <p><span className="font-medium">Modified postfix output:</span> <code>DCBA+*-</code></p>
                  <p><span className="font-medium">Final reverse:</span> <code>-*+ABCD</code></p>
                  <p className="text-emerald-600 dark:text-emerald-400">✅ Result: <code>-*+ABCD</code></p>
                </div>
              </div>
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
              <li>Always reverse the entire string, not just the operators.</li>
              <li>Swapping parentheses is crucial – skipping it will break the grouping.</li>
              <li>Remember that after reversal and swap, you apply the modified postfix algorithm.</li>
              <li>Use a <code>StringBuilder</code> for efficient reversal and swap.</li>
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
              <li>Forgetting to swap parentheses – leads to incorrect grouping.</li>
              <li>Reversing only the operators – must reverse the entire string.</li>
              <li>Mistaking the order of steps – always reverse first, then swap, then apply algorithm.</li>
              <li>Not handling edge cases like empty expressions.</li>
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
              <li>Write helper functions: <code>reverse()</code> and <code>swapParentheses()</code>.</li>
              <li>Test with expressions that have nested parentheses to verify swap logic.</li>
              <li>Use a debugger to inspect the reversed and swapped strings.</li>
              <li>Add comments explaining each step for maintainability.</li>
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
                "I can reverse an infix expression correctly.",
                "I can swap parentheses in a string.",
                "I understand why both steps are necessary.",
                "I can trace the transformation on a simple expression.",
                "I can implement these steps in code.",
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
              <li>What happens if you reverse without swapping parentheses?</li>
              <li>Why does swapping parentheses restore correct grouping?</li>
              <li>How would you handle multiple nested parentheses?</li>
              <li>Try reversing <code>(A+B)*(C-D)</code> manually and then swap.</li>
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
                title="ReverseSwapExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates the reversal and parenthesis‑swapping steps in isolation.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "I always emphasise that reversing and swapping are the 'mirror' trick that makes prefix conversion possible. I ask my students in Naihati to practice on paper with expressions containing multiple parentheses. The swap step is often overlooked – but it's essential. Use the examples above to illustrate."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Reverse and Parentheses Swapping – FAQs"
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