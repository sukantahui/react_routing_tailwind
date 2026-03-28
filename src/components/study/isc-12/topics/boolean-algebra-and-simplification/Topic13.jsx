import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 13: Duality Principle in Boolean Algebra
 * 
 * Component: Topic13
 * Purpose: Explains the Duality Principle of Boolean Algebra:
 *          - Every Boolean expression has a dual obtained by swapping:
 *            · (AND) with + (OR)
 *            0 with 1
 *          - If an expression is valid, its dual is also valid
 *          - This powerful principle doubles the theorems we get for free!
 * 
 * When & Why: Used as the fourteenth topic in the Boolean Algebra series. The Duality
 *             Principle is a meta-theorem that states every Boolean identity has a
 *             dual identity. This allows us to derive twice as many theorems without
 *             additional proofs, making it a powerful tool for understanding the
 *             symmetry of Boolean Algebra.
 * 
 * Return Type: JSX.Element
 */

const Topic13 = () => {
  // State for interactive demonstration
  const [expression, setExpression] = useState('A·B + A·C');
  const [showDual, setShowDual] = useState(true);

  // Helper function to compute dual of an expression
  const getDual = (expr) => {
    // First, handle the mapping for known expressions (for exact matches)
    const exactMatchMap = {
      'A·B + A·C': '(A+B)·(A+C)',
      'A·B + A·C + A·D': '(A+B)·(A+C)·(A+D)',
      '(A+B)·(A+C)': 'A·B + A·C',
      'A + B·C': '(A+B)·(A+C)',
      'A·1': 'A+0',
      'A+0': 'A·1',
      'A·0': 'A+1',
      'A+1': 'A·0',
      'A·A': 'A+A',
      'A+A': 'A·A'
    };
    
    if (exactMatchMap[expr]) {
      return exactMatchMap[expr];
    }
    
    // For custom expressions, perform character-based transformation
    // This is a simplified transformation for demonstration
    let result = expr;
    // Replace operators (order matters to avoid double replacement)
    result = result.replace(/·/g, '___AND___');
    result = result.replace(/\+/g, '·');
    result = result.replace(/___AND___/g, '+');
    // Replace constants
    result = result.replace(/0/g, '___ZERO___');
    result = result.replace(/1/g, '0');
    result = result.replace(/___ZERO___/g, '1');
    return result;
  };

  const dual = getDual(expression);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Duality</span>
          <span className="block text-indigo-600 dark:text-indigo-400">Principle</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Swap AND ↔ OR, 0 ↔ 1 — Get a new theorem for free!
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Duality Principle */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> What is the Duality Principle?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The <strong className="text-indigo-600 dark:text-indigo-400">Duality Principle</strong> is a meta-theorem that states: <strong className="text-indigo-600">Every algebraic identity in Boolean Algebra remains valid if we interchange AND (·) with OR (+) and constants 0 with 1</strong>.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">🔁 The Dual Transformation Rules:</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="font-mono text-lg">· (AND) → + (OR)</p>
                <p className="font-mono text-lg">+ (OR) → · (AND)</p>
              </div>
              <div>
                <p className="font-mono text-lg">0 → 1</p>
                <p className="font-mono text-lg">1 → 0</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> The Duality Principle means Boolean Algebra is <strong className="text-indigo-600">symmetric</strong>. For every theorem we prove, we automatically get a dual theorem without additional proof. This doubles our knowledge!
            </p>
          </div>
        </div>

        {/* Dual Pairs of Laws */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">⚖️</span> Dual Pairs of Laws
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Notice how every Boolean law we've learned comes in dual pairs:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  <th className="px-4 py-2 text-left">Law</th>
                  <th className="px-4 py-2 text-left">Original Form</th>
                  <th className="px-4 py-2 text-left">Dual Form</th>
                 </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">Identity</td>
                  <td className="px-4 py-2 font-mono">A · 1 = A</td>
                  <td className="px-4 py-2 font-mono">A + 0 = A</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">Null (Domination)</td>
                  <td className="px-4 py-2 font-mono">A · 0 = 0</td>
                  <td className="px-4 py-2 font-mono">A + 1 = 1</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">Idempotent</td>
                  <td className="px-4 py-2 font-mono">A · A = A</td>
                  <td className="px-4 py-2 font-mono">A + A = A</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">Complement</td>
                  <td className="px-4 py-2 font-mono">A · A' = 0</td>
                  <td className="px-4 py-2 font-mono">A + A' = 1</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">Commutative</td>
                  <td className="px-4 py-2 font-mono">A · B = B · A</td>
                  <td className="px-4 py-2 font-mono">A + B = B + A</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">Associative</td>
                  <td className="px-4 py-2 font-mono">(A·B)·C = A·(B·C)</td>
                  <td className="px-4 py-2 font-mono">(A+B)+C = A+(B+C)</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">Distributive</td>
                  <td className="px-4 py-2 font-mono">A·(B+C) = A·B + A·C</td>
                  <td className="px-4 py-2 font-mono">A + (B·C) = (A+B)·(A+C)</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">De Morgan's</td>
                  <td className="px-4 py-2 font-mono">(A·B)' = A' + B'</td>
                  <td className="px-4 py-2 font-mono">(A+B)' = A' · B'</td>
                 </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">✨ Observation:</span> Every law's dual is another valid law we've already studied. The Duality Principle explains this symmetry!
            </p>
          </div>
        </div>

        {/* How to Find the Dual */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔍</span> How to Find the Dual of an Expression
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Step-by-Step Process:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Replace all AND (·) with OR (+)</li>
                <li>Replace all OR (+) with AND (·)</li>
                <li>Replace all 0 with 1</li>
                <li>Replace all 1 with 0</li>
                <li><strong className="text-indigo-600">Do NOT change variables</strong> (A, B, C, etc.)</li>
                <li><strong className="text-indigo-600">Do NOT change complements</strong> (A' stays A')</li>
              </ol>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Examples:</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-mono">Original: A·B + A·C</p>
                  <p className="font-mono text-indigo-600">Dual: (A+B)·(A+C)</p>
                </div>
                <div>
                  <p className="font-mono">Original: A + B·C</p>
                  <p className="font-mono text-indigo-600">Dual: (A+B)·(A+C)</p>
                </div>
                <div>
                  <p className="font-mono">Original: A·1</p>
                  <p className="font-mono text-indigo-600">Dual: A+0</p>
                </div>
                <div>
                  <p className="font-mono">Original: (A·B)'</p>
                  <p className="font-mono text-indigo-600">Dual: (A+B)' (complements unchanged!)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Dual Explorer */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive Dual Explorer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Select a Boolean expression and see its dual. Observe how the operations swap!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {['A·B + A·C', 'A + B·C', '(A+B)·(A+C)', 'A·1', 'A+0', 'A·0', 'A+1', 'A·A', 'A+A'].map((expr) => (
              <button
                key={expr}
                onClick={() => setExpression(expr)}
                className={clsx(
                  "px-3 py-2 rounded-lg font-mono text-sm transition-all duration-300 hover:scale-105",
                  expression === expr
                    ? "bg-indigo-500 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {expr}
              </button>
            ))}
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700/50 p-5 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Original Expression</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-lg">
                  {expression}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Dual Expression</p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg font-mono text-lg text-indigo-700 dark:text-indigo-300">
                  {dual}
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              💡 The dual is obtained by swapping AND ↔ OR, 0 ↔ 1
            </p>
          </div>
          
          <button
            onClick={() => setShowDual(!showDual)}
            className="mt-4 w-full py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/60"
          >
            {showDual ? "Hide" : "Show"} Explanation
          </button>
          
          {showDual && (
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold">📝 Transformation Steps:</span><br />
                Original: <span className="font-mono">{expression}</span><br />
                1. Replace · with + and + with · <br />
                2. Replace 0 with 1 and 1 with 0<br />
                3. Variables and complements remain unchanged<br />
                Result: <span className="font-mono font-bold text-indigo-600">{dual}</span>
              </p>
            </div>
          )}
        </div>

        {/* Duality in Circuit Design */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔌</span> Duality in Circuit Design
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Duality Principle has practical applications in digital circuit design:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">AND-OR vs OR-AND</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">A circuit implemented in AND-OR form (SOP) can be converted to its dual OR-AND form (POS) using duality.</p>
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded font-mono text-xs">
                SOP: F = A·B + A·C<br />
                Dual POS: F = (A+B)·(A+C)
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">NAND vs NOR Universality</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">The duality between NAND and NOR gates follows from the Duality Principle.</p>
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded font-mono text-xs">
                NAND = (AND)'<br />
                NOR = (OR)'
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Design Insight:</span> If you have a working circuit, you can often create a new circuit with complementary behavior by taking its dual and swapping 0/1 connections.
            </p>
          </div>
        </div>

        {/* Duality in Logic and Philosophy */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📚</span> Duality in Logic and Philosophy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Duality Principle reflects a deeper philosophical concept: the symmetry between truth and falsehood, and between conjunction (AND) and disjunction (OR).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">Law of Excluded Middle</h3>
              <p className="text-sm text-center italic">A proposition is either true or false</p>
              <p className="font-mono text-center mt-2">A + A' = 1</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">Law of Non-Contradiction</h3>
              <p className="text-sm text-center italic">A proposition cannot be both true and false</p>
              <p className="font-mono text-center mt-2">A · A' = 0</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">✨ Philosophical Note:</span> These two fundamental laws are duals of each other—showing the inherent symmetry in logical thought.
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Get Theorems for Free:</strong> Once you prove one identity, you automatically have its dual. This doubles your theorem collection without extra work!</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Check Your Work:</strong> If you've derived a new expression, check its dual—it might reveal a simpler form or help verify correctness.</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>SOP ↔ POS Conversion:</strong> Duality provides a direct method to convert between Sum of Products and Product of Sums forms.</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Memory Aid:</strong> "Dual flips the operators and swaps the constants, but leaves the variables untouched."</li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Test Generation:</strong> When testing circuits, test vectors for a circuit can be derived from the dual of test vectors for its complement.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Changing Variables:</strong> Variables (A, B, C) remain the same in the dual. Only operators and constants change!</li>
            <li><strong>Changing Complements:</strong> A' stays A' in the dual. Do NOT complement the complement!</li>
            <li><strong>Forgetting to Swap Both Operators and Constants:</strong> Both transformations must be applied simultaneously.</li>
            <li><strong>Applying Duality to Equations vs Expressions:</strong> Duality applies to identities (equations), not just expressions. For F = G, the dual is F_dual = G_dual.</li>
            <li><strong>Confusing Dual with Complement:</strong> The dual is NOT the same as the complement. Complement uses De Morgan's; dual swaps operations without changing variables' complemented state.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Systematic Transformation:</strong> Apply the dual rules in order: swap operators first, then swap constants.</li>
            <li><strong>Verify with Known Laws:</strong> After finding a dual, check if it matches known Boolean laws to confirm correctness.</li>
            <li><strong>Use Duality to Derive New Theorems:</strong> Instead of proving a theorem from scratch, see if it's the dual of something you already know.</li>
            <li><strong>Document Dual Relationships:</strong> When creating a circuit, note its dual—it might reveal alternative implementations.</li>
            <li><strong>Practice on Simple Expressions:</strong> Master duality on small expressions before tackling complex ones.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-indigo-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>State the Duality Principle in your own words.</li>
            <li>Find the dual of any Boolean expression.</li>
            <li>Identify dual pairs among Boolean laws.</li>
            <li>Explain why the Duality Principle is important.</li>
            <li>Distinguish between dual and complement.</li>
            <li>Apply duality to convert between SOP and POS forms.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Tuhina from Shyamnagar has designed a circuit for a vending machine using AND-OR logic:
            <br /><br />
            <span className="font-mono">Dispense = (Money · Selection) + (Overridden · Admin)</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">What would the dual circuit look like?</strong>
            <br />
            If she wanted to implement the same function using OR-AND logic (Product of Sums), what expression would she use?
            <br /><br />
            <strong>Observe carefully:</strong> How does duality help engineers choose between different circuit implementations based on available gates?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "The Duality Principle is a meta-theorem that shows the beautiful symmetry of Boolean Algebra. It's often overlooked but incredibly powerful.\n\n" +
            "💡 **Teaching Strategy:** Start by showing the dual pairs of laws students already know (Identity, Null, etc.). Then reveal that these pairs exist because of duality.\n\n" +
            "🔍 **Common Misunderstanding:** Students often confuse dual with complement. Emphasize: Complement applies NOT to everything; dual swaps operations and constants but keeps variables and complements unchanged.\n\n" +
            "📌 **Real-World Connection:** In circuit design, knowing duality helps engineers switch between AND-OR and OR-AND implementations to optimize for available gate types.\n\n" +
            "🎯 **Advanced Insight:** Duality reveals the inherent symmetry in logic and is a cornerstone of Boolean Algebra's mathematical elegance."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What is the Duality Principle?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It states that every Boolean identity remains valid if we swap AND with OR and 0 with 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: How do you find the dual of an expression?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Replace all · with +, all + with ·, all 0 with 1, and all 1 with 0. Variables and complements remain unchanged.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: What is the dual of A·B + A·C?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A+B)·(A+C)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: What is the dual of A + B·C?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A+B)·(A+C)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: What is the dual of A·1?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A+0</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: What is the dual of A+0?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A·1</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: What is the dual of (A·B)'?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A+B)' (complements remain unchanged)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: Is the dual the same as the complement?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No! Complement applies De Morgan's (which also changes variables). Dual only swaps operators and constants.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: What is the dual of the Identity Law A·1 = A?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A+0 = A (the OR Identity Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: What is the dual of the Null Law A·0 = 0?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A+1 = 1 (the OR Null Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: What is the dual of the Idempotent Law A·A = A?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A+A = A (the OR Idempotent Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: What is the dual of the Complement Law A·A' = 0?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A+A' = 1 (the OR Complement Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: What is the dual of the Commutative Law A·B = B·A?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A+B = B+A (the OR Commutative Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: What is the dual of the Associative Law (A·B)·C = A·(B·C)?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A+B)+C = A+(B+C) (the OR Associative Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: What is the dual of the Distributive Law A·(B+C) = A·B + A·C?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A + (B·C) = (A+B)·(A+C) (the other Distributive Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: What is the dual of De Morgan's (A·B)' = A' + B'?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A+B)' = A' · B' (the other De Morgan's Theorem)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: Why is the Duality Principle important?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It doubles our knowledge—every theorem gives us another theorem for free. It also reveals the symmetry in Boolean Algebra.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: Can duality be applied to inequalities?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! If F ≤ G, then the dual inequality is F_dual ≥ G_dual (inequality reverses).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: How does duality help in circuit design?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It allows conversion between SOP and POS forms, helping designers choose the best implementation based on available gates.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What is the dual of the expression (A·B + C·D)?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A+B)·(C+D)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic13;