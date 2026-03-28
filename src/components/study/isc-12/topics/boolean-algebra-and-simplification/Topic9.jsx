import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 9: Basic Laws of Boolean Algebra: Commutative Law
 * 
 * Component: Topic9
 * Purpose: Explains the Commutative Laws of Boolean Algebra:
 *          - A · B = B · A (AND Commutative)
 *          - A + B = B + A (OR Commutative)
 *          - The order of operands does not affect the result
 * 
 * When & Why: Used as the tenth topic in the Boolean Algebra series. Commutative Laws
 *             establish that the order of variables in AND and OR operations doesn't
 *             matter. This is fundamental for rearranging expressions during
 *             simplification and understanding that logic gates are symmetric.
 * 
 * Return Type: JSX.Element
 */

const Topic9 = () => {
  // State for interactive demonstrations
  const [andA, setAndA] = useState(0);
  const [andB, setAndB] = useState(0);
  const [orA, setOrA] = useState(0);
  const [orB, setOrB] = useState(0);

  // Results for commutative demonstrations
  const andResult = andA && andB ? 1 : 0;
  const andResultSwapped = andB && andA ? 1 : 0;
  const orResult = orA || orB ? 1 : 0;
  const orResultSwapped = orB || orA ? 1 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-cyan-100 dark:bg-cyan-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Basic Laws:</span>
          <span className="block text-cyan-600 dark:text-cyan-400">Commutative Law</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A · B = B · A &nbsp;&nbsp;|&nbsp;&nbsp; A + B = B + A — Order doesn't matter
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Commutative Law */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> What is the Commutative Law?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The <strong className="text-cyan-600 dark:text-cyan-400">Commutative Laws</strong> state that the order of operands in AND and OR operations does not affect the result. This property, familiar from regular arithmetic, also holds in Boolean Algebra.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/40">
              <p className="text-2xl font-mono font-bold text-cyan-700 dark:text-cyan-300 mb-2">A · B = B · A</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AND Commutative Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"A AND B equals B AND A"</p>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/40">
              <p className="text-2xl font-mono font-bold text-cyan-700 dark:text-cyan-300 mb-2">A + B = B + A</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">OR Commutative Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"A OR B equals B OR A"</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> Just like 2 × 3 = 3 × 2 and 2 + 3 = 3 + 2 in regular arithmetic, Boolean operations are commutative. This allows us to rearrange terms freely during simplification.
            </p>
          </div>
        </div>

        {/* AND Commutative Law: A · B = B · A */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> AND Commutative: A · B = B · A
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When ANDing two variables, swapping their order doesn't change the result. An AND gate is <strong className="text-cyan-600 dark:text-cyan-400">symmetric</strong>—both inputs are equal in priority.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">B</th>
                        <th className="px-4 py-2 text-center font-mono">A · B</th>
                        <th className="px-4 py-2 text-center font-mono">B · A</th>
                        <th className="px-4 py-2 text-center">Equal?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[[0,0,0,0], [0,1,0,0], [1,0,0,0], [1,1,1,1]].map(([a,b,res1,res2], idx) => (
                        <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                          <td className="px-4 py-2 text-center font-mono">{a}</td>
                          <td className="px-4 py-2 text-center font-mono">{b}</td>
                          <td className="px-4 py-2 text-center font-mono font-bold text-cyan-600">{res1}</td>
                          <td className="px-4 py-2 text-center font-mono font-bold text-cyan-600">{res2}</td>
                          <td className="px-4 py-2 text-center text-green-600">✓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You need a key AND a fingerprint" is the same as "You need a fingerprint AND a key." Both conditions must be met regardless of order.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive AND Commutative Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A · B = B · A</h3>
                <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">A</p>
                    <button
                      onClick={() => setAndA(andA === 0 ? 1 : 0)}
                      className={clsx(
                        "w-16 h-16 rounded-xl font-mono text-xl font-bold transition-all duration-300 hover:scale-110",
                        andA === 1 ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                      )}
                    >
                      {andA}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">AND</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">B</p>
                    <button
                      onClick={() => setAndB(andB === 0 ? 1 : 0)}
                      className={clsx(
                        "w-16 h-16 rounded-xl font-mono text-xl font-bold transition-all duration-300 hover:scale-110",
                        andB === 1 ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                      )}
                    >
                      {andB}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className={clsx(
                    "w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold",
                    andResult === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {andResult}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">B</p>
                    <div className={clsx(
                      "w-16 h-16 rounded-xl font-mono text-xl font-bold flex items-center justify-center",
                      andB === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    )}>
                      {andB}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">AND</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">A</p>
                    <div className={clsx(
                      "w-16 h-16 rounded-xl font-mono text-xl font-bold flex items-center justify-center",
                      andA === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    )}>
                      {andA}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className={clsx(
                    "w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold",
                    andResultSwapped === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {andResultSwapped}
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                  💡 Both orders give the same result: {andResult} = {andResultSwapped}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OR Commutative Law: A + B = B + A */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔀</span> OR Commutative: A + B = B + A
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When ORing two variables, swapping their order doesn't change the result. An OR gate is also <strong className="text-cyan-600 dark:text-cyan-400">symmetric</strong>—both inputs are equal in priority.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">B</th>
                        <th className="px-4 py-2 text-center font-mono">A + B</th>
                        <th className="px-4 py-2 text-center font-mono">B + A</th>
                        <th className="px-4 py-2 text-center">Equal?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[[0,0,0,0], [0,1,1,1], [1,0,1,1], [1,1,1,1]].map(([a,b,res1,res2], idx) => (
                        <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                          <td className="px-4 py-2 text-center font-mono">{a}</td>
                          <td className="px-4 py-2 text-center font-mono">{b}</td>
                          <td className="px-4 py-2 text-center font-mono font-bold text-cyan-600">{res1}</td>
                          <td className="px-4 py-2 text-center font-mono font-bold text-cyan-600">{res2}</td>
                          <td className="px-4 py-2 text-center text-green-600">✓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You can pay with cash OR card" is the same as "You can pay with card OR cash." The payment options don't change order.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive OR Commutative Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: A + B = B + A</h3>
                <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">A</p>
                    <button
                      onClick={() => setOrA(orA === 0 ? 1 : 0)}
                      className={clsx(
                        "w-16 h-16 rounded-xl font-mono text-xl font-bold transition-all duration-300 hover:scale-110",
                        orA === 1 ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                      )}
                    >
                      {orA}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">OR</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">B</p>
                    <button
                      onClick={() => setOrB(orB === 0 ? 1 : 0)}
                      className={clsx(
                        "w-16 h-16 rounded-xl font-mono text-xl font-bold transition-all duration-300 hover:scale-110",
                        orB === 1 ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                      )}
                    >
                      {orB}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className={clsx(
                    "w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold",
                    orResult === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {orResult}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">B</p>
                    <div className={clsx(
                      "w-16 h-16 rounded-xl font-mono text-xl font-bold flex items-center justify-center",
                      orB === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    )}>
                      {orB}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">OR</div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">A</p>
                    <div className={clsx(
                      "w-16 h-16 rounded-xl font-mono text-xl font-bold flex items-center justify-center",
                      orA === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    )}>
                      {orA}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className={clsx(
                    "w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold",
                    orResultSwapped === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {orResultSwapped}
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                  💡 Both orders give the same result: {orResult} = {orResultSwapped}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Representation: Symmetric Gates */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎨</span> Visual Representation: Symmetric Gates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">AND Gate is Symmetric</h3>
              <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto transition-all duration-300 hover:scale-105">
                <path d="M 50 30 L 50 90 L 90 90 Q 110 75 90 60 L 50 60 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
                <text x="68" y="62" fontSize="12" fontWeight="bold">AND</text>
                <line x1="20" y1="45" x2="50" y2="45" stroke="#1e293b" strokeWidth="1" />
                <line x1="20" y1="75" x2="50" y2="75" stroke="#1e293b" strokeWidth="1" />
                <line x1="110" y1="60" x2="140" y2="60" stroke="#1e293b" strokeWidth="1" />
                <text x="5" y="48" fontSize="10">A</text>
                <text x="5" y="78" fontSize="10">B</text>
                <text x="145" y="63" fontSize="10">A·B</text>
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Swapping A and B doesn't change output</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">OR Gate is Symmetric</h3>
              <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto transition-all duration-300 hover:scale-105">
                <path d="M 50 30 L 50 90 L 90 90 Q 110 75 90 60 L 50 60 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
                <text x="68" y="62" fontSize="12" fontWeight="bold">OR</text>
                <line x1="20" y1="45" x2="50" y2="45" stroke="#1e293b" strokeWidth="1" />
                <line x1="20" y1="75" x2="50" y2="75" stroke="#1e293b" strokeWidth="1" />
                <line x1="110" y1="60" x2="140" y2="60" stroke="#1e293b" strokeWidth="1" />
                <text x="5" y="48" fontSize="10">A</text>
                <text x="5" y="78" fontSize="10">B</text>
                <text x="145" y="63" fontSize="10">A+B</text>
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Swapping A and B doesn't change output</p>
            </div>
          </div>
        </div>

        {/* Application Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Application Examples
          </h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 1: Rearranging Terms</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = B · A + C · D</p>
              <p className="text-gray-700 dark:text-gray-300">Using Commutative Law: <span className="font-mono">B · A = A · B</span></p>
              <p className="text-gray-700 dark:text-gray-300">So: <span className="font-mono">F = A · B + C · D</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This allows us to write expressions in a consistent, readable order.</p>
            </div>
            
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 2: Grouping Like Terms</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = A·B + B·A</p>
              <p className="text-gray-700 dark:text-gray-300">Using Commutative: <span className="font-mono">B·A = A·B</span></p>
              <p className="text-gray-700 dark:text-gray-300">So: <span className="font-mono">F = A·B + A·B = A·B</span> (Idempotent Law)</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Commutative helps identify identical terms!</p>
            </div>
            
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 3: Simplifying Complex Expressions</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A + B) · (C + D) + (B + A) · (D + C)</p>
              <p className="text-gray-700 dark:text-gray-300">Using Commutative: <span className="font-mono">(B+A) = (A+B)</span> and <span className="font-mono">(D+C) = (C+D)</span></p>
              <p className="text-gray-700 dark:text-gray-300">So: <span className="font-mono">F = (A+B)·(C+D) + (A+B)·(C+D)</span></p>
              <p className="text-gray-700 dark:text-gray-300">Using Idempotent: <span className="font-mono">F = (A+B)·(C+D)</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Commutative reveals redundancy!</p>
            </div>
          </div>
        </div>

        {/* Commutative Law in Programming */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">💻</span> Commutative Law in Programming
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Commutative Law applies to logical operators in most programming languages:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">JavaScript / Python / Java</h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`// These are equivalent:
if (isReady && hasPermission) { }
if (hasPermission && isReady) { }

// These are equivalent:
if (isValid || isOverride) { }
if (isOverride || isValid) { }`}
              </pre>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚠️ Important Note</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                While Boolean AND and OR are commutative, <strong className="text-red-600">short-circuit evaluation</strong> means the <strong className="text-red-600">order affects execution</strong>! If the first operand determines the result, the second may not be evaluated.
              </p>
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded font-mono text-xs">
                <code>false && expensiveFunction()</code> → expensiveFunction() never runs!
              </div>
            </div>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Standardize Order:</strong> Always write expressions with variables in alphabetical order (A·B·C instead of B·A·C). This makes patterns easier to spot.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Grouping for Simplification:</strong> Use commutativity to group like terms together before applying other laws.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Gate Symmetry:</strong> In PCB layout, AND and OR gates can be rotated or swapped because inputs are symmetric—great for routing optimization!</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Code Readability:</strong> In programming, order boolean conditions from most-likely-false (for AND) or most-likely-true (for OR) to leverage short-circuit optimization.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Memory Aid:</strong> "Commutative = Commute = Move around. The variables can commute (travel) without changing the outcome."</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Assuming All Operations Commute:</strong> NOT and implication do NOT commute! A' is not the same as 'A (meaningless). Also, A→B ≠ B→A.</li>
            <li><strong>Confusing with Associativity:</strong> Commutative swaps order of operands. Associative changes grouping of operands. They are different laws!</li>
            <li><strong>Forgetting Short-Circuit Effects:</strong> In programming, while the logical result is commutative, side effects may not be. <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">false && fn()</code> never calls fn().</li>
            <li><strong>Misapplying to Subtraction/Division:</strong> In Boolean Algebra, there's no subtraction or division. Only AND and OR are commutative.</li>
            <li><strong>Overlooking Complex Expressions:</strong> (A+B) and (B+A) are commutative, but (A·B)' and (B·A)' are also equal (since the inner AND commutes).</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Standardize Variable Order:</strong> Always arrange terms alphabetically (A·B·C) or by a consistent convention. This improves readability and helps spot patterns.</li>
            <li><strong>Use Commutativity Early:</strong> Before applying other simplification laws, rearrange terms to group identical or complementary variables.</li>
            <li><strong>Document Gate Symmetry:</strong> In circuit diagrams, note that AND/OR gates have symmetric inputs. This allows flexibility in layout.</li>
            <li><strong>Be Mindful in Code:</strong> When using short-circuit operators, consider placing the cheaper or more-likely-to-determine condition first for performance.</li>
            <li><strong>Verify with Truth Tables:</strong> When in doubt, create a truth table to confirm that swapping inputs doesn't change outputs.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-cyan-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>State both Commutative Laws: A·B = B·A and A+B = B+A.</li>
            <li>Prove the Commutative Laws using truth tables.</li>
            <li>Rearrange terms in Boolean expressions using commutativity.</li>
            <li>Explain why AND and OR gates have symmetric inputs.</li>
            <li>Identify operations that are NOT commutative in Boolean Algebra.</li>
            <li>Understand the difference between commutativity and associativity.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Debangshu from Naihati is programming a smart thermostat. He has three conditions:
            <br /><br />
            - <span className="font-mono">isCold</span> (temperature below threshold)
            <br />
            - <span className="font-mono">isAway</span> (nobody home)
            <br />
            - <span className="font-mono">isNight</span> (after 10 PM)
            <br /><br />
            He writes: <span className="font-mono">if (isCold && isNight && !isAway) {`{ turnOnHeater(); }`}</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Does the order of these conditions matter for the result?</strong>
            <br />
            What about for performance? Which condition would you check first and why?
            <br /><br />
            <strong>Observe carefully:</strong> While commutativity says order doesn't change the result, short-circuit evaluation means order can affect performance and side effects!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Commutative Laws are usually intuitive because students already know addition and multiplication are commutative in regular math.\n\n" +
            "💡 **Teaching Strategy:** Start with regular arithmetic examples (3+5=5+3, 4×7=7×4), then show that AND and OR behave the same way. Use the interactive demos to let students verify.\n\n" +
            "🔍 **Common Misunderstanding:** Students sometimes think all Boolean operations commute. Emphasize that NOT and implication do NOT commute. Show counterexamples.\n\n" +
            "📌 **Programming Connection:** This is the perfect time to introduce short-circuit evaluation. Explain that while the result is commutative, execution order matters for side effects and performance.\n\n" +
            "🎯 **Real-World Relevance:** In circuit layout, gate symmetry allows engineers to swap inputs to optimize routing. This saves space and reduces signal delay."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What is the Commutative Law for AND?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The AND Commutative Law states that A · B = B · A. The order of operands doesn't affect the result.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: What is the Commutative Law for OR?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The OR Commutative Law states that A + B = B + A. The order of operands doesn't affect the result.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: Prove A·B = B·A using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For all 4 combinations (00,01,10,11), A·B equals B·A. Example: A=1,B=0: 1·0=0 and 0·1=0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: Prove A+B = B+A using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For all 4 combinations, A+B equals B+A. Example: A=0,B=1: 0+1=1 and 1+0=1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: Is the NOT operation commutative?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. NOT is a unary operation (only one operand), so commutativity doesn't apply.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: Does short-circuit evaluation violate commutativity?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. The logical result is still commutative. Short-circuit affects execution order, not the final result.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: Simplify: A·B + B·A</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·B + A·B = A·B (using Commutative then Idempotent)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: Simplify: (A+B)·(C+D) + (B+A)·(D+C)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A+B)·(C+D) + (A+B)·(C+D) = (A+B)·(C+D)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: Is the implication operation (A→B) commutative?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. A→B is not equal to B→A. Example: If A=false, B=true: false→true=true, true→false=false.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: What's the difference between commutative and associative laws?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Commutative changes the order of operands (A+B = B+A). Associative changes the grouping (A+(B+C) = (A+B)+C).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: Are XOR and XNOR commutative?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! XOR (A⊕B = B⊕A) and XNOR are commutative because they are derived from AND/OR/NOT combinations.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: Why is it useful that AND and OR are commutative?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It allows us to rearrange terms for easier simplification and to identify patterns. In hardware, it means gate inputs are interchangeable.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: Simplify: (A·B' + C) + (C + B'·A)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A·B' + C) + (A·B' + C) = A·B' + C (using Commutative then Idempotent)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: In programming, does the order of conditions in an if statement affect performance?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Due to short-circuit evaluation, placing conditions that are more likely to be false first in AND chains (or true first in OR chains) can improve performance.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: Can you rearrange terms in a product like A·B·C·D?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Since AND is commutative and associative, you can reorder A,B,C,D in any way.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: Simplify: (X+Y)·Z + Z·(Y+X)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (X+Y)·Z + (X+Y)·Z = (X+Y)·Z</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: Does the NAND operation commute?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! NAND (A↑B) is commutative because it's the complement of AND, and AND is commutative.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: Does the NOR operation commute?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! NOR (A↓B) is commutative because it's the complement of OR, and OR is commutative.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: Why do some programming languages have `and` and `&&` operators?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: `&&` short-circuits (doesn't evaluate second operand if first is false), while `&` evaluates both. Both are commutative in result but differ in side effects.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: How does commutativity help in circuit design?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It allows engineers to swap inputs to gates during PCB layout to minimize wire length and reduce signal interference, without changing functionality.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic9;