import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 11: Basic Laws of Boolean Algebra: Distributive Law
 * 
 * Component: Topic11
 * Purpose: Explains the Distributive Laws of Boolean Algebra:
 *          - A · (B + C) = (A · B) + (A · C) (AND distributes over OR)
 *          - A + (B · C) = (A + B) · (A + C) (OR distributes over AND)
 *          - These laws are fundamental for factoring and expanding expressions
 * 
 * When & Why: Used as the twelfth topic in the Boolean Algebra series. Distributive Laws
 *             are the most powerful simplification tools, enabling factoring and
 *             expansion. Unlike regular algebra, Boolean Algebra has two distributive
 *             laws, making it uniquely powerful for logic optimization.
 * 
 * Return Type: JSX.Element
 */

const Topic11 = () => {
  // State for interactive demonstrations
  const [distA, setDistA] = useState(0);
  const [distB, setDistB] = useState(0);
  const [distC, setDistC] = useState(0);

  // AND over OR: A·(B+C) = (A·B)+(A·C)
  const andOverOrLeft = distA && (distB || distC) ? 1 : 0;
  const andOverOrRight = (distA && distB) || (distA && distC) ? 1 : 0;

  // OR over AND: A+(B·C) = (A+B)·(A+C)
  const orOverAndLeft = distA || (distB && distC) ? 1 : 0;
  const orOverAndRight = (distA || distB) && (distA || distC) ? 1 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-amber-100 dark:bg-amber-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Basic Laws:</span>
          <span className="block text-amber-600 dark:text-amber-400">Distributive Law</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A·(B+C) = A·B + A·C &nbsp;&nbsp;|&nbsp;&nbsp; A + (B·C) = (A+B)·(A+C)
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Distributive Law */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📦</span> What is the Distributive Law?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The <strong className="text-amber-600 dark:text-amber-400">Distributive Laws</strong> describe how one operation distributes over another. Unlike regular algebra which has only one distributive law (multiplication over addition), Boolean Algebra has <strong className="text-amber-600">two</strong> distributive laws!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-amber-100 dark:hover:bg-amber-900/40">
              <p className="text-xl font-mono font-bold text-amber-700 dark:text-amber-300 mb-2">A · (B + C) = (A · B) + (A · C)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AND distributes over OR</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Like regular algebra: a(b+c) = ab + ac</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl text-center transition-all duration-300 hover:bg-amber-100 dark:hover:bg-amber-900/40">
              <p className="text-xl font-mono font-bold text-amber-700 dark:text-amber-300 mb-2">A + (B · C) = (A + B) · (A + C)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">OR distributes over AND</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Unique to Boolean Algebra!</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> The second distributive law <strong className="text-amber-600">A + (B·C) = (A+B)·(A+C)</strong> has no equivalent in regular algebra. This is what makes Boolean Algebra uniquely powerful for logic simplification!
            </p>
          </div>
        </div>

        {/* AND over OR: A·(B+C) = A·B + A·C */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span> AND over OR: A · (B + C) = A·B + A·C
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This law is similar to regular algebra: multiplication distributes over addition. It allows us to "expand" expressions by multiplying a term across a sum, or "factor" by pulling out a common term.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg text-sm">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th className="px-2 py-1">A</th><th className="px-2 py-1">B</th><th className="px-2 py-1">C</th>
                        <th className="px-2 py-1">B+C</th><th className="px-2 py-1">A·(B+C)</th>
                        <th className="px-2 py-1">A·B</th><th className="px-2 py-1">A·C</th>
                        <th className="px-2 py-1">A·B+A·C</th><th>Equal?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [0,0,0,0,0,0,0,0], [0,0,1,1,0,0,0,0],
                        [0,1,0,1,0,0,0,0], [0,1,1,1,0,0,0,0],
                        [1,0,0,0,0,0,0,0], [1,0,1,1,1,0,1,1],
                        [1,1,0,1,1,1,0,1], [1,1,1,1,1,1,1,1]
                      ].map((row, idx) => (
                        <tr key={idx} className="border-t border-gray-200">
                          {row.slice(0,8).map((val, i) => (
                            <td key={i} className="px-2 py-1 text-center font-mono text-sm">{val}</td>
                          ))}
                          <td className="px-2 py-1 text-center text-green-600">✓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You need a ticket AND (you are a student OR you are a senior)" is the same as "(You need a ticket AND you are a student) OR (You need a ticket AND you are a senior)."
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo</h3>
                <div className="flex justify-center items-center gap-2 mb-4 flex-wrap">
                  <button onClick={() => setDistA(distA === 0 ? 1 : 0)} className={clsx("w-12 h-12 rounded-lg font-mono font-bold", distA === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{distA}</button>
                  <button onClick={() => setDistB(distB === 0 ? 1 : 0)} className={clsx("w-12 h-12 rounded-lg font-mono font-bold", distB === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{distB}</button>
                  <button onClick={() => setDistC(distC === 0 ? 1 : 0)} className={clsx("w-12 h-12 rounded-lg font-mono font-bold", distC === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{distC}</button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div><p className="text-xs">A·(B+C)</p><div className={clsx("p-3 rounded-lg font-bold", andOverOrLeft === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{andOverOrLeft}</div></div>
                  <div><p className="text-xs">(A·B)+(A·C)</p><div className={clsx("p-3 rounded-lg font-bold", andOverOrRight === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{andOverOrRight}</div></div>
                </div>
                <p className="text-center text-sm mt-2">✓ {andOverOrLeft} = {andOverOrRight}</p>
              </div>
            </div>
          </div>
        </div>

        {/* OR over AND: A + (B·C) = (A+B)·(A+C) */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔀</span> OR over AND: A + (B·C) = (A+B)·(A+C)
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This law is <strong className="text-amber-600">unique to Boolean Algebra</strong>! It shows that OR distributes over AND, allowing us to "expand" OR terms over AND products, or "factor" AND products from OR sums.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Proof by Truth Table:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg text-sm">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <th>A</th><th>B</th><th>C</th>
                        <th>B·C</th><th>A+(B·C)</th>
                        <th>A+B</th><th>A+C</th>
                        <th>(A+B)·(A+C)</th><th>Equal?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [0,0,0,0,0,0,0,0], [0,0,1,0,0,0,1,0],
                        [0,1,0,0,0,1,0,0], [0,1,1,1,1,1,1,1],
                        [1,0,0,0,1,1,1,1], [1,0,1,0,1,1,1,1],
                        [1,1,0,0,1,1,1,1], [1,1,1,1,1,1,1,1]
                      ].map((row, idx) => (
                        <tr key={idx} className="border-t border-gray-200">
                          {row.slice(0,8).map((val, i) => (
                            <td key={i} className="px-2 py-1 text-center font-mono text-sm">{val}</td>
                          ))}
                          <td className="px-2 py-1 text-center text-green-600">✓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">🎯 Real-world analogy:</span> "You can enter IF (you have a VIP pass) OR (you have a ticket AND you're on the list)" equals "You can enter IF (you have a VIP pass OR you have a ticket) AND (you have a VIP pass OR you're on the list)."
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🎮 Interactive Demo</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div><p className="text-xs">A+(B·C)</p><div className={clsx("p-3 rounded-lg font-bold", orOverAndLeft === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{orOverAndLeft}</div></div>
                  <div><p className="text-xs">(A+B)·(A+C)</p><div className={clsx("p-3 rounded-lg font-bold", orOverAndRight === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{orOverAndRight}</div></div>
                </div>
                <p className="text-center text-sm mt-2">✓ {orOverAndLeft} = {orOverAndRight}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎨</span> Visual Representation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-semibold">AND over OR</h3>
              <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
                <rect x="20" y="10" width="50" height="30" fill="#e2e8f0" stroke="#1e293b" />
                <text x="35" y="30" fontSize="10">AND</text>
                <path d="M 20 50 L 70 50 L 70 80 L 90 80" fill="none" stroke="#1e293b" />
                <text x="40" y="70" fontSize="8">A</text>
                <path d="M 20 70 L 70 70" fill="none" stroke="#1e293b" />
                <text x="5" y="73" fontSize="8">B+C</text>
                <text x="100" y="85" fontSize="10">=</text>
                <rect x="120" y="10" width="50" height="30" fill="#e2e8f0" stroke="#1e293b" />
                <text x="135" y="30" fontSize="10">OR</text>
                <rect x="120" y="50" width="50" height="30" fill="#e2e8f0" stroke="#1e293b" />
                <text x="135" y="70" fontSize="10">AND</text>
                <text x="175" y="30" fontSize="8">A·B</text>
                <text x="175" y="70" fontSize="8">A·C</text>
              </svg>
            </div>
            <div className="text-center">
              <h3 className="font-semibold">OR over AND</h3>
              <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
                <path d="M 20 10 L 20 40 L 60 40 Q 75 30 60 20 L 20 20 Z" fill="#e2e8f0" stroke="#1e293b" />
                <text x="35" y="28" fontSize="10">OR</text>
                <path d="M 20 50 L 70 50 L 70 80 L 90 80" fill="none" stroke="#1e293b" />
                <text x="40" y="70" fontSize="8">A</text>
                <path d="M 20 70 L 70 70" fill="none" stroke="#1e293b" />
                <text x="5" y="73" fontSize="8">B·C</text>
                <text x="100" y="85" fontSize="10">=</text>
                <path d="M 120 10 L 120 40 L 160 40 Q 175 30 160 20 L 120 20 Z" fill="#e2e8f0" stroke="#1e293b" />
                <text x="135" y="28" fontSize="10">AND</text>
                <path d="M 120 50 L 120 80 L 160 80 Q 175 70 160 60 L 120 60 Z" fill="#e2e8f0" stroke="#1e293b" />
                <text x="135" y="68" fontSize="10">AND</text>
                <text x="180" y="28" fontSize="8">A+B</text>
                <text x="180" y="68" fontSize="8">A+C</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Application Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📝 Application Examples</h2>
          <div className="space-y-4">
            <div className="bg-amber-50 p-3 rounded"><p className="font-mono">F = A·B + A·C</p><p>Factor: = <strong>A·(B+C)</strong></p><p className="text-xs text-gray-500">Saves one AND gate!</p></div>
            <div className="bg-amber-50 p-3 rounded"><p className="font-mono">F = (A+B)·(A+C)</p><p>Expand: = <strong>A + B·C</strong></p><p className="text-xs text-gray-500">Simplifies to OR with AND!</p></div>
            <div className="bg-amber-50 p-3 rounded"><p className="font-mono">F = A·B·C + A·B·D + A·C·D</p><p>Factor: = <strong>A·(B·C + B·D + C·D)</strong></p><p className="text-xs text-gray-500">Common factor A reduces complexity</p></div>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">💎 Tips & Tricks</h2>
          <ul className="space-y-2">
            <li>✓ <strong>Factor First:</strong> Look for common terms across AND products or OR sums before expanding.</li>
            <li>✓ <strong>Use OR Distribution Uniquely:</strong> A+(B·C) = (A+B)·(A+C) is powerful—use it to convert SOP to POS!</li>
            <li>✓ <strong>Reverse Thinking:</strong> Sometimes expanding (using distribution) reveals new simplification opportunities.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2">
            <li><strong>Mixing Laws:</strong> (A+B)·C ≠ A+(B·C). Distribution direction matters!</li>
            <li><strong>Forgetting Second Law:</strong> Unlike regular math, Boolean has two distribution laws.</li>
            <li><strong>Incorrect Factoring:</strong> A·B + C cannot factor A unless C also contains A.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 rounded-2xl p-6 border-l-8 border-amber-500">
          <h2 className="text-2xl font-bold mb-4">📋 Mini Checklist</h2>
          <ul className="list-disc pl-6">
            <li>State both Distributive Laws</li>
            <li>Factor and expand expressions correctly</li>
            <li>Explain why the second law is unique to Boolean Algebra</li>
            <li>Apply distribution in simplification problems</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 rounded-2xl p-6 border border-yellow-300">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">💭 Think About...</h2>
          <p>Abhronila has: <span className="font-mono">F = (A·B) + (A·C) + (B·C)</span>. Can this be factored? Try using distribution and complement laws!</p>
        </div>

        {/* Teacher's Note */}
        <Teacher note="🎓 **Teaching This Topic**\n\nThe second distributive law is the star here—it's unique to Boolean Algebra. Use truth tables to prove both laws. Emphasize that factoring saves gates in circuits!\n\n💡 **Teaching Strategy:** Show both expansion and factoring. Let students discover that A+(B·C) = (A+B)·(A+C) by testing values." />

        {/* Q&A Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">📝 Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div><p className="font-semibold">Q1: What is the first Distributive Law?</p><p>A: A·(B+C) = A·B + A·C (AND over OR)</p></div>
            <div><p className="font-semibold">Q2: What is the second Distributive Law?</p><p>A: A + (B·C) = (A+B)·(A+C) (OR over AND)</p></div>
            <div><p className="font-semibold">Q3: Why is the second law unique?</p><p>A: Regular algebra has only one distributive law. Boolean's second law enables powerful simplifications.</p></div>
            <div><p className="font-semibold">Q4: Simplify: A·B + A·C</p><p>A: = A·(B+C)</p></div>
            <div><p className="font-semibold">Q5: Simplify: (A+B)·(A+C)</p><p>A: = A + B·C</p></div>
            <div><p className="font-semibold">Q6: Expand: A·(B+C+D)</p><p>A: = A·B + A·C + A·D</p></div>
            <div><p className="font-semibold">Q7: Expand: A+(B·C·D)</p><p>A: = (A+B)·(A+C)·(A+D)</p></div>
            <div><p className="font-semibold">Q8: Factor: A·B + A·C + A·D</p><p>A: = A·(B+C+D)</p></div>
            <div><p className="font-semibold">Q9: Factor: (A+B)·(A+C)·(A+D)</p><p>A: = A + B·C·D</p></div>
            <div><p className="font-semibold">Q10: Simplify: (X+Y)·(X+Z)</p><p>A: = X + Y·Z</p></div>
            <div><p className="font-semibold">Q11: Simplify: X·Y + X·Y'</p><p>A: = X·(Y+Y') = X·1 = X</p></div>
            <div><p className="font-semibold">Q12: Simplify: (X+Y)·(X+Y')</p><p>A: = X + Y·Y' = X + 0 = X</p></div>
            <div><p className="font-semibold">Q13: How does distribution help circuit design?</p><p>A: It reduces gate count by factoring common terms.</p></div>
            <div><p className="font-semibold">Q14: Is distribution valid for NAND/NOR?</p><p>A: No, distribution only applies to AND/OR operations.</p></div>
            <div><p className="font-semibold">Q15: Simplify: A·B + A·B'·C</p><p>A: = A·(B + B'·C) = A·(B+C)</p></div>
            <div><p className="font-semibold">Q16: Simplify: (A+B)·(A+B')·(A+C)</p><p>A: = A·(A+C) = A</p></div>
            <div><p className="font-semibold">Q17: Prove A·(B+C) = A·B + A·C with truth table</p><p>A: All 8 combinations yield equal outputs.</p></div>
            <div><p className="font-semibold">Q18: Prove A+(B·C) = (A+B)·(A+C) with truth table</p><p>A: All 8 combinations yield equal outputs.</p></div>
            <div><p className="font-semibold">Q19: Can we distribute NOT over AND/OR?</p><p>A: Not directly—that's De Morgan's theorem.</p></div>
            <div><p className="font-semibold">Q20: Why learn both distributive laws?</p><p>A: They're essential for simplifying between SOP and POS forms.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic11;