import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 14: Simplification Techniques: Algebraic simplification
 * 
 * Component: Topic14
 * Purpose: Explains algebraic simplification techniques using Boolean laws:
 *          - Combining terms
 *          - Eliminating redundant terms
 *          - Factoring common terms
 *          - Applying complement laws
 *          - Systematic step-by-step simplification
 * 
 * When & Why: Used as the fifteenth topic in the Boolean Algebra series. Algebraic
 *             simplification is the foundation of logic optimization. Students learn
 *             to apply Boolean laws systematically to reduce expressions, leading to
 *             simpler circuits with fewer gates, lower cost, and better performance.
 * 
 * Return Type: JSX.Element
 */

const Topic14 = () => {
  // State for interactive simplification examples
  const [currentExample, setCurrentExample] = useState(0);
  const [showSteps, setShowSteps] = useState(true);
  const [userInput, setUserInput] = useState('');

  // Example expressions for simplification
  const examples = [
    {
      expression: 'F = A·B + A·B\'',
      simplified: 'F = A',
      steps: [
        'Step 1: Identify common factor A: F = A·(B + B\')',
        'Step 2: Apply Complement Law: B + B\' = 1',
        'Step 3: Apply Identity Law: A·1 = A',
        'Result: F = A'
      ],
      explanation: 'This uses the Complement Law (B + B\' = 1) and the Identity Law (A·1 = A).'
    },
    {
      expression: 'F = A·B + A·C + B·C',
      simplified: 'F = A·B + A·C + B·C (cannot simplify further with algebra)',
      steps: [
        'Step 1: Check for common factors: A appears in first two terms',
        'Step 2: Factor A: F = A·(B + C) + B·C',
        'Step 3: This is the consensus theorem form. No further algebraic simplification.',
        'Note: Can be simplified using K-map to A·B + A·C'
      ],
      explanation: 'This is the consensus theorem. Sometimes it cannot be simplified further algebraically.'
    },
    {
      expression: 'F = (A + B)·(A + C)',
      simplified: 'F = A + B·C',
      steps: [
        'Step 1: Apply Distributive Law: (A+B)·(A+C) = A·A + A·C + B·A + B·C',
        'Step 2: Apply Idempotent Law: A·A = A',
        'Step 3: Apply Commutative: B·A = A·B',
        'Step 4: Factor A from first three terms: A·(1 + C + B) + B·C',
        'Step 5: Apply Null Law: 1 + C + B = 1',
        'Step 6: Apply Identity: A·1 + B·C = A + B·C',
        'Result: F = A + B·C'
      ],
      explanation: 'This shows how OR distributes over AND, a unique Boolean property.'
    },
    {
      expression: 'F = A·B + A\'·C + B·C',
      simplified: 'F = A·B + A\'·C',
      steps: [
        'Step 1: Original expression: F = A·B + A\'·C + B·C',
        'Step 2: Apply Consensus Theorem: B·C is redundant',
        'Step 3: Verify with truth table: A·B + A\'·C + B·C = A·B + A\'·C',
        'Result: F = A·B + A\'·C'
      ],
      explanation: 'This is the Consensus Theorem: A·B + A\'·C + B·C = A·B + A\'·C'
    },
    {
      expression: 'F = (A + B)·(A\' + C)·(B + C)',
      simplified: 'F = (A + B)·(A\' + C)',
      steps: [
        'Step 1: Original expression: F = (A+B)·(A\'+C)·(B+C)',
        'Step 2: Apply Consensus Theorem (dual form): (B+C) is redundant',
        'Step 3: Result: F = (A+B)·(A\'+C)',
        'Result: F = (A+B)·(A\'+C)'
      ],
      explanation: 'Dual of Consensus Theorem: (A+B)·(A\'+C)·(B+C) = (A+B)·(A\'+C)'
    }
  ];

  const current = examples[currentExample];

  // Check user's simplification attempt
  const checkSimplification = () => {
    const normalizedInput = userInput.toUpperCase().replace(/\s/g, '');
    const normalizedAnswer = current.simplified.toUpperCase().replace(/\s/g, '');
    
    if (normalizedInput === normalizedAnswer) {
      alert('✓ Correct! Great job simplifying the expression!');
    } else {
      alert(`✗ Not quite. The simplified expression is: ${current.simplified}\n\nTry applying Boolean laws step by step.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-blue-100 dark:bg-blue-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Simplification Techniques:</span>
          <span className="block text-blue-600 dark:text-blue-400">Algebraic Simplification</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Applying Boolean laws systematically to reduce expressions
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Algebraic Simplification */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🧮</span> What is Algebraic Simplification?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong className="text-blue-600 dark:text-blue-400">Algebraic simplification</strong> is the process of reducing Boolean expressions to their simplest form using Boolean laws and theorems. The goal is to create an equivalent expression with the <strong className="text-blue-600">fewest terms</strong> and <strong className="text-blue-600">fewest literals</strong>, leading to simpler, cheaper, and faster digital circuits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold text-green-700">Fewer Gates</p>
              <p className="text-xs">Reduces component count</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold text-green-700">Lower Cost</p>
              <p className="text-xs">Less silicon area, cheaper manufacturing</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold text-green-700">Higher Speed</p>
              <p className="text-xs">Less propagation delay</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> A simpler expression means a simpler circuit. In industry, simplification directly impacts <strong className="text-blue-600">cost, power consumption, and reliability</strong>. Every gate eliminated saves money and energy!
            </p>
          </div>
        </div>

        {/* Boolean Laws Reference Card */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📚</span> Boolean Laws Reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Basic Laws</h3>
              <ul className="space-y-1 text-sm font-mono">
                <li>Identity: A·1 = A, A+0 = A</li>
                <li>Null: A·0 = 0, A+1 = 1</li>
                <li>Idempotent: A·A = A, A+A = A</li>
                <li>Complement: A·A' = 0, A+A' = 1</li>
                <li>Involution: (A')' = A</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Operational Laws</h3>
              <ul className="space-y-1 text-sm font-mono">
                <li>Commutative: A·B = B·A, A+B = B+A</li>
                <li>Associative: (A·B)·C = A·(B·C)</li>
                <li>Distributive: A·(B+C) = A·B + A·C</li>
                <li>Distributive (OR): A + B·C = (A+B)·(A+C)</li>
                <li>De Morgan's: (A·B)' = A'+B', (A+B)' = A'·B'</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-sm text-center">
              <span className="font-bold">⭐ Consensus Theorem:</span> A·B + A'·C + B·C = A·B + A'·C
            </p>
          </div>
        </div>

        {/* Simplification Strategy Guide */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎯</span> Step-by-Step Simplification Strategy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ol className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300">
                <li><strong className="text-blue-600">Look for common factors</strong> — Factor out common terms using distributive law</li>
                <li><strong className="text-blue-600">Identify complement pairs</strong> — Look for A and A' in the same product or sum</li>
                <li><strong className="text-blue-600">Apply complement laws</strong> — A·A'=0, A+A'=1</li>
                <li><strong className="text-blue-600">Use identity laws</strong> — Eliminate ·1 and +0 terms</li>
                <li><strong className="text-blue-600">Apply idempotent laws</strong> — Remove duplicate terms (A·A=A, A+A=A)</li>
                <li><strong className="text-blue-600">Use consensus theorem</strong> — Remove redundant terms like B·C when A·B + A'·C exists</li>
                <li><strong className="text-blue-600">Apply De Morgan's</strong> — Push complements through when needed</li>
                <li><strong className="text-blue-600">Check with truth table</strong> — Verify equivalence after simplification</li>
              </ol>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">🔑 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Factor first</strong> — Look for common variables across terms</li>
                <li>• <strong>Group terms</strong> — Rearrange using commutative law to spot patterns</li>
                <li>• <strong>Add redundant terms</strong> — Sometimes adding A·A' or A+A' helps</li>
                <li>• <strong>Work systematically</strong> — Don't skip steps; show your work</li>
                <li>• <strong>Verify each step</strong> — Use truth tables or quick mental checks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Practice Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✏️</span> Interactive Practice
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Try simplifying these Boolean expressions. Click through examples and test your understanding!
          </p>
          
          {/* Example Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentExample(idx);
                  setUserInput('');
                }}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105",
                  currentExample === idx
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                Example {idx + 1}
              </button>
            ))}
          </div>
          
          {/* Current Example */}
          <div className="bg-gray-100 dark:bg-gray-700/50 p-5 rounded-xl mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📌 Expression to Simplify:</h3>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-xl text-center font-bold">
              {current.expression}
            </div>
          </div>
          
          {/* Interactive Simplification Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your simplified expression:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g., F = A·B"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={checkSimplification}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Check
              </button>
            </div>
          </div>
          
          {/* Show Steps Toggle */}
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="w-full py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 mb-4"
          >
            {showSteps ? "Hide" : "Show"} Simplification Steps
          </button>
          
          {/* Steps Display */}
          {showSteps && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Step-by-Step Simplification:</h3>
              <ul className="space-y-2">
                {current.steps.map((step, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {step}
                  </li>
                ))}
              </ul>
              <div className="mt-3 p-2 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-bold">💡 Explanation:</span> {current.explanation}
                </p>
              </div>
              <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-mono font-bold">
                  ✓ Simplified Result: {current.simplified}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Worked Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Detailed Worked Examples
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 1: Simplify F = A·B + A·B' + A'·B</h3>
              <div className="space-y-1 font-mono text-sm">
                <p>Step 1: Factor A from first two terms: F = A·(B + B') + A'·B</p>
                <p>Step 2: Apply Complement: B + B' = 1 → F = A·1 + A'·B</p>
                <p>Step 3: Apply Identity: A·1 = A → F = A + A'·B</p>
                <p>Step 4: Apply Distributive (OR): A + A'·B = (A + A')·(A + B)</p>
                <p>Step 5: Apply Complement: A + A' = 1 → F = 1·(A + B)</p>
                <p>Step 6: Apply Identity: <strong className="text-blue-600">F = A + B</strong></p>
              </div>
              <p className="text-xs text-gray-500 mt-2">This is a classic simplification showing how to reduce 3 terms to 2 literals!</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 2: Simplify F = (A+B)·(A+C)·(B+C)</h3>
              <div className="space-y-1 font-mono text-sm">
                <p>Step 1: Expand first two terms: (A+B)·(A+C) = A·A + A·C + B·A + B·C</p>
                <p>Step 2: Simplify: A·A = A, so = A + A·C + A·B + B·C</p>
                <p>Step 3: Factor A: = A·(1 + C + B) + B·C</p>
                <p>Step 4: Null Law: 1 + C + B = 1 → = A·1 + B·C = A + B·C</p>
                <p>Step 5: Multiply by (B+C): F = (A + B·C)·(B+C)</p>
                <p>Step 6: Expand: = A·B + A·C + B·C·B + B·C·C</p>
                <p>Step 7: Simplify: B·C·B = B·C, B·C·C = B·C</p>
                <p>Step 8: Combine: = A·B + A·C + B·C</p>
                <p>Step 9: This is the consensus form. <strong className="text-blue-600">F = A·B + A·C + B·C</strong></p>
              </div>
              <p className="text-xs text-gray-500 mt-2">This is the majority function—output is 1 when at least two inputs are 1!</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 3: Simplify F = (A + B)'·(A + B')</h3>
              <div className="space-y-1 font-mono text-sm">
                <p>Step 1: Apply De Morgan's to first term: (A+B)' = A'·B'</p>
                <p>Step 2: F = (A'·B')·(A + B')</p>
                <p>Step 3: Distribute: = A'·B'·A + A'·B'·B'</p>
                <p>Step 4: Simplify: A'·B'·A = 0 (A·A' = 0)</p>
                <p>Step 5: A'·B'·B' = A'·B' (Idempotent: B'·B' = B')</p>
                <p>Step 6: <strong className="text-blue-600">F = A'·B'</strong></p>
              </div>
              <p className="text-xs text-gray-500 mt-2">This shows how De Morgan's and complement laws work together!</p>
            </div>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Add Redundant Terms:</strong> Sometimes adding A·A' or A+A' to an expression helps factor and simplify further.</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Look for Dual Forms:</strong> If you know the SOP simplification, the POS dual will be similar.</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Check for Consensus:</strong> The pattern A·B + A'·C + B·C always simplifies to A·B + A'·C.</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Use Truth Tables for Verification:</strong> Always verify your simplified expression with a truth table.</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Think About Hardware:</strong> Each term may become a gate. Fewer terms = fewer gates.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Applying De Morgan's Incorrectly:</strong> (A·B)' = A' + B', NOT A'·B'. Remember to change the operator!</li>
            <li><strong>Forgetting Operator Precedence:</strong> NOT has highest precedence, then AND, then OR. Use parentheses!</li>
            <li><strong>Assuming All Terms Can Factor:</strong> A·B + C cannot factor A unless C contains A.</li>
            <li><strong>Over-simplifying:</strong> Make sure the simplified expression is equivalent to the original. Verify with truth tables.</li>
            <li><strong>Missing Double Complements:</strong> (A')' = A. Don't forget this when applying De Morgan's repeatedly.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Show All Steps:</strong> Write each application of a law clearly. This helps catch errors and communicates your reasoning.</li>
            <li><strong>Work Systematically:</strong> Follow a consistent strategy: factor, complement pairs, identity, idempotent, consensus.</li>
            <li><strong>Use Standard Notation:</strong> Stick to one notation (· for AND, + for OR, ' for NOT).</li>
            <li><strong>Verify with Truth Tables:</strong> After simplification, test a few input combinations to ensure equivalence.</li>
            <li><strong>Practice Regularly:</strong> Algebraic simplification is a skill that improves with practice. Work through many examples.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Apply all Boolean laws correctly to simplify expressions.</li>
            <li>Use the Consensus Theorem to eliminate redundant terms.</li>
            <li>Simplify expressions with 2-4 variables using algebraic methods.</li>
            <li>Verify simplification results using truth tables.</li>
            <li>Explain the hardware implications of simplification (fewer gates).</li>
            <li>Convert between SOP and POS forms using algebraic methods.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Swadeep from Barrackpore is designing a traffic light controller. The expression for the green light is:
            <br /><br />
            <span className="font-mono">Green = (A·B) + (A·C) + (B·C)</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Can you simplify this expression?</strong>
            <br />
            What does this simplified expression represent in terms of the inputs A, B, and C?
            <br />
            How many gates would you save by using the simplified version?
            <br /><br />
            <strong>Observe carefully:</strong> This is the majority function. Can you see why it's called that?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Algebraic simplification is the foundation of logic optimization. Students often struggle with applying laws systematically.\n\n" +
            "💡 **Teaching Strategy:** Start with the strategy guide. Have students follow the step-by-step process for each example. Emphasize that they should write down which law they're applying at each step.\n\n" +
            "🔍 **Common Misunderstanding:** Students want to simplify too quickly. Encourage them to write all steps—it builds confidence and catches errors.\n\n" +
            "📌 **Real-World Connection:** In industry, every gate eliminated saves money, power, and space. Algebraic simplification directly impacts the bottom line.\n\n" +
            "🎯 **Advanced Insight:** Some expressions cannot be simplified algebraically beyond a certain point—that's when K-maps become useful."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What is the goal of algebraic simplification?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: To reduce Boolean expressions to their simplest form with the fewest terms and literals, leading to simpler, cheaper circuits.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: Simplify: A·B + A·B'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·(B + B') = A·1 = A</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: Simplify: (A+B)·(A+B')</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A + B·B' = A + 0 = A</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: Simplify: A·B + A·B' + A'·B</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·(B + B') + A'·B = A·1 + A'·B = A + A'·B = A + B</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: Simplify: (A+B)·(A'+C)·(B+C)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A+B)·(A'+C) (Consensus Theorem)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: Simplify: A·B + A·C + B·C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·B + A·C + B·C (cannot simplify algebraically further)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: What is the Consensus Theorem?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A·B + A'·C + B·C = A·B + A'·C. The term B·C is redundant.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: Simplify: (A+B)·(A+C)·(B+C)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A+B)·(A+C) (dual of Consensus Theorem)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: Simplify: A·B' + A'·B</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: This is XOR. Cannot simplify further algebraically.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: Simplify: (A·B)'·(A+B)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A' + B')·(A+B) = A'·A + A'·B + B'·A + B'·B = 0 + A'·B + A·B' + 0 = A'·B + A·B'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: What's the difference between simplification and minimization?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Simplification uses algebraic laws; minimization (using K-maps) finds the optimal expression.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: How do you verify a simplification is correct?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Create truth tables for original and simplified expressions. If they match for all inputs, the simplification is correct.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: Simplify: A + A'·B</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A + B (by distributive law: A + A'·B = (A+A')·(A+B) = 1·(A+B) = A+B)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: Simplify: A·(A + B)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·A + A·B = A + A·B = A·(1 + B) = A·1 = A (Absorption Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Simplify: (A + B)·(A + B')</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A + B·B' = A + 0 = A</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: What is the Absorption Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A + A·B = A and A·(A + B) = A</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: Simplify: A·B + A·B'·C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·(B + B'·C) = A·(B + C) (using distributive and complement)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: Why is simplification important in circuit design?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Fewer gates mean lower cost, less power consumption, higher speed, and greater reliability.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Simplify: (A'·B + A·B')'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A'·B)'·(A·B')' = (A + B')·(A' + B) = A·A' + A·B + B'·A' + B'·B = 0 + A·B + A'·B' + 0 = A·B + A'·B'</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What should you do if you're stuck simplifying an expression?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Try adding redundant terms (A·A' or A+A'), use truth tables to check, or consider using a K-map for visualization.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic14;