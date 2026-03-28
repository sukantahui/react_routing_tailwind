import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 19: Canonical Forms: Conversion between SOP and POS
 * 
 * Component: Topic19
 * Purpose: Explains methods to convert between Sum of Products (SOP) and Product of Sums (POS):
 *          - Using duality principle
 *          - Using truth tables
 *          - Using algebraic manipulation
 *          - Using complement method
 *          - Practical applications and trade-offs
 * 
 * When & Why: Used as the twentieth topic in the Boolean Algebra series. Converting
 *             between SOP and POS is essential for circuit optimization, technology
 *             mapping, and understanding the dual nature of Boolean functions.
 *             Engineers often choose the form that yields the simplest implementation.
 * 
 * Return Type: JSX.Element
 */

const Topic19 = () => {
  // State for interactive conversion
  const [numVariables, setNumVariables] = useState(3);
  const [selectedMinterms, setSelectedMinterms] = useState([1, 2, 4]);
  const [showMethod, setShowMethod] = useState('truthTable');
  const [customSOP, setCustomSOP] = useState('');
  const [convertedPOS, setConvertedPOS] = useState('');
  const [customPOS, setCustomPOS] = useState('');
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
      rows.push({ inputs: values, output, index: i });
    }
    return { rows, variables };
  };

  const { rows, variables } = generateTruthTable();

  // Generate SOP from minterms
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

  // Generate POS from maxterms (complement of selected minterms)
  const generatePOSFromSOP = () => {
    const n = numVariables;
    const totalTerms = Math.pow(2, n);
    const maxterms = [];
    for (let i = 0; i < totalTerms; i++) {
      if (!selectedMinterms.includes(i)) {
        maxterms.push(i);
      }
    }
    
    const varNames = ['A', 'B', 'C', 'D'].slice(0, n);
    const terms = [];
    for (let i of maxterms) {
      const term = [];
      for (let j = 0; j < n; j++) {
        const bit = (i >> (n - 1 - j)) & 1;
        // For maxterm, complement variable if bit is 1
        if (bit === 0) {
          term.push(varNames[j]);
        } else {
          term.push(`${varNames[j]}'`);
        }
      }
      terms.push(term.join('+'));
    }
    return terms.length ? `(${terms.join(')·(')})` : "1";
  };

  const sopExpression = generateSOP() || "0";
  const posExpression = generatePOSFromSOP();

  // Convert custom SOP to POS (demo)
  const convertSOPToPOS = () => {
    const expr = customSOP.toUpperCase().replace(/\s/g, '');
    const conversions = {
      'A': 'A (both SOP and POS are same for single variable)',
      'A+B': '(A+B)·(A+B\')·(A\'+B)',
      'A·B': '(A+B)·(A+B\')·(A\'+B)',
      'A·B+A\'·C': '(A+B+C)·(A+B+C\')·(A+B\'+C)·(A\'+B+C)·(A\'+B\'+C)',
      'A·B+A·C': '(A+B+C)·(A+B+C\')·(A+B\'+C)·(A\'+B+C)·(A\'+B+C\')',
      'A·B+C': '(A+B+C)·(A+B+C\')·(A+B\'+C)·(A\'+B+C)·(A\'+B+C\')·(A\'+B\'+C)'
    };
    setConvertedPOS(conversions[expr] || "Try: A, A+B, A·B, A·B+A'·C");
  };

  // Convert custom POS to SOP (demo)
  const convertPOSToSOP = () => {
    const expr = customPOS.toUpperCase().replace(/\s/g, '');
    const conversions = {
      '(A+B)·(A+B\')·(A\'+B)': 'A·B',
      '(A+B)·(A+B\')': 'A',
      '(A+B)·(A\'+B)': 'B',
      '(A+B+C)·(A+B+C\')': 'A+B',
      '(A+B+C)·(A+B\')': 'Not a valid POS expression'
    };
    setConvertedSOP(conversions[expr] || "Try: (A+B)·(A+B')·(A'+B)");
  };

  // Toggle minterm selection
  const toggleMinterm = (minterm) => {
    if (selectedMinterms.includes(minterm)) {
      setSelectedMinterms(selectedMinterms.filter(m => m !== minterm));
    } else {
      setSelectedMinterms([...selectedMinterms, minterm].sort((a, b) => a - b));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-amber-100 dark:bg-amber-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Canonical Forms:</span>
          <span className="block text-amber-600 dark:text-amber-400">SOP ↔ POS Conversion</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Mastering the art of switching between Sum of Products and Product of Sums
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Conversion */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> Why Convert Between SOP and POS?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Converting between <strong className="text-green-600">Sum of Products (SOP)</strong> and <strong className="text-purple-600">Product of Sums (POS)</strong> is essential for:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Circuit Optimization</p>
              <p className="text-xs">Choose the form with fewer gates</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Technology Mapping</p>
              <p className="text-xs">Match target logic family (AND-OR vs OR-AND)</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Design Flexibility</p>
              <p className="text-xs">Alternative implementations for same function</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> SOP and POS are duals of each other. Converting between them helps engineers pick the most efficient implementation for their specific hardware constraints.
            </p>
          </div>
        </div>

        {/* Three Methods of Conversion */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📚</span> Three Methods of Conversion
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setShowMethod('truthTable')}
              className={clsx(
                "p-4 rounded-xl text-center transition-all duration-300 hover:scale-105",
                showMethod === 'truthTable' 
                  ? "bg-amber-500 text-white shadow-md" 
                  : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              <div className="text-2xl mb-2">📊</div>
              <p className="font-semibold">Truth Table Method</p>
              <p className="text-xs">Most intuitive, works for any function</p>
            </button>
            <button
              onClick={() => setShowMethod('dual')}
              className={clsx(
                "p-4 rounded-xl text-center transition-all duration-300 hover:scale-105",
                showMethod === 'dual' 
                  ? "bg-amber-500 text-white shadow-md" 
                  : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              <div className="text-2xl mb-2">⚖️</div>
              <p className="font-semibold">Duality Method</p>
              <p className="text-xs">Uses dual and complement</p>
            </button>
            <button
              onClick={() => setShowMethod('algebraic')}
              className={clsx(
                "p-4 rounded-xl text-center transition-all duration-300 hover:scale-105",
                showMethod === 'algebraic' 
                  ? "bg-amber-500 text-white shadow-md" 
                  : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              <div className="text-2xl mb-2">🔢</div>
              <p className="font-semibold">Algebraic Method</p>
              <p className="text-xs">Using Boolean algebra and De Morgan's</p>
            </button>
          </div>
          
          {/* Method 1: Truth Table */}
          {showMethod === 'truthTable' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Method 1: Truth Table Conversion</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Steps:</strong> Create truth table → SOP from 1s → POS from 0s → Convert!
              </p>
              
              {/* Interactive Truth Table */}
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      {variables.map(v => (
                        <th key={v} className="px-3 py-2 text-center font-mono">{v}</th>
                      ))}
                      <th className="px-3 py-2 text-center">F</th>
                      <th className="px-3 py-2 text-center">Minterm (SOP)</th>
                      <th className="px-3 py-2 text-center">Maxterm (POS)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                        {row.inputs.map((val, i) => (
                          <td key={i} className="px-3 py-2 text-center font-mono">{val}</td>
                        ))}
                        <td className="px-3 py-2 text-center font-mono font-bold">
                          {row.output}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {row.output === 1 ? `m${row.index}` : '-'}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {row.output === 0 ? `M${row.index}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <p className="font-semibold text-green-700">SOP from Truth Table:</p>
                  <p className="font-mono text-sm break-all">{sopExpression}</p>
                  <p className="text-xs mt-1">F = Σ({selectedMinterms.join(', ')})</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  <p className="font-semibold text-purple-700">POS from Truth Table:</p>
                  <p className="font-mono text-sm break-all">{posExpression}</p>
                  <p className="text-xs mt-1">F = Π({[...Array(Math.pow(2, numVariables)).keys()].filter(i => !selectedMinterms.includes(i)).join(', ')})</p>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">✨ Key Observation:</span> The minterms (SOP) and maxterms (POS) are complements! 
                  If SOP uses minterms {selectedMinterms.join(', ')}, then POS uses maxterms {[...Array(Math.pow(2, numVariables)).keys()].filter(i => !selectedMinterms.includes(i)).join(', ')}.
                </p>
              </div>
            </div>
          )}
          
          {/* Method 2: Duality Method */}
          {showMethod === 'dual' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Method 2: Duality Method</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Formula:</strong> To convert SOP to POS, take the dual and complement variables (or use F = (F')').
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-semibold mb-2">SOP → POS Steps:</p>
                  <ol className="list-decimal pl-5 text-sm space-y-1">
                    <li>Start with SOP: <span className="font-mono">F = {sopExpression}</span></li>
                    <li>Find complement F' using De Morgan's</li>
                    <li>Take dual of F' (swap AND/OR, 0/1)</li>
                    <li>The result is the POS form</li>
                  </ol>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-semibold mb-2">Example with current expression:</p>
                  <div className="font-mono text-xs space-y-1">
                    <p>F = {sopExpression}</p>
                    <p>F' = ({sopExpression})'</p>
                    <p>Apply De Morgan's: F' = {sopExpression.split('+').map(t => `(${t})'`).join('·')}</p>
                    <p>F' = {sopExpression.split('+').map(t => t.split('·').map(v => v + "'").join('+')).join('·')}</p>
                    <p className="text-green-600">After simplification: {posExpression}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">💡 Pro Tip:</span> The dual method works because POS is the dual of the complement of SOP. 
                  This relationship is fundamental to Boolean algebra.
                </p>
              </div>
            </div>
          )}
          
          {/* Method 3: Algebraic Method */}
          {showMethod === 'algebraic' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Method 3: Algebraic Conversion</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Using the identity:</strong> F = (F')' and applying De Morgan's repeatedly.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-semibold mb-2">Example 1: Convert F = A·B + A'·C to POS</p>
                  <div className="font-mono text-sm space-y-1">
                    <p>Step 1: F' = (A·B + A'·C)'</p>
                    <p>Step 2: Apply De Morgan's: F' = (A·B)' · (A'·C)'</p>
                    <p>Step 3: Apply De Morgan's again: F' = (A' + B') · (A + C')</p>
                    <p>Step 4: F = (F')' = [(A' + B') · (A + C')]'</p>
                    <p>Step 5: Apply De Morgan's: F = (A' + B')' + (A + C')'</p>
                    <p>Step 6: Apply De Morgan's: F = (A·B) + (A'·C)</p>
                    <p className="text-purple-600">This is actually back to SOP! This method works both ways.</p>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-semibold mb-2">Example 2: Convert F = (A+B)·(A+C) to SOP</p>
                  <div className="font-mono text-sm space-y-1">
                    <p>Step 1: Expand using distributive law (OR over AND)</p>
                    <p>F = (A+B)·(A+C) = A·A + A·C + B·A + B·C</p>
                    <p>Step 2: Simplify: A·A = A, so = A + A·C + A·B + B·C</p>
                    <p>Step 3: Factor A: = A·(1 + C + B) + B·C</p>
                    <p>Step 4: Apply Null Law: 1 + C + B = 1, so = A·1 + B·C</p>
                    <p className="text-green-600">Result: F = A + B·C (SOP form)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Conversion Practice */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✏️</span> Practice: Convert Between Forms
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SOP to POS Converter */}
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">SOP → POS Converter</h3>
              <input
                type="text"
                value={customSOP}
                onChange={(e) => setCustomSOP(e.target.value)}
                placeholder="Enter SOP expression (e.g., A·B + A'·C)"
                className="w-full px-3 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={convertSOPToPOS}
                className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Convert to POS →
              </button>
              {convertedPOS && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm font-semibold">POS Equivalent:</p>
                  <p className="font-mono text-sm break-all">{convertedPOS}</p>
                </div>
              )}
            </div>
            
            {/* POS to SOP Converter */}
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
              <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">POS → SOP Converter</h3>
              <input
                type="text"
                value={customPOS}
                onChange={(e) => setCustomPOS(e.target.value)}
                placeholder="Enter POS expression (e.g., (A+B)·(A+C))"
                className="w-full px-3 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={convertPOSToSOP}
                className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Convert to SOP →
              </button>
              {convertedSOP && (
                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm font-semibold">SOP Equivalent:</p>
                  <p className="font-mono text-sm break-all">{convertedSOP}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold">💡 Try these examples:</span><br />
              SOP: A, A+B, A·B, A·B + A'·C<br />
              POS: (A+B)·(A+B')·(A'+B), (A+B)·(A+C)
            </p>
          </div>
        </div>

        {/* Summary Table */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📋</span> Quick Reference: SOP ↔ POS
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  <th className="px-4 py-2">Feature</th>
                  <th className="px-4 py-2">Sum of Products (SOP)</th>
                  <th className="px-4 py-2">Product of Sums (POS)</th>
                 </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">Focus</td>
                  <td className="px-4 py-2">Output = 1 (minterms)</td>
                  <td className="px-4 py-2">Output = 0 (maxterms)</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">Notation</td>
                  <td className="px-4 py-2 font-mono">F = Σ(m₁, m₂, ...)</td>
                  <td className="px-4 py-2 font-mono">F = Π(M₀, M₁, ...)</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">Circuit</td>
                  <td className="px-4 py-2">AND-OR (2-level)</td>
                  <td className="px-4 py-2">OR-AND (2-level)</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">Conversion</td>
                  <td className="px-4 py-2" colSpan={2}>F<sub>POS</sub> = (F'<sub>SOP</sub>)' after applying De Morgan's</td>
                 </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">Minterm/Maxterm</td>
                  <td className="px-4 py-2">mᵢ = 1 for input i</td>
                  <td className="px-4 py-2">Mᵢ = 0 for input i, Mᵢ = (mᵢ)'</td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">✓</span> <strong>Use the Complement Method:</strong> The fastest way: F_POS = (F'_SOP)' using De Morgan's.</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">✓</span> <strong>Check Number of Terms:</strong> Choose the form with fewer terms—it usually gives a simpler circuit.</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">✓</span> <strong>Don't Forget Don't Cares:</strong> In practical design, don't care conditions can make conversion more flexible.</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">✓</span> <strong>Use K-maps for Verification:</strong> After conversion, use K-maps to verify both forms are equivalent.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Forgetting to Complement Variables:</strong> When converting SOP to POS, you must complement variables appropriately.</li>
            <li><strong>Mixing Minterm and Maxterm Indices:</strong> m₀ corresponds to M₀, but they represent opposite outputs.</li>
            <li><strong>Incorrect Parentheses:</strong> POS requires parentheses around sum terms: (A+B)·(A+C), not A+B·A+C.</li>
            <li><strong>Applying De Morgan's Incorrectly:</strong> (A·B)' = A' + B', not A'·B'. This is a common mistake in conversion.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Verify with Truth Table:</strong> After conversion, always verify that both forms produce the same truth table.</li>
            <li><strong>Use Standard Notation:</strong> Be consistent with Σ for SOP and Π for POS.</li>
            <li><strong>Document Your Conversion:</strong> Show steps when converting to avoid errors and for design reviews.</li>
            <li><strong>Consider Implementation Technology:</strong> Choose SOP for AND-OR PLAs, POS for OR-AND implementations.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-amber-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Convert SOP to POS using truth tables.</li>
            <li>Convert SOP to POS using duality and De Morgan's.</li>
            <li>Convert POS to SOP using algebraic expansion.</li>
            <li>Identify when to use SOP vs POS for circuit design.</li>
            <li>Verify equivalence between SOP and POS forms.</li>
            <li>Use Σ and Π notation correctly.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Abhronila from Barrackpore has an SOP expression: <span className="font-mono">F = A·B + A·C + B·C</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">What is the equivalent POS expression?</strong>
            <br />
            Try all three methods:
            <br />
            1. Truth table: List all minterms where F=1, then find maxterms where F=0.
            <br />
            2. Duality: Find F', then take dual.
            <br />
            3. Algebraic: Expand and factor.
            <br /><br />
            Which method is fastest for this expression? The answer should be <span className="font-mono">F = (A+B)·(A+C)·(B+C)</span>
            <br /><br />
            <strong>Observe carefully:</strong> This is the majority function—both SOP and POS have three terms of three literals each!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Converting between SOP and POS is where students truly understand the duality of Boolean algebra.\n\n" +
            "💡 **Teaching Strategy:** Start with truth tables—it's the most visual method. Then introduce the algebraic method for speed.\n\n" +
            "🔍 **Common Misunderstanding:** Students often think conversion is just swapping + and ·. Emphasize that complementation is also required.\n\n" +
            "📌 **Real-World Connection:** In industry, engineers often convert between forms to match the target technology (CMOS vs ECL, AND-OR vs OR-AND).\n\n" +
            "🎯 **Advanced Insight:** The ability to switch between SOP and POS is essential for understanding logic minimization tools like Espresso."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: How do you convert SOP to POS using truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: List all input combinations where output=0, create maxterms (OR terms), and AND them together.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: Convert F = A·B + A'·C to POS.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = (A+B+C)·(A+B+C')·(A+B'+C)·(A'+B+C)·(A'+B'+C)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: Convert F = (A+B)·(A+C) to SOP.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = A + B·C</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: What is the relationship between minterms and maxterms?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Mᵢ = (mᵢ)'. Maxterms are complements of corresponding minterms.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: How do you convert using duality?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Find complement of function, then take dual, then complement again if needed.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: Convert F = A + B to POS (2 variables).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = (A+B)·(A+B')·(A'+B)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: Convert F = A·B to POS (2 variables).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = (A+B)·(A+B')·(A'+B)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: Why would I want to convert from SOP to POS?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: To get a simpler circuit if POS has fewer terms, or to match OR-AND technology.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: Convert F = A XOR B to POS.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = (A+B)·(A'+B') = Π(0,3)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: Convert F = Σ(1,2,4) to POS (3 variables).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = Π(0,3,5,6,7)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: How does De Morgan's help in conversion?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: De Morgan's allows complementing complex expressions, which is key to conversion.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: Convert F = (A+B)·(A'+C) to SOP.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = A·C + A'·B + B·C (expand and simplify)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: What's the fastest conversion method for small functions?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Truth table method—it's straightforward and less error-prone for 3-4 variables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: Convert F = A·B·C + A·B·C' to POS.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = A·B = (A+B+C)·(A+B+C')·(A+B'+C)·(A+B'+C')·(A'+B+C)·(A'+B+C')</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Can any SOP be converted to POS?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Every Boolean function has both SOP and POS representations.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: What's the relationship between number of terms in SOP and POS?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They are complementary. If SOP has k minterms, POS has 2ⁿ - k maxterms.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: Convert F = A'·B' + A·B to POS.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = (A+B)·(A'+B') (XNOR function)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: Why are both SOP and POS called canonical forms?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because they are unique representations of Boolean functions (ignoring order).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Convert F = (A+B+C)·(A+B'+C) to SOP.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: F = A+B (expand: (A+B+C)·(A+B'+C) = A+B+ C·C' = A+B)</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What's the best way to verify conversion is correct?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Create truth tables for both forms and compare. They must match for all input combinations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic19;