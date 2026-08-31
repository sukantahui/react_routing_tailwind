import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import infixToPostfixAlgorithmJava from "./topic12_files/InfixToPostfixAlgorithm.java?raw";
import questions from "./topic12_files/topic12_questions";

// Inline keyframes (motion‑safe)
const styles = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeUp {
    animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-scaleIn {
    animation: scaleIn 0.5s ease-out forwards;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  @media (prefers-reduced-motion: reduce) {
    .animate-fadeUp, .animate-scaleIn {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

export default function Topic12() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Algorithm for Infix to Postfix
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            A complete, step‑by‑step algorithm to transform infix to postfix using a stack.
          </p>
        </header>

        {/* THEORY (Detailed) */}

<section className="animate-fadeUp delay-100">
  <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-gray-900/80 dark:to-gray-900/40 p-6 sm:p-8 border border-gray-200/80 dark:border-gray-800/80 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/15 dark:hover:shadow-indigo-400/10">

    {/* Header */}
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6">
      <span className="inline-block w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full"></span>
      The Algorithm in Detail
      <span className="ml-auto text-xs font-normal text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
        Shunting‑yard
      </span>
    </h2>

    <div className="space-y-5">

      {/* Intro paragraphs */}
      <div className="prose prose-slate dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          The algorithm for converting infix to postfix is a classic application of stack data structures.
          It processes the infix expression token by token (operands, operators, parentheses) and produces
          the equivalent postfix expression.
        </p>
        <p>
          The algorithm is often called the <strong className="text-indigo-600 dark:text-indigo-400">"Shunting‑yard algorithm"</strong> (invented by Edsger Dijkstra).
          It uses a stack to keep track of operators and parentheses until they can be output in the correct order.
        </p>
        <p>
          The algorithm follows these major steps:
        </p>
      </div>

      {/* Steps - custom numbered list with better visuals */}
      <ol className="space-y-6 list-none pl-0">

        {/* Step 1 */}
        <li className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-sm shadow-sm ring-2 ring-white dark:ring-gray-800">1</div>
          <div>
            <strong className="text-gray-800 dark:text-gray-200">Initialize</strong>
            <span className="text-gray-700 dark:text-gray-300"> an empty stack and an empty output string.</span>
          </div>
        </li>

        {/* Step 2 */}
        <li className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-sm shadow-sm ring-2 ring-white dark:ring-gray-800">2</div>
          <div>
            <strong className="text-gray-800 dark:text-gray-200">Scan</strong>
            <span className="text-gray-700 dark:text-gray-300"> the infix expression from left to right, one token at a time.</span>
          </div>
        </li>

        {/* Step 3 - with nested rules */}
        <li className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-sm shadow-sm ring-2 ring-white dark:ring-gray-800">3</div>
          <div className="flex-1">
            <div className="text-gray-800 dark:text-gray-200">
              <strong>Process each token</strong>
              <span className="text-gray-700 dark:text-gray-300"> according to the following rules:</span>
            </div>

            {/* Token rules as a grid of cards */}
            <ul className="list-none space-y-3 mt-3">

              {/* Operand */}
              <li className="bg-blue-50/70 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/60 dark:border-blue-800/40">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-200/60 dark:bg-blue-800/40 px-2 py-0.5 rounded">Operand</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">(A, B, 5, x, etc.)</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Append it directly to the output.
                </p>
              </li>

              {/* Left Parenthesis */}
              <li className="bg-purple-50/70 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/60 dark:border-purple-800/40">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-200/60 dark:bg-purple-800/40 px-2 py-0.5 rounded">Left Parenthesis</span>
                  <code className="text-xs text-purple-600 dark:text-purple-400 bg-purple-100/50 dark:bg-purple-900/30 px-1.5 py-0.5 rounded">(</code>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Push it onto the stack.
                </p>
              </li>

              {/* Right Parenthesis */}
              <li className="bg-pink-50/70 dark:bg-pink-900/20 rounded-xl p-4 border border-pink-200/60 dark:border-pink-800/40">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300 bg-pink-200/60 dark:bg-pink-800/40 px-2 py-0.5 rounded">Right Parenthesis</span>
                  <code className="text-xs text-pink-600 dark:text-pink-400 bg-pink-100/50 dark:bg-pink-900/30 px-1.5 py-0.5 rounded">)</code>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Pop operators from the stack and append them to the output until a left parenthesis
                  <code className="mx-1 text-pink-600 dark:text-pink-400 bg-pink-100/50 dark:bg-pink-900/30 px-1.5 py-0.5 rounded"> ( </code>
                  is found. Discard both parentheses.
                </p>
              </li>

              {/* Operator - with nested list */}
              <li className="bg-rose-50/70 dark:bg-rose-900/20 rounded-xl p-4 border border-rose-200/60 dark:border-rose-800/40">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 bg-rose-200/60 dark:bg-rose-800/40 px-2 py-0.5 rounded">Operator</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">(+, -, *, /, ^)</span>
                </div>
                <ol className="list-decimal pl-5 mt-2 space-y-1.5 text-gray-700 dark:text-gray-300">
                  <li>
                    If the stack is <strong>empty</strong>, simply push the fetched operator onto the stack.
                  </li>
                  <li>
                    Else if the top of the stack is <code className="text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded">(</code>, push the fetched operator onto the stack.
                  </li>
                  <li>
                    Else if the fetched operator has <strong>higher precedence</strong> than the operator at
                    the top of the stack, push it onto the stack.
                  </li>
                  <li>
                    Otherwise, <strong>do not push the fetched operator yet.</strong> Keep it in hand and
                    repeatedly compare it with the current top of the stack.
                    <ul className="list-disc pl-5 mt-1.5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>
                        If the top operator has <strong>higher precedence</strong>, pop it and append it to
                        the output.
                      </li>
                      <li>
                        If both operators have <strong>equal precedence</strong> and the incoming operator is
                        <strong> left-associative</strong> (<code className="text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded">+</code>, <code className="text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded">-</code>, <code className="text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded">*</code>,
                        <code className="text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded">/</code>), pop the top operator and append it to the output.
                      </li>
                      <li>
                        If both operators have <strong>equal precedence</strong> and the incoming operator is
                        <strong> right-associative</strong> (e.g., <code className="text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded">^</code>), <strong>do not</strong> pop the top operator. Push the incoming operator onto the stack instead.
                      </li>
                      <li>
                        After every pop, compare the <strong>same fetched operator</strong> with the new top
                        of the stack.
                      </li>
                      <li>
                        Continue this process until the stack becomes empty, the top is{" "}
                        <code className="text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded">(</code>, or the fetched operator has higher precedence than the top operator.
                      </li>
                      <li>
                        <strong>Only then</strong> push the fetched operator onto the stack.
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </li>

        {/* Step 4 */}
        <li className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-sm shadow-sm ring-2 ring-white dark:ring-gray-800">4</div>
          <div>
            <span className="text-gray-700 dark:text-gray-300">
              After scanning the entire infix expression, pop all remaining operators from the stack and
              append them to the output.
            </span>
          </div>
        </li>
      </ol>

      {/* Key Insight - enhanced */}
      <div className="mt-6 relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50/90 via-white to-indigo-50/50 dark:from-indigo-950/40 dark:via-gray-900/60 dark:to-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 shadow-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 dark:bg-indigo-500/5 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
        <div className="relative p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-medium text-indigo-700 dark:text-indigo-300">💡 Key Insight:</span> When an operator is fetched, it is
                <strong className="text-amber-600 dark:text-amber-400"> not always pushed immediately.</strong> If operators already in the stack must appear
                before it in the postfix expression, they are popped one by one while the fetched operator is
                temporarily kept in hand. Only after all required popping is completed is the fetched operator
                pushed onto the stack.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer hint - updated with right-associative note */}
      <div className="mt-4 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5 flex-wrap">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>Precedence: <span className="font-mono font-semibold text-indigo-500 dark:text-indigo-400">^</span> &gt; <span className="font-mono font-semibold text-indigo-500 dark:text-indigo-400">* /</span> &gt; <span className="font-mono font-semibold text-indigo-500 dark:text-indigo-400">+ -</span> · </span>
        <span className="bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/40">
          <span className="font-mono text-indigo-600 dark:text-indigo-300">^</span> is <strong className="text-indigo-700 dark:text-indigo-300">right‑associative</strong>
        </span>
        <span>· all other operators are <strong>left‑associative</strong></span>
      </div>

    </div>
  </div>
</section>

        {/* NEW: EFFICIENT RULE REFERENCE */}
        <section className="animate-fadeUp delay-150">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-cyan-500 rounded-full"></span>
              📐 Algorithm Rules – Quick Reference
            </h2>
            <div className="mt-4 space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Process the infix expression <strong>left to right</strong>. For each token, follow these rules:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Token</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900/50">
                    <tr>
                      <td className="px-4 py-3 text-sm font-mono text-gray-800 dark:text-gray-200">Operand</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Append directly to <strong>output</strong>.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-mono text-gray-800 dark:text-gray-200">(</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Push onto <strong>stack</strong>.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-mono text-gray-800 dark:text-gray-200">)</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Pop from stack and append to output until a <code>(</code> is found. Discard the <code>(</code>.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-mono text-gray-800 dark:text-gray-200">Operator</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        While stack not empty and top is an operator with <strong>higher</strong> precedence, <br />
                        <span className="inline-block mt-1">or equal precedence <strong>and</strong> the operator is <strong>left‑associative</strong>,</span>
                        <br />pop and append to output. Then push the current operator.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200 dark:border-cyan-800">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">⏳ After scanning all tokens:</span> Pop any remaining operators from the stack and append to output.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">🧠 Precedence (common):</span> <code>^</code> (highest, right‑assoc) &gt; <code>*</code>, <code>/</code> &gt; <code>+</code>, <code>-</code> (lowest, left‑assoc).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PSEUDOCODE */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Algorithm Pseudocode
            </h2>
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-x-auto">
              <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                {`algorithm infixToPostfix(infix):
    stack = empty stack
    output = empty string

    for each token in infix (left to right):
        if token is operand:
            output.append(token)
        else if token is '(':
            stack.push('(')
        else if token is ')':
            while stack not empty and stack.top() != '(':
                output.append(stack.pop())
            stack.pop()  // remove '('
        else: // token is operator
            while stack not empty and stack.top() != '(' and 
                  (precedence(stack.top()) > precedence(token) or
                   (precedence(stack.top()) == precedence(token) and token is left-associative)):
                output.append(stack.pop())
            stack.push(token)

    while stack not empty:
        output.append(stack.pop())

    return output`}
              </pre>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This pseudocode captures the entire algorithm in a concise form.
            </p>
          </div>
        </section>

        {/* REAL‑WORLD USAGE */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Real‑World Usage
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                This algorithm is the foundation of expression evaluation in many systems:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Compilers:</strong> Used to convert arithmetic expressions to intermediate representations.</li>
                <li><strong>Calculators:</strong> Many scientific calculators internally convert infix to postfix for evaluation.</li>
                <li><strong>Spreadsheet software:</strong> Excel formulas are parsed and evaluated using similar algorithms.</li>
                <li><strong>Programming languages:</strong> Expression parsing in interpreters and compilers.</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Susmita from Naihati was amazed to learn that
                  the algorithm she learned in class is used in every compiler she uses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Algorithm Flow */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Algorithm Flow Diagram
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 700 300"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Algorithm flow diagram"
              >
                <rect x="20" y="20" width="660" height="260" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="660" height="260" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Start */}
                <rect x="290" y="30" width="120" height="30" rx="15" fill="#22c55e" opacity="0.2" />
                <text x="350" y="50" textAnchor="middle" fontSize="14" fill="#22c55e" fontWeight="bold">Start</text>

                {/* Initialize */}
                <rect x="270" y="75" width="160" height="30" rx="6" fill="#0ea5e9" opacity="0.2" />
                <text x="350" y="95" textAnchor="middle" fontSize="14" fill="#0ea5e9">Init stack &amp; output</text>
                <line x1="350" y1="60" x2="350" y2="75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Loop: for each token */}
                <rect x="240" y="120" width="220" height="30" rx="6" fill="#f59e0b" opacity="0.2" />
                <text x="350" y="140" textAnchor="middle" fontSize="14" fill="#f59e0b">For each token</text>
                <line x1="350" y1="105" x2="350" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Decision diamond */}
                <polygon points="350,160 410,185 350,210 290,185" fill="#ec4899" opacity="0.2" stroke="#ec4899" strokeWidth="1.5" />
                <text x="350" y="189" textAnchor="middle" fontSize="12" fill="#ec4899">Token</text>
                <line x1="350" y1="150" x2="350" y2="160" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Branches */}
                {/* Operand */}
                <line x1="290" y1="185" x2="100" y2="185" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)" />
                <rect x="30" y="170" width="140" height="30" rx="6" fill="#22c55e" opacity="0.2" />
                <text x="100" y="190" textAnchor="middle" fontSize="14" fill="#22c55e">Operand: output</text>

                {/* Operator */}
                <line x1="410" y1="185" x2="600" y2="185" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowYellow)" />
                <rect x="530" y="170" width="140" height="30" rx="6" fill="#f59e0b" opacity="0.2" />
                <text x="600" y="190" textAnchor="middle" fontSize="14" fill="#f59e0b">Operator: push/pop</text>

                {/* Parentheses */}
                <line x1="350" y1="210" x2="350" y2="235" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowPink)" />
                <rect x="280" y="235" width="140" height="30" rx="6" fill="#ec4899" opacity="0.2" />
                <text x="350" y="255" textAnchor="middle" fontSize="14" fill="#ec4899">Handle parentheses</text>

                {/* End */}
                <rect x="290" y="240" width="120" height="0" rx="6" opacity="0" />

                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                  </marker>
                  <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                  </marker>
                  <marker id="arrowYellow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                  </marker>
                  <marker id="arrowPink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              The algorithm loops through each token, branching based on token type.
            </p>
          </div>
        </section>

        {/* TIPS & TRICKS */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips &amp; Tricks (Professional Level)
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Pre‑compute precedence and associativity in maps</strong> – makes the code cleaner and easier to maintain.
              </li>
              <li>
                <strong>Handle multi‑character operands</strong> – if your input uses variable names like <code>var</code>, treat them as one token by scanning whole words.
              </li>
              <li>
                <strong>Use a <code>StringBuilder</code> for output</strong> – more efficient than string concatenation.
              </li>
              <li>
                <strong>Add error handling for invalid expressions</strong> – mismatched parentheses, unknown characters.
              </li>
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
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Forgetting to pop remaining operators after loop</strong> – leads to incomplete postfix.
              </li>
              <li>
                <strong>Not handling right‑associative operators correctly</strong> – equal precedence should NOT be popped for right‑associative.
              </li>
              <li>
                <strong>Assuming all operators are left‑associative</strong> – exponentiation is right‑associative in many languages.
              </li>
              <li>
                <strong>Not validating parentheses matching</strong> – leads to stack underflow or leftover parentheses.
              </li>
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
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Implement the algorithm as a reusable method</strong> – takes a string, returns a string.
              </li>
              <li>
                <strong>Write unit tests for various cases</strong> – simple, with parentheses, with precedence, with associativity.
              </li>
              <li>
                <strong>Use descriptive variable names</strong> – <code>operatorStack</code>, <code>postfixOutput</code>.
              </li>
              <li>
                <strong>Add comments for each rule</strong> – makes the code self‑documenting.
              </li>
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
                "I can trace the algorithm on a simple expression.",
                "I understand the role of the stack in the algorithm.",
                "I know when to pop operators from the stack.",
                "I understand how parentheses are handled.",
                "I can implement the algorithm in Java.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-indigo-500 text-xl">☐</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
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
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>• What happens if the stack becomes empty while processing a ')'?</li>
              <li>• How would you modify the algorithm to handle exponentiation (right‑associative)?</li>
              <li>• Why do we need to pop all remaining operators at the end?</li>
              <li>• Try running the algorithm on <code>A+B*C-D</code> step by step.</li>
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
                fileModule={infixToPostfixAlgorithmJava}
                title="InfixToPostfixAlgorithm.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This is a complete Java implementation of the infix‑to‑postfix algorithm.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "I always tell my students in Barrackpore: 'The algorithm is like following a recipe – if you follow each step carefully, you'll always get the right result.' Emphasise that the stack is a temporary holding area; understanding why we pop operators of higher or equal precedence is key. Practice by tracing the algorithm with different expressions."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Infix to Postfix Algorithm – FAQs"
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