import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 18: Canonical Forms: Product of Sums (POS)
 * 
 * Component: Topic18
 * Purpose: Explains the Product of Sums (POS) canonical form:
 *          - Definition and structure of POS
 *          - Maxterms and their representation
 *          - Converting truth tables to POS
 *          - Converting expressions to canonical POS
 *          - Duality with SOP and applications
 * 
 * When & Why: Used as the nineteenth topic in the Boolean Algebra series. POS is the
 *             dual of SOP and is essential for understanding OR-AND circuit
 *             implementations, NAND-NOR conversions, and alternative design
 *             approaches. Many logic families favor POS for certain applications.
 * 
 * Return Type: JSX.Element
 */

const Topic18 = () => {
  // State for interactive examples
  const [numVariables, setNumVariables] = useState(3);
  const [selectedMaxterms, setSelectedMaxterms] = useState([0, 1, 2]);
  const [showTruthTable, setShowTruthTable] = useState(true);
  const [customExpression, setCustomExpression] = useState('');
  const [convertedPOS, setConvertedPOS] = useState('');

  // Generate truth table based on selected maxterms
  const generateTruthTable = () => {
    const rows = [];
    const n = numVariables;
    const variables = ['A', 'B', 'C', 'D'].slice(0, n);
    
    for (let i = 0; i < Math.pow(2, n); i++) {
      const values = [];
      for (let j = n - 1; j >= 0; j--) {
        values.push((i >> j) & 1);
      }
      // Output is 0 for selected maxterms, 1 otherwise
      const output = selectedMaxterms.includes(i) ? 0 : 1;
      rows.push({ inputs: values, output, maxterm: i });
    }
    return { rows, variables };
  };

  const { rows, variables } = generateTruthTable();

  // Generate POS expression from maxterms
  const generatePOS = () => {
    const terms = [];
    const n = numVariables;
    const varNames = ['A', 'B', 'C', 'D'].slice(0, n);
    
    for (let i = 0; i < Math.pow(2, n); i++) {
      if (selectedMaxterms.includes(i)) {
        const term = [];
        for (let j = 0; j < n; j++) {
          const bit = (i >> (n - 1 - j)) & 1;
          // For maxterm, complement the variable if bit is 1
          if (bit === 0) {
            term.push(varNames[j]);
          } else {
            term.push(`${varNames[j]}'`);
          }
        }
        terms.push(term.join('+'));
      }
    }
    return terms.join(') · (');
  };

  const posExpression = generatePOS();
  const formattedPOS = posExpression ? `(${posExpression})` : "1 (No maxterms selected)";

  // Convert custom expression to POS (simplified demo)
  const convertToPOS = () => {
    const expr = customExpression.toUpperCase().replace(/\s/g, '');
    const conversions = {
      'A·B': '(A+B)·(A+B\')·(A\'+B) (for 2 variables)',
      'A+B': 'A+B (already in POS)',
      '(A·B)\'': 'A\'+B\'',
      'A·B·C': '(A+B+C)·(A+B+C\')·(A+B\'+C)·(A+B\'+C\')·(A\'+B+C)·(A\'+B+C\')·(A\'+B\'+C)',
      '(A+B)·(A+C)': '(A+B)·(A+C) (already in POS)',
      'A·B + A\'·C': '(A+B+C)·(A+B+C\')(A+B\'+C)·(A\'+B+C)·(A\'+B\'+C)'
    };
    setConvertedPOS(conversions[expr] || "Expression too complex. Try: A·B, A+B, (A·B)', A·B·C");
  };

  // Toggle maxterm selection
  const toggleMaxterm = (maxterm) => {
    if (selectedMaxterms.includes(maxterm)) {
      setSelectedMaxterms(selectedMaxterms.filter(m => m !== maxterm));
    } else {
      setSelectedMaxterms([...selectedMaxterms, maxterm].sort((a, b) => a - b));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-purple-100 dark:bg-purple-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Canonical Forms:</span>
          <span className="block text-purple-600 dark:text-purple-400">Product of Sums (POS)</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Representing Boolean functions as OR terms ANDed together
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to POS */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📊</span> What is Product of Sums (POS)?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong className="text-purple-600 dark:text-purple-400">Product of Sums (POS)</strong> is a canonical form where a Boolean function is expressed as the <strong className="text-purple-600">AND (product)</strong> of one or more <strong className="text-purple-600">OR (sum)</strong> terms. Each sum term is called a <strong className="text-purple-600">maxterm</strong>, which includes every variable exactly once (either in true or complemented form).
          </p>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl mb-4">
            <p className="text-center font-mono text-xl font-bold text-purple-700 dark:text-purple-300">F = Π(M₀, M₁, M₂, ...)</p>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">Where M represents maxterms (output = 0)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Example 2-variable</p>
              <p className="font-mono text-sm">F = (A+B)·(A+B')·(A'+B)</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Example 3-variable</p>
              <p className="font-mono text-sm">F = (A+B+C)·(A+B+C')·(A+B'+C)</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Short Notation</p>
              <p className="font-mono text-sm">F = Π(0, 1, 2)</p>
            </div>
          </div>
        </div>

        {/* Maxterms Explained */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔢</span> Understanding Maxterms
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A <strong className="text-purple-600">maxterm</strong> is a sum term that contains each variable exactly once, either in true or complemented form. For n variables, there are 2ⁿ possible maxterms, each corresponding to a unique input combination where the maxterm evaluates to 0.
          </p>
          
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  <th className="px-4 py-2">A</th>
                  <th className="px-4 py-2">B</th>
                  <th className="px-4 py-2">C</th>
                  <th className="px-4 py-2">Maxterm</th>
                  <th className="px-4 py-2">Notation</th>
                 </tr>
              </thead>
              <tbody>
                {[
                  [0,0,0, "A+B+C", "M₀"],
                  [0,0,1, "A+B+C'", "M₁"],
                  [0,1,0, "A+B'+C", "M₂"],
                  [0,1,1, "A+B'+C'", "M₃"],
                  [1,0,0, "A'+B+C", "M₄"],
                  [1,0,1, "A'+B+C'", "M₅"],
                  [1,1,0, "A'+B'+C", "M₆"],
                  [1,1,1, "A'+B'+C'", "M₇"]
                ].map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                    {row.map((val, i) => (
                      <td key={i} className="px-4 py-2 text-center font-mono">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> Each maxterm evaluates to 0 for exactly one input combination. For example, M₃ (A+B'+C') = 0 only when A=0, B=1, C=1.
            </p>
          </div>
        </div>

        {/* Interactive Truth Table to POS Builder */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive POS Builder
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Select number of variables and click on output cells (0s) to build your POS expression.
          </p>
          
          {/* Variable Selector */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setNumVariables(2)}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 2 ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >2 Variables (A,B)</button>
            <button
              onClick={() => setNumVariables(3)}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 3 ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >3 Variables (A,B,C)</button>
          </div>
          
          {/* Truth Table */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  {variables.map(v => (
                    <th key={v} className="px-4 py-2 text-center font-mono font-bold">{v}</th>
                  ))}
                  <th className="px-4 py-2 text-center">Output (F)</th>
                  <th className="px-4 py-2 text-center">Maxterm</th>
                 </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors">
                    {row.inputs.map((val, i) => (
                      <td key={i} className="px-4 py-2 text-center font-mono">{val}</td>
                    ))}
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => toggleMaxterm(row.maxterm)}
                        className={clsx(
                          "w-12 h-12 rounded-lg font-mono text-xl font-bold transition-all duration-300 hover:scale-110",
                          row.output === 0 
                            ? "bg-purple-500 hover:bg-purple-600 text-white shadow-md" 
                            : "bg-green-500 hover:bg-green-600 text-white shadow-md"
                        )}
                      >
                        {row.output}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center font-mono">M{row.maxterm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* POS Expression Display */}
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 dark:text-white mb-2">📝 Canonical POS Expression:</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm break-all">
              {formattedPOS}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Short Notation: <span className="font-mono font-bold">F = Π({selectedMaxterms.join(', ')})</span>
            </p>
          </div>
          
          <button
            onClick={() => setShowTruthTable(!showTruthTable)}
            className="mt-4 w-full py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-900/60"
          >
            {showTruthTable ? "Hide" : "Show"} Explanation
          </button>
          
          {showTruthTable && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold">📖 How POS is constructed:</span><br />
                1. Identify all rows where output F = 0<br />
                2. For each such row, create a maxterm (OR of all variables)<br />
                3. AND all maxterms together<br />
                For example, if output is 0 for M₀ and M₁, then F = M₀ · M₁ = (A+B+C)·(A+B+C')
              </p>
            </div>
          )}
        </div>

        {/* Converting Expressions to POS */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> Converting Expressions to Canonical POS
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To convert any Boolean expression to canonical POS form, expand each term to include all variables using the identity: X = X + (Y·Y') = (X+Y)·(X+Y').
          </p>
          
          <div className="space-y-4 mb-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Convert F = A·B to canonical POS (3 variables)</p>
              <div className="font-mono text-sm space-y-1">
                <p>Step 1: A·B is missing variable C</p>
                <p>Step 2: Add missing variable using (C·C')</p>
                <p>A·B = A·B·(C+C') = (A·B·C) + (A·B·C')</p>
                <p>Step 3: Convert to POS using duality or truth table</p>
                <p className="text-purple-600">Result: F = (A+B+C)·(A+B+C')·(A+B'+C)·(A+B'+C')·(A'+B+C)·(A'+B+C')? Wait, let's use maxterms.</p>
                <p>Actually, F = A·B means F=1 for A=1,B=1 (C=0,1). So F=0 for all other 6 combos.</p>
                <p>Thus F = Π(0,1,2,3,4,5) = (A+B+C)·(A+B+C')·(A+B'+C)·(A+B'+C')·(A'+B+C)·(A'+B+C')</p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Convert F = A + B to canonical POS (3 variables)</p>
              <div className="font-mono text-sm space-y-1">
                <p>Step 1: F = A+B means F=0 only when A=0 AND B=0 (C can be 0 or 1)</p>
                <p>Step 2: So F=0 for A=0,B=0,C=0 and A=0,B=0,C=1 → M₀ and M₁</p>
                <p className="text-purple-600">Result: F = M₀ · M₁ = (A+B+C)·(A+B+C')</p>
              </div>
            </div>
          </div>
          
          {/* Interactive Conversion Practice */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Try converting your own expression (demo):
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={customExpression}
                onChange={(e) => setCustomExpression(e.target.value)}
                placeholder="e.g., A·B, A+B, (A·B)'"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={convertToPOS}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Convert
              </button>
            </div>
            {convertedPOS && (
              <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-mono text-sm break-all">{convertedPOS}</p>
              </div>
            )}
          </div>
        </div>

        {/* Circuit Implementation: OR-AND Logic */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔌</span> Circuit Implementation: OR-AND Logic
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            POS expressions map directly to <strong className="text-purple-600">OR-AND</strong> circuits: each sum term becomes an OR gate, and all OR gate outputs feed into an AND gate.
          </p>
          
          <div className="flex justify-center mb-4">
            <svg width="400" height="200" viewBox="0 0 400 200" className="transition-all duration-300 hover:scale-105">
              {/* OR Gates */}
              <path d="M 50 30 L 50 70 L 90 70 Q 110 55 90 40 L 50 40 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
              <text x="68" y="52" fontSize="10">OR</text>
              <path d="M 50 100 L 50 140 L 90 140 Q 110 125 90 110 L 50 110 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
              <text x="68" y="122" fontSize="10">OR</text>
              <path d="M 50 170 L 50 210 L 90 210 Q 110 195 90 180 L 50 180 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
              <text x="68" y="192" fontSize="10">OR</text>
              
              {/* Input lines */}
              <line x1="20" y1="55" x2="50" y2="55" stroke="#1e293b" />
              <line x1="20" y1="125" x2="50" y2="125" stroke="#1e293b" />
              <line x1="20" y1="195" x2="50" y2="195" stroke="#1e293b" />
              
              {/* AND Gate */}
              <rect x="180" y="115" width="60" height="50" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
              <text x="200" y="145" fontSize="10">AND</text>
              
              {/* Connections */}
              <line x1="110" y1="55" x2="180" y2="130" stroke="#1e293b" />
              <line x1="110" y1="125" x2="180" y2="130" stroke="#1e293b" />
              <line x1="110" y1="195" x2="180" y2="150" stroke="#1e293b" />
              
              {/* Output */}
              <line x1="240" y1="140" x2="280" y2="140" stroke="#1e293b" />
              <text x="285" y="143" fontSize="10">F</text>
              
              {/* Labels */}
              <text x="10" y="58" fontSize="8">A+B</text>
              <text x="10" y="128" fontSize="8">A+C</text>
              <text x="10" y="198" fontSize="8">B+C</text>
            </svg>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">✅ Advantage:</span> Direct implementation from truth table's zeros.<br />
              <span className="font-bold">🔄 Duality:</span> POS is the dual of SOP (swap AND/OR, 0/1).
            </p>
          </div>
        </div>

        {/* SOP vs POS Comparison */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">⚖️</span> SOP vs POS Comparison
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-green-700 dark:text-green-400 text-center mb-3">Sum of Products (SOP)</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Uses <strong className="text-green-600">minterms</strong> (AND terms)</li>
                <li>• Focuses on <strong className="text-green-600">output = 1</strong></li>
                <li>• Notation: <strong className="font-mono">F = Σ(m₁, m₂, ...)</strong></li>
                <li>• Implements: <strong className="text-green-600">AND-OR</strong> circuit</li>
                <li>• Dual of POS</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-purple-700 dark:text-purple-400 text-center mb-3">Product of Sums (POS)</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Uses <strong className="text-purple-600">maxterms</strong> (OR terms)</li>
                <li>• Focuses on <strong className="text-purple-600">output = 0</strong></li>
                <li>• Notation: <strong className="font-mono">F = Π(M₀, M₁, ...)</strong></li>
                <li>• Implements: <strong className="text-purple-600">OR-AND</strong> circuit</li>
                <li>• Dual of SOP</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">💡 Choosing Between SOP and POS:</span> Select the form with fewer terms or simpler implementation. Sometimes POS yields a simpler circuit than SOP!
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Use the Simpler Form:</strong> Compare number of terms in SOP vs POS. Choose the one with fewer gates.</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Maxterm from Complement:</strong> A maxterm is the complement of the corresponding minterm: Mᵢ = (mᵢ)'</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Quick POS from Truth Table:</strong> Identify rows with output 0, write OR terms (variable=0→true, variable=1→complement).</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">✓</span> <strong>Duality Shortcut:</strong> If you have SOP, you can get POS by taking dual and complementing variables.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Confusing Minterms and Maxterms:</strong> In maxterms, variables are complemented when bit=1, not when bit=0 (opposite of minterms).</li>
            <li><strong>Using SOP Notation for POS:</strong> POS uses Π (product) notation, not Σ (sum). Don't mix them!</li>
            <li><strong>Forgetting Parentheses:</strong> POS requires parentheses around sum terms: (A+B)·(A+C), not A+B·A+C.</li>
            <li><strong>Incorrect Dual Conversion:</strong> The dual of SOP is POS, but variables also get complemented if you're converting directly.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Choose Based on Fewer Terms:</strong> Implement the form (SOP or POS) with fewer terms to minimize gates.</li>
            <li><strong>Use Consistent Variable Order:</strong> Always list variables in the same order (A,B,C) for all maxterms.</li>
            <li><strong>Verify with Truth Table:</strong> After constructing POS, verify that output is 0 for selected maxterms and 1 otherwise.</li>
            <li><strong>Document Your Choice:</strong> When designing, document why you chose POS over SOP (e.g., fewer gates).</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Define Product of Sums (POS) and maxterms.</li>
            <li>Construct POS expressions from truth tables (using 0s).</li>
            <li>Write canonical POS using Π notation.</li>
            <li>Convert any expression to canonical POS form.</li>
            <li>Draw OR-AND circuits from POS expressions.</li>
            <li>Compare SOP vs POS and choose the better implementation.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Susmita from Ichapur has a truth table with outputs 0 for maxterms 0, 3, 5, and 6 (3 variables A,B,C).
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">What is the POS expression?</strong>
            <br />
            Write it out: M₀ = A+B+C, M₃ = A+B'+C', M₅ = A'+B+C', M₆ = A'+B'+C
            <br />
            So F = (A+B+C)·(A+B'+C')·(A'+B+C')·(A'+B'+C)
            <br />
            Can you see a pattern? This is actually the XOR function (odd number of 1s)!
            <br /><br />
            <strong>Observe carefully:</strong> Sometimes POS reveals patterns that are not obvious in SOP!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "POS is the dual of SOP and is equally important. Students often find it less intuitive initially.\n\n" +
            "💡 **Teaching Strategy:** Start with the duality principle. Show that POS is just SOP on the complement function.\n\n" +
            "🔍 **Common Misunderstanding:** Students invert the variable mapping for maxterms. Drill: bit=1 → complemented variable in maxterm (opposite of minterm).\n\n" +
            "📌 **Real-World Connection:** Some logic families (like ECL) favor OR-AND implementations, making POS more natural.\n\n" +
            "🎯 **Advanced Insight:** The choice between SOP and POS can significantly affect gate count, propagation delay, and power consumption."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What is Product of Sums (POS) form?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: POS is a canonical form where a Boolean function is expressed as AND of OR terms, each containing every variable exactly once.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: What is a maxterm?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A maxterm is a sum term that includes each variable exactly once (either true or complemented).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: How many maxterms are there for n variables?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: There are 2ⁿ maxterms for n variables, one for each input combination.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: Write POS for F = A·B using maxterms (3 variables).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = Π(0,1,2,3,4,5) = (A+B+C)·(A+B+C')·(A+B'+C)·(A+B'+C')·(A'+B+C)·(A'+B+C')</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: What does Π(M₀, M₂, M₄) mean?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It means the POS expression includes maxterms 0, 2, and 4. F = M₀·M₂·M₄.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: How do you convert a truth table to POS?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For each row where output=0, create a maxterm (OR of inputs), then AND all maxterms together.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: Write POS for F = A XOR B (2 variables).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = (A+B)·(A'+B') = Π(0,3)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: What is the difference between canonical POS and simplified POS?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Canonical POS includes all variables in every term; simplified POS has fewer literals per term.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: How do you expand a term to canonical POS?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Multiply the term by (X + X') for each missing variable X, using the identity X = (X+Y)·(X+Y').</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: What circuit does POS directly implement?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: OR-AND circuit: OR gates for each sum term, AND gate to combine them.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: Write POS for majority function of 3 variables.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = (A+B)·(A+C)·(B+C) = Π(0,1,2,4)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: What is the maxterm for A=1, B=0, C=1?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: M₅ = A'+B+C'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: How do you write Π notation for F = (A+B+C)·(A+B+C')?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = Π(0,1)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: What's the relationship between minterms and maxterms?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Mᵢ = (mᵢ)'. Each maxterm is the complement of the corresponding minterm.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Convert F = A to canonical POS for 3 variables.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = (A+B+C)·(A+B+C')·(A+B'+C)·(A+B'+C') = Π(0,1,2,3)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: What does a maxterm evaluate to?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A maxterm evaluates to 0 for exactly one input combination (the one it represents).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: How many maxterms are in a 4-variable POS?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Up to 16 maxterms (M₀ to M₁₅).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: Write POS for F = (A·B)' using 2 variables.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A·B)' = A'+B' = M₃ = Π(3) (only one maxterm)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Why is POS called "canonical"?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because it's a standardized form where each term includes all variables, making it unique for each function.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: When should I use POS instead of SOP?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: When the POS expression has fewer terms or when the target technology (like certain logic families) favors OR-AND implementation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic18;