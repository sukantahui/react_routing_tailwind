import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 5: Basic Laws of Boolean Algebra: Null Law
 * 
 * Component: Topic5
 * Purpose: Explains the Null Laws (also called Domination Laws) of Boolean Algebra:
 *          - A · 0 = 0 (AND Null Law)
 *          - A + 1 = 1 (OR Null Law)
 *          - These laws show how constants can dominate and force outputs
 * 
 * When & Why: Used as the sixth topic in the Boolean Algebra series. Null Laws are
 *             essential for understanding how constants can force outputs to fixed
 *             values regardless of variable inputs. This is critical for circuit
 *             optimization and understanding "always on/off" conditions.
 * 
 * Return Type: JSX.Element
 */

const Topic5 = () => {
  // State for interactive demonstrations
  const [andNullVar, setAndNullVar] = useState(0);
  const [orNullVar, setOrNullVar] = useState(0);

  // Results for null laws
  const andNullResult = 0; // A · 0 = 0 always
  const orNullResult = 1;   // A + 1 = 1 always

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-red-100 dark:bg-red-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Basic Laws:</span>
          <span className="block text-red-600 dark:text-red-400">Null Law</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A · 0 = 0 &nbsp;&nbsp;|&nbsp;&nbsp; A + 1 = 1 — The constants dominate!
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Null Law */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">👑</span> What is the Null Law?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The <strong className="text-red-600 dark:text-red-400">Null Laws</strong> (also called <strong className="text-red-600 dark:text-red-400">Domination Laws</strong>) describe how constants can "dominate" a Boolean expression. These laws state that:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-900/40">
              <p className="text-2xl font-mono font-bold text-red-700 dark:text-red-300 mb-2">A · 0 = 0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AND Null Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"Anything AND FALSE equals FALSE"</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/40">
              <p className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300 mb-2">A + 1 = 1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">OR Null Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"Anything OR TRUE equals TRUE"</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-blue-50 dark:from-red-900/20 dark:to-blue-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> Unlike the Identity Laws where the variable is preserved, Null Laws cause the constant to "dominate" the output. A single 0 in an AND operation or a single 1 in an OR operation forces the output to a fixed value, regardless of the variable.
            </p>
          </div>
        </div>

        {/* AND Null Law: A · 0 = 0 */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> AND Null Law: A · 0 = 0
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When a variable <strong className="font-mono">A</strong> is ANDed with <strong className="font-mono">0</strong>, the result is always <strong className="font-mono">0</strong>. The constant <strong className="text-red-600">0</strong> "dominates" the AND operation—once there's a 0 anywhere in an AND expression, the entire output becomes 0.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">0</th>
                        <th className="px-4 py-2 text-center font-mono">A · 0</th>
                        <th className="px-4 py-2 text-center font-mono">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-red-600">0</td>
                        <td className="px-4 py-2 text-center text-red-600">Always 0</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-red-600">0</td>
                        <td className="px-4 py-2 text-center text-red-600">Always 0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You can enter the VIP lounge <strong>IF</strong> you have an invitation <strong>AND</strong> the lounge is open." If the lounge is closed (0), then entry is impossible regardless of your invitation status.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive AND Null Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A · 0 = 0</h3>
                <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Variable A</p>
                    <button
                      onClick={() => setAndNullVar(andNullVar === 0 ? 1 : 0)}
                      className={clsx(
                        "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                        andNullVar === 1 
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      )}
                    >
                      {andNullVar}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">AND</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Constant 0</p>
                    <div className="w-20 h-20 rounded-xl bg-red-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      0
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
                  💡 No matter what A is, the output is ALWAYS 0!
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🔧 Circuit Implication:</span> An AND gate with one input tied to 0 will always output 0, regardless of the other input. This gate can be completely removed from the circuit.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OR Null Law: A + 1 = 1 */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔀</span> OR Null Law: A + 1 = 1
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When a variable <strong className="font-mono">A</strong> is ORed with <strong className="font-mono">1</strong>, the result is always <strong className="font-mono">1</strong>. The constant <strong className="text-blue-600">1</strong> "dominates" the OR operation—once there's a 1 anywhere in an OR expression, the entire output becomes 1.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">1</th>
                        <th className="px-4 py-2 text-center font-mono">A + 1</th>
                        <th className="px-4 py-2 text-center font-mono">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-blue-600">1</td>
                        <td className="px-4 py-2 text-center text-blue-600">Always 1</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-blue-600">1</td>
                        <td className="px-4 py-2 text-center text-blue-600">Always 1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You can enter the VIP lounge <strong>IF</strong> you have an invitation <strong>OR</strong> you're a celebrity." If you're a celebrity (1), then entry is guaranteed regardless of invitation status.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive OR Null Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A + 1 = 1</h3>
                <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Variable A</p>
                    <button
                      onClick={() => setOrNullVar(orNullVar === 0 ? 1 : 0)}
                      className={clsx(
                        "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                        orNullVar === 1 
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      )}
                    >
                      {orNullVar}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">OR</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Constant 1</p>
                    <div className="w-20 h-20 rounded-xl bg-green-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      1
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
                  💡 No matter what A is, the output is ALWAYS 1!
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🔧 Circuit Implication:</span> An OR gate with one input tied to 1 will always output 1, regardless of the other input. This gate can be replaced with a constant 1 source.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison: Identity vs Null */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> Identity vs Null Laws: A Quick Reference
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3 text-center">Identity Laws (Preserve)</h3>
              <div className="space-y-2 text-center">
                <p className="font-mono text-lg">A · 1 = A</p>
                <p className="font-mono text-lg">A + 0 = A</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Variable is preserved</p>
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3 text-center">Null Laws (Dominate)</h3>
              <div className="space-y-2 text-center">
                <p className="font-mono text-lg">A · 0 = 0</p>
                <p className="font-mono text-lg">A + 1 = 1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Constant dominates</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">🎯 Memory Trick:</span> <br />
              AND with 0 → Output 0 (like a "kill switch")<br />
              OR with 1 → Output 1 (like a "bypass switch")
            </p>
          </div>
        </div>

        {/* Application Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Application Examples
          </h2>
          
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 1: AND Null Law</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A · B · C) · 0</p>
              <p className="text-gray-700 dark:text-gray-300">Using AND Null Law: <span className="font-mono font-bold text-red-600">(A · B · C) · 0 = 0</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The entire expression becomes 0, regardless of A, B, and C!</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 2: OR Null Law</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A · B) + 1 + (C · D)</p>
              <p className="text-gray-700 dark:text-gray-300">Using OR Null Law: <span className="font-mono font-bold text-blue-600">(A·B) + 1 = 1</span>, so entire expression = <span className="font-mono font-bold">1</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Once there's a 1 in an OR expression, everything becomes 1!</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 3: Multiple Constants</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A + B) · 0 + (C · D) + 1</p>
              <p className="text-gray-700 dark:text-gray-300">Step 1: <span className="font-mono">(A+B) · 0 = 0</span> (AND Null Law)</p>
              <p className="text-gray-700 dark:text-gray-300">Step 2: <span className="font-mono">0 + (C·D) + 1 = 1</span> (OR Null Law)</p>
              <p className="text-gray-700 dark:text-gray-300">Final: <span className="font-mono font-bold text-purple-600">F = 1</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The +1 dominates the entire OR expression!</p>
            </div>
          </div>
        </div>

        {/* Advanced Concept: Short-Circuit Evaluation */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">⚡</span> Short-Circuit Evaluation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Null Laws directly explain the concept of <strong className="text-red-600 dark:text-red-400">short-circuit evaluation</strong> used in programming languages:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AND Short-Circuit</h3>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">if (false && expensiveFunction()) {`{ ... }`}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Since false AND anything = false, expensiveFunction() never executes!</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">OR Short-Circuit</h3>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">if (true || expensiveFunction()) {`{ ... }`}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Since true OR anything = true, expensiveFunction() never executes!</p>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            💡 This optimization is used in JavaScript, Python, Java, and many other languages to improve performance and prevent errors.
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✓</span> <strong>Spot Domination Quickly:</strong> In any AND expression, if ANY factor is 0, the whole product is 0. In any OR expression, if ANY term is 1, the whole sum is 1.</li>
            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✓</span> <strong>Gate Elimination:</strong> AND gate with 0 input → Remove gate, output is 0. OR gate with 1 input → Remove gate, output is 1. This saves components!</li>
            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✓</span> <strong>Debugging Shortcuts:</strong> When debugging, if you see a 0 in an AND chain or a 1 in an OR chain, you can immediately know the output without evaluating everything.</li>
            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✓</span> <strong>Test Pattern Generation:</strong> In test circuits, forcing a 0 into an AND chain or a 1 into an OR chain can disable/enable entire sections for isolation testing.</li>
            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✓</span> <strong>Memory Aid:</strong> "AND with 0 → 0 (kill), OR with 1 → 1 (thrill)".</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Confusing Null Law with Identity Law:</strong> Remember: A·0=0 (Null), A·1=A (Identity). A+1=1 (Null), A+0=A (Identity). Don't mix them up!</li>
            <li><strong>Assuming Constants Always Dominate:</strong> Only 0 dominates AND and 1 dominates OR. In A·1, the 1 does NOT dominate (that's Identity). In A+0, the 0 does NOT dominate (that's Identity).</li>
            <li><strong>Overlooking Nested Expressions:</strong> In (A·B·C)·0, students might forget to apply Null Law because they focus on the variables inside. The outer AND with 0 dominates everything!</li>
            <li><strong>Applying Null Law Incorrectly:</strong> A·0=0 is ALWAYS true regardless of A. Some students think it depends on A. It doesn't!</li>
            <li><strong>Misunderstanding in Programming:</strong> In languages with short-circuit evaluation, expressions like (false && someFunction()) don't call someFunction(). Students often expect it to be called.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Simplify from the Outside In:</strong> Look for constants at the outermost level first. They often simplify the entire expression.</li>
            <li><strong>Check for Constants Early:</strong> Before working through complex algebra, scan for ·0 or +1. They're immediate simplifications.</li>
            <li><strong>Use Truth Tables to Verify:</strong> When in doubt, verify Null Law simplifications with a truth table—they'll always match.</li>
            <li><strong>Document Constant Connections:</strong> In circuit diagrams, clearly mark when an input is tied to VCC (1) or GND (0).</li>
            <li><strong>Leverage Short-Circuit in Code:</strong> Use && and || short-circuit behavior to write safer, more efficient conditional statements.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-red-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>State both Null Laws: A·0=0 and A+1=1.</li>
            <li>Prove the Null Laws using truth tables.</li>
            <li>Simplify Boolean expressions by identifying and eliminating ·0 and +1 terms.</li>
            <li>Explain why 0 dominates AND and 1 dominates OR.</li>
            <li>Distinguish between Identity Laws (preserve) and Null Laws (dominate).</li>
            <li>Understand short-circuit evaluation in programming languages.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Debangshu from Shyamnagar is designing an emergency shutdown system for a factory. The system has:
            <br /><br />
            - An emergency stop button (E) - when pressed, E=1
            - A temperature sensor (T) - T=1 when overheating
            - A pressure sensor (P) - P=1 when pressure too high
            - A master power switch (M) - must be ON for system to work
            <br /><br />
            The shutdown logic is: <span className="font-mono">Shutdown = M · (E + T + P)</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">What happens if the emergency stop button is pressed (E=1)?</strong>
            <br /><br />
            Can you apply a Null Law to simplify? What does this tell you about emergency stop buttons in real systems?
            <br /><br />
            <strong>Observe carefully:</strong> Why is the OR Null Law so important for safety-critical systems?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Null Laws are intuitively easy but conceptually important. Students often confuse them with Identity Laws.\n\n" +
            "💡 **Teaching Strategy:** Use the 'kill switch' analogy for AND with 0 and 'bypass switch' for OR with 1. Have students create their own analogies.\n\n" +
            "🔍 **Common Misunderstanding:** Students think A·0 depends on A. Emphasize that 0 always dominates—it's like multiplying by zero in regular math.\n\n" +
            "📌 **Real-World Connection:** Tie this to emergency systems. In safety circuits, a single 'emergency stop' (1 in an OR chain) should override everything. This is the OR Null Law in action!\n\n" +
            "🎯 **Programming Connection:** Introduce short-circuit evaluation. This is where Boolean logic meets real coding optimization."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What is the AND Null Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The AND Null Law states that A · 0 = 0. Any variable ANDed with 0 results in 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: What is the OR Null Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The OR Null Law states that A + 1 = 1. Any variable ORed with 1 results in 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: Why is 0 called the "dominating" element for AND?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because if any input to an AND gate is 0, the output is forced to 0 regardless of other inputs. The 0 "dominates" the operation.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: Why is 1 called the "dominating" element for OR?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because if any input to an OR gate is 1, the output is forced to 1 regardless of other inputs. The 1 "dominates" the operation.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: Prove A · 0 = 0 using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For A=0: 0·0=0; For A=1: 1·0=0. Both rows show output 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: Prove A + 1 = 1 using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For A=0: 0+1=1; For A=1: 1+1=1. Both rows show output 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: Simplify: (X·Y·Z) · 0</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = 0 (AND Null Law - the 0 dominates)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: Simplify: (P+Q+R) + 1</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = 1 (OR Null Law - the 1 dominates)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: Simplify: (A·B·C·0) + D</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = 0 + D = D (First, AND Null Law makes first term 0, then OR Identity)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: Simplify: (A+B+1) · C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = 1 · C = C (First, OR Null Law makes (A+B+1)=1, then AND Identity)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: What happens to an AND gate if one input is tied to 0?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The AND gate will always output 0, regardless of other inputs. The gate can be removed and output connected to GND.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: What happens to an OR gate if one input is tied to 1?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The OR gate will always output 1, regardless of other inputs. The gate can be removed and output connected to VCC.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: What is short-circuit evaluation?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: In programming, if the first operand of && is false, the second isn't evaluated. If the first operand of || is true, the second isn't evaluated. This is based on Null Laws.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: How do Null Laws help in circuit optimization?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They allow us to remove gates whose outputs are forced to constants, saving power, space, and cost.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: What's the difference between Identity and Null Laws?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Identity: A·1=A, A+0=A (variable preserved). Null: A·0=0, A+1=1 (constant dominates).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: Simplify: (A·B + 1) · (C·0 + D)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (1) · (0 + D) = 1 · D = D. (OR Null, then AND Null, then AND Identity)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: In safety systems, why is E-stop usually connected as OR with 1?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because if E-stop is activated (1), the OR Null Law forces the output to 1 (shutdown), overriding all other conditions for safety.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: Can the Null Laws be applied to expressions with more than one variable?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Any AND expression containing a factor 0 equals 0. Any OR expression containing a term 1 equals 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: Does A·0 = 0 work if A is a complex expression?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! (any expression) · 0 = 0. The AND Null Law applies regardless of how complex the other expression is.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: Does A+1 = 1 work if A is a complex expression?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! (any expression) + 1 = 1. The OR Null Law applies regardless of how complex the other expression is.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic5;