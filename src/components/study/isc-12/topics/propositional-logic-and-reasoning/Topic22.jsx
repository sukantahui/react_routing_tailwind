// Topic22.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic22_files/topic22_questions';

const Topic22 = () => {
  // Interactive evaluator state
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);
  const [rVal, setRVal] = useState(false);
  const [selectedExpression, setSelectedExpression] = useState(0);

  // Predefined expressions for step-by-step evaluation
  const expressions = [
    {
      name: "(p ∧ q) ∨ ¬r",
      expr: (p, q, r) => (p && q) || !r,
      steps: (p, q, r) => [
        { desc: "Evaluate p ∧ q", value: p && q },
        { desc: "Evaluate ¬r", value: !r },
        { desc: "Combine with ∨: (p∧q) ∨ ¬r", value: (p && q) || !r }
      ]
    },
    {
      name: "p ⇒ (q ∧ r)",
      expr: (p, q, r) => !p || (q && r),
      steps: (p, q, r) => [
        { desc: "Evaluate q ∧ r", value: q && r },
        { desc: "Rewrite p ⇒ (q∧r) as ¬p ∨ (q∧r)", value: !p || (q && r) }
      ]
    },
    {
      name: "¬(p ∨ q) ∧ r",
      expr: (p, q, r) => (!(p || q)) && r,
      steps: (p, q, r) => [
        { desc: "Evaluate p ∨ q", value: p || q },
        { desc: "Negate: ¬(p ∨ q)", value: !(p || q) },
        { desc: "AND with r", value: (!(p || q)) && r }
      ]
    },
    {
      name: "(p ⇒ q) ∧ (q ⇒ r)",
      expr: (p, q, r) => (!p || q) && (!q || r),
      steps: (p, q, r) => [
        { desc: "Evaluate p ⇒ q as ¬p ∨ q", value: !p || q },
        { desc: "Evaluate q ⇒ r as ¬q ∨ r", value: !q || r },
        { desc: "AND both results", value: (!p || q) && (!q || r) }
      ]
    },
    {
      name: "p ⊕ q (XOR) using ∧, ∨, ¬",
      expr: (p, q, r) => (p && !q) || (!p && q),
      steps: (p, q, r) => [
        { desc: "Evaluate p ∧ ¬q", value: p && !q },
        { desc: "Evaluate ¬p ∧ q", value: !p && q },
        { desc: "OR both results: (p∧¬q) ∨ (¬p∧q)", value: (p && !q) || (!p && q) }
      ]
    }
  ];

  const current = expressions[selectedExpression];
  const result = current.expr(pVal, qVal, rVal);
  const steps = current.steps(pVal, qVal, rVal);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Evaluation of Logical Statements Step-by-Step
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Master the systematic approach to computing truth values of compound expressions
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What is Step-by-Step Evaluation?</h2>
          <p className="leading-relaxed">
            Evaluating a logical expression means determining its truth value (true or false) given specific truth values for its variables. Just like arithmetic expressions (<code>3 + 4 × 2</code>), logical expressions follow <strong>precedence rules</strong> and can be evaluated <strong>step by step</strong>.
          </p>
          <p className="leading-relaxed mt-3">
            This systematic approach helps avoid mistakes, especially with complex expressions involving multiple operators and parentheses. It's the foundation for building truth tables, simplifying logic, and writing correct program conditions.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Analogy:</strong> Swadeep evaluates "If it's raining and I have an umbrella, then I won't get wet" by checking each part: Is it raining? Do I have an umbrella? Then combine.</p>
          </div>
        </div>

        {/* Evaluation Rules */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Evaluation Rules & Precedence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 p-3 rounded">
              <p className="font-bold">Operator Precedence (highest to lowest):</p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Parentheses <code>( )</code></li>
                <li>NOT <code>¬</code></li>
                <li>AND <code>∧</code></li>
                <li>OR <code>∨</code></li>
                <li>Implication <code>⇒</code></li>
                <li>Biconditional <code>⇔</code></li>
              </ol>
            </div>
            <div className="bg-white dark:bg-gray-700 p-3 rounded">
              <p className="font-bold">Basic Truth Tables:</p>
              <table className="text-xs w-full mt-1">
                <thead><tr><th>p</th><th>q</th><th>p∧q</th><th>p∨q</th><th>p⇒q</th><th>p⇔q</th></tr></thead>
                <tbody>
                  <tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
                  <tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td></tr>
                  <tr><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>F</td></tr>
                  <tr><td>F</td><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">⚡ <strong>Key rule:</strong> Always evaluate innermost parentheses first, then apply NOT, then AND, then OR, then implication, then biconditional.</p>
          </div>
        </div>

        {/* Interactive Step-by-Step Evaluator */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🧮 Interactive Step-by-Step Evaluator</h2>
          <p className="mb-4">Select an expression, toggle variable values, and watch the evaluation unfold step by step.</p>

          {/* Expression selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            {expressions.map((expr, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedExpression(idx)}
                className={clsx(
                  "px-3 py-1 rounded transition-all duration-200 text-sm",
                  selectedExpression === idx
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {expr.name}
              </button>
            ))}
          </div>

          {/* Variable toggles */}
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" />
              <span className="font-mono font-bold">p = {pVal ? 'true' : 'false'}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" />
              <span className="font-mono font-bold">q = {qVal ? 'true' : 'false'}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rVal} onChange={() => setRVal(!rVal)} className="w-5 h-5" />
              <span className="font-mono font-bold">r = {rVal ? 'true' : 'false'}</span>
            </label>
          </div>

          {/* Expression display */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-4 text-center">
            <p className="font-mono text-lg">Expression: {current.name}</p>
          </div>

          {/* Step-by-step breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="font-semibold mb-2">📝 Evaluation Steps:</p>
            <div className="space-y-2">
              {steps.map((step, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-1">
                  <span className="text-sm">{step.desc}</span>
                  <span className={clsx(
                    "font-mono font-bold px-2 py-0.5 rounded",
                    step.value ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  )}>
                    {step.value ? 'true' : 'false'}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t-2 border-gray-400">
                <span className="font-bold">🏁 Final Result:</span>
                <span className={clsx(
                  "font-bold px-3 py-1 rounded-full",
                  result ? "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100" : "bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100"
                )}>
                  {result ? 'true' : 'false'}
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 Follow the order: parentheses → NOT → AND → OR → implication → biconditional.</p>
        </div>

        {/* Worked Examples */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">📝 Worked Examples (Hand Calculation)</h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Example 1:</strong> Evaluate ¬(p ∧ q) ∨ r with p=true, q=false, r=true</p>
              <ul className="list-decimal list-inside mt-1 text-sm space-y-1">
                <li>Evaluate inside parentheses: p ∧ q = true ∧ false = <strong>false</strong></li>
                <li>Negate: ¬(false) = <strong>true</strong></li>
                <li>OR with r: true ∨ true = <strong>true</strong></li>
              </ul>
              <p className="mt-1 font-bold">Result: true</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Example 2:</strong> Evaluate (p ⇒ q) ∧ ¬r with p=true, q=false, r=false</p>
              <ul className="list-decimal list-inside mt-1 text-sm space-y-1">
                <li>Evaluate p ⇒ q: true ⇒ false = <strong>false</strong></li>
                <li>Evaluate ¬r: ¬false = <strong>true</strong></li>
                <li>AND: false ∧ true = <strong>false</strong></li>
              </ul>
              <p className="mt-1 font-bold">Result: false</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Example 3 (with parentheses):</strong> Evaluate ¬(p ∨ q) ∧ (r ⇒ p) with p=false, q=true, r=false</p>
              <ul className="list-decimal list-inside mt-1 text-sm space-y-1">
                <li>First parentheses: p ∨ q = false ∨ true = <strong>true</strong></li>
                <li>Negate: ¬(true) = <strong>false</strong></li>
                <li>Second parentheses: r ⇒ p = false ⇒ false = <strong>true</strong></li>
                <li>AND: false ∧ true = <strong>false</strong></li>
              </ul>
              <p className="mt-1 font-bold">Result: false</p>
            </div>
          </div>
        </div>

        {/* Systematic Evaluation Method */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">Systematic Evaluation Method</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Identify all variables</strong> and their given truth values.</li>
            <li><strong>Locate parentheses</strong> — evaluate innermost first.</li>
            <li><strong>Apply NOT (¬)</strong> to all negated subexpressions.</li>
            <li><strong>Evaluate AND (∧)</strong> from left to right.</li>
            <li><strong>Evaluate OR (∨)</strong> from left to right.</li>
            <li><strong>Evaluate implication (⇒)</strong> — remember it's false only when antecedent true and consequent false.</li>
            <li><strong>Evaluate biconditional (⇔)</strong> — true when both sides same.</li>
          </ol>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">🧠 <strong>Pro tip:</strong> Write the expression on paper and underline each part as you evaluate it. This prevents missing steps.</p>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls in Evaluation</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Forgetting precedence:</strong> Evaluating AND before OR incorrectly. Example: p ∧ q ∨ r means (p∧q) ∨ r, not p ∧ (q∨r).</li>
            <li><strong>Mis-evaluating implication:</strong> false ⇒ false is true, not false. Many students get this wrong.</li>
            <li><strong>Negating incorrectly:</strong> ¬(p ∧ q) becomes ¬p ∨ ¬q, not ¬p ∧ ¬q.</li>
            <li><strong>Skipping steps:</strong> Trying to do too much at once leads to errors. Write each intermediate result.</li>
            <li><strong>Confusing ↔ with ⇒:</strong> Biconditional requires both directions; implication only one.</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Always use parentheses</strong> to make precedence explicit, even if not strictly required.</li>
            <li><strong>Write intermediate values</strong> — treat it like solving (3+4)×2.</li>
            <li><strong>Double-check negations</strong> — apply De Morgan when needed.</li>
            <li><strong>For implication, memorize:</strong> only false when true→false.</li>
            <li><strong>Practice with truth tables</strong> to verify your step-by-step results.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Did you identify all variables?</li>
              <li>☑️ Are parentheses evaluated innermost first?</li>
              <li>☑️ Did you apply NOT before AND/OR?</li>
              <li>☑️ Are implication cases correct (only F when T→F)?</li>
              <li>☑️ Did you write each intermediate result?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <Teacher note="Step-by-step evaluation is like solving arithmetic expressions. Emphasize that students should write down each step, especially when multiple parentheses are involved. Use the analogy of a calculator: you wouldn't type an entire complex expression without checking intermediate results. In class, do 'live' evaluations on the board, underlining parts as you go. The interactive component here allows students to experiment and see the process." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <FAQTemplate title="Evaluation of Logical Statements FAQs" questions={questions} />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); }
          to { transform: translateY(0); }
        }
        .animate-\\[slideUp_0\\.5s_ease-out\\] {
          animation: slideUp 0.5s ease-out forwards;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[slideUp_0\\.5s_ease-out\\] {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic22;