import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 10: Basic Laws of Boolean Algebra: Associative Law
 * 
 * Component: Topic10
 * Purpose: Explains the Associative Laws of Boolean Algebra:
 *          - (A · B) · C = A · (B · C) (AND Associative)
 *          - (A + B) + C = A + (B + C) (OR Associative)
 *          - Grouping of operands does not affect the result
 * 
 * When & Why: Used as the eleventh topic in the Boolean Algebra series. Associative Laws
 *             allow us to extend AND and OR operations to multiple variables without
 *             worrying about parentheses. This is essential for simplifying complex
 *             expressions and understanding multi-input gates.
 * 
 * Return Type: JSX.Element
 */

const Topic10 = () => {
  // State for interactive demonstrations
  const [andA, setAndA] = useState(0);
  const [andB, setAndB] = useState(0);
  const [andC, setAndC] = useState(0);
  const [orA, setOrA] = useState(0);
  const [orB, setOrB] = useState(0);
  const [orC, setOrC] = useState(0);

  // Results for AND associativity
  const andLeftGroup = (andA && andB) && andC ? 1 : 0;
  const andRightGroup = andA && (andB && andC) ? 1 : 0;
  
  // Results for OR associativity
  const orLeftGroup = (orA || orB) || orC ? 1 : 0;
  const orRightGroup = orA || (orB || orC) ? 1 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Basic Laws:</span>
          <span className="block text-emerald-600 dark:text-emerald-400">Associative Law</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          (A·B)·C = A·(B·C) &nbsp;&nbsp;|&nbsp;&nbsp; (A+B)+C = A+(B+C) — Grouping doesn't matter
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Associative Law */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> What is the Associative Law?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The <strong className="text-emerald-600 dark:text-emerald-400">Associative Laws</strong> state that when performing the same Boolean operation on three or more variables, the grouping of the operands does not affect the result. This allows us to write multi-variable expressions without parentheses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40">
              <p className="text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-300 mb-2">(A·B)·C = A·(B·C)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AND Associative Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"AND grouping doesn't matter"</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40">
              <p className="text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-300 mb-2">(A+B)+C = A+(B+C)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">OR Associative Law</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"OR grouping doesn't matter"</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> Just like addition (a+b)+c = a+(b+c) and multiplication (a×b)×c = a×(b×c) in regular arithmetic, Boolean AND and OR are associative. This is why we can write A·B·C without parentheses—the grouping is irrelevant.
            </p>
          </div>
        </div>

        {/* AND Associative Law: (A·B)·C = A·(B·C) */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> AND Associative: (A·B)·C = A·(B·C)
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When ANDing three variables, it doesn't matter whether you first AND A and B, then AND with C, OR first AND B and C, then AND with A. The result is the same—all inputs must be 1 for the output to be 1.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg text-sm">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-2 py-2 text-center font-mono">A</th>
                        <th className="px-2 py-2 text-center font-mono">B</th>
                        <th className="px-2 py-2 text-center font-mono">C</th>
                        <th className="px-2 py-2 text-center font-mono">(A·B)·C</th>
                        <th className="px-2 py-2 text-center font-mono">A·(B·C)</th>
                        <th className="px-2 py-2 text-center">Equal?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [0,0,0,0,0], [0,0,1,0,0], [0,1,0,0,0], [0,1,1,0,0],
                        [1,0,0,0,0], [1,0,1,0,0], [1,1,0,0,0], [1,1,1,1,1]
                      ].map(([a,b,c,res1,res2], idx) => (
                        <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                          <td className="px-2 py-2 text-center font-mono">{a}</td>
                          <td className="px-2 py-2 text-center font-mono">{b}</td>
                          <td className="px-2 py-2 text-center font-mono">{c}</td>
                          <td className="px-2 py-2 text-center font-mono font-bold text-emerald-600">{res1}</td>
                          <td className="px-2 py-2 text-center font-mono font-bold text-emerald-600">{res2}</td>
                          <td className="px-2 py-2 text-center text-green-600">✓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">All 8 rows show (A·B)·C = A·(B·C). Only when A=B=C=1 is the output 1.</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You need a key AND a fingerprint AND a PIN code" — it doesn't matter which two you check first. All three must be present.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive AND Associative Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: 3-Input AND</h3>
                <div className="flex justify-center items-center gap-3 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">A</p>
                    <button onClick={() => setAndA(andA === 0 ? 1 : 0)} className={clsx("w-12 h-12 rounded-lg font-mono font-bold transition-all hover:scale-110", andA === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{andA}</button>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">B</p>
                    <button onClick={() => setAndB(andB === 0 ? 1 : 0)} className={clsx("w-12 h-12 rounded-lg font-mono font-bold transition-all hover:scale-110", andB === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{andB}</button>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">C</p>
                    <button onClick={() => setAndC(andC === 0 ? 1 : 0)} className={clsx("w-12 h-12 rounded-lg font-mono font-bold transition-all hover:scale-110", andC === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{andC}</button>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">(A·B)·C</p>
                    <div className={clsx("w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold", andLeftGroup === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{andLeftGroup}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600">A·(B·C)</p>
                    <div className={clsx("w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold", andRightGroup === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{andRightGroup}</div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                  💡 Both groupings give the same result: {andLeftGroup} = {andRightGroup}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OR Associative Law: (A+B)+C = A+(B+C) */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔀</span> OR Associative: (A+B)+C = A+(B+C)
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When ORing three variables, it doesn't matter whether you first OR A and B, then OR with C, OR first OR B and C, then OR with A. The result is the same—at least one input must be 1 for the output to be 1.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg text-sm">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-2 py-2 text-center font-mono">A</th>
                        <th className="px-2 py-2 text-center font-mono">B</th>
                        <th className="px-2 py-2 text-center font-mono">C</th>
                        <th className="px-2 py-2 text-center font-mono">(A+B)+C</th>
                        <th className="px-2 py-2 text-center font-mono">A+(B+C)</th>
                        <th className="px-2 py-2 text-center">Equal?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [0,0,0,0,0], [0,0,1,1,1], [0,1,0,1,1], [0,1,1,1,1],
                        [1,0,0,1,1], [1,0,1,1,1], [1,1,0,1,1], [1,1,1,1,1]
                      ].map(([a,b,c,res1,res2], idx) => (
                        <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                          <td className="px-2 py-2 text-center font-mono">{a}</td>
                          <td className="px-2 py-2 text-center font-mono">{b}</td>
                          <td className="px-2 py-2 text-center font-mono">{c}</td>
                          <td className="px-2 py-2 text-center font-mono font-bold text-emerald-600">{res1}</td>
                          <td className="px-2 py-2 text-center font-mono font-bold text-emerald-600">{res2}</td>
                          <td className="px-2 py-2 text-center text-green-600">✓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">All 8 rows show (A+B)+C = A+(B+C). Output is 1 if any input is 1.</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You can pay with cash OR card OR mobile payment" — it doesn't matter which two options you consider first. Having any one is enough.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive OR Associative Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: 3-Input OR</h3>
                <div className="flex justify-center items-center gap-3 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">A</p>
                    <button onClick={() => setOrA(orA === 0 ? 1 : 0)} className={clsx("w-12 h-12 rounded-lg font-mono font-bold transition-all hover:scale-110", orA === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{orA}</button>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">B</p>
                    <button onClick={() => setOrB(orB === 0 ? 1 : 0)} className={clsx("w-12 h-12 rounded-lg font-mono font-bold transition-all hover:scale-110", orB === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{orB}</button>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">C</p>
                    <button onClick={() => setOrC(orC === 0 ? 1 : 0)} className={clsx("w-12 h-12 rounded-lg font-mono font-bold transition-all hover:scale-110", orC === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{orC}</button>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">(A+B)+C</p>
                    <div className={clsx("w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold", orLeftGroup === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{orLeftGroup}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">=</div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600">A+(B+C)</p>
                    <div className={clsx("w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold", orRightGroup === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{orRightGroup}</div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                  💡 Both groupings give the same result: {orLeftGroup} = {orRightGroup}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Input Gates Visualization */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎨</span> Multi-Input Gates: The Power of Associativity
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Because AND and OR are associative, we can create gates with any number of inputs without changing the logic. A 3-input AND gate is equivalent to two 2-input AND gates in series, regardless of grouping.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">3-Input AND Gate</h3>
              <svg width="180" height="80" viewBox="0 0 180 80" className="mx-auto transition-all duration-300 hover:scale-105">
                <path d="M 50 20 L 50 60 L 100 60 Q 120 50 100 40 L 50 40 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
                <text x="70" y="42" fontSize="10" fontWeight="bold">AND</text>
                <line x1="20" y1="30" x2="50" y2="30" stroke="#1e293b" strokeWidth="1" />
                <line x1="20" y1="45" x2="50" y2="45" stroke="#1e293b" strokeWidth="1" />
                <line x1="20" y1="60" x2="50" y2="60" stroke="#1e293b" strokeWidth="1" />
                <line x1="120" y1="40" x2="150" y2="40" stroke="#1e293b" strokeWidth="1" />
                <text x="5" y="33" fontSize="8">A</text>
                <text x="5" y="48" fontSize="8">B</text>
                <text x="5" y="63" fontSize="8">C</text>
                <text x="155" y="43" fontSize="8">A·B·C</text>
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Direct 3-input implementation</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Equivalent using 2-input Gates</h3>
              <svg width="200" height="100" viewBox="0 0 200 100" className="mx-auto">
                <path d="M 30 20 L 30 60 L 60 60 Q 75 50 60 40 L 30 40 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
                <text x="42" y="42" fontSize="8">AND</text>
                <line x1="10" y1="35" x2="30" y2="35" stroke="#1e293b" strokeWidth="1" />
                <line x1="10" y1="55" x2="30" y2="55" stroke="#1e293b" strokeWidth="1" />
                <line x1="75" y1="45" x2="95" y2="45" stroke="#1e293b" strokeWidth="1" />
                <path d="M 100 20 L 100 60 L 130 60 Q 145 50 130 40 L 100 40 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
                <text x="112" y="42" fontSize="8">AND</text>
                <line x1="145" y1="45" x2="170" y2="45" stroke="#1e293b" strokeWidth="1" />
                <line x1="95" y1="45" x2="100" y2="45" stroke="#1e293b" strokeWidth="1" />
                <text x="0" y="38" fontSize="8">A</text>
                <text x="0" y="58" fontSize="8">B</text>
                <text x="80" y="65" fontSize="8">C</text>
                <text x="175" y="48" fontSize="8">A·B·C</text>
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Two 2-input AND gates in series</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">💡 Hardware Reality:</span> Most logic families offer multi-input gates (3-input, 4-input, 8-input) directly. Associativity proves they behave identically to cascaded 2-input gates.
            </p>
          </div>
        </div>

        {/* Application Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Application Examples
          </h2>
          
          <div className="space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 1: Removing Parentheses</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A·B)·(C·D)</p>
              <p className="text-gray-700 dark:text-gray-300">Using associativity: <span className="font-mono">(A·B)·(C·D) = A·B·C·D</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Parentheses are unnecessary for a chain of ANDs!</p>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 2: Simplifying Nested Expressions</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A + (B + C)) + D</p>
              <p className="text-gray-700 dark:text-gray-300">Using associativity: <span className="font-mono">(A + (B + C)) + D = A + B + C + D</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">All parentheses can be removed from a chain of ORs!</p>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 3: Mixed Operations</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A·B)·C + (D+E)+F</p>
              <p className="text-gray-700 dark:text-gray-300">Using associativity: <span className="font-mono">F = A·B·C + D+E+F</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Each chain (AND chain and OR chain) can be flattened separately.</p>
            </div>
          </div>
        </div>

        {/* Associativity vs Commutativity */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">⚖️</span> Associativity vs Commutativity
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">🔄 Commutative Law</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Changes the <strong className="text-blue-600">order</strong> of operands.</p>
              <p className="font-mono text-sm mt-2">A·B = B·A</p>
              <p className="font-mono text-sm">A+B = B+A</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"The operands can commute (move around)"</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">🔗 Associative Law</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Changes the <strong className="text-emerald-600">grouping</strong> of operands.</p>
              <p className="font-mono text-sm mt-2">(A·B)·C = A·(B·C)</p>
              <p className="font-mono text-sm">(A+B)+C = A+(B+C)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"The operands can associate (group differently)"</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">💡 Together They Enable Freedom:</span> Commutativity + Associativity mean that in a chain of ANDs (or ORs), you can reorder and regroup terms arbitrarily. This is why we write A·B·C·D without any parentheses.
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Flatten Expressions:</strong> Use associativity to remove parentheses from AND/OR chains. This makes expressions easier to read and simplify.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Fan-In Consideration:</strong> In circuit design, multi-input gates have practical limits (fan-in). Associativity allows breaking large gates into smaller cascaded gates.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Delay Optimization:</strong> When cascading gates, grouping affects propagation delay. Associativity gives flexibility to optimize timing.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Memory Aid:</strong> "Associative = Associate = Group together. The operands can associate in any group."</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Code Optimization:</strong> In programming, chaining `&&` or `||` without parentheses is safe because these operators are left-associative in most languages.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Assuming Mixed Operations Associate:</strong> (A·B)+C is NOT equal to A·(B+C). Associativity only works when operations are the same!</li>
            <li><strong>Confusing with Distributive Law:</strong> A·(B+C) = A·B + A·C is the distributive law, NOT associativity.</li>
            <li><strong>Operator Precedence Errors:</strong> In A·B+C, the AND happens first. Adding parentheses changes meaning if operations differ.</li>
            <li><strong>Forgetting Left-to-Right Evaluation:</strong> In programming, `&&` and `||` are left-associative, but associativity means the result is the same regardless.</li>
            <li><strong>Overlooking Short-Circuit:</strong> While logically associative, short-circuit evaluation in programming can cause side-effect differences. (a && b) && c vs a && (b && c) may execute differently.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Remove Unnecessary Parentheses:</strong> For chains of ANDs or ORs, omit parentheses to improve readability.</li>
            <li><strong>Use Parentheses for Mixed Operations:</strong> When mixing AND and OR, always use parentheses to avoid ambiguity.</li>
            <li><strong>Consider Fan-In Limits:</strong> In hardware, if you need more inputs than a gate supports, use associativity to cascade gates.</li>
            <li><strong>Be Aware of Short-Circuit:</strong> In programming, understand that while logical result is associative, execution order may affect side effects.</li>
            <li><strong>Verify with Truth Tables:</strong> When in doubt, build a truth table to confirm associativity for your specific expression.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-emerald-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>State both Associative Laws: (A·B)·C = A·(B·C) and (A+B)+C = A+(B+C).</li>
            <li>Prove the Associative Laws using truth tables for 3 variables.</li>
            <li>Remove unnecessary parentheses from AND/OR chains.</li>
            <li>Distinguish between associative and commutative laws.</li>
            <li>Explain why 3-input AND gates are equivalent to two 2-input AND gates.</li>
            <li>Understand when associativity does NOT apply (mixed operations).</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Susmita from Ichapur is designing a voting system for a committee of 5 members. Each member votes Yes (1) or No (0). The motion passes if ALL 5 vote Yes.
            <br /><br />
            She writes: <span className="font-mono">Pass = A·B·C·D·E</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">How does associativity allow her to implement this with 2-input AND gates?</strong>
            <br />
            Can you draw two different ways to connect the gates? Which grouping might be better for signal delay?
            <br /><br />
            <strong>Observe carefully:</strong> Associativity gives designers flexibility in how they physically implement logic. Different groupings can affect speed, power, and layout!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Associative Laws are often intuitive because students already know addition and multiplication are associative. The key is showing this extends to Boolean operations.\n\n" +
            "💡 **Teaching Strategy:** Start with regular arithmetic: (2+3)+4 = 2+(3+4). Then show Boolean AND and OR behave the same way using truth tables.\n\n" +
            "🔍 **Common Misunderstanding:** Students sometimes try to apply associativity across different operations. Emphasize: (A·B)+C ≠ A·(B+C). This is distributive law territory.\n\n" +
            "📌 **Hardware Connection:** Associativity is why we can build 3-input gates from 2-input gates. This is practical knowledge for circuit designers.\n\n" +
            "🎯 **Programming Connection:** While `&&` and `||` are logically associative, short-circuit evaluation can cause side-effect differences. This is an important nuance for advanced students."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What is the Associative Law for AND?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The AND Associative Law states that (A·B)·C = A·(B·C). Grouping doesn't affect the result.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: What is the Associative Law for OR?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The OR Associative Law states that (A+B)+C = A+(B+C). Grouping doesn't affect the result.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: Why is associativity important?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It allows us to extend AND/OR to any number of inputs and to write expressions without parentheses for chains of the same operation.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: Prove (A·B)·C = A·(B·C) using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For all 8 input combinations, both sides produce identical outputs. Only when A=B=C=1 does output=1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: Prove (A+B)+C = A+(B+C) using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For all 8 input combinations, both sides produce identical outputs. Output=1 when any input=1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: Simplify: (A·B·C)·(D·E)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·B·C·D·E (associativity allows removing parentheses)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: Simplify: (A+B)+(C+D)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A+B+C+D (associativity allows removing parentheses)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: Is (A·B)+C equal to A·(B+C)?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No! Associativity only applies when operations are the same. This is an example of mixed operations.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: What's the difference between associative and commutative?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Commutative changes order (A+B = B+A). Associative changes grouping ((A+B)+C = A+(B+C)).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: How does associativity help in circuit design?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It allows breaking large fan-in gates into cascaded smaller gates and provides flexibility in grouping for timing optimization.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: Can we write A·B·C·D without parentheses?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Because AND is associative, any grouping yields the same result. A·B·C·D is unambiguous.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: Can we write A+B+C+D without parentheses?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Because OR is associative, any grouping yields the same result.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: Does NAND satisfy associativity?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. NAND is NOT associative. (A↑B)↑C ≠ A↑(B↑C). This is why NAND-based circuits require careful design.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: Does XOR satisfy associativity?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! XOR is associative. (A⊕B)⊕C = A⊕(B⊕C). This is used in parity generators and checksums.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: In programming, are && and || associative?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes, logically they are associative. However, due to short-circuit evaluation, side effects may differ based on grouping.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: Simplify: (A·B)·(C·D) + (E+F)+(G+H)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·B·C·D + E+F+G+H</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: Why can't we apply associativity across AND and OR?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because (A·B)+C and A·(B+C) produce different truth tables. Different operations don't associate.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: How many ways can you parenthesize a 4-input AND?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: There are 5 possible parenthesizations, but associativity ensures they all yield the same result.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: What is the practical limit of associativity in hardware?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: While logically associative, physical gates have fan-in limits. You may need to cascade, and grouping affects propagation delay.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: Simplify: ((A+B)+C)+((D+E)+F)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A+B+C+D+E+F (using associativity repeatedly)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic10;