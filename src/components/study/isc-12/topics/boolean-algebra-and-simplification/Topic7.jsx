import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 7: Basic Laws of Boolean Algebra: Involution Law
 * 
 * Component: Topic7
 * Purpose: Explains the Involution Law (Double Complement Law) of Boolean Algebra:
 *          - (A')' = A
 *          - Applying NOT twice returns the original value
 *          - Also known as the Double Negation Law
 * 
 * When & Why: Used as the eighth topic in the Boolean Algebra series. Involution Law
 *             demonstrates the reversible nature of the NOT operation and is essential
 *             for understanding complement pairs, circuit minimization, and De Morgan's
 *             theorems.
 * 
 * Return Type: JSX.Element
 */

const Topic7 = () => {
  // State for interactive demonstration
  const [involutionVar, setInvolutionVar] = useState(0);
  const [showSteps, setShowSteps] = useState(true);

  // Calculate results
  const firstComplement = involutionVar === 0 ? 1 : 0;
  const secondComplement = firstComplement === 0 ? 1 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Basic Laws:</span>
          <span className="block text-indigo-600 dark:text-indigo-400">Involution Law</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          (A')' = A — Two negatives make a positive
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Involution Law */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> What is the Involution Law?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The <strong className="text-indigo-600 dark:text-indigo-400">Involution Law</strong> (also called the <strong className="text-indigo-600 dark:text-indigo-400">Double Complement Law</strong> or <strong className="text-indigo-600 dark:text-indigo-400">Double Negation Law</strong>) states that the complement of the complement of a variable returns the original variable. In simpler terms, applying NOT twice cancels itself out.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl text-center mb-4">
            <p className="text-3xl font-mono font-bold text-indigo-700 dark:text-indigo-300 mb-2">(A')' = A</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">"NOT NOT A equals A"</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> The NOT operation is its own inverse. Just like adding then subtracting the same number in regular algebra, two NOT operations cancel out. This property is fundamental to understanding logic circuits and reversible computing.
            </p>
          </div>
        </div>

        {/* Proof and Explanation */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📐</span> Proof of Involution Law
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-4 py-2 text-center font-mono">A</th>
                        <th className="px-4 py-2 text-center font-mono">A'</th>
                        <th className="px-4 py-2 text-center font-mono">(A')'</th>
                        <th className="px-4 py-2 text-center font-mono">Equals A?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-indigo-600">0</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 0 = 0</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-center font-mono">1</td>
                        <td className="px-4 py-2 text-center font-mono">0</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-indigo-600">1</td>
                        <td className="px-4 py-2 text-center text-green-600">✓ 1 = 1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "It is NOT the case that it is NOT raining" means the same as "It is raining." The double negation cancels out.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Interactive Involution Demo */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo: (A')' = A</h3>
                <div className="flex justify-center items-center gap-2 mb-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Original A</p>
                    <button
                      onClick={() => setInvolutionVar(involutionVar === 0 ? 1 : 0)}
                      className={clsx(
                        "w-20 h-20 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                        involutionVar === 1 
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      )}
                    >
                      {involutionVar}
                    </button>
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-500">→ NOT →</div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">A' (First NOT)</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold shadow-md",
                      firstComplement === 1 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    )}>
                      {firstComplement}
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-500">→ NOT →</div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">(A')' = A</p>
                    <div className={clsx(
                      "w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300",
                      secondComplement === 1 
                        ? "bg-green-500 text-white shadow-lg" 
                        : "bg-red-500 text-white shadow-lg"
                    )}>
                      {secondComplement}
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  💡 The final output always matches the original A! Two NOT gates cancel each other out.
                </p>
              </div>

              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/60"
              >
                {showSteps ? "Hide" : "Show"} Step-by-Step Logic
              </button>
              
              {showSteps && (
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg animate-[fade-up_0.3s_ease-out]">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-bold">📝 Step-by-Step:</span><br />
                    1. Start with A = {involutionVar}<br />
                    2. Apply NOT: A' = {firstComplement}<br />
                    3. Apply NOT again: (A')' = {secondComplement}<br />
                    4. Result: {secondComplement} = {involutionVar} ✓
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎨</span> Visual Representation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Circuit Diagram</h3>
              <svg width="250" height="120" viewBox="0 0 250 120" className="mx-auto transition-all duration-300 hover:scale-105">
                {/* First NOT gate */}
                <circle cx="70" cy="60" r="25" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
                <circle cx="88" cy="60" r="5" fill="none" stroke="#1e293b" strokeWidth="1.5" />
                <text x="62" y="65" fontSize="12" fontWeight="bold">1</text>
                <line x1="20" y1="60" x2="45" y2="60" stroke="#1e293b" strokeWidth="1.5" />
                <text x="5" y="55" fontSize="10">A</text>
                
                {/* Connecting line */}
                <line x1="103" y1="60" x2="130" y2="60" stroke="#1e293b" strokeWidth="1.5" />
                
                {/* Second NOT gate */}
                <circle cx="170" cy="60" r="25" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
                <circle cx="188" cy="60" r="5" fill="none" stroke="#1e293b" strokeWidth="1.5" />
                <text x="162" y="65" fontSize="12" fontWeight="bold">1</text>
                <line x1="203" y1="60" x2="235" y2="60" stroke="#1e293b" strokeWidth="1.5" />
                <text x="240" y="55" fontSize="10">A</text>
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Two NOT gates in series = A direct wire</p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Signal Waveform</h3>
              <svg width="250" height="100" viewBox="0 0 250 100" className="mx-auto">
                {/* A signal */}
                <polyline points="10,30 40,30 40,70 70,70 70,30 100,30" stroke="#3b82f6" strokeWidth="2" fill="none" />
                <text x="5" y="25" fontSize="10" fill="#3b82f6">A</text>
                <text x="115" y="55" fontSize="10" fill="#3b82f6">↓</text>
                
                {/* After first NOT */}
                <polyline points="130,70 160,70 160,30 190,30 190,70 220,70" stroke="#f97316" strokeWidth="2" fill="none" />
                <text x="125" y="85" fontSize="10" fill="#f97316">A'</text>
                <text x="225" y="55" fontSize="10" fill="#f97316">↓</text>
                
                {/* After second NOT */}
                <polyline points="10,70 40,70 40,30 70,30 70,70 100,70" stroke="#10b981" strokeWidth="2" fill="none" transform="translate(140, 0)" />
                <text x="155" y="85" fontSize="10" fill="#10b981">(A')' = A</text>
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">The signal returns to original after two inversions</p>
            </div>
          </div>
        </div>

        {/* Application Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Application Examples
          </h2>
          
          <div className="space-y-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 1: Simplifying Double Negation</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">Simplify: F = (A' + B')'</p>
              <p className="text-gray-700 dark:text-gray-300">This is NOT (NOT A OR NOT B)</p>
              <p className="text-gray-700 dark:text-gray-300">Using De Morgan's Theorem: <span className="font-mono">(A' + B')' = A · B</span></p>
              <p className="text-gray-700 dark:text-gray-300">This is actually an example where involution helps: <span className="font-mono">(A' + B')' = A·B</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The double negation is hidden in the De Morgan transformation!</p>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 2: NAND Gate to AND Gate</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">NAND = (A·B)'</p>
              <p className="text-gray-700 dark:text-gray-300">To get AND from NAND: <span className="font-mono">(NAND)' = ((A·B)')' = A·B</span></p>
              <p className="text-gray-700 dark:text-gray-300">So: <span className="font-mono">AND = NOT NAND</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Two NAND gates in series create an AND gate!</p>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example 3: NOR Gate to OR Gate</h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono mb-2">NOR = (A+B)'</p>
              <p className="text-gray-700 dark:text-gray-300">To get OR from NOR: <span className="font-mono">(NOR)' = ((A+B)')' = A+B</span></p>
              <p className="text-gray-700 dark:text-gray-300">So: <span className="font-mono">OR = NOT NOR</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Two NOR gates in series create an OR gate!</p>
            </div>
          </div>
        </div>

        {/* Advanced Concept: Involution in Logic Design */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🏭</span> Involution in Digital Circuit Design
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Gate Elimination</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Two NOT gates in series can be removed from a circuit. This saves components and reduces propagation delay.</p>
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded font-mono text-xs text-center">
                NOT → NOT = Wire
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">🔄 Active-Low to Active-High Conversion</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Involution allows us to convert between active-low and active-high signals by adding or removing NOT gates.</p>
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded font-mono text-xs text-center">
                enable (active-high) = NOT(enable_n)
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">💡 Design Tip</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              When designing circuits, engineers often use "bubble pushing" — moving inverters through gates using De Morgan's theorem and involution. This technique helps optimize circuit layout and reduce gate counts.
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Cancel NOT Gates:</strong> In a circuit diagram, two inverters in series can be replaced with a wire. Always look for these during optimization.</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Bubble Pushing:</strong> When working with NAND/NOR gates, remember that a bubble (NOT) on the output and input of adjacent gates can cancel if they're on the same wire.</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Active-Low Convention:</strong> Use involution to convert between active-high and active-low signals. For example, <span className="font-mono">reset = NOT(reset_n)</span>.</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Simplify Boolean Expressions:</strong> When you see double complements, eliminate them immediately. They add complexity without changing logic.</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Memory Aid:</strong> "Two negatives make a positive" works here too! NOT NOT A = A.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Confusing with Regular Algebra:</strong> In regular math, -(-x) = x works too, but the concept is similar. However, in Boolean, there's no concept of "negative" values.</li>
            <li><strong>Applying to Expressions Incorrectly:</strong> (A·B)' is NOT equal to A'·B'. The NOT applies to the whole expression, not individual variables.</li>
            <li><strong>Double Complement on Wrong Scope:</strong> Remember: (A' + B')' ≠ A + B. You must apply De Morgan's first!</li>
            <li><strong>Forgetting Parentheses:</strong> A'' is (A')', not A'·A'. The prime symbol applies to what comes immediately before it.</li>
            <li><strong>Over-simplifying:</strong> While (A')' = A, you cannot cancel NOTs that are separated by other operations without using De Morgan's theorem.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Cancel Early:</strong> When simplifying Boolean expressions, eliminate double complements as soon as you encounter them.</li>
            <li><strong>Use De Morgan's with Involution:</strong> When you have complement of a sum or product, apply De Morgan's first, then use involution to simplify.</li>
            <li><strong>Check Circuit Schematics:</strong> Look for pairs of inverters in series. They can be removed to reduce gate count and delay.</li>
            <li><strong>Document Signal Polarity:</strong> When using active-low signals, document the polarity clearly. Use involution to derive active-high equivalents.</li>
            <li><strong>Verify with Truth Tables:</strong> When in doubt, build a truth table to verify that (A')' equals A for all inputs.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-indigo-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>State the Involution Law: (A')' = A.</li>
            <li>Prove the Involution Law using a truth table.</li>
            <li>Simplify Boolean expressions by canceling double complements.</li>
            <li>Explain why two NOT gates in series can be replaced with a wire.</li>
            <li>Convert between active-low and active-high signals using involution.</li>
            <li>Understand when involution can and cannot be applied directly.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Swadeep from Shyamnagar is building a digital lock system. He has two signals:
            <br /><br />
            - <span className="font-mono">door_closed</span> (1 when door is closed)
            - <span className="font-mono">alarm_armed</span> (1 when alarm is active)
            <br /><br />
            However, his door sensor is actually active-low: it outputs 0 when the door is closed, and 1 when open. He needs to convert this to an active-high signal for his logic circuit.
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">How can Swadeep use the Involution Law to fix this?</strong>
            <br /><br />
            Original door sensor: <span className="font-mono">door_sensor_output</span> (0 = closed, 1 = open)<br />
            Desired signal: <span className="font-mono">door_closed</span> (1 = closed)<br />
            <br />
            What Boolean operation can convert the sensor output to the desired signal? Can you see involution at work?
            <br /><br />
            <strong>Observe carefully:</strong> How does the double NOT help when working with sensors of different polarities?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "The Involution Law is one of the most intuitive laws—students often 'get it' quickly because of the 'two negatives make a positive' analogy.\n\n" +
            "💡 **Teaching Strategy:** Start with language examples: 'It is not true that it is not raining' means 'It is raining.' Then transition to Boolean notation.\n\n" +
            "🔍 **Common Misunderstanding:** Students sometimes try to cancel NOTs that are separated by other operators. Emphasize that (A·B)' is NOT equal to A·B. You need De Morgan's first!\n\n" +
            "📌 **Real-World Connection:** In circuit design, double inverters are a common inefficiency. Teach students to look for and eliminate them during optimization.\n\n" +
            "🎯 **Practical Application:** Involution is crucial for understanding active-low vs active-high signals. Every digital designer must master this conversion."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What is the Involution Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The Involution Law states that (A')' = A. The complement of the complement of a variable returns the original variable.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: Why is it called "Involution"?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: In mathematics, an involution is a function that is its own inverse. Since applying NOT twice returns the original value, NOT is an involution function.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: Prove (A')' = A using a truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For A=0: 0'=1, 1'=0; For A=1: 1'=0, 0'=1. In both cases, (A')' equals A.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: What happens when you put two NOT gates in series?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The output equals the input. Two NOT gates in series cancel each other out and can be replaced with a wire.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: Simplify: (A')' · B</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A · B (using Involution Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: Simplify: (A' + B')'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Using De Morgan's: (A' + B')' = A · B (Involution is used in the transformation)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: Can we cancel NOT gates that are separated by other gates?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Not directly. You need to use De Morgan's theorem to push NOT gates through AND/OR gates before canceling.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: How is involution used in active-low signals?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: If a signal is active-low (enable_n), you can convert to active-high using enable = NOT(enable_n). Involution ensures converting back works.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: What is the difference between (A')' and (A') · (A')?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A')' = A (Involution). (A')·(A') = A' (Idempotent). They are different operations!</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: Can involution be applied to expressions with more than one variable?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! ( (A·B)' )' = A·B. The involution applies to the entire expression inside the parentheses.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: How many NOT gates in series does it take to get the original signal?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: An even number of NOT gates returns the original signal. An odd number inverts it. Involution shows that 2 NOT gates = wire.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: Simplify: ((A + B)' + C')'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Let X = (A+B)'. Then (X + C')' = X' · C = (A+B) · C = A·C + B·C (De Morgan's then involution)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: Why is involution important for circuit optimization?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It allows engineers to eliminate redundant inverters, reducing gate count, power consumption, and propagation delay.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: What is "bubble pushing"?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Bubble pushing is a technique where inverters (bubbles) are moved through gates using De Morgan's theorem, and involution is used to cancel adjacent bubbles.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: Is involution the same as double negation in English?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! "It is not the case that it is not raining" = "It is raining." Both follow the same principle.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: Simplify: (A' + B' + C')'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Using De Morgan's: (A' + B' + C')' = A · B · C</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: Can involution be applied to constants?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! 0' = 1, 1' = 0, so (0')' = 0 and (1')' = 1. Constants also follow the law.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: What happens if you apply NOT three times?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A''' = A' (since two NOTs cancel, leaving one). Odd number of NOTs = inversion, even number = original.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: How does involution relate to De Morgan's theorem?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: De Morgan's theorem distributes NOT over AND/OR, and involution cancels double NOTs that appear after transformation.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: Simplify: ( (A·B)' + (C·D)' )'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Let X = (A·B)', Y = (C·D)'. Then (X + Y)' = X' · Y' = (A·B) · (C·D) = A·B·C·D</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic7;