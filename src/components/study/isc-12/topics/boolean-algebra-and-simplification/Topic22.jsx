import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 22: Karnaugh Maps (K-Map): 4-variable K-Map (conceptual)
 * 
 * Component: Topic22
 * Purpose: Explains 4-variable Karnaugh Maps for Boolean simplification:
 *          - Structure of 4-variable K-Map (4x4 grid)
 *          - Cell numbering and adjacency (including wrap-around in both directions)
 *          - Grouping 1s in powers of 2 (1,2,4,8,16)
 *          - Deriving simplified expressions from groups
 *          - Handling don't care conditions
 *          - Comparison with 2 and 3 variable maps
 * 
 * When & Why: Used as the twenty-third topic in the Boolean Algebra series. The
 *             4-variable K-Map is the largest size typically done by hand. It
 *             introduces more complex adjacency patterns including corner groups
 *             and wrap-around in both dimensions. Understanding this prepares
 *             students for computer-based minimization algorithms.
 * 
 * Return Type: JSX.Element
 */

const Topic22 = () => {
  // State for interactive 4-variable K-Map
  const [kmapValues, setKmapValues] = useState(
    Array(16).fill(0).reduce((acc, _, i) => ({ ...acc, [`m${i}`]: 0 }), {})
  );
  const [showGroups, setShowGroups] = useState(true);
  const [showDonCares, setShowDonCares] = useState(false);
  const [donCareValues, setDonCareValues] = useState(
    Array(16).fill(0).reduce((acc, _, i) => ({ ...acc, [`m${i}`]: false }), {})
  );
  const [activeGroup, setActiveGroup] = useState(null);

  // Variable names for 4-variable K-Map
  const variables = ['A', 'B', 'C', 'D'];
  
  // K-Map cell mapping for 4 variables (A,B rows; C,D columns)
  // Gray code order for rows: 00,01,11,10 (AB)
  // Gray code order for columns: 00,01,11,10 (CD)
  const rows = [
    { label: "00", rowVar: "A'B'", rowIndex: 0 },
    { label: "01", rowVar: "A'B", rowIndex: 1 },
    { label: "11", rowVar: "AB", rowIndex: 2 },
    { label: "10", rowVar: "AB'", rowIndex: 3 }
  ];
  
  const cols = [
    { label: "00", colVar: "C'D'", colIndex: 0 },
    { label: "01", colVar: "C'D", colIndex: 1 },
    { label: "11", colVar: "CD", colIndex: 2 },
    { label: "10", colVar: "CD'", colIndex: 3 }
  ];
  
  // Cell indices mapping: m(row, col) = row*4 + col, but with Gray code ordering
  // The actual minterm index is based on binary value of ABCD
  const getCellIndex = (rowIdx, colIdx) => {
    // Convert Gray code positions to binary to get minterm number
    const rowMap = [0, 1, 3, 2]; // Gray code to binary mapping for rows (AB)
    const colMap = [0, 1, 3, 2]; // Gray code to binary mapping for columns (CD)
    const ab = rowMap[rowIdx];
    const cd = colMap[colIdx];
    return (ab << 2) | cd;
  };
  
  // Precompute cell positions
  const cells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const minterm = getCellIndex(r, c);
      cells.push({
        name: `m${minterm}`,
        row: r,
        col: c,
        label: `${rows[r].rowVar}${cols[c].colVar}`.replace(/''/g, ''),
        value: kmapValues[`m${minterm}`],
        minterm: minterm,
        binary: `${(minterm >> 3) & 1}${(minterm >> 2) & 1}${(minterm >> 1) & 1}${minterm & 1}`
      });
    }
  }

  // Toggle cell value (0/1)
  const toggleCell = (minterm) => {
    if (showDonCares && donCareValues[`m${minterm}`]) {
      return;
    }
    setKmapValues(prev => ({
      ...prev,
      [`m${minterm}`]: prev[`m${minterm}`] === 0 ? 1 : 0
    }));
  };

  // Toggle don't care for a cell
  const toggleDonCare = (minterm) => {
    if (!showDonCares) return;
    setDonCareValues(prev => ({
      ...prev,
      [`m${minterm}`]: !prev[`m${minterm}`]
    }));
    // If setting as don't care, set value to 0
    if (!donCareValues[`m${minterm}`]) {
      setKmapValues(prev => ({ ...prev, [`m${minterm}`]: 0 }));
    }
  };

  // Get cell display value
  const getCellDisplay = (cell) => {
    if (showDonCares && donCareValues[`m${cell.minterm}`]) {
      return 'X';
    }
    return cell.value;
  };

  // Get cell style based on value and don't care
  const getCellStyle = (cell) => {
    if (showDonCares && donCareValues[`m${cell.minterm}`]) {
      return "bg-yellow-200 dark:bg-yellow-800/50 hover:bg-yellow-300 dark:hover:bg-yellow-700/50 text-yellow-800 dark:text-yellow-200";
    }
    if (cell.value === 1) {
      return "bg-green-500 hover:bg-green-600 text-white";
    }
    return "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300";
  };

  // Clear all cells
  const clearMap = () => {
    setKmapValues(Array(16).fill(0).reduce((acc, _, i) => ({ ...acc, [`m${i}`]: 0 }), {}));
    setDonCareValues(Array(16).fill(0).reduce((acc, _, i) => ({ ...acc, [`m${i}`]: false }), {}));
  };

  // Set example patterns
  const setExample = (type) => {
    clearMap();
    if (type === 'bcd') {
      // BCD to 7-segment example: digits 0-9, 10-15 are don't cares
      const bcdPattern = {
        m0: 1, m1: 1, m2: 1, m3: 1, m4: 1, m5: 1, m6: 1, m7: 1, m8: 1, m9: 1
      };
      setKmapValues(prev => ({ ...prev, ...bcdPattern }));
      if (showDonCares) {
        const dcPattern = {
          m10: true, m11: true, m12: true, m13: true, m14: true, m15: true
        };
        setDonCareValues(prev => ({ ...prev, ...dcPattern }));
      }
    } else if (type === 'gray') {
      // Gray code pattern
      setKmapValues({
        m0: 1, m1: 1, m3: 1, m2: 1, m4: 1, m5: 1, m7: 1, m6: 1, m8: 1, m9: 1, m11: 1, m10: 1, m12: 1, m13: 1, m15: 1, m14: 1
      });
    } else if (type === 'checkerboard') {
      // Checkerboard pattern
      for (let i = 0; i < 16; i++) {
        setKmapValues(prev => ({ ...prev, [`m${i}`]: (i % 2 === 0) ? 1 : 0 }));
      }
    } else if (type === 'quad') {
      // Pattern showing a 2x2 quad
      setKmapValues({ m0: 1, m1: 1, m4: 1, m5: 1 });
    } else if (type === 'wrap') {
      // Pattern showing wrap-around groups
      setKmapValues({ m0: 1, m2: 1, m8: 1, m10: 1 });
    }
  };

  // Count number of 1s
  const countOnes = () => {
    return Object.values(kmapValues).filter(v => v === 1).length;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-rose-100 dark:bg-rose-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Karnaugh Maps (K-Map):</span>
          <span className="block text-rose-600 dark:text-rose-400">4-Variable K-Map (Conceptual)</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          16-cell grid with wrap-around adjacency in both dimensions
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to 4-Variable K-Map */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🗺️</span> 4-Variable K-Map Structure
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A <strong className="text-rose-600 dark:text-rose-400">4-variable K-Map</strong> has <strong>2⁴ = 16 cells</strong> arranged in a <strong>4×4 grid</strong>. The rows represent variables A and B, and the columns represent variables C and D, both using Gray code ordering (00, 01, 11, 10).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center text-sm">
                  <thead>
                    <tr>
                      <th className="px-2 py-2"></th>
                      <th className="px-2 py-2 font-mono">CD=00<br/>C'D'</th>
                      <th className="px-2 py-2 font-mono">CD=01<br/>C'D</th>
                      <th className="px-2 py-2 font-mono">CD=11<br/>CD</th>
                      <th className="px-2 py-2 font-mono">CD=10<br/>CD'</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 font-mono">AB=00<br/>A'B'</td>
                      <td className="px-2 py-2 font-mono">m₀</td>
                      <td className="px-2 py-2 font-mono">m₁</td>
                      <td className="px-2 py-2 font-mono">m₃</td>
                      <td className="px-2 py-2 font-mono">m₂</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 font-mono">AB=01<br/>A'B</td>
                      <td className="px-2 py-2 font-mono">m₄</td>
                      <td className="px-2 py-2 font-mono">m₅</td>
                      <td className="px-2 py-2 font-mono">m₇</td>
                      <td className="px-2 py-2 font-mono">m₆</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 font-mono">AB=11<br/>AB</td>
                      <td className="px-2 py-2 font-mono">m₁₂</td>
                      <td className="px-2 py-2 font-mono">m₁₃</td>
                      <td className="px-2 py-2 font-mono">m₁₅</td>
                      <td className="px-2 py-2 font-mono">m₁₄</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 font-mono">AB=10<br/>AB'</td>
                      <td className="px-2 py-2 font-mono">m₈</td>
                      <td className="px-2 py-2 font-mono">m₉</td>
                      <td className="px-2 py-2 font-mono">m₁₁</td>
                      <td className="px-2 py-2 font-mono">m₁₀</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Adjacency Rules (4-Variable):</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Horizontal adjacency:</strong> Same row, adjacent columns</li>
                <li>• <strong>Vertical adjacency:</strong> Same column, adjacent rows</li>
                <li>• <strong>Wrap-around horizontally:</strong> Leftmost and rightmost columns adjacent</li>
                <li>• <strong>Wrap-around vertically:</strong> Top and bottom rows adjacent</li>
                <li>• <strong>Corner adjacency:</strong> All four corners are adjacent (m₀, m₂, m₈, m₁₀)</li>
              </ul>
              <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <p className="text-xs text-center">
                  <span className="font-bold">✨ Group Sizes:</span> Groups must be powers of 2: 1, 2, 4, 8, or 16 cells.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 4-Variable K-Map */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive 4-Variable K-Map
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Click on cells to toggle between 0 and 1. Use don't cares (right-click) to see how they help create larger groups.
          </p>
          
          {/* Don't Care Toggle */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDonCares}
                onChange={(e) => setShowDonCares(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Enable Don't Cares (X)</span>
            </label>
            {showDonCares && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400">Right-click a cell to toggle between 0 and X (don't care)</p>
            )}
          </div>
          
          {/* 4x4 K-Map Grid */}
          <div className="flex justify-center mb-6 overflow-x-auto">
            <div className="inline-block">
              <div className="flex">
                <div className="w-16 h-10 flex items-end justify-center pb-1 text-xs font-mono text-gray-500">AB\CD</div>
                {cols.map((col, ci) => (
                  <div key={ci} className="w-16 text-center text-xs font-mono text-gray-500">{col.label}<br/>{col.colVar}</div>
                ))}
              </div>
              {rows.map((row, ri) => (
                <div key={ri} className="flex">
                  <div className="w-16 flex items-center justify-center text-xs font-mono text-gray-500">{row.label}<br/>{row.rowVar}</div>
                  {cols.map((col, ci) => {
                    const minterm = getCellIndex(ri, ci);
                    const cell = cells.find(c => c.minterm === minterm);
                    return (
                      <div key={`${ri}-${ci}`} className="relative">
                        <button
                          onClick={() => toggleCell(minterm)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            toggleDonCare(minterm);
                          }}
                          className={clsx(
                            "w-16 h-16 border-2 border-gray-300 dark:border-gray-600 rounded-lg m-0.5 font-mono text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg",
                            getCellStyle(cell)
                          )}
                          title={showDonCares ? "Click to toggle 0/1, Right-click for Don't Care (X)" : "Click to toggle 0/1"}
                        >
                          {getCellDisplay(cell)}
                        </button>
                        <span className="absolute -top-2 -right-1 text-[8px] text-gray-400">m{minterm}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setExample('bcd')} className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all text-sm">BCD Example</button>
            <button onClick={() => setExample('gray')} className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all text-sm">All 1s</button>
            <button onClick={() => setExample('checkerboard')} className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all text-sm">Checkerboard</button>
            <button onClick={() => setExample('quad')} className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all text-sm">2x2 Quad</button>
            <button onClick={() => setExample('wrap')} className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all text-sm">Corner Group</button>
            <button onClick={clearMap} className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all text-sm">Clear</button>
          </div>
          
          {/* Statistics */}
          <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg mb-4">
            <p className="text-sm text-center">
              <span className="font-semibold">1s count:</span> {countOnes()} / 16
            </p>
          </div>
          
          <button
            onClick={() => setShowGroups(!showGroups)}
            className="mt-2 w-full py-2 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-lg font-medium transition-all duration-300 hover:bg-rose-200 dark:hover:bg-rose-900/60"
          >
            {showGroups ? "Hide" : "Show"} Grouping Strategy
          </button>
          
          {showGroups && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 4-Variable K-Map Grouping Strategy:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Identify all cells with 1 (and X if using don't cares)</li>
                <li>Look for the largest possible groups: 16 → 8 → 4 → 2 → 1</li>
                <li>Groups must be rectangular and contain 2ⁿ cells</li>
                <li>Groups can wrap around horizontally AND vertically</li>
                <li><strong className="text-rose-600">Corner group:</strong> All four corners (m₀, m₂, m₈, m₁₀) form a valid group</li>
                <li>Overlapping groups are allowed and often necessary</li>
                <li>Each group eliminates variables that change within the group</li>
                <li>Write product term: variables that remain constant</li>
                <li>OR all product terms together</li>
              </ol>
              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <p className="text-sm">
                  <span className="font-bold">🎯 Common 4-Variable Group Sizes:</span><br />
                  • <strong>Size 16:</strong> All cells → F = 1<br />
                  • <strong>Size 8 (row/column):</strong> Eliminates 2 variables<br />
                  • <strong>Size 8 (2x4 rectangle):</strong> Eliminates 2 variables<br />
                  • <strong>Size 4 (2x2 square):</strong> Eliminates 2 variables<br />
                  • <strong>Size 4 (row/column half):</strong> Eliminates 2 variables<br />
                  • <strong>Size 2 (pair):</strong> Eliminates 1 variable<br />
                  • <strong>Size 1 (single):</strong> No elimination
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Special Group Patterns */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔲</span> Special Group Patterns in 4-Variable K-Map
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
              <p className="font-semibold text-center mb-2">Size 8: Entire Row</p>
              <div className="flex justify-center">
                <div className="inline-block text-center">
                  <div className="grid grid-cols-5 text-xs">
                    <div></div><div>00</div><div>01</div><div>11</div><div>10</div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="text-xs">00</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="text-xs">01</div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-center mt-2">Term = <strong className="text-rose-600">A'B'</strong></p>
              <p className="text-xs text-center text-gray-500">C and D eliminated</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
              <p className="font-semibold text-center mb-2">Size 8: 2x4 Rectangle</p>
              <div className="flex justify-center">
                <div className="inline-block text-center">
                  <div className="grid grid-cols-5 text-xs">
                    <div></div><div>00</div><div>01</div><div>11</div><div>10</div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="text-xs">00</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="text-xs">11</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-center mt-2">Term = <strong className="text-rose-600">B'</strong></p>
              <p className="text-xs text-center text-gray-500">A, C, D eliminated (B=0 constant)</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
              <p className="font-semibold text-center mb-2">Size 4: Corner Group</p>
              <div className="flex justify-center">
                <div className="inline-block text-center">
                  <div className="grid grid-cols-5 text-xs">
                    <div></div><div>00</div><div>01</div><div>11</div><div>10</div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="text-xs">00</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="text-xs">10</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-center mt-2">Term = <strong className="text-rose-600">B'D'</strong></p>
              <p className="text-xs text-center text-gray-500">A and C eliminated (wrap-around corners)</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
              <p className="font-semibold text-center mb-2">Size 2: Opposite Corners</p>
              <div className="flex justify-center">
                <div className="inline-block text-center">
                  <div className="grid grid-cols-5 text-xs">
                    <div></div><div>00</div><div>01</div><div>11</div><div>10</div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="text-xs">00</div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="text-xs">11</div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                    <div className="w-12 h-12 bg-green-500 border flex items-center justify-center">1</div>
                    <div className="w-12 h-12 bg-gray-200 border"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-center mt-2">Term = <strong className="text-rose-600">A'B'C'D' + ABCD</strong></p>
              <p className="text-xs text-center text-gray-500">No elimination (not adjacent)</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📊</span> K-Map Size Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  <th className="px-4 py-2">Variables</th>
                  <th className="px-4 py-2">Cells</th>
                  <th className="px-4 py-2">Grid</th>
                  <th className="px-4 py-2">Adjacency</th>
                  <th className="px-4 py-2">Max Group</th>
                 </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">2</td>
                  <td className="px-4 py-2">4</td>
                  <td className="px-4 py-2">2×2</td>
                  <td className="px-4 py-2">Horizontal, Vertical</td>
                  <td className="px-4 py-2">4</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">3</td>
                  <td className="px-4 py-2">8</td>
                  <td className="px-4 py-2">2×4</td>
                  <td className="px-4 py-2">Horizontal wrap-around</td>
                  <td className="px-4 py-2">8</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600 bg-rose-50 dark:bg-rose-900/20">
                  <td className="px-4 py-2 font-semibold text-rose-600">4</td>
                  <td className="px-4 py-2">16</td>
                  <td className="px-4 py-2">4×4</td>
                  <td className="px-4 py-2">Horizontal + Vertical wrap-around, Corners</td>
                  <td className="px-4 py-2">16</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold">5+</td>
                  <td className="px-4 py-2">32+</td>
                  <td className="px-4 py-2">Not practical by hand</td>
                  <td className="px-4 py-2">Complex multidimensional</td>
                  <td className="px-4 py-2">Computer algorithms<br/>(Quine-McCluskey)</td>
                 </tr>
              </tbody>
            
            </table>
          </div>
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-sm text-center">
              <span className="font-bold">💡 Note:</span> For 5 or more variables, K-Maps become impractical. Computer-based methods like the Quine-McCluskey algorithm are used instead.
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-rose-500 font-bold">✓</span> <strong>Remember Corner Adjacency:</strong> All four corners (m₀, m₂, m₈, m₁₀) form a valid 4-cell group!</li>
            <li className="flex items-start gap-2"><span className="text-rose-500 font-bold">✓</span> <strong>Look for Symmetry:</strong> 4-variable K-Maps often have symmetrical patterns that can be grouped efficiently.</li>
            <li className="flex items-start gap-2"><span className="text-rose-500 font-bold">✓</span> <strong>Use Don't Cares Strategically:</strong> Incomplete specifications (like BCD) have many don't cares—use them to form larger groups.</li>
            <li className="flex items-start gap-2"><span className="text-rose-500 font-bold">✓</span> <strong>Verify with Truth Table:</strong> After grouping, ensure all 1s are covered and no 0s are included unnecessarily.</li>
            <li className="flex items-start gap-2"><span className="text-rose-500 font-bold">✓</span> <strong>Practice Pattern Recognition:</strong> Common patterns: checkerboard, adjacent pairs, quads, octets, and corner groups.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Missing Corner Groups:</strong> Forgetting that opposite corners are adjacent in 4-variable maps.</li>
            <li><strong>Non-Rectangular Groups:</strong> Groups must be rectangles (including wrap-around). L-shaped groups are invalid.</li>
            <li><strong>Incorrect Gray Code Order:</strong> Using 00,01,10,11 instead of 00,01,11,10 breaks adjacency.</li>
            <li><strong>Overlooking Wrap-Around in Both Directions:</strong> In 4-variable maps, wrap-around works horizontally AND vertically.</li>
            <li><strong>Not Using Don't Cares:</strong> When available, don't cares can significantly simplify expressions.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Label Rows and Columns Clearly:</strong> Always label AB rows and CD columns with Gray code values.</li>
            <li><strong>Circle Largest Groups First:</strong> Start with size 16, then 8, then 4, then 2, then 1 for minimal expression.</li>
            <li><strong>Use Different Colors:</strong> When drawing groups manually, use different colors to distinguish overlapping groups.</li>
            <li><strong>Check Coverage:</strong> Ensure every 1 is covered by at least one group.</li>
            <li><strong>Eliminate Redundant Groups:</strong> Remove groups whose 1s are all covered by larger groups.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-rose-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Draw a 4-variable K-Map with correct Gray code ordering for both rows and columns.</li>
            <li>Place values from a truth table into the K-Map.</li>
            <li>Identify all adjacent cells (horizontal, vertical, wrap-around, corners).</li>
            <li>Group 1s into the largest possible rectangles (sizes 1,2,4,8,16).</li>
            <li>Derive simplified Boolean expressions from groups.</li>
            <li>Use don't care conditions to create larger groups.</li>
            <li>Recognize common patterns like corner groups and wrap-around groups.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Debangshu from Naihati is designing a BCD to 7-segment decoder. The inputs are BCD digits (0000 to 1001), and outputs drive segments of a 7-segment display. Inputs 1010 to 1111 never occur.
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Why are don't cares so important in this design?</strong>
            <br />
            The 6 unused input combinations can be treated as X (don't care). This allows much larger groups in the K-Map!
            <br />
            For example, instead of a single 1 for digit 0, you might group it with don't cares to create a larger group covering multiple segments.
            <br /><br />
            <strong>Observe carefully:</strong> In real-world digital design, don't cares are everywhere—they represent impossible or irrelevant input conditions that can dramatically simplify circuits.
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "The 4-variable K-Map is the largest size typically done by hand. It introduces the concept of 2D wrap-around and corner groups.\n\n" +
            "💡 **Teaching Strategy:** Start with the structure—show how Gray code ordering applies to both rows and columns. Then demonstrate the corner group—it's often the most surprising pattern.\n\n" +
            "🔍 **Common Misunderstanding:** Students often miss the corner group (m₀,m₂,m₈,m₁₀). Emphasize that the map is toroidal—it wraps around in both directions.\n\n" +
            "📌 **Real-World Connection:** 4-variable K-Maps are used extensively in designing BCD decoders, adders, and small ALU functions.\n\n" +
            "🎯 **Advanced Insight:** The principles learned here scale to computer algorithms like Quine-McCluskey, which handle larger numbers of variables."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: How many cells are in a 4-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 2⁴ = 16 cells, arranged in a 4×4 grid.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: What is the Gray code order for a 4-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Rows: 00, 01, 11, 10 for AB; Columns: 00, 01, 11, 10 for CD.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: What is the corner group in a 4-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: m₀, m₂, m₈, m₁₀ form a valid group due to wrap-around adjacency.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: What is the largest possible group in a 4-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Size 16 (all cells), which simplifies to 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: Can groups wrap around vertically in a 4-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Top and bottom rows are adjacent.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: Simplify F = Σ(0,2,8,10) using 4-variable K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: This is the corner group → F = B'D'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: What does a 2×2 square group eliminate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Two variables (the ones that change within the square).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: How do you handle don't cares in a 4-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Treat X as 1 if it helps create larger groups; otherwise treat as 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: What is the BCD example?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: BCD uses digits 0-9 (m₀-m₉), with m₁₀-m₁₅ as don't cares.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: Simplify F = Σ(0,1,2,3,8,9,10,11) using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Two rows (AB=00 and AB=10) → F = A' + A = 1? Actually F = A' + A = 1</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: Can you have a group of 6 cells?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. Groups must be powers of 2 (1,2,4,8,16).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: What's the difference between 3-variable and 4-variable K-Maps?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 4-variable maps have wrap-around in both directions (horizontal AND vertical) and corner adjacency.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: Simplify F = A'B'C'D' + A'B'CD' + ABC'D' + ABCD' using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: m₀, m₂, m₈, m₁₀ → corner group → F = B'D'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: What is the advantage of using don't cares?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Don't cares allow larger groups, leading to simpler expressions and fewer gates.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: How many possible groups of size 8 are there in a 4-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 8 groups: 4 rows, 4 columns (including wrap-around).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: Simplify F = Σ(0,1,4,5,12,13,8,9) using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Two columns (C'D' and C'D) → F = C'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: Why are K-Maps limited to 4 variables by hand?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 5+ variable maps are 3D or higher, making visualization difficult. Computer algorithms handle them.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: What is the Quine-McCluskey algorithm?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A tabular method for minimizing Boolean functions with many variables, used when K-Maps become impractical.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Simplify F = Σ(0,1,2,3,4,5,6,7,8,9,10,11) using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: All except m₁₂,m₁₃,m₁₄,m₁₅ → F = A' + B' + C'? Actually F = A' + B'</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What's next after mastering 4-variable K-Maps?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Learn the Quine-McCluskey algorithm for 5+ variables, and understand how logic synthesis tools work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic22;