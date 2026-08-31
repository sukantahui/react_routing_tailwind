import React from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import postfixToInfixExamplesJava from "./topic25_files/PostfixToInfixExamples.java?raw";
import questions from "./topic25_files/topic25_questions";

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

export default function Topic25() {
  const javaCode = typeof postfixToInfixExamplesJava === 'string'
    ? postfixToInfixExamplesJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Step‑by‑Step Examples
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Detailed traces of postfix‑to‑infix conversion using a stack of strings.
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
                The postfix‑to‑infix algorithm is remarkably simple: scan the postfix expression left to right, push operands onto a stack, and when an operator is encountered, pop two operands, combine them with the operator in infix notation with parentheses, and push the result back.
              </p>
              <p>
                The examples below show the stack evolution at each step, allowing you to visualise how the infix expression is built from the bottom up.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> The stack holds sub‑expressions (strings) that are gradually combined into the final infix expression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================ EXAMPLES ================================ */}

        {/* EXAMPLE 1: AB+ */}
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
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop B, Pop A → (A+B) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+B)]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The final stack contains exactly one element: <code>(A+B)</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Popping in wrong order – right operand must be popped first.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">(A+B)</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 2: ABC*+ */}
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
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C, Pop B → (B*C) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, (B*C)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop (B*C), Pop A → (A+(B*C)) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+(B*C))]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The stack builds from operands to sub‑expressions. Result: <code>(A+(B*C))</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Adding unnecessary parentheses or forgetting to wrap the combined expression.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">(A+(B*C))</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 3: AB+C* */}
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
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop B, Pop A → (A+B) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+B)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+B), C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C, Pop (A+B) → ((A+B)*C) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[((A+B)*C)]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The order of combination matters: first A+B, then multiply by C. Result: <code>((A+B)*C)</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Not wrapping the combined expression in parentheses – would produce <code>A+B*C</code> which is ambiguous.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">((A+B)*C)</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 4: AB*CD*+ */}
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
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop B, Pop A → (A*B) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A*B)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A*B), C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A*B), C, D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop D, Pop C → (C*D) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A*B), (C*D)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop (C*D), Pop (A*B) → ((A*B)+(C*D)) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[((A*B)+(C*D))]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Two independent multiplications are computed, then added. Result: <code>((A*B)+(C*D))</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Confusing the order of the two products when combining.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">((A*B)+(C*D))</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 5: ABC*+D- */}
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
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C, Pop B → (B*C) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, (B*C)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop (B*C), Pop A → (A+(B*C)) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+(B*C))]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+(B*C)), D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop D, Pop (A+(B*C)) → ((A+(B*C))-D) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[((A+(B*C))-D)]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The expression builds from inside out. Result: <code>((A+(B*C))-D)</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Not using enough parentheses can lead to ambiguity. Always wrap the combined expression.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">((A+(B*C))-D)</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 6: ABC^^ */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Example 6: <code>A B C ^ ^</code> (Right‑Associative Exponent)
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
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">^</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C, Pop B → (B^C) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, (B^C)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">^</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop (B^C), Pop A → (A^(B^C)) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A^(B^C))]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Because exponentiation is right‑associative, the postfix <code>ABC^^</code> correctly produces <code>(A^(B^C))</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Misinterpreting the associativity – the algorithm handles it automatically because of the stack order.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">(A^(B^C))</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 7: AB+CD-* */}
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
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop B, Pop A → (A+B) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+B)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push C</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+B), C]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+B), C, D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop D, Pop C → (C-D) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A+B), (C-D)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop (C-D), Pop (A+B) → ((A+B)*(C-D)) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[((A+B)*(C-D))]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Two independent sub‑expressions are built and then multiplied. Result: <code>((A+B)*(C-D))</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Mixing up the order of the two operands when combining at the end.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">((A+B)*(C-D))</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 8: ABC+*DE/- */}
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
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop C, Pop B → (B+C) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[A, (B+C)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop (B+C), Pop A → (A*(B+C)) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A*(B+C))]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push D</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A*(B+C)), D]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">E</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push E</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A*(B+C)), D, E]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">/</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop E, Pop D → (D/E) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[(A*(B+C)), (D/E)]</td></tr>
                  <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop (D/E), Pop (A*(B+C)) → ((A*(B+C))-(D/E)) push</td><td className="p-2 border border-gray-200 dark:border-gray-700">[((A*(B+C))-(D/E))]</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Complex nested expression built step by step. Result: <code>((A*(B+C))-(D/E))</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <span className="font-medium">Common Mistake:</span> Forgetting that the final subtraction uses the two accumulated sub‑expressions.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Result: <strong className="text-indigo-600 dark:text-indigo-400">((A*(B+C))-(D/E))</strong>
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
              <li>Always pop the right operand first, then the left.</li>
              <li>Parentheses are essential for preserving precedence – never skip them.</li>
              <li>Tokenise the postfix expression on spaces to handle multi‑character operands.</li>
              <li>Use a <code>Stack&lt;String&gt;</code> in Java for simplicity.</li>
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
              <li>Swapping the order of operands when combining.</li>
              <li>Forgetting to wrap the combined expression in parentheses.</li>
              <li>Not handling spaces or multi‑character operands.</li>
              <li>Assuming the stack size is always correct – check for underflow.</li>
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
              <li>Use a <code>Deque</code> or <code>Stack</code> from the Java Collections Framework.</li>
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
                "I know the correct order of popping operands.",
                "I understand why parentheses are added.",
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
              <li>Why is the right operand popped first?</li>
              <li>What happens if you forget parentheses?</li>
              <li>How would you handle multi‑character operands?</li>
              <li>Try converting <code>A B C * D / +</code> manually.</li>
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
                title="PostfixToInfixExamples.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates postfix‑to‑infix conversion with trace output for each example.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "I love teaching postfix‑to‑infix because of its simplicity. In Barrackpore, I tell my students: 'It's like building a sentence backwards – you keep combining words until you have one big sentence.' The key is the stack of strings. Use these examples to practice and build intuition."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Postfix to Infix – Step-by-Step FAQs"
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