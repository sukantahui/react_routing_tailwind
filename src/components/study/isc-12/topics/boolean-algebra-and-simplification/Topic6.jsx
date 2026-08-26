import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 6: Basic Laws of Boolean Algebra: Idempotent Law
 * 
 * Component: Topic6
 * Purpose: Explains the Idempotent Laws of Boolean Algebra:
 *          - A · A = A (AND Idempotent)
 *          - A + A = A (OR Idempotent)
 *          - These laws show that combining a variable with itself yields the variable
 * 
 * When & Why: Used as the seventh topic in the Boolean Algebra series. Idempotent Laws
 *             are fundamental for simplification, showing that redundant occurrences
 *             of the same variable can be eliminated. This is crucial for reducing
 *             complex expressions and optimizing circuits.
 * 
 * Return Type: JSX.Element
 */

const Topic6 = () => {
  // State for interactive demonstrations
  const [idempotentVar, setIdempotentVar] = useState(0);

  // Results for idempotent laws
  const andIdempotentResult = idempotentVar; // A · A = A
  const orIdempotentResult = idempotentVar;   // A + A = A

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-teal-100 dark:bg-teal-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Basic Laws:</span>
          <span className="block text-teal-600 dark:text-teal-400">Idempotent Law</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A · A = A &nbsp;&nbsp;|&nbsp;&nbsp; A + A = A — Repeating yourself doesn't change the truth
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Idempotent Law */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> What is the Idempotent Law?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The <strong className="text-teal-600 dark:text-teal-400">Idempotent Laws</strong> (from Latin "idem" meaning same and "potens" meaning power) state that combining a variable with itself using AND or OR yields the variable itself. These laws show that repetition doesn't change the logical value.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-teal-100 dark:hover:bg-teal-900/40">
              <p className="text-2xl font-mono font-bold text-teal-700 dark:text-teal-300 mb-2">A · A = A</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AND Idempotent Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"A AND A equals A"</p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-teal-100 dark:hover:bg-teal-900/40">
              <p className="text-2xl font-mono font-bold text-teal-700 dark:text-teal-300 mb-2">A + A = A</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">OR Idempotent Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"A OR A equals A"</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> In Boolean Algebra, repetition doesn't add information. Whether you say "A AND A" or just "A", the meaning is the same. This is different from regular algebra where x·x = x² (not x).
            </p>
          </div>
        </div>

        {/* AND Idempotent Law: A · A = A */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> AND Idempotent: A · A = A
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When a variable <strong className="font-mono">A</strong> is ANDed with itself, the result is always <strong className="font-mono">A</strong>. This makes intuitive sense: "It is raining AND it is raining" is equivalent to "It is raining".
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">A · A</th>
                        <th className="px-4 py-2 text-center font-mono">Equals A?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-teal-600">0</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 0 = 0</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-teal-600">1</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 1 = 1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "The student is present AND the student is present" means the same as "The student is present." Saying it twice doesn't change the fact.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive AND Idempotent Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A · A = A</h3>
                <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Variable A</p>
                    <button
                      onClick={() => setIdempotentVar(idempotentVar === 0 ? 1 : 0)}
                      className={clsx(
                        "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                        idempotentVar === 1 
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      )}
                    >
                      {idempotentVar}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">AND</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Same Variable A</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl font-mono text-2xl font-bold flex items-center justify-center shadow-md",
                      idempotentVar === 1 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    )}>
                      {idempotentVar}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result = A</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300",
                      andIdempotentResult === 1 
                        ? "bg-green-500 text-white shadow-lg" 
                        : "bg-red-500 text-white shadow-lg"
                    )}>
                      {andIdempotentResult}
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  💡 The output always matches A! ANDing a variable with itself doesn't change it.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🔧 Circuit Implication:</span> If you see an AND gate with both inputs connected to the same signal, you can replace it with a direct wire. This eliminates unnecessary gates!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OR Idempotent Law: A + A = A */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔀</span> OR Idempotent: A + A = A
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When a variable <strong className="font-mono">A</strong> is ORed with itself, the result is always <strong className="font-mono">A</strong>. This makes intuitive sense: "It is raining OR it is raining" is equivalent to "It is raining".
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">A + A</th>
                        <th className="px-4 py-2 text-center font-mono">Equals A?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-teal-600">0</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 0 = 0</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-teal-600">1</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 1 = 1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You will pass if you study OR you study" means the same as "You will pass if you study." Repeating the condition doesn't add new ways to pass.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive OR Idempotent Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A + A = A</h3>
                <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Variable A</p>
                    <button
                      onClick={() => setIdempotentVar(idempotentVar === 0 ? 1 : 0)}
                      className={clsx(
                        "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                        idempotentVar === 1 
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      )}
                    >
                      {idempotentVar}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">OR</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Same Variable A</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl font-mono text-2xl font-bold flex items-center justify-center shadow-md",
                      idempotentVar === 1 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    )}>
                      {idempotentVar}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result = A</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300",
                      orIdempotentResult === 1 
                        ? "bg-green-500 text-white shadow-lg" 
                        : "bg-red-500 text-white shadow-lg"
                    )}>
                      {orIdempotentResult}
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  💡 The output always matches A! ORing a variable with itself doesn't change it.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🔧 Circuit Implication:</span> If you see an OR gate with both inputs connected to the same signal, you can replace it with a direct wire. Another way to eliminate redundant gates!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison: Idempotent vs Regular Algebra */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📊</span> Idempotent Law vs Regular Algebra
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3 text-center">Regular Algebra</h3>
              <div className="space-y-3 text-center">
                <p className="font-mono text-lg">x · x = x²</p>
                <p className="font-mono text-lg">x + x = 2x</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Repetition changes the value</p>
              </div>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-teal-700 dark:text-teal-400 mb-3 text-center">Boolean Algebra</h3>
              <div className="space-y-3 text-center">
                <p className="font-mono text-lg">A · A = A</p>
                <p className="font-mono text-lg">A + A = A</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Repetition doesn't change the value</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">🎯 Key Difference:</span> In Boolean Algebra, variables are limited to 0 and 1, so A·A always equals A (since 0·0=0, 1·1=1). This is a unique property of binary logic!
            </p>
          </div>
        </div>

        {/* Application Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Application Examples
          </h2>
          
          <div className="space-y-4">
            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 1: Simplifying Redundant Terms</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = A · A · B</p>
              <p className="text-gray-700 dark:text-gray-300">Step 1: Apply AND Idempotent: <span className="font-mono">A · A = A</span></p>
              <p className="text-gray-700 dark:text-gray-300">Step 2: <span className="font-mono">F = A · B</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The repeated A is eliminated!</p>
            </div>
            
            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 2: Simplifying OR Expressions</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = A + A + B</p>
              <p className="text-gray-700 dark:text-gray-300">Step 1: Apply OR Idempotent: <span className="font-mono">A + A = A</span></p>
              <p className="text-gray-700 dark:text-gray-300">Step 2: <span className="font-mono">F = A + B</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Multiple occurrences of A reduce to a single A!</p>
            </div>
            
            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 3: Complex Expression</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A + B) · (A + B) + C</p>
              <p className="text-gray-700 dark:text-gray-300">Step 1: Let X = (A+B)</p>
              <p className="text-gray-700 dark:text-gray-300">Step 2: X · X = X (AND Idempotent)</p>
              <p className="text-gray-700 dark:text-gray-300">Step 3: <span className="font-mono font-bold text-teal-600">F = (A + B) + C = A + B + C</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The repeated (A+B) term simplifies dramatically!</p>
            </div>
          </div>
        </div>

        {/* Advanced Concept: Idempotence in Programming */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">💻</span> Idempotence in Programming
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The concept of <strong className="text-teal-600 dark:text-teal-400">idempotence</strong> extends beyond Boolean Algebra into programming and API design:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔁 Idempotent Operations</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">An operation is idempotent if applying it multiple times has the same effect as applying it once.</p>
              <div className="mt-2 p-2 bg-gray-200 dark:bg-gray-600 rounded font-mono text-xs">
                <code>SET x = 5</code> (idempotent - setting to 5 twice is same as once)
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📡 REST APIs</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">GET, PUT, DELETE methods should be idempotent in well-designed APIs. POST is typically not idempotent.</p>
              <div className="mt-2 p-2 bg-gray-200 dark:bg-gray-600 rounded font-mono text-xs">
                <code>DELETE /user/123</code> (idempotent - deleting twice has same result)
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Connection:</span> Boolean idempotence (A AND A = A) is the simplest example of this broader concept. Understanding it here helps grasp idempotence in complex systems!
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Spot Redundancy Quickly:</strong> In any expression, look for repeated variables. They can be reduced to a single occurrence.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Simplify Sub-expressions:</strong> When you see (X)·(X) or (X)+(X), replace with X immediately. This works for any sub-expression, not just single variables.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Circuit Optimization:</strong> A gate with both inputs tied together is redundant. Replace with a wire to save components and reduce fan-out.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Memory Aid:</strong> "A AND A is just A, A OR A is still A" — repetition is redundant in Boolean logic.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Test Generation:</strong> When generating test vectors, you can ignore redundant terms—they don't affect the output.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Confusing with Regular Algebra:</strong> In regular math, x·x = x², not x. Boolean Algebra is different! Remember that A is only 0 or 1.</li>
            <li><strong>Applying to Different Variables:</strong> Idempotent applies only when the variable is the SAME. A·B ≠ A unless B = A.</li>
            <li><strong>Overlooking Nested Expressions:</strong> (A+B)·(A+B) simplifies to (A+B), but students sometimes try to simplify inside first incorrectly.</li>
            <li><strong>Misapplying to Constants:</strong> 1·1 = 1 and 0·0 = 0, but that's just following the rule. Constants also follow idempotent law.</li>
            <li><strong>Forgetting Both Laws:</strong> Both AND and OR have idempotent laws. Don't apply one to the other operation!</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Simplify Early:</strong> Apply idempotent law as soon as you spot repeated variables. This reduces complexity for other simplifications.</li>
            <li><strong>Check for Redundancy:</strong> Before implementing a circuit, check if any gate has identical inputs—those can be eliminated.</li>
            <li><strong>Use Substitution:</strong> For complex expressions, substitute a temporary variable for repeated sub-expressions, then apply idempotent.</li>
            <li><strong>Verify with Truth Tables:</strong> When in doubt, build a truth table to verify that A·A equals A for all inputs.</li>
            <li><strong>Think About Meaning:</strong> In natural language, "A AND A" is redundant. Use this intuition to check your simplifications.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-teal-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>State both Idempotent Laws: A·A = A and A+A = A.</li>
            <li>Prove the Idempotent Laws using truth tables.</li>
            <li>Simplify Boolean expressions by eliminating repeated variables.</li>
            <li>Explain why A·A equals A in Boolean but not in regular algebra.</li>
            <li>Identify redundant gates in circuits (both inputs same).</li>
            <li>Understand the broader concept of idempotence in programming.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Abhronila from Barrackpore is designing a voting system. The system has three judges who vote YES (1) or NO (0). The result should be YES if at least two judges vote YES.
            <br /><br />
            The Boolean expression is: <span className="font-mono">Result = (A·B) + (A·C) + (B·C)</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Try applying the idempotent law to see if this can be simplified further.</strong>
            <br /><br />
            What if all three judges vote YES? What is A·A? Can you use this to understand why the majority vote circuit works?
            <br /><br />
            <strong>Observe carefully:</strong> How does the idempotent law help verify that the circuit correctly handles unanimous votes?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Idempotent Laws are simple but often misunderstood because they contradict regular algebra instincts.\n\n" +
            "💡 **Teaching Strategy:** Start with the analogy: 'It is raining AND it is raining' is the same as 'It is raining.' This builds intuition before introducing the formal law.\n\n" +
            "🔍 **Common Misunderstanding:** Students with strong math backgrounds struggle because they expect A·A = A². Emphasize that Boolean variables are only 0 or 1, so 1·1=1 and 0·0=0.\n\n" +
            "📌 **Real-World Connection:** In circuit design, engineers often accidentally create gates with both inputs tied together. Idempotent law tells us these gates are unnecessary!\n\n" +
            "🎯 **Programming Connection:** Introduce idempotence in APIs and operations. This shows how Boolean concepts scale to complex systems."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What is the AND Idempotent Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The AND Idempotent Law states that A · A = A. When a variable is ANDed with itself, the result is the variable itself.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: What is the OR Idempotent Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The OR Idempotent Law states that A + A = A. When a variable is ORed with itself, the result is the variable itself.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: Why is A·A = A in Boolean Algebra but not in regular algebra?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because Boolean variables are limited to 0 and 1. 0·0=0 and 1·1=1, so the result always equals the original variable.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: Prove A·A = A using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For A=0: 0·0=0; For A=1: 1·1=1. Output always equals A.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: Prove A+A = A using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For A=0: 0+0=0; For A=1: 1+1=1. Output always equals A.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: Simplify: X·X·Y</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = X·Y (using AND Idempotent)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: Simplify: P+P+Q</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = P+Q (using OR Idempotent)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: Simplify: (A+B)·(A+B)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A+B (AND Idempotent applies to the whole sub-expression)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: Simplify: (X·Y)+(X·Y)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = X·Y (OR Idempotent applies to the whole sub-expression)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: Does idempotent law apply to constants?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! 1·1=1 and 0·0=0. Constants also follow the law.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: Can we apply idempotent law to different variables?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. A·B ≠ A unless B = A. The variables must be identical.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: What's the circuit implication of idempotent law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A gate with both inputs tied to the same signal can be replaced with a wire, saving components.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: What does "idempotent" mean?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It comes from Latin "idem" (same) and "potens" (power). It means applying an operation multiple times gives the same result as applying it once.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: How does idempotent law help in simplification?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It eliminates redundant occurrences of variables, making expressions smaller and circuits simpler.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: Is A·A·A equal to A?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! A·A·A = (A·A)·A = A·A = A. Any number of ANDs of the same variable equals the variable.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: Is A+A+A equal to A?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! A+A+A = (A+A)+A = A+A = A. Any number of ORs of the same variable equals the variable.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: What's the difference between idempotent and identity laws?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Identity: A·1=A, A+0=A (constant with variable). Idempotent: A·A=A, A+A=A (variable with itself).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: Can idempotent law be applied to expressions like (A·B)·(A·B)?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Let X = A·B. Then X·X = X, so (A·B)·(A·B) = A·B.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: Why is idempotence important in API design?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Idempotent operations can be safely retried without unintended side effects, making systems more robust.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: Simplify: F = (A+B+C)·(A+B+C) + (X·Y) + (X·Y)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A+B+C) + (X·Y) (AND Idempotent on first term, OR Idempotent on last two terms)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic6;