import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 12: De Morgan's Theorems (with proof and examples)
 * 
 * Component: Topic12
 * Purpose: Explains De Morgan's Theorems, the most important rules for complementing
 *          complex Boolean expressions:
 *          - (A · B)' = A' + B' (Complement of AND is OR of complements)
 *          - (A + B)' = A' · B' (Complement of OR is AND of complements)
 *          - These theorems are essential for circuit conversion and simplification
 * 
 * When & Why: Used as the thirteenth topic in the Boolean Algebra series. De Morgan's
 *             Theorems are the cornerstone of digital logic design, enabling conversion
 *             between AND-OR and NAND-NOR implementations, and are critical for
 *             understanding how to complement complex expressions.
 * 
 * Return Type: JSX.Element
 */

const Topic12 = () => {
  // State for interactive demonstrations
  const [demorganA, setDemorganA] = useState(0);
  const [demorganB, setDemorganB] = useState(0);

  // First theorem: (A·B)' = A' + B'
  const andResult = demorganA && demorganB ? 1 : 0;
  const andComplement = andResult === 0 ? 1 : 0;
  const aComplement = demorganA === 0 ? 1 : 0;
  const bComplement = demorganB === 0 ? 1 : 0;
  const orOfComplements = aComplement || bComplement ? 1 : 0;

  // Second theorem: (A+B)' = A' · B'
  const orResult = demorganA || demorganB ? 1 : 0;
  const orComplement = orResult === 0 ? 1 : 0;
  const andOfComplements = aComplement && bComplement ? 1 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-purple-100 dark:bg-purple-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">De Morgan's</span>
          <span className="block text-purple-600 dark:text-purple-400">Theorems</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          (A·B)' = A' + B' &nbsp;&nbsp;|&nbsp;&nbsp; (A+B)' = A' · B'
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to De Morgan's Theorems */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📜</span> What are De Morgan's Theorems?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Named after mathematician <strong className="text-purple-600 dark:text-purple-400">Augustus De Morgan</strong> (1806-1871), these theorems provide rules for complementing complex Boolean expressions. They show the relationship between AND, OR, and NOT operations when dealing with complements of compound expressions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/40">
              <p className="text-2xl font-mono font-bold text-purple-700 dark:text-purple-300 mb-2">(A · B)' = A' + B'</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">First Theorem</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"Complement of AND = OR of complements"</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/40">
              <p className="text-2xl font-mono font-bold text-purple-700 dark:text-purple-300 mb-2">(A + B)' = A' · B'</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Second Theorem</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">"Complement of OR = AND of complements"</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> De Morgan's Theorems allow us to <strong className="text-purple-600">push NOT gates through AND/OR gates</strong>, converting AND to OR and vice versa. This is fundamental for implementing any logic function using only NAND or only NOR gates.
            </p>
          </div>
        </div>

        {/* First Theorem: (A·B)' = A' + B' */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> First Theorem: (A · B)' = A' + B'
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The complement of an AND operation is equivalent to the OR of the complements. In other words, "NOT (A AND B)" is the same as "(NOT A) OR (NOT B)".
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-3 py-2">A</th><th className="px-3 py-2">B</th>
                        <th className="px-3 py-2">A·B</th><th className="px-3 py-2">(A·B)'</th>
                        <th className="px-3 py-2">A'</th><th className="px-3 py-2">B'</th>
                        <th className="px-3 py-2">A'+B'</th><th>Equal?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[[0,0,0,1,1,1,1], [0,1,0,1,1,0,1], [1,0,0,1,0,1,1], [1,1,1,0,0,0,0]].map(([a,b,andRes,andComp,aComp,bComp,orComp], idx) => (
                        <tr key={idx} className="border-t border-gray-200">
                          <td className="px-3 py-2 text-center font-mono">{a}</td>
                          <td className="px-3 py-2 text-center font-mono">{b}</td>
                          <td className="px-3 py-2 text-center font-mono">{andRes}</td>
                          <td className="px-3 py-2 text-center font-mono font-bold text-purple-600">{andComp}</td>
                          <td className="px-3 py-2 text-center font-mono">{aComp}</td>
                          <td className="px-3 py-2 text-center font-mono">{bComp}</td>
                          <td className="px-3 py-2 text-center font-mono font-bold text-purple-600">{orComp}</td>
                          <td className="px-3 py-2 text-center text-green-600">✓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* NEW: Algebraic Proof for First Theorem */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🧮 Algebraic Proof (Step by Step)</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">We prove that <span className="font-mono font-bold">(A·B)'</span> and <span className="font-mono font-bold">A' + B'</span> are complements. By the <strong>uniqueness of complement</strong>, if we show:</p>
                <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-2">
                  <li><span className="font-mono">(A·B) + (A' + B') = 1</span> (Sum equals 1)</li>
                  <li><span className="font-mono">(A·B) · (A' + B') = 0</span> (Product equals 0)</li>
                </ol>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">then <span className="font-mono">A' + B'</span> must be the complement of <span className="font-mono">A·B</span>, i.e. <span className="font-mono">(A·B)' = A' + B'</span>.</p>
                
                <div className="mt-3 space-y-2 text-sm font-mono">
                  <div><strong>Step 1 – Prove sum = 1:</strong></div>
                  <div className="ml-4">(A·B) + (A' + B')</div>
                  <div className="ml-4">= (A·B) + A' + B' &nbsp;&nbsp;<span className="text-gray-500 text-xs">(associativity of OR)</span></div>
                  <div className="ml-4">= (A + A')·(B + A') + B' &nbsp;&nbsp;<span className="text-gray-500 text-xs">(distributive law: (A·B)+A' = (A+A')·(B+A'))</span></div>
                  <div className="ml-4">= (1)·(B + A') + B' &nbsp;&nbsp;<span className="text-gray-500 text-xs">(complement law A+A'=1)</span></div>
                  <div className="ml-4">= (B + A') + B' &nbsp;&nbsp;<span className="text-gray-500 text-xs">(identity law: 1·X = X)</span></div>
                  <div className="ml-4">= B + (A' + B') &nbsp;&nbsp;<span className="text-gray-500 text-xs">(associativity)</span></div>
                  <div className="ml-4">= (B + B') + A' &nbsp;&nbsp;<span className="text-gray-500 text-xs">(commutativity & associativity)</span></div>
                  <div className="ml-4">= 1 + A' &nbsp;&nbsp;<span className="text-gray-500 text-xs">(complement law B+B'=1)</span></div>
                  <div className="ml-4">= 1 &nbsp;&nbsp;<span className="text-gray-500 text-xs">(annulment law: 1 + X = 1)</span></div>
                  
                  <div className="mt-3"><strong>Step 2 – Prove product = 0:</strong></div>
                  <div className="ml-4">(A·B) · (A' + B')</div>
                  <div className="ml-4">= (A·B)·A' + (A·B)·B' &nbsp;&nbsp;<span className="text-gray-500 text-xs">(distributive law)</span></div>
                  <div className="ml-4">= (A·A')·B + A·(B·B') &nbsp;&nbsp;<span className="text-gray-500 text-xs">(associativity & commutativity)</span></div>
                  <div className="ml-4">= (0)·B + A·(0) &nbsp;&nbsp;<span className="text-gray-500 text-xs">(complement law A·A'=0, B·B'=0)</span></div>
                  <div className="ml-4">= 0 + 0 &nbsp;&nbsp;<span className="text-gray-500 text-xs">(null law: 0·X = 0)</span></div>
                  <div className="ml-4">= 0 &nbsp;&nbsp;<span className="text-gray-500 text-xs">(identity for OR)</span></div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">✅ Since both conditions hold, <span className="font-mono font-bold">(A·B)' = A' + B'</span> is proved algebraically.</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "It is NOT true that (you have a key AND you have a code)" is the same as "Either you don't have a key OR you don't have a code."
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: (A·B)' = A' + B'</h3>
                <div className="flex justify-center items-center gap-3 mb-4 flex-wrap">
                  <button onClick={() => setDemorganA(demorganA === 0 ? 1 : 0)} className={clsx("w-14 h-14 rounded-lg font-mono text-xl font-bold", demorganA === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{demorganA}</button>
                  <button onClick={() => setDemorganB(demorganB === 0 ? 1 : 0)} className={clsx("w-14 h-14 rounded-lg font-mono text-xl font-bold", demorganB === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{demorganB}</button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs font-mono">(A·B)'</p>
                    <div className={clsx("p-3 rounded-lg font-bold text-xl", andComplement === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{andComplement}</div>
                  </div>
                  <div>
                    <p className="text-xs font-mono">A' + B'</p>
                    <div className={clsx("p-3 rounded-lg font-bold text-xl", orOfComplements === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{orOfComplements}</div>
                  </div>
                </div>
                <p className="text-center text-sm mt-3">✓ {andComplement} = {orOfComplements}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Theorem: (A+B)' = A' · B' */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔀</span> Second Theorem: (A + B)' = A' · B'
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The complement of an OR operation is equivalent to the AND of the complements. In other words, "NOT (A OR B)" is the same as "(NOT A) AND (NOT B)".
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-3 py-2">A</th><th className="px-3 py-2">B</th>
                        <th className="px-3 py-2">A+B</th><th className="px-3 py-2">(A+B)'</th>
                        <th className="px-3 py-2">A'</th><th className="px-3 py-2">B'</th>
                        <th className="px-3 py-2">A'·B'</th><th>Equal?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[[0,0,0,1,1,1,1], [0,1,1,0,1,0,0], [1,0,1,0,0,1,0], [1,1,1,0,0,0,0]].map(([a,b,orRes,orComp,aComp,bComp,andComp], idx) => (
                        <tr key={idx} className="border-t border-gray-200">
                          <td className="px-3 py-2 text-center font-mono">{a}</td>
                          <td className="px-3 py-2 text-center font-mono">{b}</td>
                          <td className="px-3 py-2 text-center font-mono">{orRes}</td>
                          <td className="px-3 py-2 text-center font-mono font-bold text-purple-600">{orComp}</td>
                          <td className="px-3 py-2 text-center font-mono">{aComp}</td>
                          <td className="px-3 py-2 text-center font-mono">{bComp}</td>
                          <td className="px-3 py-2 text-center font-mono font-bold text-purple-600">{andComp}</td>
                          <td className="px-3 py-2 text-center text-green-600">✓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* NEW: Algebraic Proof for Second Theorem */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🧮 Algebraic Proof (Step by Step)</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">We prove that <span className="font-mono font-bold">(A+B)'</span> and <span className="font-mono font-bold">A'·B'</span> are complements. Again, we show the two necessary conditions:</p>
                <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-2">
                  <li><span className="font-mono">(A+B) + (A'·B') = 1</span></li>
                  <li><span className="font-mono">(A+B) · (A'·B') = 0</span></li>
                </ol>
                
                <div className="mt-3 space-y-2 text-sm font-mono">
                  <div><strong>Step 1 – Prove sum = 1:</strong></div>
                  <div className="ml-4">(A+B) + (A'·B')</div>
                  <div className="ml-4">= (A+B+A')·(A+B+B') &nbsp;&nbsp;<span className="text-gray-500 text-xs">(distributive law: X + (Y·Z) = (X+Y)·(X+Z))</span></div>
                  <div className="ml-4">= (1 + B)·(A + 1) &nbsp;&nbsp;<span className="text-gray-500 text-xs">(complement: A+A'=1, B+B'=1)</span></div>
                  <div className="ml-4">= 1·1 &nbsp;&nbsp;<span className="text-gray-500 text-xs">(annulment: 1+X = 1)</span></div>
                  <div className="ml-4">= 1 &nbsp;&nbsp;<span className="text-gray-500 text-xs">(identity)</span></div>
                  
                  <div className="mt-3"><strong>Step 2 – Prove product = 0:</strong></div>
                  <div className="ml-4">(A+B) · (A'·B')</div>
                  <div className="ml-4">= (A·A'·B') + (B·A'·B') &nbsp;&nbsp;<span className="text-gray-500 text-xs">(distributive law)</span></div>
                  <div className="ml-4">= (0·B') + (A'·0) &nbsp;&nbsp;<span className="text-gray-500 text-xs">(complement: A·A'=0, B·B'=0)</span></div>
                  <div className="ml-4">= 0 + 0 &nbsp;&nbsp;<span className="text-gray-500 text-xs">(null law: 0·X = 0)</span></div>
                  <div className="ml-4">= 0 &nbsp;&nbsp;<span className="text-gray-500 text-xs">(identity)</span></div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">✅ Both conditions are satisfied, therefore <span className="font-mono font-bold">(A+B)' = A'·B'</span> holds algebraically.</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "It is NOT true that (you have a key OR you have a code)" is the same as "You don't have a key AND you don't have a code."
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: (A+B)' = A' · B'</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs font-mono">(A+B)'</p>
                    <div className={clsx("p-3 rounded-lg font-bold text-xl", orComplement === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{orComplement}</div>
                  </div>
                  <div>
                    <p className="text-xs font-mono">A' · B'</p>
                    <div className={clsx("p-3 rounded-lg font-bold text-xl", andOfComplements === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{andOfComplements}</div>
                  </div>
                </div>
                <p className="text-center text-sm mt-3">✓ {orComplement} = {andOfComplements}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Generalization to Multiple Variables */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📐</span> Generalization to Multiple Variables
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            De Morgan's Theorems extend to any number of variables:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
              <p className="font-mono text-lg font-bold">(A·B·C·...)' = A' + B' + C' + ...</p>
              <p className="text-sm text-gray-600 mt-1">Complement of AND = OR of complements</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
              <p className="font-mono text-lg font-bold">(A+B+C+...)' = A' · B' · C' · ...</p>
              <p className="text-sm text-gray-600 mt-1">Complement of OR = AND of complements</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">📌 Example:</span> (A·B·C)' = A' + B' + C'<br />
              <span className="font-bold">📌 Example:</span> (A+B+C)' = A' · B' · C'
            </p>
          </div>
        </div>

        {/* Circuit Implementation: NAND and NOR Gates */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔌</span> NAND and NOR: Universal Gates
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            De Morgan's Theorems prove that <strong className="text-purple-600">NAND</strong> and <strong className="text-purple-600">NOR</strong> gates are <strong className="text-purple-600">universal</strong>—any logic function can be implemented using only NAND gates or only NOR gates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">NAND as Universal Gate</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-mono font-bold">NOT</span> = NAND with inputs tied: <span className="font-mono">A' = (A·A)'</span></p>
                <p><span className="font-mono font-bold">AND</span> = NAND followed by NOT: <span className="font-mono">A·B = ( (A·B)' )'</span></p>
                <p><span className="font-mono font-bold">OR</span> = De Morgan: <span className="font-mono">A+B = (A'·B')'</span></p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">NOR as Universal Gate</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-mono font-bold">NOT</span> = NOR with inputs tied: <span className="font-mono">A' = (A+A)'</span></p>
                <p><span className="font-mono font-bold">OR</span> = NOR followed by NOT: <span className="font-mono">A+B = ( (A+B)' )'</span></p>
                <p><span className="font-mono font-bold">AND</span> = De Morgan: <span className="font-mono">A·B = (A'+B')'</span></p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">💡 Industry Impact:</span> Most digital chips use NAND or NOR gates exclusively because they're easier to manufacture and faster than AND/OR gates.
            </p>
          </div>
        </div>

        {/* Application Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Application Examples
          </h2>
          
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Example 1: Complementing a Product Term</h3>
              <p className="font-mono">Find complement of: F = A·B·C</p>
              <p className="font-mono">F' = (A·B·C)' = A' + B' + C'</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Example 2: Complementing a Sum Term</h3>
              <p className="font-mono">Find complement of: F = A + B + C</p>
              <p className="font-mono">F' = (A+B+C)' = A' · B' · C'</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Example 3: Complex Expression</h3>
              <p className="font-mono">Find complement of: F = A·B + C·D</p>
              <p className="font-mono">F' = (A·B + C·D)'</p>
              <p className="font-mono">= (A·B)' · (C·D)' (De Morgan on OR)</p>
              <p className="font-mono">= (A' + B') · (C' + D') (De Morgan on each AND)</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Example 4: Converting to NAND-only Circuit</h3>
              <p className="font-mono">Implement F = A·B + C using NAND gates</p>
              <p className="font-mono">F = ( (A·B)' · C' )' (using De Morgan)</p>
              <p className="text-sm text-gray-600 mt-1">This uses only NAND gates!</p>
            </div>
          </div>
        </div>

        {/* Bubble Pushing Technique */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🫧</span> Bubble Pushing: A Visual De Morgan's
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Engineers use "bubble pushing" to apply De Morgan's Theorem visually in circuit diagrams:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">AND with Bubbles → OR</h3>
              <svg width="180" height="80" viewBox="0 0 180 80" className="mx-auto">
                <path d="M 40 20 L 40 60 L 80 60 Q 100 50 80 40 L 40 40 Z" fill="#e2e8f0" stroke="#1e293b" />
                <circle cx="100" cy="50" r="5" fill="none" stroke="#1e293b" />
                <circle cx="30" cy="35" r="4" fill="white" stroke="#1e293b" />
                <circle cx="30" cy="55" r="4" fill="white" stroke="#1e293b" />
                <text x="15" y="38" fontSize="8">A'</text>
                <text x="15" y="58" fontSize="8">B'</text>
                <text x="110" y="53" fontSize="8">(A·B)'</text>
                <text x="140" y="25" fontSize="10">→</text>
                <path d="M 150 20 L 150 60 L 190 60 Q 210 50 190 40 L 150 40 Z" fill="#e2e8f0" stroke="#1e293b" transform="translate(0,0)" />
                <text x="165" y="52" fontSize="8">OR</text>
                <text x="130" y="38" fontSize="8">A'</text>
                <text x="130" y="58" fontSize="8">B'</text>
                <text x="200" y="53" fontSize="8">A'+B'</text>
              </svg>
              <p className="text-xs mt-1">AND with bubbles = OR</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">OR with Bubbles → AND</h3>
              <svg width="180" height="80" viewBox="0 0 180 80" className="mx-auto">
                <path d="M 40 20 L 40 60 L 80 60 Q 100 50 80 40 L 40 40 Z" fill="#e2e8f0" stroke="#1e293b" />
                <circle cx="100" cy="50" r="5" fill="none" stroke="#1e293b" />
                <circle cx="30" cy="35" r="4" fill="white" stroke="#1e293b" />
                <circle cx="30" cy="55" r="4" fill="white" stroke="#1e293b" />
                <text x="15" y="38" fontSize="8">A'</text>
                <text x="15" y="58" fontSize="8">B'</text>
                <text x="110" y="53" fontSize="8">(A+B)'</text>
                <text x="140" y="25" fontSize="10">→</text>
                <rect x="150" y="20" width="40" height="40" fill="#e2e8f0" stroke="#1e293b" />
                <text x="165" y="48" fontSize="10">AND</text>
                <text x="130" y="38" fontSize="8">A'</text>
                <text x="130" y="58" fontSize="8">B'</text>
                <text x="200" y="53" fontSize="8">A'·B'</text>
              </svg>
              <p className="text-xs mt-1">OR with bubbles = AND</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Rule:</span> When pushing a bubble through a gate, the gate type changes (AND ↔ OR) and bubbles appear on all inputs/outputs.
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Break the Bar:</strong> When you see a complement bar over a complex expression, "break the bar" and change the operator (AND ↔ OR).</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Multiple Bars:</strong> For expressions with multiple bars, work from the outermost bar inward.</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>NAND/NOR Conversion:</strong> Use De Morgan's to convert any circuit to NAND-only or NOR-only for implementation.</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Memory Aid:</strong> "Break the bar, change the sign" — complement bar breaks, AND becomes OR, OR becomes AND.</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Bubble Pushing in Layout:</strong> In VLSI design, bubble pushing helps optimize transistor-level circuits by reducing inverters.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Forgetting to Complement All Variables:</strong> (A·B)' = A' + B', not A' + B. Every variable gets complemented!</li>
            <li><strong>Incorrect Operator Change:</strong> AND becomes OR, OR becomes AND. Don't keep the same operator.</li>
            <li><strong>Applying to Single Variables:</strong> (A)' is just A'—no operator change needed.</li>
            <li><strong>Order of Operations:</strong> When applying De Morgan's, handle outer bars first, then inner bars.</li>
            <li><strong>Misapplying with Constants:</strong> (A·0)' = A' + 1 = 1, not A'·1. Check your work!</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Work Step by Step:</strong> For complex expressions, apply De Morgan's one bar at a time from outermost to innermost.</li>
            <li><strong>Verify with Truth Tables:</strong> Always verify your complemented expression with a truth table—it's easy to make mistakes!</li>
            <li><strong>Use Bubble Pushing Visually:</strong> Draw circuits to visualize the transformation—it's often easier than algebraic manipulation.</li>
            <li><strong>Remember Complements of Complements:</strong> After applying De Morgan's, you may have double complements that cancel.</li>
            <li><strong>Document Your Steps:</strong> When simplifying, show each application of De Morgan's to avoid errors.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>State both De Morgan's Theorems correctly.</li>
            <li>Prove De Morgan's Theorems using truth tables.</li>
            <li>Apply De Morgan's to complement complex expressions.</li>
            <li>Convert AND-OR circuits to NAND-only or NOR-only implementations.</li>
            <li>Use "bubble pushing" to simplify circuit diagrams visually.</li>
            <li>Explain why NAND and NOR are called universal gates.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Swadeep from Barrackpore is designing a security system. The alarm should sound if:
            <br /><br />
            - The door is open (D) OR the window is open (W)
            - AND the system is armed (A)
            - BUT NOT during daytime (T' where T=1 for daytime)
            <br /><br />
            Expression: <span className="font-mono">Alarm = (D + W) · A · T'</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">How would you implement this using only NAND gates?</strong>
            <br />
            Try applying De Morgan's to convert the expression to NAND-only form.
            <br /><br />
            <strong>Observe carefully:</strong> How does De Morgan's help when you need to implement a circuit with only one type of gate?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "De Morgan's Theorems are among the most important tools in Boolean Algebra. Students must master them for circuit design.\n\n" +
            "💡 **Teaching Strategy:** Use the 'break the bar, change the sign' mnemonic. Show both algebraic proof and bubble pushing—visual learners benefit greatly from circuit diagrams.\n\n" +
            "🔍 **Common Misunderstanding:** Students often forget to complement all variables. Drill this with examples: (A·B)' becomes A'+B', not A'+B.\n\n" +
            "📌 **Real-World Connection:** Every digital chip uses NAND/NOR gates because they're universal. De Morgan's explains why.\n\n" +
            "🎯 **Advanced Topic:** Bubble pushing is used extensively in VLSI design to optimize transistor layouts."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What is De Morgan's First Theorem?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A·B)' = A' + B'. The complement of an AND is the OR of the complements.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: What is De Morgan's Second Theorem?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A+B)' = A' · B'. The complement of an OR is the AND of the complements.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: Prove (A·B)' = A' + B' using truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For (0,0):1=1; (0,1):1=1; (1,0):1=1; (1,1):0=0. All rows match.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: Prove (A+B)' = A' · B' using truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For (0,0):1=1; (0,1):0=0; (1,0):0=0; (1,1):0=0. All rows match.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: Find complement of F = A·B·C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F' = A' + B' + C'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: Find complement of F = A+B+C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F' = A' · B' · C'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: Find complement of F = A·B + C·D</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F' = (A' + B') · (C' + D')</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: Find complement of F = (A+B)·(C+D)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F' = (A'·B') + (C'·D')</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: Why are NAND gates called universal?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because any Boolean function can be implemented using only NAND gates, proven using De Morgan's theorems.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: How do you make an OR gate from NAND gates?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A+B = (A'·B')' using De Morgan's. First NAND A with A to get A', NAND B with B to get B', then NAND the results.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: How do you make an AND gate from NOR gates?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A·B = (A'+B')' using De Morgan's. First NOR A with A to get A', NOR B with B to get B', then NOR the results.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: What is bubble pushing?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A visual technique for applying De Morgan's where bubbles (inverters) are pushed through gates, changing the gate type.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: Simplify: (A'·B')'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A + B (by De Morgan's)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: Simplify: (A'+B')'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·B (by De Morgan's)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Find complement of F = A·B' + A'·B</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F' = (A·B')' · (A'·B)' = (A'+B) · (A+B')</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: How does De Morgan's help in digital circuit design?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It allows conversion between gate types, optimization for specific technologies, and simplification of complex circuits.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: Apply De Morgan's to (A·B·C + D·E)'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A·B·C)' · (D·E)' = (A'+B'+C') · (D'+E')</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: Apply De Morgan's to ((A+B)·(C+D))'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A+B)' + (C+D)' = (A'·B') + (C'·D')</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: What happens when you apply De Morgan's twice?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: You return to the original expression, as double complement cancels: (F')' = F.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: Why is De Morgan's important for programming?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It helps simplify complex conditional statements. For example, {`if (!(x > 0 && y > 0)) is equivalent to if (x <= 0 || y <= 0)`}.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic12;