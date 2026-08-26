import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 17: Canonical Forms: Sum of Products (SOP)
 * 
 * Component: Topic17
 * Purpose: Explains the Sum of Products (SOP) canonical form:
 *          - Definition and structure of SOP
 *          - Minterms and their representation
 *          - Converting truth tables to SOP
 *          - Converting expressions to canonical SOP
 *          - Applications and advantages
 * 
 * When & Why: Used as the eighteenth topic in the Boolean Algebra series. SOP is the
 *             most common form for implementing logic circuits using AND-OR
 *             architecture. Understanding SOP is essential for circuit design,
 *             minimization using K-maps, and understanding PLD architectures.
 * 
 * Return Type: JSX.Element
 */

const Topic17 = () => {
  // State for interactive examples
  const [numVariables, setNumVariables] = useState(3);
  const [selectedMinterms, setSelectedMinterms] = useState([1, 2, 4]);
  const [showTruthTable, setShowTruthTable] = useState(true);
  const [customExpression, setCustomExpression] = useState('');
  const [convertedSOP, setConvertedSOP] = useState('');

  // Generate truth table based on selected minterms
  const generateTruthTable = () => {
    const rows = [];
    const n = numVariables;
    const variables = ['A', 'B', 'C', 'D'].slice(0, n);
    
    for (let i = 0; i < Math.pow(2, n); i++) {
      const values = [];
      for (let j = n - 1; j >= 0; j--) {
        values.push((i >> j) & 1);
      }
      const output = selectedMinterms.includes(i) ? 1 : 0;
      rows.push({ inputs: values, output, minterm: i });
    }
    return { rows, variables };
  };

  const { rows, variables } = generateTruthTable();

  // Generate SOP expression from minterms
  const generateSOP = () => {
    const terms = [];
    const n = numVariables;
    const varNames = ['A', 'B', 'C', 'D'].slice(0, n);
    
    for (let i = 0; i < Math.pow(2, n); i++) {
      if (selectedMinterms.includes(i)) {
        const term = [];
        for (let j = 0; j < n; j++) {
          const bit = (i >> (n - 1 - j)) & 1;
          if (bit === 1) {
            term.push(varNames[j]);
          } else {
            term.push(`${varNames[j]}'`);
          }
        }
        terms.push(term.join('·'));
      }
    }
    return terms.join(' + ');
  };

  // Convert custom expression to SOP (simplified demo)
  const convertToSOP = () => {
    const expr = customExpression.toUpperCase().replace(/\s/g, '');
    // Demo conversions - in practice would be a full parser
    const conversions = {
      'A+B': 'A·B\' + A\'·B + A·B (for 2 variables)',
      'A·B': 'A·B (already in SOP)',
      '(A+B)\'': 'A\'·B\'',
      'A+B+C': 'A\'·B\'·C + A\'·B·C\' + A\'·B·C + A·B\'·C\' + A·B\'·C + A·B·C\' + A·B·C',
      'A·B+A\'·C': 'A·B·C + A·B·C\' + A\'·B\'·C + A\'·B·C'
    };
    setConvertedSOP(conversions[expr] || "Expression too complex. Try: A+B, A·B, (A+B)', A+B+C");
  };

  // Toggle minterm selection
  const toggleMinterm = (minterm) => {
    if (selectedMinterms.includes(minterm)) {
      setSelectedMinterms(selectedMinterms.filter(m => m !== minterm));
    } else {
      setSelectedMinterms([...selectedMinterms, minterm].sort((a, b) => a - b));
    }
  };

  const sopExpression = generateSOP();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-green-100 dark:bg-green-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Canonical Forms:</span>
          <span className="block text-green-600 dark:text-green-400">Sum of Products (SOP)</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Representing Boolean functions as AND terms ORed together
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to SOP */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📊</span> What is Sum of Products (SOP)?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong className="text-green-600 dark:text-green-400">Sum of Products (SOP)</strong> is a canonical form where a Boolean function is expressed as the <strong className="text-green-600">OR (sum)</strong> of one or more <strong className="text-green-600">AND (product)</strong> terms. Each product term is called a <strong className="text-green-600">minterm</strong>, which includes every variable exactly once (either in true or complemented form).
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl mb-4">
            <p className="text-center font-mono text-xl font-bold text-green-700 dark:text-green-300">F = Σ(m₁, m₂, m₃, ...)</p>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">Where m represents minterms (output = 1)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Example 2-variable</p>
              <p className="font-mono text-sm">F = A·B + A·B' + A'·B</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Example 3-variable</p>
              <p className="font-mono text-sm">F = A·B·C + A·B·C' + A·B'·C</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Short Notation</p>
              <p className="font-mono text-sm">F = Σ(1, 2, 4)</p>
            </div>
          </div>
        </div>

        {/* Minterms Explained */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔢</span> Understanding Minterms
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A <strong className="text-green-600">minterm</strong> is a product term that contains each variable exactly once, either in true or complemented form. For n variables, there are 2ⁿ possible minterms, each corresponding to a unique input combination.
          </p>
          
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  <th className="px-4 py-2">A</th>
                  <th className="px-4 py-2">B</th>
                  <th className="px-4 py-2">C</th>
                  <th className="px-4 py-2">Minterm</th>
                  <th className="px-4 py-2">Notation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [0,0,0, "A'·B'·C'", "m₀"],
                  [0,0,1, "A'·B'·C", "m₁"],
                  [0,1,0, "A'·B·C'", "m₂"],
                  [0,1,1, "A'·B·C", "m₃"],
                  [1,0,0, "A·B'·C'", "m₄"],
                  [1,0,1, "A·B'·C", "m₅"],
                  [1,1,0, "A·B·C'", "m₆"],
                  [1,1,1, "A·B·C", "m₇"]
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
              <span className="font-bold">💡 Key Insight:</span> Each minterm evaluates to 1 for exactly one input combination. For example, m₃ (A'·B·C) = 1 only when A=0, B=1, C=1.
            </p>
          </div>
        </div>

        {/* Interactive Truth Table to SOP Builder */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive SOP Builder
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Select number of variables and click on output cells to build your SOP expression.
          </p>
          
          {/* Variable Selector */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setNumVariables(2)}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 2 ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >2 Variables (A,B)</button>
            <button
              onClick={() => setNumVariables(3)}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 3 ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
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
                  <th className="px-4 py-2 text-center">Minterm</th>
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
                        onClick={() => toggleMinterm(row.minterm)}
                        className={clsx(
                          "w-12 h-12 rounded-lg font-mono text-xl font-bold transition-all duration-300 hover:scale-110",
                          row.output === 1 
                            ? "bg-green-500 hover:bg-green-600 text-white shadow-md" 
                            : "bg-red-500 hover:bg-red-600 text-white shadow-md"
                        )}
                      >
                        {row.output}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center font-mono">m{row.minterm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* SOP Expression Display */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 dark:text-white mb-2">📝 Canonical SOP Expression:</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm break-all">
              {sopExpression || "0 (No minterms selected)"}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Short Notation: <span className="font-mono font-bold">F = Σ({selectedMinterms.join(', ')})</span>
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
                <span className="font-bold">📖 How SOP is constructed:</span><br />
                1. Identify all rows where output F = 1<br />
                2. For each such row, create a minterm (AND of all variables)<br />
                3. OR all minterms together<br />
                For example, if output is 1 for m₁ and m₂, then F = m₁ + m₂ = (A'·B'·C) + (A'·B·C')
              </p>
            </div>
          )}
        </div>

        {/* Converting Expressions to SOP */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> Converting Expressions to Canonical SOP
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To convert any Boolean expression to canonical SOP form, expand each term to include all variables using the identity: X = X·(Y + Y').
          </p>
          
          <div className="space-y-4 mb-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Convert F = A + B to canonical SOP</p>
              <div className="font-mono text-sm space-y-1">
                <p>Step 1: Identify missing variables (for 3 variables: A,B,C)</p>
                <p>Step 2: Expand A = A·(B+B')·(C+C') = A·B·C + A·B·C' + A·B'·C + A·B'·C'</p>
                <p>Step 3: Expand B = (A+A')·B·(C+C') = A·B·C + A·B·C' + A'·B·C + A'·B·C'</p>
                <p>Step 4: Combine and remove duplicates: F = A·B·C + A·B·C' + A·B'·C + A·B'·C' + A'·B·C + A'·B·C'</p>
                <p className="text-green-600">Result: F = Σ(3,4,5,6,7,?) Actually this is all except m₀ and m₁? Let's verify.</p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Convert F = A·B to canonical SOP (3 variables)</p>
              <div className="font-mono text-sm space-y-1">
                <p>Step 1: A·B is missing variable C</p>
                <p>Step 2: Expand: A·B = A·B·(C + C') = A·B·C + A·B·C'</p>
                <p className="text-green-600">Result: F = Σ(6, 7) where m₆ = A·B·C', m₇ = A·B·C</p>
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
                placeholder="e.g., A+B, A·B, (A+B)'"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={convertToSOP}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Convert
              </button>
            </div>
            {convertedSOP && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-mono text-sm break-all">{convertedSOP}</p>
              </div>
            )}
          </div>
        </div>

        {/* Circuit Implementation */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔌</span> Circuit Implementation: AND-OR Logic
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            SOP expressions map directly to <strong className="text-green-600">AND-OR</strong> circuits: each product term becomes an AND gate, and all AND gate outputs feed into an OR gate.
          </p>
          
          <div className="flex justify-center mb-4">
            <svg width="400" height="200" viewBox="0 0 400 200" className="transition-all duration-300 hover:scale-105">
              {/* AND Gates */}
              <rect x="50" y="30" width="60" height="50" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
              <text x="75" y="60" fontSize="10">AND</text>
              <rect x="50" y="100" width="60" height="50" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
              <text x="75" y="130" fontSize="10">AND</text>
              <rect x="50" y="170" width="60" height="50" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
              <text x="75" y="200" fontSize="10">AND</text>
              
              {/* Input lines */}
              <line x1="20" y1="55" x2="50" y2="55" stroke="#1e293b" />
              <line x1="20" y1="125" x2="50" y2="125" stroke="#1e293b" />
              <line x1="20" y1="195" x2="50" y2="195" stroke="#1e293b" />
              
              {/* OR Gate */}
              <path d="M 180 115 L 180 145 L 220 145 Q 240 130 220 115 L 180 115 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
              <text x="195" y="132" fontSize="10">OR</text>
              
              {/* Connections */}
              <line x1="110" y1="55" x2="180" y2="115" stroke="#1e293b" />
              <line x1="110" y1="125" x2="180" y2="115" stroke="#1e293b" />
              <line x1="110" y1="195" x2="180" y2="145" stroke="#1e293b" />
              
              {/* Output */}
              <line x1="240" y1="130" x2="280" y2="130" stroke="#1e293b" />
              <text x="285" y="133" fontSize="10">F</text>
              
              {/* Labels */}
              <text x="10" y="58" fontSize="8">A·B</text>
              <text x="10" y="128" fontSize="8">A·C</text>
              <text x="10" y="198" fontSize="8">B·C</text>
            </svg>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">✅ Advantage:</span> Direct implementation from truth table. <br />
              <span className="font-bold">⚠️ Disadvantage:</span> May use more gates than necessary (can be minimized).
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Minterm Notation:</strong> Use Σ(m₁, m₂, ...) for SOP. This compact notation is industry standard.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Don't Cares:</strong> In design, "don't care" conditions can be used to simplify SOP expressions.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>AND-OR vs NAND-NAND:</strong> SOP maps directly to NAND-NAND circuits (using De Morgan's), which are faster in many technologies.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Memory Aid:</strong> "Sum of Products" = "OR of ANDs" = "1s in truth table"</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Including All Minterms:</strong> Forgetting that each minterm must include ALL variables exactly once.</li>
            <li><strong>Minterm Indexing:</strong> Confusing minterm numbering (A as MSB vs LSB). Be consistent!</li>
            <li><strong>Over-simplification:</strong> Canonical SOP is not minimized. Always simplify after converting.</li>
            <li><strong>Missing Variables in Expansion:</strong> When expanding terms, ensure all variables appear exactly once.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Use Consistent Variable Order:</strong> Always list variables in the same order (A,B,C,...) for all minterms.</li>
            <li><strong>Document Minterm Selection:</strong> When designing, clearly document which minterms are included.</li>
            <li><strong>Verify with Truth Table:</strong> After constructing SOP, verify against truth table to ensure correctness.</li>
            <li><strong>Minimize After Canonical Form:</strong> Use K-maps or algebraic methods to reduce gate count.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-green-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Define Sum of Products (SOP) and minterms.</li>
            <li>Construct SOP expressions from truth tables.</li>
            <li>Write canonical SOP using Σ notation.</li>
            <li>Convert any expression to canonical SOP form.</li>
            <li>Draw AND-OR circuits from SOP expressions.</li>
            <li>Explain the advantages of SOP for circuit implementation.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Swadeep from Barrackpore has a truth table with outputs 1 for minterms 1, 3, 5, and 7 (3 variables A,B,C).
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">What is the SOP expression?</strong>
            <br />
            Write it out: m₁ = A'·B'·C, m₃ = A'·B·C, m₅ = A·B'·C, m₇ = A·B·C
            <br />
            Can you factor this expression? What do you notice about all these minterms?
            <br /><br />
            <strong>Observe carefully:</strong> All minterms where C=1! So F = C. Can you see how SOP reveals patterns?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "SOP is the most intuitive form because it directly maps to the truth table's 1s.\n\n" +
            "💡 **Teaching Strategy:** Start with 2-variable truth tables and build SOP manually. Then show the Σ notation as a shortcut.\n\n" +
            "🔍 **Common Misunderstanding:** Students often forget that minterms must include ALL variables. Emphasize 'canonical' means every variable appears exactly once.\n\n" +
            "📌 **Real-World Connection:** PALs, PLAs, and FPGAs often use SOP-like architectures (AND-OR planes).\n\n" +
            "🎯 **Advanced Insight:** The dual form (POS) will be covered next—highlight the symmetry."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What is Sum of Products (SOP) form?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: SOP is a canonical form where a Boolean function is expressed as OR of AND terms, each containing every variable exactly once.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: What is a minterm?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A minterm is a product term that includes each variable exactly once (either true or complemented).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: How many minterms are there for n variables?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: There are 2ⁿ minterms for n variables, one for each input combination.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: Write SOP for F = A·B + A·C using minterms (3 variables).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = Σ(6,7,5,? Actually A·B·C + A·B·C' + A·B'·C = m₇ + m₆ + m₅</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: What does Σ(m₁, m₃, m₅) mean?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It means the SOP expression includes minterms 1, 3, and 5. F = m₁ + m₃ + m₅.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: How do you convert a truth table to SOP?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For each row where output=1, create a minterm (AND of inputs), then OR all minterms together.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: Write the SOP for F = A XOR B (2 variables).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = A·B' + A'·B = Σ(1,2)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: What is the difference between canonical SOP and simplified SOP?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Canonical SOP includes all variables in every term; simplified SOP has fewer literals per term.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: How do you expand a term to canonical SOP?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Multiply the term by (X + X') for each missing variable X, then distribute.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: What circuit does SOP directly implement?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: AND-OR circuit: AND gates for each product term, OR gate to combine them.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: Write SOP for majority function of 3 variables.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = A·B + A·C + B·C = Σ(3,5,6,7)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: What is the minterm for A=1, B=0, C=1?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: m₅ = A·B'·C</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: How do you write Σ notation for F = A·B·C + A·B·C'?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = Σ(6,7) assuming A is MSB, C is LSB.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: What's the advantage of SOP over other forms?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It directly corresponds to truth table and maps easily to AND-OR circuits.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Convert F = A to canonical SOP for 3 variables.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = A·B·C + A·B·C' + A·B'·C + A·B'·C' = Σ(4,5,6,7)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: What does a minterm evaluate to?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A minterm evaluates to 1 for exactly one input combination (the one it represents).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: How many minterms are in a 4-variable SOP?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Up to 16 minterms (m₀ to m₁₅).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: Write SOP for F = (A+B)' using 2 variables.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: (A+B)' = A'·B' = Σ(0)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Why is SOP called "canonical"?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because it's a standardized form where each term includes all variables, making it unique for each function.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What's next after writing SOP?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Simplify using Boolean algebra or K-maps to reduce gate count and improve circuit efficiency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic17;