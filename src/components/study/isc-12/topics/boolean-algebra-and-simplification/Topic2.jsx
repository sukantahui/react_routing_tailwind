import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import andGate from "./topic2_files/and-gate.png";
import orGate from "./topic2_files/or-gate.png";
import notGate from "./topic2_files/not-gate.png";

/**
 * Topic 2: Basic operations: AND (·), OR (+), NOT (')
 * 
 * Component: Topic2
 * Purpose: Explains the three fundamental Boolean operations:
 *          - AND (·) - Logical conjunction
 *          - OR (+) - Logical disjunction
 *          - NOT (') - Logical negation/inversion
 *          Covers definitions, truth tables, circuit symbols, and real-world applications
 * 
 * When & Why: Used as the third topic in the Boolean Algebra series. Students must
 *             master these operations before progressing to laws, simplification,
 *             and complex circuit design. These are the building blocks of all
 *             digital logic systems.
 * 
 * Return Type: JSX.Element
 */

const Topic2 = () => {
  // State for interactive operation demonstrations
  const [andInputA, setAndInputA] = useState(0);
  const [andInputB, setAndInputB] = useState(0);
  const [orInputA, setOrInputA] = useState(0);
  const [orInputB, setOrInputB] = useState(0);
  const [notInput, setNotInput] = useState(0);

  // Helper functions for operation results
  const andResult = andInputA && andInputB ? 1 : 0;
  const orResult = orInputA || orInputB ? 1 : 0;
  const notResult = notInput ? 0 : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-purple-100 dark:bg-purple-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Basic Operations:</span>
          <span className="block text-purple-600 dark:text-purple-400">AND, OR, NOT</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          The three fundamental gates that power all digital logic
        </p>
      </div>

      <div className="space-y-8">
        {/* AND Operation Section */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> AND Operation (·)
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The <strong className="text-purple-600 dark:text-purple-400">AND operation</strong> (represented by <strong className="font-mono">·</strong> or no symbol) produces an output of <strong className="text-green-600">1</strong> only when <strong className="underline">ALL inputs are 1</strong>. It's like saying "both conditions must be true."
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Mathematical Notation:</h3>
                <p className="font-mono text-lg text-gray-800 dark:text-gray-200">F = A · B  or  F = AB</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Read as: "A AND B"</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <th className="px-4 py-2 text-center font-mono">A</th>
                      <th className="px-4 py-2 text-center font-mono">B</th>
                      <th className="px-4 py-2 text-center font-mono">A · B</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[[0,0,0], [0,1,0], [1,0,0], [1,1,1]].map(([a,b,res]) => (
                      <tr key={`and-${a}-${b}`} className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">{a}</td>
                        <td className="px-4 py-2 text-center font-mono">{b}</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-purple-600">{res}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive AND Gate */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive AND Gate</h3>
                <div className="flex justify-center gap-6 mb-4">
                  <button
                    onClick={() => setAndInputA(andInputA === 0 ? 1 : 0)}
                    className={clsx(
                      "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                      andInputA === 1 
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                        : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                    )}
                  >
                    {andInputA}
                  </button>
                  <div className="flex items-center text-2xl font-bold text-gray-500">AND</div>
                  <button
                    onClick={() => setAndInputB(andInputB === 0 ? 1 : 0)}
                    className={clsx(
                      "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                      andInputB === 1 
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                        : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                    )}
                  >
                    {andInputB}
                  </button>
                </div>
                <div className="text-center">
                  <div className={clsx(
                    "inline-block w-24 h-24 rounded-xl flex items-center justify-center text-3xl font-bold transition-all duration-300",
                    andResult === 1 
                      ? "bg-green-500 text-white shadow-lg" 
                      : "bg-red-500 text-white shadow-lg"
                  )}>
                    {andResult}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Output = {andResult} ({andResult === 1 ? "TRUE" : "FALSE"})
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">💡 Real-world analogy:</span> "You can enter the club <strong className="text-purple-600">IF</strong> you have an ID <strong className="text-purple-600">AND</strong> you're on the guest list."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OR Operation Section */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔀</span> OR Operation (+)
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The <strong className="text-purple-600 dark:text-purple-400">OR operation</strong> (represented by <strong className="font-mono">+</strong>) produces an output of <strong className="text-green-600">1</strong> when <strong className="underline">AT LEAST ONE input is 1</strong>. It's like saying "either condition can be true."
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Mathematical Notation:</h3>
                <p className="font-mono text-lg text-gray-800 dark:text-gray-200">F = A + B</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Read as: "A OR B"</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <th className="px-4 py-2 text-center font-mono">A</th>
                      <th className="px-4 py-2 text-center font-mono">B</th>
                      <th className="px-4 py-2 text-center font-mono">A + B</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[[0,0,0], [0,1,1], [1,0,1], [1,1,1]].map(([a,b,res]) => (
                      <tr key={`or-${a}-${b}`} className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">{a}</td>
                        <td className="px-4 py-2 text-center font-mono">{b}</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-purple-600">{res}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive OR Gate */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive OR Gate</h3>
                <div className="flex justify-center gap-6 mb-4">
                  <button
                    onClick={() => setOrInputA(orInputA === 0 ? 1 : 0)}
                    className={clsx(
                      "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                      orInputA === 1 
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                        : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                    )}
                  >
                    {orInputA}
                  </button>
                  <div className="flex items-center text-2xl font-bold text-gray-500">OR</div>
                  <button
                    onClick={() => setOrInputB(orInputB === 0 ? 1 : 0)}
                    className={clsx(
                      "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                      orInputB === 1 
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                        : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                    )}
                  >
                    {orInputB}
                  </button>
                </div>
                <div className="text-center">
                  <div className={clsx(
                    "inline-block w-24 h-24 rounded-xl flex items-center justify-center text-3xl font-bold transition-all duration-300",
                    orResult === 1 
                      ? "bg-green-500 text-white shadow-lg" 
                      : "bg-red-500 text-white shadow-lg"
                  )}>
                    {orResult}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Output = {orResult} ({orResult === 1 ? "TRUE" : "FALSE"})
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">💡 Real-world analogy:</span> "You get dessert <strong className="text-purple-600">IF</strong> you finish your homework <strong className="text-purple-600">OR</strong> you help with chores."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NOT Operation Section */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> NOT Operation (')
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The <strong className="text-purple-600 dark:text-purple-400">NOT operation</strong> (represented by <strong className="font-mono">'</strong> or a bar over the variable) <strong className="underline">inverts the input</strong>. It changes 0 to 1 and 1 to 0. Also called a complement or inverter.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Mathematical Notation:</h3>
                <p className="font-mono text-lg text-gray-800 dark:text-gray-200">F = A'  or  F = Ā  or  F = ¬A</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Read as: "NOT A" or "A complement" or "A bar"</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <th className="px-4 py-2 text-center font-mono">A</th>
                      <th className="px-4 py-2 text-center font-mono">A'</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[[0,1], [1,0]].map(([a,res]) => (
                      <tr key={`not-${a}`} className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">{a}</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-purple-600">{res}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive NOT Gate */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive NOT Gate (Inverter)</h3>
                <div className="flex justify-center items-center gap-6 mb-4">
                  <button
                    onClick={() => setNotInput(notInput === 0 ? 1 : 0)}
                    className={clsx(
                      "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                      notInput === 1 
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                        : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                    )}
                  >
                    {notInput}
                  </button>
                  <div className="text-2xl font-bold text-gray-500">→ NOT →</div>
                  <div className={clsx(
                    "w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300",
                    notResult === 1 
                      ? "bg-green-500 text-white shadow-lg" 
                      : "bg-red-500 text-white shadow-lg"
                  )}>
                    {notResult}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Input = {notInput} → Output = {notResult} ({notResult === 1 ? "TRUE" : "FALSE"})
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">💡 Real-world analogy:</span> "The light is ON <strong className="text-purple-600">IF NOT</strong> the switch is OFF." (Inverter)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operation Summary with SVG */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📊</span> Operation Summary
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/40">
              <div className="text-4xl mb-2">AND</div>
              <p className="font-mono text-sm">F = A · B</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Output = 1 if ALL inputs = 1</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-900/40">
              <div className="text-4xl mb-2">OR</div>
              <p className="font-mono text-sm">F = A + B</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Output = 1 if ANY input = 1</p>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-900/40">
              <div className="text-4xl mb-2">NOT</div>
              <p className="font-mono text-sm">F = A'</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Output = Opposite of input</p>
            </div>
          </div>

          {/* Logic Gate Symbols SVG */}
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700/30 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🔌 Standard Logic Gate Symbols</h3>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <img src={andGate} alt="Half Adder Circuit" className="max-w-full dark:invert" />
              <img src={orGate} alt="Half Adder Circuit" className="max-w-full dark:invert" />
              <img src={notGate} alt="Half Adder Circuit" className="max-w-full dark:invert" />
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
              AND, OR, and NOT gates are the building blocks of all digital circuits
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>AND = Multiplication:</strong> Think of AND as multiplication (0·0=0, 0·1=0, 1·1=1) - this helps remember the truth table.</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>OR = Addition (with saturation):</strong> Think of OR as addition that saturates at 1 (0+0=0, 0+1=1, 1+1=1).</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>NOT = Inversion:</strong> Visualize NOT as a "flip" operation. A common trick: Two NOT gates cancel each other (A'' = A).</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Memory Aid:</strong> AND requires ALL, OR requires ANY. Remember: "All ANDs, Any ORs".</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Bubble Notation:</strong> In schematics, a bubble (circle) at a gate input/output indicates NOT (inversion).</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Confusing AND with OR in word problems:</strong> "AND" means BOTH conditions must be true; "OR" means EITHER condition can be true. Read carefully!</li>
            <li><strong>Arithmetic vs. Logic:</strong> Remember 1 + 1 = 1 (OR), NOT 2. Don't treat Boolean operators like arithmetic operators.</li>
            <li><strong>Operator Precedence:</strong> NOT has highest precedence, then AND, then OR. <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">A·B + C</code> means <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">(A·B) + C</code>, not <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">A·(B+C)</code>.</li>
            <li><strong>NOT Placement:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">(AB)'</code> is NOT the same as <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">A'B'</code>. The NOT applies to the entire expression in the first case.</li>
            <li><strong>Missing Parentheses:</strong> When combining operations, always use parentheses to avoid ambiguity, especially with NOT.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Use descriptive variable names:</strong> Instead of <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">A AND B</code>, use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">doorOpen AND motionDetected</code> for clarity.</li>
            <li><strong>Parenthesize for clarity:</strong> Even when not strictly required, parentheses improve readability. Write <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">(A · B) + C</code> instead of <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">A·B + C</code>.</li>
            <li><strong>Draw truth tables first:</strong> Before implementing any logic, create a truth table to verify your understanding of the operation.</li>
            <li><strong>Test all input combinations:</strong> Always verify your logic works for all possible input values (00, 01, 10, 11 for 2-input gates).</li>
            <li><strong>Use gate symbols consistently:</strong> In circuit diagrams, use standard ANSI/IEEE symbols to avoid confusion.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Define AND, OR, and NOT operations with words and truth tables.</li>
            <li>Calculate outputs for any combination of inputs for AND, OR, and NOT.</li>
            <li>Recognize and draw the standard logic gate symbols.</li>
            <li>Translate English statements into Boolean expressions using AND, OR, NOT.</li>
            <li>Explain the difference between AND and OR using real-world analogies.</li>
            <li>Understand the operator precedence: NOT > AND > OR.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Imagine Swadeep from Barrackpore is designing a simple security system for his home in Shyamnagar. He has:
            <br /><br />
            - A front door sensor (F)
            - A back door sensor (B)
            - A window sensor (W)
            - A master alarm switch (M)
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Try writing Boolean expressions for these scenarios:</strong><br />
            1. Alarm sounds if master switch is ON AND the front door is open.<br />
            2. Alarm sounds if master switch is ON AND (front door OR back door OR window is open).<br />
            3. How would you write an expression that triggers the alarm if the master switch is OFF?<br /><br />
            <strong>Observe carefully:</strong> How do parentheses change the meaning of expression #2 compared to #1?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "This is the foundation—students must master these three operations before moving forward.\n\n" +
            "💡 **Teaching Strategy:** Use the interactive buttons! Let students experiment with different input combinations. Physical interaction helps cement understanding.\n\n" +
            "🔍 **Common Misunderstanding:** Many students think 1+1=2 in Boolean Algebra. Emphasize that '+' is OR, not addition. The 'saturation' analogy (1+1=1) helps.\n\n" +
            "📌 **Remember:** Always start with truth tables. They're the universal language of logic. Once students can create truth tables, they can verify any expression.\n\n" +
            "🎯 **Key Point:** Emphasize that these three gates are the ONLY building blocks needed to create ANY digital circuit. This motivates students to master them."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What does the AND operation do?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: AND outputs 1 only when ALL inputs are 1. If any input is 0, the output is 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: What does the OR operation do?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: OR outputs 1 when AT LEAST ONE input is 1. Only when ALL inputs are 0 does it output 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: What does the NOT operation do?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: NOT inverts the input. It changes 0 to 1 and 1 to 0. It's also called a complement or inverter.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: Why is AND represented by multiplication (·) sometimes?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because the truth table of AND matches multiplication: 0·0=0, 0·1=0, 1·0=0, 1·1=1. This analogy helps remember the AND operation.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: Why is OR represented by addition (+) sometimes?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The truth table of OR is like addition that saturates at 1. 0+0=0, 0+1=1, 1+0=1, 1+1=1 (not 2).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: What is the order of precedence for Boolean operations?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: NOT has the highest precedence, then AND, then OR. For example, A·B + C means (A·B) + C, not A·(B+C).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: What is the output of 1 AND 0?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 0. Because AND requires both inputs to be 1 for output 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: What is the output of 1 OR 0?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 1. Because OR outputs 1 if at least one input is 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: What is the output of NOT 1?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 0. NOT inverts the input.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: How many possible input combinations are there for a 2-input AND gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 4 combinations: 00, 01, 10, 11. For n inputs, there are 2ⁿ combinations.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: Can we build any logic circuit using only AND, OR, and NOT gates?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! AND, OR, and NOT form a functionally complete set. Any Boolean function can be implemented using these three gates.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: What is the difference between (AB)' and A'B'?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (AB)' means NOT (A AND B). A'B' means (NOT A) AND (NOT B). They are different. For A=1, B=1: (AB)'=0, A'B'=0·0=0. For A=1, B=0: (AB)'=1, A'B'=0·1=0. They're not equivalent.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: What does a bubble on a gate's output represent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A bubble (circle) on a gate's input or output represents inversion (NOT operation). For example, an AND gate with a bubble on the output is a NAND gate.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: How do you read A·B in words?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: "A AND B" or "A dot B". The dot is often omitted, so AB is read as "A AND B".</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: How do you read A + B in words?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: "A OR B". Never read it as "A plus B" to avoid confusion with arithmetic.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: Give a real-world example of AND logic.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A car's engine starts only if the key is turned AND the gear is in Park. Both conditions must be true.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: Give a real-world example of OR logic.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A building alarm sounds if a door is opened OR a window is broken OR motion is detected. Any one condition triggers the alarm.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: Give a real-world example of NOT logic.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A "Do Not Disturb" sign on a hotel door. If the sign is present (1), it means NOT disturb. The NOT inverts the meaning.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: What happens if you connect a NOT gate to the output of an AND gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: You get a NAND gate (NOT AND). It outputs 0 only when all inputs are 1; otherwise outputs 1.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: What happens if you connect a NOT gate to the output of an OR gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: You get a NOR gate (NOT OR). It outputs 1 only when all inputs are 0; otherwise outputs 0.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic2;