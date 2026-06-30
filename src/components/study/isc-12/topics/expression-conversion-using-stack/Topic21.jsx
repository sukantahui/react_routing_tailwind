import React from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import stepByStepExamplesJava from "./topic21_files/StepByStepExamples.java?raw";
import questions from "./topic21_files/topic21_questions";

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

export default function Topic21() {
  const javaCode = typeof stepByStepExamplesJava === 'string'
    ? stepByStepExamplesJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Step‑by‑Step Examples
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Tracing the complete infix‑to‑prefix conversion using reverse, swap, and modified postfix.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Understanding the Complete Process
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                The following examples walk through the full infix‑to‑prefix conversion algorithm step by step.
                Each example includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>The original infix expression.</li>
                <li>The reversed expression.</li>
                <li>The parenthesis‑swapped expression.</li>
                <li>A complete trace of the modified postfix algorithm with stack and output columns.</li>
                <li>The final reversed output, which is the prefix result.</li>
                <li>A key observation and a common mistake.</li>
              </ul>
              <p>
                The examples progress from simple to complex, covering precedence, parentheses, and right‑associativity.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Every step builds on the previous one – watch how the stack and output evolve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================ EXAMPLES ================================ */}

        {/* EXAMPLE 1: A + B */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example 1: <code>A + B</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">A+B → B+A</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">No parentheses → B+A</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">BA</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">BA+</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">BA+ → +AB</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">+AB</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The algorithm correctly transforms <code>A+B</code> to <code>+AB</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Forgetting the final reverse – would give <code>BA+</code>.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">+AB</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 2: A + B * C */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Example 2: <code>A + B * C</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">A+B*C → C*B+A</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">No parentheses → C*B+A</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop * (higher), push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB*</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB*A</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB*A+</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB*A+ → +A*BC</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">+A*BC</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Multiplication is processed before addition. Prefix: <code>+A*BC</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Some might output <code>*+ABC</code> (wrong order).
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">+A*BC</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 3: (A + B) * C */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Example 3: <code>(A + B) * C</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">(A+B)*C → C*(B+A)</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">C*(B+A) → no change</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">(</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">)</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA+</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">10</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA+*</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">11</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA+* → *+ABC</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">*+ABC</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Parentheses force addition first. Prefix: <code>*+ABC</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Forgetting to swap parentheses in nested expressions can break grouping.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">*+ABC</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 4: A * B + C * D */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Example 4: <code>A * B + C * D</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">A*B+C*D → D*C+B*A</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">No parentheses</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop * (higher), push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*B</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">* > +, push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*B</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*BA</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">10</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop *, pop +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*BA*+</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">11</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*BA*+ → +*AB*CD</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">+*AB*CD</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Multiplications are done first, then addition. Prefix: <code>+*AB*CD</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> The order of operands in prefix – <code>*AB</code> and <code>*CD</code> must be correct.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">+*AB*CD</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 5: A + B * C - D */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example 5: <code>A + B * C - D</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">A+B*C-D → D-C*B+A</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">No parentheses</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push -</td><td className="p-2 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">* > -, push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- *]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- *]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DCB</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop * (higher), then push + (equal precedence not popped for prefix)</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DCB*</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DCB*A</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">10</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop +, pop -</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DCB*A+-</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">11</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">DCB*A+- → -+A*BCD</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">-+A*BCD</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The algorithm produces <code>-+A*BCD</code>, which is <code>(A + (B*C)) - D</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Using postfix associativity would pop '-' when '+' is seen, leading to wrong output. Here we must NOT pop equal precedence.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">-+A*BCD</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 6: A ^ B ^ C (Right-Associative) */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Example 6: <code>A ^ B ^ C</code> (Right‑Associative)
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">A^B^C → C^B^A</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">No parentheses</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">^</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push ^</td><td className="p-2 border border-gray-200 dark:border-gray-700">[^]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[^]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">^</td><td className="p-2 border border-gray-200 dark:border-gray-700">^ is right‑assoc → DO NOT pop equal; push ^</td><td className="p-2 border border-gray-200 dark:border-gray-700">[^ ^]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[^ ^]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop ^, pop ^</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA^^</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA^^ → ^^ABC</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">^^ABC</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Because <code>^</code> is right‑associative, we do not pop equal precedence. The result is <code>^^ABC</code> = <code>A^(B^C)</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Treating <code>^</code> as left‑associative would produce <code>^A^BC</code> or similar, which is wrong.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">^^ABC</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 7: (A+B)*(C-D) */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Example 7: <code>(A+B)*(C-D)</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">(A+B)*(C-D) → (D-C)*(B+A)</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">(D-C)*(B+A) → (D-C)*(B+A) (no change)</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">(</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-2 border border-gray-200 dark:border-gray-700"></td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push -</td><td className="p-2 border border-gray-200 dark:border-gray-700">[( -]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[( -]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">)</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop -, discard (</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC-</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC-</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">(</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC-</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">10</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC-B</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">11</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC-B</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">12</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC-BA</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">13</td><td className="p-2 border border-gray-200 dark:border-gray-700">)</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC-BA+</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">14</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC-BA+*</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">15</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC-BA+* → *+AB-CD</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">*+AB-CD</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Two parenthesized groups, then multiplication. Prefix: <code>*+AB-CD</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Swapping parentheses incorrectly can break the nesting.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">*+AB-CD</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 8: A*(B+C)-D/E */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Example 8: <code>A * (B + C) - D / E</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">A*(B+C)-D/E → E/D-C+B*A</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">E/D-C+B*A → E/D-C+B*A (no change)</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">E</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">E</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">/</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push /</td><td className="p-2 border border-gray-200 dark:border-gray-700">[/]</td><td className="p-2 border border-gray-200 dark:border-gray-700">E</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[/]</td><td className="p-2 border border-gray-200 dark:border-gray-700">ED</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop / (higher), push -</td><td className="p-2 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-2 border border-gray-200 dark:border-gray-700">ED/</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-2 border border-gray-200 dark:border-gray-700">ED/C</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">+ and - equal precedence; do NOT pop. Push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">ED/C</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">ED/CB</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">10</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">* > + and -: pop +, pop -, push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">ED/CB+-</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">11</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">ED/CB+-A</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">12</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">ED/CB+-A*</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">13</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">ED/CB+-A* → -*A+BC/DE</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">-*A+BC/DE</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The algorithm correctly handles precedence: <code>*</code> before <code>/</code> and <code>+</code> before <code>-</code> with proper associativity. The result is <code>-*A+BC/DE</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> The order of operators in the final prefix can be confusing. Always double-check with the original expression.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">-*A+BC/DE</strong>
            </p>
          </div>
        </section>

        {/* ================================ END OF EXAMPLES ================================ */}

        {/* TIPS & TRICKS */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips for Tracing
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always write down the reversed and swapped expressions.</li>
              <li>Remember: In the modified postfix step, equal precedence is <strong>not</strong> popped.</li>
              <li>Use the stack visualisation from Topic19 to verify your traces.</li>
              <li>Practice with different expressions to build confidence.</li>
            </ul>
          </div>
        </section>

        {/* COMMON PITFALLS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              ⚠️ Common Pitfalls Recap
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Forgetting to reverse the expression.</li>
              <li>Not swapping parentheses in the reversed string.</li>
              <li>Using postfix associativity (popping equal precedence).</li>
              <li>Forgetting the final reverse.</li>
              <li>Mis‑ordering operands in the final prefix.</li>
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
              <li>Write a trace function to debug your conversion code.</li>
              <li>Test with a variety of expressions (simple, with parentheses, with ^).</li>
              <li>Use the interactive tool to validate your manual traces.</li>
              <li>Document each step in comments for clarity.</li>
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
                "I can trace the full algorithm on examples.",
                "I understand the role of reverse and swap.",
                "I know not to pop equal precedence.",
                "I can identify common mistakes.",
                "I can apply the algorithm to complex expressions.",
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
              <li>Why is the reversed expression needed?</li>
              <li>What happens if we don't swap parentheses?</li>
              <li>How does the stack change when processing parentheses?</li>
              <li>Try converting <code>A-B-C</code> using the algorithm and compare with <code>--ABC</code>.</li>
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
                title="StepByStepExamples.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates the conversion with trace output for each example.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "These examples are the core of teaching the algorithm. I encourage students in Barrackpore to trace each one on paper before looking at the solution. The key is to internalise the pattern: reverse, swap, modified postfix, reverse. The most common error is forgetting the final reverse – a simple but costly mistake."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Step-by-Step Examples – FAQs"
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