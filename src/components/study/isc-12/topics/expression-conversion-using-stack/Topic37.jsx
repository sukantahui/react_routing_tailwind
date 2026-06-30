import React from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import postfixToPrefixExamplesJava from "./topic37_files/PostfixToPrefixExamples.java?raw";
import questions from "./topic37_files/topic37_questions";

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

export default function Topic37() {
  const javaCode = typeof postfixToPrefixExamplesJava === 'string'
    ? postfixToPrefixExamplesJava
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
            Detailed traces of postfix‑to‑prefix conversion using a stack of strings.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Understanding the Algorithm
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                The postfix‑to‑prefix algorithm is a straightforward stack‑based transformation. We scan the postfix
                expression from <strong>left to right</strong>, pushing operands onto a stack. When an operator is
                encountered, we pop two operands (first popped is the <strong>right</strong> operand, second is the
                <strong>left</strong>), combine them in prefix order (<code>operator + " " + left + " " + right</code>),
                and push the result back.
              </p>
              <p>
                The examples below show the stack evolution at each step, allowing you to visualise how the prefix
                expression is built from the operands upward.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> The combination order is the only difference from
                  postfix‑to‑infix – here we build prefix (operator, left, right) instead of infix.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================ EXAMPLES ================================ */}

        {/* EXAMPLE 1: A B + */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example 1: <code>A B +</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop B (right), Pop A (left) → + A B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A B]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The final stack contains exactly one element: <code>+ A B</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Popping in wrong order – first popped is right operand.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">+ A B</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 2: A B C * + */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Example 2: <code>A B C * +</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push A</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B, C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C (right), Pop B (left) → * B C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, * B C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop * B C (right), Pop A (left) → + A * B C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A * B C]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The algorithm correctly builds <code>+ A * B C</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Forgetting that the combination order is operator + left + right.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">+ A * B C</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 3: A B + C * */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Example 3: <code>A B + C *</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push A</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop B (right), Pop A (left) → + A B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A B, C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C (right), Pop + A B (left) → * + A B C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* + A B C]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The expression <code>* + A B C</code> is correctly built.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Forgetting that the first popped is the right operand.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">* + A B C</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 4: A B * C D * + */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Example 4: <code>A B * C D * +</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push A</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop B (right), Pop A (left) → * A B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* A B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* A B, C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* A B, C, D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop D (right), Pop C (left) → * C D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* A B, * C D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop * C D (right), Pop * A B (left) → + * A B * C D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ * A B * C D]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Two multiplications are computed, then added. Result: <code>+ * A B * C D</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Mixing up the order of the two products when combining.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">+ * A B * C D</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 5: A B C * + D - */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example 5: <code>A B C * + D -</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push A</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B, C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C (right), Pop B (left) → * B C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, * B C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop * B C (right), Pop A (left) → + A * B C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A * B C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A * B C, D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop D (right), Pop + A * B C (left) → - + A * B C D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- + A * B C D]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The expression <code>- + A * B C D</code> is correctly built.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Mis‑ordering the operands for subtraction.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">- + A * B C D</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 6: A B ^ C ^ */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Example 6: <code>A B ^ C ^</code> (Exponentiation)
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push A</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">^</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop B (right), Pop A (left) → ^ A B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[^ A B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[^ A B, C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">^</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C (right), Pop ^ A B (left) → ^ ^ A B C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[^ ^ A B C]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The prefix <code>^ ^ A B C</code> corresponds to <code>((A^B)^C)</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Assuming the algorithm changes associativity – it simply follows the postfix order.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">^ ^ A B C</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 7: A B + C D - * */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Example 7: <code>A B + C D - *</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push A</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop B (right), Pop A (left) → + A B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A B, C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A B, C, D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop D (right), Pop C (left) → - C D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ A B, - C D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop - C D (right), Pop + A B (left) → * + A B - C D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* + A B - C D]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Two sub‑expressions are built and then multiplied. Result: <code>* + A B - C D</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Forgetting the outer combination order.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">* + A B - C D</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 8: A B C + * D E / - */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Example 8: <code>A B C + * D E / -</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push A</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push B</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, B, C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C (right), Pop B (left) → + B C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, + B C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop + B C (right), Pop A (left) → * A + B C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* A + B C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* A + B C, D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">E</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push E</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* A + B C, D, E]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">/</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop E (right), Pop D (left) → / D E</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* A + B C, / D E]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop / D E (right), Pop * A + B C (left) → - * A + B C / D E</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- * A + B C / D E]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The algorithm correctly builds nested prefix: <code>- * A + B C / D E</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> The order of operands when combining '*' and '/' can be confusing.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">- * A + B C / D E</strong>
            </p>
          </div>
        </section>

        {/* ================================ END OF EXAMPLES ================================ */}

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
              ⚠️ Common Pitfalls Recap
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Scanning from right to left (as in prefix conversion).</li>
              <li>Swapping the order of operands – first popped is right, second is left.</li>
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
                "I can trace the algorithm on simple examples.",
                "I know to scan from left to right.",
                "I know the correct order of popping operands.",
                "I know the prefix order: operator, left, right.",
                "I can identify common mistakes.",
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
              <li>What happens if you combine in the wrong order?</li>
              <li>How does the combination order differ from postfix‑to‑infix?</li>
              <li>Try converting <code>A B C * +</code> manually and compare with the rule.</li>
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
                title="PostfixToPrefixExamples.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates postfix‑to‑prefix conversion with trace output for each example.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "These examples show the elegance of the stack‑based conversion. In Barrackpore, I tell my students: 'The same stack logic works for infix, prefix, and postfix – just change the combination order.' The key is to remember that the first popped operand is the right operand. Use these traces to build intuition."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Postfix to Prefix – Step-by-Step FAQs"
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