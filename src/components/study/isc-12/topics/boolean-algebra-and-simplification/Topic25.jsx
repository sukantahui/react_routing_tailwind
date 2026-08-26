import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 25: Truth Tables: Deriving expressions from truth tables
 * 
 * Component: Topic25
 * Purpose: Explains how to derive Boolean expressions from truth tables:
 *          - Sum of Products (SOP) from minterms (1s)
 *          - Product of Sums (POS) from maxterms (0s)
 *          - Canonical and simplified forms
 *          - Don't care conditions
 *          - Multiple output functions
 * 
 * When & Why: Used as the twenty-sixth topic in the Boolean Algebra series. Deriving
 *             expressions from truth tables is the reverse process of constructing
 *             truth tables. This skill is essential for converting specifications
 *             (truth tables) into implementable logic circuits. Every digital
 *             designer must master this fundamental skill.
 * 
 * Return Type: JSX.Element
 */

const Topic25 = () => {
  // State for interactive truth table to expression converter
  const [numVariables, setNumVariables] = useState(3);
  const [truthValues, setTruthValues] = useState(
    Array(8).fill(0).reduce((acc, _, i) => ({ ...acc, [i]: 0 }), {})
  );
  const [showMethod, setShowMethod] = useState('sop');
  const [showSteps, setShowSteps] = useState(true);
  const [customRows, setCustomRows] = useState('');

  // Variable names based on number of variables
  const getVarNames = () => {
    if (numVariables === 2) return ['A', 'B'];
    if (numVariables === 3) return ['A', 'B', 'C'];
    return ['A', 'B', 'C', 'D'];
  };

  const varNames = getVarNames();
  const totalRows = Math.pow(2, numVariables);

  // Toggle truth table value
  const toggleValue = (row) => {
    setTruthValues(prev => ({
      ...prev,
      [row]: prev[row] === 0 ? 1 : 0
    }));
  };

  // Set example truth table
  const setExample = (type) => {
    const empty = {};
    for (let i = 0; i < totalRows; i++) empty[i] = 0;
    
    if (type === 'majority' && numVariables === 3) {
      setTruthValues({ ...empty, 3: 1, 5: 1, 6: 1, 7: 1 });
    } else if (type === 'odd' && numVariables === 3) {
      setTruthValues({ ...empty, 1: 1, 2: 1, 4: 1, 7: 1 });
    } else if (type === 'and' && numVariables === 3) {
      setTruthValues({ ...empty, 7: 1 });
    } else if (type === 'or' && numVariables === 3) {
      for (let i = 1; i <= 7; i++) empty[i] = 1;
      setTruthValues(empty);
    } else if (type === 'xor' && numVariables === 2) {
      setTruthValues({ 0: 0, 1: 1, 2: 1, 3: 0 });
    } else if (type === 'nand' && numVariables === 2) {
      setTruthValues({ 0: 1, 1: 1, 2: 1, 3: 0 });
    } else if (type === 'fulladder' && numVariables === 3) {
      setTruthValues({ ...empty, 1: 1, 2: 1, 4: 1, 7: 1 });
    }
  };

  // Clear truth table
  const clearTruthTable = () => {
    const empty = {};
    for (let i = 0; i < totalRows; i++) empty[i] = 0;
    setTruthValues(empty);
  };

  // Get SOP expression from truth table
  const getSOPExpression = () => {
    const terms = [];
    for (let i = 0; i < totalRows; i++) {
      if (truthValues[i] === 1) {
        const binary = i.toString(2).padStart(numVariables, '0');
        const term = binary.split('').map((bit, idx) => {
          return bit === '1' ? varNames[idx] : `${varNames[idx]}'`;
        }).join('·');
        terms.push(term);
      }
    }
    if (terms.length === 0) return '0';
    if (terms.length === totalRows) return '1';
    return terms.join(' + ');
  };

  // Get POS expression from truth table
  const getPOSExpression = () => {
    const terms = [];
    for (let i = 0; i < totalRows; i++) {
      if (truthValues[i] === 0) {
        const binary = i.toString(2).padStart(numVariables, '0');
        const term = binary.split('').map((bit, idx) => {
          // For maxterm, complement variable if bit is 1
          return bit === '0' ? varNames[idx] : `${varNames[idx]}'`;
        }).join(' + ');
        terms.push(`(${term})`);
      }
    }
    if (terms.length === 0) return '1';
    if (terms.length === totalRows) return '0';
    return terms.join(' · ');
  };

  // Get simplified expression (demo - simplified version)
  const getSimplifiedExpression = () => {
    const sop = getSOPExpression();
    // Simple pattern recognition for common functions
    const ones = [];
    for (let i = 0; i < totalRows; i++) {
      if (truthValues[i] === 1) ones.push(i);
    }
    
    if (ones.length === 0) return '0';
    if (ones.length === totalRows) return '1';
    
    // Check for common patterns
    if (numVariables === 3) {
      if (ones.length === 4 && ones.includes(3) && ones.includes(5) && ones.includes(6) && ones.includes(7)) {
        return 'A·B + A·C + B·C';
      }
      if (ones.length === 4 && ones.includes(1) && ones.includes(2) && ones.includes(4) && ones.includes(7)) {
        return 'A⊕B⊕C (XOR)';
      }
      if (ones.length === 1 && ones[0] === 7) {
        return 'A·B·C';
      }
      if (ones.length === 7) {
        return 'A + B + C';
      }
    }
    if (numVariables === 2) {
      if (ones.length === 2 && ones.includes(1) && ones.includes(2)) {
        return 'A⊕B (XOR)';
      }
      if (ones.length === 3 && ones.includes(0) && ones.includes(1) && ones.includes(2)) {
        return 'A + B';
      }
      if (ones.length === 1 && ones[0] === 3) {
        return 'A·B';
      }
    }
    
    return sop;
  };

  // Parse custom truth table from text input
  const parseCustomTruthTable = () => {
    const rows = customRows.split(',').map(v => parseInt(v.trim()));
    const newValues = {};
    for (let i = 0; i < totalRows; i++) newValues[i] = 0;
    rows.forEach(row => {
      if (row >= 0 && row < totalRows) newValues[row] = 1;
    });
    setTruthValues(newValues);
  };

  const sopExpression = getSOPExpression();
  const posExpression = getPOSExpression();
  const simplifiedExpression = getSimplifiedExpression();

  // Generate input combinations display
  const getInputCombination = (row) => {
    const binary = row.toString(2).padStart(numVariables, '0');
    return binary.split('').join('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-orange-100 dark:bg-orange-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Truth Tables:</span>
          <span className="block text-orange-600 dark:text-orange-400">Deriving Expressions</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Convert truth table specifications into Boolean expressions
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Deriving Expressions */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📊</span> From Truth Table to Expression
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Given a truth table specification, we can derive a Boolean expression using two canonical forms:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center transition-all duration-300 hover:bg-green-100">
              <h3 className="font-semibold text-green-700 dark:text-green-400">Sum of Products (SOP)</h3>
              <p className="text-sm">Based on <strong className="text-green-600">minterms</strong> (rows where output = 1)</p>
              <p className="font-mono text-xs mt-2">F = Σ(m₁, m₂, m₃, ...)</p>
              <p className="text-xs text-gray-500 mt-1">"OR of AND terms"</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center transition-all duration-300 hover:bg-purple-100">
              <h3 className="font-semibold text-purple-700 dark:text-purple-400">Product of Sums (POS)</h3>
              <p className="text-sm">Based on <strong className="text-purple-600">maxterms</strong> (rows where output = 0)</p>
              <p className="font-mono text-xs mt-2">F = Π(M₀, M₁, M₂, ...)</p>
              <p className="text-xs text-gray-500 mt-1">"AND of OR terms"</p>
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> The SOP form comes from the 1s in the truth table, while the POS form comes from the 0s. Choose the form with fewer terms for simpler circuits.
            </p>
          </div>
        </div>

        {/* Interactive Truth Table to Expression Converter */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive Expression Deriver
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Click on output cells to define your truth table. The Boolean expression will be derived automatically.
          </p>
          
          {/* Variable Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => {
                setNumVariables(2);
                clearTruthTable();
              }}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 2 ? "bg-orange-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >2 Variables</button>
            <button
              onClick={() => {
                setNumVariables(3);
                clearTruthTable();
              }}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 3 ? "bg-orange-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >3 Variables</button>
            <button
              onClick={() => {
                setNumVariables(4);
                clearTruthTable();
              }}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 4 ? "bg-orange-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >4 Variables</button>
          </div>
          
          {/* Example Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setExample('majority')} className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all text-sm">Majority (3-var)</button>
            <button onClick={() => setExample('odd')} className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all text-sm">Odd Parity</button>
            <button onClick={() => setExample('and')} className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all text-sm">3-AND</button>
            <button onClick={() => setExample('or')} className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all text-sm">3-OR</button>
            {numVariables === 2 && (
              <>
                <button onClick={() => setExample('xor')} className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all text-sm">XOR</button>
                <button onClick={() => setExample('nand')} className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all text-sm">NAND</button>
              </>
            )}
            <button onClick={clearTruthTable} className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all text-sm">Clear</button>
          </div>
          
          {/* Truth Table Display */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  {varNames.map(v => (
                    <th key={v} className="px-4 py-2 text-center font-mono">{v}</th>
                  ))}
                  <th className="px-4 py-2 text-center">Output (F)</th>
                  <th className="px-4 py-2 text-center">Minterm</th>
                  <th className="px-4 py-2 text-center">Maxterm</th>
                 </tr>
              </thead>
              <tbody>
                {[...Array(totalRows).keys()].map((row) => (
                  <tr key={row} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors">
                    {getInputCombination(row).split('').map((bit, i) => (
                      <td key={i} className="px-4 py-2 text-center font-mono">{bit}</td>
                    ))}
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => toggleValue(row)}
                        className={clsx(
                          "w-12 h-12 rounded-lg font-mono text-xl font-bold transition-all duration-300 hover:scale-110",
                          truthValues[row] === 1 
                            ? "bg-green-500 hover:bg-green-600 text-white shadow-md" 
                            : "bg-red-500 hover:bg-red-600 text-white shadow-md"
                        )}
                      >
                        {truthValues[row]}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center font-mono">
                      {truthValues[row] === 1 ? `m${row}` : '-'}
                    </td>
                    <td className="px-4 py-2 text-center font-mono">
                      {truthValues[row] === 0 ? `M${row}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Method Selector */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowMethod('sop')}
              className={clsx("flex-1 py-2 rounded-lg font-medium transition-all", showMethod === 'sop' ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >
              SOP (Sum of Products)
            </button>
            <button
              onClick={() => setShowMethod('pos')}
              className={clsx("flex-1 py-2 rounded-lg font-medium transition-all", showMethod === 'pos' ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >
              POS (Product of Sums)
            </button>
            <button
              onClick={() => setShowMethod('simplified')}
              className={clsx("flex-1 py-2 rounded-lg font-medium transition-all", showMethod === 'simplified' ? "bg-orange-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >
              Simplified
            </button>
          </div>
          
          {/* Expression Display */}
          <div className={clsx(
            "p-5 rounded-lg",
            showMethod === 'sop' ? "bg-green-50 dark:bg-green-900/20" : 
            showMethod === 'pos' ? "bg-purple-50 dark:bg-purple-900/20" : 
            "bg-orange-50 dark:bg-orange-900/20"
          )}>
            <p className="text-sm font-semibold mb-2">
              {showMethod === 'sop' ? '📝 Sum of Products (SOP) Expression:' : 
               showMethod === 'pos' ? '📝 Product of Sums (POS) Expression:' : 
               '📝 Simplified Expression:'}
            </p>
            <p className="font-mono text-lg break-all">
              {showMethod === 'sop' ? sopExpression : 
               showMethod === 'pos' ? posExpression : 
               simplifiedExpression}
            </p>
            {showMethod === 'sop' && sopExpression !== '0' && sopExpression !== '1' && (
              <p className="text-xs text-gray-500 mt-2">
                Short notation: F = Σ({[...Array(totalRows).keys()].filter(i => truthValues[i] === 1).join(', ')})
              </p>
            )}
            {showMethod === 'pos' && posExpression !== '0' && posExpression !== '1' && (
              <p className="text-xs text-gray-500 mt-2">
                Short notation: F = Π({[...Array(totalRows).keys()].filter(i => truthValues[i] === 0).join(', ')})
              </p>
            )}
          </div>
          
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="mt-4 w-full py-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-lg font-medium transition-all duration-300 hover:bg-orange-200 dark:hover:bg-orange-900/60"
          >
            {showSteps ? "Hide" : "Show"} Derivation Steps
          </button>
          
          {showSteps && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Derivation Steps:</h3>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p><span className="font-bold">Step 1:</span> Identify all rows where output = {showMethod === 'sop' ? '1' : showMethod === 'pos' ? '0' : '1 (for SOP)'}</p>
                <p><span className="font-bold">Step 2:</span> For each identified row, create a {showMethod === 'sop' ? 'product term (minterm)' : 'sum term (maxterm)'}</p>
                <p><span className="font-bold">Step 3:</span> {showMethod === 'sop' ? 'OR all minterms together' : 'AND all maxterms together'}</p>
                {showMethod === 'simplified' && (
                  <p><span className="font-bold">Step 4:</span> Apply Boolean algebra or K-map to minimize the expression</p>
                )}
              </div>
              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <p className="text-sm">
                  <span className="font-bold">🎯 For current truth table:</span><br />
                  {(() => {
                    const ones = [...Array(totalRows).keys()].filter(i => truthValues[i] === 1);
                    const zeros = [...Array(totalRows).keys()].filter(i => truthValues[i] === 0);
                    if (ones.length === 0) return "No 1s found → F = 0";
                    if (ones.length === totalRows) return "All outputs are 1 → F = 1";
                    return `Found ${ones.length} minterm(s): m${ones.join(', ')} → ${sopExpression}`;
                  })()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Custom Truth Table Input */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✏️</span> Quick Truth Table Entry
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Enter minterm numbers (comma-separated) to quickly create a truth table.
          </p>
          
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={customRows}
              onChange={(e) => setCustomRows(e.target.value)}
              placeholder={`Enter minterms (0-${totalRows - 1}) e.g., 1,3,5,7`}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={parseCustomTruthTable}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              Generate
            </button>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-bold">💡 Examples:</span> "0,1,2,3" for first 4 minterms, "7" for only m₇, "0,2,4,6" for even minterms
            </p>
          </div>
        </div>

        {/* Worked Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📝</span> Worked Examples
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Example 1: 2-input XOR</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded">
                  <p className="font-mono text-sm">A B | F</p>
                  <p className="font-mono text-sm">0 0 | 0</p>
                  <p className="font-mono text-sm">0 1 | 1</p>
                  <p className="font-mono text-sm">1 0 | 1</p>
                  <p className="font-mono text-sm">1 1 | 0</p>
                </div>
                <div>
                  <p className="font-semibold text-green-600">SOP:</p>
                  <p className="font-mono text-sm">F = A'B + AB'</p>
                  <p className="font-semibold text-purple-600 mt-2">POS:</p>
                  <p className="font-mono text-sm">F = (A+B)·(A'+B')</p>
                  <p className="font-semibold text-orange-600 mt-2">Simplified:</p>
                  <p className="font-mono text-sm">F = A⊕B</p>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Example 2: 3-input Majority</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded">
                  <p className="font-mono text-sm">A B C | F</p>
                  <p className="font-mono text-sm">0 0 0 | 0</p>
                  <p className="font-mono text-sm">0 0 1 | 0</p>
                  <p className="font-mono text-sm">0 1 0 | 0</p>
                  <p className="font-mono text-sm">0 1 1 | 1</p>
                  <p className="font-mono text-sm">1 0 0 | 0</p>
                  <p className="font-mono text-sm">1 0 1 | 1</p>
                  <p className="font-mono text-sm">1 1 0 | 1</p>
                  <p className="font-mono text-sm">1 1 1 | 1</p>
                </div>
                <div>
                  <p className="font-semibold text-green-600">SOP:</p>
                  <p className="font-mono text-sm">F = A'BC + AB'C + ABC' + ABC</p>
                  <p className="font-semibold text-purple-600 mt-2">POS:</p>
                  <p className="font-mono text-sm">F = (A+B+C)·(A+B+C')·(A+B'+C)·(A'+B+C)</p>
                  <p className="font-semibold text-orange-600 mt-2">Simplified:</p>
                  <p className="font-mono text-sm">F = AB + AC + BC</p>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Example 3: 3-input AND</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded">
                  <p className="font-mono text-sm">A B C | F</p>
                  <p className="font-mono text-sm">0 0 0 | 0</p>
                  <p className="font-mono text-sm">0 0 1 | 0</p>
                  <p className="font-mono text-sm">0 1 0 | 0</p>
                  <p className="font-mono text-sm">0 1 1 | 0</p>
                  <p className="font-mono text-sm">1 0 0 | 0</p>
                  <p className="font-mono text-sm">1 0 1 | 0</p>
                  <p className="font-mono text-sm">1 1 0 | 0</p>
                  <p className="font-mono text-sm">1 1 1 | 1</p>
                </div>
                <div>
                  <p className="font-semibold text-green-600">SOP:</p>
                  <p className="font-mono text-sm">F = ABC</p>
                  <p className="font-semibold text-purple-600 mt-2">POS:</p>
                  <p className="font-mono text-sm">F = (A+B+C)·(A+B+C')·(A+B'+C)·(A+B'+C')·(A'+B+C)·(A'+B+C')·(A'+B'+C)</p>
                  <p className="font-semibold text-orange-600 mt-2">Simplified:</p>
                  <p className="font-mono text-sm">F = A·B·C</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Count 1s vs 0s:</strong> Choose SOP if fewer 1s, POS if fewer 0s. This yields a simpler expression.</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Use Don't Cares:</strong> If some inputs never occur, mark them as X to create larger groups.</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Look for Patterns:</strong> Recognize common patterns like majority, parity, and arithmetic functions.</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Verify with K-Map:</strong> After deriving SOP/POS, use a K-Map to find the minimal form.</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">✓</span> <strong>Document Your Work:</strong> When designing, always document the truth table and derived expressions for verification.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Minterm/Maxterm Confusion:</strong> SOP uses minterms (1s), POS uses maxterms (0s). Don't mix them up!</li>
            <li><strong>Incorrect Variable Order:</strong> Always maintain consistent variable order (e.g., A as MSB, D as LSB).</li>
            <li><strong>Missing Rows:</strong> Ensure all 2ⁿ rows are accounted for in the truth table.</li>
            <li><strong>Overlooking Simplification:</strong> Canonical forms are correct but often not minimal. Always simplify!</li>
            <li><strong>Forgetting Parentheses in POS:</strong> POS requires parentheses around each sum term: (A+B)·(A+C), not A+B·A+C.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Use Consistent Notation:</strong> Always list inputs in the same order (A,B,C,...) for all minterms/maxterms.</li>
            <li><strong>Choose the Simpler Form:</strong> Compare number of terms in SOP vs POS. Implement the one with fewer terms.</li>
            <li><strong>Verify with Truth Table:</strong> After deriving an expression, verify it matches the original truth table.</li>
            <li><strong>Document Don't Cares:</strong> If using don't cares, clearly document which inputs are impossible.</li>
            <li><strong>Use Short Notation:</strong> Σ(m₁,m₂) for SOP and Π(M₀,M₁) for POS saves time and space.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-orange-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Identify minterms (1s) and maxterms (0s) from a truth table.</li>
            <li>Derive canonical SOP expression from minterms.</li>
            <li>Derive canonical POS expression from maxterms.</li>
            <li>Use Σ and Π notation correctly.</li>
            <li>Choose between SOP and POS based on number of terms.</li>
            <li>Apply simplification techniques (algebraic or K-map) to get minimal expressions.</li>
            <li>Verify derived expressions against the original truth table.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Tuhina from Shyamnagar has a truth table for a 3-variable function with outputs:
            <br /><br />
            m₀=1, m₁=1, m₂=0, m₃=1, m₄=0, m₅=1, m₆=0, m₇=1
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">What is the SOP expression? What pattern do you notice?</strong>
            <br />
            First, list all minterms (1s): m₀, m₁, m₃, m₅, m₇
            <br />
            Write SOP: F = A'B'C' + A'B'C + A'BC + AB'C + ABC
            <br />
            Notice that every term with C=1 appears? Actually, observe: This is actually F = C + A'B'?
            <br />
            Try grouping: m₀ and m₁ → A'B', m₃ and m₇ → BC, m₅ → AB'C
            <br />
            <strong>Observe carefully:</strong> Sometimes the pattern reveals a simple function like F = A'B' + C!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Deriving expressions from truth tables is a fundamental skill that bridges specification and implementation.\n\n" +
            "💡 **Teaching Strategy:** Start with simple 2-input examples (AND, OR, XOR). Then move to 3-input functions like majority and parity.\n\n" +
            "🔍 **Common Misunderstanding:** Students often forget that POS uses maxterms (0s) and the variable complement rule is opposite of SOP. Drill this repeatedly.\n\n" +
            "📌 **Real-World Connection:** In industry, truth tables are the starting point for logic design. Engineers derive expressions from specifications given as truth tables.\n\n" +
            "🎯 **Advanced Insight:** The process of deriving expressions from truth tables is exactly what logic synthesis tools do automatically."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: How do you derive SOP from a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For each row where output=1, create a minterm (AND of inputs), then OR all minterms together.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: How do you derive POS from a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For each row where output=0, create a maxterm (OR of inputs), then AND all maxterms together.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: What is the difference between minterm and maxterm?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Minterm uses AND, evaluates to 1 for its row. Maxterm uses OR, evaluates to 0 for its row. They are complements.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: Derive SOP for 2-input XOR truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Truth table: 00→0, 01→1, 10→1, 11→0. SOP: F = A'B + AB'.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: Derive POS for 2-input XOR truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: From rows where output=0 (00 and 11): F = (A+B)·(A'+B').</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: What does Σ(1,3,5,7) mean?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It means the SOP expression includes minterms 1, 3, 5, and 7.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: What does Π(0,2,4,6) mean?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It means the POS expression includes maxterms 0, 2, 4, and 6.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: Derive SOP for 3-input majority function.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Truth table with 1s at rows 3,5,6,7. SOP: F = A'BC + AB'C + ABC' + ABC.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: Derive simplified majority expression.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Using K-map or algebra: F = AB + AC + BC.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: When should I choose SOP over POS?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Choose SOP when there are fewer 1s than 0s in the truth table (fewer minterms).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: When should I choose POS over SOP?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Choose POS when there are fewer 0s than 1s (fewer maxterms).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: Derive expression from truth table: 00→1, 01→0, 10→1, 11→0.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: SOP: F = A'B' + AB' = B'. POS: F = (A+B)·(A'+B).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: What is a don't care condition?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Input combinations that never occur or whose output doesn't matter. They can be treated as 0 or 1 to simplify expressions.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: How do don't cares help in simplification?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They allow larger groups in K-maps, leading to simpler expressions with fewer terms.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Derive expression for 2-input NAND from truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Truth table: 00→1, 01→1, 10→1, 11→0. SOP: F = A'B' + A'B + AB' = A' + B'. POS: F = (A'+B').</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: Derive expression for 2-input NOR from truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Truth table: 00→1, 01→0, 10→0, 11→0. SOP: F = A'B'. POS: F = (A+B).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: What is the canonical SOP form?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A sum of minterms where each minterm includes all variables exactly once.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: What is the canonical POS form?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A product of maxterms where each maxterm includes all variables exactly once.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: How do you verify your derived expression is correct?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Construct the truth table for your expression and compare it with the original truth table.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What's the next step after deriving SOP/POS?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Simplify using Boolean algebra or K-maps to get a minimal expression for implementation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic25;