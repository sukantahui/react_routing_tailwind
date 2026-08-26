import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 21: Karnaugh Maps (K-Map): 3-variable K-Map
 * 
 * Component: Topic21
 * Purpose: Explains 3-variable Karnaugh Maps for Boolean simplification:
 *          - Structure of 3-variable K-Map (2x4 grid)
 *          - Cell numbering and adjacency (including wrap-around)
 *          - Grouping 1s in powers of 2 (1,2,4,8)
 *          - Deriving simplified expressions from groups
 *          - Handling don't care conditions
 * 
 * When & Why: Used as the twenty-second topic in the Boolean Algebra series. The
 *             3-variable K-Map builds on the 2-variable concept and introduces
 *             more complex adjacency patterns. It's the most commonly used size
 *             for classroom exercises and practical small-scale logic design.
 * 
 * Return Type: JSX.Element
 */

const Topic21 = () => {
    // State for interactive 3-variable K-Map
    const [kmapValues, setKmapValues] = useState({
        m0: 0, m1: 0, m2: 0, m3: 0,
        m4: 0, m5: 0, m6: 0, m7: 0
    });
    const [showGroups, setShowGroups] = useState(true);
    const [showDonCares, setShowDonCares] = useState(false);
    const [donCareValues, setDonCareValues] = useState({
        m0: false, m1: false, m2: false, m3: false,
        m4: false, m5: false, m6: false, m7: false
    });

    // Variable names
    const variables = ['A', 'B', 'C'];

    // K-Map cell mapping for 3 variables (A is MSB, C is LSB)
    // Gray code order: 00,01,11,10 for BC
    const cells = [
        { name: 'm0', row: 0, col: 0, label: "A'B'C'", value: kmapValues.m0, pos: '000' },
        { name: 'm1', row: 0, col: 1, label: "A'B'C", value: kmapValues.m1, pos: '001' },
        { name: 'm3', row: 0, col: 2, label: "A'BC", value: kmapValues.m3, pos: '011' },
        { name: 'm2', row: 0, col: 3, label: "A'BC'", value: kmapValues.m2, pos: '010' },
        { name: 'm4', row: 1, col: 0, label: "AB'C'", value: kmapValues.m4, pos: '100' },
        { name: 'm5', row: 1, col: 1, label: "AB'C", value: kmapValues.m5, pos: '101' },
        { name: 'm7', row: 1, col: 2, label: "ABC", value: kmapValues.m7, pos: '111' },
        { name: 'm6', row: 1, col: 3, label: "ABC'", value: kmapValues.m6, pos: '110' }
    ];

    // Toggle cell value (0/1)
    const toggleCell = (cellName) => {
        if (showDonCares && donCareValues[cellName]) {
            // If don't care is enabled, don't allow toggling
            return;
        }
        setKmapValues(prev => ({
            ...prev,
            [cellName]: prev[cellName] === 0 ? 1 : 0
        }));
    };

    // Toggle don't care for a cell
    const toggleDonCare = (cellName) => {
        if (!showDonCares) return;
        setDonCareValues(prev => ({
            ...prev,
            [cellName]: !prev[cellName]
        }));
        // If setting as don't care, set value to 0
        if (!donCareValues[cellName]) {
            setKmapValues(prev => ({ ...prev, [cellName]: 0 }));
        }
    };

    // Get cell display value
    const getCellDisplay = (cell) => {
        if (showDonCares && donCareValues[cell.name]) {
            return 'X';
        }
        return cell.value;
    };

    // Get cell style based on value and don't care
    const getCellStyle = (cell) => {
        if (showDonCares && donCareValues[cell.name]) {
            return "bg-yellow-200 dark:bg-yellow-800/50 hover:bg-yellow-300 dark:hover:bg-yellow-700/50 text-yellow-800 dark:text-yellow-200";
        }
        if (cell.value === 1) {
            return "bg-green-500 hover:bg-green-600 text-white";
        }
        return "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300";
    };

    // Clear all cells
    const clearMap = () => {
        setKmapValues({ m0: 0, m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0 });
        setDonCareValues({ m0: false, m1: false, m2: false, m3: false, m4: false, m5: false, m6: false, m7: false });
    };

    // Set example patterns
    const setExample = (type) => {
        clearMap();
        if (type === 'majority') {
            setKmapValues({ m0: 0, m1: 0, m2: 0, m3: 1, m4: 0, m5: 1, m6: 1, m7: 1 });
        } else if (type === 'odd') {
            setKmapValues({ m0: 0, m1: 1, m2: 1, m3: 0, m4: 1, m5: 0, m6: 0, m7: 1 });
        } else if (type === 'even') {
            setKmapValues({ m0: 1, m1: 0, m2: 0, m3: 1, m4: 0, m5: 1, m6: 1, m7: 0 });
        } else if (type === 'and3') {
            setKmapValues({ m0: 0, m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 1 });
        } else if (type === 'or3') {
            setKmapValues({ m0: 0, m1: 1, m2: 1, m3: 1, m4: 1, m5: 1, m6: 1, m7: 1 });
        }
    };

    // Get simplified expression from K-Map (simplified algorithm for demo)
    const getSimplifiedExpression = () => {
        const values = kmapValues;
        const ones = [];
        for (let i = 0; i <= 7; i++) {
            if (values[`m${i}`] === 1) ones.push(i);
        }

        if (ones.length === 0) return '0';
        if (ones.length === 8) return '1';

        // Check for common patterns
        const groups = [];

        // Check rows (A groups)
        const row0Ones = [0, 1, 3, 2].filter(i => values[`m${i}`] === 1);
        const row1Ones = [4, 5, 7, 6].filter(i => values[`m${i}`] === 1);

        if (row0Ones.length === 4) groups.push("A'");
        if (row1Ones.length === 4) groups.push("A");

        // Check columns (B,C groups) - needs pattern recognition
        // Check for 2x2 squares
        // Quad (m0,m1,m4,m5) -> B'
        if (values.m0 && values.m1 && values.m4 && values.m5) groups.push("B'");
        // Quad (m2,m3,m6,m7) -> B
        if (values.m2 && values.m3 && values.m6 && values.m7) groups.push("B");
        // Quad (m0,m2,m4,m6) -> C'
        if (values.m0 && values.m2 && values.m4 && values.m6) groups.push("C'");
        // Quad (m1,m3,m5,m7) -> C
        if (values.m1 && values.m3 && values.m5 && values.m7) groups.push("C");

        // Check for pairs and singles (simplified - actual algorithm would be more complex)
        // This is a simplified demonstration - in practice, a full minimization algorithm would be used

        if (groups.length === 0) {
            // Return canonical SOP for demonstration
            const terms = [];
            if (values.m0) terms.push("A'B'C'");
            if (values.m1) terms.push("A'B'C");
            if (values.m2) terms.push("A'BC'");
            if (values.m3) terms.push("A'BC");
            if (values.m4) terms.push("AB'C'");
            if (values.m5) terms.push("AB'C");
            if (values.m6) terms.push("ABC'");
            if (values.m7) terms.push("ABC");
            return terms.join(" + ");
        }

        return groups.join(" + ");
    };

    const expression = getSimplifiedExpression();

    // Get SOP expression (canonical)
    const getSOPExpression = () => {
        const terms = [];
        if (kmapValues.m0) terms.push("A'B'C'");
        if (kmapValues.m1) terms.push("A'B'C");
        if (kmapValues.m2) terms.push("A'BC'");
        if (kmapValues.m3) terms.push("A'BC");
        if (kmapValues.m4) terms.push("AB'C'");
        if (kmapValues.m5) terms.push("AB'C");
        if (kmapValues.m6) terms.push("ABC'");
        if (kmapValues.m7) terms.push("ABC");
        return terms.length ? terms.join(" + ") : "0";
    };

    const getSOP4 = () => {
        const t = [];
        if (kmap4.m0) t.push("A'B'C'D'");
        if (kmap4.m1) t.push("A'B'C'D");
        if (kmap4.m2) t.push("A'B'CD'");
        if (kmap4.m3) t.push("A'B'CD");
        if (kmap4.m4) t.push("A'BC'D'");
        if (kmap4.m5) t.push("A'BC'D");
        if (kmap4.m6) t.push("A'BCD'");
        if (kmap4.m7) t.push("A'BCD");
        if (kmap4.m8) t.push("AB'C'D'");
        if (kmap4.m9) t.push("AB'C'D");
        if (kmap4.m10) t.push("AB'CD'");
        if (kmap4.m11) t.push("AB'CD");
        if (kmap4.m12) t.push("ABC'D'");
        if (kmap4.m13) t.push("ABC'D");
        if (kmap4.m14) t.push("ABCD'");
        if (kmap4.m15) t.push("ABCD");

        return t.length ? t.join(" + ") : "0";
    };

    // 4-variable K-Map state (16 cells)
    const [kmap4, setKmap4] = useState({
        m0: 0, m1: 0, m2: 0, m3: 0,
        m4: 0, m5: 0, m6: 0, m7: 0,
        m8: 0, m9: 0, m10: 0, m11: 0,
        m12: 0, m13: 0, m14: 0, m15: 0
    });

    const cells4 = [
        // Row A'B'
        { name: 'm0', row: 0, col: 0, label: "A'B'C'D'" },
        { name: 'm1', row: 0, col: 1, label: "A'B'C'D" },
        { name: 'm3', row: 0, col: 2, label: "A'B'CD" },
        { name: 'm2', row: 0, col: 3, label: "A'B'CD'" },

        // Row A'B
        { name: 'm4', row: 1, col: 0, label: "A'BC'D'" },
        { name: 'm5', row: 1, col: 1, label: "A'BC'D" },
        { name: 'm7', row: 1, col: 2, label: "A'BCD" },
        { name: 'm6', row: 1, col: 3, label: "A'BCD'" },

        // Row AB
        { name: 'm12', row: 2, col: 0, label: "ABC'D'" },
        { name: 'm13', row: 2, col: 1, label: "ABC'D" },
        { name: 'm15', row: 2, col: 2, label: "ABCD" },
        { name: 'm14', row: 2, col: 3, label: "ABCD'" },

        // Row AB'
        { name: 'm8', row: 3, col: 0, label: "AB'C'D'" },
        { name: 'm9', row: 3, col: 1, label: "AB'C'D" },
        { name: 'm11', row: 3, col: 2, label: "AB'CD" },
        { name: 'm10', row: 3, col: 3, label: "AB'CD'" }
    ];

    const toggle4 = (name) => {
        setKmap4(prev => ({
            ...prev,
            [name]: prev[name] === 0 ? 1 : 0
        }));
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-12 text-center">
                <div className="inline-block p-3 mb-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block">Karnaugh Maps (K-Map):</span>
                    <span className="block text-indigo-600 dark:text-indigo-400">3-Variable K-Map</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    8-cell grid for simplifying expressions with 3 variables
                </p>
            </div>

            <div className="space-y-8">
                {/* Introduction to 3-Variable K-Map */}
                <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <span className="text-3xl">🗺️</span> 3-Variable K-Map Structure
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        A <strong className="text-indigo-600 dark:text-indigo-400">3-variable K-Map</strong> has <strong>2³ = 8 cells</strong> arranged in a <strong>2×4 grid</strong>. The rows represent variable A, and the columns represent variables B and C using Gray code ordering (00, 01, 11, 10).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2 font-mono">BC=00</th>
                                            <th className="px-4 py-2 font-mono">BC=01</th>
                                            <th className="px-4 py-2 font-mono">BC=11</th>
                                            <th className="px-4 py-2 font-mono">BC=10</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t border-gray-200 dark:border-gray-600">
                                            <td className="px-4 py-2 font-mono font-bold">A=0</td>
                                            <td className="px-4 py-2 font-mono">m₀ = A'B'C'</td>
                                            <td className="px-4 py-2 font-mono">m₁ = A'B'C</td>
                                            <td className="px-4 py-2 font-mono">m₃ = A'BC</td>
                                            <td className="px-4 py-2 font-mono">m₂ = A'BC'</td>
                                        </tr>
                                        <tr className="border-t border-gray-200 dark:border-gray-600">
                                            <td className="px-4 py-2 font-mono font-bold">A=1</td>
                                            <td className="px-4 py-2 font-mono">m₄ = AB'C'</td>
                                            <td className="px-4 py-2 font-mono">m₅ = AB'C</td>
                                            <td className="px-4 py-2 font-mono">m₇ = ABC</td>
                                            <td className="px-4 py-2 font-mono">m₆ = ABC'</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    <span className="font-bold">🔑 Note:</span> Notice the Gray code order for BC: <strong>00, 01, 11, 10</strong>. Adjacent cells (including wrap-around) differ by only one variable.
                                </p>
                            </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Adjacency Rules:</h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li>• <strong>Horizontal adjacency:</strong> Cells in same row, adjacent columns</li>
                                <li>• <strong>Vertical adjacency:</strong> Cells in same column, adjacent rows</li>
                                <li>• <strong>Wrap-around:</strong> Leftmost and rightmost columns are adjacent</li>
                                <li>• <strong>Corners:</strong> m₀ adjacent to m₂, m₄ adjacent to m₆, etc.</li>
                            </ul>
                            <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                                <p className="text-xs text-center">
                                    <span className="font-bold">✨ Group Sizes:</span> Groups must be powers of 2: 1, 2, 4, or 8 cells.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive 3-Variable K-Map */}
                <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <span className="text-3xl">🎮</span> Interactive 3-Variable K-Map
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Click on cells to toggle between 0 and 1. Use don't cares to see how they help create larger groups.
                    </p>

                    {/* Don't Care Toggle */}
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showDonCares}
                                onChange={(e) => setShowDonCares(e.target.checked)}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Enable Don't Cares (X)</span>
                        </label>
                        {showDonCares && (
                            <p className="text-xs text-yellow-600 dark:text-yellow-400">Click a cell to toggle between 0 and X (don't care)</p>
                        )}
                    </div>

                    {/* K-Map Grid */}
                    <div className="flex justify-center mb-6 overflow-x-auto">
                        <div className="inline-block">
                            <div className="flex">
                                <div className="w-16 h-12 flex items-end justify-center pb-1 text-sm font-mono text-gray-500">A\BC</div>
                                <div className="w-20 text-center text-sm font-mono text-gray-500">00</div>
                                <div className="w-20 text-center text-sm font-mono text-gray-500">01</div>
                                <div className="w-20 text-center text-sm font-mono text-gray-500">11</div>
                                <div className="w-20 text-center text-sm font-mono text-gray-500">10</div>
                            </div>
                            <div className="flex">
                                <div className="w-16 flex items-center justify-center text-sm font-mono text-gray-500">0 (A')</div>
                                {cells.slice(0, 4).map((cell) => (
                                    <div key={cell.name} className="relative">
                                        <button
                                            onClick={() => toggleCell(cell.name)}
                                            onContextMenu={(e) => {
                                                e.preventDefault();
                                                toggleDonCare(cell.name);
                                            }}
                                            className={clsx(
                                                "w-20 h-20 border-2 border-gray-300 dark:border-gray-600 rounded-lg m-1 font-mono text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg",
                                                getCellStyle(cell)
                                            )}
                                            title={showDonCares ? "Click to toggle 0/1, Right-click for Don't Care (X)" : "Click to toggle 0/1"}
                                        >
                                            {getCellDisplay(cell)}
                                        </button>
                                        <span className="absolute -top-2 -right-1 text-[10px] text-gray-400">{cell.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex">
                                <div className="w-16 flex items-center justify-center text-sm font-mono text-gray-500">1 (A)</div>
                                {cells.slice(4, 8).map((cell) => (
                                    <div key={cell.name} className="relative">
                                        <button
                                            onClick={() => toggleCell(cell.name)}
                                            onContextMenu={(e) => {
                                                e.preventDefault();
                                                toggleDonCare(cell.name);
                                            }}
                                            className={clsx(
                                                "w-20 h-20 border-2 border-gray-300 dark:border-gray-600 rounded-lg m-1 font-mono text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg",
                                                getCellStyle(cell)
                                            )}
                                        >
                                            {getCellDisplay(cell)}
                                        </button>
                                        <span className="absolute -top-2 -right-1 text-[10px] text-gray-400">{cell.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button onClick={() => setExample('majority')} className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all">Majority (3-input)</button>
                        <button onClick={() => setExample('odd')} className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all">Odd Parity</button>
                        <button onClick={() => setExample('even')} className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all">Even Parity</button>
                        <button onClick={() => setExample('and3')} className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all">3-Input AND</button>
                        <button onClick={() => setExample('or3')} className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all">3-Input OR</button>
                        <button onClick={clearMap} className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all">Clear</button>
                    </div>

                    {/* Expression Display */}
                    <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original SOP (canonical):</p>
                        <p className="font-mono text-sm break-all">{getSOPExpression()}</p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <p className="text-sm text-green-600 dark:text-green-400 mb-1">✓ Simplified Expression (from K-Map):</p>
                        <p className="font-mono text-xl font-bold break-all">{expression}</p>
                    </div>

                    <button
                        onClick={() => setShowGroups(!showGroups)}
                        className="mt-4 w-full py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/60"
                    >
                        {showGroups ? "Hide" : "Show"} Grouping Strategy
                    </button>

                    {showGroups && (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 K-Map Grouping Strategy for 3 Variables:</h3>
                            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li>Identify all cells with 1 (and X if using don't cares)</li>
                                <li>Look for the largest possible groups (size 8 → 4 → 2 → 1)</li>
                                <li>Groups must be rectangular and contain 2ⁿ cells</li>
                                <li>Groups can wrap around horizontally (left-right adjacency)</li>
                                <li>Overlapping groups are allowed and often necessary</li>
                                <li>Each group eliminates variables that change within the group</li>
                                <li>Write product term: variables that remain constant</li>
                                <li>OR all product terms together</li>
                            </ol>
                            <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                                <p className="text-sm">
                                    <span className="font-bold">🎯 Common 3-Variable Groups:</span><br />
                                    • <strong>Size 8:</strong> All cells → F = 1<br />
                                    • <strong>Size 4 (row):</strong> A' or A (eliminates B,C)<br />
                                    • <strong>Size 4 (2x2 square):</strong> B' or B or C' or C (eliminates one variable)<br />
                                    • <strong>Size 2 (pair):</strong> Eliminates one variable<br />
                                    • <strong>Size 1 (single):</strong> No elimination
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4 Variable K-Map */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mt-10">
                    <h2 className="text-2xl font-bold mb-4">🔷 4-Variable K-Map</h2>

                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                        4-variable K-Map has 16 cells (4×4). Rows represent AB and columns represent CD in Gray code.
                    </p>

                    <div className="overflow-x-auto flex justify-center">
                        <div>
                            <div className="flex">
                                <div className="w-16"></div>
                                {["00", "01", "11", "10"].map((c, i) => (
                                    <div key={i} className="w-20 text-center font-mono">{c}</div>
                                ))}
                            </div>

                            {["00", "01", "11", "10"].map((rowVal, r) => (
                                <div key={r} className="flex">
                                    <div className="w-16 flex items-center justify-center font-mono">
                                        {rowVal}
                                    </div>

                                    {cells4
                                        .filter(c => c.row === r)
                                        .sort((a, b) => a.col - b.col)
                                        .map(cell => (
                                            <button
                                                key={cell.name}
                                                onClick={() => toggle4(cell.name)}
                                                className={`w-20 h-20 m-1 border rounded-lg font-bold text-lg
                  ${kmap4[cell.name] ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700"}
                `}
                                            >
                                                {kmap4[cell.name]}
                                            </button>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Expression */}
                    <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        <p className="text-sm">Canonical SOP:</p>
                        <p className="font-mono text-sm break-all">{getSOP4()}</p>
                    </div>
                </div>

                {/* Grouping Examples */}
                <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <span className="text-3xl">🔲</span> Common Grouping Patterns
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p className="font-semibold text-center mb-2">Size 4 Row Group</p>
                            <div className="flex justify-center">
                                <div className="inline-block">
                                    <div className="flex text-xs">A\BC 00 01 11 10</div>
                                    <div className="flex">
                                        <div className="w-8 text-xs">0</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-8 text-xs">1</div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-center mt-2">Term = <strong className="text-indigo-600">A'</strong></p>
                            <p className="text-xs text-center text-gray-500">B and C eliminated</p>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p className="font-semibold text-center mb-2">Size 4 Column Group</p>
                            <div className="flex justify-center">
                                <div className="inline-block">
                                    <div className="flex text-xs">A\BC 00 01 11 10</div>
                                    <div className="flex">
                                        <div className="w-8 text-xs">0</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-8 text-xs">1</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-center mt-2">Term = <strong className="text-indigo-600">C'</strong></p>
                            <p className="text-xs text-center text-gray-500">A and B eliminated</p>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p className="font-semibold text-center mb-2">Size 4 2×2 Square</p>
                            <div className="flex justify-center">
                                <div className="inline-block">
                                    <div className="flex text-xs">A\BC 00 01 11 10</div>
                                    <div className="flex">
                                        <div className="w-8 text-xs">0</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-8 text-xs">1</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-center mt-2">Term = <strong className="text-indigo-600">B'</strong></p>
                            <p className="text-xs text-center text-gray-500">A and C eliminated (A varies, C varies, B=0)</p>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p className="font-semibold text-center mb-2">Wrap-Around Group</p>
                            <div className="flex justify-center">
                                <div className="inline-block">
                                    <div className="flex text-xs">A\BC 00 01 11 10</div>
                                    <div className="flex">
                                        <div className="w-8 text-xs">0</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-8 text-xs">1</div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-gray-200 border"></div>
                                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white border">1</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-center mt-2">Term = <strong className="text-indigo-600">C'</strong></p>
                            <p className="text-xs text-center text-gray-500">Left and right columns adjacent (wrap-around)</p>
                        </div>
                    </div>
                </div>

                {/* Don't Care Conditions */}
                <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <span className="text-3xl">❌</span> Don't Care Conditions (X)
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        <strong className="text-indigo-600">Don't care conditions</strong> occur when certain input combinations never occur or their output doesn't matter. In K-Maps, we can treat X as <strong className="text-green-600">1</strong> or <strong className="text-red-600">0</strong> to create larger groups and achieve simpler expressions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                            <p className="font-semibold mb-2">Example: BCD to 7-segment decoder</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Input combinations 10-15 never occur in BCD, so they are don't cares (X).</p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                            <p className="font-semibold mb-2">Example: Incomplete truth table</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">When some input combinations are impossible, mark them as X for better simplification.</p>
                        </div>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm">
                            <span className="font-bold">💡 Pro Tip:</span> In the interactive map above, enable "Don't Cares" and right-click on cells to mark them as X. Observe how X can be used to form larger groups!
                        </p>
                    </div>
                </div>

                {/* Professional Tips & Tricks */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>💎</span> Tips & Tricks (Professional Level)
                    </h2>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Always Use Gray Code Order:</strong> 00, 01, 11, 10 for BC. This ensures adjacency works correctly.</li>
                        <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Circle Largest Groups First:</strong> Start with size 8, then 4, then 2, then 1. This yields the minimal expression.</li>
                        <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Remember Wrap-Around:</strong> The leftmost and rightmost columns are adjacent. Don't miss these groups!</li>
                        <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Use Don't Cares Wisely:</strong> Treat X as 1 when it helps create larger groups, but don't use them unnecessarily.</li>
                        <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">✓</span> <strong>Verify with Truth Table:</strong> After simplification, verify that the expression matches all specified minterms.</li>
                    </ul>
                </div>

                {/* Common Pitfalls */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>⚠️</span> Common Pitfalls
                    </h2>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li><strong>Incorrect Cell Ordering:</strong> Using 00,01,10,11 instead of Gray code breaks adjacency.</li>
                        <li><strong>Missing Wrap-Around Groups:</strong> Forgetting that left and right columns are adjacent.</li>
                        <li><strong>Non-Rectangular Groups:</strong> Groups must be rectangles (1x2, 2x2, etc.). L-shaped groups are invalid.</li>
                        <li><strong>Overlooking Don't Cares:</strong> Not using don't cares when available leads to non-minimal expressions.</li>
                        <li><strong>Incorrect Variable Elimination:</strong> When grouping, only variables that change are eliminated. Constant variables remain.</li>
                    </ul>
                </div>

                {/* Best Practices */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>✅</span> Best Practices
                    </h2>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li><strong>Label Rows and Columns Clearly:</strong> Always label A and BC with their Gray code values.</li>
                        <li><strong>Circle Groups Visually:</strong> Draw circles or rectangles around groups to avoid confusion.</li>
                        <li><strong>Check All 1s Covered:</strong> Ensure every 1 is included in at least one group.</li>
                        <li><strong>Eliminate Redundant Groups:</strong> Remove groups that are completely covered by larger groups.</li>
                        <li><strong>Write Product Terms Carefully:</strong> For each group, identify which variables remain constant.</li>
                    </ul>
                </div>

                {/* Mini Checklist */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-indigo-500">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
                        <li>Draw a 3-variable K-Map with correct Gray code ordering.</li>
                        <li>Place values from a truth table into the K-Map.</li>
                        <li>Identify all adjacent cells (horizontal, vertical, wrap-around).</li>
                        <li>Group 1s into the largest possible rectangles (sizes 1,2,4,8).</li>
                        <li>Derive simplified Boolean expressions from groups.</li>
                        <li>Use don't care conditions to create larger groups.</li>
                        <li>Verify simplified expressions match the original truth table.</li>
                    </ul>
                </div>

                {/* Hint Section */}
                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
                    <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                        <span>💭</span> Think About...
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Abhronila from Barrackpore has a 3-variable function with 1s at m₃ (011), m₅ (101), m₆ (110), and m₇ (111).
                        <br /><br />
                        <strong className="text-yellow-800 dark:text-yellow-300">Place these in a K-Map. What pattern do you see?</strong>
                        <br />
                        m₃ (A'BC), m₅ (AB'C), m₆ (ABC'), m₇ (ABC)
                        <br />
                        In the K-Map, these form a pattern that can be grouped as pairs and a 2x2 square.
                        <br />
                        Try grouping: m₆ and m₇ form a pair (AB), m₃ and m₇ form a pair (BC), m₅ and m₇ form a pair (AC).
                        <br />
                        The simplified expression: <strong className="text-indigo-600">F = AB + AC + BC</strong> (majority function)!
                        <br /><br />
                        <strong>Observe carefully:</strong> This is the 3-input majority function—output is 1 when at least two inputs are 1.
                    </p>
                </div>

                {/* Teacher's Note */}
                <div>
                    <Teacher note={
                        "🎓 **Teaching This Topic**\n\n" +
                        "The 3-variable K-Map is where the power of visual simplification really shines. Students can see patterns that algebraic methods would hide.\n\n" +
                        "💡 **Teaching Strategy:** Start with the structure—explain why Gray code is essential. Then demonstrate grouping with examples like majority and parity functions.\n\n" +
                        "🔍 **Common Misunderstanding:** Students often miss wrap-around groups. Emphasize that the map is toroidal—left and right edges are adjacent.\n\n" +
                        "📌 **Real-World Connection:** 3-variable K-Maps are used extensively in designing ALU control logic, decoders, and multiplexers.\n\n" +
                        "🎯 **Advanced Insight:** The grouping principle directly maps to the Quine-McCluskey algorithm used in logic synthesis tools."
                    } />
                </div>

                {/* Questions and Answers Section */}
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q1: How many cells are in a 3-variable K-Map?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: 2³ = 8 cells, arranged in a 2×4 grid.</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q2: What is the Gray code order for BC in a 3-variable K-Map?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: 00, 01, 11, 10. This ensures adjacent cells differ by one variable.</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q3: Simplify F = Σ(3,5,6,7) using K-Map.</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Groups: m₃+m₇ (BC), m₅+m₇ (AC), m₆+m₇ (AB) → F = AB + AC + BC</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q4: Simplify F = Σ(1,2,4,7) using K-Map.</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: No large groups → F = A'B'C + A'BC' + AB'C' + ABC</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q5: What is the largest group possible in a 3-variable K-Map?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Size 8 (all cells), which simplifies to 1.</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q6: Can groups wrap around in a 3-variable K-Map?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! The leftmost and rightmost columns are adjacent horizontally.</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q7: Simplify F = A'B'C' + A'B'C + A'BC' + A'BC using K-Map.</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: All minterms with A=0 → F = A'</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q8: What does a 2×2 square group eliminate?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Two variables (the ones that change within the square).</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q9: How do you handle don't cares in a K-Map?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Treat X as 1 if it helps create larger groups; otherwise treat as 0.</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q10: Simplify F = Σ(0,1,2,3,4,5,6,7) using K-Map.</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: All cells are 1 → F = 1</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q11: What is the 3-input majority function in K-Map?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Σ(3,5,6,7) → F = AB + AC + BC</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q12: Simplify F = Σ(1,2,3,4,5,6) using K-Map.</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: All except m₀ and m₇ → groups: A'B'C' missing, so F = (A'B'C')' = A+B+C</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q13: What is the advantage of K-Map over algebraic simplification for 3 variables?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Visual pattern recognition makes it easier to spot groupings and avoid errors.</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q14: Simplify F = A'BC' + ABC' using K-Map.</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: m₂ and m₆ are vertically adjacent → group eliminates A → F = BC'</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q15: What is the difference between 2-variable and 3-variable K-Maps?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: 3-variable maps have 8 cells (2×4 grid) and include wrap-around adjacency horizontally.</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q16: Simplify F = Σ(0,2,4,6) using K-Map.</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Even minterms → vertical groups: m₀+m₄ (B'C'), m₂+m₆ (BC') → F = C'</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q17: How do you identify which variables are eliminated in a group?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Variables that change between cells in the group are eliminated; constant variables remain.</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q18: Simplify F = Σ(1,3,5,7) using K-Map.</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Odd minterms → vertical groups: m₁+m₅, m₃+m₇ → F = C</p>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <p className="font-semibold">Q19: Can you have overlapping groups in a K-Map?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! Overlapping groups are allowed and often necessary to cover all 1s minimally.</p>
                        </div>
                        <div className="pb-4">
                            <p className="font-semibold">Q20: What's the next step after mastering 3-variable K-Maps?</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">A: Move to 4-variable K-Maps, which have 16 cells in a 4×4 grid with more complex adjacency patterns.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic21;