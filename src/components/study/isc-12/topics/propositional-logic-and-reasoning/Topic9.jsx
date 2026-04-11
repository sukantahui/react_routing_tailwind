// Topic9.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';

const Topic9 = () => {
  // Interactive evaluator state
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);
  const [rVal, setRVal] = useState(false);

  // Predefined expression for demonstration: (p ∧ q) ∨ ¬r
  const evaluateExpression = (p, q, r) => {
    // Step 1: Compute AND (p ∧ q)
    const andResult = p && q;
    // Step 2: Compute NOT r (¬r)
    const notR = !r;
    // Step 3: Compute OR (andResult ∨ notR)
    const finalResult = andResult || notR;
    return { andResult, notR, finalResult };
  };

  const { andResult, notR, finalResult } = evaluateExpression(pVal, qVal, rVal);

  // Sample evaluation table data
  const evaluationSteps = [
    { step: '1. Evaluate inside parentheses (p ∧ q)', expression: 'p ∧ q', result: andResult ? 'true' : 'false' },
    { step: '2. Evaluate ¬r', expression: '¬r', result: notR ? 'true' : 'false' },
    { step: '3. Combine with ∨: (p ∧ q) ∨ ¬r', expression: '(true/false) ∨ (true/false)', result: finalResult ? 'true' : 'false' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Main container with stacked divs */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section with slide-up animation */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Logical Expressions & Evaluation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Master the art of evaluating compound logical statements step by step
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What are Logical Expressions?</h2>
          <p className="leading-relaxed">
            A <strong className="text-blue-600 dark:text-blue-400">logical expression</strong> combines one or more propositions using logical operators (¬, ∧, ∨, ⇒, ⇔). 
            Just like arithmetic expressions evaluate to numbers, logical expressions evaluate to <strong>true</strong> or <strong>false</strong>.
          </p>
          <p className="leading-relaxed mt-3">
            For example, the expression <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">(p ∧ q) ∨ ¬r</code> involves variables p, q, r and operators AND, OR, NOT.
            Given the truth values of p, q, r, we can systematically evaluate the entire expression.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> Swadeep wants to enter the club. Access = (hasID ∧ isOnGuestList) ∨ hasVIPPass. Each condition is a proposition, combined logically.</p>
          </div>
        </div>

        {/* Order of Precedence */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Operator Precedence (Order of Operations)</h2>
          <p className="leading-relaxed mb-3">
            Just like multiplication before addition in arithmetic, logical operators have a <strong>default evaluation order</strong>:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Priority</th>
                  <th className="px-4 py-2 text-left">Operator</th>
                  <th className="px-4 py-2 text-left">Symbol</th>
                  <th className="px-4 py-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                <tr><td className="px-4 py-2">1 (Highest)</td><td className="px-4 py-2">NOT</td><td className="px-4 py-2">¬</td><td className="px-4 py-2">¬p</td></tr>
                <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">AND</td><td className="px-4 py-2">∧</td><td className="px-4 py-2">p ∧ q</td></tr>
                <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">OR</td><td className="px-4 py-2">∨</td><td className="px-4 py-2">p ∨ q</td></tr>
                <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">Implication</td><td className="px-4 py-2">⇒</td><td className="px-4 py-2">p ⇒ q</td></tr>
                <tr><td className="px-4 py-2">5 (Lowest)</td><td className="px-4 py-2">Biconditional</td><td className="px-4 py-2">⇔</td><td className="px-4 py-2">p ⇔ q</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            ⚡ <strong>Pro Tip:</strong> Use parentheses <code>()</code> to override precedence and make expressions crystal clear — even if not strictly needed!
          </p>
        </div>

        {/* Step-by-Step Evaluation Method */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">Systematic Evaluation Process</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center font-bold">1</div>
              <p><strong>Identify all unique variables</strong> (p, q, r, etc.) and their given truth values.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center font-bold">2</div>
              <p><strong>Resolve parentheses first</strong> — innermost to outermost.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center font-bold">3</div>
              <p><strong>Apply NOT (¬)</strong> to all negated variables or sub-expressions.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center font-bold">4</div>
              <p><strong>Evaluate AND (∧)</strong> operators from left to right.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center font-bold">5</div>
              <p><strong>Evaluate OR (∨)</strong> operators from left to right.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center font-bold">6</div>
              <p><strong>Finally evaluate ⇒ and ⇔</strong> if present.</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm">🧠 <strong>Think about:</strong> Why do we evaluate NOT before AND? Because it binds most tightly — like unary minus in arithmetic (-3 × 4 means (-3)×4).</p>
          </div>
        </div>

        {/* Interactive Expression Evaluator */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🎮 Interactive Evaluator</h2>
          <p className="mb-4">Try changing the truth values below and watch how the expression <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded font-mono">(p ∧ q) ∨ ¬r</code> gets evaluated step-by-step:</p>
          
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" /> <span className="font-mono font-bold">p = {pVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" /> <span className="font-mono font-bold">q = {qVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={rVal} onChange={() => setRVal(!rVal)} className="w-5 h-5" /> <span className="font-mono font-bold">r = {rVal ? 'true' : 'false'}</span></label>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2 font-mono text-sm">
            <p>📐 <strong>Expression:</strong> (p ∧ q) ∨ ¬r</p>
            <div className="border-t border-gray-300 dark:border-gray-600 my-2"></div>
            {evaluationSteps.map((step, idx) => (
              <div key={idx} className="flex flex-wrap justify-between items-center py-1 border-b border-gray-100 dark:border-gray-700">
                <span>{step.step}</span>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{step.expression}</code>
                <span className="font-bold text-green-600 dark:text-green-400">→ {step.result}</span>
              </div>
            ))}
            <div className="border-t border-gray-300 dark:border-gray-600 my-2"></div>
            <div className="flex justify-between items-center text-lg">
              <span>🏁 <strong>Final result:</strong></span>
              <span className={clsx("font-bold px-3 py-1 rounded-full", finalResult ? "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100" : "bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100")}>{finalResult ? 'true' : 'false'}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 Observe how NOT r is evaluated first, then AND, then OR — precedence at work!</p>
        </div>

        {/* Worked Examples */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">Worked Examples</h2>
          <div className="space-y-6">
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
              <p className="font-mono font-bold">Example 1: p = true, q = false, r = true</p>
              <p className="font-mono">Evaluate: ¬p ∧ (q ∨ r)</p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>Step 1: ¬p = ¬true = false</li>
                <li>Step 2: (q ∨ r) = false ∨ true = true</li>
                <li>Step 3: false ∧ true = <strong>false</strong></li>
              </ul>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
              <p className="font-mono font-bold">Example 2: Swadeep's admission: (hasTicket ∧ isStudent) ∨ hasSponsor</p>
              <p>Given: hasTicket = true, isStudent = false, hasSponsor = true</p>
              <p className="mt-1">Evaluation: (true ∧ false) ∨ true = false ∨ true = <strong>true</strong> → Swadeep gets admission.</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
              <p className="font-mono font-bold">Example 3: Complex — (p ⇒ q) ∧ ¬r, with p=true, q=false, r=false</p>
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>p ⇒ q = true ⇒ false = false</li>
                <li>¬r = ¬false = true</li>
                <li>false ∧ true = <strong>false</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Forgetting precedence:</strong> Writing <code>p ∧ q ∨ r</code> and expecting (p∧q)∨r — but precedence says AND before OR, that's fine, but confusion with ¬p ∧ q vs ¬(p∧q).</li>
            <li><strong>Mis-evaluating implication:</strong> p ⇒ q is true whenever p is false, even if q is false — many beginners think false⇒false is false.</li>
            <li><strong>NOT binding too narrow:</strong> ¬p ∧ q means (¬p) ∧ q, not ¬(p∧q). Use parentheses!</li>
            <li><strong>Short-circuit in real programming vs logic:</strong> In logic, all sub-expressions are evaluated; in code, && and || may skip.</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Always parenthesize</strong> complex expressions to avoid ambiguity and make evaluation steps obvious.</li>
            <li><strong>Build truth tables systematically</strong> when many variables are involved.</li>
            <li><strong>Use De Morgan's laws</strong> to simplify negations of compound expressions (e.g., ¬(p∧q) = ¬p ∨ ¬q).</li>
            <li><strong>Debug step-by-step:</strong> Write intermediate results as you go — just like in the interactive example.</li>
            <li><strong>Industry habit:</strong> In code reviews, always request parentheses for clarity in boolean conditions, even if precedence is known.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Identified all variables and their values?</li>
              <li>☑️ Applied parentheses first?</li>
              <li>☑️ Handled all NOT operators?</li>
              <li>☑️ Evaluated AND then OR?</li>
              <li>☑️ Double-checked implications and biconditionals?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <Teacher note="Logical expressions are the heart of programming conditions. Remind students that writing extra parentheses never hurts — it's a sign of clarity, not weakness. Always demonstrate evaluation by underlining sub-expressions step-by-step, like solving (3+4)*2. For advanced classes, introduce short-circuit evaluation and its difference from pure logical evaluation." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <FAQTemplate title="Logical Expressions & Evaluation FAQs" questions={questions} />
        </div>
      </div>

      {/* Inline keyframes for slide-up animation without opacity */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(30px);
          }
          to {
            transform: translateY(0);
          }
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

export default Topic9;