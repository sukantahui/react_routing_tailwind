import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 16: Simplification Techniques: Reducing expressions step-by-step
 * 
 * Component: Topic16
 * Purpose: Provides systematic step-by-step approach to Boolean simplification:
 *          - Structured methodology for reducing expressions
 *          - Worked examples with detailed steps
 *          - Common simplification sequences
 *          - Verification techniques
 * 
 * When & Why: Used as the seventeenth topic in the Boolean Algebra series. Students
 *             learn to apply a systematic approach to simplification, building on
 *             individual identities to develop a repeatable process for reducing
 *             any Boolean expression to its minimal form.
 * 
 * Return Type: JSX.Element
 */

const Topic16 = () => {
  // State for interactive step-by-step simplification
  const [currentExample, setCurrentExample] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(true);
  const [userExpression, setUserExpression] = useState('');
  const [simplifyResult, setSimplifyResult] = useState('');
  const [customSteps, setCustomSteps] = useState([]);

  // Pre-defined examples with step-by-step simplification
  const examples = [
    {
      name: "Example 1: Basic Simplification",
      expression: "F = A·B + A·B'",
      steps: [
        { step: 1, action: "Look for common factors", operation: "Factor out A", result: "A·(B + B')" },
        { step: 2, action: "Apply Complement Law", operation: "B + B' = 1", result: "A·1" },
        { step: 3, action: "Apply Identity Law", operation: "A·1 = A", result: "A" }
      ],
      final: "A",
      explanation: "This shows how factoring and complement laws eliminate a variable."
    },
    {
      name: "Example 2: Absorption Law",
      expression: "F = A + A·B",
      steps: [
        { step: 1, action: "Identify pattern", operation: "A + A·B matches absorption", result: "A + A·B" },
        { step: 2, action: "Apply Absorption Law", operation: "A + A·B = A", result: "A" }
      ],
      final: "A",
      explanation: "The term A absorbs the larger term A·B."
    },
    {
      name: "Example 3: Consensus Theorem",
      expression: "F = A·B + A'·C + B·C",
      steps: [
        { step: 1, action: "Identify consensus pattern", operation: "A·B + A'·C + B·C", result: "A·B + A'·C + B·C" },
        { step: 2, action: "Apply Consensus Theorem", operation: "B·C is redundant", result: "A·B + A'·C" }
      ],
      final: "A·B + A'·C",
      explanation: "The term B·C is redundant because it's covered by the other two terms."
    },
    {
      name: "Example 4: De Morgan's Theorem",
      expression: "F = (A·B + C)'",
      steps: [
        { step: 1, action: "Apply De Morgan's to OR", operation: "(X + Y)' = X'·Y'", result: "(A·B)'·C'" },
        { step: 2, action: "Apply De Morgan's to AND", operation: "(A·B)' = A' + B'", result: "(A' + B')·C'" },
        { step: 3, action: "Apply Distributive Law", operation: "Expand", result: "A'·C' + B'·C'" }
      ],
      final: "A'·C' + B'·C'",
      explanation: "De Morgan's pushes complements inward, changing operators."
    },
    {
      name: "Example 5: Multiple Identities",
      expression: "F = (A + B)·(A + C)·(B + C)",
      steps: [
        { step: 1, action: "Expand first two terms", operation: "(A+B)·(A+C) = A + B·C", result: "(A + B·C)·(B + C)" },
        { step: 2, action: "Expand remaining product", operation: "Distribute", result: "A·B + A·C + B·C·B + B·C·C" },
        { step: 3, action: "Apply Idempotent Law", operation: "B·C·B = B·C, B·C·C = B·C", result: "A·B + A·C + B·C" },
        { step: 4, action: "Factor common terms", operation: "No further simplification", result: "A·B + A·C + B·C" }
      ],
      final: "A·B + A·C + B·C",
      explanation: "This is the majority function - output is 1 when at least two inputs are 1."
    },
    {
      name: "Example 6: Complex Simplification",
      expression: "F = A·B' + A·C + B'·C",
      steps: [
        { step: 1, action: "Factor common A", operation: "A·(B' + C) + B'·C", result: "A·(B' + C) + B'·C" },
        { step: 2, action: "Apply Consensus Theorem", operation: "A·B' + A·C + B'·C = A·B' + A·C", result: "A·B' + A·C" },
        { step: 3, action: "Factor A", operation: "A·(B' + C)", result: "A·(B' + C)" }
      ],
      final: "A·(B' + C)",
      explanation: "Consensus theorem eliminates the redundant term B'·C."
    }
  ];

  const current = examples[currentExample];

  // Function to simplify user's custom expression (simplified demonstration)
  const simplifyCustomExpression = () => {
    const expr = userExpression.toUpperCase().replace(/\s/g, '');
    // This is a simplified demonstration - in practice, this would be a full parser
    const simplifications = {
      'A+AB': 'A',
      'A+AB+C': 'A+C',
      'AB+AB\'': 'A',
      '(AB)\'': 'A\'+B\'',
      'A+A\'B': 'A+B',
      'A·B+A\'·C+BC': 'A·B+A\'·C'
    };
    
    let result = simplifications[expr];
    if (!result) {
      if (expr.includes('+') && expr.includes('·')) {
        result = "Try a simpler expression first (e.g., A+AB, AB+AB', A·B+A'·C+B·C)";
      } else {
        result = "Expression too complex for demo. Try one of the examples above!";
      }
    }
    
    setSimplifyResult(result);
    
    // Generate mock steps
    setCustomSteps([
      "Step 1: Identify pattern in expression",
      "Step 2: Apply relevant Boolean identity",
      `Step 3: Simplified result: ${result}`
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-orange-100 dark:bg-orange-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Simplification Techniques:</span>
          <span className="block text-orange-600 dark:text-orange-400">Step-by-Step Reduction</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A systematic approach to reducing Boolean expressions
        </p>
      </div>

      <div className="space-y-8">
        {/* Step-by-Step Methodology */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📋</span> Systematic Simplification Methodology
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">The 7-Step Process:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Scan for Common Factors</strong> — Look for variables that appear in multiple terms</li>
                <li><strong>Identify Complement Pairs</strong> — Find A and A' in the same product or sum</li>
                <li><strong>Apply Complement Laws</strong> — A·A'=0, A+A'=1</li>
                <li><strong>Look for Absorption Patterns</strong> — X + X·Y = X or X·(X+Y)=X</li>
                <li><strong>Check for Consensus</strong> — A·B + A'·C + B·C = A·B + A'·C</li>
                <li><strong>Apply De Morgan's When Needed</strong> — Push complements inward</li>
                <li><strong>Use Identity Laws</strong> — Eliminate ·1 and +0 terms</li>
              </ol>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎯 Key Principles:</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Work from Outside In:</strong> Apply De Morgan's to outer complements first</li>
                <li>• <strong>Factor Before Expanding:</strong> Look for common factors before distributing</li>
                <li>• <strong>Add Redundant Terms Strategically:</strong> Sometimes adding A·A' or A+A' helps factorization</li>
                <li>• <strong>Verify Each Step:</strong> Ensure equivalence at every stage</li>
                <li>• <strong>Document Your Work:</strong> Write which law you're applying at each step</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Worked Examples - Step by Step */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Worked Examples: Step-by-Step
          </h2>
          
          {/* Example Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentExample(idx)}
                className={clsx(
                  "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105",
                  currentExample === idx
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {ex.name}
              </button>
            ))}
          </div>
          
          {/* Current Example Display */}
          <div className="bg-gray-100 dark:bg-gray-700/50 p-5 rounded-xl mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Original Expression:</h3>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-xl text-center font-bold">
              {current.expression}
            </div>
          </div>
          
          {/* Steps Display */}
          <button
            onClick={() => setShowAllSteps(!showAllSteps)}
            className="w-full py-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-lg font-medium transition-all duration-300 hover:bg-orange-200 dark:hover:bg-orange-900/60 mb-4"
          >
            {showAllSteps ? "Hide" : "Show"} Simplification Steps
          </button>
          
          {showAllSteps && (
            <div className="space-y-3">
              {current.steps.map((step, idx) => (
                <div key={idx} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{step.action}</p>
                      <p className="font-mono text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {step.operation} → <span className="text-orange-600 dark:text-orange-400 font-bold">{step.result}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-3">
                <p className="font-semibold text-green-700 dark:text-green-300">✓ Final Simplified Result:</p>
                <p className="font-mono text-xl font-bold text-green-600 dark:text-green-400 mt-1">{current.final}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">💡 {current.explanation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Simplification Practice */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✏️</span> Practice: Simplify Step-by-Step
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Enter a Boolean expression and see step-by-step simplification (demo version with common patterns).
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-700/50 p-5 rounded-xl mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Expression (use · for AND, + for OR, ' for NOT):
            </label>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={userExpression}
                onChange={(e) => setUserExpression(e.target.value)}
                placeholder="e.g., A·B + A·B' or A+AB"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={simplifyCustomExpression}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Simplify
              </button>
            </div>
            
            {simplifyResult && (
              <div className="mt-4 space-y-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">📝 Simplification Steps:</p>
                  {customSteps.map((step, idx) => (
                    <p key={idx} className="font-mono text-sm text-gray-700 dark:text-gray-300">{step}</p>
                  ))}
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="font-semibold text-green-700 dark:text-green-300">✓ Simplified Result:</p>
                  <p className="font-mono text-xl font-bold text-green-600 dark:text-green-400">{simplifyResult}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Try these examples:</span> A+AB, AB+AB', (AB)', A·B + A'·C + B·C
            </p>
          </div>
        </div>

        {/* Common Simplification Patterns */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> Common Simplification Patterns
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-mono font-bold">Pattern 1: A·B + A·B'</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 1: Factor A → A·(B+B')</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 2: Complement → A·1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 3: Identity → <strong className="text-orange-600">A</strong></p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-mono font-bold">Pattern 2: (A+B)·(A+B')</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 1: Distribute OR → A + B·B'</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 2: Complement → A + 0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 3: Identity → <strong className="text-orange-600">A</strong></p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-mono font-bold">Pattern 3: A + A·B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 1: Factor A → A·(1+B)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 2: Null Law → A·1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 3: Identity → <strong className="text-orange-600">A</strong></p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-mono font-bold">Pattern 4: A·(A+B)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 1: Distribute → A·A + A·B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 2: Idempotent → A + A·B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 3: Absorption → <strong className="text-orange-600">A</strong></p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-mono font-bold">Pattern 5: A·B + A'·C + B·C</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 1: Identify consensus pattern</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 2: Apply Consensus Theorem</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Result: <strong className="text-orange-600">A·B + A'·C</strong></p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-mono font-bold">Pattern 6: (A·B)'</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step 1: Apply De Morgan's</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Result: <strong className="text-orange-600">A' + B'</strong></p>
            </div>
          </div>
        </div>

        {/* Verification Techniques */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✅</span> Verification Techniques
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Always verify your simplified expression is equivalent to the original:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-2">Truth Table Comparison</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">List all input combinations and compare outputs</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-semibold mb-2">Test Key Values</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Test all-0s, all-1s, and random combinations</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold mb-2">Algebraic Reversal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Apply reverse steps to see if you get original</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-sm text-center">
              <span className="font-bold">🎯 Pro Tip:</span> When in doubt, build a truth table. 
              It's the most reliable verification method and helps catch hidden errors.
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Use a Systematic Checklist:</strong> Before starting, list the laws you might need. Check them off as you apply them.</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Work on Paper First:</strong> Physical writing helps track steps and spot patterns more easily.</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Group Terms Visually:</strong> Use brackets to group terms that might factor together.</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Verify at Checkpoints:</strong> After every 2-3 steps, test a sample input to ensure you haven't made an error.</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Learn from Mistakes:</strong> When your simplification doesn't match the truth table, trace back step by step to find the error.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls in Step-by-Step Simplification
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Skipping Steps:</strong> Jumping too quickly often leads to missed simplification opportunities or errors.</li>
            <li><strong>Misapplying Laws:</strong> Applying absorption when the pattern doesn't exactly match (e.g., A + A'·B ≠ A).</li>
            <li><strong>Operator Precedence Errors:</strong> Forgetting that NOT has highest precedence, then AND, then OR.</li>
            <li><strong>Not Verifying:</strong> Assuming the simplified expression is correct without testing with truth tables.</li>
            <li><strong>Over-simplifying:</strong> Making the expression simpler but changing its function (non-equivalent).</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Write Each Step Clearly:</strong> Document which law you're applying and the resulting expression.</li>
            <li><strong>Use Consistent Notation:</strong> Stick to one notation (· for AND, + for OR, ' for NOT) throughout.</li>
            <li><strong>Factor Before Expanding:</strong> Always look for common factors before distributing.</li>
            <li><strong>Check for Double Complements:</strong> Look for (X')' patterns that can cancel.</li>
            <li><strong>Verify with Truth Tables:</strong> Always test your final result against the original for all input combinations.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-orange-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Apply a systematic 7-step methodology for simplification.</li>
            <li>Simplify expressions by identifying and applying the right identity at each step.</li>
            <li>Document each step with the law used.</li>
            <li>Verify simplifications using truth tables or key value testing.</li>
            <li>Recognize common patterns (absorption, consensus, complement pairs).</li>
            <li>Break down complex expressions into manageable sub-expressions.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Debangshu from Naihati is designing a digital circuit with the following expression:
            <br /><br />
            <span className="font-mono">F = A·B·C + A·B·C' + A·B'·C + A'·B·C</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Can you simplify this step-by-step?</strong>
            <br />
            Try these steps:
            <br />
            1. Group terms with common factors
            <br />
            2. Apply complement laws where possible
            <br />
            3. Use absorption or consensus
            <br /><br />
            What does the simplified expression tell you about the circuit's behavior?
            <br /><br />
            <strong>Observe carefully:</strong> This expression has 4 terms with 3 variables each. Can you find a pattern?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Step-by-step simplification is where students develop fluency. The structured methodology prevents random guessing.\n\n" +
            "💡 **Teaching Strategy:** Have students write each step with the law used. This builds discipline and makes errors easier to spot.\n\n" +
            "🔍 **Common Misunderstanding:** Students want to combine steps. Emphasize that writing each step helps catch errors and is a professional habit.\n\n" +
            "📌 **Real-World Connection:** In industry, design reviews require documented simplification steps. Engineers must show their work.\n\n" +
            "🎯 **Advanced Insight:** The step-by-step approach builds intuition. After enough practice, students will see patterns instantly."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What is the first step in simplifying any Boolean expression?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Scan for common factors that can be factored out using the distributive law.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: How do I know which law to apply first?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Generally: factor common terms → look for complement pairs → apply absorption → check for consensus → apply De Morgan's if needed.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: Simplify step-by-step: A·B + A·B'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: Factor A → A·(B+B'); Step 2: Complement → A·1; Step 3: Identity → A</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: Simplify step-by-step: A + A·B</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: Factor A → A·(1+B); Step 2: Null Law → A·1; Step 3: Identity → A</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: Simplify step-by-step: (A+B)·(A+C)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: Distribute OR → A + B·C; Step 2: No further simplification → A + B·C</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: Simplify step-by-step: A·B + A'·C + B·C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: Identify consensus pattern; Step 2: Apply Consensus Theorem → A·B + A'·C</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: How do I verify my simplification is correct?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Create a truth table for both original and simplified expressions. They must match for all input combinations.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: What should I do if I get stuck?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Try adding redundant terms (A·A' or A+A'), or use a K-map for visualization with 3-4 variables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: Simplify step-by-step: (A·B)'·(A+B)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: De Morgan's → (A'+B')·(A+B); Step 2: Distribute → A'·A + A'·B + B'·A + B'·B; Step 3: Simplify → 0 + A'·B + A·B' + 0 = A'·B + A·B'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: Why is step-by-step documentation important?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It helps catch errors, communicates your reasoning to others, and builds a professional habit for design reviews.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: Simplify step-by-step: A·B·C + A·B·C'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: Factor A·B → A·B·(C + C'); Step 2: Complement → A·B·1; Step 3: Identity → A·B</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: Simplify step-by-step: (A+B)·(A'+C)·(B+C)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: Apply consensus dual → (A+B)·(A'+C)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: What's the most common mistake in step-by-step simplification?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Skipping steps or applying laws incorrectly without verifying the pattern matches exactly.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: How do I simplify expressions with more than 3 variables?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Use the same systematic approach, but consider using K-maps for 3-4 variables as they provide visual grouping.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Simplify step-by-step: A + A'·B</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: Use distributive (OR over AND) → (A+A')·(A+B); Step 2: Complement → 1·(A+B); Step 3: Identity → A+B</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: What is the absorption law in step-by-step terms?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: When you see X + X·Y, factor X: X·(1+Y), then 1+Y=1, so X·1=X. The Y term is absorbed.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: Simplify step-by-step: (A+B+C)·(A+B+C')</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: Let X = A+B; Step 2: (X+C)·(X+C') = X + C·C' = X + 0 = X; Step 3: X = A+B</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: How do I handle nested complements?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Apply De Morgan's from the outermost complement inward, changing operators at each level.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Simplify step-by-step: A·B + A·B' + A'·B</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Step 1: Factor A from first two: A·(B+B') + A'·B = A·1 + A'·B = A + A'·B; Step 2: Apply distributive: (A+A')·(A+B) = 1·(A+B) = A+B</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What's the final step after simplification?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Always verify! Create a truth table or test key input combinations to ensure the simplified expression matches the original.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic16;