import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 4: Basic Laws of Boolean Algebra: Identity Law
 * 
 * Component: Topic4
 * Purpose: Explains the Identity Laws of Boolean Algebra:
 *          - A · 1 = A (AND Identity)
 *          - A + 0 = A (OR Identity)
 *          - These laws show how constants interact with variables
 * 
 * When & Why: Used as the fifth topic in the Boolean Algebra series. Identity Laws are
 *             the foundation of Boolean simplification. They teach students how
 *             constants (0 and 1) interact with variables, which is essential for
 *             reducing complex expressions and optimizing digital circuits.
 * 
 * Return Type: JSX.Element
 */

const Topic4 = () => {
  // State for interactive demonstrations
  const [andIdentityVar, setAndIdentityVar] = useState(0);
  const [orIdentityVar, setOrIdentityVar] = useState(0);

  // Results for identity laws
  const andIdentityResult = andIdentityVar; // A · 1 = A
  const orIdentityResult = orIdentityVar;   // A + 0 = A

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-blue-100 dark:bg-blue-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Basic Laws:</span>
          <span className="block text-blue-600 dark:text-blue-400">Identity Law</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A · 1 = A  |  A + 0 = A — The variable remains unchanged
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Identity Law */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🆔</span> What is the Identity Law?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The <strong className="text-blue-600 dark:text-blue-400">Identity Laws</strong> describe how a Boolean variable interacts with the constants <strong>1</strong> and <strong>0</strong>. These laws state that:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-900/40">
              <p className="text-2xl font-mono font-bold text-green-700 dark:text-green-300 mb-2">A · 1 = A</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AND Identity</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"A AND TRUE equals A"</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-orange-100 dark:hover:bg-orange-900/40">
              <p className="text-2xl font-mono font-bold text-orange-700 dark:text-orange-300 mb-2">A + 0 = A</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">OR Identity</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"A OR FALSE equals A"</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> Just like in regular algebra where x + 0 = x and x × 1 = x, Boolean Algebra has similar identity laws. The variable's value is "preserved" or "unchanged" when combined with the appropriate constant.
            </p>
          </div>
        </div>

        {/* AND Identity Law: A · 1 = A */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> AND Identity: A · 1 = A
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When a variable <strong className="font-mono">A</strong> is ANDed with <strong className="font-mono">1</strong>, the result is always equal to <strong className="font-mono">A</strong> itself. The constant <strong className="text-green-600">1</strong> acts as an "identity element" for the AND operation.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">1</th>
                        <th className="px-4 py-2 text-center font-mono">A · 1</th>
                        <th className="px-4 py-2 text-center font-mono">Equals A?</th>
                       </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-green-600">0</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 0 = 0</td>
                       </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-green-600">1</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 1 = 1</td>
                       </tr>
                    </tbody>
                   </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You can enter the club <strong>IF</strong> you have an ID <strong>AND</strong> the club is open (1)." If the club is always open, then entry depends ONLY on having an ID.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive AND Identity Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A · 1 = A</h3>
                <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Variable A</p>
                    <button
                      onClick={() => setAndIdentityVar(andIdentityVar === 0 ? 1 : 0)}
                      className={clsx(
                        "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                        andIdentityVar === 1 
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      )}
                    >
                      {andIdentityVar}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">AND</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Constant 1</p>
                    <div className="w-20 h-20 rounded-xl bg-green-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      1
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result = A</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300",
                      andIdentityResult === 1 
                        ? "bg-green-500 text-white shadow-lg" 
                        : "bg-red-500 text-white shadow-lg"
                    )}>
                      {andIdentityResult}
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  💡 The output always matches variable A, no matter what A is!
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🔧 Circuit Implication:</span> An AND gate with one input tied to 1 acts as a <strong>buffer</strong>—the output follows the other input. This is used to amplify or delay signals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OR Identity Law: A + 0 = A */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔀</span> OR Identity: A + 0 = A
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When a variable <strong className="font-mono">A</strong> is ORed with <strong className="font-mono">0</strong>, the result is always equal to <strong className="font-mono">A</strong> itself. The constant <strong className="text-red-600">0</strong> acts as an "identity element" for the OR operation.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">0</th>
                        <th className="px-4 py-2 text-center font-mono">A + 0</th>
                        <th className="px-4 py-2 text-center font-mono">Equals A?</th>
                       </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-green-600">0</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 0 = 0</td>
                       </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-green-600">1</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 1 = 1</td>
                       </tr>
                    </tbody>
                   </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You get dessert <strong>IF</strong> you finish your homework <strong>OR</strong> you do nothing (0)." If doing nothing is not a valid condition, then dessert depends ONLY on homework.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive OR Identity Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A + 0 = A</h3>
                <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Variable A</p>
                    <button
                      onClick={() => setOrIdentityVar(orIdentityVar === 0 ? 1 : 0)}
                      className={clsx(
                        "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                        orIdentityVar === 1 
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      )}
                    >
                      {orIdentityVar}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">OR</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Constant 0</p>
                    <div className="w-20 h-20 rounded-xl bg-red-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      0
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result = A</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300",
                      orIdentityResult === 1 
                        ? "bg-green-500 text-white shadow-lg" 
                        : "bg-red-500 text-white shadow-lg"
                    )}>
                      {orIdentityResult}
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  💡 The output always matches variable A, no matter what A is!
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🔧 Circuit Implication:</span> An OR gate with one input tied to 0 acts as a <strong>buffer</strong>—the output follows the other input. This is another way to pass a signal without modification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> Visual Comparison: Identity Laws
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">AND Identity: A · 1 = A</h3>
              <svg width="200" height="100" viewBox="0 0 200 100" className="mx-auto transition-all duration-300 hover:scale-105">
                <rect x="20" y="30" width="60" height="40" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
                <text x="45" y="55" fontSize="12" fontWeight="bold">AND</text>
                <line x1="80" y1="50" x2="100" y2="50" stroke="#1e293b" strokeWidth="1.5" />
                <line x1="20" y1="40" x2="40" y2="40" stroke="#1e293b" strokeWidth="1" />
                <text x="5" y="43" fontSize="10">A</text>
                <line x1="20" y1="60" x2="40" y2="60" stroke="#1e293b" strokeWidth="1" />
                <text x="5" y="63" fontSize="10">1</text>
                <text x="110" y="53" fontSize="10">= A</text>
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Constant 1 input passes A through</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">OR Identity: A + 0 = A</h3>
              <svg width="200" height="100" viewBox="0 0 200 100" className="mx-auto transition-all duration-300 hover:scale-105">
                <path d="M 20 30 L 20 70 L 60 70 Q 80 50 60 30 L 20 30 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
                <text x="38" y="52" fontSize="12" fontWeight="bold">OR</text>
                <line x1="80" y1="50" x2="100" y2="50" stroke="#1e293b" strokeWidth="1.5" />
                <line x1="20" y1="40" x2="40" y2="40" stroke="#1e293b" strokeWidth="1" />
                <text x="5" y="43" fontSize="10">A</text>
                <line x1="20" y1="60" x2="40" y2="60" stroke="#1e293b" strokeWidth="1" />
                <text x="5" y="63" fontSize="10">0</text>
                <text x="110" y="53" fontSize="10">= A</text>
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Constant 0 input passes A through</p>
            </div>
          </div>
        </div>

        {/* Application Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Application Examples
          </h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 1: Simplifying Expressions</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A · B) · 1</p>
              <p className="text-gray-700 dark:text-gray-300">Using AND Identity: <span className="font-mono font-bold text-green-600">(A · B) · 1 = A · B</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The constant 1 disappears, simplifying the expression.</p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 2: Simplifying Expressions</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A + B) + 0</p>
              <p className="text-gray-700 dark:text-gray-300">Using OR Identity: <span className="font-mono font-bold text-orange-600">(A + B) + 0 = A + B</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The constant 0 disappears, simplifying the expression.</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 3: Complex Expression</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = A · (B + 0) + (C · 1)</p>
              <p className="text-gray-700 dark:text-gray-300">Step 1: Apply OR Identity: <span className="font-mono">B + 0 = B</span></p>
              <p className="text-gray-700 dark:text-gray-300">Step 2: Apply AND Identity: <span className="font-mono">C · 1 = C</span></p>
              <p className="text-gray-700 dark:text-gray-300">Step 3: Final: <span className="font-mono font-bold text-blue-600">F = A · B + C</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The expression is significantly simplified!</p>
            </div>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Spotting Identity Opportunities:</strong> Look for AND with 1 or OR with 0 in expressions. They can be removed immediately without changing the logic.</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Gate Elimination:</strong> In circuit design, an AND gate with one input tied to HIGH (1) or an OR gate with one input tied to LOW (0) can be replaced with a simple wire (buffer).</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Test Vector Generation:</strong> When testing circuits, use the identity laws to simplify expected outputs. If A · 1 = A, then the output should match the variable input.</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Memory Aid:</strong> "AND with 1 leaves it alone, OR with 0 leaves it alone." Think of 1 as the "pass-through" for AND and 0 as the "pass-through" for OR.</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Reverse Thinking:</strong> Sometimes we add identity terms (AND with 1 or OR with 0) to make expressions match standard forms for simplification.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Confusing the Laws:</strong> Remember: A · 1 = A (AND identity), but A · 0 = 0 (Null law). Don't mix them up!</li>
            <li><strong>Wrong Operation with Constant:</strong> A + 1 = 1 (Null law), NOT A. A · 0 = 0 (Null law), NOT A.</li>
            <li><strong>Applying Identity in Reverse:</strong> Sometimes you need to add A · 1 or A + 0 to an expression to enable other simplifications. Students often forget they can add these "do-nothing" terms.</li>
            <li><strong>Assuming All Constants Disappear:</strong> Only AND with 1 and OR with 0 disappear. AND with 0 or OR with 1 give constant outputs (0 or 1).</li>
            <li><strong>Forgetting Operator Precedence:</strong> In expressions like <span className="font-mono">A · B + 1</span>, the AND happens first, but the identity doesn't apply directly because of the +.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Simplify Early:</strong> Apply identity laws as soon as you spot them. Removing constants early makes other simplifications easier to see.</li>
            <li><strong>Verify with Truth Tables:</strong> After applying identity laws, always verify with a truth table to ensure the simplification is correct.</li>
            <li><strong>Document Constant Connections:</strong> In circuit diagrams, clearly mark when a gate input is tied to VCC (1) or GND (0).</li>
            <li><strong>Use Parentheses for Clarity:</strong> Write <span className="font-mono">(A · B) · 1</span> rather than <span className="font-mono">A · B · 1</span> to make the AND identity more obvious.</li>
            <li><strong>Think About Hardware:</strong> When simplifying, consider whether you're actually saving gates. Removing a constant input might eliminate an entire gate.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>State both Identity Laws: A · 1 = A and A + 0 = A.</li>
            <li>Prove the Identity Laws using truth tables.</li>
            <li>Simplify Boolean expressions by removing ·1 and +0 terms.</li>
            <li>Explain why AND with 1 and OR with 0 don't change the variable.</li>
            <li>Identify when to apply AND identity vs OR identity.</li>
            <li>Understand the circuit implications (buffer behavior).</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Susmita from Ichapur is designing a control system for a smart light. The light should turn on if:
            <br /><br />
            - The motion sensor detects movement (M = 1) AND (The master switch is ON (S = 1) OR a special override is active (O = 1))
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Try simplifying this expression if the master switch is always ON (S = 1).</strong>
            <br /><br />
            Original expression: <span className="font-mono">Light = M · (S + O)</span>
            <br /><br />
            If S = 1, what happens? Can you apply an identity law to simplify?
            <br /><br />
            <strong>Observe carefully:</strong> When a variable is fixed to a constant, the Identity Laws can dramatically simplify the logic!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Identity Laws are the first 'simplification' tools students encounter. They're simple but powerful.\n\n" +
            "💡 **Teaching Strategy:** Use the interactive demos to let students experiment. Have them toggle A and watch how the output always matches A. This hands-on experience builds intuition.\n\n" +
            "🔍 **Common Misconception:** Students often think A · 1 = 1 (confusing with Null law). Emphasize the difference: AND with 1 preserves the variable; AND with 0 forces 0.\n\n" +
            "📌 **Key Connection:** Identity Laws are the Boolean equivalent of x + 0 = x and x × 1 = x in regular algebra. This analogy helps students from a math background.\n\n" +
            "🎯 **Real-World Relevance:** In digital circuits, tying an input to VCC (1) or GND (0) is common. Understanding these laws helps engineers predict circuit behavior."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What is the AND Identity Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The AND Identity Law states that A · 1 = A. When a variable is ANDed with 1, the result is the variable itself.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: What is the OR Identity Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The OR Identity Law states that A + 0 = A. When a variable is ORed with 0, the result is the variable itself.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: Why is 1 called the identity element for AND?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because when you combine any variable with 1 using AND, the variable remains unchanged (identical to its original value).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: Why is 0 called the identity element for OR?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because when you combine any variable with 0 using OR, the variable remains unchanged (identical to its original value).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: Prove A · 1 = A using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For A=0: 0·1=0; For A=1: 1·1=1. In both cases, output equals A.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: Prove A + 0 = A using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For A=0: 0+0=0; For A=1: 1+0=1. In both cases, output equals A.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: Simplify: (X · Y) · 1</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (X · Y) · 1 = X · Y (using AND Identity)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: Simplify: (P + Q) + 0</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (P + Q) + 0 = P + Q (using OR Identity)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: Simplify: A · B · 1 + C + 0</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A·B·1 = A·B (AND Identity), C+0 = C (OR Identity), so final = A·B + C</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: What happens to an AND gate if one input is tied to 1?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The AND gate acts as a buffer—the output follows the other input. This is because A · 1 = A.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: What happens to an OR gate if one input is tied to 0?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The OR gate acts as a buffer—the output follows the other input. This is because A + 0 = A.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: Is A · 1 always equal to 1?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No! A · 1 = A, not 1. If A=0, then 0·1=0. Only if A=1 does it equal 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: Is A + 0 always equal to 0?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No! A + 0 = A, not 0. If A=1, then 1+0=1. Only if A=0 does it equal 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: How do Identity Laws help in circuit design?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They allow engineers to remove unnecessary gates. An AND gate with a constant 1 input can be replaced with a wire, saving components.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: Can we add A·1 to an expression to help simplification?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Adding A·1 (which equals A) is like adding 0 in regular algebra—it doesn't change the expression but can enable other simplifications.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: What's the difference between Identity Law and Null Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Identity: A·1=A, A+0=A (variable preserved). Null: A·0=0, A+1=1 (constant result).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: Does the Identity Law work for multi-variable expressions?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Any Boolean expression ANDed with 1 equals the expression itself. Any expression ORed with 0 equals the expression itself.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: Simplify: (A·B·C) · 1 + (D+E) + 0</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·B·C + D+E (AND Identity and OR Identity)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: Why is 1 called the "identity" for AND?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: In mathematics, an identity element is one that leaves another element unchanged under an operation. Since A·1 = A, 1 is the identity for AND.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: Why is 0 called the "identity" for OR?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because A+0 = A, so 0 leaves any variable unchanged under OR, making it the identity element for the OR operation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic4;