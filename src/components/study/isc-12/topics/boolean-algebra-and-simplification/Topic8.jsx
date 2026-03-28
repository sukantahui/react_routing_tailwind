import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 8: Basic Laws of Boolean Algebra: Complement Law
 * 
 * Component: Topic8
 * Purpose: Explains the Complement Laws of Boolean Algebra:
 *          - A · A' = 0 (AND Complement)
 *          - A + A' = 1 (OR Complement)
 *          - These laws show how a variable and its complement interact
 * 
 * When & Why: Used as the ninth topic in the Boolean Algebra series. Complement Laws
 *             are fundamental for understanding how a variable and its inverse
 *             combine to produce constants. This is essential for simplification,
 *             proof of identities, and understanding logic gate behavior.
 * 
 * Return Type: JSX.Element
 */

const Topic8 = () => {
  // State for interactive demonstrations
  const [complementVar, setComplementVar] = useState(0);
  const [showExplanation, setShowExplanation] = useState(true);

  // Calculate complement
  const complement = complementVar === 0 ? 1 : 0;
  const andComplementResult = 0; // A · A' = 0 always
  const orComplementResult = 1;   // A + A' = 1 always

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-pink-100 dark:bg-pink-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Basic Laws:</span>
          <span className="block text-pink-600 dark:text-pink-400">Complement Law</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A · A' = 0 &nbsp;&nbsp;|&nbsp;&nbsp; A + A' = 1 — A variable and its opposite cancel out
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Complement Law */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎯</span> What is the Complement Law?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The <strong className="text-pink-600 dark:text-pink-400">Complement Laws</strong> (also called the <strong className="text-pink-600 dark:text-pink-400">Inverse Laws</strong>) describe what happens when a variable is combined with its complement (NOT). These laws state that:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/40">
              <p className="text-2xl font-mono font-bold text-pink-700 dark:text-pink-300 mb-2">A · A' = 0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AND Complement Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"A AND NOT A equals FALSE"</p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/40">
              <p className="text-2xl font-mono font-bold text-pink-700 dark:text-pink-300 mb-2">A + A' = 1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">OR Complement Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"A OR NOT A equals TRUE"</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> A variable and its complement can never be true at the same time (AND gives 0), but one of them is always true (OR gives 1). This is the foundation of the "law of excluded middle" in logic.
            </p>
          </div>
        </div>

        {/* AND Complement Law: A · A' = 0 */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> AND Complement: A · A' = 0
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When a variable <strong className="font-mono">A</strong> is ANDed with its complement <strong className="font-mono">A'</strong>, the result is always <strong className="font-mono">0</strong>. This makes intuitive sense: something cannot be both true and false at the same time.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">A'</th>
                        <th className="px-4 py-2 text-center font-mono">A · A'</th>
                        <th className="px-4 py-2 text-center font-mono">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-pink-600">0</td>
                        <td className="px-4 py-2 text-center text-pink-600">Always 0</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-pink-600">0</td>
                        <td className="px-4 py-2 text-center text-pink-600">Always 0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "The light is ON AND the light is OFF" is impossible. This condition can never be true (0).
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive AND Complement Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A · A' = 0</h3>
                <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">A</p>
                    <button
                      onClick={() => setComplementVar(complementVar === 0 ? 1 : 0)}
                      className={clsx(
                        "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                        complementVar === 1 
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      )}
                    >
                      {complementVar}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">AND</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">A'</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl font-mono text-2xl font-bold flex items-center justify-center shadow-md",
                      complement === 1 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    )}>
                      {complement}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result = 0</p>
                    <div className="w-20 h-20 rounded-xl bg-red-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      0
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  💡 No matter what A is, A AND (NOT A) is ALWAYS 0!
                </p>
              </div>

              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full py-2 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 rounded-lg font-medium transition-all duration-300 hover:bg-pink-200 dark:hover:bg-pink-900/60"
              >
                {showExplanation ? "Hide" : "Show"} Why This Makes Sense
              </button>
              
              {showExplanation && (
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg animate-[fade-up_0.3s_ease-out]">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-bold">📝 Logical Explanation:</span><br />
                    • If A = 0, then A' = 1 → 0 · 1 = 0<br />
                    • If A = 1, then A' = 0 → 1 · 0 = 0<br />
                    • A and A' can never both be 1 simultaneously<br />
                    • Therefore, their AND is always 0
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* OR Complement Law: A + A' = 1 */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔀</span> OR Complement: A + A' = 1
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When a variable <strong className="font-mono">A</strong> is ORed with its complement <strong className="font-mono">A'</strong>, the result is always <strong className="font-mono">1</strong>. This makes intuitive sense: something is either true or false — there's no third option.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">A'</th>
                        <th className="px-4 py-2 text-center font-mono">A + A'</th>
                        <th className="px-4 py-2 text-center font-mono">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-pink-600">1</td>
                        <td className="px-4 py-2 text-center text-pink-600">Always 1</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-pink-600">1</td>
                        <td className="px-4 py-2 text-center text-pink-600">Always 1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "The light is ON OR the light is OFF" is always true (1). One of these must be the case.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive OR Complement Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A + A' = 1</h3>
                <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">A</p>
                    <button
                      onClick={() => setComplementVar(complementVar === 0 ? 1 : 0)}
                      className={clsx(
                        "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                        complementVar === 1 
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      )}
                    >
                      {complementVar}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">OR</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">A'</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl font-mono text-2xl font-bold flex items-center justify-center shadow-md",
                      complement === 1 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    )}>
                      {complement}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result = 1</p>
                    <div className="w-20 h-20 rounded-xl bg-green-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      1
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  💡 No matter what A is, A OR (NOT A) is ALWAYS 1!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Law of Excluded Middle */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">⚖️</span> The Law of Excluded Middle
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Complement Laws are the Boolean Algebra expression of Aristotle's <strong className="text-pink-600 dark:text-pink-400">Law of Excluded Middle</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">📜 Philosophical Statement</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">"For any proposition, either that proposition is true or its negation is true."</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This translates to: A + A' = 1</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">🚫 Law of Non-Contradiction</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">"A proposition cannot be both true and false at the same time."</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This translates to: A · A' = 0</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Philosophical Connection:</span> These two laws together form the foundation of classical logic. Every statement in Boolean Algebra respects that a variable and its complement cannot both be true, but one of them must be true.
            </p>
          </div>
        </div>

        {/* Application Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Application Examples
          </h2>
          
          <div className="space-y-4">
            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 1: Simplification with Complement</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = A · B · A'</p>
              <p className="text-gray-700 dark:text-gray-300">Step 1: Reorder: <span className="font-mono">A · A' · B</span></p>
              <p className="text-gray-700 dark:text-gray-300">Step 2: <span className="font-mono">A · A' = 0</span> (AND Complement)</p>
              <p className="text-gray-700 dark:text-gray-300">Step 3: <span className="font-mono">0 · B = 0</span></p>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-pink-600">F = 0</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Any expression containing A · A' simplifies to 0!</p>
            </div>
            
            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 2: Simplification with OR Complement</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = A + A' + B</p>
              <p className="text-gray-700 dark:text-gray-300">Step 1: <span className="font-mono">A + A' = 1</span> (OR Complement)</p>
              <p className="text-gray-700 dark:text-gray-300">Step 2: <span className="font-mono">1 + B = 1</span></p>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-pink-600">F = 1</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Any expression containing A + A' simplifies to 1!</p>
            </div>
            
            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 3: Complex Expression</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A · B · C) + (A' · B) + (A · C') + (A · A')</p>
              <p className="text-gray-700 dark:text-gray-300">Step 1: Last term: <span className="font-mono">A · A' = 0</span></p>
              <p className="text-gray-700 dark:text-gray-300">Step 2: <span className="font-mono">F = (A·B·C) + (A'·B) + (A·C') + 0</span></p>
              <p className="text-gray-700 dark:text-gray-300">Step 3: <span className="font-mono">F = (A·B·C) + (A'·B) + (A·C')</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The complement term disappears entirely!</p>
            </div>
          </div>
        </div>

        {/* Advanced Concept: Tautology and Contradiction */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📚</span> Tautology and Contradiction
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Complement Laws define two special types of Boolean expressions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Tautology</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">An expression that is always TRUE (1) regardless of input values.</p>
              <p className="font-mono text-sm mt-2">Examples: A + A', 1, A + 1</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Always evaluates to 1</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Contradiction</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">An expression that is always FALSE (0) regardless of input values.</p>
              <p className="font-mono text-sm mt-2">Examples: A · A', 0, A · 0</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Always evaluates to 0</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Design Implication:</span> In circuit design, if an expression simplifies to 1 (tautology), the output is always HIGH — the circuit is redundant. If it simplifies to 0 (contradiction), the output is always LOW — the circuit is faulty or unnecessary.
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-pink-500 font-bold">✓</span> <strong>Spot Complements Quickly:</strong> When simplifying, always look for A and A' in the same product or sum. They immediately simplify to 0 (AND) or 1 (OR).</li>
            <li className="flex items-start gap-2"><span className="text-pink-500 font-bold">✓</span> <strong>Term Elimination:</strong> In an AND expression, if you find A·A', the entire product becomes 0. In an OR expression, if you find A+A', the entire sum becomes 1.</li>
            <li className="flex items-start gap-2"><span className="text-pink-500 font-bold">✓</span> <strong>Debugging Aid:</strong> If a circuit output is stuck at 0, check if any AND gate has complementary inputs. If stuck at 1, check for complementary inputs to OR gates.</li>
            <li className="flex items-start gap-2"><span className="text-pink-500 font-bold">✓</span> <strong>Memory Aid:</strong> "AND with complement → 0 (can't be both), OR with complement → 1 (must be one)."</li>
            <li className="flex items-start gap-2"><span className="text-pink-500 font-bold">✓</span> <strong>Test Generation:</strong> When testing circuits, complement pairs are excellent test points. They should never both be 1 in a well-designed system.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Applying Complement Law Incorrectly:</strong> A·A' = 0, but (A·B)·(A·B)' = 0 works only if the expressions are exact complements.</li>
            <li><strong>Missing Parentheses:</strong> A·A'+B means (A·A')+B, not A·(A'+B). The complement applies only to A, not to A+B.</li>
            <li><strong>Confusing with Idempotent Law:</strong> A·A = A (idempotent), not 0. A·A' = 0 (complement). Don't mix them!</li>
            <li><strong>Assuming All Pairs Cancel:</strong> A·B + A'·B simplifies to B (using distributive and complement), not 1. Only direct complements cancel completely.</li>
            <li><strong>Forgetting the Law of Excluded Middle:</strong> In real systems, "don't care" conditions can violate this law. Not all inputs are guaranteed to be complements.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Simplify Complement Pairs First:</strong> When simplifying Boolean expressions, look for A·A' or A+A' before applying other laws. They give immediate results.</li>
            <li><strong>Check for Hidden Complements:</strong> Sometimes complements are not obvious. For example, (A+B) and (A+B)' are complements. Look for patterns.</li>
            <li><strong>Use De Morgan's to Reveal Complements:</strong> Sometimes you need to apply De Morgan's to see that two terms are complements.</li>
            <li><strong>Verify with Truth Tables:</strong> When in doubt, create a truth table to confirm that A·A' is always 0 and A+A' is always 1.</li>
            <li><strong>Document Invariants:</strong> In circuit design, note that certain signals should always be complements. This helps in debugging.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-pink-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>State both Complement Laws: A·A'=0 and A+A'=1.</li>
            <li>Prove the Complement Laws using truth tables.</li>
            <li>Simplify Boolean expressions by identifying complement pairs.</li>
            <li>Explain the Law of Excluded Middle and Law of Non-Contradiction.</li>
            <li>Define tautology and contradiction with examples.</li>
            <li>Identify when an expression simplifies to 0 or 1 using complement laws.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Tuhina from Barrackpore is designing a car security system. The alarm should sound if:
            <br /><br />
            - The door is open (D = 1) AND the car is locked (L = 1)
            <br />
            - OR the ignition is on (I = 1) AND the car is locked (L = 1)
            <br />
            - BUT the system has a "valet mode" switch (V = 1) that disables the alarm
            <br /><br />
            Expression: <span className="font-mono">Alarm = (D·L + I·L) · V'</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">What happens if V = 1 (valet mode activated)?</strong>
            <br />
            How does the Complement Law apply to V' when V = 1?
            <br /><br />
            <strong>Observe carefully:</strong> How does the complement of a signal (like V') help create "disable" or "enable" conditions in real circuits?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "The Complement Laws are among the most intuitive for students because they align with everyday reasoning.\n\n" +
            "💡 **Teaching Strategy:** Start with philosophical statements: 'It cannot be both raining and not raining' (AND law). 'It is either raining or not raining' (OR law). This builds intuition before notation.\n\n" +
            "🔍 **Common Misunderstanding:** Students sometimes think A·A' = 1 or A+A' = 0. Emphasize the real-world logic: can something be both true and false? No! Can something be either true or false? Yes!\n\n" +
            "📌 **Real-World Connection:** In digital circuits, these laws explain why certain combinations of inputs produce fixed outputs. They're also essential for understanding enable/disable signals.\n\n" +
            "🎯 **Advanced Connection:** Introduce tautology and contradiction. These concepts appear in programming (always true/false conditions) and are valuable for code optimization."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What is the AND Complement Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The AND Complement Law states that A · A' = 0. A variable ANDed with its complement always equals 0 (FALSE).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: What is the OR Complement Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The OR Complement Law states that A + A' = 1. A variable ORed with its complement always equals 1 (TRUE).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: What is the Law of Excluded Middle?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It's the philosophical principle that for any proposition, either it is true or its negation is true. In Boolean terms: A + A' = 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: What is the Law of Non-Contradiction?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It's the principle that a proposition cannot be both true and false simultaneously. In Boolean terms: A · A' = 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: Prove A · A' = 0 using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For A=0: 0·1=0; For A=1: 1·0=0. Both rows show output 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: Prove A + A' = 1 using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For A=0: 0+1=1; For A=1: 1+0=1. Both rows show output 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: Simplify: X · Y · X'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (X·X')·Y = 0·Y = 0 (AND Complement then Null Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: Simplify: P + Q + P'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (P+P')+Q = 1+Q = 1 (OR Complement then Null Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: Simplify: (A·B)·(A·B)'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Let X = A·B. Then X·X' = 0 (AND Complement Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: Simplify: (A+B) + (A+B)'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Let X = A+B. Then X+X' = 1 (OR Complement Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: What is a tautology?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A tautology is a Boolean expression that is always TRUE (1) regardless of input values. Example: A + A'.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: What is a contradiction?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A contradiction is a Boolean expression that is always FALSE (0) regardless of input values. Example: A · A'.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: Simplify: (A·A' + B)·(C + C')</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (0 + B)·(1) = B·1 = B</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: How do complement laws help in circuit testing?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: If a circuit has inputs that are supposed to be complements, they should never both be 1 (for AND) and always have at least one 1 (for OR). Testing these conditions helps find faults.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: What happens if you AND a signal with its complement in hardware?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The output will always be 0. This is used in circuits to "disable" signals or create constant 0 outputs.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: What happens if you OR a signal with its complement in hardware?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The output will always be 1. This is used to create constant 1 outputs or "enable" signals permanently.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: Simplify: (A·B·C) + (A·B·C)'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Let X = A·B·C. Then X + X' = 1 (OR Complement Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: Simplify: (A+B+C)·(A+B+C)'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Let X = A+B+C. Then X·X' = 0 (AND Complement Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: Can complement laws be applied to constants?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! 0·1=0 and 1·0=0 for AND complement; 0+1=1 and 1+0=1 for OR complement.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: Why are complement laws fundamental to Boolean Algebra?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They establish the inverse relationship between a variable and its complement, enabling simplification, proof of identities, and forming the basis of logic operations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic8;