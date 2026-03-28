import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 20: Karnaugh Maps (K-Map): 2-variable K-Map
 * 
 * Component: Topic20
 * Purpose: Introduces Karnaugh Maps for Boolean simplification:
 *          - Structure of 2-variable K-Map
 *          - Cell numbering and adjacency
 *          - Grouping adjacent 1s
 *          - Deriving simplified expressions
 *          - Comparison with algebraic simplification
 * 
 * When & Why: Used as the twenty-first topic in the Boolean Algebra series. K-Maps
 *             provide a visual, systematic method for simplifying Boolean expressions
 *             up to 4 variables. The 2-variable K-Map is the foundation for
 *             understanding larger maps and the grouping concept.
 * 
 * Return Type: JSX.Element
 */

const Topic20 = () => {
  // State for interactive K-Map
  const [kmapValues, setKmapValues] = useState({
    m0: 0, m1: 0, m2: 0, m3: 0
  });
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [showSteps, setShowSteps] = useState(true);

  // Variable names for 2-variable K-Map
  const variables = ['A', 'B'];
  
  // K-Map cell mapping: Gray code order
  // 00 (m0), 01 (m1), 11 (m3), 10 (m2)
  const cells = [
    { name: 'm0', row: 0, col: 0, label: "A'B'", value: kmapValues.m0, pos: '00' },
    { name: 'm1', row: 0, col: 1, label: "A'B", value: kmapValues.m1, pos: '01' },
    { name: 'm3', row: 1, col: 1, label: "AB", value: kmapValues.m3, pos: '11' },
    { name: 'm2', row: 1, col: 0, label: "AB'", value: kmapValues.m2, pos: '10' }
  ];

  // Toggle cell value
  const toggleCell = (cellName) => {
    setKmapValues(prev => ({
      ...prev,
      [cellName]: prev[cellName] === 0 ? 1 : 0
    }));
  };

  // Clear all cells
  const clearMap = () => {
    setKmapValues({ m0: 0, m1: 0, m2: 0, m3: 0 });
    setSelectedGroups([]);
  };

  // Set example patterns
  const setExample = (type) => {
    if (type === 'and') {
      setKmapValues({ m0: 0, m1: 0, m2: 0, m3: 1 }); // A·B
    } else if (type === 'or') {
      setKmapValues({ m0: 0, m1: 1, m2: 1, m3: 1 }); // A+B
    } else if (type === 'xor') {
      setKmapValues({ m0: 0, m1: 1, m2: 1, m3: 0 }); // A⊕B
    } else if (type === 'all') {
      setKmapValues({ m0: 1, m1: 1, m2: 1, m3: 1 }); // 1
    } else if (type === 'none') {
      setKmapValues({ m0: 0, m1: 0, m2: 0, m3: 0 }); // 0
    }
    setSelectedGroups([]);
  };

  // Generate simplified expression from K-Map
  const getSimplifiedExpression = () => {
    const ones = [];
    if (kmapValues.m0) ones.push('m0');
    if (kmapValues.m1) ones.push('m1');
    if (kmapValues.m2) ones.push('m2');
    if (kmapValues.m3) ones.push('m3');
    
    if (ones.length === 0) return '0';
    if (ones.length === 4) return '1';
    
    // Check for groups
    const groups = [];
    
    // Check row groups (A groups)
    if (kmapValues.m0 && kmapValues.m1) groups.push('A\'');
    if (kmapValues.m2 && kmapValues.m3) groups.push('A');
    
    // Check column groups (B groups)
    if (kmapValues.m0 && kmapValues.m2) groups.push('B\'');
    if (kmapValues.m1 && kmapValues.m3) groups.push('B');
    
    // Check individual cells
    if (kmapValues.m0 && !kmapValues.m1 && !kmapValues.m2) groups.push('A\'B\'');
    if (kmapValues.m1 && !kmapValues.m0 && !kmapValues.m3) groups.push('A\'B');
    if (kmapValues.m2 && !kmapValues.m0 && !kmapValues.m3) groups.push('AB\'');
    if (kmapValues.m3 && !kmapValues.m1 && !kmapValues.m2) groups.push('AB');
    
    // Remove duplicates and return
    const uniqueGroups = [...new Set(groups)];
    return uniqueGroups.length ? uniqueGroups.join(' + ') : 'No simplification possible';
  };

  const expression = getSimplifiedExpression();

  // Generate SOP expression from truth table
  const getSOPExpression = () => {
    const terms = [];
    if (kmapValues.m0) terms.push("A'B'");
    if (kmapValues.m1) terms.push("A'B");
    if (kmapValues.m2) terms.push("AB'");
    if (kmapValues.m3) terms.push("AB");
    return terms.length ? terms.join(" + ") : "0";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-blue-100 dark:bg-blue-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Karnaugh Maps (K-Map):</span>
          <span className="block text-blue-600 dark:text-blue-400">2-Variable K-Map</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Visual Boolean simplification with adjacency and grouping
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to K-Maps */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🗺️</span> What is a Karnaugh Map?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A <strong className="text-blue-600 dark:text-blue-400">Karnaugh Map (K-Map)</strong> is a graphical method for simplifying Boolean expressions. It arranges truth table values in a grid where adjacent cells differ by only one variable, making it easy to identify and eliminate redundant terms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold text-green-700">✓ Visual</p>
              <p className="text-xs">See patterns clearly</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold text-green-700">✓ Systematic</p>
              <p className="text-xs">Step-by-step grouping</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold text-green-700">✓ Less Error-Prone</p>
              <p className="text-xs">Than algebraic simplification</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> Adjacent cells in a K-Map differ by only one variable. When we group adjacent 1s, we can eliminate that variable—this is the essence of Boolean simplification!
            </p>
          </div>
        </div>

        {/* 2-Variable K-Map Structure */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📐</span> 2-Variable K-Map Structure
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                For 2 variables (A and B), the K-Map has <strong>2² = 4 cells</strong>. The rows and columns use <strong className="text-blue-600">Gray code ordering</strong> (00, 01, 11, 10) so adjacent cells differ by one variable.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                  <thead>
                    <tr>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2 font-mono">B' (0)</th>
                      <th className="px-4 py-2 font-mono">B (1)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-600">
                      <td className="px-4 py-2 font-mono font-bold">A' (0)</td>
                      <td className="px-4 py-2 font-mono">m₀ = A'B'</td>
                      <td className="px-4 py-2 font-mono">m₁ = A'B</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-600">
                      <td className="px-4 py-2 font-mono font-bold">A (1)</td>
                      <td className="px-4 py-2 font-mono">m₂ = AB'</td>
                      <td className="px-4 py-2 font-mono">m₃ = AB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-bold">🔑 Note:</span> The ordering is <strong>00, 01, 11, 10</strong> (Gray code). Cells that are adjacent horizontally or vertically differ by only one variable change.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Adjacent Cells:</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>m₀ (00)</strong> adjacent to <strong>m₁ (01)</strong> and <strong>m₂ (10)</strong></li>
                <li>• <strong>m₁ (01)</strong> adjacent to <strong>m₀ (00)</strong> and <strong>m₃ (11)</strong></li>
                <li>• <strong>m₂ (10)</strong> adjacent to <strong>m₀ (00)</strong> and <strong>m₃ (11)</strong></li>
                <li>• <strong>m₃ (11)</strong> adjacent to <strong>m₁ (01)</strong> and <strong>m₂ (10)</strong></li>
              </ul>
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-xs text-center">
                  <span className="font-bold">✨ Adjacency Rule:</span> Cells that are side-by-side OR at opposite ends (wrap-around) are adjacent!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 2-Variable K-Map */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive 2-Variable K-Map
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Click on cells to toggle between 0 and 1. Observe how the simplified expression changes as you group adjacent 1s.
          </p>
          
          {/* K-Map Grid */}
          <div className="flex justify-center mb-6">
            <div className="inline-block">
              <div className="flex">
                <div className="w-16 h-12 flex items-end justify-center pb-1 text-sm font-mono text-gray-500">A\B</div>
                <div className="w-20 text-center text-sm font-mono text-gray-500">B' (0)</div>
                <div className="w-20 text-center text-sm font-mono text-gray-500">B (1)</div>
              </div>
              <div className="flex">
                <div className="w-16 flex items-center justify-center text-sm font-mono text-gray-500">A' (0)</div>
                <button
                  onClick={() => toggleCell('m0')}
                  className={clsx(
                    "w-20 h-20 border-2 border-gray-300 dark:border-gray-600 rounded-lg m-1 font-mono text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    kmapValues.m0 === 1 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {kmapValues.m0}
                </button>
                <button
                  onClick={() => toggleCell('m1')}
                  className={clsx(
                    "w-20 h-20 border-2 border-gray-300 dark:border-gray-600 rounded-lg m-1 font-mono text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    kmapValues.m1 === 1 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {kmapValues.m1}
                </button>
              </div>
              <div className="flex">
                <div className="w-16 flex items-center justify-center text-sm font-mono text-gray-500">A (1)</div>
                <button
                  onClick={() => toggleCell('m2')}
                  className={clsx(
                    "w-20 h-20 border-2 border-gray-300 dark:border-gray-600 rounded-lg m-1 font-mono text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    kmapValues.m2 === 1 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {kmapValues.m2}
                </button>
                <button
                  onClick={() => toggleCell('m3')}
                  className={clsx(
                    "w-20 h-20 border-2 border-gray-300 dark:border-gray-600 rounded-lg m-1 font-mono text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    kmapValues.m3 === 1 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {kmapValues.m3}
                </button>
              </div>
            </div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setExample('and')} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all">A·B (AND)</button>
            <button onClick={() => setExample('or')} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all">A+B (OR)</button>
            <button onClick={() => setExample('xor')} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all">A⊕B (XOR)</button>
            <button onClick={() => setExample('all')} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all">All 1s</button>
            <button onClick={() => setExample('none')} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all">All 0s</button>
            <button onClick={clearMap} className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all">Clear</button>
          </div>
          
          {/* Expression Display */}
          <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original SOP (from truth table):</p>
            <p className="font-mono text-lg break-all">{getSOPExpression() || "0"}</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">✓ Simplified Expression (from K-Map):</p>
            <p className="font-mono text-xl font-bold break-all">{expression}</p>
          </div>
          
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="mt-4 w-full py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-900/60"
          >
            {showSteps ? "Hide" : "Show"} Simplification Steps
          </button>
          
          {showSteps && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 K-Map Simplification Steps:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Identify all cells with value 1</li>
                <li>Look for adjacent pairs of 1s (horizontally or vertically)</li>
                <li>Group the largest possible rectangles of 1s (sizes: 1, 2, 4)</li>
                <li>For each group, determine which variables remain constant</li>
                <li>Write the product term for each group (constant variables)</li>
                <li>OR all product terms together</li>
              </ol>
              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <p className="text-sm">
                  <span className="font-bold">Current grouping analysis:</span><br />
                  {(() => {
                    const ones = [];
                    if (kmapValues.m0) ones.push('m₀ (A\'B\')');
                    if (kmapValues.m1) ones.push('m₁ (A\'B)');
                    if (kmapValues.m2) ones.push('m₂ (AB\')');
                    if (kmapValues.m3) ones.push('m₃ (AB)');
                    
                    if (ones.length === 0) return "No 1s found → F = 0";
                    if (ones.length === 4) return "All cells are 1 → F = 1";
                    if (ones.length === 2 && ((kmapValues.m0 && kmapValues.m1) || (kmapValues.m2 && kmapValues.m3))) 
                      return "Two adjacent 1s in same row → Variable B eliminated → Group = " + (kmapValues.m0 && kmapValues.m1 ? "A'" : "A");
                    if (ones.length === 2 && ((kmapValues.m0 && kmapValues.m2) || (kmapValues.m1 && kmapValues.m3))) 
                      return "Two adjacent 1s in same column → Variable A eliminated → Group = " + (kmapValues.m0 && kmapValues.m2 ? "B'" : "B");
                    return `1s at: ${ones.join(', ')} → Individual terms: ${expression}`;
                  })()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Grouping Examples */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔲</span> Grouping Patterns in 2-Variable K-Map
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center">
              <p className="font-semibold mb-2">Single Cell (Size 1)</p>
              <div className="inline-block">
                <div className="flex">
                  <div className="w-12"></div><div className="w-12 text-xs">B'</div><div className="w-12 text-xs">B</div>
                </div>
                <div className="flex">
                  <div className="w-12 text-xs">A'</div>
                  <div className="w-12 h-12 border bg-green-500 text-white flex items-center justify-center">1</div>
                  <div className="w-12 h-12 border bg-gray-200"></div>
                </div>
                <div className="flex">
                  <div className="w-12 text-xs">A</div>
                  <div className="w-12 h-12 border bg-gray-200"></div>
                  <div className="w-12 h-12 border bg-gray-200"></div>
                </div>
              </div>
              <p className="text-sm mt-2">Term = <strong className="text-blue-600">A'B'</strong></p>
              <p className="text-xs text-gray-500">No variables eliminated</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center">
              <p className="font-semibold mb-2">Horizontal Pair (Size 2)</p>
              <div className="inline-block">
                <div className="flex">
                  <div className="w-12"></div><div className="w-12 text-xs">B'</div><div className="w-12 text-xs">B</div>
                </div>
                <div className="flex">
                  <div className="w-12 text-xs">A'</div>
                  <div className="w-12 h-12 border bg-green-500 text-white flex items-center justify-center">1</div>
                  <div className="w-12 h-12 border bg-green-500 text-white flex items-center justify-center">1</div>
                </div>
                <div className="flex">
                  <div className="w-12 text-xs">A</div>
                  <div className="w-12 h-12 border bg-gray-200"></div>
                  <div className="w-12 h-12 border bg-gray-200"></div>
                </div>
              </div>
              <p className="text-sm mt-2">Term = <strong className="text-blue-600">A'</strong></p>
              <p className="text-xs text-gray-500">B eliminated (varies)</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center">
              <p className="font-semibold mb-2">Vertical Pair (Size 2)</p>
              <div className="inline-block">
                <div className="flex">
                  <div className="w-12"></div><div className="w-12 text-xs">B'</div><div className="w-12 text-xs">B</div>
                </div>
                <div className="flex">
                  <div className="w-12 text-xs">A'</div>
                  <div className="w-12 h-12 border bg-green-500 text-white flex items-center justify-center">1</div>
                  <div className="w-12 h-12 border bg-gray-200"></div>
                </div>
                <div className="flex">
                  <div className="w-12 text-xs">A</div>
                  <div className="w-12 h-12 border bg-green-500 text-white flex items-center justify-center">1</div>
                  <div className="w-12 h-12 border bg-gray-200"></div>
                </div>
              </div>
              <p className="text-sm mt-2">Term = <strong className="text-blue-600">B'</strong></p>
              <p className="text-xs text-gray-500">A eliminated (varies)</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center">
              <p className="font-semibold mb-2">All Four Cells (Size 4)</p>
              <div className="inline-block">
                <div className="flex">
                  <div className="w-12"></div><div className="w-12 text-xs">B'</div><div className="w-12 text-xs">B</div>
                </div>
                <div className="flex">
                  <div className="w-12 text-xs">A'</div>
                  <div className="w-12 h-12 border bg-green-500 text-white">1</div>
                  <div className="w-12 h-12 border bg-green-500 text-white">1</div>
                </div>
                <div className="flex">
                  <div className="w-12 text-xs">A</div>
                  <div className="w-12 h-12 border bg-green-500 text-white">1</div>
                  <div className="w-12 h-12 border bg-green-500 text-white">1</div>
                </div>
              </div>
              <p className="text-sm mt-2">Term = <strong className="text-blue-600">1</strong></p>
              <p className="text-xs text-gray-500">All variables eliminated</p>
            </div>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Remember Gray Code Order:</strong> 00, 01, 11, 10. Adjacent cells differ by one bit—this is what makes K-Maps work!</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Group Largest First:</strong> Always look for the largest possible groups (size 4, then 2, then 1). This gives the simplest expression.</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Wrap-Around Adjacency:</strong> In 2-variable K-Maps, the top and bottom rows are adjacent (wrap-around).</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> <strong>Verify with Truth Table:</strong> After simplifying, always verify that the expression matches the original truth table.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Incorrect Cell Ordering:</strong> Using binary order (00,01,10,11) instead of Gray code breaks adjacency.</li>
            <li><strong>Missing Adjacent Pairs:</strong> Forgetting that cells at opposite ends (wrap-around) are adjacent.</li>
            <li><strong>Groups That Aren't Rectangular:</strong> Only group rectangular shapes (1x2, 2x1, 2x2). L-shaped groups are invalid.</li>
            <li><strong>Overlapping Groups:</strong> Groups can overlap—that's okay and often necessary for minimal expressions.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Circle Groups Clearly:</strong> Visually mark groups to avoid confusion.</li>
            <li><strong>Start with Largest Groups:</strong> Always look for groups of 4 first, then 2, then singles.</li>
            <li><strong>Verify Coverage:</strong> Ensure every 1 is covered by at least one group.</li>
            <li><strong>Check for Redundancy:</strong> Remove groups that are completely covered by larger groups.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Draw a 2-variable K-Map with correct Gray code ordering.</li>
            <li>Place values from a truth table into the K-Map.</li>
            <li>Identify adjacent cells (including wrap-around).</li>
            <li>Group 1s into the largest possible rectangles.</li>
            <li>Derive simplified Boolean expressions from groups.</li>
            <li>Verify simplified expressions match the original truth table.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Tuhina from Shyamnagar has a truth table for a 2-variable function:
            <br /><br />
            A=0,B=0 → 1, A=0,B=1 → 0, A=1,B=0 → 1, A=1,B=1 → 0
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Place these values in a K-Map. What pattern do you see?</strong>
            <br />
            The 1s are at m₀ (00) and m₂ (10). These are vertically adjacent! Group them.
            <br />
            What variable stays constant? A varies, B is 0 in both → So F = B'
            <br /><br />
            <strong>Observe carefully:</strong> The K-Map visually shows that F depends only on B, not on A!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "The 2-variable K-Map is the foundation. Students must master this before moving to larger maps.\n\n" +
            "💡 **Teaching Strategy:** Start with the physical layout—explain why Gray code ordering is essential. Use the interactive map extensively.\n\n" +
            "🔍 **Common Misunderstanding:** Students often place cells in binary order. Drill Gray code: 00, 01, 11, 10.\n\n" +
            "📌 **Real-World Connection:** K-Maps are used in industry for small functions and as a teaching tool for understanding logic minimization algorithms.\n\n" +
            "🎯 **Advanced Insight:** The grouping principle in K-Maps directly corresponds to the algebraic consensus theorem."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What is a Karnaugh Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A K-Map is a graphical method for simplifying Boolean expressions using adjacency to eliminate variables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: How many cells are in a 2-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 2² = 4 cells.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: What ordering is used in K-Maps?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Gray code ordering: 00, 01, 11, 10. Adjacent cells differ by one variable.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: Simplify F = Σ(0,1) using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: m₀ and m₁ are adjacent horizontally → group eliminates B → F = A'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: Simplify F = Σ(0,2) using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: m₀ and m₂ are adjacent vertically → group eliminates A → F = B'</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: Simplify F = Σ(1,2) using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: m₁ and m₂ are not adjacent. Individual terms: F = A'B + AB' = A⊕B</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: What is the size of the largest possible group in a 2-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Size 4 (all cells), which simplifies to 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: How do you handle wrap-around adjacency in 2-variable K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The top and bottom rows are adjacent (m₀ adjacent to m₂, m₁ adjacent to m₃).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: Simplify F = Σ(0,3) using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: m₀ and m₃ are not adjacent. Individual terms: F = A'B' + AB</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: What does a group of two adjacent 1s eliminate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: One variable (the one that changes between the two cells).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: Simplify F = Σ(0,1,2,3) using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: All cells are 1 → F = 1</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: What is the advantage of K-Map over algebraic simplification?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: K-Map is visual, systematic, and less error-prone, especially for 3-4 variables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: Can K-Maps handle don't care conditions?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Don't cares (X) can be treated as 1 or 0 to create larger groups.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: Simplify F = A·B using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Only m₃=1 → F = AB</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Simplify F = A + B using K-Map.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: m₁,m₂,m₃=1 → groups: m₁+m₃ (A') and m₂+m₃ (B) → F = A + B</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: What does a group of four 1s represent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: All variables are eliminated → expression simplifies to 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: How do you place a truth table into a K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Match each input combination to its cell position and fill the output value.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: Can you have overlapping groups in a K-Map?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Overlapping groups are allowed and often necessary for minimal expressions.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: What's the next step after mastering 2-variable K-Maps?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Move to 3-variable K-Maps, which have 8 cells arranged in a 2x4 grid.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: Why is Gray code used in K-Maps?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Gray code ensures adjacent cells differ by only one variable, which is essential for identifying groups that eliminate variables.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic20;