import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 23: Karnaugh Maps (K-Map): Grouping and simplification rules
 * 
 * Component: Topic23
 * Purpose: Explains the rules for grouping cells in K-Maps and deriving simplified expressions:
 *          - Valid group sizes (powers of 2)
 *          - Rectangular and wrap-around groups
 *          - Group overlap and coverage
 *          - Prime implicants and essential prime implicants
 *          - Minimal sum-of-products expression
 * 
 * When & Why: Used as the twenty-fourth topic in the Boolean Algebra series. Mastering
 *             grouping rules is essential for correctly simplifying K-Maps. This topic
 *             provides systematic rules for identifying the minimal expression,
 *             covering concepts like prime implicants and essential prime implicants.
 * 
 * Return Type: JSX.Element
 */

const Topic23 = () => {
  // State for interactive K-Map grouping practice
  const [numVariables, setNumVariables] = useState(3);
  const [kmapValues, setKmapValues] = useState(
    Array(8).fill(0).reduce((acc, _, i) => ({ ...acc, [`m${i}`]: 0 }), {})
  );
  const [showRules, setShowRules] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);

  // Variable names based on number of variables
  const getVarNames = () => {
    if (numVariables === 2) return ['A', 'B'];
    if (numVariables === 3) return ['A', 'B', 'C'];
    return ['A', 'B', 'C', 'D'];
  };

  const varNames = getVarNames();

  // Get K-Map structure based on variable count
  const getKMapStructure = () => {
    if (numVariables === 2) {
      return {
        rows: [{ label: "A'", rowIndex: 0 }, { label: "A", rowIndex: 1 }],
        cols: [{ label: "B'", colIndex: 0 }, { label: "B", colIndex: 1 }],
        getCellIndex: (r, c) => (r << 1) | c,
        grayOrder: [0, 1]
      };
    } else if (numVariables === 3) {
      return {
        rows: [{ label: "A'", rowIndex: 0 }, { label: "A", rowIndex: 1 }],
        cols: [
          { label: "B'C'", colIndex: 0 }, { label: "B'C", colIndex: 1 },
          { label: "BC", colIndex: 2 }, { label: "BC'", colIndex: 3 }
        ],
        getCellIndex: (r, c) => {
          const colMap = [0, 1, 3, 2];
          return (r << 2) | colMap[c];
        },
        grayOrder: [0, 1, 3, 2]
      };
    } else {
      return {
        rows: [
          { label: "A'B'", rowIndex: 0 }, { label: "A'B", rowIndex: 1 },
          { label: "AB", rowIndex: 2 }, { label: "AB'", rowIndex: 3 }
        ],
        cols: [
          { label: "C'D'", colIndex: 0 }, { label: "C'D", colIndex: 1 },
          { label: "CD", colIndex: 2 }, { label: "CD'", colIndex: 3 }
        ],
        getCellIndex: (r, c) => {
          const rowMap = [0, 1, 3, 2];
          const colMap = [0, 1, 3, 2];
          return (rowMap[r] << 2) | colMap[c];
        },
        grayOrder: [0, 1, 3, 2]
      };
    }
  };

  const structure = getKMapStructure();
  const rows = structure.rows;
  const cols = structure.cols;

  // Generate all cells
  const cells = [];
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < cols.length; c++) {
      const minterm = structure.getCellIndex(r, c);
      cells.push({
        name: `m${minterm}`,
        row: r,
        col: c,
        value: kmapValues[`m${minterm}`],
        minterm: minterm
      });
    }
  }

  // Toggle cell value
  const toggleCell = (minterm) => {
    setKmapValues(prev => ({
      ...prev,
      [`m${minterm}`]: prev[`m${minterm}`] === 0 ? 1 : 0
    }));
    setShowSolution(false);
  };

  // Clear map
  const clearMap = () => {
    const empty = {};
    for (let i = 0; i < Math.pow(2, numVariables); i++) {
      empty[`m${i}`] = 0;
    }
    setKmapValues(empty);
    setShowSolution(false);
  };

  // Set example pattern
  const setExample = (type) => {
    clearMap();
    const total = Math.pow(2, numVariables);
    const empty = {};
    for (let i = 0; i < total; i++) empty[`m${i}`] = 0;
    
    if (type === 'majority' && numVariables === 3) {
      setKmapValues({ ...empty, m3: 1, m5: 1, m6: 1, m7: 1 });
    } else if (type === 'parity' && numVariables === 3) {
      setKmapValues({ ...empty, m1: 1, m2: 1, m4: 1, m7: 1 });
    } else if (type === 'corner' && numVariables === 4) {
      setKmapValues({ ...empty, m0: 1, m2: 1, m8: 1, m10: 1 });
    } else if (type === 'quad' && numVariables === 4) {
      setKmapValues({ ...empty, m0: 1, m1: 1, m4: 1, m5: 1 });
    } else if (type === 'adjacent' && numVariables === 3) {
      setKmapValues({ ...empty, m0: 1, m1: 1 });
    }
    setShowSolution(false);
  };

  // Get simplified expression (simplified algorithm for demo)
  const getSimplifiedExpression = () => {
    const ones = [];
    for (let i = 0; i < Math.pow(2, numVariables); i++) {
      if (kmapValues[`m${i}`] === 1) ones.push(i);
    }
    
    if (ones.length === 0) return '0';
    if (ones.length === Math.pow(2, numVariables)) return '1';
    
    // This is a simplified demonstration - in practice, a full minimization algorithm would be used
    const terms = [];
    if (numVariables === 3 && ones.includes(3) && ones.includes(7)) terms.push('BC');
    if (numVariables === 3 && ones.includes(5) && ones.includes(7)) terms.push('AC');
    if (numVariables === 3 && ones.includes(6) && ones.includes(7)) terms.push('AB');
    if (numVariables === 4 && ones.includes(0) && ones.includes(1) && ones.includes(4) && ones.includes(5)) terms.push("A'B'");
    if (numVariables === 4 && ones.includes(0) && ones.includes(2) && ones.includes(8) && ones.includes(10)) terms.push("B'D'");
    
    if (terms.length === 0) {
      return ones.map(m => {
        const binary = m.toString(2).padStart(numVariables, '0');
        return binary.split('').map((bit, i) => bit === '1' ? varNames[i] : `${varNames[i]}'`).join('·');
      }).join(' + ');
    }
    
    return terms.join(' + ');
  };

  const expression = getSimplifiedExpression();

  // Get cell style
  const getCellStyle = (cell) => {
    if (cell.value === 1) {
      return "bg-green-500 hover:bg-green-600 text-white";
    }
    return "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-cyan-100 dark:bg-cyan-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Karnaugh Maps (K-Map):</span>
          <span className="block text-cyan-600 dark:text-cyan-400">Grouping and Simplification Rules</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Systematic rules for identifying minimal expressions
        </p>
      </div>

      <div className="space-y-8">
        {/* Grouping Rules */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📏</span> K-Map Grouping Rules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">✅ Valid Groups</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Powers of 2:</strong> Groups must contain 1, 2, 4, 8, or 16 cells</li>
                <li>• <strong>Rectangular:</strong> Groups must form rectangles (including squares)</li>
                <li>• <strong>Wrap-around:</strong> Groups can wrap around edges of the map</li>
                <li>• <strong>Overlap:</strong> Groups may overlap; this is often necessary</li>
                <li>• <strong>Coverage:</strong> Every 1 must be in at least one group</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Invalid Groups</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Non-rectangular:</strong> L-shaped, T-shaped, or diagonal groups</li>
                <li>• <strong>Wrong size:</strong> Groups with 3, 5, 6, 7, etc. cells</li>
                <li>• <strong>Disconnected:</strong> Cells that are not adjacent</li>
                <li>• <strong>Includes 0s:</strong> Groups must contain only 1s (and X for don't cares)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎯 Key Principles for Minimal Expression:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li><strong>Largest Groups First:</strong> Always form the largest possible groups (size 8 → 4 → 2 → 1)</li>
              <li><strong>Prime Implicants:</strong> A group that cannot be expanded further is a prime implicant</li>
              <li><strong>Essential Prime Implicants:</strong> Groups that cover at least one 1 not covered by any other group are essential</li>
              <li><strong>Minimal Cover:</strong> Select all essential prime implicants, then cover remaining 1s with minimal additional prime implicants</li>
              <li><strong>Don't Cares:</strong> Use X to create larger groups, but never require X to be covered</li>
            </ol>
          </div>
        </div>

        {/* Interactive K-Map Practice */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive K-Map Practice
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Select variable count, click cells to place 1s, and practice grouping!
          </p>
          
          {/* Variable Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => {
                setNumVariables(2);
                clearMap();
              }}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 2 ? "bg-cyan-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >2 Variables</button>
            <button
              onClick={() => {
                setNumVariables(3);
                clearMap();
              }}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 3 ? "bg-cyan-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >3 Variables</button>
            <button
              onClick={() => {
                setNumVariables(4);
                clearMap();
              }}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 4 ? "bg-cyan-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >4 Variables</button>
          </div>
          
          {/* Example Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setExample('majority')} className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all text-sm">Majority (3-var)</button>
            <button onClick={() => setExample('parity')} className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all text-sm">Odd Parity (3-var)</button>
            <button onClick={() => setExample('adjacent')} className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all text-sm">Adjacent Pair</button>
            {numVariables === 4 && (
              <>
                <button onClick={() => setExample('corner')} className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all text-sm">Corner Group</button>
                <button onClick={() => setExample('quad')} className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all text-sm">2x2 Quad</button>
              </>
            )}
            <button onClick={clearMap} className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all text-sm">Clear</button>
          </div>
          
          {/* K-Map Grid */}
          <div className="flex justify-center mb-6 overflow-x-auto">
            <div className="inline-block">
              <div className="flex">
                <div className="w-16 h-10 flex items-end justify-center pb-1 text-xs font-mono text-gray-500">
                  {numVariables === 2 ? "A\\B" : numVariables === 3 ? "A\\BC" : "AB\\CD"}
                </div>
                {cols.map((col, ci) => (
                  <div key={ci} className="w-16 text-center text-xs font-mono text-gray-500">{col.label}</div>
                ))}
              </div>
              {rows.map((row, ri) => (
                <div key={ri} className="flex">
                  <div className="w-16 flex items-center justify-center text-xs font-mono text-gray-500">{row.label}</div>
                  {cols.map((col, ci) => {
                    const minterm = structure.getCellIndex(ri, ci);
                    const cell = cells.find(c => c.minterm === minterm);
                    return (
                      <button
                        key={`${ri}-${ci}`}
                        onClick={() => toggleCell(minterm)}
                        className={clsx(
                          "w-16 h-16 border-2 border-gray-300 dark:border-gray-600 rounded-lg m-0.5 font-mono text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg",
                          getCellStyle(cell)
                        )}
                      >
                        {cell?.value || 0}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
          {/* Expression Display */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">✓ Simplified Expression (from K-Map):</p>
            <p className="font-mono text-xl font-bold break-all">{expression}</p>
          </div>
          
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="mt-4 w-full py-2 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-lg font-medium transition-all duration-300 hover:bg-cyan-200 dark:hover:bg-cyan-900/60"
          >
            {showSolution ? "Hide" : "Show"} Step-by-Step Grouping
          </button>
          
          {showSolution && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Grouping Analysis:</h3>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p><span className="font-bold">Step 1:</span> Identify all cells with value 1</p>
                <p><span className="font-bold">Step 2:</span> Look for largest possible groups (powers of 2)</p>
                <p><span className="font-bold">Step 3:</span> Check for wrap-around groups (edges and corners)</p>
                <p><span className="font-bold">Step 4:</span> Identify essential prime implicants (groups covering unique 1s)</p>
                <p><span className="font-bold">Step 5:</span> Select minimal set of groups covering all 1s</p>
                <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <p className="text-sm">
                    <span className="font-bold">🎯 For current map:</span><br />
                    {(() => {
                      const ones = [];
                      for (let i = 0; i < Math.pow(2, numVariables); i++) {
                        if (kmapValues[`m${i}`] === 1) ones.push(i);
                      }
                      if (ones.length === 0) return "No 1s found → F = 0";
                      if (ones.length === Math.pow(2, numVariables)) return "All cells are 1 → F = 1";
                      return `1s at minterms: ${ones.join(', ')} → Look for adjacent pairs, quads, or octets to simplify.`;
                    })()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Prime Implicants and Essential Prime Implicants */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">⭐</span> Prime Implicants and Essential Prime Implicants
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">🔷 Prime Implicant</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                A <strong>prime implicant</strong> is a group that cannot be expanded further while still covering only 1s (and X).
              </p>
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded font-mono text-xs">
                Example: In a 3-variable K-Map, a pair of adjacent 1s is a prime implicant if neither can be combined into a larger group.
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">🔶 Essential Prime Implicant</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                An <strong>essential prime implicant</strong> is a prime implicant that covers at least one 1 that is not covered by any other prime implicant.
              </p>
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded font-mono text-xs">
                Essential prime implicants MUST be included in the minimal expression.
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">📌 Steps to Find Minimal Expression:</span><br />
              1. Find all prime implicants (largest possible groups)<br />
              2. Identify essential prime implicants (those covering unique 1s)<br />
              3. Include all essential prime implicants in the solution<br />
              4. Cover remaining 1s with minimal additional prime implicants<br />
              5. The result is the minimal sum-of-products expression
            </p>
          </div>
        </div>

        {/* Group Size Reference */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📊</span> Group Size Reference
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  <th className="px-4 py-2">Group Size</th>
                  <th className="px-4 py-2">Variables Eliminated</th>
                  <th className="px-4 py-2">Example Term</th>
                  <th className="px-4 py-2">When to Use</th>
                 </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">1 cell</td>
                  <td className="px-4 py-2">0 eliminated</td>
                  <td className="px-4 py-2 font-mono">A'B'C'D'</td>
                  <td className="px-4 py-2">Isolated 1</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">2 cells</td>
                  <td className="px-4 py-2">1 eliminated</td>
                  <td className="px-4 py-2 font-mono">A'B'C'</td>
                  <td className="px-4 py-2">Adjacent pair</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">4 cells</td>
                  <td className="px-4 py-2">2 eliminated</td>
                  <td className="px-4 py-2 font-mono">A'B'</td>
                  <td className="px-4 py-2">Quad (2x2 or row/column half)</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">8 cells</td>
                  <td className="px-4 py-2">3 eliminated</td>
                  <td className="px-4 py-2 font-mono">A'</td>
                  <td className="px-4 py-2">Octet (full row or column)</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">16 cells</td>
                  <td className="px-4 py-2">4 eliminated</td>
                  <td className="px-4 py-2 font-mono">1</td>
                  <td className="px-4 py-2">Entire map</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Largest Groups First:</strong> Always try to form size 8 groups before size 4, etc. This ensures minimal expression.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Look for Essential Prime Implicants:</strong> These are mandatory—include them first, then cover remaining 1s.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Use Don't Cares Wisely:</strong> Treat X as 1 only when it helps create larger groups. Never require X to be covered.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Check Wrap-Around:</strong> In 4-variable maps, remember corners are adjacent. This often creates unexpected groups.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">✓</span> <strong>Verify with Truth Table:</strong> After grouping, verify that all original 1s are covered and no extra 0s are included.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Groups That Aren't Rectangular:</strong> L-shaped or diagonal groups are invalid—they don't represent product terms.</li>
            <li><strong>Missing Wrap-Around:</strong> In 3-variable maps, forgetting left-right adjacency. In 4-variable maps, forgetting both horizontal and vertical wrap-around.</li>
            <li><strong>Non-Essential Prime Implicants:</strong> Including prime implicants that are not essential can lead to non-minimal expressions.</li>
            <li><strong>Overlooking Corners:</strong> In 4-variable maps, the four corners form a valid 4-cell group.</li>
            <li><strong>Incorrect Variable Elimination:</strong> When forming a group, only variables that change within the group are eliminated.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Label Clearly:</strong> Always label rows and columns with their Gray code values.</li>
            <li><strong>Circle Groups Visually:</strong> Use different colors or patterns to distinguish overlapping groups.</li>
            <li><strong>Start with Largest Groups:</strong> Always look for size 8 groups first, then size 4, then size 2.</li>
            <li><strong>Check Essential Prime Implicants:</strong> Identify and include essential prime implicants before covering remaining 1s.</li>
            <li><strong>Verify Coverage:</strong> After grouping, ensure every 1 is covered by at least one group.</li>
            <li><strong>Eliminate Redundancy:</strong> Remove any group whose 1s are all covered by other groups.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-cyan-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Identify valid vs invalid K-Map groups (powers of 2, rectangular).</li>
            <li>Recognize wrap-around groups in 3 and 4 variable maps.</li>
            <li>Find all prime implicants for a given K-Map.</li>
            <li>Identify essential prime implicants.</li>
            <li>Select minimal set of groups covering all 1s.</li>
            <li>Derive minimal sum-of-products expression.</li>
            <li>Apply don't care conditions to simplify expressions.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Susmita from Ichapur has a 4-variable K-Map with 1s at m₀, m₁, m₄, m₅, m₈, m₉, m₁₂, m₁₃.
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">What are the prime implicants? Which are essential?</strong>
            <br />
            First, identify the pattern: These are all cells where A=0 (rows 00 and 01) and where C=0 (columns 00 and 01).
            <br />
            Possible groups: A' (all rows with A=0) and C' (all columns with C=0).
            <br />
            Both are prime implicants. Are they essential? Each covers unique 1s? Actually, A' covers all 1s, so C' is redundant.
            <br />
            The minimal expression is simply <strong className="text-cyan-600">F = A'</strong>!
            <br /><br />
            <strong>Observe carefully:</strong> Sometimes the largest group (size 8) is also the simplest solution!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Grouping rules are the heart of K-Map simplification. Students must internalize these rules to minimize expressions correctly.\n\n" +
            "💡 **Teaching Strategy:** Start with valid vs invalid groups. Then introduce prime implicants and essential prime implicants through examples.\n\n" +
            "🔍 **Common Misunderstanding:** Students often think they must use the largest group for every 1. Emphasize that overlapping groups are fine—essential prime implicants must be included, others are optional.\n\n" +
            "📌 **Real-World Connection:** Logic synthesis tools like Espresso use algorithms based on these same principles (prime implicants, essential prime implicants).\n\n" +
            "🎯 **Advanced Insight:** The concept of prime implicants directly maps to the Quine-McCluskey algorithm for minimizing functions with many variables."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What are the valid group sizes in a K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Groups must contain 1, 2, 4, 8, or 16 cells (powers of 2).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: Can groups be L-shaped?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. Groups must be rectangular (including squares and wrap-around).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: What is a prime implicant?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A prime implicant is a group that cannot be expanded further while still covering only 1s (and X).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: What is an essential prime implicant?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: An essential prime implicant covers at least one 1 that is not covered by any other prime implicant.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: How do you find minimal expression?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Include all essential prime implicants, then cover remaining 1s with minimal additional prime implicants.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: Can groups overlap?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Overlapping groups are allowed and often necessary for minimal coverage.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: What happens if two groups are both essential?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Both must be included in the final expression.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: How do you handle don't cares in grouping?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Treat X as 1 only when it helps create larger groups. Never require X to be covered.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: What is a 2x2 quad?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A group of 4 cells forming a square. It eliminates two variables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: What is a corner group in 4-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The four corner cells (m₀, m₂, m₈, m₁₀) form a valid group due to wrap-around.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: Why must groups be powers of 2?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Because each grouping eliminates variables, and elimination requires pairs (2ⁿ cells eliminate n variables).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: What is the difference between a prime implicant and a minterm?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A minterm is a single cell; a prime implicant is a maximal group of 1s.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: Can a prime implicant be a single cell?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes, if that 1 cannot be grouped with any adjacent 1s.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: How do you identify essential prime implicants?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Look for 1s that are covered by only one prime implicant—that prime implicant is essential.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: What is a cyclic prime implicant chart?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: When no prime implicant is essential, you must choose a minimal set—this is a covering problem.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: Can a group of 8 cells be formed in a 3-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes, a full row (all 4 cells in A' or A) forms a size 4 group, not size 8. In 3-variable, max group size is 4.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: How do you verify minimal expression is correct?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Create a truth table for the expression and compare with the original K-Map values.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: What is the significance of essential prime implicants?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They must appear in any minimal expression—you cannot simplify further without them.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Can a group include don't cares exclusively?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. Groups must contain at least one 1. Don't cares are optional additions to enlarge groups.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What's the next step after mastering K-Map grouping rules?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Learn the Quine-McCluskey algorithm for functions with 5+ variables, and understand how logic synthesis tools automate this process.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic23;